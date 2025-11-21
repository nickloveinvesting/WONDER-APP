/**
 * API Route: Unsubscribe from Emails
 *
 * GET /api/email/unsubscribe?token=<unsubscribe_token>
 *
 * One-click unsubscribe handler. Renders an HTML page confirming unsubscription.
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const type = request.nextUrl.searchParams.get("type"); // optional: specific email type

  if (!token) {
    return new NextResponse(
      renderPage(
        "Invalid Link",
        "This unsubscribe link is invalid or has expired.",
        "error"
      ),
      { headers: { "Content-Type": "text/html" } }
    );
  }

  const supabase = await createClient();

  // Find user by unsubscribe token
  const { data: prefs, error } = await supabase
    .from("email_preferences")
    .select("user_id, unsubscribed_all")
    .eq("unsubscribe_token", token)
    .single();

  if (error || !prefs) {
    return new NextResponse(
      renderPage(
        "Invalid Link",
        "This unsubscribe link is invalid or has expired.",
        "error"
      ),
      { headers: { "Content-Type": "text/html" } }
    );
  }

  // Already unsubscribed check
  if (prefs.unsubscribed_all) {
    return new NextResponse(
      renderPage(
        "Already Unsubscribed",
        "You are already unsubscribed from WONDER emails.",
        "info"
      ),
      { headers: { "Content-Type": "text/html" } }
    );
  }

  // Perform unsubscribe based on type
  let updateData: Record<string, boolean> = {};

  if (type === "welcome") {
    updateData.welcome_series_enabled = false;
  } else if (type === "marketing") {
    updateData.marketing_emails_enabled = false;
  } else if (type === "debates") {
    updateData.debate_notifications_enabled = false;
  } else if (type === "digest") {
    updateData.weekly_digest_enabled = false;
  } else {
    // Default: unsubscribe from all
    updateData.unsubscribed_all = true;
  }

  const { error: updateError } = await supabase
    .from("email_preferences")
    .update(updateData)
    .eq("unsubscribe_token", token);

  if (updateError) {
    console.error("Failed to unsubscribe:", updateError);
    return new NextResponse(
      renderPage(
        "Error",
        "Something went wrong. Please try again or contact support.",
        "error"
      ),
      { headers: { "Content-Type": "text/html" } }
    );
  }

  const message =
    type && type !== "all"
      ? `You have been unsubscribed from ${type} emails.`
      : "You have been unsubscribed from all WONDER emails.";

  return new NextResponse(
    renderPage("Unsubscribed", message, "success"),
    { headers: { "Content-Type": "text/html" } }
  );
}

function renderPage(
  title: string,
  message: string,
  status: "success" | "error" | "info"
): string {
  const statusColors = {
    success: { bg: "#f0fdfa", border: "#14b8a6", icon: "&#x2714;" },
    error: { bg: "#fef2f2", border: "#ef4444", icon: "&#x2718;" },
    info: { bg: "#f0f9ff", border: "#0ea5e9", icon: "&#x2139;" },
  };

  const colors = statusColors[status];

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - WONDER</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;900&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .container {
      background: white;
      border-radius: 16px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
      padding: 48px;
      max-width: 480px;
      text-align: center;
    }
    .logo {
      font-size: 32px;
      font-weight: 900;
      color: #0f172a;
      letter-spacing: -0.05em;
      margin-bottom: 32px;
    }
    .status-box {
      background: ${colors.bg};
      border-left: 4px solid ${colors.border};
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 24px;
    }
    .status-icon {
      font-size: 48px;
      color: ${colors.border};
      margin-bottom: 16px;
    }
    h1 {
      font-size: 24px;
      font-weight: 900;
      color: #0f172a;
      margin-bottom: 12px;
    }
    p {
      font-size: 16px;
      font-weight: 500;
      color: #475569;
      line-height: 1.6;
    }
    .cta {
      display: inline-block;
      margin-top: 24px;
      padding: 12px 32px;
      background: #14b8a6;
      color: white;
      text-decoration: none;
      font-weight: 900;
      border-radius: 10px;
      transition: background 0.2s;
    }
    .cta:hover {
      background: #0d9488;
    }
    .footer {
      margin-top: 32px;
      font-size: 14px;
      color: #94a3b8;
    }
    .footer a {
      color: #64748b;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">WONDER</div>
    <div class="status-box">
      <div class="status-icon">${colors.icon}</div>
      <h1>${title}</h1>
      <p>${message}</p>
    </div>
    ${
      status === "success"
        ? `
    <p>Changed your mind? You can manage your email preferences in your account settings.</p>
    <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://wonder.app"}/settings/notifications" class="cta">
      Manage Preferences
    </a>
    `
        : `
    <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://wonder.app"}" class="cta">
      Go to WONDER
    </a>
    `
    }
    <div class="footer">
      <p>WONDER - Where curious minds explore ideas together</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}
