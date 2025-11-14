/**
 * ARGUED Stat Card Component
 * Used for displaying statistics (debates, win rate, etc.)
 */

import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  variant?: 'default' | 'success' | 'error' | 'achievement';
  trend?: {
    value: number;
    label: string;
  };
}

export function StatCard({
  label,
  value,
  icon: Icon,
  variant = 'default',
  trend,
}: StatCardProps) {
  const variantClasses = {
    default: 'border-l-argued-navy',
    success: 'border-l-argued-success',
    error: 'border-l-argued-error',
    achievement: 'border-l-argued-brown',
  };

  const iconBgClasses = {
    default: 'bg-argued-navy/10 text-argued-navy',
    success: 'bg-argued-success/10 text-argued-success',
    error: 'bg-argued-error/10 text-argued-error',
    achievement: 'bg-argued-brown/10 text-argued-brown',
  };

  return (
    <div
      className={`
        bg-white rounded-lg p-6 border-l-4 shadow-md
        ${variantClasses[variant]}
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-argued-gray text-sm mb-1">{label}</p>
          <p className="text-3xl font-bold text-argued-black">{value}</p>
          {trend && (
            <p
              className={`text-sm mt-2 ${
                trend.value >= 0 ? 'text-argued-success' : 'text-argued-error'
              }`}
            >
              {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)} {trend.label}
            </p>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-lg ${iconBgClasses[variant]}`}>
            <Icon size={24} />
          </div>
        )}
      </div>
    </div>
  );
}
