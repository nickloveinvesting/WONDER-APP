'use server';

/**
 * Email Server Actions
 *
 * Server-side actions for sending welcome emails and managing email preferences.
 * These are called from the client after signup or from user settings.
 */

import { createClient } from '@/lib/supabase/server';
import {
  sendWelcomeEmail1,
  sendWelcomeEmail2,
  sendWelcomeEmail3,
  checkEmailPreferences,
  type EmailRecipient,
  type SendEmailResult,
} from '@/lib/email';

/**
 * Send the first welcome email to a newly signed up user
 *
 * Called immediately after successful signup.
 * Email 2 (Day 3) and Email 3 (Day 7) are scheduled via database triggers.
 */
export async function sendWelcomeEmailToUser(): Promise<SendEmailResult> {
  try {
    const supabase = await createClient();

    // Get current authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        success: false,
        error: 'User not authenticated',
      };
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('username, display_name')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      console.error('Failed to get profile for welcome email:', profileError);
      return {
        success: false,
        error: 'User profile not found',
      };
    }

    // Prepare recipient data
    const recipient: EmailRecipient = {
      email: user.email!,
      userId: user.id,
      displayName: profile.display_name || profile.username,
      username: profile.username,
    };

    // Send welcome email 1
    const result = await sendWelcomeEmail1(recipient);

    if (!result.success) {
      console.error('Failed to send welcome email:', result.error);
    }

    return result;
  } catch (error) {
    console.error('Error in sendWelcomeEmailToUser:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Resend a specific welcome email
 *
 * Allows users or admins to manually resend a welcome email.
 */
export async function resendWelcomeEmail(
  emailNumber: 1 | 2 | 3
): Promise<SendEmailResult> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        error: 'User not authenticated',
      };
    }

    // Get user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('username, display_name')
      .eq('id', user.id)
      .single();

    if (!profile) {
      return {
        success: false,
        error: 'User profile not found',
      };
    }

    const recipient: EmailRecipient = {
      email: user.email!,
      userId: user.id,
      displayName: profile.display_name || profile.username,
      username: profile.username,
    };

    // Send the appropriate email
    switch (emailNumber) {
      case 1:
        return await sendWelcomeEmail1(recipient);
      case 2:
        return await sendWelcomeEmail2(recipient);
      case 3:
        return await sendWelcomeEmail3(recipient);
      default:
        return {
          success: false,
          error: 'Invalid email number',
        };
    }
  } catch (error) {
    console.error('Error in resendWelcomeEmail:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Update email preferences
 */
export async function updateEmailPreferences(preferences: {
  welcomeSeriesEnabled?: boolean;
  marketingEmailsEnabled?: boolean;
  debateNotificationsEnabled?: boolean;
  weeklyDigestEnabled?: boolean;
  unsubscribedAll?: boolean;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        error: 'User not authenticated',
      };
    }

    // Map camelCase to snake_case
    const updateData: Record<string, boolean> = {};

    if (preferences.welcomeSeriesEnabled !== undefined) {
      updateData.welcome_series_enabled = preferences.welcomeSeriesEnabled;
    }
    if (preferences.marketingEmailsEnabled !== undefined) {
      updateData.marketing_emails_enabled = preferences.marketingEmailsEnabled;
    }
    if (preferences.debateNotificationsEnabled !== undefined) {
      updateData.debate_notifications_enabled =
        preferences.debateNotificationsEnabled;
    }
    if (preferences.weeklyDigestEnabled !== undefined) {
      updateData.weekly_digest_enabled = preferences.weeklyDigestEnabled;
    }
    if (preferences.unsubscribedAll !== undefined) {
      updateData.unsubscribed_all = preferences.unsubscribedAll;
    }

    const { error } = await supabase
      .from('email_preferences')
      .update(updateData)
      .eq('user_id', user.id);

    if (error) {
      console.error('Failed to update email preferences:', error);
      return {
        success: false,
        error: 'Failed to update preferences',
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Error in updateEmailPreferences:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get current email preferences
 */
export async function getEmailPreferences(): Promise<{
  success: boolean;
  preferences?: {
    welcomeSeriesEnabled: boolean;
    marketingEmailsEnabled: boolean;
    debateNotificationsEnabled: boolean;
    weeklyDigestEnabled: boolean;
    unsubscribedAll: boolean;
  };
  error?: string;
}> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        error: 'User not authenticated',
      };
    }

    const { data, error } = await supabase
      .from('email_preferences')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) {
      // If no preferences exist, return defaults
      if (error.code === 'PGRST116') {
        return {
          success: true,
          preferences: {
            welcomeSeriesEnabled: true,
            marketingEmailsEnabled: true,
            debateNotificationsEnabled: true,
            weeklyDigestEnabled: true,
            unsubscribedAll: false,
          },
        };
      }

      console.error('Failed to get email preferences:', error);
      return {
        success: false,
        error: 'Failed to fetch preferences',
      };
    }

    return {
      success: true,
      preferences: {
        welcomeSeriesEnabled: data.welcome_series_enabled,
        marketingEmailsEnabled: data.marketing_emails_enabled,
        debateNotificationsEnabled: data.debate_notifications_enabled,
        weeklyDigestEnabled: data.weekly_digest_enabled,
        unsubscribedAll: data.unsubscribed_all,
      },
    };
  } catch (error) {
    console.error('Error in getEmailPreferences:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
