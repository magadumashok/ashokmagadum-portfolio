'use client';

export default function Footer() {
  return (
    <footer
      className="py-10"
      style={{
        backgroundColor: '#363334',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Brand */}
          <div>
            <p className="text-sm font-semibold text-white mb-0.5">Ashok Magadum</p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              VP of Product · KareFusionAI · Healthcare AI
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-5">
            {[
              { label: 'LinkedIn', href: 'https://linkedin.com/in/ashokmagadum' },
              { label: 'Email', href: 'mailto:ashok@ashokmagadum.com' },
              { label: 'Resume', href: '/resume.pdf' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') || link.href.endsWith('.pdf') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-xs transition-colors hover:text-white"
                style={{ color: 'rgba(255,255,255,0.4)' }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div
          className="mt-8 pt-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
            © {new Date().getFullYear()} Ashok Magadum. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
