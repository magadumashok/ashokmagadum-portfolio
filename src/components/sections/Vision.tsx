'use client';

import { useEffect, useRef } from 'react';

const opportunities = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
      </svg>
    ),
    title: 'Voice AI Documentation',
    problem: 'Doctors spend 2+ hours/day on EMR documentation',
    solution: 'Ambient AI converts clinical conversations into structured records in real time',
    color: '#1e40af',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    title: 'AI Call Center Automation',
    problem: '900M healthcare calls/year, 80% routine and repetitive',
    solution: 'AI voice agents resolve scheduling, Rx refills, and insurance verification autonomously',
    color: '#7c3aed',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    title: 'Clinical Decision Intelligence',
    problem: 'Fragmented data means missed diagnoses and preventable adverse events',
    solution: 'Real-time AI analyzes patient records to surface evidence-based recommendations at the point of care',
    color: '#059669',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
      </svg>
    ),
    title: 'Predictive Population Health',
    problem: 'Health systems react to illness instead of preventing it',
    solution: 'ML models identify at-risk patients before they decompensate, enabling proactive outreach',
    color: '#0891b2',
  },
];

export default function Vision() {
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
      id="vision"
      ref={sectionRef}
      className="py-24"
      style={{ backgroundColor: '#0f172a' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 observe-me">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: '#d4af37' }}>
            Product Vision
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            AI-Native Healthcare Operations
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full mb-8" style={{ backgroundColor: '#d4af37' }} />

          {/* Vision statement */}
          <div
            className="max-w-3xl mx-auto p-8 rounded-2xl border text-left"
            style={{
              borderColor: 'rgba(212, 175, 55, 0.2)',
              backgroundColor: 'rgba(212, 175, 55, 0.04)',
            }}
          >
            <p className="text-lg text-slate-300 leading-relaxed mb-4">
              Healthcare operations today rely heavily on human coordination and fragmented software.
              Physicians document manually. Call centers are staffed with humans handling routine requests.
              Clinical decisions are made without real-time data synthesis.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: '#d4af37' }}>
              My focus is building AI-native operational platforms that automate clinical workflows end-to-end —
              reducing the administrative burden on clinicians, improving patient access, and making health
              systems measurably more efficient.
            </p>
          </div>
        </div>

        {/* Market opportunity */}
        <div className="grid grid-cols-3 gap-6 mb-16 observe-me" style={{ transitionDelay: '0.15s' }}>
          {[
            { value: '$4.5T', label: 'US Healthcare Market', sub: '~18% of GDP' },
            { value: '30%', label: 'Admin Cost Share', sub: '$1.3T annually wasted' },
            { value: '2030', label: 'AI Automation Wave', sub: '50%+ routine tasks automatable' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl border"
              style={{
                borderColor: 'rgba(255,255,255,0.08)',
                backgroundColor: 'rgba(255,255,255,0.03)',
              }}
            >
              <div className="text-3xl font-black mb-1" style={{ color: '#d4af37' }}>
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-white mb-1">{stat.label}</div>
              <div className="text-xs text-slate-500">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Opportunity grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {opportunities.map((item, i) => (
            <div
              key={item.title}
              className="observe-me p-6 rounded-2xl border"
              style={{
                borderColor: 'rgba(255,255,255,0.08)',
                backgroundColor: 'rgba(255,255,255,0.03)',
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${item.color}20`, color: item.color }}
                >
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                  <div className="space-y-2">
                    <div className="flex gap-3">
                      <span
                        className="text-xs font-bold uppercase tracking-wider flex-shrink-0 mt-0.5"
                        style={{ color: '#ef4444' }}
                      >
                        Problem
                      </span>
                      <p className="text-sm text-slate-400">{item.problem}</p>
                    </div>
                    <div className="flex gap-3">
                      <span
                        className="text-xs font-bold uppercase tracking-wider flex-shrink-0 mt-0.5"
                        style={{ color: '#22c55e' }}
                      >
                        Solution
                      </span>
                      <p className="text-sm text-slate-300">{item.solution}</p>
                    </div>
                  </div>
                  <div
                    className="mt-4 h-0.5 w-8 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
