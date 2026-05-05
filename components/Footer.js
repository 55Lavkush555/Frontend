"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/chatbot") return null;

  return (
    <footer className="border-t border-gray-100 mt-24">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Lavkush. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a
            href="https://www.linkedin.com/in/lavkush-kushwaha-205850340/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-400 hover:text-black transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://instagram.com/55lavkush555"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-400 hover:text-black transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://github.com/55lavkush555"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-400 hover:text-black transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
