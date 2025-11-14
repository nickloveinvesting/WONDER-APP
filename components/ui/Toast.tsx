/**
 * ARGUED Toast Notification Component
 * Success (green), Error (red), Info (navy)
 */

'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose?: () => void;
}

export function Toast({
  message,
  type = 'success',
  duration = 5000,
  onClose,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const configs = {
    success: {
      bg: 'bg-argued-success',
      icon: CheckCircle,
    },
    error: {
      bg: 'bg-argued-error',
      icon: XCircle,
    },
    info: {
      bg: 'bg-argued-navy',
      icon: Info,
    },
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div
      className={`
        fixed bottom-4 right-4 z-50
        ${config.bg} text-white
        px-4 py-3 rounded-lg shadow-lg
        flex items-center gap-3
        animate-slide-up
      `}
    >
      <Icon size={20} />
      <span className="font-medium">{message}</span>
      <button
        onClick={() => {
          setIsVisible(false);
          onClose?.();
        }}
        className="ml-2 hover:bg-white/20 rounded-full p-1 transition"
      >
        <X size={16} />
      </button>
    </div>
  );
}

/**
 * Toast Container for managing multiple toasts
 */
export function ToastContainer({ toasts }: { toasts: ToastProps[] }) {
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast, index) => (
        <Toast key={index} {...toast} />
      ))}
    </div>
  );
}
