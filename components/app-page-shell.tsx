import { AppPageHeader } from '@/components/app-page-header';
import { cn } from '@/lib/utils';

type AppPageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  children: React.ReactNode;
};

export function AppPageShell({
  eyebrow,
  title,
  description,
  action,
  className,
  contentClassName,
  children
}: AppPageShellProps) {
  return (
    <section className={cn('space-y-8', className)}>
      <AppPageHeader eyebrow={eyebrow} title={title} description={description} action={action} />
      <div className={cn('space-y-4', contentClassName)}>{children}</div>
    </section>
  );
}
