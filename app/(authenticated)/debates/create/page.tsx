'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Cpu, Lightbulb, Heart, TrendingUp } from 'lucide-react';
import { createPost, type QuadrantType } from '@/lib/actions/voting';

const QUADRANTS = [
  { id: 'ai_technology' as QuadrantType, name: 'AI & Technology', icon: Cpu, color: 'from-blue-500 to-cyan-500' },
  { id: 'philosophy' as QuadrantType, name: 'Philosophy', icon: Lightbulb, color: 'from-purple-500 to-pink-500' },
  { id: 'morality_ethics' as QuadrantType, name: 'Morality & Ethics', icon: Heart, color: 'from-rose-500 to-red-500' },
  { id: 'economics_society' as QuadrantType, name: 'Economics & Society', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
];

export default function CreateDebatePage() {
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [quadrant, setQuadrant] = useState<QuadrantType>('philosophy');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await createPost(topic, description || null, quadrant);

      if (result.error) {
        setError(result.error);
        return;
      }

      if (result.data) {
        router.push(`/debates/${result.data.id}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-12">
        <div className="mb-6">
          <Link href="/debates" className="text-slate-600 hover:text-teal-600 transition font-bold">
            ← Back to Posts
          </Link>
        </div>

        <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-3 tracking-tight">
          Create New Post
        </h1>
        <p className="text-xl text-slate-600 font-medium mb-8">
          Share a question or idea with the community
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="bg-red-50 border-2 border-red-400 text-red-900 px-5 py-4 rounded-xl font-bold">
              {error}
            </div>
          )}

          {/* Quadrant Selector */}
          <div>
            <label className="block text-sm font-black text-slate-900 mb-3 uppercase tracking-wide">
              Choose Quadrant *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {QUADRANTS.map((q) => {
                const Icon = q.icon;
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setQuadrant(q.id)}
                    className={`flex items-center gap-3 px-4 py-4 rounded-xl border-2 transition-all ${
                      quadrant === q.id
                        ? `bg-gradient-to-r ${q.color} text-white border-transparent shadow-lg`
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:shadow-md'
                    }`}
                  >
                    <Icon size={24} className={quadrant === q.id ? 'text-white' : 'text-slate-400'} />
                    <span className="font-bold text-sm">{q.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Topic */}
          <div>
            <label htmlFor="topic" className="block text-sm font-black text-slate-900 mb-3 uppercase tracking-wide">
              Post Title *
            </label>
            <input
              id="topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
              className="w-full px-5 py-4 bg-white border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition font-medium"
              placeholder="e.g., Is free will compatible with modern neuroscience?"
            />
            <p className="text-sm text-slate-500 mt-2 font-medium">
              Make it clear and engaging to attract thoughtful responses
            </p>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-black text-slate-900 mb-3 uppercase tracking-wide">
              Description (Optional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="w-full px-5 py-4 bg-white border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition resize-none font-medium"
              placeholder="Provide context, background, or your initial thoughts on this topic..."
            />
            <p className="text-sm text-slate-500 mt-2 font-medium">
              Add details to help others understand your question
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200 rounded-xl p-6">
            <h3 className="text-slate-900 font-black mb-3 flex items-center gap-2">
              <span className="text-xl">💡</span>
              How Ponder Works
            </h3>
            <ul className="text-slate-700 text-sm space-y-2 font-medium">
              <li className="flex gap-2">
                <span className="text-teal-600 font-black">•</span>
                <span>Share your question or idea with the community</span>
              </li>
              <li className="flex gap-2">
                <span className="text-teal-600 font-black">•</span>
                <span>Others can Snap (resonate) or Zap (sparks debate) your post</span>
              </li>
              <li className="flex gap-2">
                <span className="text-teal-600 font-black">•</span>
                <span>Engage in thoughtful discussion through comments</span>
              </li>
              <li className="flex gap-2">
                <span className="text-teal-600 font-black">•</span>
                <span>No expertise required—just curiosity and respect</span>
              </li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-8 py-4 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 font-black text-lg"
            >
              {loading ? 'Creating Post...' : 'Create Post'}
            </button>
            <Link
              href="/debates"
              className="px-8 py-4 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all text-center font-bold"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
