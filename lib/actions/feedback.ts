'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export type FeedbackType =
  | 'snap'
  | 'changed_view'
  | 'needs_evidence'
  | 'logic_unclear'
  | 'ignores_counterargument'
  | 'misrepresents_opponent'
  | 'assumes_without_justification';

/**
 * Submit feedback on an argument
 * Users can provide structured feedback to help improve argument quality
 */
export async function submitArgumentFeedback(
  argumentId: string,
  feedbackType: FeedbackType
): Promise<{ success?: boolean; error?: string }> {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (!user || authError) {
    return { error: 'You must be logged in to provide feedback' };
  }

  // Check if user already submitted this type of feedback
  const { data: existingFeedback } = await supabase
    .from('argument_feedback')
    .select('id')
    .eq('argument_id', argumentId)
    .eq('user_id', user.id)
    .eq('feedback_type', feedbackType)
    .single();

  if (existingFeedback) {
    // Remove the feedback (toggle behavior)
    const { error: deleteError } = await supabase
      .from('argument_feedback')
      .delete()
      .eq('id', existingFeedback.id);

    if (deleteError) {
      console.error('Error removing feedback:', deleteError);
      return { error: 'Failed to remove feedback' };
    }

    revalidatePath('/debates');
    return { success: true };
  }

  // Insert new feedback
  const { error: insertError } = await supabase.from('argument_feedback').insert({
    argument_id: argumentId,
    user_id: user.id,
    feedback_type: feedbackType,
  });

  if (insertError) {
    console.error('Error submitting feedback:', insertError);
    return { error: 'Failed to submit feedback' };
  }

  // Update streak if this is the user's first activity today
  await updateDailyActivity(user.id);

  revalidatePath('/debates');
  return { success: true };
}

/**
 * Get feedback counts for an argument
 */
export async function getArgumentFeedbackCounts(
  argumentId: string
): Promise<Partial<Record<FeedbackType, number>>> {
  const supabase = await createClient();

  const { data: feedbackData } = await supabase
    .from('argument_feedback')
    .select('feedback_type')
    .eq('argument_id', argumentId);

  const counts: Partial<Record<FeedbackType, number>> = {};

  feedbackData?.forEach((f) => {
    const type = f.feedback_type as FeedbackType;
    counts[type] = (counts[type] || 0) + 1;
  });

  return counts;
}

/**
 * Get user's existing feedback for an argument
 */
export async function getUserArgumentFeedback(
  argumentId: string
): Promise<FeedbackType[]> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data } = await supabase
    .from('argument_feedback')
    .select('feedback_type')
    .eq('argument_id', argumentId)
    .eq('user_id', user.id);

  return (data?.map((f) => f.feedback_type as FeedbackType)) || [];
}

/**
 * Update daily activity and streak
 * Called when user performs any qualifying action
 */
async function updateDailyActivity(userId: string): Promise<void> {
  const supabase = await createClient();
  const today = new Date().toISOString().split('T')[0];

  // Check if already logged today
  const { data: existingActivity } = await supabase
    .from('daily_activity')
    .select('id')
    .eq('user_id', userId)
    .eq('activity_date', today)
    .single();

  if (existingActivity) {
    // Already active today, no streak update needed
    return;
  }

  // Log today's activity
  await supabase.from('daily_activity').insert({
    user_id: userId,
    activity_date: today,
    activity_type: 'feedback',
  });

  // Get user's current streak info
  const { data: profile } = await supabase
    .from('profiles')
    .select('daily_streak, longest_streak, last_activity_date')
    .eq('id', userId)
    .single();

  if (!profile) return;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  let newStreak = 1;
  if (profile.last_activity_date === yesterdayStr) {
    // Continuing streak
    newStreak = (profile.daily_streak || 0) + 1;
  }

  const newLongestStreak = Math.max(newStreak, profile.longest_streak || 0);

  // Update profile
  await supabase
    .from('profiles')
    .update({
      daily_streak: newStreak,
      longest_streak: newLongestStreak,
      last_activity_date: today,
    })
    .eq('id', userId);
}

/**
 * Validate another user's feedback (helps build consensus)
 */
export async function validateFeedback(
  feedbackId: string,
  agrees: boolean
): Promise<{ success?: boolean; error?: string }> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in to validate feedback' };
  }

  // Check if already validated
  const { data: existingValidation } = await supabase
    .from('feedback_validation')
    .select('id')
    .eq('feedback_id', feedbackId)
    .eq('validator_id', user.id)
    .single();

  if (existingValidation) {
    // Update existing validation
    const { error } = await supabase
      .from('feedback_validation')
      .update({ agrees })
      .eq('id', existingValidation.id);

    if (error) {
      return { error: 'Failed to update validation' };
    }
  } else {
    // Create new validation
    const { error } = await supabase.from('feedback_validation').insert({
      feedback_id: feedbackId,
      validator_id: user.id,
      agrees,
    });

    if (error) {
      return { error: 'Failed to submit validation' };
    }
  }

  return { success: true };
}
