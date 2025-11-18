'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export type VoteType = 'snap' | 'zap';
export type QuadrantType = 'ai_technology' | 'philosophy' | 'morality_ethics' | 'economics_society';

/**
 * Vote on a post (debate)
 * If user already voted, update their vote
 * If same vote type, remove the vote (toggle off)
 */
export async function voteOnPost(postId: string, voteType: VoteType) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in to vote' };
  }

  try {
    // Ensure profile exists (in case trigger failed)
    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .maybeSingle();

    if (!profile) {
      // Profile doesn't exist, create it
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          username: user.email?.split('@')[0] || `user_${user.id.substring(0, 8)}`,
          display_name: user.user_metadata?.display_name || 'Philosopher',
        });

      if (profileError) {
        console.error('[voteOnPost] Profile creation error:', profileError);
        // Continue anyway - RLS might be blocking, but profile might exist
      }
    }

    // Check if user already voted on this post
    const { data: existingVote, error: fetchError } = await supabase
      .from('post_votes')
      .select('*')
      .eq('post_id', postId)
      .eq('user_id', user.id)
      .maybeSingle();

    // If there's an error other than "not found", throw it
    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError;
    }

    if (existingVote) {
      // User already voted
      if (existingVote.vote_type === voteType) {
        // Same vote type - remove the vote (toggle off)
        const { error: deleteError } = await supabase
          .from('post_votes')
          .delete()
          .eq('id', existingVote.id);

        if (deleteError) throw deleteError;

        revalidatePath('/debates');
        revalidatePath(`/debates/${postId}`);
        return { success: true, action: 'removed' };
      } else {
        // Different vote type - update the vote
        const { error: updateError } = await supabase
          .from('post_votes')
          .update({ vote_type: voteType })
          .eq('id', existingVote.id);

        if (updateError) throw updateError;

        revalidatePath('/debates');
        revalidatePath(`/debates/${postId}`);
        return { success: true, action: 'updated' };
      }
    } else {
      // No existing vote - create new one
      const { error: insertError } = await supabase
        .from('post_votes')
        .insert({
          post_id: postId,
          user_id: user.id,
          vote_type: voteType,
        });

      if (insertError) throw insertError;

      revalidatePath('/debates');
      revalidatePath(`/debates/${postId}`);
      return { success: true, action: 'created' };
    }
  } catch (error: any) {
    console.error('[voteOnPost] Error:', error);
    const errorMessage = error?.message || error?.toString() || 'Failed to record vote';
    return { error: errorMessage };
  }
}

/**
 * Vote on a comment (argument)
 * Same logic as post voting
 */
export async function voteOnComment(commentId: string, voteType: VoteType) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in to vote' };
  }

  try {
    // Ensure profile exists (in case trigger failed)
    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .maybeSingle();

    if (!profile) {
      // Profile doesn't exist, create it
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          username: user.email?.split('@')[0] || `user_${user.id.substring(0, 8)}`,
          display_name: user.user_metadata?.display_name || 'Philosopher',
        });

      if (profileError) {
        console.error('[voteOnComment] Profile creation error:', profileError);
        // Continue anyway - RLS might be blocking, but profile might exist
      }
    }

    // Check if user already voted on this comment
    const { data: existingVote, error: fetchError } = await supabase
      .from('comment_votes')
      .select('*')
      .eq('comment_id', commentId)
      .eq('user_id', user.id)
      .maybeSingle();

    // If there's an error other than "not found", throw it
    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError;
    }

    if (existingVote) {
      // User already voted
      if (existingVote.vote_type === voteType) {
        // Same vote type - remove the vote (toggle off)
        const { error: deleteError } = await supabase
          .from('comment_votes')
          .delete()
          .eq('id', existingVote.id);

        if (deleteError) throw deleteError;

        return { success: true, action: 'removed' };
      } else {
        // Different vote type - update the vote
        const { error: updateError } = await supabase
          .from('comment_votes')
          .update({ vote_type: voteType })
          .eq('id', existingVote.id);

        if (updateError) throw updateError;

        return { success: true, action: 'updated' };
      }
    } else {
      // No existing vote - create new one
      const { error: insertError } = await supabase
        .from('comment_votes')
        .insert({
          comment_id: commentId,
          user_id: user.id,
          vote_type: voteType,
        });

      if (insertError) throw insertError;

      return { success: true, action: 'created' };
    }
  } catch (error: any) {
    console.error('[voteOnComment] Error:', error);
    const errorMessage = error?.message || error?.toString() || 'Failed to record vote';
    return { error: errorMessage };
  }
}

/**
 * Get user's vote on a specific post
 */
export async function getUserPostVote(postId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { vote: null };
  }

  try {
    const { data: vote } = await supabase
      .from('post_votes')
      .select('vote_type')
      .eq('post_id', postId)
      .eq('user_id', user.id)
      .single();

    return { vote: vote?.vote_type || null };
  } catch (error) {
    return { vote: null };
  }
}

/**
 * Get user's vote on a specific comment
 */
export async function getUserCommentVote(commentId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { vote: null };
  }

  try {
    const { data: vote } = await supabase
      .from('comment_votes')
      .select('vote_type')
      .eq('comment_id', commentId)
      .eq('user_id', user.id)
      .single();

    return { vote: vote?.vote_type || null };
  } catch (error) {
    return { vote: null };
  }
}

/**
 * Create a new post (debate)
 * Ensures profile exists before creating the post
 */
export async function createPost(
  topic: string,
  description: string | null,
  quadrant: QuadrantType
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in to create a post' };
  }

  try {
    // Ensure profile exists (in case trigger failed)
    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .maybeSingle();

    if (!profile) {
      // Profile doesn't exist, create it
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          username: user.email?.split('@')[0] || `user_${user.id.substring(0, 8)}`,
          display_name: user.user_metadata?.display_name || 'Philosopher',
        });

      if (profileError) {
        console.error('[createPost] Profile creation error:', profileError);
        return { error: `Profile creation failed: ${profileError.message}` };
      }
    }

    // Create the post
    const { data, error: insertError } = await supabase
      .from('debates')
      .insert({
        topic,
        description,
        created_by: user.id,
        status: 'open',
        quadrant,
      })
      .select()
      .single();

    if (insertError) {
      console.error('[createPost] Insert error:', insertError);
      return { error: `Failed to create post: ${insertError.message}` };
    }

    revalidatePath('/debates');
    revalidatePath(`/debates?quadrant=${quadrant}`);

    return { success: true, data };
  } catch (error: any) {
    console.error('[createPost] Error:', error);
    const errorMessage = error?.message || error?.toString() || 'Failed to create post';
    return { error: errorMessage };
  }
}
