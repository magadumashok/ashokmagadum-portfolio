'use client';

import { useEffect, useRef, useState } from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/ui/ProductCard';

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

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
      id="portfolio"
      ref={sectionRef}
      style={{ backgroundColor: 'rgba(255,255,255,0.5)', borderBottom: '1px solid rgba(0,0,0,0.08)' }}
      className="py-24"
    >
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        <div
          className="mb-10 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)' }}
        >
          <p
            className="text-xs font-bold uppercase tracking-widest mb-6"
            style={{ color: '#3E64FF', letterSpacing: '0.1rem' }}
          >
            Portfolio
          </p>
          <h2
            className="font-bold mb-4 leading-snug"
            style={{ color: '#363334', fontSize: '1.625em', letterSpacing: '0.05rem' }}
          >
            Healthcare AI Products
          </h2>
          <p className="text-base leading-relaxed" style={{ color: 'rgba(0,0,0,0.55)' }}>
            End-to-end case studies — each one a healthcare problem solved through product strategy, AI architecture, and disciplined execution.
          </p>
        </div>

        <div className="space-y-3">
          {products.map((product, i) => (
            <div
              key={product.id}
              className="transition-all duration-500"
              style={{
                transitionDelay: `${i * 0.07}s`,
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              <ProductCard product={product} index={i} />
            </div>
          ))}
        </div>

        <div
          className="mt-8 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transitionDelay: '0.4s' }}
        >
          <p className="text-sm" style={{ color: 'rgba(0,0,0,0.45)' }}>
            Want to go deeper?{' '}
            <button
              className="underline underline-offset-2 transition-colors"
              style={{ color: 'rgba(0,0,0,0.65)' }}
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
              }}
            >
              Let&apos;s talk
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}
