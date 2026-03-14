'use client';

import { useEffect, useRef, useState } from 'react';

export default function About() {
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
      id="about"
      ref={sectionRef}
      style={{ backgroundColor: '#F8F5DF', borderBottom: '1px solid rgba(0,0,0,0.08)' }}
      className="py-24"
    >
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        <div
          className="transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)' }}
        >
          {/* Section label */}
          <p
            className="text-xs font-bold uppercase tracking-widest mb-8"
            style={{ color: '#3E64FF', letterSpacing: '0.1rem' }}
          >
            Bio
          </p>

          {/* Heading */}
          <h2
            className="font-bold mb-8 leading-snug"
            style={{ color: '#363334', fontSize: '1.625em', letterSpacing: '0.05rem' }}
          >
            I build AI systems that give clinicians back their time.
          </h2>

          {/* Bio paragraphs */}
          <div className="space-y-5" style={{ color: 'rgba(0,0,0,0.69)' }}>
            <p className="text-base leading-relaxed">
              I&apos;m the <strong style={{ color: '#363334', fontWeight: 600 }}>VP of Product at KareFusionAI</strong>, where I lead product strategy for an AI platform that automates healthcare operations end-to-end. My focus is the workflows that consume the most physician and staff time: clinical documentation, inbound patient calls, and health system data interoperability.
            </p>
            <p className="text-base leading-relaxed">
              Before KareFusionAI, I spent a decade building AI and ML products at enterprise tech companies — shipping LLM platforms, conversational AI systems, and ML analytics tools used by millions. I bring technical depth in FHIR APIs, LLM orchestration, and voice AI pipelines, combined with the product discipline to turn complex AI into products clinicians actually adopt.
            </p>
            <p className="text-base leading-relaxed">
              Healthcare is the most important domain for AI to transform. The biggest opportunity isn&apos;t replacing clinicians — it&apos;s giving them back the hours they spend on documentation, phone calls, and administrative work that AI can now handle completely.
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8">
            {[
              'Healthcare AI',
              'Voice AI Agents',
              'FHIR / EHR Integration',
              'Clinical NLP',
              'LLM Orchestration',
              '0→1 Builder',
              'Health System GTM',
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-xs font-medium rounded-full"
                style={{
                  backgroundColor: 'rgba(62,100,255,0.08)',
                  color: '#3E64FF',
                  border: '1px solid rgba(62,100,255,0.15)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Market stats */}
          <div
            className="mt-12 p-7 rounded-2xl"
            style={{ backgroundColor: '#363334' }}
          >
            <p
              className="text-xs font-bold uppercase tracking-widest mb-6"
              style={{ color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1rem' }}
            >
              The Healthcare AI Opportunity
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { v: '$4.5T', l: 'US healthcare market' },
                { v: '30%', l: 'Admin cost share' },
                { v: '2.5 hrs', l: 'Daily doc burden/physician' },
                { v: '900M', l: 'Healthcare calls/year' },
              ].map((item) => (
                <div key={item.l}>
                  <div className="text-xl font-bold mb-1" style={{ color: '#ffffff' }}>{item.v}</div>
                  <div className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{item.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Focus areas */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: '🎙️',
                title: 'Voice AI Agents',
                description: 'Autonomous voice agents for scheduling, patient registration, and clinical triage — zero hold times, 24/7.',
              },
              {
                icon: '📋',
                title: 'Ambient Documentation',
                description: 'Ambient documentation systems that convert physician conversations into structured EMR records in real time.',
              },
              {
                icon: '🔗',
                title: 'FHIR Platforms',
                description: 'Interoperability infrastructure connecting fragmented healthcare systems via FHIR R4 APIs.',
              },
            ].map((area) => (
              <div
                key={area.title}
                className="p-5 rounded-xl transition-all duration-200"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.7)',
                  border: '1px solid rgba(0,0,0,0.08)',
                }}
              >
                <div className="text-2xl mb-3">{area.icon}</div>
                <h3 className="text-sm font-semibold mb-1.5" style={{ color: '#363334' }}>{area.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(0,0,0,0.55)' }}>{area.description}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
