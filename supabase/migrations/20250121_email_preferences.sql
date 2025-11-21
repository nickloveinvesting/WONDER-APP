-- Migration: Email Preferences and Welcome Email Series
-- Created: 2025-01-21
-- Description: Adds email preferences, email logs, and scheduled email support for WONDER welcome series

-- ============================================================================
-- EMAIL PREFERENCES TABLE
-- Stores user email preferences and subscription status
-- ============================================================================

CREATE TABLE IF NOT EXISTS email_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Email subscription preferences
  welcome_series_enabled BOOLEAN DEFAULT TRUE,
  marketing_emails_enabled BOOLEAN DEFAULT TRUE,
  debate_notifications_enabled BOOLEAN DEFAULT TRUE,
  weekly_digest_enabled BOOLEAN DEFAULT TRUE,

  -- Global unsubscribe
  unsubscribed_all BOOLEAN DEFAULT FALSE,
  unsubscribe_token UUID DEFAULT gen_random_uuid(),

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Ensure one preference record per user
  UNIQUE(user_id)
);

-- Index for fast lookups
CREATE INDEX idx_email_preferences_user_id ON email_preferences(user_id);
CREATE INDEX idx_email_preferences_unsubscribe_token ON email_preferences(unsubscribe_token);

-- ============================================================================
-- EMAIL LOGS TABLE
-- Tracks all emails sent for analytics and preventing duplicates
-- ============================================================================

CREATE TYPE email_status AS ENUM ('pending', 'sent', 'delivered', 'opened', 'clicked', 'bounced', 'failed');
CREATE TYPE email_type AS ENUM ('welcome_1', 'welcome_2', 'welcome_3', 'debate_notification', 'weekly_digest', 'marketing', 'transactional');

CREATE TABLE IF NOT EXISTS email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Email details
  email_type email_type NOT NULL,
  subject TEXT NOT NULL,
  recipient_email TEXT NOT NULL,

  -- Email service provider tracking
  provider_message_id TEXT, -- e.g., Resend message ID

  -- Status tracking
  status email_status DEFAULT 'pending',

  -- Engagement tracking
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,

  -- Error tracking
  error_message TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  sent_at TIMESTAMPTZ,

  -- Metadata for dynamic content
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Indexes for common queries
CREATE INDEX idx_email_logs_user_id ON email_logs(user_id);
CREATE INDEX idx_email_logs_email_type ON email_logs(email_type);
CREATE INDEX idx_email_logs_status ON email_logs(status);
CREATE INDEX idx_email_logs_created_at ON email_logs(created_at);
CREATE INDEX idx_email_logs_provider_message_id ON email_logs(provider_message_id);

-- ============================================================================
-- SCHEDULED EMAILS TABLE
-- Queue for emails scheduled to be sent at a future time (Day 3, Day 7)
-- ============================================================================

CREATE TABLE IF NOT EXISTS scheduled_emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Scheduling
  email_type email_type NOT NULL,
  scheduled_for TIMESTAMPTZ NOT NULL,

  -- Processing status
  processed BOOLEAN DEFAULT FALSE,
  processed_at TIMESTAMPTZ,

  -- Link to email log once sent
  email_log_id UUID REFERENCES email_logs(id),

  -- Dynamic content to include
  metadata JSONB DEFAULT '{}'::jsonb,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for scheduler queries
CREATE INDEX idx_scheduled_emails_scheduled_for ON scheduled_emails(scheduled_for) WHERE processed = FALSE;
CREATE INDEX idx_scheduled_emails_user_id ON scheduled_emails(user_id);
CREATE INDEX idx_scheduled_emails_processed ON scheduled_emails(processed);

-- ============================================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================================

ALTER TABLE email_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheduled_emails ENABLE ROW LEVEL SECURITY;

-- Email preferences: Users can view and update their own preferences
CREATE POLICY "Users can view own email preferences"
  ON email_preferences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own email preferences"
  ON email_preferences FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own email preferences"
  ON email_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Email logs: Users can only view their own email history
