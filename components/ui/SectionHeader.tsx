import React from 'react';
import { cn } from '@/lib/utils';

export type SectionHeaderSize = 'hero' | 'section' | 'subsection';

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: SectionHeaderSize;
  title: string;
  description?: string;
  badge?: string;
  className?: string;
  align?: 'left' | 'center';
}

const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ size = 'section', title, description, badge, className, align = 'left', ...props }, ref) => {
    const containerClassName = cn(
      align === 'center' ? 'text-center' : 'text-left',
      className
    );

    const titleStyles = {
      hero: "text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 leading-tight tracking-tight",
      section: "text-4xl lg:text-5xl font-black text-slate-900 tracking-tight",
      subsection: "text-2xl lg:text-3xl font-black text-slate-900",
    };

    const descriptionStyles = {
      hero: "text-xl lg:text-2xl text-slate-600 leading-relaxed font-medium",
      section: "text-xl text-slate-600 font-medium",
      subsection: "text-lg text-slate-600 font-medium",
    };

    const spacingStyles = {
      hero: "mb-6",
      section: "mb-4",
      subsection: "mb-3",
    };

    return (
      <div ref={ref} className={containerClassName} {...props}>
        {badge && (
          <div className={cn(
            "inline-flex items-center px-4 py-2 bg-teal-50 border border-teal-200 rounded-full mb-6",
            align === 'center' ? 'mx-auto' : ''
          )}>
            <span className="text-sm font-bold text-slate-700">
              {badge}
            </span>
          </div>
        )}
        
        <h2 className={cn(titleStyles[size], spacingStyles[size])}>
          {title}
        </h2>
        
        {description && (
          <p className={descriptionStyles[size]}>
            {description}
          </p>
        )}
      </div>
    );
  }
);

SectionHeader.displayName = 'SectionHeader';

export { SectionHeader };
