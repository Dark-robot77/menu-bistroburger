'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CATEGORIES, getProductsByCategory, StaticProduct } from '@/lib/products-data'
import { PromoModal } from './PromoModal'
import { ProductEditModal, type ProductEdits } from './ProductEditModal'
import { ProductImageSlider } from './ProductImageSlider'

type StatusMap = Record<string, boolean>
type EditsMap = Record<string, ProductEdits>

export function ProductsView() {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState('hamburguesas')
  const [search, setSearch] = useState('')
  const [statusMap, setStatusMap] = useState<StatusMap>({})
  const [inlineEdit, setInlineEdit] = useState<{ id: string; value: string } | null>(null)
  const [promoProduct, setPromoProduct] = useState<StaticProduct | null>(null)
  const [editModal, setEditModal] = useState<StaticProduct | null>(null)
  const [editsMap, setEditsMap] = useState<EditsMap>({})
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false })

  const showToast = (message: string) => {
    setToast({ message, visible: true })
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2500)
  }

  // Merge saved edits into a product for display
  const merged = (p: StaticProduct) => {
    const e = editsMap[p.id]
    return e ? { ...p, ...e } : p
  }

  const handleSaveEdit = (edits: ProductEdits) => {
    if (!editModal) return
    setEditsMap((prev) => ({ ...prev, [editModal.id]: edits }))
    showToast('Producto actualizado')
  }

  const openEditModal = (product: StaticProduct) => {
    const e = editsMap[product.id]
    setEditModal(e ? { ...product, ...e } : product)
  }

  const q = search.trim().toLowerCase()
  const categoryProducts = getProductsByCategory(activeCategory)
  const filtered = q
    ? categoryProducts.filter((p) => {
        const m = merged(p)
        return m.name.toLowerCase().includes(q) || m.description.toLowerCase().includes(q)
      })
    : categoryProducts

  const activeCatLabel = CATEGORIES.find((c) => c.id === activeCategory)?.label ?? ''

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>

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
            GESTIÓN DE PRODUCTOS
          </h1>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)', marginTop: 3 }}>
            {filtered.length} productos · {activeCatLabel}
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: 8,
              padding: '9px 14px 9px 36px',
              color: '#fff',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              width: 210,
            }}
          />
          <svg
            style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
            width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="rgba(255,255,255,0.28)" strokeWidth="2.5" strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </div>

        <button
          onClick={() => router.push('/admin/exportar')}
          style={{
            background: 'transparent',
            border: '1.5px solid rgba(255,255,255,0.12)',
            borderRadius: 8,
            padding: '9px 16px',
            color: 'rgba(255,255,255,0.7)',
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: 15,
            letterSpacing: 0.5,
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 7,
          }}
        >
          🖨 IMPRIMIR CARTA
        </button>

        <button
          style={{
            background: '#E32024',
            border: 'none',
            borderRadius: 8,
            padding: '9px 18px',
            color: '#0F0A09',
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: 15,
            letterSpacing: 0.5,
            whiteSpace: 'nowrap',
            cursor: 'pointer',
          }}
        >
          + AÑADIR
        </button>
      </div>

      {/* CONTENT */}
      <div style={{ padding: '20px 28px', flex: 1 }}>

        {/* Category tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                background: cat.id === activeCategory ? '#E32024' : 'transparent',
                color: cat.id === activeCategory ? '#0F0A09' : 'rgba(255,255,255,0.52)',
                border: cat.id === activeCategory ? '1.5px solid #E32024' : '1.5px solid rgba(255,255,255,0.1)',
                borderRadius: 100,
                padding: '6px 16px',
                fontSize: 13,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: cat.id === activeCategory ? 600 : 400,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.12s',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div
          style={{
            background: '#100C0B',
            borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.05)',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '10px 16px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              background: '#130C0B',
            }}
          >
            <div style={{ width: 48, flexShrink: 0 }} />
            <div style={thStyle}>Producto</div>
            <div style={{ ...thStyle, flex: 'none', width: 152 }}>Precio</div>
            <div style={{ ...thStyle, flex: 'none', width: 148 }}>Estado</div>
            <div style={{ ...thStyle, flex: 'none', width: 112 }}>Promo</div>
            <div style={{ width: 32, flexShrink: 0 }} />
          </div>

          {/* Rows */}
          {filtered.map((product, i) => {
            const m = merged(product)
            const isInlineEditing = inlineEdit?.id === product.id
            const displayPrice = inlineEdit?.id === product.id ? inlineEdit.value : m.price
            const isAvailable = statusMap[product.id] !== false

            return (
              <div
                key={product.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '11px 16px',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.018)',
                }}
              >
                {/* Thumbnail */}
                <ProductImageSlider
                  images={m.image_url ? [m.image_url] : (product.images ?? [])}
                  style={{ width: 48, height: 48, borderRadius: 6, flexShrink: 0 }}
                />

                {/* Name + description */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontWeight: 500,
                      fontSize: 14,
                      color: '#fff',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {m.name}
                    {m.is_new && (
                      <span
                        style={{
                          marginLeft: 8,
                          fontSize: 9,
                          background: '#E32024',
                          color: '#fff',
                          borderRadius: 3,
                          padding: '2px 5px',
                          fontWeight: 700,
                          letterSpacing: 1,
                          verticalAlign: 'middle',
                        }}
                      >
                        NUEVA
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.52)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      marginTop: 2,
                    }}
                  >
                    {m.description}
                  </div>
                </div>

                {/* Price — inline editable */}
                <div style={{ width: 152, flexShrink: 0 }}>
                  {!isInlineEditing ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span
                        style={{
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontWeight: 700,
                          fontSize: 19,
                          color: '#F26B30',
                        }}
                      >
                        {m.price}
                      </span>
                      <button
                        onClick={() => setInlineEdit({ id: product.id, value: m.price })}
                        style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.25)', padding: 3, fontSize: 13, lineHeight: 1, cursor: 'pointer' }}
                        title="Editar precio"
                      >
                        ✏
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <input
                        type="text"
                        value={displayPrice}
                        onChange={(e) => setInlineEdit({ id: product.id, value: e.target.value })}
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            setEditsMap((prev) => ({
                              ...prev,
                              [product.id]: { ...prev[product.id], name: m.name, description: m.description, image_url: m.image_url ?? '', is_new: m.is_new ?? false, price: inlineEdit?.value ?? m.price },
                            }))
                            setInlineEdit(null)
                            showToast('Precio actualizado')
                          }
                          if (e.key === 'Escape') setInlineEdit(null)
                        }}
                        style={{
                          width: 74,
                          background: '#17100F',
                          border: '1.5px solid #E32024',
                          borderRadius: 6,
                          padding: '5px 8px',
                          color: '#F26B30',
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontWeight: 700,
                          fontSize: 15,
                          outline: 'none',
                        }}
                      />
                      <button
                        onClick={() => {
                          setEditsMap((prev) => ({
                            ...prev,
                            [product.id]: { ...prev[product.id], name: m.name, description: m.description, image_url: m.image_url ?? '', is_new: m.is_new ?? false, price: inlineEdit?.value ?? m.price },
                          }))
                          setInlineEdit(null)
                          showToast('Precio actualizado')
                        }}
                        style={{ background: '#E32024', border: 'none', borderRadius: 5, color: '#0F0A09', fontWeight: 700, fontSize: 13, padding: '5px 8px', lineHeight: 1, cursor: 'pointer' }}
                      >
                        ✓
                      </button>
                      <button
                        onClick={() => setInlineEdit(null)}
                        style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 5, color: 'rgba(255,255,255,0.32)', fontSize: 11, padding: '5px 7px', lineHeight: 1, cursor: 'pointer' }}
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>

                {/* Status toggle */}
                <div style={{ width: 148, flexShrink: 0 }}>
                  {isAvailable ? (
                    <div
                      onClick={() => { setStatusMap((prev) => ({ ...prev, [product.id]: false })); showToast('Producto ocultado') }}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(20,110,42,0.17)', border: '1px solid rgba(46,175,60,0.22)', borderRadius: 100, padding: '5px 12px', cursor: 'pointer' }}
                    >
                      <div style={{ width: 6, height: 6, background: '#2EAB3A', borderRadius: '50%', flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: '#2EAB3A', fontWeight: 500, whiteSpace: 'nowrap' }}>Disponible</span>
                    </div>
                  ) : (
                    <div
                      onClick={() => { setStatusMap((prev) => ({ ...prev, [product.id]: true })); showToast('Producto activado') }}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 100, padding: '5px 12px', cursor: 'pointer' }}
                    >
                      <div style={{ width: 6, height: 6, background: 'rgba(255,255,255,0.18)', borderRadius: '50%', flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.52)', fontWeight: 500, whiteSpace: 'nowrap' }}>Oculto</span>
                    </div>
                  )}
                </div>

                {/* Promo IA */}
                <div style={{ width: 112, flexShrink: 0 }}>
                  <button
                    onClick={() => setPromoProduct({ ...product, price: m.price })}
                    style={{
                      background: 'transparent',
                      border: '1px solid rgba(227,32,36,0.28)',
                      borderRadius: 6,
                      color: 'rgba(227,32,36,0.65)',
                      fontSize: 12,
                      padding: '6px 0',
                      fontFamily: "'DM Sans', sans-serif",
                      width: '100%',
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                    }}
                  >
                    ✦ Promo IA
                  </button>
                </div>

                {/* Edit (⋮) */}
                <div style={{ width: 32, flexShrink: 0, textAlign: 'center' }}>
                  <button
                    onClick={() => openEditModal(product)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'rgba(255,255,255,0.38)',
                      fontSize: 18,
                      padding: 4,
                      lineHeight: 0.6,
                      letterSpacing: 0,
                      cursor: 'pointer',
                    }}
                    title="Editar producto"
                  >
                    ⋮
                  </button>
                </div>
              </div>
            )
          })}

          {filtered.length === 0 && (
            <div style={{ padding: 40, textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>
              No se encontraron productos
            </div>
          )}
        </div>
      </div>

      {/* Promo modal */}
      {promoProduct && (
        <PromoModal
          product={promoProduct}
          onClose={() => setPromoProduct(null)}
          onCopied={() => showToast('Texto copiado')}
        />
      )}

      {/* Edit modal */}
      {editModal && (
        <ProductEditModal
          product={editModal}
          onClose={() => setEditModal(null)}
          onSave={handleSaveEdit}
        />
      )}

      {/* Toast */}
      {toast.visible && (
        <div
          style={{
            position: 'fixed',
            bottom: 28,
            right: 28,
            background: '#0D2E14',
            border: '1px solid rgba(46,175,60,0.28)',
            borderRadius: 10,
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            zIndex: 2000,
            animation: 'slideUp 0.18s ease-out',
          }}
        >
          <div style={{ width: 7, height: 7, background: '#2EAB3A', borderRadius: '50%', flexShrink: 0 }} />
          <span style={{ fontSize: 14, color: '#2EAB3A', fontWeight: 500 }}>{toast.message}</span>
        </div>
      )}
    </div>
  )
}

const thStyle: React.CSSProperties = {
  flex: 1,
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '1.5px',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.28)',
  flexShrink: 0,
}
