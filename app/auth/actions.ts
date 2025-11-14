'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

/**
 * Server Action: Sign in with email and password
 * 
 * This runs entirely on the server, ensuring:
 * 1. Cookies are set server-side
 * 2. Redirect happens server-side
 * 3. No race conditions with client navigation
 * 
 * @param prevState - Previous form state from useFormState
 * @param formData - Form data containing email and password
 * @returns Error object if auth fails, otherwise redirects
 */
export async function signIn(
  prevState: { error?: string } | null,
  formData: FormData
): Promise<{ error?: string } | null> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Validate inputs
  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  try {
    const supabase = await createClient();
    
    // Sign in with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('[signIn] Authentication failed:', error.message);
      return { error: error.message };
    }

    if (!data.user || !data.session) {
      return { error: 'Authentication failed - no user data returned' };
    }

    console.log(`[signIn] User authenticated: ${data.user.id}`);

    // Revalidate the debates page to ensure fresh data
    revalidatePath('/debates');
    
    // Server-side redirect - cookies are already set, no race condition
    redirect('/debates');
  } catch (error: any) {
    console.error('[signIn] Unexpected error:', error);
    
    // If this is a redirect (which throws), re-throw it
    if (error?.message?.includes('NEXT_REDIRECT')) {
      throw error;
    }
    
    return { error: error.message || 'An unexpected error occurred' };
  }
}

/**
 * Server Action: Sign out
 * 
 * @returns Redirects to home page after sign out
 */
export async function signOut() {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
    
    // Revalidate all auth-protected pages
    revalidatePath('/debates');
    revalidatePath('/debates/create');
    
    redirect('/');
  } catch (error: any) {
    console.error('[signOut] Error:', error);
    
    // If this is a redirect (which throws), re-throw it
    if (error?.message?.includes('NEXT_REDIRECT')) {
      throw error;
    }
    
    throw error;
  }
}
