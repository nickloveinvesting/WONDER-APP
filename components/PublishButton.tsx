'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Share2, Cpu, Lightbulb, Heart, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { publishJournalEntry } from '@/lib/actions/journal';

type QuadrantType = 'ai_technology' | 'philosophy' | 'morality_ethics' | 'economics_society';

const QUADRANTS = [
  { id: 'ai_technology' as QuadrantType, name: 'AI & Technology', icon: Cpu, color: 'from-blue-500 to-cyan-500' },
  { id: 'philosophy' as QuadrantType, name: 'Philosophy', icon: Lightbulb, color: 'from-purple-500 to-pink-500' },
  { id: 'morality_ethics' as QuadrantType, name: 'Morality & Ethics', icon: Heart, color: 'from-rose-500 to-red-500' },
  { id: 'economics_society' as QuadrantType, name: 'Economics & Society', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
];

type PublishButtonProps = {
  entryId: string;
};

/**
 * Button that opens a modal to publish journal entry to community
 * Allows user to select which quadrant to publish to
 */
export function PublishButton({ entryId }: PublishButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedQuadrant, setSelectedQuadrant] = useState<QuadrantType>('philosophy');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handlePublish = async () => {
    setError('');
    setLoading(true);

    try {
      const result = await publishJournalEntry(entryId, selectedQuadrant);

      if (result.error) {
        setError(result.error);
        return;
      }

      // Redirect to the published post
      router.push(`/debates/${result.debateId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to publish entry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="primary" size="md" onClick={() => setShowModal(true)}>
        <Share2 size={18} />
        Publish to Community
      </Button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <h2 className="text-3xl font-black text-slate-900 mb-2">
                Publish to Community
              </h2>
              <p className="text-slate-600 font-medium mb-6">
                Choose which quadrant fits your entry best. This will help others discover it.
              </p>

              {error && (
                <div className="bg-red-50 border-2 border-red-400 text-red-900 px-4 py-3 rounded-xl font-bold mb-6">
                  {error}
                </div>
              )}

              {/* Quadrant Selector */}
              <div className="space-y-3 mb-8">
                <label className="block text-sm font-black text-slate-900 uppercase tracking-wide">
                  Choose Quadrant *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {QUADRANTS.map((q) => {
                    const Icon = q.icon;
                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => setSelectedQuadrant(q.id)}
                        className={`flex items-center gap-3 px-4 py-4 rounded-xl border-2 transition-all ${
                          selectedQuadrant === q.id
                            ? `bg-gradient-to-r ${q.color} text-white border-transparent shadow-lg`
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:shadow-md'
                        }`}
                      >
                        <Icon size={24} className={selectedQuadrant === q.id ? 'text-white' : 'text-slate-400'} />
                        <span className="font-bold text-sm">{q.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200 rounded-xl p-6 mb-8">
                <h3 className="text-slate-900 font-black mb-2 flex items-center gap-2">
                  <span className="text-xl">ℹ️</span>
                  What Happens Next
                </h3>
                <ul className="text-slate-700 text-sm space-y-2 font-medium">
                  <li className="flex gap-2">
                    <span className="text-teal-600 font-black">•</span>
                    <span>Your entry will become a public post in the selected quadrant</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-teal-600 font-black">•</span>
                    <span>Others can comment, Snap, and Zap on your post</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-teal-600 font-black">•</span>
                    <span>This journal entry remains private—only the published copy is public</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-teal-600 font-black">•</span>
                    <span>You can't unpublish, but you can delete the public post later</span>
                  </li>
                </ul>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePublish}
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 font-black"
                >
                  {loading ? 'Publishing...' : 'Publish Now'}
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  disabled={loading}
                  className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all font-bold disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
