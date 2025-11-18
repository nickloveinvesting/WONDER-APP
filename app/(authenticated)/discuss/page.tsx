import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { DiscussionCard } from '@/components/ui/DiscussionCard';
import { Button } from '@/components/ui/Button';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type CategoryFilter = 'all' | 'moral' | 'ai' | 'philosophical' | 'existential';

interface PageProps {
  searchParams: Promise<{ category?: CategoryFilter }>;
}

export default async function DiscussPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const supabase = await createClient();
  const category = params.category || 'all';

  let discussions = [];

  try {
    let query = supabase
      .from('discussions')
      .select('*')
      .order('created_at', { ascending: false });

    if (category !== 'all') {
      query = query.eq('category', category);
    }

    const { data: discussionsData, error: discussionsError } = await query;

    if (discussionsError) {
      // Discussions fetch error - fail silently
    } else {
      discussions = discussionsData || [];
    }
  } catch (error) {
    // Unexpected error fetching discussions - fail silently
  }

  const categories: { value: CategoryFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'moral', label: 'Moral' },
    { value: 'ai', label: 'AI' },
    { value: 'philosophical', label: 'Philosophical' },
    { value: 'existential', label: 'Existential' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Discuss</h1>
        <p className="text-slate-600 text-lg">Explore ideas without judgment</p>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <Link key={cat.value} href={`/discuss?category=${cat.value}`}>
              <Button
                variant={category === cat.value ? 'primary' : 'ghost'}
                size="sm"
              >
                {cat.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>

      {/* Discussions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {discussions && discussions.length > 0 ? (
          discussions.map((discussion: any) => (
            <Link key={discussion.id} href={`/discuss/${discussion.id}`}>
              <DiscussionCard
                id={discussion.id}
                question={discussion.question}
                description={discussion.description || ''}
                category={discussion.category}
                commentCount={discussion.comment_count || 0}
                onClick={() => {}}
              />
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-16 bg-white rounded-xl border border-slate-200">
            <p className="text-slate-600 text-lg font-medium">
              No discussions found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
