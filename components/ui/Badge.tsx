// components/ui/Badge.tsx
import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'neutral';
  className?: string;
}

export const Badge = ({ children, variant = 'primary', className = '' }: BadgeProps) => {
  const variantClasses = {
    primary: 'bg-primary text-on-primary',
    secondary: 'bg-secondary text-on-secondary',
    tertiary: 'bg-tertiary text-on-tertiary',
    neutral: 'bg-slate-200 text-slate-800',
  };

  return (
    <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;