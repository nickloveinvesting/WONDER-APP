/**
 * DeLO Rating System Tests
 * Tests all core rating calculation logic
 */

import {
  calculateExpectedScore,
  getKFactor,
  calculateQualityMultiplier,
  calculateDeLORating,
  updateWinLossRecord,
  updateCategoryRating,
  calculateOverallRating,
  getRatingTier,
  meetsFormatMinimum,
  isValidDebateFormat,
  isValidDebateCategory,
  DEBATE_FORMATS,
  RATING_TIERS,
  createInitialRatings,
  type RatingCalculationInput,
  type WinLossRecord,
  type DeloCategories
} from '../delo-rating';

// ============================================
// TEST UTILITIES
// ============================================

function runTest(name: string, testFn: () => void) {
  try {
    testFn();
    console.log(`✓ ${name}`);
  } catch (error) {
    console.error(`✗ ${name}`);
    console.error(`  Error: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
}

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

function assertClose(actual: number, expected: number, tolerance: number = 0.01, message: string = '') {
  const diff = Math.abs(actual - expected);
  if (diff > tolerance) {
    throw new Error(`Expected ${expected} ± ${tolerance}, got ${actual}. ${message}`);
  }
}

// ============================================
// TESTS: Expected Score Calculation
// ============================================

console.log('\n=== EXPECTED SCORE CALCULATION ===\n');

runTest('Equal rating should give 50% expected score', () => {
  const expected = calculateExpectedScore(1500, 1500);
  assertClose(expected, 0.5, 0.01);
});

runTest('100 points higher should give ~64% expected score', () => {
  const expected = calculateExpectedScore(1600, 1500);
  assertClose(expected, 0.64, 0.02);
});

runTest('100 points lower should give ~36% expected score', () => {
  const expected = calculateExpectedScore(1400, 1500);
  assertClose(expected, 0.36, 0.02);
});

runTest('Massive rating difference (Novice vs King)', () => {
  const expected = calculateExpectedScore(800, 2400);
  assert(expected < 0.1, 'Novice should have <10% chance against King');
});

// ============================================
// TESTS: K-Factor Calculation
// ============================================

console.log('\n=== K-FACTOR CALCULATION ===\n');

runTest('Provisional status should have K=50', () => {
  const k = getKFactor(true, 5);
  assert(k === 50, 'Provisional K-factor should be 50');
});

runTest('Non-provisional with few debates should have K=40', () => {
  const k = getKFactor(false, 5);
  assert(k === 40, 'Low-debate K-factor should be 40');
});

runTest('Non-provisional with many debates should have K=32', () => {
  const k = getKFactor(false, 50);
  assert(k === 32, 'Standard K-factor should be 32');
});

// ============================================
// TESTS: Quality Multiplier
// ============================================

console.log('\n=== QUALITY MULTIPLIER ===\n');

runTest('Poor argument (30% upvote, short) should be ~0.8', () => {
  const multiplier = calculateQualityMultiplier(0.3, 150, false);
  assertClose(multiplier, 0.8, 0.05);
});

runTest('Average argument (50% upvote, standard) should be ~1.0', () => {
  const multiplier = calculateQualityMultiplier(0.5, 400, false);
  assertClose(multiplier, 1.0, 0.05);
});

runTest('Excellent argument (90% upvote, long) should be ~1.2', () => {
  const multiplier = calculateQualityMultiplier(0.9, 1000, false);
  assertClose(multiplier, 1.2, 0.05);
});

runTest('Excellent argument with AI citations should boost quality', () => {
  const withoutCitations = calculateQualityMultiplier(0.85, 500, false);
  const withCitations = calculateQualityMultiplier(0.85, 500, true);
  assert(withCitations > withoutCitations, 'Citations should increase multiplier');
});

// ============================================
// TESTS: DeLO Rating Calculation
// ============================================

console.log('\n=== DELO RATING CALCULATION ===\n');

runTest('Win against equal opponent should give ~+18 points (standard)', () => {
  const input: RatingCalculationInput = {
    currentRating: 1500,
    opponentRating: 1500,
    outcome: 'win',
    upvoteRatio: 0.5,
    wordCount: 400,
    hasAICitations: false,
    debateFormat: 'standard',
    isProvisional: false,
    debateCount: 50
  };
  const result = calculateDeLORating(input);
  assertClose(result.ratingChange, 18, 5, 'Base win should be ~+16-20');
  assertClose(result.newRating, 1518, 5);
});

runTest('Loss against equal opponent should give ~-16 points (standard)', () => {
  const input: RatingCalculationInput = {
    currentRating: 1500,
    opponentRating: 1500,
    outcome: 'loss',
    upvoteRatio: 0.5,
    wordCount: 400,
    hasAICitations: false,
    debateFormat: 'standard',
    isProvisional: false,
    debateCount: 50
  };
  const result = calculateDeLORating(input);
  assertClose(result.ratingChange, -16, 5);
});

runTest('Win against higher-rated opponent should give more points', () => {
  const input: RatingCalculationInput = {
    currentRating: 1400,
    opponentRating: 1600,
    outcome: 'win',
    upvoteRatio: 0.5,
    wordCount: 400,
    hasAICitations: false,
    debateFormat: 'standard',
    isProvisional: false,
    debateCount: 50
  };
  const result = calculateDeLORating(input);
  assert(result.ratingChange > 20, 'Beating higher-rated opponent should give >20 points');
});

runTest('High-quality loss minimizes rating loss', () => {
  const poorLoss: RatingCalculationInput = {
    currentRating: 1500,
    opponentRating: 1500,
    outcome: 'loss',
    upvoteRatio: 0.2, // 20% upvote ratio
    wordCount: 150,
    hasAICitations: false,
    debateFormat: 'standard',
    isProvisional: false,
    debateCount: 50
  };

  const excellentLoss: RatingCalculationInput = {
    currentRating: 1500,
    opponentRating: 1500,
    outcome: 'loss',
    upvoteRatio: 0.9, // 90% upvote ratio
    wordCount: 1000,
    hasAICitations: true,
    debateFormat: 'standard',
    isProvisional: false,
    debateCount: 50
  };

  const poorResult = calculateDeLORating(poorLoss);
  const excellentResult = calculateDeLORating(excellentLoss);

  assert(
    excellentResult.ratingChange > poorResult.ratingChange,
    'Excellent loss should lose fewer points than poor loss'
  );
});

runTest('Quick match should affect rating less than standard debate', () => {
  const quickInput: RatingCalculationInput = {
    currentRating: 1500,
    opponentRating: 1500,
    outcome: 'win',
    upvoteRatio: 0.5,
    wordCount: 400,
    hasAICitations: false,
    debateFormat: 'quick_match',
    isProvisional: false,
    debateCount: 50
  };

  const standardInput: RatingCalculationInput = {
    currentRating: 1500,
    opponentRating: 1500,
    outcome: 'win',
    upvoteRatio: 0.5,
    wordCount: 400,
    hasAICitations: false,
    debateFormat: 'standard',
    isProvisional: false,
    debateCount: 50
  };

  const quickResult = calculateDeLORating(quickInput);
  const standardResult = calculateDeLORating(standardInput);

  assert(
    Math.abs(quickResult.ratingChange) < Math.abs(standardResult.ratingChange),
    'Quick match should have lower rating impact'
  );
});

runTest('Deep debate should affect rating more than standard debate', () => {
  const deepInput: RatingCalculationInput = {
    currentRating: 1500,
    opponentRating: 1500,
    outcome: 'win',
    upvoteRatio: 0.5,
    wordCount: 1000,
    hasAICitations: false,
    debateFormat: 'deep_debate',
    isProvisional: false,
    debateCount: 50
  };

  const standardInput: RatingCalculationInput = {
    currentRating: 1500,
    opponentRating: 1500,
    outcome: 'win',
    upvoteRatio: 0.5,
    wordCount: 400,
    hasAICitations: false,
    debateFormat: 'standard',
    isProvisional: false,
    debateCount: 50
  };

  const deepResult = calculateDeLORating(deepInput);
  const standardResult = calculateDeLORating(standardInput);

  assert(
    Math.abs(deepResult.ratingChange) > Math.abs(standardResult.ratingChange),
    'Deep debate should have higher rating impact'
  );
});

runTest('Provisional rating should be more volatile', () => {
  const provisionalInput: RatingCalculationInput = {
    currentRating: 1500,
    opponentRating: 1500,
    outcome: 'win',
    upvoteRatio: 0.5,
    wordCount: 400,
    hasAICitations: false,
    debateFormat: 'standard',
    isProvisional: true,
    debateCount: 5
  };

  const stabilizedInput: RatingCalculationInput = {
    ...provisionalInput,
    isProvisional: false,
    debateCount: 50
  };

  const provisionalResult = calculateDeLORating(provisionalInput);
  const stabilizedResult = calculateDeLORating(stabilizedInput);

  assert(
    Math.abs(provisionalResult.ratingChange) > Math.abs(stabilizedResult.ratingChange),
    'Provisional rating should have larger swings'
  );
});

// ============================================
// TESTS: Win/Loss Record Management
// ============================================

console.log('\n=== WIN/LOSS RECORD MANAGEMENT ===\n');

runTest('New record should be initialized correctly', () => {
  const initial = createInitialRatings().win_loss_record;
  assert(initial.total_wins === 0, 'Initial wins should be 0');
  assert(initial.total_losses === 0, 'Initial losses should be 0');
  assert(initial.total_draws === 0, 'Initial draws should be 0');
  assert(initial.win_rate === 0.5, 'Initial win rate should be 0.5');
  assert(initial.streak.current === 0, 'Initial streak should be 0');
  assert(initial.streak.direction === 'neutral', 'Initial direction should be neutral');
});

runTest('Recording a win should update totals and streak', () => {
  let record = createInitialRatings().win_loss_record;
  record = updateWinLossRecord(record, 'win', 'ethics');

  assert(record.total_wins === 1, 'Should have 1 win');
  assert(record.total_losses === 0, 'Should have 0 losses');
  assert(record.win_rate === 1.0, 'Win rate should be 100%');
  assert(record.streak.current === 1, 'Streak should be 1');
  assert(record.streak.direction === 'win', 'Direction should be win');
  assert(record.by_category.ethics.wins === 1, 'Ethics should have 1 win');
});

runTest('Win streak should accumulate', () => {
  let record = createInitialRatings().win_loss_record;
  record = updateWinLossRecord(record, 'win', 'ethics');
  record = updateWinLossRecord(record, 'win', 'logic');
  record = updateWinLossRecord(record, 'win', 'metaphysics');

  assert(record.total_wins === 3, 'Should have 3 wins');
  assert(record.streak.current === 3, 'Streak should be 3');
  assert(record.streak.longest === 3, 'Longest streak should be 3');
});

runTest('Loss should break win streak', () => {
  let record = createInitialRatings().win_loss_record;
  record = updateWinLossRecord(record, 'win', 'ethics');
  record = updateWinLossRecord(record, 'win', 'ethics');
  record = updateWinLossRecord(record, 'loss', 'ethics');

  assert(record.total_wins === 2, 'Should have 2 wins');
  assert(record.total_losses === 1, 'Should have 1 loss');
  assert(record.streak.current === 1, 'Streak should reset to 1 (loss)');
  assert(record.streak.direction === 'loss', 'Direction should be loss');
  assert(record.streak.longest === 2, 'Longest streak should still be 2');
});

runTest('Draw should reset streak', () => {
  let record = createInitialRatings().win_loss_record;
  record = updateWinLossRecord(record, 'win', 'ethics');
  record = updateWinLossRecord(record, 'win', 'ethics');
  record = updateWinLossRecord(record, 'draw', 'ethics');

  assert(record.total_wins === 2, 'Should have 2 wins');
  assert(record.total_draws === 1, 'Should have 1 draw');
  assert(record.streak.current === 0, 'Streak should be 0 after draw');
  assert(record.streak.direction === 'neutral', 'Direction should be neutral');
  assert(record.streak.longest === 2, 'Longest streak should still be 2');
});

runTest('Category tracking should work correctly', () => {
  let record = createInitialRatings().win_loss_record;
  record = updateWinLossRecord(record, 'win', 'ethics');
  record = updateWinLossRecord(record, 'win', 'logic');
  record = updateWinLossRecord(record, 'loss', 'ethics');

  assert(record.by_category.ethics.wins === 2, 'Ethics should have 2 wins');
  assert(record.by_category.ethics.losses === 1, 'Ethics should have 1 loss');
  assert(record.by_category.logic.wins === 1, 'Logic should have 1 win');
  assert(record.by_category.metaphysics.wins === 0, 'Metaphysics should have 0 wins');
});

runTest('Recent results should keep last 20', () => {
  let record = createInitialRatings().win_loss_record;

  // Add 25 results
  for (let i = 0; i < 25; i++) {
    record = updateWinLossRecord(record, i % 2 === 0 ? 'win' : 'loss', 'ethics');
  }

  assert(record.recent_results.length === 20, 'Should keep only last 20 results');
});

// ============================================
// TESTS: Category Rating Management
// ============================================

console.log('\n=== CATEGORY RATING MANAGEMENT ===\n');

runTest('Category rating should update correctly', () => {
  let categories = createInitialRatings().delo_categories;
  assert(categories.ethics === 800, 'Initial ethics rating should be 800');

  categories = updateCategoryRating(categories, 'ethics', +20);
  assert(categories.ethics === 820, 'Updated ethics rating should be 820');

  categories = updateCategoryRating(categories, 'ethics', -15);
  assert(categories.ethics === 805, 'Updated ethics rating should be 805');
});

runTest('Category rating should not go below 800', () => {
  let categories = createInitialRatings().delo_categories;
  categories.ethics = 810;
  categories = updateCategoryRating(categories, 'ethics', -50);
  assert(categories.ethics === 800, 'Rating should floor at 800');
});

runTest('Overall rating should be average of categories', () => {
  let categories: DeloCategories = {
    ethics: 1000,
    logic: 1200,
    metaphysics: 800,
    epistemology: 1000,
    political_philosophy: 900,
    aesthetics: 1100
  };

  const overall = calculateOverallRating(categories);
  const expected = (1000 + 1200 + 800 + 1000 + 900 + 1100) / 6;
  assertClose(overall, expected, 1);
});

// ============================================
// TESTS: Rating Tiers
// ============================================

console.log('\n=== RATING TIERS ===\n');

runTest('Novice tier should be 800-999', () => {
  const tier = getRatingTier(900);
  assert(tier.title === 'Novice Philosopher', '900 should be Novice');
});

runTest('Master should be 1800-1999', () => {
  const tier = getRatingTier(1850);
  assert(tier.title === 'Master Philosopher', '1850 should be Master');
});

runTest('Philosopher King should be 2200+', () => {
  const tier = getRatingTier(2500);
  assert(tier.title === 'Philosopher King/Queen', '2500 should be King/Queen');
});

// ============================================
// TESTS: Format Validation
// ============================================

console.log('\n=== FORMAT VALIDATION ===\n');

runTest('Short argument should fail for standard debate', () => {
  const passes = meetsFormatMinimum('standard', 200);
  assert(!passes, '200 chars should fail standard (min 300)');
});

runTest('Long argument should pass for standard debate', () => {
  const passes = meetsFormatMinimum('standard', 500);
  assert(passes, '500 chars should pass standard');
});

runTest('Valid format should pass validation', () => {
  assert(isValidDebateFormat('standard'), 'standard should be valid');
  assert(isValidDebateFormat('deep_debate'), 'deep_debate should be valid');
});

runTest('Invalid format should fail validation', () => {
  assert(!isValidDebateFormat('invalid'), 'invalid should not be valid');
  assert(!isValidDebateFormat(123), '123 should not be valid');
});

runTest('Valid category should pass validation', () => {
  assert(isValidDebateCategory('ethics'), 'ethics should be valid');
  assert(isValidDebateCategory('logic'), 'logic should be valid');
});

runTest('Invalid category should fail validation', () => {
  assert(!isValidDebateCategory('invalid'), 'invalid should not be valid');
  assert(!isValidDebateCategory(123), '123 should not be valid');
});

// ============================================
// SUMMARY
// ============================================

console.log('\n' + '='.repeat(50));
console.log('✓ All DeLO rating tests passed!');
console.log('='.repeat(50) + '\n');
