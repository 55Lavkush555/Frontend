import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-40 text-center fade-in">
      <h1 className="text-7xl font-bold text-black mb-4">404</h1>
      <p className="text-gray-400 mb-8">This page doesn't exist.</p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
      >
        ← Go Home
      </Link>
    </div>
  );
}
