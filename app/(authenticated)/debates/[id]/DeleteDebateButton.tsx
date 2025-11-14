'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { deleteDebate } from '../actions';

interface DeleteDebateButtonProps {
  debateId: string;
  debateTopic: string;
}

export default function DeleteDebateButton({ debateId, debateTopic }: DeleteDebateButtonProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);

    const result = await deleteDebate(debateId);

    if (result.success) {
      // Redirect to debates page after successful deletion
      router.push('/debates');
    } else {
      setError(result.error || 'Failed to delete debate');
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowDeleteConfirm(true)}
        className="flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition border border-red-500/30"
        title="Delete debate"
      >
        <Trash2 size={18} />
        <span className="font-medium">Delete Debate</span>
      </button>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-gray-900 border border-white/20 rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-4">Delete Debate?</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete "{debateTopic}"? This action cannot be undone and will delete all associated arguments and judgments.
            </p>

            {error && (
              <div className="mb-4 px-4 py-3 rounded-lg border bg-red-500/20 border-red-500 text-red-200">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
