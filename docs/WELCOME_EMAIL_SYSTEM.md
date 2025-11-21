# WONDER Welcome Email System

A strategic 3-email welcome series designed to onboard new users and drive engagement.

## Overview

The welcome email series uses psychological triggers to convert signups into active participants:

1. **Email 1: Welcome & Philosophy** (Immediate) - Sets the stage, differentiates from Reddit
2. **Email 2: How WONDER Works** (Day 3) - Educates on depth scoring and feedback systems
3. **Email 3: Feedback Loop** (Day 7) - Requests feedback, shows engagement stats

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Email System Flow                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  User Signup                                                     │
│       │                                                          │
│       ▼                                                          │
│  ┌─────────────┐     ┌─────────────────────────────────────────┐│
│  │  Supabase   │────▶│  Database Triggers                      ││
│  │  Auth       │     │  - Create email_preferences             ││
│  └──────┬──────┘     │  - Schedule welcome_2 (Day 3)           ││
│         │            │  - Schedule welcome_3 (Day 7)           ││
│         │            └─────────────────────────────────────────┘│
│         ▼                                                        │
│  ┌─────────────┐                                                │
│  │  Signup     │     ┌─────────────────────────────────────────┐│
│  │  Page       │────▶│  sendWelcomeEmailToUser()               ││
│  └─────────────┘     │  - Sends Email 1 immediately            ││
│                      └──────────────┬──────────────────────────┘│
│                                     │                            │
│                                     ▼                            │
│                      ┌─────────────────────────────────────────┐│
│                      │  Resend API                              ││
│                      │  - Delivers email                        ││
│                      │  - Tracks delivery/opens/clicks          ││
│                      └─────────────────────────────────────────┘│
│                                                                  │
│  Vercel Cron (Daily at 9 AM UTC)                                │
│       │                                                          │
│       ▼                                                          │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  /api/email/process-scheduled                               ││
│  │  - Finds due scheduled emails                               ││
│  │  - Sends Email 2 (Day 3) and Email 3 (Day 7)                ││
│  │  - Updates email_logs                                       ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
WONDER-APP/
├── email_templates/
│   └── welcome_series/
│       ├── email-1-welcome.html        # Day 0: Welcome & Philosophy
│       ├── email-2-how-it-works.html   # Day 3: System explanation
│       └── email-3-feedback.html       # Day 7: Feedback request
├── lib/
│   ├── email/
│   │   └── index.ts                    # Email service (Resend integration)
│   └── actions/
│       └── email.ts                    # Server actions for emails
├── app/
│   ├── api/
│   │   └── email/
│   │       ├── send/route.ts           # Manual email send API
│   │       ├── unsubscribe/route.ts    # One-click unsubscribe
│   │       ├── process-scheduled/route.ts  # Cron job endpoint
│   │       └── webhook/route.ts        # Resend delivery webhooks
│   └── auth/
│       └── signup/page.tsx             # Triggers Email 1
├── supabase/
│   └── migrations/
│       └── 20250121_email_preferences.sql  # Email tables
└── vercel.json                         # Cron job configuration
```

## Database Schema

### email_preferences
Stores user email subscription preferences.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | References auth.users |
| welcome_series_enabled | BOOLEAN | Opt-in for welcome emails |
| marketing_emails_enabled | BOOLEAN | Opt-in for marketing |
| debate_notifications_enabled | BOOLEAN | Opt-in for debate alerts |
| weekly_digest_enabled | BOOLEAN | Opt-in for weekly digest |
| unsubscribed_all | BOOLEAN | Global unsubscribe flag |
| unsubscribe_token | UUID | Token for one-click unsubscribe |

### email_logs
Audit log of all sent emails.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | References auth.users |
| email_type | ENUM | welcome_1, welcome_2, welcome_3, etc. |
| subject | TEXT | Email subject line |
| recipient_email | TEXT | Recipient email address |
| status | ENUM | pending, sent, delivered, opened, clicked, bounced, failed |
| provider_message_id | TEXT | Resend message ID |
| opened_at | TIMESTAMPTZ | When email was opened |
| clicked_at | TIMESTAMPTZ | When link was clicked |

### scheduled_emails
Queue for emails scheduled for future delivery.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | References auth.users |
| email_type | ENUM | Type of email to send |
| scheduled_for | TIMESTAMPTZ | When to send |
| processed | BOOLEAN | Whether it's been sent |
| email_log_id | UUID | Reference to sent email log |

## Email Templates

### Template Variables

All templates support these variables:
- `{{display_name}}` - User's display name or username
- `{{username}}` - User's username
- `{{app_url}}` - Application base URL
- `{{unsubscribe_url}}` - One-click unsubscribe link

### Email 1: Welcome & Philosophy
Additional variables:
- `{{featured_question}}` - Today's featured debate question

### Email 2: How WONDER Works
Additional variables:
- `{{depth_score}}` - User's depth score (if available)
- `{{percentile}}` - User's percentile ranking

### Email 3: Feedback Loop
Additional variables:
- `{{arguments_count}}` - Number of arguments submitted
- `{{discussions_count}}` - Number of discussions joined
- `{{minds_changed}}` - Number of debates won

## A/B Testing

Subject lines are A/B tested using a hash of the user ID for consistent assignment:

**Email 1:**
- "Welcome to WONDER: Reddit failed philosophy. We fixed it."
- "Your invitation to think deeper"
- "Philosophy without the toxicity starts now"

**Email 2:**
- "Why your best argument might have zero votes (and that's good)"
- "The scoring system that rewards substance over snark"
- "How WONDER actually works"

**Email 3:**
- "Help us build the philosophy platform that should exist"
- "We need your mind (not just your clicks)"
- "One week in: Tell us everything"

## Setup Instructions

### 1. Environment Variables

Add to `.env.local`:
```env
# Resend API
RESEND_API_KEY=re_your_api_key

