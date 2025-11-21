import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { isAdminEmail, banUser, unbanUser, logAdminAction } from '@/lib/admin/utils';

export async function GET(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user?.email || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('id');

  if (userId) {
    // Get single user details
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if user is banned
    const { data: bans } = await supabase
      .from('user_bans')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .limit(1);

    return NextResponse.json({
      user: profile,
      isBanned: (bans?.length || 0) > 0,
      ban: bans?.[0] || null,
    });
  }

  return NextResponse.json({ error: 'User ID required' }, { status: 400 });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user?.email || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { action, userId, reason, banType, expiresAt } = body;

  if (!action || !userId) {
    return NextResponse.json({ error: 'Action and userId are required' }, { status: 400 });
  }

  switch (action) {
    case 'ban': {
      if (!reason) {
        return NextResponse.json({ error: 'Reason is required for banning' }, { status: 400 });
      }
      const { error } = await banUser(
        userId,
        user.email,
        reason,
        banType || 'permanent',
        expiresAt ? new Date(expiresAt) : undefined
      );
      if (error) {
        return NextResponse.json({ error: 'Failed to ban user' }, { status: 500 });
      }
      return NextResponse.json({ success: true, message: 'User banned successfully' });
    }

    case 'unban': {
      const { error } = await unbanUser(userId, user.email);
      if (error) {
        return NextResponse.json({ error: 'Failed to unban user' }, { status: 500 });
      }
      return NextResponse.json({ success: true, message: 'User unbanned successfully' });
    }

    case 'delete_content': {
      // Delete all user's content
      const [argumentsResult, commentsResult] = await Promise.all([
        supabase.from('arguments').delete().eq('user_id', userId),
        supabase.from('discussion_comments').delete().eq('user_id', userId),
      ]);

      await logAdminAction(user.email, 'delete_user_content', userId, 'user');

      return NextResponse.json({
        success: true,
        message: 'User content deleted',
        deleted: {
          arguments: argumentsResult.count || 0,
          comments: commentsResult.count || 0,
        },
      });
    }

    default:
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  }
}
