'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Loader2, RefreshCw } from 'lucide-react';

const ESSAY_PROMPTS = [
  {
    id: 'midnight',
    title: 'The Midnight Question',
    prompt: `What philosophical question keeps you awake at night?

Not what you think you should wonder about, but what actually pulls at your mind when you're alone with your thoughts.

Why does this question matter to you personally? What would change if you found an answer?`,
  },
  {
    id: 'ethical',
    title: 'The Ethical Dilemma',
    prompt: `You discover that a close friend has been anonymously donating half their income to effective charities—but they've also been lying to their family about how much money they make.

The deception has been going on for years. Their family thinks they're struggling financially and often offers to help.

Your friend asks: "Is what I'm doing wrong?"

What do you tell them? Why?`,
  },
  {
    id: 'knowledge',
    title: 'The Knowledge Puzzle',
    prompt: `Imagine you learn something that completely changes how you see the world—but no one else believes you.

You KNOW it's true (as certain as you've been about anything). Everyone else thinks you're wrong, confused, or deluded.

How do you know when to trust your own mind over others' opinions? Is there a point where doubt becomes necessary?`,
  },
];

interface Props {
  email: string;
  onComplete: (result: { status: 'admitted' | 'declined' | 'retry_allowed'; score?: number }) => void;
  onBack: () => void;
}

export default function EssaySubmission({ email, onComplete, onBack }: Props) {
  const [selectedPrompt, setSelectedPrompt] = useState<typeof ESSAY_PROMPTS[0] | null>(null);
  const [essay, setEssay] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const wordCount = essay.trim().split(/\s+/).filter(Boolean).length;
  const isValidLength = wordCount >= 200 && wordCount <= 400;
  const isTooShort = wordCount < 200;
  const isTooLong = wordCount > 400;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPrompt || !isValidLength || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/gate/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          challengeType: 'essay',
          promptId: selectedPrompt.id,
          response: essay,
        }),
      });

      const result = await response.json();

      if (result.status === 'admitted') {
        setFeedback('Your response demonstrated the kind of thoughtful curiosity we value at WONDER.');
        setTimeout(() => onComplete({ status: 'admitted', score: result.score }), 2000);
      } else if (result.status === 'retry_allowed') {
        setFeedback(result.feedback || 'We noticed some interesting thinking here, but we\'d like to understand you better.');
        setTimeout(() => onComplete({ status: 'retry_allowed', score: result.score }), 3000);
      } else {
        setFeedback(result.feedback || 'Thank you for sharing your thoughts.');
        setTimeout(() => onComplete({ status: 'declined', score: result.score }), 3000);
      }
    } catch {
      setFeedback('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  const shufflePrompt = () => {
    const currentIndex = selectedPrompt ? ESSAY_PROMPTS.indexOf(selectedPrompt) : -1;
    const availablePrompts = ESSAY_PROMPTS.filter((_, i) => i !== currentIndex);
    const randomPrompt = availablePrompts[Math.floor(Math.random() * availablePrompts.length)];
    setSelectedPrompt(randomPrompt);
    setEssay('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </button>
      </div>

      {/* Prompt Selection */}
      {!selectedPrompt ? (
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
            Choose a Reflection
          </h2>
          <p className="text-slate-600 mb-6">
            Select a prompt that resonates with you. There are no right answers—only thoughtful ones.
          </p>

          <div className="space-y-4">
            {ESSAY_PROMPTS.map((prompt) => (
              <motion.button
                key={prompt.id}
                onClick={() => setSelectedPrompt(prompt)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full p-6 bg-white rounded-xl border-2 border-slate-200 hover:border-teal-500 shadow-sm hover:shadow-md transition-all text-left"
              >
                <h3 className="font-bold text-slate-900 mb-2">{prompt.title}</h3>
                <p className="text-sm text-slate-600 line-clamp-2">
                  {prompt.prompt.split('\n')[0]}...
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Selected Prompt */}
          <div className="bg-slate-50 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900">{selectedPrompt.title}</h3>
              <button
                type="button"
                onClick={shufflePrompt}
                className="flex items-center gap-1 text-sm text-slate-500 hover:text-teal-600 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Different prompt
              </button>
            </div>
            <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
              {selectedPrompt.prompt}
            </p>
          </div>

          {/* Essay Input */}
          <div className="mb-4">
            <label htmlFor="essay" className="block text-sm font-medium text-slate-700 mb-2">
              Your Response
            </label>
            <textarea
              id="essay"
              value={essay}
              onChange={(e) => setEssay(e.target.value)}
              rows={12}
              placeholder="Share your thoughts..."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all resize-none"
              disabled={isSubmitting}
            />
          </div>

          {/* Word Count */}
          <div className="flex items-center justify-between mb-6">
            <div className={`text-sm ${
              isValidLength ? 'text-teal-600' :
              isTooShort ? 'text-amber-600' :
              'text-red-600'
            }`}>
              {wordCount} / 200-400 words
              {isTooShort && wordCount > 0 && ' (need more)'}
              {isTooLong && ' (too long)'}
            </div>
            <div className="flex gap-2">
              <div className={`h-1.5 w-20 rounded-full overflow-hidden bg-slate-200`}>
                <div
                  className={`h-full transition-all ${
                    isValidLength ? 'bg-teal-500' :
                    wordCount > 400 ? 'bg-red-500' :
                    'bg-amber-500'
                  }`}
                  style={{ width: `${Math.min((wordCount / 400) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Feedback */}
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-slate-50 rounded-xl text-slate-700 text-sm"
            >
              {feedback}
            </motion.div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValidLength || isSubmitting}
            className="w-full px-6 py-4 bg-teal-500 text-white font-bold rounded-xl hover:bg-teal-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Reflecting on your response...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit Response
              </>
            )}
          </button>

          <p className="text-xs text-slate-500 mt-4 text-center">
            Take your time. Philosophy rewards thoughtfulness, not speed.
          </p>
        </form>
      )}
    </motion.div>
  );
}
