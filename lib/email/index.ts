/**
 * WONDER Email Service
 *
 * Handles all email operations including:
 * - Sending transactional emails via Resend
 * - Loading and rendering HTML templates
 * - Managing the welcome email series
 * - Tracking email engagement
 */

import { Resend } from "resend";
import { createClient } from "@/lib/supabase/server";
import fs from "fs/promises";
import path from "path";

// Types
export type EmailType =
  | "welcome_1"
  | "welcome_2"
  | "welcome_3"
  | "debate_notification"
  | "weekly_digest"
  | "marketing"
  | "transactional";

export type EmailStatus =
  | "pending"
  | "sent"
  | "delivered"
  | "opened"
  | "clicked"
  | "bounced"
  | "failed";

export interface EmailRecipient {
  email: string;
  userId: string;
  displayName: string;
  username: string;
}

export interface WelcomeEmailData {
  featuredQuestion?: string;
  depthScore?: number;
  percentile?: number;
  argumentsCount?: number;
  discussionsCount?: number;
  mindsChanged?: number;
}

export interface SendEmailOptions {
  to: EmailRecipient;
  emailType: EmailType;
  subject: string;
  data?: WelcomeEmailData;
  skipPreferenceCheck?: boolean;
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
  emailLogId?: string;
}

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// App configuration
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://wonder.app";
const FROM_EMAIL =
  process.env.EMAIL_FROM || "WONDER <noreply@wonder.app>";
const REPLY_TO_EMAIL = process.env.EMAIL_REPLY_TO || "nick@wonder.app";

/**
 * A/B test subject lines for welcome emails
 */
export const WELCOME_SUBJECT_LINES = {
  welcome_1: [
    "Welcome to WONDER: Reddit failed philosophy. We fixed it.",
    "Your invitation to think deeper",
    "Philosophy without the toxicity starts now",
  ],
  welcome_2: [
    "Why your best argument might have zero votes (and that's good)",
    "The scoring system that rewards substance over snark",
    "How WONDER actually works",
  ],
  welcome_3: [
    "Help us build the philosophy platform that should exist",
    "We need your mind (not just your clicks)",
    "One week in: Tell us everything",
  ],
};

/**
 * Select a subject line for A/B testing
 * Uses user ID hash for consistent selection per user
 */
export function selectSubjectLine(
  emailType: keyof typeof WELCOME_SUBJECT_LINES,
  userId: string
): string {
  const subjects = WELCOME_SUBJECT_LINES[emailType];
  // Simple hash based on user ID for consistent A/B assignment
  const hash = userId
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const index = hash % subjects.length;
  return subjects[index];
}

/**
 * Load and render an HTML email template
 */
export async function loadEmailTemplate(
  templateName: string,
  variables: Record<string, string | number | boolean | undefined>
): Promise<string> {
  const templatePath = path.join(
    process.cwd(),
    "email_templates",
    "welcome_series",
    `${templateName}.html`
  );

  let html = await fs.readFile(templatePath, "utf-8");

  // Replace all template variables ({{variable_name}} syntax)
  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`\\{\\{${key}\\}\\}`, "g");
    html = html.replace(regex, String(value ?? ""));
  }

  // Handle conditional blocks {{#if variable}}...{{/if}}
  html = html.replace(
    /\{\{#if\s+(\w+)\}\}([\s\S]*?)\{\{\/if\}\}/g,
    (_, varName, content) => {
      return variables[varName] ? content : "";
    }
  );

  return html;
}

/**
 * Generate unsubscribe URL with token
 */
export async function getUnsubscribeUrl(userId: string): Promise<string> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("email_preferences")
    .select("unsubscribe_token")
    .eq("user_id", userId)
    .single();

  const token = data?.unsubscribe_token || userId;
  return `${APP_URL}/api/email/unsubscribe?token=${token}`;
}

/**
 * Check if user has opted in to receive this email type
 */
export async function checkEmailPreferences(
  userId: string,
  emailType: EmailType
): Promise<boolean> {
  const supabase = await createClient();

  const { data: prefs } = await supabase
    .from("email_preferences")
    .select("*")
    .eq("user_id", userId)
    .single();

  // If no preferences exist, default to allowing emails
  if (!prefs) return true;

  // Check global unsubscribe
  if (prefs.unsubscribed_all) return false;

  // Check specific email type preferences
  switch (emailType) {
    case "welcome_1":
    case "welcome_2":
    case "welcome_3":
      return prefs.welcome_series_enabled;
    case "debate_notification":
      return prefs.debate_notifications_enabled;
    case "weekly_digest":
      return prefs.weekly_digest_enabled;
    case "marketing":
      return prefs.marketing_emails_enabled;
    case "transactional":
      return true; // Always send transactional emails
    default:
      return true;
  }
}

/**
 * Log email send attempt to database
 */
