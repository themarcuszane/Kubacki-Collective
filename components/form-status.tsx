'use client';

import { useFormStatus } from 'react-dom';

export function FormStatus({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return <span>{pending ? label : 'Save profile'}</span>;
}
