/**
 * INQUIRE FEATURE TYPE DEFINITIONS
 *
 * TypeScript interfaces for the Inquire feature - ARGUED's premium philosophy platform
 * These types match the database schema defined in 20250117_create_inquire_tables.sql
 *
 * @version 1.0
 * @date 2025-11-17
 */

// ============================================================================
// ENUMS & CONSTANTS
// ============================================================================

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export type PositionValue = -2 | -1 | 0 | 1 | 2;
// -2: Strongly Disagree, -1: Disagree, 0: Uncertain, 1: Agree, 2: Strongly Agree

export type ConfidenceLevel = 1 | 2 | 3 | 4 | 5;
// 1: Very Uncertain, 2: Somewhat Uncertain, 3: Neutral, 4: Somewhat Confident, 5: Very Confident

export type VoteType = 'upvote' | 'downvote';

export type BadgeType = 'academic' | 'professional' | 'published' | 'community';

export type VerificationStatus = 'pending' | 'verified' | 'rejected';

export type RelationshipType = 'prerequisite' | 'extension' | 'contrast' | 'application';

export const POSITION_LABELS: Record<PositionValue, string> = {
  '-2': 'Strongly Disagree',
  '-1': 'Disagree',
  '0': 'Uncertain',
  '1': 'Agree',
  '2': 'Strongly Agree',
};

export const CONFIDENCE_LABELS: Record<ConfidenceLevel, string> = {
  1: 'Very Uncertain',
  2: 'Somewhat Uncertain',
  3: 'Neutral',
  4: 'Somewhat Confident',
  5: 'Very Confident',
};

export const DIFFICULTY_LABELS: Record<DifficultyLevel, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

// ============================================================================
// CORE CATEGORY & FRAMEWORK TYPES
// ============================================================================

export interface InquiryCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon_name: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface InquiryCategoryWithStats extends InquiryCategory {
  topic_count: number;
  active_users: number;
}

export interface Framework {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  full_description: string | null;
  key_thinker: string | null;
  color_class: string | null;
  created_at: string;
}

export interface TopicFramework {
  id: string;
  topic_id: string;
  framework_id: string;
  relevance_score: number; // 1-10
  created_at: string;
  framework?: Framework; // Joined data
}

// ============================================================================
// TOPIC CONTENT JSONB STRUCTURES
// ============================================================================

export interface CoreQuestion {
  question_restatement: string;
  why_it_matters: string;
  why_difficult: string;
  historical_context: string;
}

export interface FrameworkAnalysis {
  framework_id: string;
  framework_name: string;
  core_principle: string;
  application: string; // How this framework analyzes the question
  key_thinker: string;
  typical_position: string; // What conclusion this framework tends toward
}

export interface KeyPosition {
  position_title: string; // e.g., "Yes, taxation is theft"
  steel_man_argument: string; // The strongest version (3-4 paragraphs)
  supporting_premises: string[]; // Bulleted logical structure
  common_objections: string[]; // What critics say
  aligned_frameworks: string[]; // Framework slugs
}

export interface ThoughtExperiment {
  title: string;
  scenario: string; // Vivid hypothetical (2-3 paragraphs)
  question: string; // What should you do? What does this reveal?
  why_it_matters: string; // What this illuminates
  framework_responses: Record<string, string>; // framework_slug => response
}

export interface RelatedTopic {
  topic_id: string;
  relationship_type: RelationshipType;
}

// ============================================================================
// INQUIRY TOPIC TYPES
// ============================================================================

export interface InquiryTopic {
  id: string;
  category_id: string;
  slug: string;
  title: string;
  short_description: string;
  difficulty: DifficultyLevel;
  estimated_read_time: number; // minutes

  // Content (stored as JSONB in database)
  overview: string;
  core_question: CoreQuestion;
  frameworks_analysis: FrameworkAnalysis[] | null;
  key_positions: KeyPosition[] | null;
  thought_experiments: ThoughtExperiment[] | null;
  related_topic_ids: string[] | null;

  // Engagement metadata
  view_count: number;
  position_count: number;
  comment_count: number;
  bookmark_count: number;

