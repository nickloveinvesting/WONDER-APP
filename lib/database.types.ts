export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          display_name: string | null
          bio: string | null
          reputation_score: number
          debates_won: number
          debates_participated: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          display_name?: string | null
          bio?: string | null
          reputation_score?: number
          debates_won?: number
          debates_participated?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          display_name?: string | null
          bio?: string | null
          reputation_score?: number
          debates_won?: number
          debates_participated?: number
          created_at?: string
          updated_at?: string
        }
      }
      debates: {
        Row: {
          id: string
          topic: string
          description: string | null
          status: 'open' | 'in_progress' | 'completed'
          created_by: string
          for_participant: string | null
          against_participant: string | null
          winner_id: string | null
          created_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          topic: string
          description?: string | null
          status?: 'open' | 'in_progress' | 'completed'
          created_by: string
          for_participant?: string | null
          against_participant?: string | null
          winner_id?: string | null
          created_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          topic?: string
          description?: string | null
          status?: 'open' | 'in_progress' | 'completed'
          created_by?: string
          for_participant?: string | null
          against_participant?: string | null
          winner_id?: string | null
          created_at?: string
          completed_at?: string | null
        }
      }
      arguments: {
        Row: {
          id: string
          debate_id: string
          user_id: string
          position: 'for' | 'against'
          content: string
          round: number
          created_at: string
        }
        Insert: {
          id?: string
          debate_id: string
          user_id: string
          position: 'for' | 'against'
          content: string
          round?: number
          created_at?: string
        }
        Update: {
          id?: string
          debate_id?: string
          user_id?: string
          position?: 'for' | 'against'
          content?: string
          round?: number
          created_at?: string
        }
      }
      judgments: {
        Row: {
          id: string
          debate_id: string
          winner_position: 'for' | 'against' | 'tie'
          reasoning: string
          fact_checks: Json
          scores: Json
          created_at: string
        }
        Insert: {
          id?: string
          debate_id: string
          winner_position: 'for' | 'against' | 'tie'
          reasoning: string
          fact_checks: Json
          scores: Json
          created_at?: string
        }
        Update: {
          id?: string
          debate_id?: string
          winner_position?: 'for' | 'against' | 'tie'
          reasoning?: string
          fact_checks?: Json
          scores?: Json
          created_at?: string
        }
      }
    }
  }
}
