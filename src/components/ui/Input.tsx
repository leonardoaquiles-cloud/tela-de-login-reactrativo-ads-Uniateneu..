import * as React from 'react';
import { cn } from '@/src/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="relative w-full group">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            'flex h-14 w-full rounded-xl bg-surface-container-highest px-4 py-2 text-sm transition-all focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/10 outline-none placeholder:text-on-surface-variant/60',
            icon && 'pl-12',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';
