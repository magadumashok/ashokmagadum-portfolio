'use client';

import { useEffect, useRef, useState } from 'react';
import { blogPosts } from '@/data/blog';

const categoryColors: Record<string, string> = {
  'Product Strategy': '#1e40af',
  'Technical Architecture': '#7c3aed',
  'AI Strategy': '#059669',
};

export default function Writing() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="writing"
      ref={sectionRef}
      className="py-28"
      style={{ backgroundColor: '#0d1117', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#d4af37' }}>
            Thought Leadership
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Product Strategy Essays
          </h2>
          <p className="text-base mb-12 max-w-xl" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Strategic thinking on AI in healthcare — where the market is heading, how to build the products, and how to do it safely.
          </p>

          {/* Articles grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {blogPosts.map((post, i) => {
              const color = categoryColors[post.category] || '#1e40af';
              return (
                <article
                  key={post.id}
                  className="group p-6 rounded-xl cursor-pointer transition-all duration-200"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    transitionDelay: `${i * 0.08}s`,
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(20px)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)';
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.04)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.025)';
                  }}
                >
                  <div className="h-px w-8 mb-5 rounded-full" style={{ backgroundColor: color }} />

                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: `${color}15`, color }}
                    >
                      {post.category}
                    </span>
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>{post.readTime}</span>
                  </div>

                  <h3 className="text-base font-semibold text-white mb-2 group-hover:text-white/90 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs mb-3 font-medium" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {post.subtitle}
                  </p>
                  <p className="text-sm leading-relaxed mb-5 line-clamp-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-md"
                          style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.3)' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>{post.date}</span>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>
              Full essays coming soon —{' '}
              <button
                className="underline underline-offset-2 transition-colors hover:text-white"
                style={{ color: 'rgba(255,255,255,0.45)' }}
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
                }}
              >
                reach out to discuss
              </button>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
