'use client';

import Link from 'next/link';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex items-start gap-5 p-5 rounded-2xl transition-all duration-200"
      style={{
        backgroundColor: 'rgba(255,255,255,0.8)',
        border: '1px solid rgba(0,0,0,0.08)',
      }}
    >
      {/* Color dot */}
      <div
        className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center mt-0.5"
        style={{ backgroundColor: `${product.color}15`, border: `1px solid ${product.color}30` }}
      >
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: product.color }} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <span
            className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
            style={{ backgroundColor: `${product.color}12`, color: product.color }}
          >
            {product.category}
          </span>
          <span className="text-xs" style={{ color: 'rgba(0,0,0,0.35)' }}>{product.year}</span>
          <span className="text-xs" style={{ color: 'rgba(0,0,0,0.35)' }}>· {product.company}</span>
        </div>

        <h3
          className="text-base font-semibold mb-1 transition-colors"
          style={{ color: '#363334' }}
        >
          {product.name}
        </h3>
        <p className="text-sm leading-relaxed mb-3" style={{ color: 'rgba(0,0,0,0.55)' }}>
          {product.tagline}
        </p>

        {/* Metrics */}
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          {Object.entries(product.metrics).slice(0, 3).map(([key, value]) => (
            <span key={key} className="text-xs">
              <span className="font-semibold" style={{ color: '#363334' }}>{value}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Arrow */}
      <div
        className="flex-shrink-0 mt-1 transition-all duration-200 group-hover:translate-x-0.5"
        style={{ color: 'rgba(0,0,0,0.25)' }}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
