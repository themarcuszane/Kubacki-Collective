import Link from 'next/link';

export function AuthShell({
  title,
  description,
  children
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8 sm:px-8 lg:px-10">
      <header className="flex items-center justify-between py-4">
        <Link href="/" className="border-none text-lg font-semibold tracking-tight text-white">
          CareerOS
        </Link>
      </header>
      <section className="flex flex-1 items-center justify-center py-16">
        <div className="grid w-full max-w-5xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-400">CareerOS</p>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h1>
            <p className="max-w-xl text-lg leading-8 text-slate-300">{description}</p>
          </div>
          <div className="flex justify-center lg:justify-end">{children}</div>
        </div>
      </section>
    </main>
  );
}
