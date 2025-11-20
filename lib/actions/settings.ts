'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateProfile(data: {
    displayName?: string;
    bio?: string;
}) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'You must be logged in' };
    }

    try {
        const updateData: any = {};

        if (data.displayName !== undefined) {
            updateData.display_name = data.displayName;
        }

        if (data.bio !== undefined) {
            updateData.bio = data.bio;
        }

        const { error } = await supabase
            .from('profiles')
            .update(updateData)
            .eq('id', user.id);

        if (error) throw error;

        revalidatePath('/settings');
        revalidatePath('/profile');

        return { success: true };
    } catch (error: any) {
        console.error('[updateProfile] Error:', error);
        return { error: error.message || 'Failed to update profile' };
    }
}
