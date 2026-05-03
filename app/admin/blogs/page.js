'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { marked } from 'marked';

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingSlug, setEditingSlug] = useState(null);
  const [form, setForm] = useState({ title: '', imageUrl: '', content: '' });
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(false);
  const [message, setMessage] = useState('');

  const fetchBlogs = () => {
    fetch('/api/blogs')
      .then((r) => r.json())
      .then((data) => {
        setBlogs(data.blogs || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch blogs:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({ title: '', imageUrl: '', content: '' });
    setEditingSlug(null);
    setShowForm(false);
    setPreview(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setMessage('');

    try {
      const isEditing = !!editingSlug;
      const res = await fetch(isEditing ? `/api/blog/${editingSlug}` : '/api/blogs', {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save blog');
      setMessage(isEditing ? 'Blog updated successfully' : 'Blog created successfully');
      resetForm();
      fetchBlogs();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const deleteBlog = async (slug) => {
    if (!confirm('Delete this blog post?')) return;
    const res = await fetch(`/api/blog/${slug}`, { method: 'DELETE' });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || 'Failed to delete');
      return;
    }
    setMessage('Blog deleted successfully');
    fetchBlogs();
  };

  const editBlog = (blog) => {
    setEditingSlug(blog.slug);
    setForm({ title: blog.title || '', imageUrl: blog.imageUrl || '', content: blog.content || '' });
    setError('');
    setMessage('');
    setPreview(false);
    setShowForm(true);
  };

  const previewHtml = form.content ? marked(form.content) : '';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard" className="text-sm text-gray-400 hover:text-black transition-colors">
            ← Dashboard
          </Link>
          <span className="text-gray-200">/</span>
          <h1 className="text-base font-semibold text-black">Blog Posts</h1>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setError(''); setPreview(false); if (showForm) resetForm(); }}
          className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
        >
          {showForm ? 'Cancel' : '+ New Post'}
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {message && (
          <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 mb-6">
            <p className="text-green-700 text-sm">{message}</p>
          </div>
        )}
        {showForm && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-black">
                {editingSlug ? 'Edit Blog Post' : 'New Blog Post'}
              </h2>
              <button
                type="button"
                onClick={() => setPreview(!preview)}
                className="text-xs text-gray-400 hover:text-black transition-colors border border-gray-200 px-3 py-1.5 rounded-lg"
              >
                {preview ? 'Edit' : 'Preview Markdown'}
              </button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Title *</label>
                <input type="text" name="title" required value={form.title} onChange={handleChange} placeholder="Blog post title" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-gray-400 transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Image URL</label>
                <input type="url" name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="https://example.com/image.jpg" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-gray-400 transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Content (Markdown) *</label>
                {preview ? (
                  <div className="prose min-h-40 border border-gray-200 rounded-lg p-4 bg-gray-50 overflow-auto" dangerouslySetInnerHTML={{ __html: previewHtml || '<p style="color:#9ca3af">Nothing to preview yet.</p>' }} />
                ) : (
                  <textarea name="content" required rows={12} value={form.content} onChange={handleChange} placeholder="Write your blog post in Markdown..." className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm font-mono outline-none focus:border-gray-400 transition-colors resize-none" />
                )}
              </div>
              {error && <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3"><p className="text-red-600 text-sm">{error}</p></div>}
              <button type="submit" disabled={submitting} className="w-full bg-black text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50">{submitting ? 'Saving...' : editingSlug ? 'Update Post' : 'Publish Post'}</button>
            </form>
          </div>
        )}
        {loading ? (
          <div className="flex flex-col gap-4">{[1, 2, 3].map((i) => (<div key={i} className="bg-white border border-gray-100 rounded-xl h-20 animate-pulse" />))}</div>
        ) : blogs.length === 0 ? (
          <div className="border border-dashed border-gray-200 rounded-xl p-16 text-center"><p className="text-gray-400 text-sm">No blog posts yet. Create your first one!</p></div>
        ) : (
          <div className="flex flex-col gap-3">
            {blogs.map((blog) => (
              <div key={blog._id} className="bg-white border border-gray-100 rounded-xl px-6 py-4 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-black truncate">{blog.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}{' · '}<span className="font-mono">/blog/{blog.slug}</span></p>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => editBlog(blog)} className="text-xs text-gray-400 hover:text-black transition-colors">Edit</button>
                  <Link href={`/blog/${blog.slug}`} target="_blank" className="text-xs text-gray-400 hover:text-black transition-colors">View ↗</Link>
                  <button onClick={() => deleteBlog(blog.slug)} className="text-xs text-red-400 hover:text-red-600 transition-colors">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
