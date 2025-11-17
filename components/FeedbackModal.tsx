/**
 * Feedback Modal Component
 * Allows users to submit feature requests and bug reports directly to GitHub
 */

'use client';

import { useState } from 'react';
import { X, Send, Lightbulb, Bug } from 'lucide-react';
import { Button } from './ui/Button';
import { Input, Textarea } from './ui/Input';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FeedbackType = 'feature' | 'bug';

export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [type, setType] = useState<FeedbackType>('feature');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          title,
          description,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit feedback');
      }

      setSuccess(true);
      setTitle('');
      setDescription('');

      // Close modal after 2 seconds
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setTitle('');
      setDescription('');
      setError('');
      setSuccess(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-2xl font-black text-slate-900">
            Share Your Feedback
          </h2>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-50"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Success Message */}
          {success && (
            <div className="p-4 bg-teal-50 border border-teal-200 rounded-lg">
              <p className="text-sm font-bold text-teal-700">
                ✓ Thank you! Your feedback has been submitted.
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm font-bold text-red-700">{error}</p>
            </div>
          )}

          {/* Feedback Type */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3">
              What type of feedback?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setType('feature')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  type === 'feature'
                    ? 'border-teal-500 bg-teal-50'
                    : 'border-slate-200 bg-white hover:border-teal-300'
                }`}
              >
                <Lightbulb
                  className={`w-6 h-6 mx-auto mb-2 ${
                    type === 'feature' ? 'text-teal-600' : 'text-slate-400'
                  }`}
                />
                <span
                  className={`text-sm font-bold ${
                    type === 'feature' ? 'text-teal-700' : 'text-slate-600'
                  }`}
                >
                  Feature Request
                </span>
              </button>
              <button
                type="button"
                onClick={() => setType('bug')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  type === 'bug'
                    ? 'border-teal-500 bg-teal-50'
                    : 'border-slate-200 bg-white hover:border-teal-300'
                }`}
              >
                <Bug
                  className={`w-6 h-6 mx-auto mb-2 ${
                    type === 'bug' ? 'text-teal-600' : 'text-slate-400'
                  }`}
                />
                <span
                  className={`text-sm font-bold ${
                    type === 'bug' ? 'text-teal-700' : 'text-slate-600'
                  }`}
                >
                  Bug Report
                </span>
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={
                type === 'feature'
                  ? 'Briefly describe your feature idea...'
                  : 'Briefly describe the bug...'
              }
              required
              disabled={isSubmitting || success}
              className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={
                type === 'feature'
                  ? 'What would this feature do? How would it help you?'
                  : 'What happened? What did you expect to happen?'
              }
              required
              rows={5}
              disabled={isSubmitting || success}
              className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:opacity-50 disabled:cursor-not-allowed resize-vertical transition-all"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={handleClose}
              disabled={isSubmitting}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting || success || !title.trim() || !description.trim()}
              fullWidth
              size="md"
            >
              {isSubmitting ? (
                'Submitting...'
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Feedback
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
