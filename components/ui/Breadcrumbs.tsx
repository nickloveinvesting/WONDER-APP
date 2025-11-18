/**
 * Breadcrumbs Component
 * Shows navigation hierarchy for deep pages
 */

'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  showHome?: boolean;
};

export function Breadcrumbs({ items, showHome = true }: BreadcrumbsProps) {
  const allItems = showHome
    ? [{ label: 'Home', href: '/debates' }, ...items]
    : items;

  return (
    <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
      {allItems.map((item, index) => {
        const isLast = index === allItems.length - 1;

        return (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-slate-400" />
            )}

            {item.href && !isLast ? (
              <Link
                href={item.href}
                prefetch={true}
                className="font-medium text-slate-600 hover:text-teal-600 transition-colors"
              >
                {index === 0 && showHome ? (
                  <Home className="w-4 h-4" />
                ) : (
                  item.label
                )}
              </Link>
            ) : (
              <span
                className={`font-bold ${
                  isLast ? 'text-slate-900' : 'text-slate-600'
                }`}
              >
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
