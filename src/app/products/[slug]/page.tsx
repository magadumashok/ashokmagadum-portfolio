import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug, products } from '@/data/products';
import type { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: 'Not Found' };
  return {
    title: `${product.name} — Ashok Magadum`,
    description: product.tagline,
  };
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-lg font-bold mb-6 pb-4"
      style={{ borderBottom: '1px solid rgba(0,0,0,0.07)', color: '#363334', letterSpacing: '0.02rem' }}
    >
      {children}
    </h2>
  );
}

export default function CaseStudyPage({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const { caseStudy } = product;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F5DF', color: 'rgba(0,0,0,0.69)' }}>

      {/* Top nav */}
      <div
        className="sticky top-0 z-40"
        style={{
          backgroundColor: 'rgba(248,245,223,0.95)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
        }}
      >
        <div className="max-w-3xl mx-auto px-6 sm:px-8 py-4 flex items-center justify-between">
          <Link
            href="/#portfolio"
            className="flex items-center gap-2 text-sm transition-colors"
            style={{ color: 'rgba(0,0,0,0.45)' }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            All Case Studies
          </Link>
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ backgroundColor: '#363334' }}
          >
            AM
          </div>
        </div>
      </div>

      {/* Hero */}
      <div
        className="py-16"
        style={{ borderTop: `3px solid ${product.color}`, borderBottom: '1px solid rgba(0,0,0,0.08)' }}
      >
        <div className="max-w-3xl mx-auto px-6 sm:px-8">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ backgroundColor: `${product.color}15`, color: product.color }}
            >
              {product.category}
            </span>
            <span className="text-xs" style={{ color: 'rgba(0,0,0,0.35)' }}>{product.year}</span>
            <span className="text-xs" style={{ color: 'rgba(0,0,0,0.35)' }}>· {product.company}</span>
          </div>

          <h1
            className="font-bold mb-4 leading-tight"
            style={{ color: '#363334', fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '0.02rem' }}
          >
            {product.name}
          </h1>
          <p className="text-lg mb-10 leading-relaxed" style={{ color: 'rgba(0,0,0,0.55)' }}>
            {product.tagline}
          </p>

          {/* Metrics */}
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-px overflow-hidden rounded-2xl"
            style={{ border: '1px solid rgba(0,0,0,0.08)' }}
          >
            {Object.entries(product.metrics).map(([key, value], i, arr) => (
              <div
                key={key}
                className="px-5 py-4"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.7)',
                  borderRight: i < arr.length - 1 ? '1px solid rgba(0,0,0,0.07)' : 'none',
                }}
              >
                <div className="text-lg font-bold mb-0.5" style={{ color: product.color }}>{value}</div>
                <div className="text-xs" style={{ color: 'rgba(0,0,0,0.4)' }}>{key}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Case study body */}
      <div className="max-w-3xl mx-auto px-6 sm:px-8 py-16 space-y-16">

        <section>
          <SectionLabel>The Problem</SectionLabel>
          <p className="text-base leading-relaxed" style={{ color: 'rgba(0,0,0,0.65)' }}>{product.problem}</p>
        </section>

        <section>
          <SectionLabel>Context</SectionLabel>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'rgba(0,0,0,0.3)', letterSpacing: '0.08rem' }}>Setting</p>
          <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(0,0,0,0.65)' }}>{caseStudy.context}</p>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'rgba(0,0,0,0.3)', letterSpacing: '0.08rem' }}>Who Were the Users?</p>
          <p className="text-base leading-relaxed" style={{ color: 'rgba(0,0,0,0.65)' }}>{caseStudy.users}</p>
        </section>

        <section>
          <SectionLabel>Product Strategy</SectionLabel>
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(0,0,0,0.3)', letterSpacing: '0.08rem' }}>The Hypothesis</p>
          <div
            className="p-6 rounded-2xl"
            style={{
              backgroundColor: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(0,0,0,0.08)',
              borderLeft: `3px solid ${product.color}`,
            }}
          >
            <p className="text-base leading-relaxed italic" style={{ color: 'rgba(0,0,0,0.65)' }}>
              &ldquo;{caseStudy.hypothesis}&rdquo;
            </p>
          </div>
        </section>

        <section>
          <SectionLabel>Solution</SectionLabel>
          <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: 'rgba(0,0,0,0.3)', letterSpacing: '0.08rem' }}>Product Features</p>
          <ul className="space-y-3 mb-10">
            {caseStudy.solution.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: product.color }}
                />
                <span className="text-base leading-relaxed" style={{ color: 'rgba(0,0,0,0.65)' }}>{item}</span>
              </li>
            ))}
          </ul>

          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(0,0,0,0.3)', letterSpacing: '0.08rem' }}>Architecture</p>
          <div
            className="p-5 rounded-xl text-sm leading-relaxed"
            style={{
              backgroundColor: '#363334',
              color: 'rgba(255,255,255,0.65)',
              fontFamily: 'monospace',
            }}
          >
            {caseStudy.techDetails}
          </div>
        </section>

        <section>
          <SectionLabel>Execution</SectionLabel>
          <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: 'rgba(0,0,0,0.3)', letterSpacing: '0.08rem' }}>How It Was Built</p>
          <ol className="space-y-4">
            {caseStudy.execution.map((step, i) => (
              <li key={i} className="flex items-start gap-4">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5"
                  style={{ backgroundColor: `${product.color}18`, color: product.color, border: `1px solid ${product.color}35` }}
                >
                  {i + 1}
                </div>
                <span className="text-base leading-relaxed" style={{ color: 'rgba(0,0,0,0.65)' }}>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <SectionLabel>Results</SectionLabel>
          <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: 'rgba(0,0,0,0.3)', letterSpacing: '0.08rem' }}>Metrics & Outcomes</p>
          <div className="space-y-2 mb-6">
            {caseStudy.results.map((result, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-xl"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.7)',
                  border: '1px solid rgba(0,0,0,0.07)',
                }}
              >
                <svg
                  className="w-4 h-4 flex-shrink-0 mt-0.5"
                  style={{ color: product.color }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm leading-relaxed" style={{ color: 'rgba(0,0,0,0.65)' }}>{result}</span>
              </div>
            ))}
          </div>

          <div
            className="p-5 rounded-xl"
            style={{
              backgroundColor: `${product.color}10`,
              border: `1px solid ${product.color}25`,
            }}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: product.color, letterSpacing: '0.08rem' }}>
              Key Impact
            </p>
            <p className="text-base font-semibold" style={{ color: '#363334' }}>{product.impact}</p>
          </div>
        </section>

        <section>
          <SectionLabel>Tech Stack</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {product.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-sm rounded-full"
                style={{
                  backgroundColor: 'rgba(62,100,255,0.08)',
                  border: '1px solid rgba(62,100,255,0.15)',
                  color: '#3E64FF',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Bottom nav */}
        <div
          className="pt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
          style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}
        >
          <Link
            href="/#portfolio"
            className="flex items-center gap-2 text-sm transition-colors"
            style={{ color: 'rgba(0,0,0,0.4)' }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to all case studies
          </Link>
          <Link
            href="/#contact"
            className="px-6 py-2.5 text-sm font-semibold rounded-full transition-all active:scale-95"
            style={{ backgroundColor: '#3E64FF', color: '#ffffff' }}
          >
            Discuss this project →
          </Link>
        </div>

        {/* More case studies */}
        <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }} className="pt-12">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-6"
            style={{ color: 'rgba(0,0,0,0.3)', letterSpacing: '0.08rem' }}
          >
            More Case Studies
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {products
              .filter((p) => p.slug !== product.slug)
              .slice(0, 2)
              .map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.slug}`}
                  className="group p-5 rounded-2xl transition-all duration-200 hover:opacity-80"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    border: '1px solid rgba(0,0,0,0.08)',
                  }}
                >
                  <div className="w-6 h-0.5 rounded-full mb-3" style={{ backgroundColor: p.color }} />
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${p.color}12`, color: p.color }}
                  >
                    {p.category}
                  </span>
                  <h3 className="font-semibold text-sm mt-2 mb-1" style={{ color: '#363334' }}>
                    {p.name}
                  </h3>
                  <p className="text-xs line-clamp-2" style={{ color: 'rgba(0,0,0,0.45)' }}>{p.tagline}</p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
