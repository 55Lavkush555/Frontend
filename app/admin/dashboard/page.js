'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({ blogs: 0, projects: 0, messages: 0, unread: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/blogs').then((r) => r.json()),
      fetch('/api/projects').then((r) => r.json()),
      fetch('/api/messages').then((r) => r.json()),
    ])
      .then(([blogs, projects, messages]) => {
        const msgList = messages.data?.messages || [];
        setStats({
          blogs: blogs.data?.blogs?.length || 0,
          projects: projects.data?.projects?.length || 0,
          messages: msgList.length,
          unread: msgList.filter((m) => !m.read).length,
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' });
    router.push('/admin');
  };

  const cards = [
    { label: 'Blog Posts', count: stats.blogs, href: '/admin/blogs', icon: '✍️' },
    { label: 'Projects', count: stats.projects, href: '/admin/projects', icon: '🗂️' },
    {
      label: 'Messages',
      count: stats.messages,
      badge: stats.unread > 0 ? `${stats.unread} new` : null,
      href: '/admin/messages',
      icon: '💬',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <h1 className="text-base font-semibold text-black">Admin Dashboard</h1>
        <div className="flex items-center gap-5">
          <Link href="/" className="text-sm text-gray-400 hover:text-black transition-colors">
            ← View Site
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-400 hover:text-red-500 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <p className="text-gray-400 text-sm mb-8">Welcome back, Lavkush</p>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl h-32 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cards.map((card) => (
              <Link
                key={card.label}
                href={card.href}
                className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-gray-300 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{card.icon}</span>
                  {card.badge && (
                    <span className="text-xs bg-black text-white px-2 py-0.5 rounded-full">
                      {card.badge}
                    </span>
                  )}
                </div>
                <div className="text-3xl font-bold text-black mb-1">{card.count}</div>
                <div className="text-sm text-gray-400">{card.label}</div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/blogs"
            className="flex items-center gap-3 px-5 py-3.5 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            <span>+</span> New Blog Post
          </Link>
          <Link
            href="/admin/projects"
            className="flex items-center gap-3 px-5 py-3.5 border border-gray-200 text-black rounded-xl text-sm font-medium hover:border-gray-400 transition-colors"
          >
            <span>+</span> New Project
          </Link>
          <Link
            href="/admin/messages"
            className="flex items-center gap-3 px-5 py-3.5 border border-gray-200 text-black rounded-xl text-sm font-medium hover:border-gray-400 transition-colors"
          >
            View Messages
          </Link>
        </div>
      </div>
    </div>
  );
}
