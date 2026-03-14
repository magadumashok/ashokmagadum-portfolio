'use client';

import { useEffect, useRef, useState } from 'react';
import { experiences } from '@/data/experience';

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [openId, setOpenId] = useState<string>('1');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{ backgroundColor: '#F8F5DF', borderBottom: '1px solid rgba(0,0,0,0.08)' }}
      className="py-24"
    >
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        <div
          className="transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)' }}
        >
          <p
            className="text-xs font-bold uppercase tracking-widest mb-6"
            style={{ color: '#3E64FF', letterSpacing: '0.1rem' }}
          >
            Resume
          </p>
          <h2
            className="font-bold mb-10 leading-snug"
            style={{ color: '#363334', fontSize: '1.625em', letterSpacing: '0.05rem' }}
          >
            Experience
          </h2>

          <div className="space-y-2">
            {experiences.map((exp, i) => {
              const isOpen = openId === exp.id;
              return (
                <div
                  key={exp.id}
                  className="rounded-2xl overflow-hidden transition-all duration-300"
                  style={{
                    backgroundColor: isOpen ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.55)',
                    border: isOpen ? '1px solid rgba(62,100,255,0.2)' : '1px solid rgba(0,0,0,0.07)',
                    transitionDelay: `${i * 0.05}s`,
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(16px)',
                  }}
                >
                  <button
                    className="w-full text-left px-6 py-5 flex items-start gap-4"
                    onClick={() => setOpenId(isOpen ? '' : exp.id)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-baseline gap-2 mb-0.5">
                        <h3 className="text-base font-semibold" style={{ color: '#363334' }}>{exp.title}</h3>
                        <span className="text-sm" style={{ color: 'rgba(0,0,0,0.4)' }}>— {exp.company}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs" style={{ color: 'rgba(0,0,0,0.35)' }}>{exp.period}</span>
                        {exp.endYear === null && (
                          <span
                            className="text-xs font-medium px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: 'rgba(62,100,255,0.1)', color: '#3E64FF' }}
                          >
                            Current
                          </span>
                        )}
                      </div>
                    </div>
                    <span
                      className="mt-1 transition-transform duration-200 flex-shrink-0"
                      style={{
                        color: 'rgba(0,0,0,0.25)',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                      <p className="text-sm leading-relaxed mt-4 mb-4" style={{ color: 'rgba(0,0,0,0.55)' }}>
                        {exp.description}
                      </p>
                      <ul className="space-y-2 mb-5">
                        {exp.highlights.map((h) => (
                          <li
                            key={h}
                            className="flex items-start gap-2.5 text-sm"
                            style={{ color: 'rgba(0,0,0,0.6)' }}
                          >
                            <span
                              className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ backgroundColor: '#3E64FF' }}
                            />
                            {h}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2.5 py-1 rounded-full"
                            style={{
                              backgroundColor: 'rgba(62,100,255,0.07)',
                              border: '1px solid rgba(62,100,255,0.12)',
                              color: '#3E64FF',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Education */}
          <div className="mt-10">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-5"
              style={{ color: 'rgba(0,0,0,0.35)', letterSpacing: '0.1rem' }}
            >
              Education
            </p>
            <div
              className="p-5 rounded-2xl"
              style={{
                backgroundColor: 'rgba(255,255,255,0.6)',
                border: '1px solid rgba(0,0,0,0.07)',
              }}
            >
              <div className="flex flex-wrap items-baseline gap-2 mb-0.5">
                <h3 className="text-base font-semibold" style={{ color: '#363334' }}>
                  B.S. Computer Science & Engineering
                </h3>
              </div>
              <p className="text-sm" style={{ color: 'rgba(0,0,0,0.45)' }}>University · 2013</p>
            </div>
          </div>

          {/* Download resume */}
          <div className="mt-8">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-full transition-all active:scale-95"
              style={{
                backgroundColor: '#363334',
                color: '#ffffff',
              }}
            >
              Download Full Resume ↗
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
