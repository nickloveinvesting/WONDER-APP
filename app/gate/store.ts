import { create } from 'zustand';
import { 
  PuzzleOneState, 
  PuzzleTwoState, 
  PuzzleThreeState,
  GateMetrics,
  PhilosophicalArchetype,
  PhilosophicalSymbol,
  ShadowShape
} from './types';

interface GateStore {
  // Current state
  currentPuzzle: 1 | 2 | 3;
  puzzleStates: {
    puzzle1: PuzzleOneState;
    puzzle2: PuzzleTwoState;
    puzzle3: PuzzleThreeState;
  };
  
  // Metrics
  metrics: GateMetrics;
  
  // User data
  userData: {
    score: number;
    archetype: PhilosophicalArchetype | null;
  };
  
  // Dev mode
  devMode: boolean;
  
  // Actions
  nextPuzzle: () => void;
  skipPuzzle: () => void;
  setPuzzle: (puzzle: 1 | 2 | 3) => void;
  
  // Puzzle 1 actions
  completePuzzleOne: (symbol: PhilosophicalSymbol, hesitated: boolean) => void;
  
  // Puzzle 2 actions
  recordRotation: () => void;
  addShadowMatch: (shape: ShadowShape) => void;
  completePuzzleTwo: () => void;
  
  // Puzzle 3 actions
  updateAlignment: (alignment: number) => void;
  incrementAttempts: () => void;
  completePuzzleThree: () => void;
  
  // Metrics
  recordMetric: (metric: keyof GateMetrics, value: any) => void;
  
  // Final scoring
  calculateFinalScore: () => number;
  submitToBackend: () => Promise<void>;
  
  // Dev tools
  toggleDevMode: () => void;
  autoComplete: () => void;
}

