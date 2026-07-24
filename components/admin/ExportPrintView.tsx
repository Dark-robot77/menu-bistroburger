'use client'

import { useMemo, useState } from 'react'
import { CATEGORIES, PRODUCTS, BISTROBURGER_LOGO_URL, getProductsByCategory } from '@/lib/products-data'

type Format = 'A4' | 'A3' | 'A5'
type PageCount = 1 | 2

const FORMATS: Record<Format, { w: number; h: number; label: string; columns: number }> = {
  A5: { w: 148, h: 210, label: 'A5 · 148 × 210 mm', columns: 1 },
  A4: { w: 210, h: 297, label: 'A4 · 210 × 297 mm', columns: 2 },
  A3: { w: 297, h: 420, label: 'A3 · 297 × 420 mm', columns: 3 },
}

const MM_TO_PX = 96 / 25.4
const PREVIEW_WIDTH = 340

const LOGO_PRINT = `${BISTROBURGER_LOGO_URL}?tr=w-400,q-100`

const CONTACT = {
  web: 'bistroburguer.es',
  phone: '925 092 711',
  instagram: '@bistroburguer.es',
  facebook: '/bistroburger.es',
  tiktok: '@bistroburger',
}

// Fondo de portada: brasas y humo (generado con Gemini) + degradado de legibilidad encima
const COVER_BG_IMAGE = '/images/cover-bg.png'
const COVER_BG = [
  'linear-gradient(180deg, rgba(5,3,2,0.6) 0%, rgba(5,3,2,0.12) 32%, rgba(5,3,2,0.1) 55%, rgba(5,3,2,0.45) 100%)',
  `url('${COVER_BG_IMAGE}')`,
].join(', ')

const INCLUDES_NOTE: Record<string, string> = {
  hamburguesas: 'Incluye patatas fritas o aros de cebolla · +1€ boniatos fritos',
  exclusivas: 'Incluye patatas fritas o aros de cebolla · +1€ boniatos fritos',
  infantil: 'Incluye patatas fritas y refresco o agua',
}

