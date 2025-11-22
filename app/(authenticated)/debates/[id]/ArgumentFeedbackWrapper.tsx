'use client';

import { ArgumentFeedback, FeedbackType } from '@/components/ArgumentFeedback';
import { submitArgumentFeedback } from '@/lib/actions/feedback';

interface ArgumentFeedbackWrapperProps {
  argumentId: string;
  initialFeedback: string[];
  feedbackCounts: Record<string, number>;
}

export function ArgumentFeedbackWrapper({
  argumentId,
  initialFeedback,
  feedbackCounts,
}: ArgumentFeedbackWrapperProps) {
  const handleFeedbackSubmit = async (argId: string, feedbackType: FeedbackType) => {
    const result = await submitArgumentFeedback(argId, feedbackType);
    return result;
  };

  return (
    <ArgumentFeedback
      argumentId={argumentId}
      initialFeedback={initialFeedback as FeedbackType[]}
      feedbackCounts={feedbackCounts as Partial<Record<FeedbackType, number>>}
      onFeedbackSubmit={handleFeedbackSubmit}
      variant="compact"
    />
  );
}
