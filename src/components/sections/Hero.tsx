'use client';

import { useEffect, useState, useRef } from 'react';

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const roles = [
    'VP of Product — KareFusionAI',
    'Healthcare AI Product Leader',
    'Clinical Workflow Strategist',
    'Voice AI & FHIR Architect',
  ];

  useEffect(() => {
    const role = roles[roleIndex];
    const tick = () => {
      if (!isDeleting) {
        if (charIndex < role.length) {
          setDisplayText(role.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
          timeoutRef.current = setTimeout(tick, 60);
        } else {
          timeoutRef.current = setTimeout(() => setIsDeleting(true), 2600);
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(role.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
          timeoutRef.current = setTimeout(tick, 32);
        } else {
          setIsDeleting(false);
          setRoleIndex((r) => (r + 1) % roles.length);
          timeoutRef.current = setTimeout(tick, 400);
        }
      }
    };
    timeoutRef.current = setTimeout(tick, 100);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [roleIndex, charIndex, isDeleting]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #E8E1E7 0%, #7BAEE8 45%, #5081E4 100%)',
      }}
    >
      {/* Subtle noise overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.08\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 sm:px-8 py-32 text-center">

        {/* Circular avatar */}
        <div className="flex justify-center mb-8">
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center text-3xl font-bold text-white flex-shrink-0 transition-transform duration-300 hover:scale-105"
            style={{
              backgroundColor: 'rgba(54,51,52,0.85)',
              border: '3px solid rgba(255,255,255,0.3)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            }}
          >
            AM
          </div>
        </div>

        {/* Available badge */}
        <div className="flex justify-center mb-6">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium"
            style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.35)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
            Open to Director / VP Healthcare AI Roles
          </div>
        </div>

        {/* Name */}
        <h1
          className="font-bold leading-tight mb-4"
          style={{
            color: '#ffffff',
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            letterSpacing: '0.02rem',
            textShadow: '0 2px 16px rgba(0,0,0,0.15)',
          }}
        >
          Ashok Magadum
        </h1>

        {/* Typewriter subtitle */}
        <div className="flex items-center justify-center gap-1 mb-6 h-8">
          <span
            className="text-lg font-medium"
            style={{ color: 'rgba(255,255,255,0.9)' }}
          >
            {displayText}
          </span>
          <span
            className="cursor-blink inline-block w-0.5 h-5 rounded-sm"
            style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}
          />
        </div>

        {/* Tagline */}
        <p
          className="text-base leading-relaxed mb-10 max-w-xl mx-auto"
          style={{ color: 'rgba(255,255,255,0.82)' }}
        >
          Building AI-native platforms that automate clinical workflows — ambient voice documentation, AI call center agents, and FHIR data infrastructure.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          <button
            onClick={() => scrollTo('portfolio')}
            className="px-7 py-3 text-sm font-semibold rounded-full transition-all active:scale-95"
            style={{
              backgroundColor: '#ffffff',
              color: '#363334',
              border: '1px solid rgba(255,255,255,0.8)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            }}
          >
            View Portfolio
          </button>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3 text-sm font-medium rounded-full transition-all active:scale-95"
            style={{
              backgroundColor: 'rgba(255,255,255,0.15)',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.35)',
              backdropFilter: 'blur(8px)',
            }}
          >
            Download Resume ↗
          </a>
        </div>

        {/* Stats row */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-xl mx-auto pt-10"
          style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }}
        >
          {[
            { value: '10+', label: 'Years in AI/ML' },
            { value: '4', label: 'Healthcare Products' },
            { value: '$12M+', label: 'Contracts Secured' },
            { value: '5M+', label: 'Patients Impacted' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-white mb-0.5">{stat.value}</div>
              <div className="text-xs" style={{ color: 'rgba(255,255,255,0.65)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
        <div className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>Scroll</div>
        <div
          className="w-px h-8"
          style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)' }}
        />
      </div>
    </section>
  );
}
