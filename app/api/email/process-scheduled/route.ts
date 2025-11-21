/**
 * API Route: Process Scheduled Emails
 *
 * POST /api/email/process-scheduled
 *
 * Cron job endpoint that processes scheduled emails (Day 3 and Day 7 welcome emails).
 * Should be called by a scheduled job (Vercel Cron, external cron service, etc.)
 *
 * Security: Requires API key in header or Vercel cron secret
 */

import { NextRequest, NextResponse } from "next/server";
import { processScheduledEmails } from "@/lib/email";

export async function POST(request: NextRequest) {
  // Verify authorization
  const apiKey = request.headers.get("x-api-key");
  const cronSecret = request.headers.get("authorization");

  // Check for valid API key or Vercel cron secret
  const isAuthorized =
    apiKey === process.env.EMAIL_API_KEY ||
    cronSecret === `Bearer ${process.env.CRON_SECRET}`;

  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await processScheduledEmails();

    return NextResponse.json({
      success: true,
      processed: result.processed,
      failed: result.failed,
      errors: result.errors.length > 0 ? result.errors : undefined,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error processing scheduled emails:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Also support GET for simple cron services
export async function GET(request: NextRequest) {
  return POST(request);
}
