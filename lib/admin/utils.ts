import { createClient } from '@/lib/supabase/server';

// Admin email whitelist - only these emails can access admin
const ADMIN_EMAILS = ['nickloveacquisition@gmail.com'];

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email);
}

export async function getAdminUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user?.email || !isAdminEmail(user.email)) {
    return null;
  }

  return user;
}

export async function logAdminAction(
  adminEmail: string,
  action: string,
  targetId?: string,
  targetType?: string,
  details?: Record<string, unknown>
) {
  const supabase = await createClient();

  await supabase.from('admin_logs').insert({
    admin_email: adminEmail,
    action,
    target_id: targetId,
    target_type: targetType,
    details,
  });
}

// Dashboard stats fetching
export async function getDashboardStats() {
  const supabase = await createClient();
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  // Fetch all stats in parallel
  const [
    totalUsersResult,
    newUsersResult,
    activeDebatesResult,
    totalDiscussionsResult,
    totalCommentsResult,
    pendingReportsResult,
    recentUsersResult,
  ] = await Promise.all([
    // Total users
    supabase.from('profiles').select('id', { count: 'exact', head: true }),
    // New users (last 24h)
    supabase
      .from('profiles')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', yesterday.toISOString()),
    // Active debates
    supabase
      .from('debates')
      .select('id', { count: 'exact', head: true })
      .in('status', ['open', 'in_progress']),
    // Total discussions
    supabase.from('discussions').select('id', { count: 'exact', head: true }),
    // Total comments
    supabase.from('discussion_comments').select('id', { count: 'exact', head: true }),
    // Pending reports
    supabase
      .from('content_reports')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'pending'),
    // Recent users for activity feed
    supabase
      .from('profiles')
      .select('id, username, created_at')
      .order('created_at', { ascending: false })
      .limit(5),
  ]);

  return {
    totalUsers: totalUsersResult.count || 0,
    newUsers24h: newUsersResult.count || 0,
    activeDebates: activeDebatesResult.count || 0,
    totalDiscussions: totalDiscussionsResult.count || 0,
    totalComments: totalCommentsResult.count || 0,
    pendingReports: pendingReportsResult.count || 0,
    recentUsers: recentUsersResult.data || [],
  };
}

// User management functions
export async function getAllUsers(page = 1, limit = 20, filter = 'all') {
  const supabase = await createClient();
  const offset = (page - 1) * limit;

  let query = supabase
    .from('profiles')
    .select('id, username, display_name, created_at, delo_rating, daily_streak, influence_score, debates_participated, total_messages', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (filter === 'new') {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    query = query.gte('created_at', weekAgo.toISOString());
  }

  const { data, count, error } = await query;

  return { users: data || [], total: count || 0, error };
}

export async function banUser(userId: string, adminEmail: string, reason: string, banType: 'permanent' | 'temporary' = 'permanent', expiresAt?: Date) {
  const supabase = await createClient();

  const { error } = await supabase.from('user_bans').insert({
    user_id: userId,
    banned_by: adminEmail,
    reason,
    ban_type: banType,
    expires_at: expiresAt?.toISOString(),
  });

  if (!error) {
    await logAdminAction(adminEmail, 'ban_user', userId, 'user', { reason, banType });
  }

  return { error };
}

export async function unbanUser(userId: string, adminEmail: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('user_bans')
    .update({ is_active: false })
    .eq('user_id', userId)
    .eq('is_active', true);

  if (!error) {
    await logAdminAction(adminEmail, 'unban_user', userId, 'user');
  }

  return { error };
}

// Moderation functions
export async function getContentReports(status = 'pending', page = 1, limit = 20) {
  const supabase = await createClient();
  const offset = (page - 1) * limit;

  const { data, count, error } = await supabase
    .from('content_reports')
    .select(`
      id,
      content_id,
      content_type,
      reason,
      details,
      status,
      created_at,
      reporter:reporter_id(username)
    `, { count: 'exact' })
    .eq('status', status)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  return { reports: data || [], total: count || 0, error };
}

export async function resolveReport(reportId: string, adminEmail: string, resolution: 'resolved' | 'dismissed', notes?: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('content_reports')
    .update({
      status: resolution,
      resolved_by: adminEmail,
      resolution_notes: notes,
      resolved_at: new Date().toISOString(),
    })
    .eq('id', reportId);

  if (!error) {
    await logAdminAction(adminEmail, 'resolve_report', reportId, 'report', { resolution, notes });
  }

  return { error };
}

// Platform settings functions
export async function getPlatformSettings() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('platform_settings')
    .select('key, value, updated_at');

  const settings: Record<string, unknown> = {};
  data?.forEach(row => {
    settings[row.key] = row.value;
  });

  return { settings, error };
}

export async function updatePlatformSetting(key: string, value: unknown, adminEmail: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('platform_settings')
    .upsert({
      key,
      value,
      updated_by: adminEmail,
      updated_at: new Date().toISOString(),
    });

  if (!error) {
    await logAdminAction(adminEmail, 'update_setting', key, 'setting', { value });
  }

  return { error };
}

// Announcements functions
export async function createAnnouncement(
  title: string,
  message: string,
  adminEmail: string,
  targetAudience = 'all',
  sendEmail = false,
  expiresAt?: Date
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('announcements')
    .insert({
      title,
      message,
      target_audience: targetAudience,
      sent_by: adminEmail,
      sent_via_email: sendEmail,
      expires_at: expiresAt?.toISOString(),
    })
    .select()
    .single();

  if (!error) {
    await logAdminAction(adminEmail, 'create_announcement', data.id, 'announcement', { title, targetAudience });
  }

  return { announcement: data, error };
}

export async function getAnnouncements(includeExpired = false) {
  const supabase = await createClient();

  let query = supabase
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false });

  if (!includeExpired) {
    query = query.eq('is_active', true);
  }

  const { data, error } = await query;

  return { announcements: data || [], error };
}

// Analytics functions
export async function getAnalyticsData(days = 7) {
  const supabase = await createClient();
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  // Get user signups by day
  const { data: signupData } = await supabase
    .from('profiles')
    .select('created_at')
    .gte('created_at', startDate.toISOString());

  // Get debates by day
  const { data: debateData } = await supabase
    .from('debates')
    .select('created_at')
    .gte('created_at', startDate.toISOString());

  // Get comments by day
  const { data: commentData } = await supabase
    .from('discussion_comments')
    .select('created_at')
    .gte('created_at', startDate.toISOString());

  // Group by day
  const dailySignups = groupByDay(signupData || [], 'created_at', days);
  const dailyDebates = groupByDay(debateData || [], 'created_at', days);
  const dailyComments = groupByDay(commentData || [], 'created_at', days);

  // Get top contributors
  const { data: topContributors } = await supabase
    .from('profiles')
    .select('id, username, influence_score, total_messages, debates_participated')
    .order('influence_score', { ascending: false })
    .limit(10);

  return {
    dailySignups,
    dailyDebates,
    dailyComments,
    topContributors: topContributors || [],
  };
}

function groupByDay(data: { created_at: string }[], dateField: string, days: number) {
  const result: { date: string; count: number }[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    const dateStr = date.toISOString().split('T')[0];
    const count = data.filter(item =>
      item[dateField as keyof typeof item]?.toString().startsWith(dateStr)
    ).length;
    result.push({ date: dateStr, count });
  }

  return result;
}

// Admin logs
export async function getAdminLogs(page = 1, limit = 50) {
  const supabase = await createClient();
  const offset = (page - 1) * limit;

  const { data, count, error } = await supabase
    .from('admin_logs')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  return { logs: data || [], total: count || 0, error };
}
