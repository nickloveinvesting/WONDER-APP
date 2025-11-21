/**
 * WONDER Fake User Interaction Scripts
 *
 * Automated behavior simulation for 10 realistic philosophy enthusiasts.
 * These scripts can be run via cron jobs or triggered by events to simulate
 * natural platform activity.
 */

const profiles = require('./profiles.json');

// =====================================================
// USER BEHAVIOR SIMULATION ENGINE
// =====================================================

/**
 * Determines if a user should be active based on their timezone and habits
 */
function isUserActive(user, currentTime = new Date()) {
  const { timezone, hours } = user.interaction_patterns.active_times;

  // Convert current time to user's timezone
  const userTime = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(currentTime);

  const [currentHour] = userTime.split(':').map(Number);

  // Check if current hour falls within any active time range
  return hours.some(range => {
    const [start, end] = range.split('-').map(t => parseInt(t.split(':')[0]));
    if (end < start) {
      // Handles overnight ranges like "22:00-02:00"
      return currentHour >= start || currentHour < end;
    }
    return currentHour >= start && currentHour < end;
  });
}

/**
 * Simulates daily activity for a user
 */
async function simulateUserActivity(supabase, userId, userProfile) {
  const actions = [];

  // 1. Check and respond to daily question (if user is a participant)
  if (userProfile.interaction_patterns.discussion_participant) {
    const dailyCheck = Math.random();
    if (dailyCheck < userProfile.interaction_patterns.response_likelihood * 0.7) {
      actions.push({
        type: 'daily_question_response',
        userId,
        timestamp: new Date()
      });
    }
  }

  // 2. Browse and snap/zap arguments
  const snapCheck = Math.random();
  if (snapCheck < userProfile.interaction_patterns.snap_tendency) {
    actions.push({
      type: 'snap_argument',
      userId,
      count: Math.floor(Math.random() * 3) + 1
    });
  }

  const zapCheck = Math.random();
  if (zapCheck < userProfile.interaction_patterns.zap_tendency) {
    actions.push({
      type: 'zap_argument',
      userId,
      count: Math.floor(Math.random() * 2) + 1
    });
  }

  // 3. Initiate or join debates
  const debateCheck = Math.random();
  if (debateCheck < userProfile.interaction_patterns.debate_initiator_likelihood) {
    actions.push({
      type: 'initiate_debate',
      userId,
      topic: selectTopicForUser(userProfile)
    });
  }

  return actions;
}

/**
 * Selects a debate topic matching user's interests
 */
function selectTopicForUser(userProfile) {
  const topics = {
    phenomenology: [
      'Can AI ever have genuine phenomenal consciousness?',
      'Is perception an active construction or passive reception?',
      'Does embodiment fundamentally change the nature of experience?'
    ],
    ethics: [
      'Should algorithmic decisions be held to higher moral standards than human decisions?',
      'Is there a universal basis for human rights?',
      'Can moral knowledge exist without moral facts?'
    ],
    existentialism: [
      'Is authenticity achievable in a social media age?',
      'Does confronting mortality give life more meaning?',
      'Can we be held responsible for choices we didn\'t consciously make?'
    ],
    philosophy_of_science: [
      'Do scientific theories describe reality or just predict observations?',
      'Is scientific progress cumulative or revolutionary?',
      'Can social sciences achieve the objectivity of natural sciences?'
    ],
    political_philosophy: [
      'Should democracies protect unpopular speech?',
      'Is economic inequality ever justified?',
      'Do we have moral obligations to future generations?'
    ],
    stoicism: [
      'Is Stoic acceptance compatible with social activism?',
      'Can ancient wisdom apply to modern psychological challenges?',
      'Is the dichotomy of control too simplistic?'
    ],
    african_philosophy: [
      'How does Ubuntu challenge Western individualism?',
      'Should philosophy curricula be decolonized?',
      'Can communitarian ethics work in modern societies?'
    ],
    aesthetics: [
      'Can beauty be objectively measured?',
      'Is conceptual art still art?',
      'What role should intention play in interpreting art?'
    ]
  };

  // Match user's expertise to relevant topics
  const relevantAreas = [
    ...userProfile.database_profile.expertise_areas,
    ...userProfile.database_profile.learning_interests
  ].filter(area => topics[area]);

  if (relevantAreas.length === 0) {
    // Default to ethics for beginners
    relevantAreas.push('ethics');
  }

  const selectedArea = relevantAreas[Math.floor(Math.random() * relevantAreas.length)];
  const areaTopics = topics[selectedArea] || topics.ethics;

  return areaTopics[Math.floor(Math.random() * areaTopics.length)];
}

