import Link from 'next/link';
import Image from 'next/image';

export default function ProjectCard({ project }) {
  const excerpt = project.description
    ? project.description.replace(/[#*`_[\]()>~]/g, '').substring(0, 90).trim() + '…'
    : '';

  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <article className="bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:border-gray-300 hover:shadow-lg hover:-translate-y-1">
        {project.imageUrl && (
          <div className="overflow-hidden h-48 bg-gray-50">
            <Image
              src={project.imageUrl}
              alt={project.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              width={400}
              height={400}
            />
          </div>
        )}
        <div className="p-5">
          <h3 className="text-base font-semibold text-black mb-2 leading-snug group-hover:text-gray-600 transition-colors">
            {project.name}
          </h3>
          {excerpt && (
            <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2">{excerpt}</p>
          )}
          <div className="flex gap-2 flex-wrap">
            {project.githubUrl && (
              <span className="text-xs text-gray-500 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full">
                GitHub
              </span>
            )}
            {project.liveUrl && (
              <span className="text-xs text-gray-500 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full">
                Live Demo
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