export async function logEmailSend(
  userId: string,
  emailType: EmailType,
  subject: string,
  recipientEmail: string,
  status: EmailStatus,
  messageId?: string,
  errorMessage?: string,
  metadata?: Record<string, unknown>
): Promise<string | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("email_logs")
    .insert({
      user_id: userId,
      email_type: emailType,
      subject,
      recipient_email: recipientEmail,
      status,
      provider_message_id: messageId,
      error_message: errorMessage,
      sent_at: status === "sent" ? new Date().toISOString() : null,
      metadata: metadata || {},
    })
    .select("id")
    .single();

  if (error) {
    console.error("Failed to log email:", error);
    return null;
  }

  return data?.id || null;
}

/**
 * Check if email was already sent to prevent duplicates
 */
export async function wasEmailAlreadySent(
  userId: string,
  emailType: EmailType
): Promise<boolean> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("email_logs")
    .select("id")
    .eq("user_id", userId)
    .eq("email_type", emailType)
    .in("status", ["sent", "delivered", "opened", "clicked"])
    .limit(1);

  return (data?.length || 0) > 0;
}

/**
 * Get featured question for welcome email
 */
export async function getFeaturedQuestion(): Promise<string> {
  const supabase = await createClient();

  // Try to get today's daily prompt
  const today = new Date().toISOString().split("T")[0];
  const { data: dailyPrompt } = await supabase
    .from("daily_prompts")
    .select("question")
    .eq("date", today)
    .single();

  if (dailyPrompt?.question) {
    return dailyPrompt.question;
  }

  // Fallback to a recent open debate
  const { data: debate } = await supabase
    .from("debates")
    .select("topic")
    .eq("status", "open")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (debate?.topic) {
    return debate.topic;
  }

  // Ultimate fallback
  return "Is free will an illusion, or do we have genuine agency in our choices?";
}

/**
 * Get user engagement stats for Day 7 email
 */
export async function getUserEngagementStats(userId: string): Promise<{
  argumentsCount: number;
  discussionsCount: number;
  mindsChanged: number;
}> {
  const supabase = await createClient();

  // Get arguments count
  const { count: argumentsCount } = await supabase
    .from("arguments")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  // Get debates participated count
  const { count: discussionsCount } = await supabase
    .from("debates")
    .select("*", { count: "exact", head: true })
    .or(`creator_id.eq.${userId},opponent_id.eq.${userId}`);

  // For "minds changed" - count debates won (simplified metric)
  const { data: profile } = await supabase
    .from("profiles")
    .select("debates_won")
    .eq("id", userId)
    .single();

  return {
    argumentsCount: argumentsCount || 0,
    discussionsCount: discussionsCount || 0,
    mindsChanged: profile?.debates_won || 0,
  };
}

/**
 * Send a welcome email (Email 1, 2, or 3)
 */
export async function sendWelcomeEmail(
  options: SendEmailOptions
): Promise<SendEmailResult> {
  const { to, emailType, subject, data = {}, skipPreferenceCheck = false } = options;

  // Check if email was already sent
  const alreadySent = await wasEmailAlreadySent(to.userId, emailType);
  if (alreadySent) {
    return {
      success: false,
      error: "Email already sent to this user",
    };
  }

  // Check user preferences
  if (!skipPreferenceCheck) {
    const canSend = await checkEmailPreferences(to.userId, emailType);
    if (!canSend) {
      return {
        success: false,
        error: "User has opted out of this email type",
      };
    }
  }

  // Get unsubscribe URL
  const unsubscribeUrl = await getUnsubscribeUrl(to.userId);

  // Map email type to template file
  const templateMap: Record<string, string> = {
    welcome_1: "email-1-welcome",
    welcome_2: "email-2-how-it-works",
    welcome_3: "email-3-feedback",
  };

  const templateName = templateMap[emailType];
  if (!templateName) {
    return {
      success: false,
      error: `Unknown email type: ${emailType}`,
    };
  }

  // Load and render template
  const templateVariables = {
    display_name: to.displayName || to.username || "Philosopher",
    username: to.username,
    app_url: APP_URL,
    unsubscribe_url: unsubscribeUrl,
    featured_question: data.featuredQuestion || await getFeaturedQuestion(),
    depth_score: data.depthScore,
    percentile: data.percentile,
    arguments_count: data.argumentsCount || 0,
    discussions_count: data.discussionsCount || 0,
    minds_changed: data.mindsChanged || 0,
  };

  let html: string;
  try {
    html = await loadEmailTemplate(templateName, templateVariables);
  } catch (error) {
    console.error("Failed to load email template:", error);
    return {
      success: false,
      error: "Failed to load email template",
    };
  }

  // Send email via Resend
  try {
    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: to.email,
      subject,
      html,
      replyTo: REPLY_TO_EMAIL,
      headers: {
        "X-Entity-Ref-ID": `wonder-${emailType}-${to.userId}`,
      },
      tags: [
        { name: "email_type", value: emailType },
        { name: "user_id", value: to.userId },
      ],
    });

    if (response.error) {
      const emailLogId = await logEmailSend(
        to.userId,
        emailType,
        subject,
        to.email,
        "failed",
        undefined,
        response.error.message
      );

      return {
        success: false,
        error: response.error.message,
        emailLogId: emailLogId || undefined,
      };
    }

    const emailLogId = await logEmailSend(
      to.userId,
      emailType,
      subject,
      to.email,
      "sent",
      response.data?.id,
      undefined,
      { templateVariables }
    );

    return {
      success: true,
      messageId: response.data?.id,
      emailLogId: emailLogId || undefined,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    const emailLogId = await logEmailSend(
      to.userId,
      emailType,
      subject,
      to.email,
      "failed",
      undefined,
      errorMessage
    );

    return {
      success: false,
      error: errorMessage,
      emailLogId: emailLogId || undefined,
    };
  }
}

