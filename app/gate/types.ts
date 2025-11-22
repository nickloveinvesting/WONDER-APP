// Type definitions for the WONDER Gate System

export type PhilosophicalSymbol = 
  | 'infinity'    // ∞
  | 'phi'        // φ
  | 'delta'      // Δ
  | 'theta'      // θ
  | 'lambda'     // λ
  | 'sigma'      // Σ
  | 'omega'      // Ω
  | 'psi';       // ψ

export type ShadowShape = 'circle' | 'square' | 'triangle';

export type PhilosophicalArchetype = 
  | 'seeker'      // Questions everything
  | 'builder'     // Constructs frameworks
  | 'skeptic'     // Challenges assumptions
  | 'visionary'   // Sees connections
  | 'analyst';    // Deep examination

export interface PuzzleOneState {
  completed: boolean;
  selectedSymbol: PhilosophicalSymbol | null;
  timeSpent: number;
  hesitated: boolean;
  startTime: number;
}

export interface PuzzleTwoState {
  completed: boolean;
  shadowMatches: ShadowShape[];
  rotations: number;
  timeSpent: number;
  startTime: number;
}

export interface PuzzleThreeState {
  completed: boolean;
  alignment: number;
  attempts: number;
  timeSpent: number;
  rings: RingState[];
  startTime: number;
}

export interface RingState {
  id: string;
  rotation: number;
  symbol: string;
  locked: boolean;
}

export interface GateMetrics {
  startTime: number;
  completionTimes: number[];
  totalHints: number;
  totalRotations: number;
  totalHesitations: number;
  puzzleAttempts: number[];
}

export interface GateSubmission {
  score: number;
  archetype: PhilosophicalArchetype;
  metrics: GateMetrics;
  puzzleStates: {
    puzzle1: PuzzleOneState;
    puzzle2: PuzzleTwoState;
    puzzle3: PuzzleThreeState;
  };
  admitted: boolean;
  completedAt: Date;
}

export interface ShadowProjection {
  points: Array<{ x: number; y: number; z: number }>;
  shape: ShadowShape | null;
  confidence: number;
}

export interface AnimationConfig {
  duration: number;
  ease: string;
  delay?: number;
  repeat?: number;
}