# Email sender
EMAIL_FROM=WONDER <noreply@yourdomain.com>
EMAIL_REPLY_TO=nick@yourdomain.com

# Internal API key (generate secure random string)
EMAIL_API_KEY=your_secure_api_key

# Webhook secret (from Resend dashboard)
RESEND_WEBHOOK_SECRET=whsec_your_secret

# Cron secret (for Vercel)
CRON_SECRET=your_cron_secret
```

### 2. Resend Setup

1. Create account at [resend.com](https://resend.com)
2. Verify your domain
3. Create API key with send permissions
4. Configure webhook endpoint: `https://yourdomain.com/api/email/webhook`

### 3. Database Migration

Run the migration in Supabase SQL Editor:
```sql
-- Copy contents of supabase/migrations/20250121_email_preferences.sql
```

### 4. Install Dependencies

```bash
npm install resend svix
```

### 5. Deploy

Vercel will automatically set up the cron job from `vercel.json`.

## API Endpoints

### POST /api/email/send
Send an email manually.

```typescript
// Request
{
  userId: string,
  emailType: 'welcome_1' | 'welcome_2' | 'welcome_3'
}

// Headers
x-api-key: EMAIL_API_KEY
```

### GET /api/email/unsubscribe
One-click unsubscribe handler.

```
GET /api/email/unsubscribe?token=<unsubscribe_token>&type=<optional_type>
```

### POST /api/email/process-scheduled
Process scheduled emails (called by cron).

```typescript
// Headers
authorization: Bearer CRON_SECRET
// or
x-api-key: EMAIL_API_KEY
```

### POST /api/email/webhook
Resend webhook handler for delivery tracking.

## Server Actions

### sendWelcomeEmailToUser()
Send Email 1 to current authenticated user.

```typescript
import { sendWelcomeEmailToUser } from '@/lib/actions/email';

const result = await sendWelcomeEmailToUser();
```

### updateEmailPreferences()
Update user's email preferences.

```typescript
import { updateEmailPreferences } from '@/lib/actions/email';

await updateEmailPreferences({
  welcomeSeriesEnabled: false,
  marketingEmailsEnabled: true,
});
```

### getEmailPreferences()
Get current user's email preferences.

```typescript
import { getEmailPreferences } from '@/lib/actions/email';

const { preferences } = await getEmailPreferences();
```

## Psychological Triggers

The email series uses several psychological principles:

1. **Contrast Effect** (Email 1) - Explicitly contrasts with Reddit's failures
2. **Social Proof** (Email 2) - Shows how the community values depth
3. **Reciprocity** (Email 3) - Personal message from founder requesting help
4. **Progress Tracking** (Email 3) - Shows user's contribution stats
5. **Ownership** (All) - "Help us build" creates sense of ownership
6. **Scarcity** (Email 1) - "Beta" implies exclusivity

## Monitoring

### Email Logs Query
```sql
SELECT
  email_type,
  status,
  COUNT(*) as count,
  AVG(CASE WHEN opened_at IS NOT NULL THEN 1 ELSE 0 END) as open_rate
FROM email_logs
GROUP BY email_type, status;
```

### Scheduled Emails Status
```sql
SELECT
  email_type,
  processed,
  COUNT(*) as count
FROM scheduled_emails
GROUP BY email_type, processed;
```

## Troubleshooting

### Emails not sending
1. Check `RESEND_API_KEY` is set correctly
2. Verify domain is verified in Resend
3. Check email_logs for error messages

### Scheduled emails not processing
1. Verify cron job is running (check Vercel dashboard)
2. Check `CRON_SECRET` matches
3. Look for errors in API logs

### Unsubscribe not working
1. Verify unsubscribe_token exists in email_preferences
2. Check RLS policies allow updates

## Future Enhancements

- [ ] Add email template preview page for admins
- [ ] Implement email preference center UI
- [ ] Add re-engagement emails for inactive users
- [ ] Track A/B test results and auto-optimize
- [ ] Add debate result notification emails
