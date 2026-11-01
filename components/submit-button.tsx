'use client';

import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SubmitButton({ children, pendingLabel, className }: { children: React.ReactNode; pendingLabel: string; className?: string }) {
  const { pending } = useFormStatus();
  return <Button type="submit" disabled={pending} className={className}>{pending ? <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" /> : null}<span role="status">{pending ? pendingLabel : children}</span></Button>;
}
