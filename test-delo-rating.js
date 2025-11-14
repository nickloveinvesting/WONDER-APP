/**
 * Standalone test runner for DeLO rating system
 * Uses CommonJS to avoid import issues
 */

// ============================================
// COPY OF FUNCTIONS (for testing without imports)
// ============================================

function calculateExpectedScore(playerRating, opponentRating) {
  return 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
}

function getKFactor(isProvisional, debateCount = 0) {
  if (isProvisional) return 50;
  if (debateCount < 10) return 40;
  return 32;
}

function calculateQualityMultiplier(upvoteRatio, wordCount, hasAICitations = false) {
  let multiplier = 1.0;
  const upvoteBonus = (upvoteRatio - 0.5) * 0.3;

  let wordCountBonus = 0;
  if (wordCount < 100) wordCountBonus = -0.1;
  else if (wordCount < 300) wordCountBonus = -0.05;
  else if (wordCount < 500) wordCountBonus = 0;
  else if (wordCount < 1000) wordCountBonus = 0.05;
  else wordCountBonus = 0.1;

  const citationBonus = hasAICitations ? 0.08 : 0;
  multiplier = 1.0 + upvoteBonus + wordCountBonus + citationBonus;
  return Math.max(0.8, Math.min(1.2, multiplier));
}

function calculateDeLORating(input) {
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

  const DEBATE_FORMATS = {
    quick_match: { scoringWeight: 0.5 },
    standard: { scoringWeight: 1.0 },
    deep_debate: { scoringWeight: 1.5 },
    lightning_round: { scoringWeight: 0.3 }
  };

  const expectedScore = calculateExpectedScore(currentRating, opponentRating);

  let actualScore;
  if (outcome === 'win') actualScore = 1;
  else if (outcome === 'loss') actualScore = 0;
  else actualScore = 0.5;

  const kFactor = getKFactor(isProvisional, debateCount);
  const baseELO = Math.round(kFactor * (actualScore - expectedScore));
  const qualityMultiplier = calculateQualityMultiplier(upvoteRatio, wordCount, hasAICitations);
  const formatMultiplier = DEBATE_FORMATS[debateFormat].scoringWeight;

  let qualityBonus;
  if (baseELO >= 0) {
    // Win: quality multiplier adds to gain
    qualityBonus = Math.round(baseELO * (qualityMultiplier - 1));
  } else {
    // Loss: quality multiplier reduces the loss magnitude
    qualityBonus = Math.round(Math.abs(baseELO) * (qualityMultiplier - 0.8));
  }

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

function createInitialRecord() {
  return {
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
  };
}

function updateWinLossRecord(currentRecord, outcome, category) {
  const updated = JSON.parse(JSON.stringify(currentRecord));

  if (outcome === 'win') updated.total_wins++;
  else if (outcome === 'loss') updated.total_losses++;
  else updated.total_draws++;

  // Map outcome to plural key name
  const keyMap = { win: 'wins', loss: 'losses', draw: 'draws' };
  updated.by_category[category][keyMap[outcome]]++;

  const total = updated.total_wins + updated.total_losses + updated.total_draws;
  updated.win_rate = total > 0 ? updated.total_wins / total : 0.5;

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
    updated.streak.current = 0;
    updated.streak.direction = 'neutral';
  }

  return updated;
}

// ============================================
// TEST UTILITIES
// ============================================

let testCount = 0;
let passCount = 0;

