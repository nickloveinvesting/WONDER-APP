interface UserAvatar {
  initials: string;
  role: string;
}

interface DiscussionPreviewCardProps {
  communityVibe?: string;
  avatars?: UserAvatar[];
  exploringCount?: number;
  title: string;
  description?: string;
  topicTag: string;
  topicColor?: 'teal' | 'slate';
  activityLevel: string;
  contributionCount?: number;
  helpfulResponses?: number;
}

export default function DiscussionPreviewCard({
  communityVibe,
  avatars = [],
  exploringCount,
  title,
  description,
  topicTag,
  topicColor = 'teal',
  activityLevel,
  contributionCount,
  helpfulResponses,
}: DiscussionPreviewCardProps) {
  const topicColorClasses = {
    teal: 'bg-teal-100 text-teal-700 border-teal-300',
    slate: 'bg-slate-100 text-slate-700 border-slate-300',
  };

  const roleColorClasses = {
    teal: 'bg-teal-500',
    slate: 'bg-slate-600',
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-200">
      {/* Community Vibe Badge */}
      {communityVibe && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Community Vibe</span>
          </div>
          <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded">
            {communityVibe}
          </span>
        </div>
      )}

      {/* User Avatars Row */}
      {avatars.length > 0 && (
        <div className="flex items-center space-x-2 mb-3">
          {avatars.map((avatar, idx) => (
            <div
              key={idx}
              className={`w-8 h-8 ${roleColorClasses[topicColor]} text-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-white shadow-md`}
            >
              {avatar.initials}
            </div>
          ))}
          {exploringCount && (
            <span className="text-xs text-teal-600 font-bold ml-2">
              {exploringCount} exploring
            </span>
          )}
        </div>
      )}

      {/* Discussion Title */}
      <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 leading-snug">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-sm text-slate-600 mb-4 line-clamp-3 leading-relaxed">
          {description}
        </p>
      )}

      {/* Footer: Topic Tag + Activity + Metrics */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded border font-bold ${topicColorClasses[topicColor]}`}>
            {topicTag}
          </span>
          <span className="text-slate-500 font-semibold">{activityLevel}</span>
        </div>
        
        {contributionCount !== undefined && (
          <span className="text-slate-500 font-semibold">
            {contributionCount} contributions
          </span>
        )}
        
        {helpfulResponses !== undefined && (
          <span className="text-slate-500 font-semibold">
            {helpfulResponses} helpful responses
          </span>
        )}
      </div>
    </div>
  );
}
