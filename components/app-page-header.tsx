import { cn } from '@/lib/utils';

type AppPageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
};

export function AppPageHeader({ eyebrow, title, description, action, className }: AppPageHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-4 border-b border-slate-800/80 pb-6 md:flex-row md:items-end md:justify-between', className)}>
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500">{eyebrow}</p>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h1>
        <p className="max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">{description}</p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
