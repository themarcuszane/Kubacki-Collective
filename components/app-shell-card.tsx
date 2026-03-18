import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type AppShellCardProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function AppShellCard({ title, description, children }: AppShellCardProps) {
  return (
    <Card className="border-slate-800/80 bg-slate-900/70 shadow-sm shadow-black/10">
      <CardHeader className="pb-4">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
