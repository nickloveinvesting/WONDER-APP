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

      router.push(`/debates/${data.id}`);
    } catch (err: any) {
      setError(err.message || 'Failed to create debate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900">
      {/* Header */}
      <nav className="border-b border-white/10 bg-white/5 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/debates" className="text-2xl font-bold text-white">
            PhiloDuel
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-300">Create Debate</span>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold text-white mb-8">Create New Debate</h1>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-gray-200 mb-2">
                Debate Topic *
              </label>
              <input
                id="topic"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-500 transition"
                placeholder="e.g., Free will is an illusion"
              />
              <p className="text-xs text-gray-400 mt-1">
                Choose a clear, debatable philosophical topic
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
                placeholder="Provide context or clarification for the debate topic..."
              />
            </div>

            <div className="bg-primary-500/10 border border-primary-500/30 rounded-lg p-4">
              <h3 className="text-white font-medium mb-2">How it works:</h3>
              <ol className="text-gray-300 text-sm space-y-1 list-decimal list-inside">
                <li>You create the debate topic</li>
                <li>Another philosopher joins to argue FOR or AGAINST</li>
                <li>Both submit arguments (one round each)</li>
                <li>Gemini AI judges based on logic, evidence, and rhetoric</li>
                <li>Winner earns reputation points</li>
              </ol>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {loading ? 'Creating...' : 'Create Debate'}
              </button>
              <Link
                href="/debates"
                className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
