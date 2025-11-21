/**
 * API Route: Send Welcome Email
 *
 * POST /api/email/send
 *
 * Sends a welcome email to a user. Requires service role or admin authentication.
 * Used internally by signup flow and admin tools.
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  sendWelcomeEmail1,
  sendWelcomeEmail2,
  sendWelcomeEmail3,
  type EmailRecipient,
} from "@/lib/email";

interface SendEmailRequest {
  userId: string;
  emailType: "welcome_1" | "welcome_2" | "welcome_3";
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication - must be service role or authenticated admin
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // For internal API calls, check for API key in header
    const apiKey = request.headers.get("x-api-key");
    const isServiceRole = apiKey === process.env.EMAIL_API_KEY;

    // Also allow authenticated users to trigger their own welcome email (for resend functionality)
    if (!user && !isServiceRole) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse request body
    const body: SendEmailRequest = await request.json();
    const { userId, emailType } = body;

    if (!userId || !emailType) {
      return NextResponse.json(
        { error: "Missing required fields: userId, emailType" },
        { status: 400 }
      );
    }

    // Validate email type
    if (!["welcome_1", "welcome_2", "welcome_3"].includes(emailType)) {
      return NextResponse.json(
        { error: "Invalid email type" },
        { status: 400 }
      );
    }

    // If user is authenticated but not service role, they can only send to themselves
    if (user && !isServiceRole && user.id !== userId) {
      return NextResponse.json(
        { error: "Can only send emails to yourself" },
        { status: 403 }
      );
    }

    // Get user data
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("username, display_name")
      .eq("id", userId)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: "User profile not found" },
        { status: 404 }
      );
    }

    // Get user email from auth.users using admin client
    // Note: This requires service role key in production
    const { data: authData } = await supabase.auth.admin.getUserById(userId);

    if (!authData?.user?.email) {
      return NextResponse.json(
        { error: "User email not found" },
        { status: 404 }
      );
    }

    const recipient: EmailRecipient = {
      email: authData.user.email,
      userId,
      displayName: profile.display_name || profile.username,
      username: profile.username,
    };

    // Send appropriate email type
    let result;
    switch (emailType) {
      case "welcome_1":
        result = await sendWelcomeEmail1(recipient);
        break;
      case "welcome_2":
        result = await sendWelcomeEmail2(recipient);
        break;
      case "welcome_3":
        result = await sendWelcomeEmail3(recipient);
        break;
    }

    if (!result.success) {
      return NextResponse.json(
        { error: result.error, emailLogId: result.emailLogId },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      messageId: result.messageId,
      emailLogId: result.emailLogId,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
