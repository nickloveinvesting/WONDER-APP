'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CreateDebatePage() {
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/auth/login');
        return;
      }

      const { data, error: insertError } = await supabase
        .from('debates')
        .insert({
          topic,
          description: description || null,
          created_by: user.id,
          status: 'open',
        })
        .select()
        .single();

      if (insertError) throw insertError;

      router.push(`/(authenticated)/debates/${data.id}`);
    } catch (err: any) {
      setError(err.message || 'Failed to create conversation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 lg:px-8 max-w-2xl">
      <div className="mb-4">
        <Link href="/(authenticated)/debates" className="text-gray-400 hover:text-white transition">
          ← Back to Conversations
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold text-white mb-8">Start a Conversation</h1>

      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-200 mb-2">
              Conversation Topic *
            </label>
            <input
              id="topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-500 transition"
              placeholder="e.g., Is free will compatible with modern neuroscience?"
            />
            <p className="text-xs text-gray-400 mt-1">
              Choose a thought-provoking philosophical question or topic
            </p>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-200 mb-2">
              Description (Optional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-500 transition resize-none"
              placeholder="Provide context or clarification for the conversation topic..."
            />
          </div>

          <div className="bg-primary-500/10 border border-primary-500/30 rounded-lg p-4">
            <h3 className="text-white font-medium mb-2">How it works:</h3>
            <ol className="text-gray-300 text-sm space-y-1 list-decimal list-inside">
              <li>You start the conversation with a question or topic</li>
              <li>Multiple participants can join to share perspectives</li>
              <li>Everyone contributes multiple rounds of thoughtful dialogue</li>
              <li>Optionally request AI synthesis of key points and areas of agreement</li>
              <li>Build influence through meaningful contributions and collaboration</li>
            </ol>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? 'Creating...' : 'Start Conversation'}
            </button>
            <Link
              href="/(authenticated)/debates"
              className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
