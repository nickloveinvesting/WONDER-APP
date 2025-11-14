/**
 * ARGUED Single Debate Page Template
 * Detailed debate view with arguments and AI judgment
 */

import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Textarea } from '../ui/Input';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface Participant {
  username: string;
  displayName?: string;
  reputationScore: number;
}

interface Argument {
  id: string;
  content: string;
  position: 'for' | 'against';
  author: {
    username: string;
    displayName?: string;
  };
  createdAt: string;
}

interface Judgment {
  winnerPosition: 'for' | 'against' | 'tie';
  reasoning: string;
  scores: {
    for: { logic: number; evidence: number; rhetoric: number };
    against: { logic: number; evidence: number; rhetoric: number };
  };
  factChecks?: Array<{
    claim: string;
    verdict: 'accurate' | 'false' | 'misleading';
    explanation: string;
  }>;
}

interface SingleDebateProps {
  debate: {
    id: string;
    topic: string;
    description: string;
    status: 'open' | 'in_progress' | 'completed';
    forParticipant?: Participant;
    againstParticipant?: Participant;
  };
  arguments: Argument[];
  judgment?: Judgment;
  canJoinFor: boolean;
  canJoinAgainst: boolean;
  canSubmitArgument: boolean;
  userPosition?: 'for' | 'against';
}

