'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

/**
 * Create a new journal folder
 */
export async function createJournalFolder(name: string, icon?: string, color?: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in' };
  }

  try {
    const { data, error } = await supabase
      .from('journal_folders')
      .insert({
        user_id: user.id,
        name,
        icon: icon || '📓',
        color: color || '#64748b',
      })
      .select()
      .single();

    if (error) throw error;

    revalidatePath('/journal');
    return { success: true, folder: data };
  } catch (error: any) {
    console.error('[createJournalFolder] Error:', error);
    return { error: error.message || 'Failed to create folder' };
  }
}

/**
 * Update a journal folder
 */
export async function updateJournalFolder(
  folderId: string,
  updates: { name?: string; icon?: string; color?: string }
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in' };
  }

  try {
    const { data, error } = await supabase
      .from('journal_folders')
      .update(updates)
      .eq('id', folderId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;

    revalidatePath('/journal');
    return { success: true, folder: data };
  } catch (error: any) {
    console.error('[updateJournalFolder] Error:', error);
    return { error: error.message || 'Failed to update folder' };
  }
}

/**
 * Delete a journal folder
 */
export async function deleteJournalFolder(folderId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in' };
  }

  try {
    const { error } = await supabase
      .from('journal_folders')
      .delete()
      .eq('id', folderId)
      .eq('user_id', user.id);

    if (error) throw error;

    revalidatePath('/journal');
    return { success: true };
  } catch (error: any) {
    console.error('[deleteJournalFolder] Error:', error);
    return { error: error.message || 'Failed to delete folder' };
  }
}

/**
 * Create a new journal entry
 */
export async function createJournalEntry(data: {
  title: string;
  content: string;
  folderId?: string;
  tags?: string[];
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in' };
  }

  try {
    const { data: entry, error } = await supabase
      .from('journal_entries')
      .insert({
        user_id: user.id,
        title: data.title,
        content: data.content,
        folder_id: data.folderId || null,
        tags: data.tags || [],
      })
      .select()
      .single();

    if (error) throw error;

    revalidatePath('/journal');
    return { success: true, entry };
  } catch (error: any) {
    console.error('[createJournalEntry] Error:', error);
    return { error: error.message || 'Failed to create entry' };
  }
}

/**
 * Update a journal entry
 */
export async function updateJournalEntry(
  entryId: string,
  updates: {
    title?: string;
    content?: string;
    folderId?: string;
    tags?: string[];
  }
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in' };
  }

  try {
    const updateData: any = {};
    if (updates.title !== undefined) updateData.title = updates.title;
    if (updates.content !== undefined) updateData.content = updates.content;
    if (updates.folderId !== undefined) updateData.folder_id = updates.folderId;
    if (updates.tags !== undefined) updateData.tags = updates.tags;

    const { data, error } = await supabase
      .from('journal_entries')
      .update(updateData)
      .eq('id', entryId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;

    revalidatePath('/journal');
    revalidatePath(`/journal/${entryId}`);
    return { success: true, entry: data };
  } catch (error: any) {
    console.error('[updateJournalEntry] Error:', error);
    return { error: error.message || 'Failed to update entry' };
  }
}

/**
 * Delete a journal entry
 */
export async function deleteJournalEntry(entryId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in' };
  }

  try {
    const { error } = await supabase
      .from('journal_entries')
      .delete()
      .eq('id', entryId)
      .eq('user_id', user.id);

    if (error) throw error;

    revalidatePath('/journal');
    return { success: true };
  } catch (error: any) {
    console.error('[deleteJournalEntry] Error:', error);
    return { error: error.message || 'Failed to delete entry' };
  }
}

/**
 * Publish a journal entry as a community post
 */
export async function publishJournalEntry(
  entryId: string,
  quadrant: 'ai_technology' | 'philosophy' | 'morality_ethics' | 'economics_society'
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in' };
  }

  try {
    // Get the journal entry
    const { data: entry, error: fetchError } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('id', entryId)
      .eq('user_id', user.id)
      .single();

    if (fetchError) throw fetchError;

    if (entry.is_published) {
      return { error: 'This entry has already been published' };
    }

    // Create a debate from the journal entry
    const { data: debate, error: debateError } = await supabase
      .from('debates')
      .insert({
        topic: entry.title,
        description: entry.content,
        created_by: user.id,
        status: 'open',
        quadrant,
        tags: entry.tags,
      })
      .select()
      .single();

    if (debateError) throw debateError;

    // Mark the journal entry as published
    const { error: updateError } = await supabase
      .from('journal_entries')
      .update({
        is_published: true,
        published_debate_id: debate.id,
        published_at: new Date().toISOString(),
      })
      .eq('id', entryId);

    if (updateError) throw updateError;

    revalidatePath('/journal');
    revalidatePath(`/journal/${entryId}`);
    revalidatePath('/debates');
    return { success: true, debateId: debate.id };
  } catch (error: any) {
    console.error('[publishJournalEntry] Error:', error);
    return { error: error.message || 'Failed to publish entry' };
  }
}
