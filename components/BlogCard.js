import Link from 'next/link';

export default function BlogCard({ blog }) {
  const date = new Date(blog.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Link href={`/blog/${blog.slug}`} className="group block">
      <article className="bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:border-gray-300 hover:shadow-lg hover:-translate-y-1">
        {blog.imageUrl && (
          <div className="overflow-hidden h-48 bg-gray-50">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-5">
          <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">{date}</p>
          <h3 className="text-base font-semibold text-black leading-snug group-hover:text-gray-600 transition-colors">
            {blog.title}
          </h3>
          <p className="text-xs text-gray-400 mt-3 group-hover:text-gray-600 transition-colors">
            Read more →
          </p>
        </div>
      </article>
    </Link>
  );
}
