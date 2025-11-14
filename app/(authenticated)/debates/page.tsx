import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import DebateCard from './DebateCard';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function DebatesPage() {
  const supabase = await createClient();

  // Get the current user
  const { data: { user } } = await supabase.auth.getUser();

  let debates = [];

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
    }
  } catch (debatesError) {
    console.error('[DebatesPage] Unexpected error fetching debates:', debatesError);
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:px-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Active Debates</h1>
        <Link
          href="/debates/create"
          className="px-6 py-3 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition font-medium shadow-md"
        >
          + Create Debate
        </Link>
      </div>

      <div className="space-y-4">
        {debates && debates.length > 0 ? (
          debates.map((debate: any) => (
            <DebateCard
              key={debate.id}
              debate={debate}
              currentUserId={user?.id}
            />
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