/**
 * Generates an argument in the user's voice
 */
function generateArgument(userProfile, topic, position) {
  const { writing_style, philosophical_profile } = userProfile;

  // Base structure varies by debate style
  const structures = {
    socratic: (topic) => ({
      opening: pickRandom([
        'Let me approach this by first asking:',
        'Before we can answer this, we need to consider:',
        'The question itself contains assumptions worth examining:'
      ]),
      body_approach: 'questioning',
      closing: 'What do we think about this framing?'
    }),
    analytical: (topic) => ({
      opening: pickRandom([
        'Let me break this down:',
        'The argument has several components:',
        'We need to distinguish between:'
      ]),
      body_approach: 'structured',
      closing: 'This leads us to conclude...'
    }),
    empathetic_probing: (topic) => ({
      opening: pickRandom([
        'I\'m curious about something here:',
        'What I notice in this question is:',
        'There\'s something important we might be missing:'
      ]),
      body_approach: 'exploratory',
      closing: 'I wonder if others have experienced this differently?'
    }),
    exploratory_literary: (topic) => ({
      opening: pickRandom([
        'What strikes me about this question is',
        'There\'s a particular quality to this problem:',
        'I keep returning to the image of'
      ]),
      body_approach: 'metaphorical',
      closing: 'Perhaps the question itself is what matters.'
    }),
    systematic_analytical: (topic) => ({
      opening: pickRandom([
        'Think of it like this—',
        'The edge case here is',
        'If we steelman the opposing view:'
      ]),
      body_approach: 'logical',
      closing: 'So the logical conclusion is...'
    }),
    practical_questioner: (topic) => ({
      opening: pickRandom([
        'From a practical standpoint,',
        'How would this work in real life?',
        'My understanding is'
      ]),
      body_approach: 'applied',
      closing: 'So what do we actually do with this?'
    }),
    enthusiastic_challenger: (topic) => ({
      opening: pickRandom([
        'Okay but like,',
        'Hear me out—',
        'This might sound dumb but'
      ]),
      body_approach: 'questioning',
      closing: 'Am I missing something here?'
    }),
    methodical_questioner: (topic) => ({
      opening: pickRandom([
        'Let me make sure I understand:',
        'Forgive my ignorance, but',
        'Here\'s where I get confused:'
      ]),
      body_approach: 'clarifying',
      closing: 'That raises another question for me.'
    })
  };

  const style = philosophical_profile.debate_style;
  const structure = structures[style] || structures.analytical;

  return {
    structure: structure(topic),
    vocabulary_level: writing_style.vocabulary_level,
    target_length: userProfile.interaction_patterns.argument_length_preference,
    phrases_to_include: pickRandom(writing_style.favorite_phrases, 2),
    typos_to_add: writing_style.common_typos.length > 0
      ? pickRandom(writing_style.common_typos, 1)
      : []
  };
}

/**
 * Utility: Pick random items from array
 */
