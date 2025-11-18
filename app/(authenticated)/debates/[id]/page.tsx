import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import DebateActions from './DebateActions';

export default async function ConversationDetailPage({
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

  // Fetch conversation with creator info
  const { data: conversation } = await supabase
    .from('debates')
    .select(`
      *,
      creator:created_by(username, display_name, influence_score)
    `)
    .eq('id', id)
    .single();

  if (!conversation) {
    redirect('/debates');
  }

  // Fetch all participants (conversation-first model)
  const { data: participants } = await supabase
    .from('conversation_participants')
    .select(`
      *,
      profile:user_id(username, display_name, influence_score)
    `)
    .eq('conversation_id', id)
    .order('joined_at', { ascending: true });

  // Fetch all messages/contributions
  const { data: messages } = await supabase
    .from('arguments')
    .select(`
      *,
      author:user_id(username, display_name, influence_score)
    `)
    .eq('debate_id', id)
    .order('created_at', { ascending: true });

  const isParticipant = participants?.some(p => p.user_id === user.id);
  const canJoin = conversation.status === 'open' && !isParticipant;

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-12">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Posts', href: '/debates' },
            { label: conversation.topic.length > 50 ? conversation.topic.substring(0, 50) + '...' : conversation.topic }
          ]}
        />

        {/* Conversation Header */}
        <Card variant="gradient" className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-4xl font-black text-slate-900 leading-tight">
                  {conversation.topic}
                </h1>
                <Badge
                  type={conversation.status === 'open' ? 'success' : 'status'}
                  color="teal"
                  size="md"
                >
                  {conversation.status.replace('_', ' ').toUpperCase()}
                </Badge>
              </div>
              {conversation.description && (
                <p className="text-xl text-slate-600 leading-relaxed font-medium">
                  {conversation.description}
                </p>
              )}
            </div>
          </div>

          {/* Conversation Stats */}
          <div className="flex flex-wrap gap-6 text-slate-600 border-t border-slate-200 pt-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">👥</span>
              <span className="font-bold">
                {participants?.length || 0} {participants?.length === 1 ? 'participant' : 'participants'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">💬</span>
              <span className="font-bold">
                {messages?.length || 0} {messages?.length === 1 ? 'contribution' : 'contributions'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">📅</span>
              <span className="font-bold">
                Started {new Date(conversation.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </Card>

        {/* Participants Section */}
        {participants && participants.length > 0 && (
          <Card variant="standard" className="mb-8">
            <h2 className="text-2xl font-black text-slate-900 mb-4">Contributors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {participants.map((participant: any) => (
                <div
                  key={participant.id}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                >
                  <div>
                    <div className="font-bold text-slate-900">
                      {participant.profile.display_name || participant.profile.username}
                    </div>
                    <div className="text-sm text-slate-500">
                      {participant.message_count} {participant.message_count === 1 ? 'contribution' : 'contributions'}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-teal-600">
                    <span className="text-lg">✨</span>
                    <span className="font-bold">
                      {participant.profile.influence_score || 0}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Join Conversation */}
        {canJoin && (
          <Card variant="gradient" className="mb-8 border-2 border-teal-400">
            <div className="text-center">
              <h2 className="text-2xl font-black text-slate-900 mb-3">
                Join this conversation
              </h2>
              <p className="text-lg text-slate-600 mb-6 font-medium">
                Your perspective matters here. Share what you're thinking—questions and half-formed ideas are welcome too!
              </p>
              <DebateActions
                debateId={id}
                action="join"
                position="for"
                userId={user.id}
              />
            </div>
          </Card>
        )}

        {/* Submit Contribution (if participant) */}
        {isParticipant && conversation.status === 'in_progress' && (
          <Card variant="standard" className="mb-8">
            <h2 className="text-2xl font-black text-slate-900 mb-4">
              Share your thoughts
            </h2>
            <DebateActions
              debateId={id}
              action="submit"
              position="for"
              userId={user.id}
            />
          </Card>
        )}

        {/* Conversation Thread */}
        {messages && messages.length > 0 ? (
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900">Conversation</h2>
            {messages.map((message: any, index: number) => (
              <Card key={message.id} variant="standard">
                <div className="flex items-start gap-4">
                  {/* Avatar placeholder */}
                  <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-black text-lg">
                    {(message.author.display_name || message.author.username).charAt(0).toUpperCase()}
                  </div>

                  <div className="flex-1">
                    {/* Author info */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-black text-slate-900 text-lg">
                        {message.author.display_name || message.author.username}
                      </span>
                      <span className="text-sm text-slate-500">
                        Contribution #{index + 1}
                      </span>
                      <span className="text-sm text-slate-400">
                        {new Date(message.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Message content */}
                    <div className="prose prose-lg max-w-none">
                      <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>

                    {/* Future: Add reaction/feedback UI here */}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card variant="gradient" className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-6">💭</div>
              <h3 className="text-2xl font-black text-slate-900 mb-3">
                Start the conversation
              </h3>
              <p className="text-lg text-slate-600 font-medium">
                Be the first to share what you're thinking. There are no "wrong" answers here—just different perspectives to explore.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
