import { createClient } from '@/lib/supabase/server';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Search, Archive, BookOpen, Tag } from 'lucide-react';

export const dynamic = 'force-dynamic';

type Props = {
  searchParams: Promise<{
    q?: string;
    school?: string;
    tag?: string;
  }>;
};

type VaultDebate = {
  id: string;
  topic: string;
  description: string | null;
  status: string;
  vault_status: string;
  vault_tags: string[];
  school_of_thought: string | null;
  quadrant: string | null;
  snap_count: number;
  zap_count: number;
  created_at: string;
  argument_count?: number;
};

export default async function VaultPage({ searchParams }: Props) {
  const supabase = await createClient();
  const { q, school, tag } = await searchParams;

  // Build query for vault debates
  let query = supabase
    .from('debates')
    .select('*')
    .order('created_at', { ascending: false });

  // Apply search filter
  if (q) {
    query = query.or(`topic.ilike.%${q}%,description.ilike.%${q}%`);
  }

  // Apply school of thought filter
  if (school) {
    query = query.eq('school_of_thought', school);
  }

  // Apply tag filter
  if (tag) {
    query = query.contains('vault_tags', [tag]);
  }

  const { data: debates, error } = await query.limit(50);

  // Get unique tags and schools for filters
  const { data: allDebates } = await supabase
    .from('debates')
    .select('vault_tags, school_of_thought')
    .not('vault_tags', 'is', null);

  const allTags = new Set<string>();
  const allSchools = new Set<string>();

  allDebates?.forEach(d => {
    if (d.vault_tags) d.vault_tags.forEach((t: string) => allTags.add(t));
    if (d.school_of_thought) allSchools.add(d.school_of_thought);
  });

  const getQuadrantName = (quadrant: string | null) => {
    if (!quadrant) return 'General';
    const names: Record<string, string> = {
      'ai_technology': 'AI & Tech',
      'philosophy': 'Philosophy',
      'morality_ethics': 'Ethics',
      'economics_society': 'Society',
    };
    return names[quadrant] || quadrant;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <Archive className="w-10 h-10 text-teal-600" />
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              The Vault
            </h1>
          </div>
          <p className="text-xl text-slate-600 font-medium">
            Permanent archive of philosophical discussions. Search, cite, and build upon collective wisdom.
          </p>
        </div>

        {/* Search & Filters */}
        <Card variant="gradient" className="mb-8">
          <form method="GET" className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="search"
                name="q"
                defaultValue={q || ''}
                placeholder="Search philosophical debates..."
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl text-lg font-medium focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all"
              />
            </div>

            {/* Filter Row */}
            <div className="flex flex-wrap gap-4">
              {/* School of Thought */}
              <select
                name="school"
                defaultValue={school || ''}
                className="px-4 py-2 border-2 border-slate-200 rounded-lg font-medium text-slate-700 focus:border-teal-500"
              >
                <option value="">All Schools</option>
                <option value="analytic">Analytic Philosophy</option>
                <option value="continental">Continental Philosophy</option>
                <option value="stoicism">Stoicism</option>
                <option value="existentialism">Existentialism</option>
                <option value="pragmatism">Pragmatism</option>
                <option value="virtue_ethics">Virtue Ethics</option>
                {Array.from(allSchools).map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>

              {/* Tags Dropdown */}
              <select
                name="tag"
                defaultValue={tag || ''}
                className="px-4 py-2 border-2 border-slate-200 rounded-lg font-medium text-slate-700 focus:border-teal-500"
              >
                <option value="">All Topics</option>
                <option value="ethics">Ethics</option>
                <option value="epistemology">Epistemology</option>
                <option value="metaphysics">Metaphysics</option>
                <option value="mind">Philosophy of Mind</option>
                <option value="ai">AI Philosophy</option>
                <option value="political">Political Philosophy</option>
                {Array.from(allTags).map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              <Button type="submit" variant="primary" size="md">
                Search Vault
              </Button>

              {(q || school || tag) && (
                <Link href="/vault">
                  <Button type="button" variant="secondary" size="md">
                    Clear Filters
                  </Button>
                </Link>
              )}
            </div>
          </form>
        </Card>

        {/* Results Info */}
        {(q || school || tag) && (
          <div className="mb-6 flex items-center gap-2 text-slate-600">
            <BookOpen className="w-5 h-5" />
            <span className="font-medium">
              {debates?.length || 0} discussions found
              {q && <span> matching &ldquo;{q}&rdquo;</span>}
              {school && <span> in {school}</span>}
              {tag && <span> tagged {tag}</span>}
            </span>
          </div>
        )}

        {/* Results */}
        <div className="space-y-4">
          {debates && debates.length > 0 ? (
            debates.map((debate: VaultDebate) => (
              <Link key={debate.id} href={`/debates/${debate.id}`}>
                <Card variant="standard" className="hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-1">
                      {/* Tags Row */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        {debate.quadrant && (
                          <Badge variant="status" color="slate" size="sm">
                            {getQuadrantName(debate.quadrant)}
                          </Badge>
                        )}
                        {debate.school_of_thought && (
                          <Badge variant="status" color="teal" size="sm">
                            {debate.school_of_thought}
                          </Badge>
                        )}
                        {debate.vault_tags?.slice(0, 3).map((tag: string) => (
                          <span key={tag} className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">
                        {debate.topic}
                      </h3>

                      {/* Description */}
                      {debate.description && (
                        <p className="text-slate-600 font-medium line-clamp-2 mb-3">
                          {debate.description}
                        </p>
                      )}

                      {/* Stats */}
                      <div className="flex flex-wrap gap-4 text-sm text-slate-500 font-medium">
                        <span>
                          {new Date(debate.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                        <span>
                          {(debate.snap_count || 0) + (debate.zap_count || 0)} engagements
                        </span>
                      </div>
                    </div>

                    {/* Citation Button */}
                    <div className="flex-shrink-0">
                      <span className="text-xs text-slate-400 font-medium">
                        Permanent Link
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))
          ) : (
            <Card variant="gradient" className="text-center py-16">
              <Archive className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-2xl font-black text-slate-900 mb-2">
                {q || school || tag ? 'No matching discussions' : 'Vault is being built'}
              </h3>
              <p className="text-slate-600 font-medium mb-6">
                {q || school || tag
                  ? 'Try adjusting your search or filters'
                  : 'Start a conversation and it will be permanently archived here'}
              </p>
              <Link href="/debates/create">
                <Button variant="primary" size="lg">
                  Start a Discussion
                </Button>
              </Link>
            </Card>
          )}
        </div>

        {/* Vault Info */}
        <Card variant="standard" className="mt-10">
          <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-teal-600" />
            About The Vault
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-slate-600 font-medium">
            <div>
              <h4 className="font-bold text-slate-900 mb-2">Permanent Storage</h4>
              <p className="text-sm">
                Every discussion is permanently archived. Unlike social media, ideas don&apos;t disappear here.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-2">Citable Knowledge</h4>
              <p className="text-sm">
                Each debate has a permanent URL. Reference and cite philosophical discussions in your work.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-2">Build Upon Ideas</h4>
              <p className="text-sm">
                See how arguments evolve over time. Add to discussions even years after they started.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
