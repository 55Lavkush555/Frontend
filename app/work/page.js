'use client';

import { useState, useEffect } from 'react';
import ProjectCard from '@/components/ProjectCard';

const baseUrl = typeof window !== 'undefined'
  ? ''
  : process.env.NEXT_PUBLIC_BASE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

export default function WorkPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${baseUrl}/api/projects`, { cache: "no-store" })
      .then(r => r.json())
      .then(data => {
        setProjects(data.data?.projects || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-20 fade-in">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-20 fade-in">
      <div className="mb-12">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Portfolio</p>
        <h1 className="text-4xl font-bold text-black mb-3">Work</h1>
        <p className="text-gray-400">A collection of projects I've built.</p>
      </div>

      {projects.length === 0 ? (
        <div className="border border-dashed border-gray-200 rounded-2xl p-16 text-center">
          <p className="text-gray-400 text-sm">No projects yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <ProjectCard key={String(project._id)} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
