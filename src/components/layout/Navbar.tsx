'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navLinks = [
  { label: 'Bio', href: '#about' },
  { label: 'Resume', href: '#experience' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = navLinks.map((l) => l.href.replace('#', ''));
      let current = '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.getElementById(href.replace('#', ''));
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(248,245,223,0.96)' : 'rgba(248,245,223,0.98)',
        backdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid transparent',
        boxShadow: scrolled ? '0 1px 16px rgba(0,0,0,0.05)' : 'none',
      }}
    >
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="Ashok Magadum">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
              style={{ backgroundColor: '#363334' }}
            >
              AM
            </div>
            <span
              className="text-sm font-semibold"
              style={{ color: '#363334' }}
            >
              Ashok Magadum
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const id = link.href.replace('#', '');
              const isActive = activeSection === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-4 py-1.5 text-sm rounded-full transition-all duration-200"
                  style={{
                    color: isActive ? '#ffffff' : 'rgba(0,0,0,0.55)',
                    fontWeight: isActive ? 600 : 400,
                    backgroundColor: isActive ? '#363334' : 'transparent',
                  }}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Resume CTA */}
          <div className="flex items-center gap-3">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-5 py-2 text-sm font-medium rounded-full transition-all active:scale-95"
              style={{
                backgroundColor: '#3E64FF',
                color: '#ffffff',
                border: '1px solid #3E64FF',
              }}
            >
              Resume ↗
            </a>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 rounded-lg"
              style={{ color: 'rgba(0,0,0,0.55)' }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-5 h-3.5 flex flex-col justify-between">
                <span className={`block h-px rounded transition-all origin-center ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} style={{ backgroundColor: 'rgba(0,0,0,0.55)' }} />
                <span className={`block h-px rounded transition-all ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} style={{ backgroundColor: 'rgba(0,0,0,0.55)' }} />
                <span className={`block h-px rounded transition-all origin-center ${menuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} style={{ backgroundColor: 'rgba(0,0,0,0.55)' }} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-200"
        style={{
          maxHeight: menuOpen ? '400px' : '0',
          borderBottom: menuOpen ? '1px solid rgba(0,0,0,0.08)' : 'none',
          backgroundColor: '#F8F5DF',
        }}
      >
        <nav className="flex flex-col px-6 py-4 gap-1 max-w-3xl mx-auto">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-3 py-2.5 text-sm rounded-xl transition-colors"
              style={{ color: 'rgba(0,0,0,0.65)' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 px-3 py-2.5 text-sm font-medium text-center rounded-full text-white"
            style={{ backgroundColor: '#3E64FF' }}
          >
            Download Resume ↗
          </a>
        </nav>
      </div>
    </header>
  );
}
