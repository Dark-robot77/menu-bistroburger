'use client'

import { useState } from 'react'
import type { StaticProduct } from '@/lib/products-data'

const PROMO_TYPES = [
  { id: 'descuento', label: 'Descuento' },
  { id: 'lanzamiento', label: 'Lanzamiento' },
  { id: 'destacado', label: 'Destacado del día' },
]

interface PromoModalProps {
  product: StaticProduct
  onClose: () => void
  onCopied: () => void
}

export function PromoModal({ product, onClose, onCopied }: PromoModalProps) {
  const [promoType, setPromoType] = useState('descuento')
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState('')

  const generate = async () => {
    setGenerating(true)
    setGenerated('')
    try {
      const res = await fetch('/api/generate-promo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product, promoType }),
      })
      const data = await res.json()
      setGenerated(data.text || 'No se pudo generar el texto.')
    } catch {
      setGenerated('No se pudo generar. Comprueba la conexión e intenta de nuevo.')
    } finally {
      setGenerating(false)
    }
  }

  const copy = () => {
    if (navigator.clipboard && generated) {
      navigator.clipboard.writeText(generated)
      onCopied()
    }
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.8)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#17100F',
          borderRadius: 16,
          padding: 28,
          width: 460,
          maxWidth: 'calc(100vw - 40px)',
          border: '1px solid rgba(227,32,36,0.18)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
          animation: 'slideUp 0.18s ease-out',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 22,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: 22,
                color: '#fff',
                letterSpacing: 0.5,
              }}
            >
              CREAR PROMO IA
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.36)', marginTop: 3 }}>
              {product.name}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(255,255,255,0.28)',
              fontSize: 20,
              padding: 2,
              lineHeight: 1,
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>

        {/* Promo type */}
        <div
          style={{
            fontSize: 11,
            color: 'rgba(255,255,255,0.32)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: 10,
          }}
        >
          ¿Qué tipo de promo?
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 22, flexWrap: 'wrap' }}>
          {PROMO_TYPES.map((t) => (
            <button
              key={t.id}
              onClick={() => setPromoType(t.id)}
              style={{
                background: promoType === t.id ? 'rgba(227,32,36,0.14)' : 'transparent',
                color: promoType === t.id ? '#E32024' : 'rgba(255,255,255,0.52)',
                border:
                  promoType === t.id
                    ? '1.5px solid rgba(227,32,36,0.5)'
                    : '1.5px solid rgba(255,255,255,0.1)',
                borderRadius: 100,
                padding: '8px 18px',
                fontSize: 13,
                fontFamily: "'DM Sans', sans-serif",
                cursor: 'pointer',
                fontWeight: promoType === t.id ? 500 : 400,
                transition: 'all 0.12s',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Generate button */}
        <button
          onClick={generate}
          disabled={generating}
          style={{
            width: '100%',
            background: generating ? 'rgba(227,32,36,0.5)' : '#E32024',
            border: 'none',
            borderRadius: 9,
            padding: 13,
            color: '#0F0A09',
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: 17,
            letterSpacing: 1,
            marginBottom: 14,
            cursor: generating ? 'not-allowed' : 'pointer',
          }}
        >
          GENERAR CON IA
        </button>

        {/* Generating state */}
        {generating && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              padding: 10,
              color: 'rgba(227,32,36,0.6)',
              fontSize: 13,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#E32024',
                animation: 'pulse 1.4s ease-in-out infinite',
                flexShrink: 0,
              }}
            />
            <span>Generando con IA...</span>
          </div>
        )}

        {/* Generated text */}
        {generated && !generating && (
          <div
            style={{
              background: '#251A0A',
              borderRadius: 9,
              padding: 16,
              border: '1px solid rgba(227,32,36,0.12)',
            }}
          >
            <div
              style={{
                fontSize: 14,
                color: 'rgba(255,255,255,0.82)',
                lineHeight: 1.65,
                whiteSpace: 'pre-wrap',
              }}
            >
              {generated}
            </div>
            <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
              <button
                onClick={copy}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(227,32,36,0.3)',
                  borderRadius: 6,
                  color: 'rgba(227,32,36,0.7)',
                  fontSize: 12,
                  padding: '7px 14px',
                  fontFamily: "'DM Sans', sans-serif",
                  cursor: 'pointer',
                }}
              >
                Copiar
              </button>
              <button
                onClick={generate}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.09)',
                  borderRadius: 6,
                  color: 'rgba(255,255,255,0.35)',
                  fontSize: 12,
                  padding: '7px 14px',
                  fontFamily: "'DM Sans', sans-serif",
                  cursor: 'pointer',
                }}
              >
                Regenerar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
