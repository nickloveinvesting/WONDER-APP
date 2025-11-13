import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import DebateActions from './DebateActions';

export default async function DebateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Fetch debate details
  const { data: debate } = await supabase
    .from('debates')
    .select(`
      *,
      creator:created_by(username, display_name, reputation_score),
      for_user:for_participant(username, display_name, reputation_score),
      against_user:against_participant(username, display_name, reputation_score)
    `)
    .eq('id', id)
    .single();

  if (!debate) {
    redirect('/debates');
  }

  // Fetch arguments
  const { data: arguments: debateArgs } = await supabase
    .from('arguments')
    .select(`
      *,
      author:user_id(username, display_name)
    `)
    .eq('debate_id', id)
    .order('created_at', { ascending: true });

  // Fetch judgment if debate is completed
  const { data: judgment } = await supabase
    .from('judgments')
    .select('*')
    .eq('debate_id', id)
    .maybeSingle();

  const canJoinFor = debate.status === 'open' && !debate.for_participant;
  const canJoinAgainst = debate.status === 'open' && !debate.against_participant;
  const isParticipant =
    user.id === debate.for_participant || user.id === debate.against_participant;
  const canSubmitArgument =
    debate.status === 'in_progress' &&
    isParticipant &&
    !debateArgs?.find((arg: any) => arg.user_id === user.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900">
      {/* Header */}
      <nav className="border-b border-white/10 bg-white/5 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/debates" className="text-2xl font-bold text-white">
            PhiloDuel
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-300">Debate</span>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Debate Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 mb-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-white flex-1">{debate.topic}</h1>
            <span
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                debate.status === 'open'
                  ? 'bg-green-500/20 text-green-300'
                  : debate.status === 'in_progress'
                  ? 'bg-yellow-500/20 text-yellow-300'
                  : 'bg-gray-500/20 text-gray-300'
              }`}
            >
              {debate.status.replace('_', ' ')}
            </span>
          </div>

          {debate.description && (
            <p className="text-gray-300 mb-6">{debate.description}</p>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <div className="text-green-400 font-medium mb-2">ARGUING FOR</div>
              {debate.for_user ? (
                <div className="text-white">
                  {debate.for_user.display_name || debate.for_user.username}
                  <span className="text-gray-400 ml-2">
                    ★ {debate.for_user.reputation_score}
                  </span>
                </div>
              ) : (
                <div className="text-gray-400 italic">Waiting for philosopher...</div>
              )}
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <div className="text-red-400 font-medium mb-2">ARGUING AGAINST</div>
              {debate.against_user ? (
                <div className="text-white">
                  {debate.against_user.display_name || debate.against_user.username}
                  <span className="text-gray-400 ml-2">
                    ★ {debate.against_user.reputation_score}
                  </span>
                </div>
              ) : (
                <div className="text-gray-400 italic">Waiting for philosopher...</div>
              )}
            </div>
          </div>
        </div>

        {/* Join Buttons */}
        {(canJoinFor || canJoinAgainst) && (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-6">
            <h2 className="text-xl font-bold text-white mb-4">Join this debate</h2>
            <div className="flex gap-4">
              {canJoinFor && (
                <DebateActions
                  debateId={id}
                  action="join"
                  position="for"
                  userId={user.id}
                />
              )}
              {canJoinAgainst && (
                <DebateActions
                  debateId={id}
                  action="join"
                  position="against"
                  userId={user.id}
                />
              )}
            </div>
          </div>
        )}

        {/* Submit Argument */}
        {canSubmitArgument && (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-6">
            <h2 className="text-xl font-bold text-white mb-4">Submit Your Argument</h2>
            <DebateActions
              debateId={id}
              action="submit"
              position={user.id === debate.for_participant ? 'for' : 'against'}
              userId={user.id}
            />
          </div>
        )}

        {/* Arguments */}
        {debateArgs && debateArgs.length > 0 && (
          <div className="space-y-4 mb-6">
            <h2 className="text-2xl font-bold text-white">Arguments</h2>
            {debateArgs.map((arg: any) => (
              <div
                key={arg.id}
                className={`bg-white/10 backdrop-blur-lg rounded-xl p-6 border ${
                  arg.position === 'for'
                    ? 'border-green-500/30'
                    : 'border-red-500/30'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      arg.position === 'for'
                        ? 'bg-green-500/20 text-green-300'
                        : 'bg-red-500/20 text-red-300'
                    }`}
                  >
                    {arg.position.toUpperCase()}
                  </span>
                  <span className="text-white font-medium">
                    {arg.author.display_name || arg.author.username}
                  </span>
                </div>
                <p className="text-gray-200 whitespace-pre-wrap">{arg.content}</p>
              </div>
            ))}
          </div>
        )}

        {/* AI Judgment */}
        {judgment && (
          <div className="bg-gradient-to-br from-primary-500/20 to-accent-500/20 backdrop-blur-lg rounded-xl p-8 border border-accent-500/50">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span>🤖</span> AI Judgment
            </h2>

            <div className="mb-6">
              <div className="text-lg font-medium text-gray-200 mb-2">Winner:</div>
              <div
                className={`inline-block px-6 py-3 rounded-lg font-bold text-xl ${
                  judgment.winner_position === 'for'
                    ? 'bg-green-500/30 text-green-200'
                    : judgment.winner_position === 'against'
                    ? 'bg-red-500/30 text-red-200'
                    : 'bg-gray-500/30 text-gray-200'
                }`}
              >
                {judgment.winner_position === 'tie' ? 'TIE' : judgment.winner_position.toUpperCase()}
              </div>
            </div>

            <div className="mb-6">
              <div className="text-lg font-medium text-gray-200 mb-2">Reasoning:</div>
              <p className="text-gray-100 whitespace-pre-wrap">{judgment.reasoning}</p>
            </div>

            {judgment.scores && (
              <div className="mb-6">
                <div className="text-lg font-medium text-gray-200 mb-3">Scores:</div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-500/10 rounded-lg p-4">
                    <div className="text-green-400 font-medium mb-3">FOR</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Logic:</span>
                        <span className="text-white font-medium">
                          {judgment.scores.for.logic}/10
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Evidence:</span>
                        <span className="text-white font-medium">
                          {judgment.scores.for.evidence}/10
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Rhetoric:</span>
                        <span className="text-white font-medium">
                          {judgment.scores.for.rhetoric}/10
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-500/10 rounded-lg p-4">
                    <div className="text-red-400 font-medium mb-3">AGAINST</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Logic:</span>
                        <span className="text-white font-medium">
                          {judgment.scores.against.logic}/10
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Evidence:</span>
                        <span className="text-white font-medium">
                          {judgment.scores.against.evidence}/10
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Rhetoric:</span>
                        <span className="text-white font-medium">
                          {judgment.scores.against.rhetoric}/10
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {judgment.fact_checks && judgment.fact_checks.length > 0 && (
              <div>
                <div className="text-lg font-medium text-gray-200 mb-3">Fact Checks:</div>
                <div className="space-y-3">
                  {judgment.fact_checks.map((check: any, idx: number) => (
                    <div
                      key={idx}
                      className={`rounded-lg p-4 ${
                        check.verdict === 'accurate'
                          ? 'bg-green-500/10 border border-green-500/30'
                          : check.verdict === 'false'
                          ? 'bg-red-500/10 border border-red-500/30'
                          : 'bg-yellow-500/10 border border-yellow-500/30'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            check.verdict === 'accurate'
                              ? 'bg-green-500/20 text-green-300'
                              : check.verdict === 'false'
                              ? 'bg-red-500/20 text-red-300'
                              : 'bg-yellow-500/20 text-yellow-300'
                          }`}
                        >
                          {check.verdict}
                        </span>
                        <span className="text-gray-200 text-sm italic">
                          "{check.claim}"
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">{check.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
