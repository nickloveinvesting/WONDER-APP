'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { createJournalEntry } from '@/lib/actions/journal';

export default function NewJournalEntryPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const tagArray = tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const result = await createJournalEntry({
        title,
        content,
        tags: tagArray,
      });

      if (result.error) {
        setError(result.error);
        return;
      }

      router.push(`/journal/${result.entry.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create entry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        <div className="mb-6">
          <Link href="/journal" className="text-slate-600 hover:text-teal-600 transition font-bold">
            ← Back to Journal
          </Link>
        </div>

        <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-3 tracking-tight">
          New Journal Entry
        </h1>
        <p className="text-xl text-slate-600 font-medium mb-8">
          This entry is private—only you can see it unless you choose to publish it
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border-2 border-red-400 text-red-900 px-5 py-4 rounded-xl font-bold">
              {error}
            </div>
          )}

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-black text-slate-900 mb-3 uppercase tracking-wide">
              Title *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-5 py-4 bg-white border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition font-medium"
              placeholder="Give your entry a title..."
            />
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-black text-slate-900 mb-3 uppercase tracking-wide">
              Content *
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={16}
              className="w-full px-5 py-4 bg-white border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition resize-none font-medium leading-relaxed"
              placeholder="Write your thoughts, research, or ideas here..."
            />
            <p className="text-sm text-slate-500 mt-2 font-medium">
              {content.length} characters
            </p>
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-black text-slate-900 mb-3 uppercase tracking-wide">
              Tags (Optional)
            </label>
            <input
              id="tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-5 py-4 bg-white border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition font-medium"
              placeholder="ethics, consciousness, ai (comma-separated)"
            />
            <p className="text-sm text-slate-500 mt-2 font-medium">
              Add tags to organize and find this entry later
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
            <h3 className="text-slate-900 font-black mb-3 flex items-center gap-2">
              <span className="text-xl">🔒</span>
              Private by Default
            </h3>
            <p className="text-slate-700 text-sm font-medium leading-relaxed">
              This journal entry is completely private. Only you can see it. If you want to share your
              ideas with the community, you can publish it as a post later from the entry page.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-8 py-4 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 font-black text-lg"
            >
              {loading ? 'Saving...' : 'Save Entry'}
            </button>
            <Link
              href="/journal"
              className="px-8 py-4 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all text-center font-bold flex items-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