/**
 * Send Email 1: Welcome & Philosophy
 */
export async function sendWelcomeEmail1(
  recipient: EmailRecipient
): Promise<SendEmailResult> {
  const subject = selectSubjectLine("welcome_1", recipient.userId);
  const featuredQuestion = await getFeaturedQuestion();

  return sendWelcomeEmail({
    to: recipient,
    emailType: "welcome_1",
    subject,
    data: { featuredQuestion },
  });
}

/**
 * Send Email 2: How WONDER Works (Day 3)
 */
export async function sendWelcomeEmail2(
  recipient: EmailRecipient
): Promise<SendEmailResult> {
  const subject = selectSubjectLine("welcome_2", recipient.userId);

  // TODO: Calculate actual depth score and percentile when depth scoring is implemented
  const depthScore = undefined;
  const percentile = undefined;

  return sendWelcomeEmail({
    to: recipient,
    emailType: "welcome_2",
    subject,
    data: { depthScore, percentile },
  });
}

/**
 * Send Email 3: Feedback Loop (Day 7)
 */
export async function sendWelcomeEmail3(
  recipient: EmailRecipient
): Promise<SendEmailResult> {
  const subject = selectSubjectLine("welcome_3", recipient.userId);
  const stats = await getUserEngagementStats(recipient.userId);

  return sendWelcomeEmail({
    to: recipient,
    emailType: "welcome_3",
    subject,
    data: stats,
  });
}

/**
 * Process scheduled emails (called by cron job)
 */
export async function processScheduledEmails(): Promise<{
  processed: number;
  failed: number;
  errors: string[];
}> {
  const supabase = await createClient();

  // Get pending scheduled emails
  const { data: pendingEmails, error } = await supabase
    .from("scheduled_emails")
    .select(
      `
      *,
      profiles:user_id (username, display_name),
      email_preferences:user_id (welcome_series_enabled, unsubscribed_all)
    `
    )
    .eq("processed", false)
    .lte("scheduled_for", new Date().toISOString())
    .limit(100);

  if (error || !pendingEmails) {
    return {
      processed: 0,
      failed: 0,
      errors: [error?.message || "Failed to fetch scheduled emails"],
    };
  }

  let processed = 0;
  let failed = 0;
  const errors: string[] = [];

  for (const scheduledEmail of pendingEmails) {
    // Skip if user opted out
    const prefs = scheduledEmail.email_preferences as {
      welcome_series_enabled: boolean;
      unsubscribed_all: boolean;
    } | null;

    if (prefs?.unsubscribed_all || prefs?.welcome_series_enabled === false) {
      // Mark as processed but don't send
      await supabase
        .from("scheduled_emails")
        .update({ processed: true, processed_at: new Date().toISOString() })
        .eq("id", scheduledEmail.id);
      continue;
    }

    // Get user email from auth.users
    const { data: authUser } = await supabase.auth.admin.getUserById(
      scheduledEmail.user_id
    );

    if (!authUser?.user?.email) {
      errors.push(`No email found for user ${scheduledEmail.user_id}`);
      failed++;
      continue;
    }

    const profile = scheduledEmail.profiles as {
      username: string;
      display_name: string | null;
    } | null;

    const recipient: EmailRecipient = {
      email: authUser.user.email,
      userId: scheduledEmail.user_id,
      displayName: profile?.display_name || profile?.username || "Philosopher",
      username: profile?.username || "philosopher",
    };

    // Send appropriate email
    let result: SendEmailResult;
    if (scheduledEmail.email_type === "welcome_2") {
      result = await sendWelcomeEmail2(recipient);
    } else if (scheduledEmail.email_type === "welcome_3") {
      result = await sendWelcomeEmail3(recipient);
    } else {
      errors.push(`Unknown email type: ${scheduledEmail.email_type}`);
      failed++;
      continue;
    }

    // Update scheduled email status
    await supabase
      .from("scheduled_emails")
      .update({
        processed: true,
        processed_at: new Date().toISOString(),
        email_log_id: result.emailLogId,
      })
      .eq("id", scheduledEmail.id);

    if (result.success) {
      processed++;
    } else {
      failed++;
      errors.push(result.error || "Unknown error");
    }
  }

  return { processed, failed, errors };
}