function pickRandom(arr, count = 1) {
  if (count === 1) return arr[Math.floor(Math.random() * arr.length)];

  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// =====================================================
// SCHEDULED ACTIVITY PATTERNS
// =====================================================

/**
 * Morning routine simulation (6-9 AM local time)
 */
async function morningRoutine(supabase, users) {
  const morningUsers = users.filter(u => isUserActive(u));

  for (const user of morningUsers) {
    // Morning users typically check daily question first
    if (user.category === 'academic' || user.user_id === 'priya_patel') {
      console.log(`[Morning] ${user.database_profile.username} checking daily question`);
      // Simulate: Check daily prompt, maybe respond
    }

    // Brief scroll through recent activity
    console.log(`[Morning] ${user.database_profile.username} browsing recent debates`);
  }
}

/**
 * Midday activity simulation (11 AM - 2 PM local time)
 */
async function middayActivity(supabase, users) {
  const middayUsers = users.filter(u => isUserActive(u));

  for (const user of middayUsers) {
    // Lunch break philosophers
    if (Math.random() < user.interaction_patterns.response_likelihood * 0.5) {
      console.log(`[Midday] ${user.database_profile.username} responding to ongoing debate`);
    }

    // Quick snaps during breaks
    if (Math.random() < user.interaction_patterns.snap_tendency) {
      console.log(`[Midday] ${user.database_profile.username} snapping arguments`);
    }
  }
}

/**
 * Evening engagement simulation (7-11 PM local time)
 */
async function eveningEngagement(supabase, users) {
  const eveningUsers = users.filter(u => isUserActive(u));

  for (const user of eveningUsers) {
    // Evening is prime debate time
    if (Math.random() < user.interaction_patterns.debate_initiator_likelihood) {
      const topic = selectTopicForUser(user);
      console.log(`[Evening] ${user.database_profile.username} initiating debate: "${topic}"`);
    }

    // Longer, more thoughtful responses in evening
    if (Math.random() < user.interaction_patterns.response_likelihood) {
      console.log(`[Evening] ${user.database_profile.username} writing detailed argument`);
    }

    // Social interactions
    console.log(`[Evening] ${user.database_profile.username} engaging with community`);
  }
}

/**
 * Late night activity (11 PM - 2 AM for night owls)
 */
async function lateNightActivity(supabase, users) {
  // Specific users active late
  const nightOwls = ['alex_kim', 'jordan_miller', 'marcus_rodriguez', 'emma_thompson'];
  const activeNightOwls = users.filter(u => nightOwls.includes(u.user_id) && isUserActive(u));

  for (const user of activeNightOwls) {
    // Late night deep dives
    console.log(`[Late Night] ${user.database_profile.username} in extended discussion`);
  }
}

// =====================================================
// USER-SPECIFIC BEHAVIOR PATTERNS
// =====================================================

const userBehaviors = {
  sarah_chen_mit: {
    triggers: ['consciousness', 'AI', 'experience', 'embodied', 'phenomenology'],
    response_style: 'detailed_academic',
    typical_length: 400,
    citation_likelihood: 0.8,
    snap_criteria: 'intellectual_depth',
    zap_criteria: 'category_error'
  },

  marcus_ethics: {
    triggers: ['ethics', 'fairness', 'technology', 'justice', 'algorithm'],
    response_style: 'passionate_analytical',
    typical_length: 250,
    citation_likelihood: 0.6,
    snap_criteria: 'real_world_impact',
    zap_criteria: 'ivory_tower_abstraction'
  },

  prof_wright: {
    triggers: ['science', 'evidence', 'theory', 'knowledge', 'truth'],
    response_style: 'measured_scholarly',
    typical_length: 500,
    citation_likelihood: 0.9,
    snap_criteria: 'careful_distinction',
    zap_criteria: 'hasty_generalization'
  },

  logicgate_alex: {
    triggers: ['consciousness', 'mind', 'computation', 'logic', 'emergence'],
    response_style: 'systematic_programmer',
    typical_length: 280,
    citation_likelihood: 0.4,
    snap_criteria: 'clear_logic',
    zap_criteria: 'vague_handwaving'
  },

  presence_rachel: {
    triggers: ['meaning', 'death', 'authenticity', 'anxiety', 'existence'],
    response_style: 'empathetic_exploratory',
    typical_length: 350,
    citation_likelihood: 0.5,
    snap_criteria: 'emotional_honesty',
    zap_criteria: 'intellectual_arrogance'
  },

  socratic_david: {
    triggers: ['education', 'community', 'ubuntu', 'justice', 'accessibility'],
    response_style: 'accessible_socratic',
    typical_length: 200,
    citation_likelihood: 0.3,
    snap_criteria: 'accessibility',
    zap_criteria: 'elitism'
  },

  emma_writes: {
    triggers: ['narrative', 'time', 'memory', 'beauty', 'story'],
    response_style: 'literary_exploratory',
    typical_length: 420,
    citation_likelihood: 0.4,
    snap_criteria: 'beauty_insight',
    zap_criteria: 'reductive_argument'
  },

  philosophyjordan: {
    triggers: ['trolley', 'free_will', 'meaning', 'ethics', 'existence'],
    response_style: 'enthusiastic_questioning',
    typical_length: 130,
    citation_likelihood: 0.1,
    snap_criteria: 'clear_explanation',
    zap_criteria: 'condescension'
  },

  priya_thinks: {
    triggers: ['stoicism', 'practical', 'happiness', 'control', 'work'],
    response_style: 'practical_application',
    typical_length: 160,
    citation_likelihood: 0.2,
    snap_criteria: 'practical_wisdom',
    zap_criteria: 'impractical_theory'
  },

  tom_wonders: {
    triggers: ['meaning', 'death', 'purpose', 'life', 'experience'],
    response_style: 'methodical_curious',
    typical_length: 180,
    citation_likelihood: 0.2,
    snap_criteria: 'patient_explanation',
    zap_criteria: 'dismissive_response'
  }
};

// =====================================================
// EXPORTS
// =====================================================

module.exports = {
  isUserActive,
  simulateUserActivity,
  selectTopicForUser,
  generateArgument,
  morningRoutine,
  middayActivity,
  eveningEngagement,
  lateNightActivity,
  userBehaviors,
  profiles: profiles.users
};
