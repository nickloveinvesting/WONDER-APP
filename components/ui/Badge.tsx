/**
 * ARGUED Badge Component
 * Used for status indicators, achievements, and ratings
 * Supports multiple color types per branding guidelines
 */

import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  type?: 'default' | 'achievement' | 'rating' | 'success' | 'error' | 'for' | 'against';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Badge({
  children,
  type = 'default',
  size = 'md',
  className = '',
}: BadgeProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-full font-medium';

  const typeClasses = {
    default: 'bg-argued-navy text-white',
    achievement: 'bg-argued-brown text-white',
    rating: 'bg-argued-gold text-argued-black',
    success: 'bg-argued-success text-white',
    error: 'bg-argued-error text-white',
    for: 'bg-argued-success/20 text-argued-success border border-argued-success/30',
    against: 'bg-argued-error/20 text-argued-error border border-argued-error/30',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span
      className={`
        ${baseClasses}
        ${typeClasses[type]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
