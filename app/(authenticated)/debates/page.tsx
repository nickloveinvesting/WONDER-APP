import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

// Prevent caching - server component must run on every request
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function DebatesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let debates = [];

  // Fetch debates
  try {
    const { data: debatesData, error: debatesError } = await supabase
      .from('debates')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);

    if (debatesError) {
      console.error('[DebatesPage] Debates fetch error:', debatesError.message);
    } else {
      debates = debatesData || [];
      console.log(`[DebatesPage] Loaded ${debates.length} debates`);
    }
  } catch (debatesError) {
    console.error('[DebatesPage] Unexpected error fetching debates:', debatesError);
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-500/20 text-green-300';
      case 'in_progress':
        return 'bg-yellow-500/20 text-yellow-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 lg:px-8">
      {/* Create Debate Button */}
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Active Debates</h1>
        <Link
          href="/debates/create"
          className="px-6 py-3 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition font-medium"
        >
          + Create Debate
        </Link>
      </div>

      {/* Debates List */}
      <div className="space-y-4">
        {debates && debates.length > 0 ? (
          debates.map((debate: any) => (
            <Link
              key={debate.id}
              href={`/debates/${debate.id}`}
              className="block bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-accent-500 transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{debate.topic}</h3>
                  {debate.description && (
                    <p className="text-gray-300 mb-3">{debate.description}</p>
                  )}
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(debate.status)}`}>
                  {debate.status?.replace('_', ' ')}
                </span>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-4">No debates yet. Be the first!</p>
            <Link
              href="/debates/create"
              className="inline-block px-6 py-3 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition"
            >
              Create First Debate
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