export const useGateStore = create<GateStore>((set, get) => ({
  currentPuzzle: 1,
  devMode: typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('dev'),
  
  puzzleStates: {
    puzzle1: {
      completed: false,
      selectedSymbol: null,
      timeSpent: 0,
      hesitated: false,
      startTime: Date.now()
    },
    puzzle2: {
      completed: false,
      shadowMatches: [],
      rotations: 0,
      timeSpent: 0,
      startTime: Date.now()
    },
    puzzle3: {
      completed: false,
      alignment: 0,
      attempts: 0,
      timeSpent: 0,
      rings: [
        { id: 'ring1', rotation: 0, symbol: '∞', locked: false },
        { id: 'ring2', rotation: 120, symbol: '∅', locked: false },
        { id: 'ring3', rotation: 240, symbol: '1', locked: false }
      ],
      startTime: Date.now()
    }
  },
  
  metrics: {
    startTime: Date.now(),
    completionTimes: [],
    totalHints: 0,
    totalRotations: 0,
    totalHesitations: 0,
    puzzleAttempts: [0, 0, 0]
  },
  
  userData: {
    score: 0,
    archetype: null
  },
  
  // Navigation actions
  nextPuzzle: () => {
    const current = get().currentPuzzle;
    if (current < 3) {
      set({ currentPuzzle: (current + 1) as 1 | 2 | 3 });
      
      // Reset start time for new puzzle
      const puzzleKey = `puzzle${current + 1}` as 'puzzle1' | 'puzzle2' | 'puzzle3';
      set(state => ({
        puzzleStates: {
          ...state.puzzleStates,
          [puzzleKey]: {
            ...state.puzzleStates[puzzleKey],
            startTime: Date.now()
          }
        }
      }));
    } else {
      // Complete gate
      get().submitToBackend();
    }
  },
  
  skipPuzzle: () => {
    const current = get().currentPuzzle;
    const puzzleKey = `puzzle${current}` as 'puzzle1' | 'puzzle2' | 'puzzle3';
    
    // Mark as completed
    set(state => ({
      puzzleStates: {
        ...state.puzzleStates,
        [puzzleKey]: {
          ...state.puzzleStates[puzzleKey],
          completed: true,
          timeSpent: Date.now() - state.puzzleStates[puzzleKey].startTime
        }
      }
    }));
    
    get().nextPuzzle();
  },
  
  setPuzzle: (puzzle: 1 | 2 | 3) => {
    set({ currentPuzzle: puzzle });
  },
  
  // Puzzle 1 actions
  completePuzzleOne: (symbol: PhilosophicalSymbol, hesitated: boolean) => {
    const timeSpent = Date.now() - get().puzzleStates.puzzle1.startTime;
    
    set(state => ({
      puzzleStates: {
        ...state.puzzleStates,
        puzzle1: {
          completed: true,
          selectedSymbol: symbol,
          timeSpent,
          hesitated,
          startTime: state.puzzleStates.puzzle1.startTime
        }
      },
      metrics: {
        ...state.metrics,
        completionTimes: [...state.metrics.completionTimes, timeSpent],
        totalHesitations: state.metrics.totalHesitations + (hesitated ? 1 : 0)
      }
    }));
    
    // Auto-advance after success animation
    setTimeout(() => get().nextPuzzle(), 2000);
  },
  
  // Puzzle 2 actions
  recordRotation: () => {
    set(state => ({
      puzzleStates: {
        ...state.puzzleStates,
        puzzle2: {
          ...state.puzzleStates.puzzle2,
          rotations: state.puzzleStates.puzzle2.rotations + 1
        }
      },
      metrics: {
        ...state.metrics,
        totalRotations: state.metrics.totalRotations + 1
      }
    }));
  },
  
  addShadowMatch: (shape: ShadowShape) => {
    set(state => ({
      puzzleStates: {
        ...state.puzzleStates,
        puzzle2: {
          ...state.puzzleStates.puzzle2,
          shadowMatches: [...state.puzzleStates.puzzle2.shadowMatches, shape]
        }
      }
    }));
  },
  
  completePuzzleTwo: () => {
    const timeSpent = Date.now() - get().puzzleStates.puzzle2.startTime;
    
    set(state => ({
      puzzleStates: {
        ...state.puzzleStates,
        puzzle2: {
          ...state.puzzleStates.puzzle2,
          completed: true,
          timeSpent
        }
      },
      metrics: {
        ...state.metrics,
        completionTimes: [...state.metrics.completionTimes, timeSpent]
      }
    }));
    
    setTimeout(() => get().nextPuzzle(), 2000);
  },
  
  // Puzzle 3 actions
  updateAlignment: (alignment: number) => {
    set(state => ({
      puzzleStates: {
        ...state.puzzleStates,
        puzzle3: {
          ...state.puzzleStates.puzzle3,
          alignment
        }
      }
    }));
  },
  
  incrementAttempts: () => {
    set(state => ({
      puzzleStates: {
        ...state.puzzleStates,
        puzzle3: {
          ...state.puzzleStates.puzzle3,
          attempts: state.puzzleStates.puzzle3.attempts + 1
        }
      }
    }));
  },
  
  completePuzzleThree: () => {
    const timeSpent = Date.now() - get().puzzleStates.puzzle3.startTime;
    
    set(state => ({
      puzzleStates: {
        ...state.puzzleStates,
        puzzle3: {
          ...state.puzzleStates.puzzle3,
          completed: true,
          timeSpent
        }
      },
      metrics: {
        ...state.metrics,
        completionTimes: [...state.metrics.completionTimes, timeSpent]
      }
    }));
  },
  
  // Metrics
  recordMetric: (metric: keyof GateMetrics, value: any) => {
    set(state => ({
      metrics: {
        ...state.metrics,
        [metric]: value
      }
    }));
  },
  
  // Scoring algorithm
  calculateFinalScore: () => {
    const { metrics, puzzleStates } = get();
    let score = 60; // Base score
    
    // Puzzle 1: Penalize overthinking (reward quick decisions)
    if (!puzzleStates.puzzle1.hesitated) {
      score += 10;
    }
    
    // Puzzle 2: Reward exploration (not too little, not too much)
    const rotations = puzzleStates.puzzle2.rotations;
    if (rotations > 5 && rotations < 20) {
      score += 15;
    } else if (rotations >= 20) {
      score += 5; // Some credit for exploration
    }
    
    // Puzzle 3: Reward insight speed
    const attempts = puzzleStates.puzzle3.attempts;
    if (attempts < 3) {
      score += 15;
    } else if (attempts < 5) {
      score += 10;
    } else if (attempts < 10) {
      score += 5;
    }
    
    return Math.min(100, Math.max(0, score));
  },
  
  // Submit to backend
  submitToBackend: async () => {
    const score = get().calculateFinalScore();
    const { puzzleStates, metrics } = get();
    
    try {
      const response = await fetch('/api/gate/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          score,
          metrics,
          puzzleStates
        })
      });
      
      const data = await response.json();
      
      set({
        userData: {
          score: data.score,
          archetype: data.archetype
        }
      });
      
      // Redirect to success page
      if (typeof window !== 'undefined') {
        window.location.href = data.admitted ? '/gate/success' : '/gate/submitted';
      }
    } catch (error) {
      console.error('Failed to submit gate results:', error);
    }
  },
  
  // Dev mode
  toggleDevMode: () => {
    set(state => ({ devMode: !state.devMode }));
  },
  
  autoComplete: () => {
    const currentPuzzle = get().currentPuzzle;
    
    if (currentPuzzle === 1) {
      get().completePuzzleOne('infinity', false);
    } else if (currentPuzzle === 2) {
      get().completePuzzleTwo();
    } else if (currentPuzzle === 3) {
      get().completePuzzleThree();
    }
  }
}));
