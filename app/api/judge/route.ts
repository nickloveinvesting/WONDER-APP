import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { judgeDebate } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { debateId, topic, argumentFor, argumentAgainst } = body;

    if (!debateId || !topic || !argumentFor || !argumentAgainst) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get AI judgment from Gemini
    const judgment = await judgeDebate(topic, argumentFor, argumentAgainst);

    // Get debate info to determine winner user ID
    const { data: debate } = await supabase
      .from('debates')
      .select('for_participant, against_participant')
      .eq('id', debateId)
      .single();

    if (!debate) {
      return NextResponse.json({ error: 'Debate not found' }, { status: 404 });
    }

    const winnerId =
      judgment.winner === 'for'
        ? debate.for_participant
        : judgment.winner === 'against'
        ? debate.against_participant
        : null;

    // Save judgment to database
    const { error: judgmentError } = await supabase.from('judgments').insert({
      debate_id: debateId,
      winner_position: judgment.winner,
      reasoning: judgment.reasoning,
      fact_checks: judgment.factChecks,
      scores: judgment.scores,
    });

    if (judgmentError) throw judgmentError;

    // Update debate status and winner
    const { error: updateError } = await supabase
      .from('debates')
      .update({
        status: 'completed',
        winner_id: winnerId,
        completed_at: new Date().toISOString(),
      })
      .eq('id', debateId);

    if (updateError) throw updateError;

    // Calculate DeLO ratings for both participants (non-critical background task)
    try {
      const baseUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000';

      const ratingResponse = await fetch(`${baseUrl}/api/rating`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Internal-Call': 'true' // Mark as internal API call to bypass auth
        },
        body: JSON.stringify({ debateId })
      });

      if (!ratingResponse.ok) {
        console.warn('Failed to calculate ratings:', await ratingResponse.text());
        // Don't fail the judgment if rating calculation fails - it can be calculated later
      }
    } catch (ratingError) {
      console.warn('Error calculating ratings:', ratingError);
      // Non-critical error, judgment still succeeded
    }

    return NextResponse.json({ success: true, judgment });
  } catch (error: any) {
    console.error('Error judging debate:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to judge debate' },
      { status: 500 }
    );
  }
}
