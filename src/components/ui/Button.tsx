import * as React from 'react';
import { cn } from '@/src/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', ...props }, ref) => {
    const variants = {
      primary: 'editorial-gradient text-on-primary shadow-button hover:opacity-90',
      secondary: 'bg-surface-container-low text-primary hover:bg-surface-container-high',
      tertiary: 'text-primary hover:underline underline-offset-4',
      ghost: 'hover:bg-surface-container-low text-on-surface-variant',
    };

    const sizes = {
      default: 'h-12 px-6 py-2',
      sm: 'h-9 px-3',
      lg: 'h-14 px-8 text-lg',
      icon: 'h-10 w-10',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-bold transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
