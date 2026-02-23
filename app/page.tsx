import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-3xl font-semibold">Kubacki Collective</h1>
      <p className="mt-3 text-zinc-700">Landing placeholder.</p>
      <nav className="mt-6 flex flex-col gap-2">
        <Link className="text-blue-700 underline" href="/collective">/collective</Link>
        <Link className="text-blue-700 underline" href="/chapters">/chapters</Link>
        <Link className="text-blue-700 underline" href="/journal">/journal</Link>
      </nav>
    </main>
  );
}
