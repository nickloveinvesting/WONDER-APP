/**
 * DeLO (Debate ELO) Rating System
 * Chess.com inspired ELO-based rating system for philosophical debates
 */

export type DebateFormat = 'quick_match' | 'standard' | 'deep_debate' | 'lightning_round';
export type DebateCategory = 'ethics' | 'logic' | 'metaphysics' | 'epistemology' | 'political_philosophy' | 'aesthetics';
export type DebateOutcome = 'win' | 'loss' | 'draw';

// ============================================
// DEBATE FORMAT CONFIGURATION
// ============================================

export interface DebateFormatConfig {
  name: DebateFormat;
  argumentTimeLimit: number; // minutes
  rebuttalTimeLimit: number; // minutes
  rounds: number;
  preparationTime: number; // minutes
  ratingRewardRange: [number, number]; // [min, max] rating change
  minArgumentLength: number; // characters
  scoringWeight: number; // multiplier for rating changes
  description: string;
}

export const DEBATE_FORMATS: Record<DebateFormat, DebateFormatConfig> = {
  quick_match: {
    name: 'quick_match',
    argumentTimeLimit: 2,
    rebuttalTimeLimit: 2,
    rounds: 1,
    preparationTime: 0,
    ratingRewardRange: [5, 15],
    minArgumentLength: 100,
    scoringWeight: 0.5,
    description: 'Quick philosophical sparring - perfect for lunch breaks'
  },
  standard: {
    name: 'standard',
    argumentTimeLimit: 10,
    rebuttalTimeLimit: 5,
    rounds: 2,
    preparationTime: 10,
    ratingRewardRange: [15, 30],
    minArgumentLength: 300,
    scoringWeight: 1.0,
    description: 'Standard structured debate - the classic format'
  },
  deep_debate: {
    name: 'deep_debate',
    argumentTimeLimit: 30,
    rebuttalTimeLimit: 15,
    rounds: 3,
    preparationTime: 30,
    ratingRewardRange: [30, 50],
    minArgumentLength: 800,
    scoringWeight: 1.5,
    description: 'Deep philosophical exploration - for serious thinkers'
  },
  lightning_round: {
    name: 'lightning_round',
    argumentTimeLimit: 1,
    rebuttalTimeLimit: 0.5,
    rounds: 3,
    preparationTime: 0,
    ratingRewardRange: [5, 10],
    minArgumentLength: 50,
    scoringWeight: 0.3,
    description: 'Rapid-fire exchanges - fun and accessible'
  }
};

// ============================================
// RATING CALCULATION FUNCTIONS
// ============================================

/**
 * Calculate expected win probability based on ELO ratings
 * Uses Chess.com formula: E = 1 / (1 + 10^((opponent_rating - player_rating) / 400))
 */
export function calculateExpectedScore(
  playerRating: number,
  opponentRating: number
): number {
  return 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
}

/**
 * Get K-factor (rating volatility) based on player status
 * Provisional ratings (first 20 debates) have higher volatility
 */
export function getKFactor(
  isProvisional: boolean,
  debateCount: number = 0
): number {
  if (isProvisional) return 50; // High volatility for new players
  if (debateCount < 10) return 40; // Still settling in
  return 32; // Standard Chess.com K-factor
}

/**
 * Calculate quality multiplier based on argument metrics
 * Range: 0.8 to 1.2
 * - 0.8 = poor argument
 * - 1.0 = average argument
 * - 1.2 = excellent argument
 */
export function calculateQualityMultiplier(
  upvoteRatio: number, // 0-1, ratio of upvotes to total votes
  wordCount: number,
  hasAICitations: boolean = false
): number {
  // Base multiplier starts at 1.0 (neutral)
  let multiplier = 1.0;

  // Upvote ratio penalty/bonus (range: -0.15 to +0.15)
  // 0% upvotes → -0.15, 50% → 0, 100% upvotes → +0.15
  const upvoteBonus = (upvoteRatio - 0.5) * 0.3;

  // Word count penalty/bonus (range: -0.1 to +0.1)
  let wordCountBonus = 0;
  if (wordCount < 100) wordCountBonus = -0.1; // Too short
  else if (wordCount < 300) wordCountBonus = -0.05; // Below standard
  else if (wordCount < 500) wordCountBonus = 0; // Adequate (300-500)
  else if (wordCount < 1000) wordCountBonus = 0.05; // Good (500-1000)
  else wordCountBonus = 0.1; // Excellent depth (1000+)

  // Citation bonus (up to +0.08)
  const citationBonus = hasAICitations ? 0.08 : 0;

  // Total multiplier: 1.0 + bonuses
  multiplier = 1.0 + upvoteBonus + wordCountBonus + citationBonus;

  // Clamp between 0.8 and 1.2
  return Math.max(0.8, Math.min(1.2, multiplier));
}

/**
 * Main DeLO rating calculation
 */
export interface RatingCalculationInput {
  currentRating: number;
  opponentRating: number;
  outcome: DebateOutcome; // 'win', 'loss', 'draw'
  upvoteRatio: number; // 0-1
  wordCount: number;
  hasAICitations: boolean;
  debateFormat: DebateFormat;
  isProvisional: boolean;
  debateCount: number; // Total debates by user
}

