'use client'

import { useState, useRef } from 'react'
import type { StaticProduct } from '@/lib/products-data'
import { ProductImageSlider } from './ProductImageSlider'

export interface ProductEdits {
  name: string
  description: string
  price: string
  image_url: string
  is_new: boolean
}

interface ProductEditModalProps {
  product: StaticProduct
  onClose: () => void
  onSave: (edits: ProductEdits) => void
}

const MAX_DESC = 300

export function ProductEditModal({ product, onClose, onSave }: ProductEditModalProps) {
  const [name, setName] = useState(product.name)
  const [description, setDescription] = useState(product.description)
  const [price, setPrice] = useState(product.price)
  const [imageUrl, setImageUrl] = useState(product.image_url ?? '')
  const [imagePreview, setImagePreview] = useState(product.image_url ?? '')
  const [isNew, setIsNew] = useState(product.is_new ?? false)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImagePreview(URL.createObjectURL(file))
    setUploadError('')
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('fileName', `${product.id}_${Date.now()}`)
      const res = await fetch('/api/upload-image', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok || data.error) {
        setUploadError(data.error ?? 'Error al subir')
        setImagePreview(imageUrl)
      } else {
        setImageUrl(data.url)
        setImagePreview(data.url)
      }
    } catch {
      setUploadError('Error de conexión')
      setImagePreview(imageUrl)
    } finally {
      setUploading(false)
    }
  }

  const handleSave = () => {
    if (uploading) return
    onSave({ name: name.trim(), description: description.trim(), price: price.trim(), image_url: imageUrl, is_new: isNew })
    onClose()
  }

  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.82)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#110D0C',
          borderRadius: 16,
          width: 700,
          maxWidth: '100%',
          maxHeight: 'calc(100vh - 40px)',
          overflowY: 'auto',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.75)',
          animation: 'slideUp 0.18s ease-out',
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 24px 16px',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            position: 'sticky',
            top: 0,
            background: '#110D0C',
            zIndex: 2,
          }}
        >
          <div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 20, color: '#fff', letterSpacing: 0.5 }}>
              EDITAR PRODUCTO
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)', marginTop: 2 }}>{product.name}</div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.3)', fontSize: 20, padding: 4, lineHeight: 1, cursor: 'pointer' }}>✕</button>
        </div>

        {/* ── Section 1: Nombre y descripción ── */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.55)', marginBottom: 18 }}>
            Nombre y descripción
          </div>

          <div style={{ display: 'flex', gap: 20 }}>
            {/* Left: text fields */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 18 }}>
              {/* Name */}
              <div>
                <label style={labelStyle}>Nombre de la carta</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={inputStyle}
                />
              </div>

              {/* Description */}
              <div>
                <label style={labelStyle}>Descripción corta</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value.slice(0, MAX_DESC))}
                  rows={4}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: 96, lineHeight: 1.6 } as React.CSSProperties}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.22)', fontStyle: 'italic' }}>
                    Tip: menciona ingredientes clave y técnica de preparación
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 500,
                      color: description.length > MAX_DESC * 0.9 ? '#E32024' : 'rgba(255,255,255,0.22)',
                    }}
                  >
                    {description.length} / {MAX_DESC}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: image */}
            <div style={{ width: 148, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div
                style={{
                  width: 148,
                  height: 148,
                  borderRadius: 10,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1.5px dashed rgba(255,255,255,0.1)',
                  overflow: 'hidden',
                  position: 'relative',
                  flexShrink: 0,
                }}
              >
                <ProductImageSlider
                  images={imagePreview ? [imagePreview] : (product.images ?? [])}
                  showDots
                  style={{ width: '100%', height: '100%' }}
                />
                {uploading && (
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#E32024', animation: 'pulse 1.4s ease-in-out infinite' }} />
                  </div>
                )}
              </div>

              <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} style={{ display: 'none' }} />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8,
                  padding: '8px 0',
                  color: uploading ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.7)',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  cursor: uploading ? 'not-allowed' : 'pointer',
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                {uploading ? 'Subiendo…' : '↑  Cambiar foto'}
              </button>

              {uploadError && (
                <span style={{ fontSize: 11, color: '#E32024', opacity: 0.85 }}>{uploadError}</span>
              )}

              {/* is_new toggle */}
              <div style={{ marginTop: 4 }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '1.2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 8 }}>
                  Etiqueta
                </div>
                <button
                  onClick={() => setIsNew((v) => !v)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    background: isNew ? 'rgba(227,32,36,0.1)' : 'rgba(255,255,255,0.04)',
                    border: isNew ? '1.5px solid rgba(227,32,36,0.35)' : '1.5px solid rgba(255,255,255,0.08)',
                    borderRadius: 8,
                    padding: '8px 10px',
                    cursor: 'pointer',
                    width: '100%',
                  }}
                >
                  <div
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: 3,
                      background: isNew ? '#E32024' : 'transparent',
                      border: isNew ? '2px solid #E32024' : '2px solid rgba(255,255,255,0.18)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {isNew && <span style={{ fontSize: 9, color: '#fff', lineHeight: 1, fontWeight: 700 }}>✓</span>}
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: isNew ? '#E32024' : 'rgba(255,255,255,0.4)', letterSpacing: 0.5 }}>
                      NUEVA
                    </div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.22)', marginTop: 1 }}>en la carta</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Section 2: Precio ── */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.55)' }}>
              Precio
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00€"
                style={{
                  width: 130,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1.5px solid rgba(255,255,255,0.1)',
                  borderRadius: 10,
                  padding: '12px 14px',
                  color: '#F26B30',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: 24,
                  outline: 'none',
                  textAlign: 'center',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#E32024')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
              />
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.22)', lineHeight: 1.5 }}>
              Precio con IVA incluido.<br />Visible en la carta pública.
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div
          style={{
            padding: '16px 24px',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 10,
            position: 'sticky',
            bottom: 0,
            background: '#110D0C',
          }}
        >
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8,
              padding: '10px 22px',
              color: 'rgba(255,255,255,0.4)',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={uploading}
            style={{
              background: uploading ? 'rgba(227,32,36,0.45)' : '#E32024',
              border: 'none',
              borderRadius: 8,
              padding: '10px 30px',
              color: '#0F0A09',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: 0.5,
              cursor: uploading ? 'not-allowed' : 'pointer',
            }}
          >
            GUARDAR
          </button>
        </div>
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: '1.5px',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.3)',
  marginBottom: 7,
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.09)',
  borderRadius: 8,
  padding: '10px 12px',
  color: '#fff',
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 14,
  outline: 'none',
  display: 'block',
}