function runTest(name, testFn) {
  testCount++;
  try {
    testFn();
    console.log(`✓ ${name}`);
    passCount++;
  } catch (error) {
    console.error(`✗ ${name}`);
    console.error(`  Error: ${error.message}`);
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function assertClose(actual, expected, tolerance = 0.01, message = '') {
  const diff = Math.abs(actual - expected);
  if (diff > tolerance) {
    throw new Error(`Expected ${expected} ± ${tolerance}, got ${actual}. ${message}`);
  }
}

// ============================================
// TESTS
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

console.log('\n=== QUALITY MULTIPLIER ===\n');

runTest('Poor argument should be ~0.89', () => {
  // upvoteRatio=0.3: bonus = (0.3-0.5)*0.3 = -0.06
  // wordCount=150: bonus = -0.05
  // total = 1.0 - 0.06 - 0.05 = 0.89
  const multiplier = calculateQualityMultiplier(0.3, 150, false);
  assertClose(multiplier, 0.89, 0.05);
});

runTest('Average argument should be ~1.0', () => {
  const multiplier = calculateQualityMultiplier(0.5, 400, false);
  assertClose(multiplier, 1.0, 0.05);
});

runTest('Excellent argument should be ~1.2', () => {
  const multiplier = calculateQualityMultiplier(0.9, 1000, false);
  assertClose(multiplier, 1.2, 0.05);
});

console.log('\n=== DELO RATING CALCULATION ===\n');

runTest('Win against equal opponent should give ~+18 points (standard)', () => {
  const input = {
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
  const input = {
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
  const input = {
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
  const poorLoss = {
    currentRating: 1500,
    opponentRating: 1500,
    outcome: 'loss',
    upvoteRatio: 0.2,
    wordCount: 150,
    hasAICitations: false,
    debateFormat: 'standard',
    isProvisional: false,
    debateCount: 50
  };

  const excellentLoss = {
    currentRating: 1500,
    opponentRating: 1500,
    outcome: 'loss',
    upvoteRatio: 0.9,
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
    'Excellent loss should lose fewer points'
  );
});

runTest('Quick match should affect rating less than standard debate', () => {
  const quickResult = calculateDeLORating({
    currentRating: 1500,
    opponentRating: 1500,
    outcome: 'win',
    upvoteRatio: 0.5,
    wordCount: 400,
    hasAICitations: false,
    debateFormat: 'quick_match',
    isProvisional: false,
    debateCount: 50
  });

  const standardResult = calculateDeLORating({
    currentRating: 1500,
    opponentRating: 1500,
    outcome: 'win',
    upvoteRatio: 0.5,
    wordCount: 400,
    hasAICitations: false,
    debateFormat: 'standard',
    isProvisional: false,
    debateCount: 50
  });

  assert(
    Math.abs(quickResult.ratingChange) < Math.abs(standardResult.ratingChange),
    'Quick match should have lower rating impact'
  );
});

runTest('Provisional rating should be more volatile', () => {
  const provisionalResult = calculateDeLORating({
    currentRating: 1500,
    opponentRating: 1500,
    outcome: 'win',
    upvoteRatio: 0.5,
    wordCount: 400,
    hasAICitations: false,
    debateFormat: 'standard',
    isProvisional: true,
    debateCount: 5
  });

  const stabilizedResult = calculateDeLORating({
    currentRating: 1500,
    opponentRating: 1500,
    outcome: 'win',
    upvoteRatio: 0.5,
    wordCount: 400,
    hasAICitations: false,
    debateFormat: 'standard',
    isProvisional: false,
    debateCount: 50
  });

  assert(
    Math.abs(provisionalResult.ratingChange) > Math.abs(stabilizedResult.ratingChange),
    'Provisional rating should be more volatile'
  );
});

console.log('\n=== WIN/LOSS RECORD MANAGEMENT ===\n');

runTest('New record should be initialized correctly', () => {
  const initial = createInitialRecord();
  assert(initial.total_wins === 0);
  assert(initial.total_losses === 0);
  assert(initial.win_rate === 0.5);
  assert(initial.streak.current === 0);
});

runTest('Recording a win should update totals and streak', () => {
  let record = createInitialRecord();
  record = updateWinLossRecord(record, 'win', 'ethics');

  assert(record.total_wins === 1, `Expected total_wins=1, got ${record.total_wins}`);
  assert(record.win_rate === 1.0, `Expected win_rate=1.0, got ${record.win_rate}`);
  assert(record.streak.current === 1, `Expected streak.current=1, got ${record.streak.current}`);
  assert(record.by_category.ethics.wins === 1, `Expected ethics.wins=1, got ${record.by_category.ethics.wins}`);
});

runTest('Win streak should accumulate', () => {
  let record = createInitialRecord();
  record = updateWinLossRecord(record, 'win', 'ethics');
  record = updateWinLossRecord(record, 'win', 'logic');
  record = updateWinLossRecord(record, 'win', 'metaphysics');

  assert(record.total_wins === 3);
  assert(record.streak.current === 3);
  assert(record.streak.longest === 3);
});

runTest('Loss should break win streak', () => {
  let record = createInitialRecord();
  record = updateWinLossRecord(record, 'win', 'ethics');
  record = updateWinLossRecord(record, 'win', 'ethics');
  record = updateWinLossRecord(record, 'loss', 'ethics');

  assert(record.total_wins === 2);
  assert(record.total_losses === 1);
  assert(record.streak.current === 1);
  assert(record.streak.direction === 'loss');
  assert(record.streak.longest === 2);
});

runTest('Category tracking should work correctly', () => {
  let record = createInitialRecord();
  record = updateWinLossRecord(record, 'win', 'ethics');    // ethics: 1W
  record = updateWinLossRecord(record, 'win', 'logic');     // logic: 1W
  record = updateWinLossRecord(record, 'win', 'ethics');    // ethics: 2W
  record = updateWinLossRecord(record, 'loss', 'ethics');   // ethics: 2W, 1L

  assert(record.by_category.ethics.wins === 2, `Expected ethics.wins=2, got ${record.by_category.ethics.wins}`);
  assert(record.by_category.ethics.losses === 1, `Expected ethics.losses=1, got ${record.by_category.ethics.losses}`);
  assert(record.by_category.logic.wins === 1, `Expected logic.wins=1, got ${record.by_category.logic.wins}`);
});

// ============================================
// SUMMARY
// ============================================

console.log('\n' + '='.repeat(50));
console.log(`✓ ${passCount}/${testCount} tests passed`);
console.log('='.repeat(50) + '\n');

if (passCount === testCount) {
  process.exit(0);
} else {
  process.exit(1);
}
