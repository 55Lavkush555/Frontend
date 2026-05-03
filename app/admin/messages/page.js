'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMessages = () => {
    setError('');
    fetch('/api/messages')
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setMessages(data.messages || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch messages:', err);
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markRead = async (id) => {
    const res = await fetch('/api/messages', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) {
      const data = await res.json();
      alert(data.error || 'Failed to mark as read');
      return;
    }
    fetchMessages();
  };

  const deleteMessage = async (id) => {
    if (!confirm('Delete this message?')) return;
    const res = await fetch(`/api/messages?id=${id}`, { method: 'DELETE' });
    if (!res.ok) {
      const data = await res.json();
      alert(data.error || 'Failed to delete');
      return;
    }
    fetchMessages();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/dashboard"
            className="text-sm text-gray-400 hover:text-black transition-colors"
          >
            ← Dashboard
          </Link>
          <span className="text-gray-200">/</span>
          <h1 className="text-base font-semibold text-black">Messages</h1>
        </div>
        <button
          onClick={fetchMessages}
          className="text-xs text-gray-400 hover:text-black transition-colors border border-gray-200 px-3 py-1.5 rounded-lg"
        >
          Refresh
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 mb-6">
            <p className="text-red-600 text-sm font-medium">Error loading messages</p>
            <p className="text-red-500 text-xs mt-1">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-xl h-28 animate-pulse" />
            ))}
          </div>
        ) : messages.length === 0 ? (
          <div className="border border-dashed border-gray-200 rounded-xl p-16 text-center">
            <p className="text-gray-400 text-sm">No messages yet.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`bg-white border rounded-xl p-6 ${
                  msg.read ? 'border-gray-100' : 'border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="text-sm font-semibold text-black">{msg.name}</p>
                      {!msg.read && (
                        <span className="text-xs bg-black text-white px-2 py-0.5 rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mb-3">{msg.email}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{msg.message}</p>
                    <p className="text-xs text-gray-300 mt-3">
                      {new Date(msg.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    {!msg.read && (
                      <button
                        onClick={() => markRead(msg._id)}
                        className="text-xs text-gray-400 hover:text-black transition-colors whitespace-nowrap"
                      >
                        Mark read
                      </button>
                    )}
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-xs text-gray-400 hover:text-black transition-colors"
                    >
                      Reply
                    </a>
                    <button
                      onClick={() => deleteMessage(msg._id)}
                      className="text-xs text-red-400 hover:text-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
