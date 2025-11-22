'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  ChevronRight, ChevronLeft, Search, Clock, Star,
  Heart, Lightbulb, Brain, Scale, Cpu, TrendingUp,
  Archive, Shield, BookOpen
} from 'lucide-react';

// Extended topic hierarchy based on research recommendations
const TOPIC_HIERARCHY = [
  {
    id: 'ethics',
    name: 'Ethics',
    icon: Heart,
    color: 'from-rose-500 to-red-500',
    iconColor: 'text-rose-500',
    subtopics: [
      { id: 'applied_ethics', name: 'Applied Ethics' },
      { id: 'ethical_theories', name: 'Ethical Theories' },
      { id: 'meta_ethics', name: 'Meta-Ethics' },
      { id: 'bioethics', name: 'Bioethics' },
    ],
  },
  {
    id: 'epistemology',
    name: 'Epistemology',
    icon: Lightbulb,
    color: 'from-amber-500 to-yellow-500',
    iconColor: 'text-amber-500',
    subtopics: [
      { id: 'knowledge_theories', name: 'Theories of Knowledge' },
      { id: 'skepticism', name: 'Skepticism' },
      { id: 'truth_justification', name: 'Truth & Justification' },
    ],
  },
  {
    id: 'philosophy_of_mind',
    name: 'Philosophy of Mind',
    icon: Brain,
    color: 'from-purple-500 to-violet-500',
    iconColor: 'text-purple-500',
    subtopics: [
      { id: 'consciousness', name: 'Consciousness' },
      { id: 'ai_philosophy', name: 'AI & Philosophy' },
      { id: 'mind_body', name: 'Mind-Body Problem' },
      { id: 'free_will', name: 'Free Will' },
    ],
  },
  {
    id: 'political_philosophy',
    name: 'Political Philosophy',
    icon: Scale,
    color: 'from-blue-500 to-indigo-500',
    iconColor: 'text-blue-500',
    subtopics: [
      { id: 'justice', name: 'Justice & Equality' },
      { id: 'rights', name: 'Rights & Freedoms' },
      { id: 'political_systems', name: 'Political Systems' },
    ],
  },
  {
    id: 'ai_technology',
    name: 'AI & Technology',
    icon: Cpu,
    color: 'from-cyan-500 to-teal-500',
    iconColor: 'text-cyan-500',
    subtopics: [
      { id: 'ai_ethics', name: 'AI Ethics' },
      { id: 'digital_society', name: 'Digital Society' },
      { id: 'future_tech', name: 'Future of Tech' },
    ],
  },
  {
    id: 'economics_society',
    name: 'Economics & Society',
    icon: TrendingUp,
    color: 'from-emerald-500 to-green-500',
    iconColor: 'text-emerald-500',
    subtopics: [
      { id: 'economic_justice', name: 'Economic Justice' },
      { id: 'social_philosophy', name: 'Social Philosophy' },
      { id: 'work_labor', name: 'Work & Labor' },
    ],
  },
];

// Mock data - in real app, this would come from user preferences/history
const MOCK_RECENT = [
  { id: '1', name: 'AI Consciousness', href: '/debates?topic=ai_philosophy' },
  { id: '2', name: 'Free Will Debate', href: '/debates?topic=free_will' },
];

const MOCK_FAVORITES = [
  { id: '1', name: 'Ethics', href: '/debates?quadrant=ethics' },
];

/**
 * Enhanced QuadrantNav with:
 * - Collapsible sidebar
 * - Topic hierarchy with subtopics
 * - Recent & Favorites sections
 * - Search functionality
 */
