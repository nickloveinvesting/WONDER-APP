'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface DebateActionsProps {
  debateId: string;
  action: 'join' | 'submit';
  position: 'for' | 'against';
  userId: string;
}

export default function DebateActions({
  debateId,
  action,
  position,
  userId,
}: DebateActionsProps) {
  const [argument, setArgument] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const handleJoin = async () => {
    setLoading(true);
    setError('');

    try {
      const field = position === 'for' ? 'for_participant' : 'against_participant';
      const { error: updateError } = await supabase
        .from('debates')
        .update({
          [field]: userId,
          status: 'in_progress',
        })
        .eq('id', debateId);

      if (updateError) throw updateError;

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitArgument = async () => {
    if (!argument.trim()) {
      setError('Please enter your argument');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error: insertError } = await supabase.from('arguments').insert({
        debate_id: debateId,
        user_id: userId,
        position,
        content: argument,
      });

      if (insertError) throw insertError;

      const { data: allArgs } = await supabase
        .from('arguments')
        .select('position')
        .eq('debate_id', debateId);

      const hasForArg = allArgs?.some((a) => a.position === 'for');
      const hasAgainstArg = allArgs?.some((a) => a.position === 'against');

      if (hasForArg && hasAgainstArg) {
        await triggerJudgment();
      } else {
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const triggerJudgment = async () => {
    try {
      const { data: debate } = await supabase
        .from('debates')
        .select('topic')
        .eq('id', debateId)
        .single();

      const { data: args } = await supabase
        .from('arguments')
        .select('*')
        .eq('debate_id', debateId);

      if (!debate || !args) throw new Error('Failed to fetch debate data');

      const forArg = args.find((a) => a.position === 'for');
      const againstArg = args.find((a) => a.position === 'against');

      if (!forArg || !againstArg) throw new Error('Missing arguments');

      const response = await fetch('/api/judge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          debateId,
          topic: debate.topic,
          argumentFor: forArg.content,
          argumentAgainst: againstArg.content,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get judgment');
      }

      router.refresh();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError('Failed to get AI judgment: ' + errorMessage);
    }
  };

  if (action === 'join') {
    return (
      <div>
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <button
          onClick={handleJoin}
          disabled={loading}
          className={`flex-1 px-6 py-3 rounded-lg transition font-medium disabled:opacity-50 disabled:cursor-not-allowed ${
            position === 'for'
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-red-500 hover:bg-red-600 text-white'
          }`}
        >
          {loading ? 'Joining...' : `Argue ${position.toUpperCase()}`}
        </button>
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <textarea
        value={argument}
        onChange={(e) => setArgument(e.target.value)}
        rows={8}
        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-500 transition resize-none mb-4"
        placeholder="Write your philosophical argument here... Be clear, logical, and persuasive."
      />
      <button
        onClick={handleSubmitArgument}
        disabled={loading}
        className="w-full px-6 py-3 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
      >
        {loading ? 'Submitting...' : 'Submit Argument'}
      </button>
      <p className="text-xs text-gray-400 mt-2">
        Once both arguments are submitted, Gemini AI will judge the debate
      </p>
    </div>
  );
}
