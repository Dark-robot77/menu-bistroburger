'use client'

import { useState } from 'react'
import { CATEGORIES, PRODUCTS, BISTROBURGER_LOGO_URL, type StaticProduct } from '@/lib/products-data'
import { ProductImageSlider } from '@/components/admin/ProductImageSlider'

// URL de logo en alta calidad (400px) para evitar pixelación en cualquier dispositivo
const LOGO_HQ = `${BISTROBURGER_LOGO_URL}?tr=w-400,q-100`

const INCLUDES_NOTE: Record<string, string> = {
  hamburguesas: 'Incluye patatas fritas o aros de cebolla · +1€ boniatos fritos',
  exclusivas:   'Incluye patatas fritas o aros de cebolla · +1€ boniatos fritos',
  infantil:     'Incluye patatas fritas y refresco o agua',
}

export default function CartaPage() {
  const [activeCategory, setActiveCategory] = useState('hamburguesas')

  const products = PRODUCTS.filter((p) => p.category === activeCategory)
  const includesNote = INCLUDES_NOTE[activeCategory]

  return (
    <div style={{ minHeight: '100vh', background: '#0F0A09', fontFamily: "'DM Sans', sans-serif", color: '#fff' }}>

      {/* ── HEADER ── */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '36px 24px 24px', gap: 12 }}>
        {/* Logo — recorte circular elimina esquinas blancas; 400px desde ImageKit = nítido en retina */}
        <div
          style={{
            width: 110,
            height: 110,
            borderRadius: '50%',
            overflow: 'hidden',
            flexShrink: 0,
            boxShadow: '0 0 0 1.5px rgba(255,255,255,0.08), 0 10px 40px rgba(0,0,0,0.6)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LOGO_HQ}
            alt="Bistroburger"
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
          />
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 30, letterSpacing: '3px', color: '#fff', textTransform: 'uppercase', lineHeight: 1 }}>
            Bistroburger
          </div>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '5px', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', marginTop: 4 }}>
            Toledo
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', maxWidth: 180 }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
          <div style={{ width: 5, height: 5, background: '#E32024', borderRadius: '50%', flexShrink: 0 }} />
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
        </div>
      </header>

      {/* ── CATEGORY TABS — sticky, fondo full-ancho ── */}
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: '#0F0A09', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <nav
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '10px 20px',
            overflowX: 'auto',
            display: 'flex',
            gap: 8,
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
          } as React.CSSProperties}
        >
          {CATEGORIES.map((cat) => {
            const isActive = cat.id === activeCategory
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  flexShrink: 0,
                  background: isActive ? '#E32024' : 'rgba(255,255,255,0.06)',
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
                  border: 'none',
                  borderRadius: 100,
                  padding: '7px 18px',
                  fontSize: 13,
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: isActive ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  whiteSpace: 'nowrap',
                }}
              >
                {cat.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* ── CONTENIDO — responsivo ── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px' }}>

        {/* Nota de inclusión */}
        {includesNote && (
          <div
            style={{
              margin: '16px 0 0',
              padding: '9px 14px',
              background: 'rgba(227,32,36,0.07)',
              borderLeft: '2.5px solid rgba(227,32,36,0.4)',
              borderRadius: '0 6px 6px 0',
              fontSize: 12,
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.5,
            }}
          >
            {includesNote}
          </div>
        )}

        {/* Grid de productos — 1 col móvil · 2 col tablet · 3 col escritorio */}
        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-6 lg:gap-x-8 pt-1 pb-12">
          {products.map((product) => (
            <ProductRow key={product.id} product={product} />
          ))}

          {products.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 60, color: 'rgba(255,255,255,0.2)', fontSize: 14 }}>
              Sin productos disponibles
            </div>
          )}
        </main>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '20px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '2.5px', color: 'rgba(255,255,255,0.15)', textTransform: 'uppercase' }}>
          Bistroburger Toledo · Carta digital
        </div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.1)', marginTop: 4 }}>
          Precios con IVA incluido
        </div>
      </footer>
    </div>
  )
}

function ProductRow({ product }: { product: StaticProduct }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '14px 0',
        borderBottom: '1px solid rgba(255,255,255,0.055)',
      }}
    >
      {/* Imagen con slider automático — solicita 320px a ImageKit para nitidez */}
      <ProductImageSlider
        images={(product.images ?? []).map((url) =>
          url.includes('?') ? url : `${url}?tr=w-320,q-90`
        )}
        style={{
          width: 84,
          height: 84,
          borderRadius: 10,
          flexShrink: 0,
          background: 'linear-gradient(145deg, #1E1008 0%, #130C0B 100%)',
        }}
      />

      {/* Texto */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
          <span style={{ fontSize: 15, fontWeight: 500, color: '#fff', lineHeight: 1.3 }}>
            {product.name}
          </span>
          {product.is_new && (
            <span
              style={{
                fontSize: 8,
                background: '#E32024',
                color: '#fff',
                borderRadius: 3,
                padding: '2px 5px',
                fontWeight: 700,
                letterSpacing: '1px',
                flexShrink: 0,
                textTransform: 'uppercase',
              }}
            >
              Nueva
            </span>
          )}
        </div>

        {product.description && (
          <div
            style={{
              fontSize: 12,
              color: 'rgba(255,255,255,0.42)',
              lineHeight: 1.5,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            } as React.CSSProperties}
          >
            {product.description}
          </div>
        )}
      </div>

      {/* Precio */}
      <div
        style={{
          flexShrink: 0,
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          fontSize: 20,
          color: '#F26B30',
          letterSpacing: 0.3,
        }}
      >
        {product.price}
      </div>
    </div>
  )
}
