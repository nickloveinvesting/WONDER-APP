import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'compact' | 'ghost' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', href, children, className, asChild, fullWidth, ...props }, ref) => {
    const baseStyles = cn(
      "font-black transition-all inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed",
      fullWidth && "w-full"
    );

    const variantStyles = {
      primary: "bg-teal-500 text-white hover:bg-teal-600 shadow-xl hover:shadow-2xl transform hover:-translate-y-1",
      secondary: "border-2 border-slate-300 text-slate-700 hover:border-teal-500 hover:bg-teal-50 shadow-lg",
      outline: "border-2 border-slate-300 text-slate-700 hover:border-teal-500 hover:bg-teal-50 shadow-lg", // alias for secondary
      compact: "bg-teal-500 text-white hover:bg-teal-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
      ghost: "text-slate-700 hover:text-teal-600 transition-colors",
    };

    const sizeStyles: Record<ButtonSize, Record<ButtonVariant, string>> = {
      sm: {
        primary: "px-5 py-1.5 text-sm rounded-lg",
        secondary: "px-5 py-1.5 text-sm rounded-lg",
        outline: "px-5 py-1.5 text-sm rounded-lg",
        compact: "px-4 py-1.5 text-xs rounded-md",
        ghost: "px-3 py-1 text-sm",
      },
      md: {
        primary: "px-8 py-3 text-base rounded-xl",
        secondary: "px-8 py-3 text-base rounded-xl",
        outline: "px-8 py-3 text-base rounded-xl",
        compact: "px-5 py-1.5 text-sm rounded-lg",
        ghost: "px-4 py-2 text-base",
      },
      lg: {
        primary: "px-10 py-4 text-lg rounded-xl",
        secondary: "px-10 py-4 text-lg rounded-xl",
        outline: "px-10 py-4 text-lg rounded-xl",
        compact: "px-6 py-2 text-base rounded-lg",
        ghost: "px-5 py-2.5 text-lg",
      },
    };

    const combinedClassName = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size][variant],
      className
    );

    if (href) {
      return (
        <Link href={href} className={combinedClassName}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={combinedClassName} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
