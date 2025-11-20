/**
 * WONDER Input Component
 * Form inputs with WONDER styling
 * Cream background with navy border
 */

import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-argued-navy mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-4 py-2 rounded-lg
            bg-white border-2
            ${error ? 'border-argued-error' : 'border-argued-navy'}
            text-argued-black
            focus:outline-none focus:ring-2
            ${error ? 'focus:ring-argued-error' : 'focus:ring-argued-brown'}
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-argued-error">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-argued-gray">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-argued-navy mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`
            w-full px-4 py-2 rounded-lg
            bg-white border-2
            ${error ? 'border-argued-error' : 'border-argued-navy'}
            text-argued-black font-serif
            focus:outline-none focus:ring-2
            ${error ? 'focus:ring-argued-error' : 'focus:ring-argued-brown'}
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            resize-vertical
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-argued-error">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-argued-gray">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