export function ExportPrintView() {
  const [format, setFormat] = useState<Format>('A4')
  const [pages, setPages] = useState<PageCount>(2)

  const dims = FORMATS[format]
  const compact = pages === 1

  // Distribuye las categorías entre 1 o 2 hojas sin partir ninguna por la mitad
  const pageGroups = useMemo(() => {
    if (pages === 1) return [CATEGORIES.map((c) => c.id)]
    const total = PRODUCTS.length
    const half = total / 2
    let running = 0
    const first: string[] = []
    const second: string[] = []
    for (const cat of CATEGORIES) {
      const count = getProductsByCategory(cat.id).length
      if (running < half) {
        first.push(cat.id)
        running += count
      } else {
        second.push(cat.id)
      }
    }
    return [first, second].filter((g) => g.length > 0)
  }, [pages])

  const pageWidthPx = dims.w * MM_TO_PX
  const pageHeightPx = dims.h * MM_TO_PX
  const scale = PREVIEW_WIDTH / pageWidthPx
  // En modo compacto no hay fotos, así que aprovechamos el ancho con una columna extra
  const printColumns = Math.min(compact ? dims.columns + 1 : dims.columns, 4)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      {/* Print-only CSS: tamaño de página dinámico + aislar el área imprimible */}
      <style>{`
        @page { size: ${dims.w}mm ${dims.h}mm; margin: 0; }
        @media print {
          html, body { margin: 0; padding: 0; background: #fff; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color-adjust: exact !important; }
          body * { visibility: hidden; }
          #print-area, #print-area * { visibility: visible; }
          #print-area { position: absolute; top: 0; left: 0; margin: 0; }
          .print-page {
            width: ${dims.w}mm;
            min-height: ${dims.h}mm;
            page-break-after: always;
          }
          .print-page:last-child { page-break-after: auto; }
        }
        #print-area { display: none; }
        @media print { #print-area { display: block; } }
      `}</style>

      {/* TOPBAR */}
      <div
        style={{
          padding: '18px 28px',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          flexShrink: 0,
          position: 'sticky',
          top: 0,
          background: '#0F0A09',
          zIndex: 50,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: 24,
              letterSpacing: 1,
              color: '#fff',
              lineHeight: 1,
              margin: 0,
            }}
          >
            IMPRIMIR CARTA
          </h1>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)', marginTop: 3 }}>
            Vista previa en alta resolución (RGB), lista para imprenta
          </div>
        </div>

        <button
          onClick={() => window.print()}
          style={{
            background: '#E32024',
            border: 'none',
            borderRadius: 8,
            padding: '9px 18px',
            color: '#fff',
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: 15,
            letterSpacing: 0.5,
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          🖨 Imprimir carta
        </button>
      </div>

      {/* CONTENT */}
      <div style={{ padding: '24px 28px 60px', display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        {/* Opciones */}
        <div style={{ width: 240, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div>
            <div style={optionLabel}>Formato de papel</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {(Object.keys(FORMATS) as Format[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  style={{
                    textAlign: 'left',
                    background: format === f ? 'rgba(227,32,36,0.1)' : 'transparent',
                    border: format === f ? '1.5px solid #E32024' : '1.5px solid rgba(255,255,255,0.09)',
                    borderRadius: 8,
                    padding: '9px 12px',
                    color: format === f ? '#E32024' : 'rgba(255,255,255,0.6)',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    fontWeight: format === f ? 600 : 400,
                    cursor: 'pointer',
                  }}
                >
                  {FORMATS[f].label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div style={optionLabel}>Distribución</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {[1, 2].map((p) => (
                <button
                  key={p}
                  onClick={() => setPages(p as PageCount)}
                  style={{
                    flex: 1,
                    background: pages === p ? 'rgba(227,32,36,0.1)' : 'transparent',
                    border: pages === p ? '1.5px solid #E32024' : '1.5px solid rgba(255,255,255,0.09)',
                    borderRadius: 8,
                    padding: '9px 8px',
                    color: pages === p ? '#E32024' : 'rgba(255,255,255,0.6)',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    fontWeight: pages === p ? 600 : 400,
                    cursor: 'pointer',
                  }}
                >
                  {p} {p === 1 ? 'hoja' : 'hojas'}
                </button>
              ))}
            </div>
            <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.28)', marginTop: 8, lineHeight: 1.5 }}>
              {compact
                ? 'Modo compacto: toda la carta en una sola hoja, sin fotos, texto denso. En formatos pequeños (A5) puede continuar en una hoja extra si no cabe todo.'
                : 'Modo espacioso: la carta se reparte en 2 hojas, con foto de cada producto.'}
            </div>
          </div>

          <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.28)', lineHeight: 1.6, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 14 }}>
            Al pulsar <strong style={{ color: 'rgba(255,255,255,0.5)' }}>Imprimir carta</strong> se abre el diálogo de
            impresión del navegador. Elige tu impresora o "Guardar como PDF" — el documento mantiene texto vectorial
            y fotos en alta resolución, en color RGB, listo para enviar a imprenta.
          </div>
        </div>

        {/* Preview */}
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: 1 }}>Portada</div>
            <div
              style={{
                width: PREVIEW_WIDTH,
                height: pageHeightPx * scale,
                overflow: 'hidden',
                position: 'relative',
                background: '#0F0A09',
                boxShadow: '0 6px 28px rgba(0,0,0,0.5)',
                borderRadius: 2,
              }}
            >
              <div
                style={{
                  width: pageWidthPx,
                  height: pageHeightPx,
                  transform: `scale(${scale})`,
                  transformOrigin: 'top left',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
              >
                <CoverPage />
              </div>
            </div>
          </div>

          {pageGroups.map((catIds, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: 1 }}>
                Hoja {idx + 1} de {pageGroups.length}
              </div>
              <div
                style={{
                  width: PREVIEW_WIDTH,
                  height: pageHeightPx * scale,
                  overflow: 'hidden',
                  position: 'relative',
                  background: '#FDFBF6',
                  boxShadow: '0 6px 28px rgba(0,0,0,0.5)',
                  borderRadius: 2,
                }}
              >
                <div
                  style={{
                    width: pageWidthPx,
                    height: pageHeightPx,
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                >
                  <PrintPage categoryIds={catIds} compact={compact} columns={printColumns} showHeader={idx === 0} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Área real usada por el navegador al imprimir (fuera de pantalla) */}
      <div id="print-area">
        <div className="print-page" style={{ width: `${dims.w}mm`, height: `${dims.h}mm`, background: '#0F0A09' }}>
          <CoverPage />
        </div>
        {pageGroups.map((catIds, idx) => (
          <div
            key={idx}
            className="print-page"
            style={{ width: `${dims.w}mm`, minHeight: `${dims.h}mm`, background: '#fff' }}
          >
            <PrintPage categoryIds={catIds} compact={compact} columns={printColumns} showHeader={idx === 0} />
          </div>
        ))}
      </div>
    </div>
  )
}

function CoverPage() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: COVER_BG,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        boxSizing: 'border-box',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px',
        overflow: 'hidden',
      }}
    >
      {/* Marco decorativo */}
      <div style={{ position: 'absolute', inset: '14px', border: '1px solid rgba(255,255,255,0.14)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: '18px', border: '1px solid rgba(227,32,36,0.28)', pointerEvents: 'none' }} />

      <div style={{ width: 130, height: 130, borderRadius: '50%', overflow: 'hidden', boxShadow: '0 0 0 3px rgba(227,32,36,0.5), 0 8px 40px rgba(0,0,0,0.6)', marginBottom: 28, position: 'relative' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO_PRINT} alt="Bistroburger" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
      </div>

      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 42, letterSpacing: 4, textTransform: 'uppercase', lineHeight: 1 }}>
        Bistroburger
      </div>
      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 4, color: '#E32024', textTransform: 'uppercase', marginTop: 8 }}>
        Toledo — Carta
      </div>

      <div style={{ width: 56, height: 2, background: '#E32024', margin: '34px 0' }} />

      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 20, letterSpacing: 1, color: '#F26B30' }}>
        {CONTACT.web}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>
        <PhoneIcon size={13} color="rgba(255,255,255,0.6)" />
        {CONTACT.phone}
      </div>

      <div
        style={{
          display: 'flex',
          gap: 22,
          marginTop: 26,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 11.5,
          color: 'rgba(255,255,255,0.5)',
          letterSpacing: 0.3,
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/instagram.svg" alt="Instagram" style={{ width: 15, height: 15, display: 'block' }} />
          {CONTACT.instagram}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/facebook.svg" alt="Facebook" style={{ width: 15, height: 15, display: 'block' }} />
          {CONTACT.facebook}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/tiktok.svg" alt="TikTok" style={{ width: 15, height: 15, display: 'block' }} />
          {CONTACT.tiktok}
        </span>
      </div>
    </div>
  )
}

function PhoneIcon({ size = 14, color = '#fff' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function PrintPage({
  categoryIds,
  compact,
  columns,
  showHeader,
}: {
  categoryIds: string[]
  compact: boolean
  columns: number
  showHeader: boolean
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#FDFBF6',
        color: '#1A1210',
        fontFamily: "'DM Sans', sans-serif",
        padding: compact ? '18px 22px' : '26px 30px',
        boxSizing: 'border-box',
      }}
    >
      {showHeader && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: compact ? 12 : 20, paddingBottom: compact ? 10 : 14, borderBottom: '1px solid rgba(26,18,16,0.1)' }}>
          <div style={{ width: compact ? 34 : 46, height: compact ? 34 : 46, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO_PRINT} alt="Bistroburger" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
          </div>
          <div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: compact ? 18 : 24, letterSpacing: 2, textTransform: 'uppercase', lineHeight: 1 }}>
              Bistroburger
            </div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: compact ? 8 : 10, letterSpacing: 3, color: '#E32024', textTransform: 'uppercase', marginTop: 2 }}>
              Toledo · Parla — Carta
            </div>
          </div>
        </div>
      )}

      <div style={{ columnCount: columns, columnGap: compact ? 16 : 24 }}>
        {categoryIds.map((catId) => {
          const cat = CATEGORIES.find((c) => c.id === catId)
          const products = getProductsByCategory(catId)
          if (!cat || products.length === 0) return null
          const note = INCLUDES_NOTE[catId]

          return (
            <div key={catId} style={{ breakInside: 'avoid-column', marginBottom: compact ? 10 : 16 }}>
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: compact ? 12.5 : 16,
                  letterSpacing: 2,
                  color: '#E32024',
                  textTransform: 'uppercase',
                  borderBottom: '1.5px solid #E32024',
                  paddingBottom: 3,
                  marginBottom: compact ? 6 : 9,
                  breakAfter: 'avoid',
                }}
              >
                {cat.label}
              </div>

              {note && (
                <div style={{ fontSize: compact ? 8 : 10, color: '#888', fontStyle: 'italic', marginBottom: compact ? 5 : 7 }}>
                  {note}
                </div>
              )}

              {products.map((p) => (
                <div
                  key={p.id}
                  style={{
                    display: 'flex',
                    alignItems: compact ? 'baseline' : 'center',
                    gap: compact ? 7 : 11,
                    marginBottom: compact ? 5 : 11,
                    breakInside: 'avoid',
                  }}
                >
                  {!compact && (
                    <div style={{ width: 40, height: 40, borderRadius: 6, overflow: 'hidden', flexShrink: 0, background: '#f0ece4', boxShadow: '0 0 0 1px rgba(26,18,16,0.08)' }}>
                      {p.images?.[0] && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={`${p.images[0]}?tr=w-500,q-100`}
                          alt={p.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      )}
                    </div>
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
                      <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: compact ? 10 : 13, color: '#1A1210' }}>
                        {p.name}
                      </span>
                      {p.is_new && (
                        <span style={{ fontSize: compact ? 6.5 : 8, background: '#E32024', color: '#fff', borderRadius: 3, padding: '1px 4px', fontWeight: 700, letterSpacing: 0.5 }}>
                          NUEVA
                        </span>
                      )}
                    </div>
                    {p.description && (
                      <div style={{ fontSize: compact ? 7.5 : 10, color: '#666', lineHeight: 1.4, marginTop: 1 }}>
                        {p.description}
                      </div>
                    )}
                  </div>
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: compact ? 10 : 13, color: '#F26B30', flexShrink: 0 }}>
                    {p.price}
                  </span>
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const optionLabel: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '1.5px',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.28)',
  marginBottom: 8,
}
