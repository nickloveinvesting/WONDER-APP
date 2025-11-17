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
          expertise_areas: string[]
          learning_interests: string[]
          conversations_participated: number
          total_messages: number
          influence_score: number
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
          expertise_areas?: string[]
          learning_interests?: string[]
          conversations_participated?: number
          total_messages?: number
          influence_score?: number
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
          expertise_areas?: string[]
          learning_interests?: string[]
          conversations_participated?: number
          total_messages?: number
          influence_score?: number
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
          conversation_type: 'open_discussion' | 'socratic_dialogue' | 'reading_group' | 'question_exploration'
          tags: string[]
          goals: string | null
          featured: boolean
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
          conversation_type?: 'open_discussion' | 'socratic_dialogue' | 'reading_group' | 'question_exploration'
          tags?: string[]
          goals?: string | null
          featured?: boolean
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
          conversation_type?: 'open_discussion' | 'socratic_dialogue' | 'reading_group' | 'question_exploration'
          tags?: string[]
          goals?: string | null
          featured?: boolean
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
          perspective_type: 'supporting' | 'questioning' | 'alternative' | 'synthesis' | null
          resource_links: string[]
          parent_message_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          debate_id: string
          user_id: string
          position: 'for' | 'against'
          content: string
          round?: number
          perspective_type?: 'supporting' | 'questioning' | 'alternative' | 'synthesis' | null
          resource_links?: string[]
          parent_message_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          debate_id?: string
          user_id?: string
          position?: 'for' | 'against'
          content?: string
          round?: number
          perspective_type?: 'supporting' | 'questioning' | 'alternative' | 'synthesis' | null
          resource_links?: string[]
          parent_message_id?: string | null
          created_at?: string
        }
      }
      conversation_participants: {
        Row: {
          id: string
          conversation_id: string
          user_id: string
          joined_at: string
          last_contributed_at: string | null
          message_count: number
        }
        Insert: {
          id?: string
          conversation_id: string
          user_id: string
          joined_at?: string
          last_contributed_at?: string | null
          message_count?: number
        }
        Update: {
          id?: string
          conversation_id?: string
          user_id?: string
          joined_at?: string
          last_contributed_at?: string | null
          message_count?: number
        }
      }
      message_feedback: {
        Row: {
          id: string
          message_id: string
          user_id: string
          feedback_type: 'insightful' | 'well_reasoned' | 'changed_view' | 'needs_citation' | 'helpful'
          created_at: string
        }
        Insert: {
          id?: string
          message_id: string
          user_id: string
          feedback_type: 'insightful' | 'well_reasoned' | 'changed_view' | 'needs_citation' | 'helpful'
          created_at?: string
        }
        Update: {
          id?: string
          message_id?: string
          user_id?: string
          feedback_type?: 'insightful' | 'well_reasoned' | 'changed_view' | 'needs_citation' | 'helpful'
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
