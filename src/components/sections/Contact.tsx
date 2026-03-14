'use client';

import { useEffect, useRef, useState } from 'react';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputBase: React.CSSProperties = {
    backgroundColor: 'rgba(255,255,255,0.75)',
    border: '1px solid rgba(0,0,0,0.12)',
    color: '#363334',
    borderRadius: '12px',
    padding: '12px 16px',
    fontSize: '14px',
    width: '100%',
    outline: 'none',
    height: '3.25rem',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    fontFamily: 'inherit',
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{ backgroundColor: 'rgba(255,255,255,0.5)', borderBottom: '1px solid rgba(0,0,0,0.08)' }}
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
            Contact
          </p>
          <h2
            className="font-bold mb-3 leading-snug"
            style={{ color: '#363334', fontSize: '1.625em', letterSpacing: '0.05rem' }}
          >
            Let&apos;s Talk
          </h2>
          <p className="text-base mb-10 leading-relaxed" style={{ color: 'rgba(0,0,0,0.55)' }}>
            Open to VP, Director, and Head of AI Products roles in healthtech and AI-native companies. Also happy to discuss healthcare AI strategy, speaking, or advisory.
          </p>

          {/* Info row */}
          <div className="flex flex-wrap gap-6 mb-10">
            {[
              {
                label: 'Email',
                value: 'ashok@ashokmagadum.com',
                href: 'mailto:ashok@ashokmagadum.com',
              },
              {
                label: 'LinkedIn',
                value: 'linkedin.com/in/ashokmagadum',
                href: 'https://linkedin.com/in/ashokmagadum',
              },
              {
                label: 'Location',
                value: 'San Francisco Bay Area',
                href: null,
              },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(0,0,0,0.35)', letterSpacing: '0.08rem' }}>
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-sm transition-colors hover:underline"
                    style={{ color: '#3E64FF' }}
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-sm" style={{ color: 'rgba(0,0,0,0.65)' }}>{item.value}</p>
                )}
              </div>
            ))}

            {/* Availability badge */}
            <div className="flex items-center gap-2 self-end">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-medium" style={{ color: '#059669' }}>Currently Available</span>
            </div>
          </div>

          {/* Form */}
          {submitted ? (
            <div
              className="flex items-center justify-center py-16 rounded-2xl"
              style={{ backgroundColor: 'rgba(255,255,255,0.75)', border: '1px solid rgba(0,0,0,0.08)' }}
            >
              <div className="text-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: 'rgba(62,100,255,0.1)', border: '1px solid rgba(62,100,255,0.2)' }}
                >
                  <svg className="w-6 h-6" style={{ color: '#3E64FF' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold mb-2" style={{ color: '#363334' }}>Message sent!</h3>
                <p className="text-sm" style={{ color: 'rgba(0,0,0,0.45)' }}>
                  Thank you — I&apos;ll get back to you within 24 hours.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(['name', 'email'] as const).map((field) => (
                  <div key={field}>
                    <label
                      className="block text-xs font-bold uppercase tracking-widest mb-2"
                      style={{ color: 'rgba(0,0,0,0.35)', letterSpacing: '0.08rem', fontFamily: 'Archivo, sans-serif' }}
                    >
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      name={field}
                      required
                      value={form[field]}
                      onChange={handleChange}
                      style={inputBase}
                      placeholder={field === 'email' ? 'you@company.com' : 'Your name'}
                      onFocus={(e) => {
                        (e.currentTarget as HTMLInputElement).style.borderColor = '#3E64FF';
                        (e.currentTarget as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(62,100,255,0.1)';
                      }}
                      onBlur={(e) => {
                        (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(0,0,0,0.12)';
                        (e.currentTarget as HTMLInputElement).style.boxShadow = 'none';
                      }}
                    />
                  </div>
                ))}
              </div>

              <div>
                <label
                  className="block text-xs font-bold uppercase tracking-widest mb-2"
                  style={{ color: 'rgba(0,0,0,0.35)', letterSpacing: '0.08rem', fontFamily: 'Archivo, sans-serif' }}
                >
                  Subject
                </label>
                <select
                  name="subject"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  style={{ ...inputBase, cursor: 'pointer' }}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLSelectElement).style.borderColor = '#3E64FF';
                    (e.currentTarget as HTMLSelectElement).style.boxShadow = '0 0 0 3px rgba(62,100,255,0.1)';
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLSelectElement).style.borderColor = 'rgba(0,0,0,0.12)';
                    (e.currentTarget as HTMLSelectElement).style.boxShadow = 'none';
                  }}
                >
                  <option value="">Select a topic</option>
                  <option value="job">Job Opportunity</option>
                  <option value="advisory">Advisory / Consulting</option>
                  <option value="collaboration">Product Collaboration</option>
                  <option value="speaking">Speaking Engagement</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  className="block text-xs font-bold uppercase tracking-widest mb-2"
                  style={{ color: 'rgba(0,0,0,0.35)', letterSpacing: '0.08rem', fontFamily: 'Archivo, sans-serif' }}
                >
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  style={{ ...inputBase, height: 'auto', resize: 'none' }}
                  placeholder="Tell me about the opportunity or what you'd like to discuss..."
                  onFocus={(e) => {
                    (e.currentTarget as HTMLTextAreaElement).style.borderColor = '#3E64FF';
                    (e.currentTarget as HTMLTextAreaElement).style.boxShadow = '0 0 0 3px rgba(62,100,255,0.1)';
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLTextAreaElement).style.borderColor = 'rgba(0,0,0,0.12)';
                    (e.currentTarget as HTMLTextAreaElement).style.boxShadow = 'none';
                  }}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 text-sm font-semibold rounded-full transition-all active:scale-95"
                style={{
                  backgroundColor: '#3E64FF',
                  color: '#ffffff',
                }}
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
