'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { deleteDebate } from './actions';

interface DebateCardProps {
  debate: {
    id: string;
    topic: string;
    description: string | null;
    status: string;
    created_by: string;
  };
  currentUserId: string | undefined;
}

export default function DebateCard({ debate, currentUserId }: DebateCardProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const isCreator = currentUserId === debate.created_by;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-500/20 text-green-300';
      case 'in_progress':
        return 'bg-yellow-500/20 text-yellow-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setMessage(null);

    const result = await deleteDebate(debate.id);

    if (result.success) {
      setMessage({ type: 'success', text: result.message || 'Debate deleted successfully' });
      setShowDeleteConfirm(false);
      // The page will automatically refresh due to revalidatePath in the server action
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to delete debate' });
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-accent-500 transition">
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-gray-900 border border-white/20 rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-4">Delete Debate?</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete "{debate.topic}"? This action cannot be undone.
            </p>
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

      {/* Error/Success Message */}
      {message && (
        <div
          className={`mb-4 px-4 py-3 rounded-lg border ${
            message.type === 'error'
              ? 'bg-red-500/20 border-red-500 text-red-200'
              : 'bg-green-500/20 border-green-500 text-green-200'
          }`}
        >
          {message.text}
        </div>
      )}

      <Link href={`/debates/${debate.id}`} className="block">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">{debate.topic}</h3>
            {debate.description && (
              <p className="text-gray-300 mb-3">{debate.description}</p>
            )}
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(debate.status)}`}>
            {debate.status?.replace('_', ' ')}
          </span>
        </div>
      </Link>

      {/* Delete Button - Only visible to creator */}
      {isCreator && (
        <div className="flex justify-end mt-4 pt-4 border-t border-white/10">
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowDeleteConfirm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition"
            title="Delete debate"
          >
            <Trash2 size={16} />
            <span className="text-sm font-medium">Delete</span>
          </button>
        </div>
      )}
    </div>
  );
}
