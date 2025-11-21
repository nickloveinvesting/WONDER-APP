import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { isAdminEmail, resolveReport, logAdminAction } from '@/lib/admin/utils';

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user?.email || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { action, reportId, resolution, notes, contentId, contentType, userId, reason } = body;

  switch (action) {
    case 'resolve_report': {
      if (!reportId || !resolution) {
        return NextResponse.json({ error: 'Report ID and resolution are required' }, { status: 400 });
      }
      const { error } = await resolveReport(reportId, user.email, resolution, notes);
      if (error) {
        return NextResponse.json({ error: 'Failed to resolve report' }, { status: 500 });
      }
      return NextResponse.json({ success: true, message: 'Report resolved' });
    }

    case 'delete_content': {
      if (!contentId || !contentType) {
        return NextResponse.json({ error: 'Content ID and type are required' }, { status: 400 });
      }

      let error;
      switch (contentType) {
        case 'comment':
          ({ error } = await supabase.from('discussion_comments').delete().eq('id', contentId));
          break;
        case 'argument':
          ({ error } = await supabase.from('arguments').delete().eq('id', contentId));
          break;
        case 'debate':
          ({ error } = await supabase.from('debates').delete().eq('id', contentId));
          break;
        case 'discussion':
          ({ error } = await supabase.from('discussions').delete().eq('id', contentId));
          break;
        default:
          return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
      }

      if (error) {
        return NextResponse.json({ error: 'Failed to delete content' }, { status: 500 });
      }

      await logAdminAction(user.email, 'delete_content', contentId, contentType);
      return NextResponse.json({ success: true, message: 'Content deleted' });
    }

    case 'ban_user': {
      if (!userId || !reason) {
        return NextResponse.json({ error: 'User ID and reason are required' }, { status: 400 });
      }

      const { error } = await supabase.from('user_bans').insert({
        user_id: userId,
        banned_by: user.email,
        reason,
        ban_type: 'permanent',
      });

      if (error) {
        return NextResponse.json({ error: 'Failed to ban user' }, { status: 500 });
      }

      await logAdminAction(user.email, 'ban_user', userId, 'user', { reason });
      return NextResponse.json({ success: true, message: 'User banned' });
    }

    default:
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  }
}
