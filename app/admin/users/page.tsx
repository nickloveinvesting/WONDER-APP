import { getAllUsers } from '@/lib/admin/utils';
import { createClient } from '@/lib/supabase/server';
import { Users, Search, Filter, Ban, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ page?: string; filter?: string; search?: string }>;
}

export default async function AdminUsersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const filter = params.filter || 'all';
  const search = params.search || '';

  const { users, total } = await getAllUsers(page, 20, filter);
  const totalPages = Math.ceil(total / 20);

  // Get banned users
  const supabase = await createClient();
  const { data: bans } = await supabase
    .from('user_bans')
    .select('user_id')
    .eq('is_active', true);
  const bannedUserIds = new Set(bans?.map(b => b.user_id) || []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Users className="w-8 h-8 text-teal-400" />
            User Management
          </h1>
          <p className="text-slate-400 mt-1">
            {total} total users
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex items-center gap-4">
        <div className="flex items-center gap-2 flex-1">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search users..."
            defaultValue={search}
            className="bg-slate-700 text-white px-4 py-2 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-slate-400" />
          <select
            defaultValue={filter}
            className="bg-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">All Users</option>
            <option value="new">New (Last 7 days)</option>
            <option value="active">Active</option>
            <option value="banned">Banned</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-700/50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">User</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Joined</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">DeLO Rating</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Influence</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Activity</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Status</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {users.map((user) => {
              const isBanned = bannedUserIds.has(user.id);
              return (
                <tr key={user.id} className="hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-medium">
                        {user.username?.[0]?.toUpperCase() || '?'}
                      </div>
                      <div>
                        <p className="text-white font-medium">{user.username || 'Anonymous'}</p>
                        <p className="text-sm text-slate-400">{user.display_name || 'No display name'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white font-medium">{user.delo_rating || 800}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-teal-400 font-medium">{user.influence_score || 0}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    <div className="text-sm">
                      <p>{user.debates_participated || 0} debates</p>
                      <p>{user.total_messages || 0} messages</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {isBanned ? (
                      <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-sm">
                        Banned
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">
                        Active
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/users/${user.id}`}
                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded transition-colors"
                        title={isBanned ? 'Unban User' : 'Ban User'}
                      >
                        <Ban className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-6 py-4 bg-slate-700/30 flex items-center justify-between">
          <p className="text-sm text-slate-400">
            Showing {(page - 1) * 20 + 1} to {Math.min(page * 20, total)} of {total} users
          </p>
          <div className="flex items-center gap-2">
            <Link
              href={`/admin/users?page=${Math.max(1, page - 1)}&filter=${filter}`}
              className={`p-2 rounded ${page <= 1 ? 'text-slate-600 cursor-not-allowed' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <span className="text-slate-400">
              Page {page} of {totalPages}
            </span>
            <Link
              href={`/admin/users?page=${Math.min(totalPages, page + 1)}&filter=${filter}`}
              className={`p-2 rounded ${page >= totalPages ? 'text-slate-600 cursor-not-allowed' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
            >
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
