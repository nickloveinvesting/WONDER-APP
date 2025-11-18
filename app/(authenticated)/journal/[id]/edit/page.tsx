'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { updateJournalEntry, deleteJournalEntry } from '@/lib/actions/journal';
import { createClient } from '@/lib/supabase/client';
import { Trash2 } from 'lucide-react';

export default function EditJournalEntryPage() {
  const params = useParams();
  const entryId = params.id as string;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function fetchEntry() {
      try {
        const { data, error } = await supabase
          .from('journal_entries')
          .select('*')
          .eq('id', entryId)
          .single();

        if (error) throw error;

        setTitle(data.title);
        setContent(data.content);
        setTags(data.tags ? data.tags.join(', ') : '');
      } catch (err: any) {
        setError(err.message || 'Failed to load entry');
      } finally {
        setLoading(false);
      }
    }

    fetchEntry();
  }, [entryId, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const tagArray = tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const result = await updateJournalEntry(entryId, {
        title,
        content,
        tags: tagArray,
      });

      if (result.error) {
        setError(result.error);
        return;
      }

      router.push(`/journal/${entryId}`);
    } catch (err: any) {
      setError(err.message || 'Failed to update entry');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    setError('');

    try {
      const result = await deleteJournalEntry(entryId);

      if (result.error) {
        setError(result.error);
        setDeleting(false);
        return;
      }

      router.push('/journal');
    } catch (err: any) {
      setError(err.message || 'Failed to delete entry');
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50 flex items-center justify-center">
        <div className="text-xl font-bold text-slate-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        <div className="mb-6">
          <Link href={`/journal/${entryId}`} className="text-slate-600 hover:text-teal-600 transition font-bold">
            ← Back to Entry
          </Link>
        </div>

        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-3 tracking-tight">
              Edit Entry
            </h1>
            <p className="text-xl text-slate-600 font-medium">
              Make changes to your journal entry
            </p>
          </div>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition font-bold flex items-center gap-2"
          >
            <Trash2 size={18} />
            Delete
          </button>
        </div>

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
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-8 py-4 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 font-black text-lg"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <Link
              href={`/journal/${entryId}`}
              className="px-8 py-4 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all text-center font-bold flex items-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <h3 className="text-2xl font-black text-slate-900 mb-3">
              Delete Entry?
            </h3>
            <p className="text-slate-600 font-medium mb-6">
              This action cannot be undone. Your journal entry will be permanently deleted.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all shadow-lg hover:shadow-xl font-black disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Delete Permanently'}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleting}
                className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