export interface RatingCalculationResult {
  newRating: number;
  ratingChange: number;
  baseELO: number;
  qualityMultiplier: number;
  formatMultiplier: number;
  expectedScore: number;
  breakdown: {
    baseChange: number;
    qualityBonus: number;
    formatAdjustment: number;
  };
}

export function calculateDeLORating(input: RatingCalculationInput): RatingCalculationResult {
  const {
    currentRating,
    opponentRating,
    outcome,
    upvoteRatio,
    wordCount,
    hasAICitations,
    debateFormat,
    isProvisional,
    debateCount
  } = input;

  // Step 1: Calculate expected score
  const expectedScore = calculateExpectedScore(currentRating, opponentRating);

  // Step 2: Determine actual score
  let actualScore: number;
  if (outcome === 'win') actualScore = 1;
  else if (outcome === 'loss') actualScore = 0;
  else actualScore = 0.5; // draw

  // Step 3: Get K-factor
  const kFactor = getKFactor(isProvisional, debateCount);

  // Step 4: Calculate base ELO change
  const baseELO = Math.round(kFactor * (actualScore - expectedScore));

  // Step 5: Calculate quality multiplier
  const qualityMultiplier = calculateQualityMultiplier(upvoteRatio, wordCount, hasAICitations);

  // Step 6: Get format multiplier
  const formatConfig = DEBATE_FORMATS[debateFormat];
  const formatMultiplier = formatConfig.scoringWeight;

  // Step 7: Calculate quality bonus
  // For wins: high quality boosts the gain
  // For losses: high quality minimizes the loss
  let qualityBonus: number;
  if (baseELO >= 0) {
    // Win: quality multiplier adds to gain
    qualityBonus = Math.round(baseELO * (qualityMultiplier - 1));
  } else {
    // Loss: quality multiplier reduces the loss magnitude
    // Poor quality (0.8) loses full amount, good quality (1.2) loses less
    qualityBonus = Math.round(Math.abs(baseELO) * (qualityMultiplier - 0.8));
  }

  // Step 8: Apply format multiplier to final change
  const subtotal = baseELO + qualityBonus;
  const formatAdjustment = Math.round(subtotal * (formatMultiplier - 1));
  const totalRatingChange = subtotal + formatAdjustment;

  return {
    newRating: currentRating + totalRatingChange,
    ratingChange: totalRatingChange,
    baseELO,
    qualityMultiplier,
    formatMultiplier,
    expectedScore,
    breakdown: {
      baseChange: baseELO,
      qualityBonus,
      formatAdjustment
    }
  };
}

// ============================================
// WIN/LOSS RECORD MANAGEMENT
// ============================================

export interface WinLossRecord {
  total_wins: number;
  total_losses: number;
  total_draws: number;
  win_rate: number;
  recent_results: Array<{
    outcome: DebateOutcome;
    category: DebateCategory;
    timestamp: string;
  }>;
  by_category: Record<DebateCategory, {
    wins: number;
    losses: number;
    draws: number;
  }>;
  streak: {
    current: number;
    direction: 'win' | 'loss' | 'neutral';
    longest: number;
  };
}

/**
 * Update win/loss record with new debate outcome
 */
export function updateWinLossRecord(
  currentRecord: WinLossRecord,
  outcome: DebateOutcome,
  category: DebateCategory
): WinLossRecord {
  const updated = structuredClone(currentRecord);

  // Update totals
  if (outcome === 'win') updated.total_wins++;
  else if (outcome === 'loss') updated.total_losses++;
  else updated.total_draws++;

  // Update category (map outcome to plural form: win → wins, loss → losses, draw → draws)
  const keyMap: Record<DebateOutcome, 'wins' | 'losses' | 'draws'> = {
    win: 'wins',
    loss: 'losses',
    draw: 'draws'
  };
  updated.by_category[category][keyMap[outcome]]++;

  // Calculate win rate
  const total = updated.total_wins + updated.total_losses + updated.total_draws;
  updated.win_rate = total > 0 ? updated.total_wins / total : 0.5;

  // Update streak
  if (outcome === 'win') {
    updated.streak.current++;
    updated.streak.direction = 'win';
    if (updated.streak.current > updated.streak.longest) {
      updated.streak.longest = updated.streak.current;
    }
  } else if (outcome === 'loss') {
    if (updated.streak.direction === 'win') {
      updated.streak.current = 1;
    } else if (updated.streak.direction === 'loss') {
      updated.streak.current++;
    } else {
      updated.streak.current = 1;
    }
    updated.streak.direction = 'loss';
  } else {
    // draw
    updated.streak.current = 0;
    updated.streak.direction = 'neutral';
  }

  // Update recent results (keep last 20)
  updated.recent_results.unshift({
    outcome,
    category,
    timestamp: new Date().toISOString()
  });
  if (updated.recent_results.length > 20) {
    updated.recent_results.pop();
  }

  return updated;
}

// ============================================
// CATEGORY RATING MANAGEMENT
// ============================================