export function QuadrantNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentQuadrant = searchParams.get('quadrant');
  const currentTopic = searchParams.get('topic');
  const isDebatesPage = pathname.startsWith('/debates');

  // Sidebar collapse state - persisted to localStorage
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedTopics, setExpandedTopics] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Load collapse preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    if (saved) setIsCollapsed(JSON.parse(saved));

    const savedExpanded = localStorage.getItem('sidebar-expanded-topics');
    if (savedExpanded) setExpandedTopics(JSON.parse(savedExpanded));
  }, []);

  // Save collapse preference
  const toggleCollapse = () => {
    const newValue = !isCollapsed;
    setIsCollapsed(newValue);
    localStorage.setItem('sidebar-collapsed', JSON.stringify(newValue));
  };

  // Toggle topic expansion
  const toggleTopic = (topicId: string) => {
    const newExpanded = expandedTopics.includes(topicId)
      ? expandedTopics.filter(id => id !== topicId)
      : [...expandedTopics, topicId];
    setExpandedTopics(newExpanded);
    localStorage.setItem('sidebar-expanded-topics', JSON.stringify(newExpanded));
  };

  // Filter topics by search
  const filteredTopics = searchQuery
    ? TOPIC_HIERARCHY.filter(
        topic =>
          topic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          topic.subtopics.some(sub => sub.name.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : TOPIC_HIERARCHY;

  return (
    <>
      {/* Mobile: Horizontal scrollable chips - Only on debates page */}
      {isDebatesPage && (
        <div className="lg:hidden sticky top-14 z-40 bg-white border-b border-slate-200 overflow-x-auto">
          <div className="flex gap-2 px-4 py-3 min-w-max">
            <Link
              href="/debates"
              prefetch={true}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                !currentQuadrant && !currentTopic
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Posts
            </Link>
            {TOPIC_HIERARCHY.map((topic) => {
              const Icon = topic.icon;
              const isActive = currentQuadrant === topic.id;
              return (
                <Link
                  key={topic.id}
                  href={`/debates?quadrant=${topic.id}`}
                  prefetch={true}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? `bg-gradient-to-r ${topic.color} text-white shadow-md`
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-white' : 'text-slate-400'} />
                  {topic.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Desktop: Collapsible Sidebar */}
      <aside
        className={`hidden lg:block border-r border-slate-200 bg-white sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto transition-all duration-300 ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        <div className={`p-4 ${isCollapsed ? 'px-2' : 'p-6'}`}>

          {/* Collapse Toggle */}
          <button
            onClick={toggleCollapse}
            className={`flex items-center justify-center w-full mb-4 p-2 rounded-lg hover:bg-slate-100 transition-colors ${
              isCollapsed ? '' : 'justify-end'
            }`}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight size={20} className="text-slate-400" />
            ) : (
              <ChevronLeft size={20} className="text-slate-400" />
            )}
          </button>

          {/* Search - Hidden when collapsed */}
          {!isCollapsed && (
            <div className="relative mb-6">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          )}

          {/* Recent Section - Hidden when collapsed */}
          {!isCollapsed && MOCK_RECENT.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2 px-2">
                <Clock size={14} className="text-slate-400" />
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Recent</h3>
              </div>
              <div className="space-y-1">
                {MOCK_RECENT.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="block px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-50 hover:text-teal-600 truncate"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Favorites Section - Hidden when collapsed */}
          {!isCollapsed && MOCK_FAVORITES.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2 px-2">
                <Star size={14} className="text-amber-400" />
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Favorites</h3>
              </div>
              <div className="space-y-1">
                {MOCK_FAVORITES.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="block px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-50 hover:text-teal-600 truncate"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* All Posts Link */}
          <Link
            href="/debates"
            prefetch={true}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-2 transition-all ${
              !currentQuadrant && !currentTopic
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg'
                : 'hover:bg-slate-50 text-slate-700'
            } ${isCollapsed ? 'justify-center' : ''}`}
            title="All Discussions"
          >
            <BookOpen size={20} className={!currentQuadrant && !currentTopic ? 'text-white' : 'text-slate-400'} />
            {!isCollapsed && <span className="font-bold text-sm">All Discussions</span>}
          </Link>

          {/* Topics Header */}
          {!isCollapsed && (
            <div className="flex items-center justify-between mb-2 mt-6 px-2">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Topics</h3>
            </div>
          )}

          {/* Topic Hierarchy */}
          <div className="space-y-1">
            {filteredTopics.map((topic) => {
              const Icon = topic.icon;
              const isActive = currentQuadrant === topic.id;
              const isExpanded = expandedTopics.includes(topic.id);
              const hasActiveSubtopic = topic.subtopics.some(sub => currentTopic === sub.id);

              return (
                <div key={topic.id}>
                  <div className="flex items-center">
                    <Link
                      href={`/debates?quadrant=${topic.id}`}
                      prefetch={true}
                      className={`flex-1 flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                        isActive || hasActiveSubtopic
                          ? `bg-gradient-to-r ${topic.color} text-white shadow-lg`
                          : 'hover:bg-slate-50 text-slate-700'
                      } ${isCollapsed ? 'justify-center' : ''}`}
                      title={topic.name}
                    >
                      <Icon size={20} className={isActive || hasActiveSubtopic ? 'text-white' : topic.iconColor} />
                      {!isCollapsed && <span className="font-bold text-sm flex-1">{topic.name}</span>}
                    </Link>

                    {/* Expand/Collapse button - only when not collapsed */}
                    {!isCollapsed && topic.subtopics.length > 0 && (
                      <button
                        onClick={() => toggleTopic(topic.id)}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        aria-label={isExpanded ? 'Collapse' : 'Expand'}
                      >
                        <ChevronRight
                          size={16}
                          className={`text-slate-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Subtopics */}
                  {!isCollapsed && isExpanded && (
                    <div className="ml-8 mt-1 space-y-1">
                      {topic.subtopics.map((subtopic) => (
                        <Link
                          key={subtopic.id}
                          href={`/debates?quadrant=${topic.id}&topic=${subtopic.id}`}
                          prefetch={true}
                          className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                            currentTopic === subtopic.id
                              ? 'bg-teal-50 text-teal-700'
                              : 'text-slate-600 hover:bg-slate-50 hover:text-teal-600'
                          }`}
                        >
                          {subtopic.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Resources Section */}
          {!isCollapsed && (
            <div className="mt-8">
              <h3 className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wide px-2">
                Resources
              </h3>
              <div className="space-y-1">
                <Link
                  href="/vault"
                  prefetch={true}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    pathname === '/vault'
                      ? 'bg-teal-50 text-teal-700'
                      : 'hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <Archive size={18} className={pathname === '/vault' ? 'text-teal-600' : 'text-slate-400'} />
                  <span className="font-bold text-sm">The Vault</span>
                </Link>
                <Link
                  href="/moderation-log"
                  prefetch={true}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    pathname === '/moderation-log'
                      ? 'bg-teal-50 text-teal-700'
                      : 'hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <Shield size={18} className={pathname === '/moderation-log' ? 'text-teal-600' : 'text-slate-400'} />
                  <span className="font-bold text-sm">Moderation Log</span>
                </Link>
              </div>
            </div>
          )}

          {/* Collapsed Resources */}
          {isCollapsed && (
            <div className="mt-4 space-y-2">
              <Link
                href="/vault"
                className={`flex items-center justify-center p-2.5 rounded-lg transition-all ${
                  pathname === '/vault' ? 'bg-teal-50' : 'hover:bg-slate-50'
                }`}
                title="The Vault"
              >
                <Archive size={20} className={pathname === '/vault' ? 'text-teal-600' : 'text-slate-400'} />
              </Link>
              <Link
                href="/moderation-log"
                className={`flex items-center justify-center p-2.5 rounded-lg transition-all ${
                  pathname === '/moderation-log' ? 'bg-teal-50' : 'hover:bg-slate-50'
                }`}
                title="Moderation Log"
              >
                <Shield size={20} className={pathname === '/moderation-log' ? 'text-teal-600' : 'text-slate-400'} />
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
