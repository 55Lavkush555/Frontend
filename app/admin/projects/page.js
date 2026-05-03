'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingSlug, setEditingSlug] = useState(null);
  const [form, setForm] = useState({ name: '', imageUrl: '', description: '', githubUrl: '', liveUrl: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const fetchProjects = () => {
    fetch('/api/projects')
      .then((r) => r.json())
      .then((data) => {
        setProjects(data.projects || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch projects:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: val });
  };

  const resetForm = () => {
    setForm({ name: '', imageUrl: '', description: '', githubUrl: '', liveUrl: '' });
    setEditingSlug(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setMessage('');

    try {
      const isEditing = !!editingSlug;
      const res = await fetch(isEditing ? `/api/project/${editingSlug}` : '/api/projects', {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save project');
      setMessage(isEditing ? 'Project updated successfully' : 'Project created successfully');
      resetForm();
      fetchProjects();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const deleteProject = async (slug) => {
    if (!confirm('Delete this project?')) return;
    const res = await fetch(`/api/project/${slug}`, { method: 'DELETE' });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || 'Failed to delete');
      return;
    }
    setMessage('Project deleted successfully');
    fetchProjects();
  };

  const editProject = (project) => {
    setEditingSlug(project.slug);
    setForm({
      name: project.name || '',
      imageUrl: project.imageUrl || '',
      description: project.description || '',
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
    });
    setError('');
    setMessage('');
    setShowForm(true);
  };

  const toggleFeatured = async (project) => {
    setError('');
    setMessage('');
    const res = await fetch(`/api/project/${project.slug}/featured`, { method: 'PATCH' });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Failed to toggle featured');
      return;
    }
    setMessage(data.project.featured ? 'Marked as featured' : 'Removed from featured');
    fetchProjects();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard" className="text-sm text-gray-400 hover:text-black transition-colors">← Dashboard</Link>
          <span className="text-gray-200">/</span>
          <h1 className="text-base font-semibold text-black">Projects</h1>
        </div>
        <button onClick={() => { setShowForm(!showForm); setError(''); setMessage(''); if (showForm) resetForm(); }} className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800 transition-colors">{showForm ? 'Cancel' : '+ Add Project'}</button>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {message && <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 mb-6"><p className="text-green-700 text-sm">{message}</p></div>}
        {showForm && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
            <h2 className="text-base font-semibold text-black mb-5">{editingSlug ? 'Edit Project' : 'New Project'}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Project Name *</label><input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="My Awesome Project" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-gray-400 transition-colors" /></div>
                <div><label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Image URL</label><input type="url" name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="https://example.com/image.jpg" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-gray-400 transition-colors" /></div>
                <div><label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">GitHub URL</label><input type="url" name="githubUrl" value={form.githubUrl} onChange={handleChange} placeholder="https://github.com/..." className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-gray-400 transition-colors" /></div>
                <div><label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Live URL</label><input type="url" name="liveUrl" value={form.liveUrl} onChange={handleChange} placeholder="https://myproject.com" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-gray-400 transition-colors" /></div>
              </div>
              <div><label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Description (Markdown) *</label><textarea name="description" required rows={8} value={form.description} onChange={handleChange} placeholder="Describe your project in Markdown..." className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm font-mono outline-none focus:border-gray-400 transition-colors resize-none" /></div>
              {error && <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3"><p className="text-red-600 text-sm">{error}</p></div>}
              <button type="submit" disabled={submitting} className="w-full bg-black text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50">{submitting ? 'Saving...' : editingSlug ? 'Update Project' : 'Add Project'}</button>
            </form>
          </div>
        )}

        {loading ? <div className="flex flex-col gap-4">{[1, 2, 3].map((i) => (<div key={i} className="bg-white border border-gray-100 rounded-xl h-20 animate-pulse" />))}</div> : projects.length === 0 ? <div className="border border-dashed border-gray-200 rounded-xl p-16 text-center"><p className="text-gray-400 text-sm">No projects yet. Add your first one!</p></div> : (
          <div className="flex flex-col gap-3">
            {projects.map((project) => (
              <div key={project._id} className="bg-white border border-gray-100 rounded-xl px-6 py-4 flex items-center gap-4">
                {project.imageUrl && <img src={project.imageUrl} alt={project.name} className="w-12 h-12 rounded-lg object-cover border border-gray-100 flex-shrink-0" />}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2"><p className="text-sm font-medium text-black truncate">{project.name}</p>{project.featured && <span className="text-xs bg-black text-white px-2 py-0.5 rounded-full flex-shrink-0">Featured</span>}</div>
                  <p className="text-xs text-gray-400 mt-0.5 font-mono">/work/{project.slug}</p>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => editProject(project)} className="text-xs text-gray-400 hover:text-black transition-colors">Edit</button>
                  <button onClick={() => toggleFeatured(project)} className="text-xs text-gray-400 hover:text-black transition-colors">{project.featured ? 'Unfeature' : 'Feature'}</button>
                  <Link href={`/work/${project.slug}`} target="_blank" className="text-xs text-gray-400 hover:text-black transition-colors">View ↗</Link>
                  <button onClick={() => deleteProject(project.slug)} className="text-xs text-red-400 hover:text-red-600 transition-colors">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
