import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * POST /api/votes
 * Create or update a vote on an argument
 *
 * Request body:
 * {
 *   argumentId: string;
 *   voteType: 'upvote' | 'downvote';
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { argumentId, voteType } = body;

    // Validate input
    if (!argumentId || !voteType) {
      return NextResponse.json(
        { error: 'Missing required fields: argumentId, voteType' },
        { status: 400 }
      );
    }

    if (!['upvote', 'downvote'].includes(voteType)) {
      return NextResponse.json(
        { error: 'voteType must be "upvote" or "downvote"' },
        { status: 400 }
      );
    }

    // Get the argument to check ownership and debate status
    const { data: argument, error: argError } = await supabase
      .from('arguments')
      .select('id, user_id, debate_id')
      .eq('id', argumentId)
      .single();

    if (argError || !argument) {
      return NextResponse.json({ error: 'Argument not found' }, { status: 404 });
    }

    // Prevent voting on own arguments
    if (argument.user_id === user.id) {
      return NextResponse.json(
        { error: 'Cannot vote on your own arguments' },
        { status: 400 }
      );
    }

    // Check if debate is completed (only vote on completed debates)
    const { data: debate, error: debateError } = await supabase
      .from('debates')
      .select('status')
      .eq('id', argument.debate_id)
      .single();

    if (debateError || !debate) {
      return NextResponse.json({ error: 'Debate not found' }, { status: 404 });
    }

    if (debate.status !== 'completed') {
      return NextResponse.json(
        { error: 'Can only vote on completed debates' },
        { status: 400 }
      );
    }

    // Check if user already voted on this argument
    const { data: existingVote } = await supabase
      .from('argument_votes')
      .select('id, vote_type')
      .eq('argument_id', argumentId)
      .eq('user_id', user.id)
      .single();

    if (existingVote) {
      // User already voted - update their vote
      if (existingVote.vote_type === voteType) {
        // Same vote type - delete it (toggle off)
        const { error: deleteError } = await supabase
          .from('argument_votes')
          .delete()
          .eq('id', existingVote.id);

        if (deleteError) throw deleteError;

        return NextResponse.json({
          success: true,
          action: 'vote_removed',
          voteType: null
        });
      } else {
        // Different vote type - update it
        const { error: updateError } = await supabase
          .from('argument_votes')
          .update({ vote_type: voteType })
          .eq('id', existingVote.id);

        if (updateError) throw updateError;

        return NextResponse.json({
          success: true,
          action: 'vote_updated',
          voteType
        });
      }
    } else {
      // New vote - insert it
      const { error: insertError } = await supabase
        .from('argument_votes')
        .insert({
          argument_id: argumentId,
          user_id: user.id,
          vote_type: voteType
        });

      if (insertError) throw insertError;

      return NextResponse.json({
        success: true,
        action: 'vote_created',
        voteType
      });
    }
  } catch (error: any) {
    console.error('Error handling vote:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process vote' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/votes?argumentId=<id>
 * Get vote counts and user's current vote for an argument
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const url = new URL(request.url);
    const argumentId = url.searchParams.get('argumentId');

    if (!argumentId) {
      return NextResponse.json(
        { error: 'Missing required parameter: argumentId' },
        { status: 400 }
      );
    }

    // Get argument vote counts
    const { data: argument, error: argError } = await supabase
      .from('arguments')
      .select('upvotes, downvotes, upvote_ratio, net_votes')
      .eq('id', argumentId)
      .single();

    if (argError || !argument) {
      return NextResponse.json({ error: 'Argument not found' }, { status: 404 });
    }

    // Get user's current vote if logged in
    let userVote = null;
    if (user) {
      const { data: vote } = await supabase
        .from('argument_votes')
        .select('vote_type')
        .eq('argument_id', argumentId)
        .eq('user_id', user.id)
        .single();

      userVote = vote?.vote_type || null;
    }

    return NextResponse.json({
      argumentId,
      upvotes: argument.upvotes,
      downvotes: argument.downvotes,
      netVotes: argument.net_votes,
      upvoteRatio: argument.upvote_ratio,
      userVote
    });
  } catch (error: any) {
    console.error('Error fetching votes:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch votes' },
      { status: 500 }
    );
  }
}
