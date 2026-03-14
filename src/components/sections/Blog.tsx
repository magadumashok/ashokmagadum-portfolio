'use client';

import { useEffect, useRef } from 'react';
import { blogPosts } from '@/data/blog';

const categoryColors: Record<string, string> = {
  'Product Strategy': '#1e40af',
  'Technical Architecture': '#7c3aed',
  'AI Strategy': '#059669',
};

export default function Blog() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const els = sectionRef.current?.querySelectorAll('.observe-me');
    els?.forEach((el) => {
      el.classList.add('section-hidden');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="writing"
      ref={sectionRef}
      className="py-24"
      style={{ backgroundColor: '#f8fafc' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 observe-me">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: '#d4af37' }}>
            Thought Leadership
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: '#0f172a' }}>
            Product Strategy Essays
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full" style={{ backgroundColor: '#d4af37' }} />
          <p className="mt-6 text-lg text-slate-500 max-w-2xl mx-auto">
            Strategic thinking on AI in healthcare — where the market is heading,
            how to build the products, and how to do it safely.
          </p>
        </div>

        {/* Blog posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts.map((post, i) => {
            const categoryColor = categoryColors[post.category] || '#1e40af';
            return (
              <article
                key={post.id}
                className="observe-me bg-white rounded-2xl border border-slate-100 overflow-hidden card-hover cursor-pointer group"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                {/* Top accent bar */}
                <div className="h-1" style={{ backgroundColor: categoryColor }} />

                <div className="p-6">
                  {/* Category + read time */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: `${categoryColor}12`, color: categoryColor }}
                    >
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-400">{post.readTime}</span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl font-bold mb-2 group-hover:text-blue-700 transition-colors"
                    style={{ color: '#0f172a' }}
                  >
                    {post.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-sm font-medium text-slate-500 mb-3">{post.subtitle}</p>

                  {/* Excerpt */}
                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>

                  {/* Tags + date */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-md"
                          style={{ backgroundColor: '#f1f5f9', color: '#64748b' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-slate-400">{post.date}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 observe-me" style={{ transitionDelay: '0.4s' }}>
          <p className="text-slate-500 text-sm">
            Full essays coming soon —{' '}
            <a
              href="#contact"
              className="font-medium underline underline-offset-4 transition-colors hover:text-blue-600"
              style={{ color: '#1e40af' }}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('contact');
                if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
              }}
            >
              reach out to discuss these topics
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
