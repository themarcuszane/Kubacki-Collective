import Link from 'next/link';
import { SubmitButton } from '@/components/submit-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type AuthFormProps = {
  title: string;
  description: string;
  action: (formData: FormData) => Promise<void>;
  submitLabel: string;
  footerText: string;
  footerHref: string;
  footerLinkLabel: string;
  mode?: 'sign-in' | 'sign-up';
};

export function AuthForm({
  title,
  description,
  action,
  submitLabel,
  footerText,
  footerHref,
  footerLinkLabel,
  mode = 'sign-in'
}: AuthFormProps) {
  return (
    <Card className="w-full max-w-md border-slate-800/80 bg-slate-900/80 shadow-2xl shadow-slate-950/30">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" autoComplete="email" required placeholder="you@company.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete={mode === 'sign-up' ? 'new-password' : 'current-password'}
              required
              minLength={6}
              placeholder="At least 6 characters"
            />
          </div>
          <SubmitButton pendingLabel={mode === 'sign-up' ? 'Creating account…' : 'Signing in…'} className="w-full">
            {submitLabel}
          </SubmitButton>
        </form>
        <p className="mt-6 border-t border-slate-800 pt-5 text-center text-sm leading-6 text-slate-400">
          {footerText}{' '}
          <Link href={footerHref} className="border-none font-medium text-sky-300 hover:text-sky-200">
            {footerLinkLabel}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
