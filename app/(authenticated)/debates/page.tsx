import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge type="success" size="sm">OPEN</Badge>;
      case 'in_progress':
        return <Badge variant="status" color="teal" size="sm">IN PROGRESS</Badge>;
      default:
        return <Badge variant="status" color="slate" size="sm">{status.toUpperCase()}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-2 tracking-tight">
              Active Debates
            </h1>
            <p className="text-xl text-slate-600 font-medium">
              Join philosophical discourse and earn DeLO rating
            </p>
          </div>
          <Link href="/debates/create">
            <Button variant="primary" size="lg">
              + Create Debate
            </Button>
          </Link>
        </div>

        {/* Debates List */}
        <div className="space-y-6">
          {debates && debates.length > 0 ? (
            debates.map((debate: any) => (
              <Link key={debate.id} href={`/debates/${debate.id}`}>
                <Card variant="standard" className="hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-2xl font-black text-slate-900 hover:text-teal-600 transition-colors">
                          {debate.topic}
                        </h3>
                        {getStatusBadge(debate.status)}
                      </div>
                      {debate.description && (
                        <p className="text-slate-600 leading-relaxed font-medium mb-4">
                          {debate.description}
                        </p>
                      )}
                      <div className="flex gap-6 text-sm text-slate-500 font-bold">
                        <span className="flex items-center gap-2">
                          <span className="text-lg">👤</span>
                          {debate.participant_count || 2} participants
                        </span>
                        <span className="flex items-center gap-2">
                          <span className="text-lg">💬</span>
                          {debate.argument_count || 0} arguments
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))
          ) : (
            <Card variant="gradient" className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="text-6xl mb-6">🤔</div>
                <h3 className="text-2xl font-black text-slate-900 mb-3">
                  No debates yet
                </h3>
                <p className="text-lg text-slate-600 font-medium mb-6">
                  Be the first to start a philosophical debate!
                </p>
                <Link href="/debates/create">
                  <Button variant="primary" size="lg">
                    Create First Debate
                  </Button>
                </Link>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
