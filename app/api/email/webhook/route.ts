/**
 * API Route: Resend Webhook Handler
 *
 * POST /api/email/webhook
 *
 * Handles delivery tracking webhooks from Resend.
 * Updates email_logs with delivery status, opens, and clicks.
 *
 * Webhook events:
 * - email.sent
 * - email.delivered
 * - email.delivery_delayed
 * - email.complained
 * - email.bounced
 * - email.opened
 * - email.clicked
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { Webhook } from "svix";

interface ResendWebhookEvent {
  type:
    | "email.sent"
    | "email.delivered"
    | "email.delivery_delayed"
    | "email.complained"
    | "email.bounced"
    | "email.opened"
    | "email.clicked";
  created_at: string;
  data: {
    email_id: string;
    from: string;
    to: string[];
    subject: string;
    created_at: string;
    // Additional fields for clicks
    click?: {
      link: string;
      timestamp: string;
    };
  };
}

// Map Resend event types to our email status
const statusMap: Record<string, string> = {
  "email.sent": "sent",
  "email.delivered": "delivered",
  "email.bounced": "bounced",
  "email.opened": "opened",
  "email.clicked": "clicked",
  "email.complained": "failed",
  "email.delivery_delayed": "pending",
};

export async function POST(request: NextRequest) {
  const body = await request.text();

  // Verify webhook signature if configured
  const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;

  if (webhookSecret) {
    const svixId = request.headers.get("svix-id");
    const svixTimestamp = request.headers.get("svix-timestamp");
    const svixSignature = request.headers.get("svix-signature");

    if (!svixId || !svixTimestamp || !svixSignature) {
      return NextResponse.json(
        { error: "Missing webhook signature headers" },
        { status: 400 }
      );
    }

    try {
      const wh = new Webhook(webhookSecret);
      wh.verify(body, {
        "svix-id": svixId,
        "svix-timestamp": svixTimestamp,
        "svix-signature": svixSignature,
      });
    } catch (error) {
      console.error("Webhook verification failed:", error);
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 401 }
      );
    }
  }

  // Parse event
  let event: ResendWebhookEvent;
  try {
    event = JSON.parse(body);
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  // Find the email log by provider message ID
  const { data: emailLog, error: findError } = await supabase
    .from("email_logs")
    .select("id, status")
    .eq("provider_message_id", event.data.email_id)
    .single();

  if (findError || !emailLog) {
    // Log might not exist yet or could be from a different system
    console.log(`Email log not found for message ID: ${event.data.email_id}`);
    return NextResponse.json({ received: true, matched: false });
  }

  // Prepare update data
  const newStatus = statusMap[event.type];
  const updateData: Record<string, unknown> = {};

  if (newStatus) {
    updateData.status = newStatus;
  }

  // Handle specific events
  if (event.type === "email.opened") {
    updateData.opened_at = new Date().toISOString();
  } else if (event.type === "email.clicked") {
    updateData.clicked_at = new Date().toISOString();
  } else if (event.type === "email.bounced" || event.type === "email.complained") {
    updateData.error_message = `Email ${event.type.replace("email.", "")}`;

    // Also update email preferences to prevent future sends
    const { data: log } = await supabase
      .from("email_logs")
      .select("user_id")
      .eq("id", emailLog.id)
      .single();

    if (log?.user_id) {
      await supabase
        .from("email_preferences")
        .update({ unsubscribed_all: true })
        .eq("user_id", log.user_id);
    }
  }

  // Update email log
  if (Object.keys(updateData).length > 0) {
    const { error: updateError } = await supabase
      .from("email_logs")
      .update(updateData)
      .eq("id", emailLog.id);

    if (updateError) {
      console.error("Failed to update email log:", updateError);
    }
  }

  return NextResponse.json({
    received: true,
    matched: true,
    event: event.type,
    emailLogId: emailLog.id,
  });
}
