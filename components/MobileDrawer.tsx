'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Search, ChevronRight, Clock, Star, Cpu, Lightbulb, Heart, TrendingUp, Archive, Shield, BookOpen, Brain, Scale, Users } from 'lucide-react';
import Logo from '@/components/Logo';

// Extended topic hierarchy based on research
const TOPIC_HIERARCHY = [
  {
    id: 'ethics',
    name: 'Ethics',
    icon: Heart,
    color: 'text-rose-500',
    subtopics: [
      { id: 'applied_ethics', name: 'Applied Ethics', href: '/debates?topic=applied_ethics' },
      { id: 'ethical_theories', name: 'Ethical Theories', href: '/debates?topic=ethical_theories' },
      { id: 'meta_ethics', name: 'Meta-Ethics', href: '/debates?topic=meta_ethics' },
    ],
  },
  {
    id: 'epistemology',
    name: 'Epistemology',
    icon: Lightbulb,
    color: 'text-amber-500',
    subtopics: [
      { id: 'knowledge_theories', name: 'Theories of Knowledge', href: '/debates?topic=knowledge_theories' },
      { id: 'skepticism', name: 'Skepticism', href: '/debates?topic=skepticism' },
      { id: 'truth_justification', name: 'Truth & Justification', href: '/debates?topic=truth_justification' },
    ],
  },
  {
    id: 'philosophy_of_mind',
    name: 'Philosophy of Mind',
    icon: Brain,
    color: 'text-purple-500',
    subtopics: [
      { id: 'consciousness', name: 'Consciousness', href: '/debates?topic=consciousness' },
      { id: 'ai_philosophy', name: 'AI & Philosophy', href: '/debates?topic=ai_philosophy' },
      { id: 'mind_body', name: 'Mind-Body Problem', href: '/debates?topic=mind_body' },
    ],
  },
  {
    id: 'political_philosophy',
    name: 'Political Philosophy',
    icon: Scale,
    color: 'text-blue-500',
    subtopics: [
      { id: 'justice', name: 'Justice & Equality', href: '/debates?topic=justice' },
      { id: 'rights', name: 'Rights & Freedoms', href: '/debates?topic=rights' },
      { id: 'political_systems', name: 'Political Systems', href: '/debates?topic=political_systems' },
    ],
  },
  {
    id: 'technology',
    name: 'AI & Technology',
    icon: Cpu,
    color: 'text-cyan-500',
    subtopics: [
      { id: 'ai_ethics', name: 'AI Ethics', href: '/debates?topic=ai_ethics' },
      { id: 'digital_society', name: 'Digital Society', href: '/debates?topic=digital_society' },
      { id: 'future_tech', name: 'Future of Tech', href: '/debates?topic=future_tech' },
    ],
  },
  {
    id: 'economics_society',
    name: 'Economics & Society',
    icon: TrendingUp,
    color: 'text-emerald-500',
    subtopics: [
      { id: 'economic_justice', name: 'Economic Justice', href: '/debates?topic=economic_justice' },
      { id: 'social_philosophy', name: 'Social Philosophy', href: '/debates?topic=social_philosophy' },
      { id: 'work_labor', name: 'Work & Labor', href: '/debates?topic=work_labor' },
    ],
  },
];

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  recentTopics?: { id: string; name: string; href: string }[];
  favoriteTopics?: { id: string; name: string; href: string }[];
}

export function MobileDrawer({ isOpen, onClose, recentTopics = [], favoriteTopics = [] }: MobileDrawerProps) {
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Handle swipe to close
  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer || !isOpen) return;

    let startX = 0;
    let currentX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      currentX = e.touches[0].clientX;
      const diff = startX - currentX;
      if (diff > 0) {
        drawer.style.transform = `translateX(-${diff}px)`;
      }
    };

    const handleTouchEnd = () => {
      const diff = startX - currentX;
      if (diff > 100) {
        onClose();
      }
      drawer.style.transform = '';
    };

    drawer.addEventListener('touchstart', handleTouchStart);
    drawer.addEventListener('touchmove', handleTouchMove);
    drawer.addEventListener('touchend', handleTouchEnd);

    return () => {
      drawer.removeEventListener('touchstart', handleTouchStart);
      drawer.removeEventListener('touchmove', handleTouchMove);
      drawer.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed top-0 left-0 h-full w-[85%] max-w-sm bg-white z-50 lg:hidden shadow-2xl overflow-y-auto transition-transform duration-300"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <Logo variant="black" size="xs" clickable={true} />
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Close menu"
          >
            <X size={24} className="text-slate-600" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-100">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search topics..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* Recent Topics */}
        {recentTopics.length > 0 && (
          <div className="p-4 border-b border-slate-100">
            <div className="flex items-center gap-2 mb-3">
              <Clock size={16} className="text-slate-400" />
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Recent</h3>
            </div>
            <div className="space-y-1">
              {recentTopics.slice(0, 3).map((topic) => (
                <Link
                  key={topic.id}
                  href={topic.href}
                  onClick={onClose}
                  className="block px-3 py-2 text-sm font-medium text-slate-700 rounded-lg hover:bg-slate-50"
                >
                  {topic.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Favorites */}
        {favoriteTopics.length > 0 && (
          <div className="p-4 border-b border-slate-100">
            <div className="flex items-center gap-2 mb-3">
              <Star size={16} className="text-amber-400" />
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Favorites</h3>
            </div>
            <div className="space-y-1">
              {favoriteTopics.slice(0, 3).map((topic) => (
                <Link
                  key={topic.id}
                  href={topic.href}
                  onClick={onClose}
                  className="block px-3 py-2 text-sm font-medium text-slate-700 rounded-lg hover:bg-slate-50"
                >
                  {topic.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All Posts Link */}
        <div className="p-4 border-b border-slate-100">
          <Link
            href="/debates"
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
              pathname === '/debates' && !pathname.includes('?')
                ? 'bg-teal-500 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <BookOpen size={20} />
            All Discussions
          </Link>
        </div>

        {/* Topic Hierarchy */}
        <div className="p-4">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3 px-2">
            Topics
          </h3>
          <div className="space-y-1">
            {TOPIC_HIERARCHY.map((topic) => {
              const Icon = topic.icon;
              return (
                <details key={topic.id} className="group">
                  <summary className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-slate-50 list-none">
                    <Icon size={20} className={topic.color} />
                    <span className="flex-1 font-bold text-sm text-slate-700">{topic.name}</span>
                    <ChevronRight size={16} className="text-slate-400 transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="ml-9 mt-1 space-y-1">
                    {topic.subtopics.map((subtopic) => (
                      <Link
                        key={subtopic.id}
                        href={subtopic.href}
                        onClick={onClose}
                        className="block px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-50 hover:text-teal-600"
                      >
                        {subtopic.name}
                      </Link>
                    ))}
                  </div>
                </details>
              );
            })}
          </div>
        </div>

        {/* Resources */}
        <div className="p-4 border-t border-slate-100">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3 px-2">
            Resources
          </h3>
          <div className="space-y-1">
            <Link
              href="/vault"
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                pathname === '/vault'
                  ? 'bg-teal-50 text-teal-700'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Archive size={18} />
              <span className="font-medium text-sm">The Vault</span>
            </Link>
            <Link
              href="/moderation-log"
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                pathname === '/moderation-log'
                  ? 'bg-teal-50 text-teal-700'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Shield size={18} />
              <span className="font-medium text-sm">Moderation Log</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
