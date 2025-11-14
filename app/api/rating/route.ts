import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import {
  calculateDeLORating,
  updateWinLossRecord,
  updateCategoryRating,
  calculateOverallRating,
  createInitialRatings,
  DebateOutcome,
  DebateCategory
} from '@/lib/delo-rating';

/**
 * POST /api/rating
 * Calculate and update DeLO rating for a completed debate
 *
 * Request body:
 * {
 *   debateId: string;
 * }
 *
 * This endpoint should be called after a judgment has been rendered
 * It will:
 * 1. Calculate DeLO rating for both participants
 * 2. Update win/loss records
 * 3. Update category-specific ratings
 * 4. Update overall rating
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Allow internal API calls (from judge endpoint) without auth
    const isInternalCall = request.headers.get('X-Internal-Call') === 'true';

    if (!isInternalCall) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const body = await request.json();
    const { debateId } = body;

    if (!debateId) {
      return NextResponse.json(
        { error: 'Missing required field: debateId' },
        { status: 400 }
      );
    }

    // Get debate details
    const { data: debate, error: debateError } = await supabase
      .from('debates')
      .select('*')
      .eq('id', debateId)
      .single();

    if (debateError || !debate) {
      return NextResponse.json({ error: 'Debate not found' }, { status: 404 });
    }

    // Get arguments for both positions
    const { data: forArgs, error: forArgsError } = await supabase
      .from('arguments')
      .select('id, user_id, upvote_ratio, word_count, quality_score')
      .eq('debate_id', debateId)
      .eq('position', 'for');

    const { data: againstArgs, error: againstArgsError } = await supabase
      .from('arguments')
      .select('id, user_id, upvote_ratio, word_count, quality_score')
      .eq('debate_id', debateId)
      .eq('position', 'against');

    if (forArgsError || !forArgs || !forArgs[0]) {
      return NextResponse.json({ error: 'FOR argument not found' }, { status: 404 });
    }

    if (againstArgsError || !againstArgs || !againstArgs[0]) {
      return NextResponse.json({ error: 'AGAINST argument not found' }, { status: 404 });
    }

    // Check if already processed
    if (debate.rating_processed) {
      return NextResponse.json(
        { error: 'Ratings already processed for this debate' },
        { status: 400 }
      );
    }

    // Get judgment
    const { data: judgment, error: judgmentError } = await supabase
      .from('judgments')
      .select('winner_position, scores')
      .eq('debate_id', debateId)
      .single();

    if (judgmentError || !judgment) {
      return NextResponse.json({ error: 'Judgment not found' }, { status: 404 });
    }

    // Get both participant profiles
    const { data: forProfile, error: forError } = await supabase
      .from('profiles')
      .select(
        'id, delo_rating, delo_rating_provisional, peak_rating, win_loss_record, delo_categories'
      )
      .eq('id', debate.for_participant)
      .single();

    const { data: againstProfile, error: againstError } = await supabase
      .from('profiles')
      .select(
        'id, delo_rating, delo_rating_provisional, peak_rating, win_loss_record, delo_categories'
      )
      .eq('id', debate.against_participant)
      .single();

    if (forError || !forProfile || againstError || !againstProfile) {
      return NextResponse.json({ error: 'Participant profiles not found' }, { status: 404 });
    }

    // Get AI quality score from judgment scores
    const aiQualityScores = judgment.scores as Record<string, number> | null;
    const forQuality = aiQualityScores?.for_quality || 0.5;
    const againstQuality = aiQualityScores?.against_quality || 0.5;

    // Get argument stats
    const forArg = forArgs[0];
    const againstArg = againstArgs[0];

    // Determine outcomes
    const forOutcome: DebateOutcome =
      judgment.winner_position === 'for'
        ? 'win'
        : judgment.winner_position === 'against'
        ? 'loss'
        : 'draw';

    const againstOutcome: DebateOutcome =
      judgment.winner_position === 'against'
        ? 'win'
        : judgment.winner_position === 'for'
        ? 'loss'
        : 'draw';

    const category = (debate.category || 'ethics') as DebateCategory;
    const format = debate.debate_format || 'standard';

    // Count debates for K-factor
    const forDebateCount = (forProfile.win_loss_record?.total_wins || 0) +
                          (forProfile.win_loss_record?.total_losses || 0) +
                          (forProfile.win_loss_record?.total_draws || 0);

    const againstDebateCount = (againstProfile.win_loss_record?.total_wins || 0) +
                              (againstProfile.win_loss_record?.total_losses || 0) +
                              (againstProfile.win_loss_record?.total_draws || 0);

    // Calculate ratings for FOR participant
    const forRatingResult = calculateDeLORating({
      currentRating: forProfile.delo_rating,
      opponentRating: againstProfile.delo_rating,
      outcome: forOutcome,
      upvoteRatio: forArg.upvote_ratio || 0.5,
      wordCount: forArg.word_count || 0,
      hasAICitations: forQuality > 0.7,
      debateFormat: format as any,
      isProvisional: forProfile.delo_rating_provisional,
      debateCount: forDebateCount
    });

    // Calculate ratings for AGAINST participant
    const againstRatingResult = calculateDeLORating({
      currentRating: againstProfile.delo_rating,
      opponentRating: forProfile.delo_rating,
      outcome: againstOutcome,
      upvoteRatio: againstArg.upvote_ratio || 0.5,
      wordCount: againstArg.word_count || 0,
      hasAICitations: againstQuality > 0.7,
      debateFormat: format as any,
      isProvisional: againstProfile.delo_rating_provisional,
      debateCount: againstDebateCount
    });

    // Update FOR participant
    let updatedForRecord = forProfile.win_loss_record || createInitialRatings().win_loss_record;
    updatedForRecord = updateWinLossRecord(updatedForRecord, forOutcome, category);

    let updatedForCategories = forProfile.delo_categories || createInitialRatings().delo_categories;
    updatedForCategories = updateCategoryRating(
      updatedForCategories,
      category,
      forRatingResult.ratingChange
    );

    const newForOverallRating = calculateOverallRating(updatedForCategories);

    // Check if provisional rating should be removed (after 20 debates)
    const isForStillProvisional = forDebateCount < 20;

    const { error: forUpdateError } = await supabase
      .from('profiles')
      .update({
        delo_rating: forRatingResult.newRating,
        delo_rating_provisional: isForStillProvisional,
        peak_rating: Math.max(forProfile.peak_rating, forRatingResult.newRating),
        delo_categories: updatedForCategories,
        win_loss_record: updatedForRecord
      })
      .eq('id', debate.for_participant);

    if (forUpdateError) throw forUpdateError;

    // Update AGAINST participant
    let updatedAgainstRecord = againstProfile.win_loss_record || createInitialRatings().win_loss_record;
    updatedAgainstRecord = updateWinLossRecord(updatedAgainstRecord, againstOutcome, category);

    let updatedAgainstCategories = againstProfile.delo_categories || createInitialRatings().delo_categories;
    updatedAgainstCategories = updateCategoryRating(
      updatedAgainstCategories,
      category,
      againstRatingResult.ratingChange
    );

    const newAgainstOverallRating = calculateOverallRating(updatedAgainstCategories);

    // Check if provisional rating should be removed
    const isAgainstStillProvisional = againstDebateCount < 20;

    const { error: againstUpdateError } = await supabase
      .from('profiles')
      .update({
        delo_rating: againstRatingResult.newRating,
        delo_rating_provisional: isAgainstStillProvisional,
        peak_rating: Math.max(againstProfile.peak_rating, againstRatingResult.newRating),
        delo_categories: updatedAgainstCategories,
        win_loss_record: updatedAgainstRecord
      })
      .eq('id', debate.against_participant);

    if (againstUpdateError) throw againstUpdateError;

    // Mark debate as rating processed
    const { error: markError } = await supabase
      .from('debates')
      .update({ rating_processed: true })
      .eq('id', debateId);

    if (markError) throw markError;

    return NextResponse.json({
      success: true,
      ratings: {
        for: {
          participant: debate.for_participant,
          previousRating: forProfile.delo_rating,
          newRating: forRatingResult.newRating,
          ratingChange: forRatingResult.ratingChange,
          outcome: forOutcome,
          breakdown: forRatingResult.breakdown,
          category: category,
          newCategoryRating: updatedForCategories[category],
          provisional: isForStillProvisional
        },
        against: {
          participant: debate.against_participant,
          previousRating: againstProfile.delo_rating,
          newRating: againstRatingResult.newRating,
          ratingChange: againstRatingResult.ratingChange,
          outcome: againstOutcome,
          breakdown: againstRatingResult.breakdown,
          category: category,
          newCategoryRating: updatedAgainstCategories[category],
          provisional: isAgainstStillProvisional
        }
      }
    });
  } catch (error: any) {
    console.error('Error calculating rating:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to calculate rating' },
      { status: 500 }
    );
  }
}
