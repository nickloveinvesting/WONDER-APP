/**
 * WONDER Debates List Page Template
 * Browse all debates with filtering and search
 */

import { useState } from 'react';
import { DebateCard } from '../ui/DebateCard';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Search, Filter, Plus } from 'lucide-react';
import Link from 'next/link';

interface Debate {
  id: string;
  topic: string;
  description: string;
  forCount: number;
  againstCount: number;
  participants: number;
  status: 'open' | 'in_progress' | 'completed';
  featured?: boolean;
}

interface DebatesListProps {
  debates: Debate[];
  totalDebates: number;
  currentPage: number;
  totalPages: number;
}

export function DebatesListTemplate({
  debates,
  totalDebates,
  currentPage,
  totalPages,
}: DebatesListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'in_progress' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'featured'>('recent');

  return (
    <div className="min-h-screen bg-argued-cream">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-argued-navy mb-2 font-sans">
              All Debates
            </h1>
            <p className="text-argued-gray">
              {totalDebates} active {totalDebates === 1 ? 'debate' : 'debates'}
            </p>
          </div>
          <Link href="/debates/create">
            <Button variant="primary" size="lg">
              <Plus className="inline mr-2" size={20} />
              Create Debate
            </Button>
          </Link>
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-lg p-6 shadow-md mb-8 border-l-4 border-l-argued-navy">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-argued-gray"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search debates by topic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-2 border-argued-navy rounded-lg focus:outline-none focus:ring-2 focus:ring-argued-brown"
                />
              </div>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-4 py-2 border-2 border-argued-navy rounded-lg focus:outline-none focus:ring-2 focus:ring-argued-brown bg-white"
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
                <option value="featured">Featured</option>
              </select>
            </div>
          </div>

          {/* Status Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filterStatus === 'all'
                  ? 'bg-argued-navy text-white'
                  : 'bg-argued-cream text-argued-navy hover:bg-argued-navy/10'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus('open')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filterStatus === 'open'
                  ? 'bg-argued-navy text-white'
                  : 'bg-argued-cream text-argued-navy hover:bg-argued-navy/10'
              }`}
            >
              Open
            </button>
            <button
              onClick={() => setFilterStatus('in_progress')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filterStatus === 'in_progress'
                  ? 'bg-argued-navy text-white'
                  : 'bg-argued-cream text-argued-navy hover:bg-argued-navy/10'
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filterStatus === 'completed'
                  ? 'bg-argued-navy text-white'
                  : 'bg-argued-cream text-argued-navy hover:bg-argued-navy/10'
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Debates Grid */}
        {debates.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {debates.map((debate) => (
              <DebateCard
                key={debate.id}
                {...debate}
                onClick={() => {}}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <div className="text-6xl mb-4">💭</div>
            <h3 className="text-2xl font-bold text-argued-navy mb-2 font-sans">
              No Debates Found
            </h3>
            <p className="text-argued-gray mb-6 font-serif">
              Be the first to create a debate on this topic!
            </p>
            <Link href="/debates/create">
              <Button variant="primary">Create First Debate</Button>
            </Link>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            {currentPage > 1 && (
              <Button variant="outline" size="sm">
                ← Previous
              </Button>
            )}

            <div className="flex gap-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(1, Math.min(currentPage - 2, totalPages - 4)) + i;
                if (pageNum > totalPages) return null;

                return (
                  <button
                    key={pageNum}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      pageNum === currentPage
                        ? 'bg-argued-navy text-white'
                        : 'bg-white text-argued-navy hover:bg-argued-cream'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            {currentPage < totalPages && (
              <Button variant="outline" size="sm">
                Next →
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
