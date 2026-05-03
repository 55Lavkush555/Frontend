import { marked } from 'marked';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogBySlug } from '@/services/blogService';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  return {
    title: blog ? `${blog.title} — Blog` : 'Blog Post',
    description: blog ? blog.content.substring(0, 150) : '',
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) notFound();

  const htmlContent = marked(blog.content);
  const date = new Date(blog.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="max-w-3xl mx-auto px-6 py-20 fade-in">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-black transition-colors mb-10"
      >
        ← Back to Blog
      </Link>

      {blog.imageUrl && (
        <div className="rounded-2xl overflow-hidden mb-10 h-72 bg-gray-100">
          <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover" />
        </div>
      )}

      <p className="text-sm text-gray-400 mb-4">{date}</p>
      <h1 className="text-4xl font-bold text-black mb-10 leading-tight">{blog.title}</h1>

      <article className="prose" dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}
