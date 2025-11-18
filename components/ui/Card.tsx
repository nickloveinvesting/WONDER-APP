import React from 'react';
import { cn } from '@/lib/utils';

export type CardVariant = 'standard' | 'gradient' | 'lift' | 'accent' | 'navy' | 'highlight' | 'success' | 'error';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  accentColor?: 'teal' | 'slate';
  children: React.ReactNode;
  className?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'standard', accentColor = 'teal', children, className, ...props }, ref) => {
    const baseStyles = "rounded-xl transition-all duration-300 ease-out focus-within:ring-2 focus-within:ring-teal-500 focus-within:ring-offset-2";

    const variantStyles: Record<CardVariant, string> = {
      standard: "bg-white p-6 shadow-xl hover:shadow-2xl border border-slate-200 hover:border-teal-200",
      gradient: "bg-gradient-to-br from-stone-50 to-white p-8 border-2 border-slate-200 shadow-lg hover:shadow-xl",
      lift: "bg-white p-8 shadow-lg border-2 border-slate-200 hover:shadow-2xl hover:-translate-y-2 hover:border-teal-200 cursor-pointer",
      accent: "bg-gradient-to-br from-stone-50 to-white p-8 border-2 border-slate-200 shadow-lg hover:shadow-xl",
      navy: "bg-slate-900 text-white p-6 shadow-xl hover:shadow-2xl border border-slate-700 hover:border-slate-600",
      highlight: "bg-teal-50 p-6 shadow-lg hover:shadow-xl border-2 border-teal-200 hover:border-teal-300",
      success: "bg-green-50 p-6 shadow-lg border-2 border-green-200 hover:border-green-300",
      error: "bg-red-50 p-6 shadow-lg border-2 border-red-200 hover:border-red-300",
    };

    const accentBorderStyles = {
      teal: "border-t-4 border-t-teal-500",
      slate: "border-t-4 border-t-slate-700",
    };

    const combinedClassName = cn(
      baseStyles,
      variantStyles[variant],
      variant === 'accent' && accentBorderStyles[accentColor],
      className
    );

    return (
      <div ref={ref} className={combinedClassName} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("mb-4", className)} {...props}>
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <h3 ref={ref} className={cn("text-xl font-black text-slate-900 mb-2", className)} {...props}>
        {children}
      </h3>
    );
  }
);

CardTitle.displayName = 'CardTitle';

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <p ref={ref} className={cn("text-sm text-slate-600 leading-relaxed", className)} {...props}>
        {children}
      </p>
    );
  }
);

CardDescription.displayName = 'CardDescription';

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    );
  }
);

CardContent.displayName = 'CardContent';

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("mt-4 pt-4 border-t border-slate-200", className)} {...props}>
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
