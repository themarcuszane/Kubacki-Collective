import * as React from 'react';
import { cn } from '@/lib/utils';

const buttonVariants = {
  default: 'bg-sky-300 text-slate-950 shadow-sm shadow-sky-950/20 hover:bg-sky-200',
  secondary: 'bg-slate-800 text-slate-100 hover:bg-slate-700',
  ghost: 'bg-transparent text-slate-200 hover:bg-slate-900/80 hover:text-white',
  outline: 'border border-slate-700 bg-transparent text-slate-100 hover:bg-slate-900'
} as const;

const buttonSizes = {
  default: 'h-10 px-4 py-2',
  lg: 'h-12 px-6 text-sm',
  sm: 'h-9 px-3 text-sm'
} as const;

export function buttonClassName({
  variant = 'default',
  size = 'default',
  className
}: {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  className?: string;
}) {
  return cn(
    'inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-transparent text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-50',
    buttonVariants[variant],
    buttonSizes[size],
    className
  );
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={buttonClassName({
          variant,
          size,
          className
        })}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