export interface DeloCategories {
  ethics: number;
  logic: number;
  metaphysics: number;
  epistemology: number;
  political_philosophy: number;
  aesthetics: number;
}

/**
 * Update category-specific rating
 */
export function updateCategoryRating(
  currentCategories: DeloCategories,
  category: DebateCategory,
  ratingChange: number
): DeloCategories {
  const updated = { ...currentCategories };
  updated[category] = Math.max(800, updated[category] + ratingChange);
  return updated;
}

/**
 * Calculate overall rating as weighted average of categories
 * All categories weighted equally for overall rating
 */
export function calculateOverallRating(categories: DeloCategories): number {
  const values = Object.values(categories);
  const sum = values.reduce((a, b) => a + b, 0);
  return Math.round(sum / values.length);
}

// ============================================
// VALIDATION & SAFETY
// ============================================

/**
 * Validate debate format
 */
export function isValidDebateFormat(format: unknown): format is DebateFormat {
  return typeof format === 'string' && format in DEBATE_FORMATS;
}

/**
 * Validate debate category
 */
export function isValidDebateCategory(category: unknown): category is DebateCategory {
  const validCategories: DebateCategory[] = [
    'ethics', 'logic', 'metaphysics', 'epistemology', 'political_philosophy', 'aesthetics'
  ];
  return typeof category === 'string' && validCategories.includes(category as DebateCategory);
}

/**
 * Check if argument meets minimum length for format
 */
export function meetsFormatMinimum(format: DebateFormat, contentLength: number): boolean {
  const config = DEBATE_FORMATS[format];
  return contentLength >= config.minArgumentLength;
}

/**
 * Detect suspicious patterns that might indicate rating manipulation
 */
export interface SuspiciousPatternFlags {
  highWinRateWithLowQuality: boolean;
  repeatedOpponentAbuse: boolean;
  unusualRatingVolatility: boolean;
}

export function detectSuspiciousPatterns(
  winRate: number,
  avgUpvoteRatio: number,
  recentRatingVolatility: number
): SuspiciousPatternFlags {
  return {
    // Win rate > 60% but average upvote ratio < 40% suggests gaming
    highWinRateWithLowQuality: winRate > 0.6 && avgUpvoteRatio < 0.4,
    // This would be checked against debate history in the database
    repeatedOpponentAbuse: false, // Checked separately
    // Very high volatility after stabilization suggests something off
    unusualRatingVolatility: recentRatingVolatility > 40
  };
}

// ============================================
// RATING TIERS
// ============================================

export interface RatingTier {
  minRating: number;
  maxRating: number;
  title: string;
  emoji: string;
}

export const RATING_TIERS: RatingTier[] = [
  { minRating: 800, maxRating: 999, title: 'Novice Philosopher', emoji: '🌱' },
  { minRating: 1000, maxRating: 1199, title: 'Apprentice Thinker', emoji: '📚' },
  { minRating: 1200, maxRating: 1399, title: 'Competent Debater', emoji: '⚖️' },
  { minRating: 1400, maxRating: 1599, title: 'Skilled Philosopher', emoji: '🧠' },
  { minRating: 1600, maxRating: 1799, title: 'Advanced Dialectician', emoji: '🎓' },
  { minRating: 1800, maxRating: 1999, title: 'Master Philosopher', emoji: '👑' },
  { minRating: 2000, maxRating: 2199, title: 'Grandmaster Thinker', emoji: '♕' },
  { minRating: 2200, maxRating: Infinity, title: 'Philosopher King/Queen', emoji: '👸' }
];

/**
 * Get tier information for a rating
 */
export function getRatingTier(rating: number): RatingTier {
  for (const tier of RATING_TIERS) {
    if (rating >= tier.minRating && rating <= tier.maxRating) {
      return tier;
    }
  }
  return RATING_TIERS[RATING_TIERS.length - 1]; // Return highest tier as fallback
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Create initial rating values for new user
 */
export function createInitialRatings(): {
  delo_rating: number;
  delo_rating_provisional: boolean;
  peak_rating: number;
  delo_categories: DeloCategories;
  win_loss_record: WinLossRecord;
} {
  return {
    delo_rating: 800,
    delo_rating_provisional: true,
    peak_rating: 800,
    delo_categories: {
      ethics: 800,
      logic: 800,
      metaphysics: 800,
      epistemology: 800,
      political_philosophy: 800,
      aesthetics: 800
    },
    win_loss_record: {
      total_wins: 0,
      total_losses: 0,
      total_draws: 0,
      win_rate: 0.5,
      recent_results: [],
      by_category: {
        ethics: { wins: 0, losses: 0, draws: 0 },
        logic: { wins: 0, losses: 0, draws: 0 },
        metaphysics: { wins: 0, losses: 0, draws: 0 },
        epistemology: { wins: 0, losses: 0, draws: 0 },
        political_philosophy: { wins: 0, losses: 0, draws: 0 },
        aesthetics: { wins: 0, losses: 0, draws: 0 }
      },
      streak: {
        current: 0,
        direction: 'neutral',
        longest: 0
      }
    }
  };
}