  // Publishing
  is_published: boolean;
  featured: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface InquiryTopicWithCategory extends InquiryTopic {
  category: InquiryCategory;
}

export interface InquiryTopicWithFrameworks extends InquiryTopic {
  top_frameworks: (TopicFramework & { framework: Framework })[];
}

export interface InquiryTopicCard {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  difficulty: DifficultyLevel;
  category: {
    slug: string;
    name: string;
  };
  comment_count: number;
  position_count: number;
  top_frameworks: Pick<Framework, 'id' | 'name' | 'color_class'>[];
}

// ============================================================================
// USER POSITION TYPES
// ============================================================================

export interface UserPosition {
  id: string;
  user_id: string;
  topic_id: string;
  position_value: PositionValue;
  confidence_level: ConfidenceLevel;
  framework_id: string | null;
  position_note: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserPositionWithFramework extends UserPosition {
  framework: Framework | null;
}

export interface PositionHistory {
  id: string;
  user_id: string;
  topic_id: string;
  position_value: PositionValue;
  confidence_level: ConfidenceLevel;
  framework_id: string | null;
  change_reason: string | null;
  recorded_at: string;
}

export interface PositionHistoryWithFramework extends PositionHistory {
  framework: Framework | null;
}

export interface PositionEvolutionData {
  topic_id: string;
  topic_title: string;
  history: PositionHistoryWithFramework[];
  current_position: UserPositionWithFramework;
}

// ============================================================================
// COMMENT TYPES
// ============================================================================

export interface TopicComment {
  id: string;
  topic_id: string;
  user_id: string;
  content: string;
  framework_id: string | null;

  // Steelman feature
  parent_comment_id: string | null;
  steelman_summary: string | null;
  steelman_accuracy_rating: number | null; // 1-5

  // Engagement
  upvotes: number;
  downvotes: number;
  reply_count: number;
  depth_score: number; // 0-100

  // Moderation
  is_anonymous: boolean;
  is_edited: boolean;
  is_deleted: boolean;

