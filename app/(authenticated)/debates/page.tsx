import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function DebatesPage() {
  const supabase = await createClient();

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-argued-success/20 text-argued-success border border-argued-success/30';
      case 'in_progress':
        return 'bg-argued-brown/20 text-argued-brown border border-argued-brown/30';
      default:
        return 'bg-argued-navy/20 text-argued-navy border border-argued-navy/30';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 lg:px-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-argued-navy mb-2">Active Debates</h1>
          <p className="text-argued-navy">Join philosophical discourse and earn DeLO rating</p>
        </div>
        <Link href="/debates/create">
          <Button variant="primary" size="lg">
            + Create Debate
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {debates && debates.length > 0 ? (
          debates.map((debate: any) => (
            <Link
              key={debate.id}
              href={`/debates/${debate.id}`}
              className="block bg-white rounded-xl p-6 border border-argued-cream hover:border-argued-navy hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-argued-navy mb-2">{debate.topic}</h3>
                  {debate.description && (
                    <p className="text-argued-navy mb-3">{debate.description}</p>
                  )}
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ml-4 ${getStatusColor(debate.status)}`}>
                  {debate.status?.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              <div className="flex gap-4 text-sm text-argued-navy">
                <span>👤 {debate.participant_count || 2} participants</span>
                <span>💬 {debate.argument_count || 0} arguments</span>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-argued-cream">
            <p className="text-argued-navy text-lg font-medium mb-4">No debates yet. Be the first!</p>
            <Link href="/debates/create">
              <Button variant="primary" size="lg">
                Create First Debate
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
