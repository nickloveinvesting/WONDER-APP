import React from 'react';
import { cn } from '@/lib/utils';

export type BadgeVariant = 'social' | 'topic' | 'status' | 'stat';
export type BadgeColor = 'teal' | 'slate' | 'neutral' | 'red' | 'amber' | 'green';
export type BadgeType = 'rating' | 'social' | 'topic' | 'status' | 'stat' | 'success' | 'error' | 'achievement' | 'default' | 'for' | 'against';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  color?: BadgeColor;
  type?: BadgeType;
  size?: BadgeSize;
  children: React.ReactNode;
  className?: string;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'topic', color = 'teal', type, size = 'md', children, className, ...props }, ref) => {
    // Support legacy 'type' prop by mapping it to variant
    const typeToVariant: Record<string, string> = {
      'rating': 'stat',
      'success': 'status',
      'error': 'status',
      'achievement': 'stat',
      'default': 'topic',
      'for': 'topic',
      'against': 'topic',
    };
    const effectiveVariant = type ? (typeToVariant[type] || type) : variant;

    const baseStyles = "inline-flex items-center font-bold transition-colors";

    const sizeStyles = {
      sm: "text-xs px-2 py-0.5",
      md: "text-sm px-3 py-1",
      lg: "text-base px-4 py-1.5",
    };

    const variantStyles: Record<string, string> = {
      social: "px-4 py-2 rounded-full border",
      topic: "px-2 py-1 rounded border text-xs",
      status: "px-2 py-1 rounded text-xs",
      stat: "rounded-full",
      rating: "rounded-full",
      success: "px-2 py-1 rounded text-xs",
      error: "px-2 py-1 rounded text-xs",
      achievement: "rounded-full",
      default: "px-2 py-1 rounded border text-xs",
      for: "px-2 py-1 rounded border text-xs",
      against: "px-2 py-1 rounded border text-xs",
    };

    const colorStyles: Record<string, Record<string, string>> = {
      teal: {
        social: "bg-teal-50 border-teal-200 text-slate-700",
        topic: "bg-teal-100 text-teal-700 border-teal-300",
        status: "bg-teal-50 text-teal-600",
        stat: "bg-teal-500/20 text-teal-600",
        rating: "bg-teal-500/20 text-teal-600",
        success: "bg-green-50 text-green-600",
        error: "bg-red-50 text-red-600",
        achievement: "bg-yellow-500/20 text-yellow-700",
        default: "bg-slate-100 text-slate-700 border-slate-300",
        for: "bg-green-100 text-green-700 border-green-300",
        against: "bg-red-100 text-red-700 border-red-300",
      },
      slate: {
        social: "bg-slate-50 border-slate-200 text-slate-700",
        topic: "bg-slate-100 text-slate-700 border-slate-300",
        status: "bg-slate-50 text-slate-600",
        stat: "bg-slate-500/20 text-slate-600",
        rating: "bg-slate-500/20 text-slate-600",
        success: "bg-green-50 text-green-600",
        error: "bg-red-50 text-red-600",
        achievement: "bg-yellow-500/20 text-yellow-700",
        default: "bg-slate-100 text-slate-700 border-slate-300",
        for: "bg-green-100 text-green-700 border-green-300",
        against: "bg-red-100 text-red-700 border-red-300",
      },
      neutral: {
        social: "bg-stone-50 border-stone-200 text-slate-700",
        topic: "bg-stone-100 text-slate-700 border-stone-300",
        status: "bg-stone-50 text-slate-600",
        stat: "bg-stone-500/20 text-slate-600",
        rating: "bg-stone-500/20 text-slate-600",
        success: "bg-green-50 text-green-600",
        error: "bg-red-50 text-red-600",
        achievement: "bg-yellow-500/20 text-yellow-700",
        default: "bg-slate-100 text-slate-700 border-slate-300",
        for: "bg-green-100 text-green-700 border-green-300",
        against: "bg-red-100 text-red-700 border-red-300",
      },
      red: {
        social: "bg-red-50 border-red-200 text-red-700",
        topic: "bg-red-100 text-red-700 border-red-300",
        status: "bg-red-50 text-red-600",
        stat: "bg-red-500/20 text-red-600",
        rating: "bg-red-500/20 text-red-600",
        success: "bg-green-50 text-green-600",
        error: "bg-red-50 text-red-600",
        achievement: "bg-yellow-500/20 text-yellow-700",
        default: "bg-red-100 text-red-700 border-red-300",
        for: "bg-green-100 text-green-700 border-green-300",
        against: "bg-red-100 text-red-700 border-red-300",
      },
      amber: {
        social: "bg-amber-50 border-amber-200 text-amber-700",
        topic: "bg-amber-100 text-amber-700 border-amber-300",
        status: "bg-amber-50 text-amber-600",
        stat: "bg-amber-500/20 text-amber-600",
        rating: "bg-amber-500/20 text-amber-600",
        success: "bg-green-50 text-green-600",
        error: "bg-red-50 text-red-600",
        achievement: "bg-yellow-500/20 text-yellow-700",
        default: "bg-amber-100 text-amber-700 border-amber-300",
        for: "bg-green-100 text-green-700 border-green-300",
        against: "bg-red-100 text-red-700 border-red-300",
      },
      green: {
        social: "bg-green-50 border-green-200 text-green-700",
        topic: "bg-green-100 text-green-700 border-green-300",
        status: "bg-green-50 text-green-600",
        stat: "bg-green-500/20 text-green-600",
        rating: "bg-green-500/20 text-green-600",
        success: "bg-green-50 text-green-600",
        error: "bg-red-50 text-red-600",
        achievement: "bg-yellow-500/20 text-yellow-700",
        default: "bg-green-100 text-green-700 border-green-300",
        for: "bg-green-100 text-green-700 border-green-300",
        against: "bg-red-100 text-red-700 border-red-300",
      },
    };

    const combinedClassName = cn(
      baseStyles,
      variantStyles[effectiveVariant] || variantStyles.topic,
      (effectiveVariant === 'stat' || effectiveVariant === 'rating' || effectiveVariant === 'achievement') ? sizeStyles[size] : '',
      colorStyles[color]?.[effectiveVariant] || colorStyles.teal.topic,
      className
    );

    return (
      <span ref={ref} className={combinedClassName} {...props}>
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
