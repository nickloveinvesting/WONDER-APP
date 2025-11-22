export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      admin_logs: {
        Row: {
          action: string
          admin_email: string
          created_at: string | null
          details: Json | null
          id: string
          ip_address: string | null
          target_id: string | null
          target_type: string | null
          user_agent: string | null
        }
        Insert: {
          action: string
          admin_email: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: string | null
          target_id?: string | null
          target_type?: string | null
          user_agent?: string | null
        }
        Update: {
          action?: string
          admin_email?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: string | null
          target_id?: string | null
          target_type?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      announcements: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          message: string
          sent_by: string
          sent_via_email: boolean | null
          target_audience: string
          title: string
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          message: string
          sent_by: string
          sent_via_email?: boolean | null
          target_audience?: string
          title: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          message?: string
          sent_by?: string
          sent_via_email?: boolean | null
          target_audience?: string
          title?: string
        }
        Relationships: []
      }
      argument_citations: {
        Row: {
          cited_argument_id: string
          citing_argument_id: string
          created_at: string | null
          id: string
        }
        Insert: {
          cited_argument_id: string
          citing_argument_id: string
          created_at?: string | null
          id?: string
        }
        Update: {
          cited_argument_id?: string
          citing_argument_id?: string
          created_at?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "argument_citations_cited_argument_id_fkey"
            columns: ["cited_argument_id"]
            isOneToOne: false
            referencedRelation: "arguments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "argument_citations_citing_argument_id_fkey"
            columns: ["citing_argument_id"]
            isOneToOne: false
            referencedRelation: "arguments"
            referencedColumns: ["id"]
          },
        ]
      }
      argument_feedback: {
        Row: {
          argument_id: string
          created_at: string | null
          feedback_type: string
          helpful_rating: number | null
          id: string
          reason_text: string | null
          user_id: string
        }
        Insert: {
          argument_id: string
          created_at?: string | null
          feedback_type: string
          helpful_rating?: number | null
          id?: string
          reason_text?: string | null
          user_id: string
        }
        Update: {
          argument_id?: string
          created_at?: string | null
          feedback_type?: string
          helpful_rating?: number | null
          id?: string
          reason_text?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "argument_feedback_argument_id_fkey"
            columns: ["argument_id"]
            isOneToOne: false
            referencedRelation: "arguments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "argument_feedback_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      argument_metrics: {
        Row: {
          action_type: string
          argument_id: string
          created_at: string | null
          duration_seconds: number | null
          id: string
          user_id: string
        }
        Insert: {
          action_type: string
          argument_id: string
          created_at?: string | null
          duration_seconds?: number | null
          id?: string
          user_id: string
        }
        Update: {
          action_type?: string
          argument_id?: string
          created_at?: string | null
          duration_seconds?: number | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "argument_metrics_argument_id_fkey"
            columns: ["argument_id"]
            isOneToOne: false
            referencedRelation: "arguments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "argument_metrics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      argument_votes: {
        Row: {
          argument_id: string
          created_at: string | null
          id: string
          user_id: string
          vote_type: string
        }
        Insert: {
          argument_id: string
          created_at?: string | null
          id?: string
          user_id: string
          vote_type: string
        }
        Update: {
          argument_id?: string
          created_at?: string | null
          id?: string
          user_id?: string
          vote_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "argument_votes_argument_id_fkey"
            columns: ["argument_id"]
            isOneToOne: false
            referencedRelation: "arguments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "argument_votes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      arguments: {
        Row: {
          changed_view_votes: number | null
          character_count: number | null
          citation_count: number | null
          content: string
          created_at: string | null
          days_of_engagement: number | null
          debate_id: string | null
          depth_score: number | null
          downvotes: number | null
          expert_endorsements: number | null
          id: string
          last_engagement_at: string | null
          net_votes: number | null
          parent_message_id: string | null
          perspective_type: string | null
          position: string
          quality_score: number | null
          read_time_count: number | null
          read_time_total: number | null
          resource_links: string[] | null
          round: number | null
          snap_count: number | null
          time_spent_seconds: number | null
          upvote_ratio: number | null
          upvotes: number | null
          user_id: string | null
          word_count: number | null
          zap_count: number | null
        }
        Insert: {
          changed_view_votes?: number | null
          character_count?: number | null
          citation_count?: number | null
          content: string
          created_at?: string | null
          days_of_engagement?: number | null
          debate_id?: string | null
          depth_score?: number | null
          downvotes?: number | null
          expert_endorsements?: number | null
          id?: string
          last_engagement_at?: string | null
          net_votes?: number | null
          parent_message_id?: string | null
          perspective_type?: string | null
          position: string
          quality_score?: number | null
          read_time_count?: number | null
          read_time_total?: number | null
          resource_links?: string[] | null
          round?: number | null
          snap_count?: number | null
          time_spent_seconds?: number | null
          upvote_ratio?: number | null
          upvotes?: number | null
          user_id?: string | null
          word_count?: number | null
          zap_count?: number | null
        }
        Update: {
          changed_view_votes?: number | null
          character_count?: number | null
          citation_count?: number | null
          content?: string
          created_at?: string | null
          days_of_engagement?: number | null
          debate_id?: string | null
          depth_score?: number | null
          downvotes?: number | null
          expert_endorsements?: number | null
          id?: string
          last_engagement_at?: string | null
          net_votes?: number | null
          parent_message_id?: string | null
          perspective_type?: string | null
          position?: string
          quality_score?: number | null
          read_time_count?: number | null
          read_time_total?: number | null
          resource_links?: string[] | null
          round?: number | null
          snap_count?: number | null
          time_spent_seconds?: number | null
          upvote_ratio?: number | null
          upvotes?: number | null
          user_id?: string | null
          word_count?: number | null
          zap_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "arguments_debate_id_fkey"
            columns: ["debate_id"]
            isOneToOne: false
            referencedRelation: "debates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "arguments_debate_id_fkey"
            columns: ["debate_id"]
            isOneToOne: false
            referencedRelation: "hot_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "arguments_parent_message_id_fkey"
            columns: ["parent_message_id"]
            isOneToOne: false
            referencedRelation: "arguments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "arguments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      comment_votes: {
        Row: {
          comment_id: string | null
          created_at: string | null
          id: string
          user_id: string | null
          vote_type: string | null
        }
        Insert: {
          comment_id?: string | null
          created_at?: string | null
          id?: string
          user_id?: string | null
          vote_type?: string | null
        }
        Update: {
          comment_id?: string | null
          created_at?: string | null
          id?: string
          user_id?: string | null
          vote_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comment_votes_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "discussion_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_votes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      community_guidelines: {
        Row: {
          created_at: string | null
          enforcement_notes: string | null
          examples: string[] | null
          exceptions: string[] | null
          id: string
          rule_key: string
          rule_text: string
          updated_at: string | null
          version: number | null
        }
        Insert: {
          created_at?: string | null
          enforcement_notes?: string | null
          examples?: string[] | null
          exceptions?: string[] | null
          id?: string
          rule_key: string
          rule_text: string
          updated_at?: string | null
          version?: number | null
        }
        Update: {
          created_at?: string | null
          enforcement_notes?: string | null
          examples?: string[] | null
          exceptions?: string[] | null
          id?: string
          rule_key?: string
          rule_text?: string
          updated_at?: string | null
          version?: number | null
        }
        Relationships: []
      }
      content_reports: {
        Row: {
          content_id: string
          content_type: string
          created_at: string | null
          details: string | null
          id: string
          reason: string
          reporter_id: string | null
          resolution_notes: string | null
          resolved_at: string | null
          resolved_by: string | null
          status: string | null
        }
        Insert: {
          content_id: string
          content_type: string
          created_at?: string | null
          details?: string | null
          id?: string
          reason: string
          reporter_id?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string | null
        }
        Update: {
          content_id?: string
          content_type?: string
          created_at?: string | null
          details?: string | null
          id?: string
          reason?: string
          reporter_id?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_reports_reporter_id_fkey"
            columns: ["reporter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_participants: {
        Row: {
          conversation_id: string | null
          id: string
          joined_at: string | null
          last_contributed_at: string | null
          message_count: number | null
          user_id: string | null
        }
        Insert: {
          conversation_id?: string | null
          id?: string
          joined_at?: string | null
          last_contributed_at?: string | null
          message_count?: number | null
          user_id?: string | null
        }
        Update: {
          conversation_id?: string | null
          id?: string
          joined_at?: string | null
          last_contributed_at?: string | null
          message_count?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversation_participants_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "debates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversation_participants_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "hot_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversation_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_activity: {
        Row: {
          activity_date: string
          answered_daily_question: boolean | null
          contributions_count: number | null
          created_at: string | null
          debates_participated: string[] | null
          id: string
          user_id: string
        }
        Insert: {
          activity_date?: string
          answered_daily_question?: boolean | null
          contributions_count?: number | null
          created_at?: string | null
          debates_participated?: string[] | null
          id?: string
          user_id: string
        }
        Update: {
          activity_date?: string
          answered_daily_question?: boolean | null
          contributions_count?: number | null
          created_at?: string | null
          debates_participated?: string[] | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "daily_activity_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_prompts: {
        Row: {
          category: string | null
          context: string | null
          created_at: string | null
          date: string
          debate_id: string | null
          id: string
          posted_at: string | null
          posted_debate_id: string | null
          question: string
          topic: string
        }
        Insert: {
          category?: string | null
          context?: string | null
          created_at?: string | null
          date: string
          debate_id?: string | null
          id?: string
          posted_at?: string | null
          posted_debate_id?: string | null
          question: string
          topic: string
        }
        Update: {
          category?: string | null
          context?: string | null
          created_at?: string | null
          date?: string
          debate_id?: string | null
          id?: string
          posted_at?: string | null
          posted_debate_id?: string | null
          question?: string
          topic?: string
        }
        Relationships: [
          {
            foreignKeyName: "daily_prompts_debate_id_fkey"
            columns: ["debate_id"]
            isOneToOne: false
            referencedRelation: "debates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "daily_prompts_debate_id_fkey"
            columns: ["debate_id"]
            isOneToOne: false
            referencedRelation: "hot_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "daily_prompts_posted_debate_id_fkey"
            columns: ["posted_debate_id"]
            isOneToOne: false
            referencedRelation: "debates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "daily_prompts_posted_debate_id_fkey"
            columns: ["posted_debate_id"]
            isOneToOne: false
            referencedRelation: "hot_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      debate_permalinks: {
        Row: {
          created_at: string | null
          debate_id: string
          id: string
          slug: string
        }
        Insert: {
          created_at?: string | null
          debate_id: string
          id?: string
          slug: string
        }
        Update: {
          created_at?: string | null
          debate_id?: string
          id?: string
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "debate_permalinks_debate_id_fkey"
            columns: ["debate_id"]
            isOneToOne: false
            referencedRelation: "debates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "debate_permalinks_debate_id_fkey"
            columns: ["debate_id"]
            isOneToOne: false
            referencedRelation: "hot_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      debates: {
        Row: {
          against_participant: string | null
          argument_count: number | null
          category: string | null
          completed_at: string | null
          conversation_type: string | null
          created_at: string | null
          created_by: string | null
          debate_format: string | null
          description: string | null
          expires_at: string | null
          featured: boolean | null
          for_participant: string | null
          goals: string | null
          id: string
          is_daily_question: boolean | null
          participant_count: number | null
          philosophical_tradition: string[] | null
          quadrant: Database["public"]["Enums"]["quadrant_type"] | null
          rating_processed: boolean | null
          related_debates: string[] | null
          school_of_thought: string | null
          snap_count: number | null
          started_at: string | null
          status: string | null
          tags: string[] | null
          topic: string
          vault_status: string | null
          vault_tags: string[] | null
          winner_id: string | null
          zap_count: number | null
        }
        Insert: {
          against_participant?: string | null
          argument_count?: number | null
          category?: string | null
          completed_at?: string | null
          conversation_type?: string | null
          created_at?: string | null
          created_by?: string | null
          debate_format?: string | null
          description?: string | null
          expires_at?: string | null
          featured?: boolean | null
          for_participant?: string | null
          goals?: string | null
          id?: string
          is_daily_question?: boolean | null
          participant_count?: number | null
          philosophical_tradition?: string[] | null
          quadrant?: Database["public"]["Enums"]["quadrant_type"] | null
          rating_processed?: boolean | null
          related_debates?: string[] | null
          school_of_thought?: string | null
          snap_count?: number | null
          started_at?: string | null
          status?: string | null
          tags?: string[] | null
          topic: string
          vault_status?: string | null
          vault_tags?: string[] | null
          winner_id?: string | null
          zap_count?: number | null
        }
        Update: {
          against_participant?: string | null
          argument_count?: number | null
          category?: string | null
          completed_at?: string | null
          conversation_type?: string | null
          created_at?: string | null
          created_by?: string | null
          debate_format?: string | null
          description?: string | null
          expires_at?: string | null
          featured?: boolean | null
          for_participant?: string | null
          goals?: string | null
          id?: string
          is_daily_question?: boolean | null
          participant_count?: number | null
          philosophical_tradition?: string[] | null
          quadrant?: Database["public"]["Enums"]["quadrant_type"] | null
          rating_processed?: boolean | null
          related_debates?: string[] | null
          school_of_thought?: string | null
          snap_count?: number | null
          started_at?: string | null
          status?: string | null
          tags?: string[] | null
          topic?: string
          vault_status?: string | null
          vault_tags?: string[] | null
          winner_id?: string | null
          zap_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "debates_against_participant_fkey"
            columns: ["against_participant"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "debates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "debates_for_participant_fkey"
            columns: ["for_participant"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "debates_winner_id_fkey"
            columns: ["winner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      discussion_comments: {
        Row: {
          content: string
          created_at: string | null
          discussion_id: string | null
          downvotes: number | null
          id: string
          parent_comment_id: string | null
          updated_at: string | null
          upvotes: number | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          discussion_id?: string | null
          downvotes?: number | null
          id?: string
          parent_comment_id?: string | null
          updated_at?: string | null
          upvotes?: number | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          discussion_id?: string | null
          downvotes?: number | null
          id?: string
          parent_comment_id?: string | null
          updated_at?: string | null
          upvotes?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "discussion_comments_discussion_id_fkey"
            columns: ["discussion_id"]
            isOneToOne: false
            referencedRelation: "discussions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "discussion_comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "discussion_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "discussion_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      discussions: {
        Row: {
          category: string | null
          comment_count: number | null
          created_at: string | null
          description: string | null
          featured: boolean | null
          id: string
          question: string
        }
        Insert: {
          category?: string | null
          comment_count?: number | null
          created_at?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string
          question: string
        }
        Update: {
          category?: string | null
          comment_count?: number | null
          created_at?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string
          question?: string
        }
        Relationships: []
      }
      feedback_validation: {
        Row: {
          created_at: string | null
          feedback_id: string
          id: string
          is_valid: boolean
          validator_id: string
        }
        Insert: {
          created_at?: string | null
          feedback_id: string
          id?: string
          is_valid: boolean
          validator_id: string
        }
        Update: {
          created_at?: string | null
          feedback_id?: string
          id?: string
          is_valid?: boolean
          validator_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "feedback_validation_feedback_id_fkey"
            columns: ["feedback_id"]
            isOneToOne: false
            referencedRelation: "argument_feedback"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_validation_validator_id_fkey"
            columns: ["validator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      journal_entries: {
        Row: {
          content: string
          created_at: string | null
          folder_id: string | null
          id: string
          is_published: boolean | null
          published_at: string | null
          published_debate_id: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          folder_id?: string | null
          id?: string
          is_published?: boolean | null
          published_at?: string | null
          published_debate_id?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          folder_id?: string | null
          id?: string
          is_published?: boolean | null
          published_at?: string | null
          published_debate_id?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "journal_entries_folder_id_fkey"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "journal_folders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "journal_entries_published_debate_id_fkey"
            columns: ["published_debate_id"]
            isOneToOne: false
            referencedRelation: "debates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "journal_entries_published_debate_id_fkey"
            columns: ["published_debate_id"]
            isOneToOne: false
            referencedRelation: "hot_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "journal_entries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      journal_folders: {
        Row: {
          color: string | null
          created_at: string | null
          icon: string | null
          id: string
          name: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          icon?: string | null
          id?: string
          name: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          icon?: string | null
          id?: string
          name?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "journal_folders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      judgments: {
        Row: {
          created_at: string | null
          debate_id: string | null
          fact_checks: Json | null
          id: string
          reasoning: string
          scores: Json | null
          winner_position: string | null
        }
        Insert: {
          created_at?: string | null
          debate_id?: string | null
          fact_checks?: Json | null
          id?: string
          reasoning: string
          scores?: Json | null
          winner_position?: string | null
        }
        Update: {
          created_at?: string | null
          debate_id?: string | null
          fact_checks?: Json | null
          id?: string
          reasoning?: string
          scores?: Json | null
          winner_position?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "judgments_debate_id_fkey"
            columns: ["debate_id"]
            isOneToOne: false
            referencedRelation: "debates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "judgments_debate_id_fkey"
            columns: ["debate_id"]
            isOneToOne: false
            referencedRelation: "hot_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      message_feedback: {
        Row: {
          created_at: string | null
          feedback_type: string
          id: string
          message_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          feedback_type: string
          id?: string
          message_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          feedback_type?: string
          id?: string
          message_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "message_feedback_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "arguments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_feedback_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      moderation_actions: {
        Row: {
          action_type: string
          content_id: string
          content_type: string
          created_at: string | null
          id: string
          is_appealable: boolean | null
          moderator_id: string | null
          moderator_type: string
          reason: string
          rule_violated: string | null
          visibility: string | null
        }
        Insert: {
          action_type: string
          content_id: string
          content_type: string
          created_at?: string | null
          id?: string
          is_appealable?: boolean | null
          moderator_id?: string | null
          moderator_type: string
          reason: string
          rule_violated?: string | null
          visibility?: string | null
        }
        Update: {
          action_type?: string
          content_id?: string
          content_type?: string
          created_at?: string | null
          id?: string
          is_appealable?: boolean | null
          moderator_id?: string | null
          moderator_type?: string
          reason?: string
          rule_violated?: string | null
          visibility?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "moderation_actions_moderator_id_fkey"
            columns: ["moderator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      moderation_appeals: {
        Row: {
          action_id: string
          appeal_reason: string
          appeal_result: string | null
          appeal_status: string | null
          created_at: string | null
          decided_at: string | null
          decided_by_user_id: string | null
          id: string
          user_id: string
        }
        Insert: {
          action_id: string
          appeal_reason: string
          appeal_result?: string | null
          appeal_status?: string | null
          created_at?: string | null
          decided_at?: string | null
          decided_by_user_id?: string | null
          id?: string
          user_id: string
        }
        Update: {
          action_id?: string
          appeal_reason?: string
          appeal_result?: string | null
          appeal_status?: string | null
          created_at?: string | null
          decided_at?: string | null
          decided_by_user_id?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "moderation_appeals_action_id_fkey"
            columns: ["action_id"]
            isOneToOne: false
            referencedRelation: "moderation_actions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "moderation_appeals_decided_by_user_id_fkey"
            columns: ["decided_by_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "moderation_appeals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      platform_settings: {
        Row: {
          key: string
          updated_at: string | null
          updated_by: string | null
          value: Json
        }
        Insert: {
          key: string
          updated_at?: string | null
          updated_by?: string | null
          value: Json
        }
        Update: {
          key?: string
          updated_at?: string | null
          updated_by?: string | null
          value?: Json
        }
        Relationships: []
      }
      post_votes: {
        Row: {
          created_at: string | null
          id: string
          post_id: string | null
          user_id: string | null
          vote_type: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_id?: string | null
          user_id?: string | null
          vote_type?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          post_id?: string | null
          user_id?: string | null
          vote_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_votes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "debates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_votes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "hot_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_votes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avg_upvote_ratio: number | null
          bio: string | null
          conversations_participated: number | null
          created_at: string | null
          daily_streak: number | null
          debates_by_format: Json | null
          debates_participated: number | null
          debates_won: number | null
          delo_categories: Json | null
          delo_rating: number | null
          delo_rating_provisional: boolean | null
          display_name: string | null
          expertise_areas: string[] | null
          id: string
          influence_score: number | null
          last_activity_date: string | null
          learning_interests: string[] | null
          longest_streak: number | null
          peak_rating: number | null
          rating_volatility: number | null
          reputation_score: number | null
          streak_protected: boolean | null
          total_messages: number | null
          total_upvotes: number | null
          updated_at: string | null
          username: string
          win_loss_record: Json | null
        }
        Insert: {
          avg_upvote_ratio?: number | null
          bio?: string | null
          conversations_participated?: number | null
          created_at?: string | null
          daily_streak?: number | null
          debates_by_format?: Json | null
          debates_participated?: number | null
          debates_won?: number | null
          delo_categories?: Json | null
          delo_rating?: number | null
          delo_rating_provisional?: boolean | null
          display_name?: string | null
          expertise_areas?: string[] | null
          id: string
          influence_score?: number | null
          last_activity_date?: string | null
          learning_interests?: string[] | null
          longest_streak?: number | null
          peak_rating?: number | null
          rating_volatility?: number | null
          reputation_score?: number | null
          streak_protected?: boolean | null
          total_messages?: number | null
          total_upvotes?: number | null
          updated_at?: string | null
          username: string
          win_loss_record?: Json | null
        }
        Update: {
          avg_upvote_ratio?: number | null
          bio?: string | null
          conversations_participated?: number | null
          created_at?: string | null
          daily_streak?: number | null
          debates_by_format?: Json | null
          debates_participated?: number | null
          debates_won?: number | null
          delo_categories?: Json | null
          delo_rating?: number | null
          delo_rating_provisional?: boolean | null
          display_name?: string | null
          expertise_areas?: string[] | null
          id?: string
          influence_score?: number | null
          last_activity_date?: string | null
          learning_interests?: string[] | null
          longest_streak?: number | null
          peak_rating?: number | null
          rating_volatility?: number | null
          reputation_score?: number | null
          streak_protected?: boolean | null
          total_messages?: number | null
          total_upvotes?: number | null
          updated_at?: string | null
          username?: string
          win_loss_record?: Json | null
        }
        Relationships: []
      }
      system_metrics: {
        Row: {
          id: string
          metric_type: string
          metric_value: Json
          recorded_at: string | null
        }
        Insert: {
          id?: string
          metric_type: string
          metric_value: Json
          recorded_at?: string | null
        }
        Update: {
          id?: string
          metric_type?: string
          metric_value?: Json
          recorded_at?: string | null
        }
        Relationships: []
      }
      user_bans: {
        Row: {
          ban_type: string | null
          banned_by: string
          created_at: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          reason: string
          user_id: string
        }
        Insert: {
          ban_type?: string | null
          banned_by: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          reason: string
          user_id: string
        }
        Update: {
          ban_type?: string | null
          banned_by?: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          reason?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_bans_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      vault_index: {
        Row: {
          content_tokens: string[] | null
          created_at: string | null
          debate_id: string
          id: string
          last_indexed: string | null
          philosophy_tags: string[] | null
          search_text: string | null
          title_tokens: string[] | null
          topic_tokens: string[] | null
        }
        Insert: {
          content_tokens?: string[] | null
          created_at?: string | null
          debate_id: string
          id?: string
          last_indexed?: string | null
          philosophy_tags?: string[] | null
          search_text?: string | null
          title_tokens?: string[] | null
          topic_tokens?: string[] | null
        }
        Update: {
          content_tokens?: string[] | null
          created_at?: string | null
          debate_id?: string
          id?: string
          last_indexed?: string | null
          philosophy_tags?: string[] | null
          search_text?: string | null
          title_tokens?: string[] | null
          topic_tokens?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "vault_index_debate_id_fkey"
            columns: ["debate_id"]
            isOneToOne: true
            referencedRelation: "debates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vault_index_debate_id_fkey"
            columns: ["debate_id"]
            isOneToOne: true
            referencedRelation: "hot_posts"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      argument_feedback_summary: {
        Row: {
          argument_id: string | null
          assumes_count: number | null
          changed_view_count: number | null
          ignores_counter_count: number | null
          logic_unclear_count: number | null
          misrepresents_count: number | null
          needs_evidence_count: number | null
          snap_count: number | null
          total_feedback: number | null
        }
        Relationships: [
          {
            foreignKeyName: "argument_feedback_argument_id_fkey"
            columns: ["argument_id"]
            isOneToOne: false
            referencedRelation: "arguments"
            referencedColumns: ["id"]
          },
        ]
      }
      hot_posts: {
        Row: {
          against_participant: string | null
          category: string | null
          completed_at: string | null
          conversation_type: string | null
          created_at: string | null
          created_by: string | null
          debate_format: string | null
          description: string | null
          expires_at: string | null
          featured: boolean | null
          for_participant: string | null
          goals: string | null
          hot_score: number | null
          id: string | null
          is_daily_question: boolean | null
          quadrant: Database["public"]["Enums"]["quadrant_type"] | null
          rating_processed: boolean | null
          snap_count: number | null
          started_at: string | null
          status: string | null
          tags: string[] | null
          topic: string | null
          winner_id: string | null
          zap_count: number | null
        }
        Insert: {
          against_participant?: string | null
          category?: string | null
          completed_at?: string | null
          conversation_type?: string | null
          created_at?: string | null
          created_by?: string | null
          debate_format?: string | null
          description?: string | null
          expires_at?: string | null
          featured?: boolean | null
          for_participant?: string | null
          goals?: string | null
          hot_score?: never
          id?: string | null
          is_daily_question?: boolean | null
          quadrant?: Database["public"]["Enums"]["quadrant_type"] | null
          rating_processed?: boolean | null
          snap_count?: number | null
          started_at?: string | null
          status?: string | null
          tags?: string[] | null
          topic?: string | null
          winner_id?: string | null
          zap_count?: number | null
        }
        Update: {
          against_participant?: string | null
          category?: string | null
          completed_at?: string | null
          conversation_type?: string | null
          created_at?: string | null
          created_by?: string | null
          debate_format?: string | null
          description?: string | null
          expires_at?: string | null
          featured?: boolean | null
          for_participant?: string | null
          goals?: string | null
          hot_score?: never
          id?: string | null
          is_daily_question?: boolean | null
          quadrant?: Database["public"]["Enums"]["quadrant_type"] | null
          rating_processed?: boolean | null
          snap_count?: number | null
          started_at?: string | null
          status?: string | null
          tags?: string[] | null
          topic?: string | null
          winner_id?: string | null
          zap_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "debates_against_participant_fkey"
            columns: ["against_participant"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "debates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "debates_for_participant_fkey"
            columns: ["for_participant"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "debates_winner_id_fkey"
            columns: ["winner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      calculate_hot_score: {
        Args: { created_at: string; snap_count: number; zap_count: number }
        Returns: number
      }
      decrement_discussion_comment_count: {
        Args: { discussion_id: string }
        Returns: undefined
      }
      increment_discussion_comment_count: {
        Args: { discussion_id: string }
        Returns: undefined
      }
    }
    Enums: {
      quadrant_type:
        | "ai_technology"
        | "philosophy"
        | "morality_ethics"
        | "economics_society"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      quadrant_type: [
        "ai_technology",
        "philosophy",
        "morality_ethics",
        "economics_society",
      ],
    },
  },
} as const
