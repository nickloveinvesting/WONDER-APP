import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { isAdminEmail, createAnnouncement, getAnnouncements, logAdminAction } from '@/lib/admin/utils';

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user?.email || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { announcements, error } = await getAnnouncements(true);

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch announcements' }, { status: 500 });
  }

  return NextResponse.json({ announcements });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user?.email || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { title, message, targetAudience, sendEmail } = body;

  if (!title || !message) {
    return NextResponse.json({ error: 'Title and message are required' }, { status: 400 });
  }

  const { announcement, error } = await createAnnouncement(
    title,
    message,
    user.email,
    targetAudience || 'all',
    sendEmail || false
  );

  if (error) {
    return NextResponse.json({ error: 'Failed to create announcement' }, { status: 500 });
  }

  return NextResponse.json({ announcement });
}

export async function DELETE(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user?.email || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Announcement ID required' }, { status: 400 });
  }

  const { error } = await supabase
    .from('announcements')
    .update({ is_active: false })
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: 'Failed to delete announcement' }, { status: 500 });
  }

  await logAdminAction(user.email, 'delete_announcement', id, 'announcement');

  return NextResponse.json({ success: true });
}
