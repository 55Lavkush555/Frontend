'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import BlogCard from '@/components/BlogCard';
import ProjectCard from '@/components/ProjectCard';

const baseUrl = typeof window !== 'undefined'
  ? ''
  : process.env.NEXT_PUBLIC_BASE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

const techStack = [
  { name: 'HTML', icon: '🌐' },
  { name: 'CSS', icon: '🎨' },
  { name: 'JavaScript', icon: '⚡' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Express.js', icon: '🚀' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'Next.js', icon: '▲' },
  { name: 'Tailwind CSS', icon: '💨' },
  { name: 'Python', icon: '🐍' },
  { name: 'Firebase', icon: '🔥' },
  { name: 'Git', icon: '📝' },
  { name: 'React', icon: '⚛️' },
];

export default function HomePage() {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${baseUrl}/api/projects?featured=true`, { cache: "no-store" }).then(r => r.json()),
      fetch(`${baseUrl}/api/blogs`, { cache: "no-store" }).then(r => r.json())
    ]).then(([projectsRes, blogsRes]) => {
      setFeaturedProjects(projectsRes.data?.projects || []);
      setRecentBlogs((blogsRes.data?.blogs || []).slice(0, 3));
      setLoading(false);
      console.log("Projects:", projectsRes.data?.projects)
      console.log("Blogs:", blogsRes.data?.blogs)
    }).catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-24">

      {/* Hero */}
      <section className="fade-in flex flex-col md:flex-row items-center md:items-start gap-14 mb-32">
        <div className="flex-1 order-2 md:order-1">
          <span className="inline-block text-xs font-medium text-gray-500 border border-gray-200 rounded-full px-3 py-1 mb-5 uppercase tracking-widest">
            Available for work
          </span>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-black mb-5 leading-[1.1]">
            Hi, I'm<br />Lavkush
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-md">
            A full-stack developer passionate about building clean, performant
            web applications. I turn ideas into reality with code.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href="/work"
              className="px-6 py-3 bg-black text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors duration-200"
            >
              View My Work
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border border-gray-200 text-black text-sm font-medium rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
            >
              Get in Touch
            </Link>
          </div>
        </div>
        <div className="order-1 md:order-2 shrink-0">
          <div className="w-36 h-36 md:w-48 md:h-48 rounded-3xl overflow-hidden border border-gray-100 shadow-lg">
            <img
              src="/hero-pic.png"
              alt="Lavkush"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="fade-in-delay-1 mb-28">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Portfolio</p>
            <h2 className="text-2xl font-bold text-black">Featured Projects</h2>
          </div>
          <Link
            href="/work"
            className="text-sm text-gray-400 hover:text-black transition-colors pb-0.5 border-b border-transparent hover:border-black"
          >
            View all →
          </Link>
        </div>
        {featuredProjects.length === 0 ? (
          <div className="border border-dashed border-gray-200 rounded-2xl p-14 text-center">
            <p className="text-gray-400 text-sm">No featured projects yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredProjects.map((project) => (
              <ProjectCard key={String(project._id)} project={project} />
            ))}
          </div>
        )}
      </section>

      {/* Tech Stack */}
      <section className="fade-in-delay-2 mb-28">
        <div className="mb-8">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Skills</p>
          <h2 className="text-2xl font-bold text-black">Tech Stack</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2.5 text-sm text-gray-700 shadow-sm hover:border-gray-300 hover:shadow-md transition-all duration-200 cursor-default"
            >
              <span className="text-base leading-none">{tech.icon}</span>
              <span className="font-medium">{tech.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Posts */}
      <section className="fade-in-delay-3 mb-28">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Writing</p>
            <h2 className="text-2xl font-bold text-black">Recent Posts</h2>
          </div>
          <Link
            href="/blog"
            className="text-sm text-gray-400 hover:text-black transition-colors pb-0.5 border-b border-transparent hover:border-black"
          >
            View all →
          </Link>
        </div>
        {recentBlogs.length === 0 ? (
          <div className="border border-dashed border-gray-200 rounded-2xl p-14 text-center">
            <p className="text-gray-400 text-sm">No blog posts yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {recentBlogs.map((blog) => (
              <BlogCard key={String(blog._id)} blog={blog} />
            ))}
          </div>
        )}
      </section>

      {/* Client Review */}
      <section className="fade-in-delay-3">
        <div className="mb-8">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Testimonial</p>
          <h2 className="text-2xl font-bold text-black">Client Review</h2>
        </div>
        <div className="relative bg-white border border-gray-100 rounded-2xl p-8 shadow-sm overflow-hidden">
          <div className="absolute top-4 left-7 text-7xl text-gray-100 font-serif leading-none select-none">"</div>
          <div className="relative">
            <p className="text-gray-600 text-base leading-relaxed mb-6 max-w-2xl">
              Working with Lavkush was a great experience. He built a clean and
              professional website for my gym that helped me attract more customers.
              Highly recommended!
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white text-sm font-bold shrink-0">
                G
              </div>
              <div>
                <p className="text-sm font-semibold text-black">PowerHouse Gym Owner</p>
                <p className="text-xs text-gray-400">Satisfied Client</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