export function SingleDebateTemplate({
  debate,
  arguments: debateArgs,
  judgment,
  canJoinFor,
  canJoinAgainst,
  canSubmitArgument,
  userPosition,
}: SingleDebateProps) {
  const getStatusBadge = () => {
    switch (debate.status) {
      case 'open':
        return <Badge type="success">Open</Badge>;
      case 'in_progress':
        return <Badge type="default">In Progress</Badge>;
      case 'completed':
        return <Badge type="achievement">Completed</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-argued-cream">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Back Button */}
        <Link
          href="/debates"
          className="inline-flex items-center text-argued-navy hover:text-argued-brown mb-4 transition"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Debates
        </Link>

        {/* Debate Header */}
        <Card variant="navy" className="mb-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-argued-navy flex-1 font-sans">
              {debate.topic}
            </h1>
            {getStatusBadge()}
          </div>

          {debate.description && (
            <p className="text-argued-black mb-6 font-serif">{debate.description}</p>
          )}

          {/* Participants */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-argued-success/10 border-2 border-argued-success/30 rounded-lg p-4">
              <div className="text-argued-success font-bold mb-2 font-sans">
                ARGUING FOR
              </div>
              {debate.forParticipant ? (
                <div>
                  <p className="text-argued-black font-medium">
                    {debate.forParticipant.displayName || debate.forParticipant.username}
                  </p>
                  <Badge type="rating" size="sm" className="mt-2">
                    {debate.forParticipant.reputationScore}
                  </Badge>
                </div>
              ) : (
                <div className="text-argued-gray italic">Waiting for philosopher...</div>
              )}
            </div>

            <div className="bg-argued-error/10 border-2 border-argued-error/30 rounded-lg p-4">
              <div className="text-argued-error font-bold mb-2 font-sans">
                ARGUING AGAINST
              </div>
              {debate.againstParticipant ? (
                <div>
                  <p className="text-argued-black font-medium">
                    {debate.againstParticipant.displayName || debate.againstParticipant.username}
                  </p>
                  <Badge type="rating" size="sm" className="mt-2">
                    {debate.againstParticipant.reputationScore}
                  </Badge>
                </div>
              ) : (
                <div className="text-argued-gray italic">Waiting for philosopher...</div>
              )}
            </div>
          </div>
        </Card>

        {/* Join Debate */}
        {(canJoinFor || canJoinAgainst) && (
          <Card variant="highlight" className="mb-6">
            <h2 className="text-xl font-bold text-argued-navy mb-4 font-sans">
              Join this debate
            </h2>
            <div className="flex gap-4">
              {canJoinFor && (
                <Button variant="primary">Join FOR</Button>
              )}
              {canJoinAgainst && (
                <Button variant="secondary">Join AGAINST</Button>
              )}
            </div>
          </Card>
        )}

        {/* Submit Argument */}
        {canSubmitArgument && userPosition && (
          <Card variant="highlight" className="mb-6">
            <h2 className="text-xl font-bold text-argued-navy mb-4 font-sans">
              Submit Your Argument
              <Badge type={userPosition} size="sm" className="ml-3">
                {userPosition.toUpperCase()}
              </Badge>
            </h2>
            <Textarea
              placeholder="Make your philosophical argument here. Be logical, cite evidence, and be persuasive."
              rows={8}
              className="mb-4"
            />
            <div className="flex justify-between items-center">
              <p className="text-sm text-argued-gray font-serif italic">
                💡 Tip: Strong arguments balance logic, evidence, and rhetoric.
              </p>
              <Button variant="primary">Submit Argument</Button>
            </div>
          </Card>
        )}

        {/* Arguments Section */}
        {debateArgs.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-argued-navy mb-4 font-sans">
              Arguments
            </h2>
            <div className="space-y-4">
              {debateArgs.map((arg) => (
                <Card
                  key={arg.id}
                  variant={arg.position === 'for' ? 'success' : 'error'}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Badge type={arg.position} size="md">
                      {arg.position.toUpperCase()}
                    </Badge>
                    <span className="font-medium text-argued-navy">
                      {arg.author.displayName || arg.author.username}
                    </span>
                    <span className="text-sm text-argued-gray ml-auto">
                      {new Date(arg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-argued-black whitespace-pre-wrap font-serif leading-relaxed">
                    {arg.content}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* AI Judgment */}
        {judgment && (
          <Card variant="highlight" className="bg-gradient-to-br from-argued-navy/5 to-argued-brown/5">
            <h2 className="text-2xl font-bold text-argued-navy mb-6 font-sans flex items-center gap-2">
              <span>🤖</span> AI Judgment
            </h2>

            {/* Winner */}
            <div className="mb-6">
              <div className="text-lg font-medium text-argued-black mb-2">Winner:</div>
              <Badge
                type={
                  judgment.winnerPosition === 'for'
                    ? 'for'
                    : judgment.winnerPosition === 'against'
                    ? 'against'
                    : 'default'
                }
                size="lg"
              >
                {judgment.winnerPosition === 'tie' ? 'TIE' : judgment.winnerPosition.toUpperCase()}
              </Badge>
            </div>

            {/* Reasoning */}
            <div className="mb-6">
              <div className="text-lg font-medium text-argued-black mb-2">Reasoning:</div>
              <p className="text-argued-black whitespace-pre-wrap font-serif leading-relaxed">
                {judgment.reasoning}
              </p>
            </div>

            {/* Scores */}
            <div className="mb-6">
              <div className="text-lg font-medium text-argued-black mb-3">Scores:</div>
              <div className="grid md:grid-cols-2 gap-4">
                {/* FOR Scores */}
                <div className="bg-argued-success/10 rounded-lg p-4 border-2 border-argued-success/30">
                  <div className="text-argued-success font-bold mb-3 font-sans">FOR</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-argued-black">Logic:</span>
                      <span className="text-argued-navy font-bold">
                        {judgment.scores.for.logic}/10
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-argued-black">Evidence:</span>
                      <span className="text-argued-navy font-bold">
                        {judgment.scores.for.evidence}/10
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-argued-black">Rhetoric:</span>
                      <span className="text-argued-navy font-bold">
                        {judgment.scores.for.rhetoric}/10
                      </span>
                    </div>
                  </div>
                </div>

                {/* AGAINST Scores */}
                <div className="bg-argued-error/10 rounded-lg p-4 border-2 border-argued-error/30">
                  <div className="text-argued-error font-bold mb-3 font-sans">AGAINST</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-argued-black">Logic:</span>
                      <span className="text-argued-navy font-bold">
                        {judgment.scores.against.logic}/10
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-argued-black">Evidence:</span>
                      <span className="text-argued-navy font-bold">
                        {judgment.scores.against.evidence}/10
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-argued-black">Rhetoric:</span>
                      <span className="text-argued-navy font-bold">
                        {judgment.scores.against.rhetoric}/10
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fact Checks */}
            {judgment.factChecks && judgment.factChecks.length > 0 && (
              <div>
                <div className="text-lg font-medium text-argued-black mb-3">Fact Checks:</div>
                <div className="space-y-3">
                  {judgment.factChecks.map((check, idx) => (
                    <div
                      key={idx}
                      className={`rounded-lg p-4 border-2 ${
                        check.verdict === 'accurate'
                          ? 'bg-argued-success/10 border-argued-success/30'
                          : check.verdict === 'false'
                          ? 'bg-argued-error/10 border-argued-error/30'
                          : 'bg-argued-gold/10 border-argued-gold/30'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          type={
                            check.verdict === 'accurate'
                              ? 'success'
                              : check.verdict === 'false'
                              ? 'error'
                              : 'achievement'
                          }
                          size="sm"
                        >
                          {check.verdict.toUpperCase()}
                        </Badge>
                        <span className="text-argued-black text-sm italic font-serif">
                          "{check.claim}"
                        </span>
                      </div>
                      <p className="text-argued-black text-sm font-serif">{check.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}