  created_at: string;
  updated_at: string;
}

export interface TopicCommentWithDetails extends TopicComment {
  user: {
    id: string;
    username: string;
    display_name: string | null;
    expert_badge: ExpertBadge | null;
  };
  framework: Framework | null;
  parent_comment: Pick<TopicComment, 'id' | 'content' | 'user_id'> | null;
  replies?: TopicCommentWithDetails[]; // Nested replies
  user_vote: VoteType | null; // Current user's vote on this comment
}

export interface CommentVote {
  id: string;
  comment_id: string;
  user_id: string;
  vote_type: VoteType;
  created_at: string;
}

// ============================================================================
// BOOKMARK TYPES
// ============================================================================

export interface TopicBookmark {
  id: string;
  user_id: string;
  topic_id: string;
  created_at: string;
}

export interface TopicBookmarkWithTopic extends TopicBookmark {
  topic: InquiryTopicCard;
}

// ============================================================================
// THOUGHT EXPERIMENT RESPONSE TYPES
// ============================================================================

export interface ThoughtExperimentResponse {
  id: string;
  user_id: string;
  topic_id: string;
  experiment_key: string;
  response_value: string;
  framework_id: string | null;
  explanation: string | null;
  created_at: string;
}

export interface ThoughtExperimentResponseWithFramework extends ThoughtExperimentResponse {
  framework: Framework | null;
}

export interface ThoughtExperimentAnalytics {
  experiment_key: string;
  response_distribution: Record<string, number>; // response_value => count
  framework_breakdown: Record<string, Record<string, number>>; // framework_slug => response_value => count
  total_responses: number;
}

// ============================================================================
// EXPERT BADGE TYPES
// ============================================================================

export interface ExpertBadge {
  id: string;
  user_id: string;
  badge_type: BadgeType;
  credential_text: string;
  verification_status: VerificationStatus;
  verification_notes: string | null;
  proof_url: string | null;
  avg_depth_score: number | null;
  specialty_category_id: string | null;
  granted_at: string | null;
  created_at: string;
}

export interface ExpertBadgeWithCategory extends ExpertBadge {
  specialty_category: InquiryCategory | null;
}

// ============================================================================
// FORM INPUT TYPES
// ============================================================================

export interface PositionDeclarationInput {
  topic_id: string;
  position_value: PositionValue;
  confidence_level: ConfidenceLevel;
  framework_id: string | null;
  position_note?: string;
}

export interface PositionUpdateInput {
  position_value: PositionValue;
  confidence_level: ConfidenceLevel;
  framework_id: string | null;
  change_reason?: string; // Why the position changed
}

export interface CommentCreateInput {
  topic_id: string;
  content: string;
  framework_id: string | null;
  parent_comment_id?: string;
  steelman_summary?: string; // Required if replying to opposing view
  is_anonymous?: boolean;
}

export interface CommentUpdateInput {
  content: string;
  framework_id?: string | null;
}

export interface ThoughtExperimentResponseInput {
  topic_id: string;
  experiment_key: string;
  response_value: string;
  framework_id?: string | null;
  explanation?: string;
}

export interface ExpertBadgeApplicationInput {
  badge_type: Exclude<BadgeType, 'community'>; // Community badges are granted algorithmically
  credential_text: string;
  proof_url?: string;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface InquireLandingPageData {
  categories: InquiryCategoryWithStats[];
  featured_topics: InquiryTopicCard[];
  frameworks: Framework[];
}

export interface CategoryPageData {
  category: InquiryCategory;
  topics: InquiryTopicCard[];
  featured_topics: InquiryTopicCard[];
  topic_count: number;
}

export interface TopicPageData {
  topic: InquiryTopicWithCategory;
  top_frameworks: (TopicFramework & { framework: Framework })[];
  user_position: UserPositionWithFramework | null;
  related_topics: InquiryTopicCard[];
  top_comments: TopicCommentWithDetails[];
  comment_count: number;
  is_bookmarked: boolean;
}

export interface UserDashboardData {
  recent_positions: (UserPositionWithFramework & { topic: InquiryTopicCard })[];
  position_evolution: PositionEvolutionData[];
  bookmarked_topics: TopicBookmarkWithTopic[];
  recommended_topics: InquiryTopicCard[];
  expert_badge: ExpertBadge | null;
}

// ============================================================================
// FILTER & SORT TYPES
// ============================================================================

export type TopicSortOption = 'popular' | 'recent' | 'controversial' | 'alphabetical';

export type CommentSortOption = 'depth_score' | 'recent' | 'upvotes' | 'controversial';

export interface TopicFilters {
  category_id?: string;
  difficulty?: DifficultyLevel;
  framework_id?: string;
  has_position?: boolean; // Filter to topics user has declared position on
  is_bookmarked?: boolean;
  search_query?: string;
}

export interface CommentFilters {
  framework_id?: string; // Show only comments from this framework
  min_depth_score?: number;
  has_replies?: boolean;
}

// ============================================================================
// ANALYTICS & METRICS TYPES
// ============================================================================

export interface TopicAnalytics {
  topic_id: string;
  view_count: number;
  unique_visitors: number;
  avg_time_on_page: number; // seconds
  position_declarations: number;
  position_distribution: Record<PositionValue, number>;
  framework_distribution: Record<string, number>; // framework_id => count
  comment_count: number;
  avg_depth_score: number;
}

export interface UserEngagementMetrics {
  user_id: string;
  topics_viewed: number;
  positions_declared: number;
  positions_changed: number; // How many times changed position
  comments_posted: number;
  avg_depth_score: number;
  steelman_avg_rating: number;
  most_used_framework: string | null;
}

export interface DepthScoreBreakdown {
  total_score: number; // 0-100
  components: {
    length_substance: number; // 0-15
    framework_engagement: number; // 0-20
    citations: number; // 0-10
    steelman_accuracy: number; // 0-25
    reply_depth: number; // 0-15
    diverse_engagement: number; // 0-15
  };
}

// ============================================================================
// UI COMPONENT PROP TYPES
// ============================================================================

export interface CategoryCardProps {
  category: InquiryCategoryWithStats;
  onClick?: () => void;
}

export interface TopicCardProps {
  topic: InquiryTopicCard;
  showCategory?: boolean;
  onClick?: () => void;
}

export interface PositionCardProps {
  position: KeyPosition;
  index: number; // For styling (alternating colors, etc.)
}

export interface FrameworkBadgeProps {
  framework: Pick<Framework, 'id' | 'name' | 'slug' | 'color_class'>;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export interface DifficultyIndicatorProps {
  level: DifficultyLevel;
  showLabel?: boolean;
}

export interface DepthScoreDisplayProps {
  score: number; // 0-100
  showBreakdown?: boolean;
  breakdown?: DepthScoreBreakdown;
}

export interface PositionEvolutionChartProps {
  data: PositionEvolutionData;
  height?: number;
}

export interface SteelmanPromptProps {
  parentComment: Pick<TopicComment, 'id' | 'content' | 'user_id'>;
  onSubmit: (summary: string) => void;
  onCancel: () => void;
}

export interface PositionDeclarationFormProps {
  topicId: string;
  initialPosition?: UserPosition;
  onSuccess?: (position: UserPosition) => void;
}

export interface CommentCardProps {
  comment: TopicCommentWithDetails;
  onReply?: (commentId: string) => void;
  onVote?: (commentId: string, voteType: VoteType) => void;
  onRateSteelman?: (commentId: string, rating: number) => void;
  depth?: number; // Nesting level (0, 1, 2 max)
}

// ============================================================================
// DATABASE QUERY HELPERS
// ============================================================================

/**
 * Type for Supabase query result with specific select fields
 */
export type SelectFields<T> = Partial<T>;

/**
 * Type for paginated query results
 */
export interface PaginatedResult<T> {
  data: T[];
  count: number;
  page: number;
  page_size: number;
  has_more: boolean;
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page?: number;
  page_size?: number;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Make specified properties required
 */
export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

/**
 * Make specified properties optional
 */
export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Extract ID type (useful for foreign keys)
 */
export type ID = string;

/**
 * Timestamp type (ISO 8601 string from database)
 */
export type Timestamp = string;

// All types are already exported where they are defined above
// No need for re-export block
