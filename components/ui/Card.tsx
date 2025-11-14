/**
 * ARGUED Card Component
 * Used for debates, profiles, and content containers
 * Features navy/brown left border accent
 */

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'highlight' | 'navy' | 'success' | 'error';
  hoverable?: boolean;
  className?: string;
  onClick?: () => void;
}

export function Card({
  children,
  variant = 'default',
  hoverable = false,
  className = '',
  onClick,
}: CardProps) {
  const baseClasses = 'bg-white rounded-lg p-6 border-l-4 shadow-md transition-all duration-200';

  const variantClasses = {
    default: 'border-l-argued-navy',
    highlight: 'border-l-argued-brown shadow-lg',
    navy: 'border-l-argued-navy bg-argued-navy/5',
    success: 'border-l-argued-success bg-argued-success/5',
    error: 'border-l-argued-error bg-argued-error/5',
  };

  const hoverClasses = hoverable ? 'hover:shadow-xl hover:border-l-argued-brown cursor-pointer' : '';

  return (
    <div
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${hoverClasses}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
