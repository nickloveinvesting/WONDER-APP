import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeft, Edit, Share2, ExternalLink } from 'lucide-react';
import { PublishButton } from '@/components/PublishButton';

export const dynamic = 'force-dynamic';

export default async function JournalEntryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = await createClient();
  const { id } = await params;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Fetch the entry
  const { data: entry, error } = await supabase
    .from('journal_entries')
    .select('*, journal_folders(name, icon, color)')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (error || !entry) {
    redirect('/journal');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/journal" className="text-slate-600 hover:text-teal-600 transition font-bold inline-flex items-center gap-2 mb-6">
            <ArrowLeft size={18} />
            Back to Journal
          </Link>

          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex-1">
              <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-3 tracking-tight">
                {entry.title}
              </h1>
              <div className="flex items-center gap-3 text-sm text-slate-500 font-bold">
                {entry.journal_folders && (
                  <span className="flex items-center gap-1">
                    {entry.journal_folders.icon} {entry.journal_folders.name}
                  </span>
                )}
                <span>•</span>
                <span>Created {new Date(entry.created_at).toLocaleDateString()}</span>
                <span>•</span>
                <span>Updated {new Date(entry.updated_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <Link href={`/journal/${entry.id}/edit`}>
              <Button variant="secondary" size="md">
                <Edit size={18} />
                Edit Entry
              </Button>
            </Link>

            {entry.is_published ? (
              <Link href={`/debates/${entry.published_debate_id}`}>
                <Button variant="primary" size="md">
                  <ExternalLink size={18} />
                  View Published Post
                </Button>
              </Link>
            ) : (
              <PublishButton entryId={entry.id} />
            )}
          </div>

          {/* Status Badges */}
          <div className="flex gap-2 mb-6">
            {entry.is_published && (
              <Badge variant="status" color="teal" size="md">
                Published on {new Date(entry.published_at).toLocaleDateString()}
              </Badge>
            )}
            {!entry.is_published && (
              <Badge variant="status" color="slate" size="md">
                🔒 Private
              </Badge>
            )}
          </div>

          {/* Tags */}
          {entry.tags && entry.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-6">
              {entry.tags.map((tag: string) => (
                <Badge key={tag} variant="status" color="slate" size="sm">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl border-2 border-slate-200 p-8 shadow-lg">
          <div className="prose prose-slate max-w-none">
            <div className="whitespace-pre-wrap text-slate-700 font-medium leading-relaxed">
              {entry.content}
            </div>
          </div>
        </div>

        {/* Info Box */}
        {!entry.is_published && (
          <div className="mt-8 bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200 rounded-xl p-6">
            <h3 className="text-slate-900 font-black mb-2 flex items-center gap-2">
              <Share2 size={20} className="text-teal-600" />
              Ready to Share?
            </h3>
            <p className="text-slate-700 text-sm font-medium leading-relaxed mb-4">
              When you're ready to share this entry with the Ponder community, click "Publish to
              Community" above. You'll be able to choose which quadrant to post in, and your entry
              will become a public discussion thread.
            </p>
            <p className="text-xs text-slate-600 font-medium">
              Note: Once published, the post becomes public but this journal entry remains private.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