CREATE POLICY "Users can view own email logs"
  ON email_logs FOR SELECT
  USING (auth.uid() = user_id);

-- Scheduled emails: Users can view their scheduled emails
CREATE POLICY "Users can view own scheduled emails"
  ON scheduled_emails FOR SELECT
  USING (auth.uid() = user_id);

-- ============================================================================
-- SERVICE ROLE POLICIES (for backend API)
-- These allow the service role to manage emails for all users
-- ============================================================================

-- Service role can do everything on email_preferences
CREATE POLICY "Service role full access to email_preferences"
  ON email_preferences FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Service role can do everything on email_logs
CREATE POLICY "Service role full access to email_logs"
  ON email_logs FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Service role can do everything on scheduled_emails
CREATE POLICY "Service role full access to scheduled_emails"
  ON scheduled_emails FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to create email preferences for new users (called by trigger)
CREATE OR REPLACE FUNCTION create_email_preferences_for_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO email_preferences (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create email preferences on user signup
DROP TRIGGER IF EXISTS on_auth_user_created_email_prefs ON auth.users;
CREATE TRIGGER on_auth_user_created_email_prefs
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION create_email_preferences_for_user();

-- Function to schedule welcome series emails on user signup
CREATE OR REPLACE FUNCTION schedule_welcome_emails_for_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Schedule Email 2 (Day 3)
  INSERT INTO scheduled_emails (user_id, email_type, scheduled_for, metadata)
  VALUES (
    NEW.id,
    'welcome_2',
    NOW() + INTERVAL '3 days',
    jsonb_build_object('signup_date', NOW())
  );

  -- Schedule Email 3 (Day 7)
  INSERT INTO scheduled_emails (user_id, email_type, scheduled_for, metadata)
  VALUES (
    NEW.id,
    'welcome_3',
    NOW() + INTERVAL '7 days',
    jsonb_build_object('signup_date', NOW())
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-schedule welcome emails on user signup
DROP TRIGGER IF EXISTS on_auth_user_created_schedule_emails ON auth.users;
CREATE TRIGGER on_auth_user_created_schedule_emails
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION schedule_welcome_emails_for_user();

-- Function to update timestamp on email_preferences changes
CREATE OR REPLACE FUNCTION update_email_preferences_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_email_preferences_timestamp ON email_preferences;
CREATE TRIGGER update_email_preferences_timestamp
  BEFORE UPDATE ON email_preferences
  FOR EACH ROW EXECUTE FUNCTION update_email_preferences_updated_at();

-- ============================================================================
-- UTILITY VIEWS
-- ============================================================================

-- View to get users who need their scheduled emails sent
CREATE OR REPLACE VIEW pending_scheduled_emails AS
SELECT
  se.*,
  ep.welcome_series_enabled,
  ep.unsubscribed_all,
  p.username,
  p.display_name,
  u.email
FROM scheduled_emails se
JOIN email_preferences ep ON se.user_id = ep.user_id
JOIN profiles p ON se.user_id = p.id
JOIN auth.users u ON se.user_id = u.id
WHERE se.processed = FALSE
  AND se.scheduled_for <= NOW()
  AND ep.unsubscribed_all = FALSE
  AND ep.welcome_series_enabled = TRUE;

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================

COMMENT ON TABLE email_preferences IS 'Stores user email subscription preferences and unsubscribe tokens';
COMMENT ON TABLE email_logs IS 'Audit log of all emails sent, with engagement tracking';
COMMENT ON TABLE scheduled_emails IS 'Queue of emails scheduled to be sent at future times';
COMMENT ON COLUMN email_preferences.unsubscribe_token IS 'UUID token for one-click unsubscribe links';
COMMENT ON COLUMN email_logs.metadata IS 'JSON object containing dynamic content variables used in the email';
COMMENT ON COLUMN scheduled_emails.metadata IS 'JSON object containing data to populate email template';
