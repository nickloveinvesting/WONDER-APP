'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

/**
 * Sign out the current user and redirect to home page
 */
export async function signOut() {
  const supabase = await createClient();
  
  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.error('Error signing out:', error);
  }
  
  redirect('/');
}
