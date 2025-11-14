'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function deleteDebate(debateId: string) {
  try {
    const supabase = await createClient();

    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        success: false,
        error: 'You must be logged in to delete a debate',
      };
    }

    // Check if the user is the creator of the debate
    const { data: debate, error: fetchError } = await supabase
      .from('debates')
      .select('created_by, status')
      .eq('id', debateId)
      .single();

    if (fetchError) {
      return {
        success: false,
        error: 'Debate not found',
      };
    }

    if (debate.created_by !== user.id) {
      return {
        success: false,
        error: 'You can only delete your own debates',
      };
    }

    // Don't allow deletion of completed debates (optional business rule)
    if (debate.status === 'completed') {
      return {
        success: false,
        error: 'Cannot delete completed debates',
      };
    }

    // Delete the debate (arguments and judgments will be cascade deleted)
    const { error: deleteError } = await supabase
      .from('debates')
      .delete()
      .eq('id', debateId);

    if (deleteError) {
      console.error('[deleteDebate] Error:', deleteError);
      return {
        success: false,
        error: 'Failed to delete debate: ' + deleteError.message,
      };
    }

    // Revalidate the debates page to show updated list
    revalidatePath('/debates');

    return {
      success: true,
      message: 'Debate deleted successfully',
    };
  } catch (error: any) {
    console.error('[deleteDebate] Unexpected error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }
}
