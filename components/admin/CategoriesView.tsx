'use client'

import { useState } from 'react'
import { PRODUCTS } from '@/lib/products-data'

interface CategoryRow {
  id: string
  label: string
  includes_note: string
  addon_note: string
}

const INITIAL_CATEGORIES: CategoryRow[] = [
  {
    id: 'hamburguesas',
    label: 'Hamburguesas',
    includes_note: 'Incluye patatas fritas o aros de cebolla',
    addon_note: '+1€ boniatos fritos',
  },
  {
    id: 'exclusivas',
    label: 'Exclusivas',
    includes_note: 'Incluye patatas fritas o aros de cebolla',
    addon_note: '+1€ boniatos fritos',
  },
  { id: 'picar', label: 'Para Picar', includes_note: '', addon_note: '' },
  { id: 'postres', label: 'Postres', includes_note: '', addon_note: '' },
  {
    id: 'infantil',
    label: 'Menú Infantil',
    includes_note: 'Incluye patatas fritas y refresco o agua',
    addon_note: '',
  },
]

type VisibilityMap = Record<string, boolean>
type EditingField = { id: string; field: 'includes_note' | 'addon_note'; value: string } | null

export function CategoriesView() {
  const [visibilityMap, setVisibilityMap] = useState<VisibilityMap>({})
  const [categories, setCategories] = useState<CategoryRow[]>(INITIAL_CATEGORIES)
  const [editing, setEditing] = useState<EditingField>(null)
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false })

  const showToast = (message: string) => {
    setToast({ message, visible: true })
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2500)
  }

  const confirmEdit = () => {
    if (!editing) return
    setCategories((prev) =>
      prev.map((c) => (c.id === editing.id ? { ...c, [editing.field]: editing.value } : c))
    )
    setEditing(null)
    showToast('Categoría actualizada')
  }

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
        <div style={{ flex: 1 }}>
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
            GESTIÓN DE CATEGORÍAS
          </h1>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)', marginTop: 3 }}>
            {INITIAL_CATEGORIES.length} categorías
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div style={{ padding: '20px 28px', flex: 1 }}>
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
              display: 'grid',
              gridTemplateColumns: '1fr 80px 1fr 1fr',
              gap: 12,
              padding: '10px 20px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              background: '#130C0B',
            }}
          >
            {['Categoría', 'Productos', 'Nota de inclusión', 'Nota extra'].map((h) => (
              <div
                key={h}
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.28)',
                }}
              >
                {h}
              </div>
            ))}
          </div>

          {/* Rows */}
          {categories.map((cat, i) => {
            const isVisible = visibilityMap[cat.id] !== false
            const productCount = PRODUCTS.filter((p) => p.category === cat.id).length

            return (
              <div
                key={cat.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 80px 1fr 1fr',
                  gap: 12,
                  padding: '14px 20px',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.018)',
                  alignItems: 'center',
                }}
              >
                {/* Name + toggle */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    onClick={() => {
                      setVisibilityMap((prev) => ({ ...prev, [cat.id]: !isVisible }))
                      showToast(isVisible ? `${cat.label} ocultada` : `${cat.label} visible`)
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      background: isVisible ? 'rgba(20,110,42,0.17)' : 'rgba(255,255,255,0.04)',
                      border: isVisible
                        ? '1px solid rgba(46,175,60,0.22)'
                        : '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 100,
                      padding: '4px 10px',
                      cursor: 'pointer',
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        background: isVisible ? '#2EAB3A' : 'rgba(255,255,255,0.18)',
                        borderRadius: '50%',
                      }}
                    />
                    <span
                      style={{
                        fontSize: 11,
                        color: isVisible ? '#2EAB3A' : 'rgba(255,255,255,0.4)',
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {isVisible ? 'Visible' : 'Oculta'}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: isVisible ? '#fff' : 'rgba(255,255,255,0.35)',
                    }}
                  >
                    {cat.label}
                  </span>
                </div>

                {/* Product count */}
                <div
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: 18,
                    color: '#F26B30',
                  }}
                >
                  {productCount}
                </div>

                {/* Includes note */}
                <EditableNote
                  value={cat.includes_note}
                  isEditing={editing?.id === cat.id && editing.field === 'includes_note'}
                  editValue={editing?.id === cat.id && editing.field === 'includes_note' ? editing.value : cat.includes_note}
                  placeholder="Sin nota de inclusión"
                  onStart={() => setEditing({ id: cat.id, field: 'includes_note', value: cat.includes_note })}
                  onChange={(v) => setEditing((e) => e ? { ...e, value: v } : e)}
                  onConfirm={confirmEdit}
                  onCancel={() => setEditing(null)}
                />

                {/* Addon note */}
                <EditableNote
                  value={cat.addon_note}
                  isEditing={editing?.id === cat.id && editing.field === 'addon_note'}
                  editValue={editing?.id === cat.id && editing.field === 'addon_note' ? editing.value : cat.addon_note}
                  placeholder="Sin nota extra"
                  onStart={() => setEditing({ id: cat.id, field: 'addon_note', value: cat.addon_note })}
                  onChange={(v) => setEditing((e) => e ? { ...e, value: v } : e)}
                  onConfirm={confirmEdit}
                  onCancel={() => setEditing(null)}
                />
              </div>
            )
          })}
        </div>

        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', marginTop: 14 }}>
          Haz clic en Visible/Oculta para mostrar u ocultar una categoría en la carta pública. Haz clic en el texto de las notas para editarlo.
        </p>
      </div>

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

function EditableNote({
  value,
  isEditing,
  editValue,
  placeholder,
  onStart,
  onChange,
  onConfirm,
  onCancel,
}: {
  value: string
  isEditing: boolean
  editValue: string
  placeholder: string
  onStart: () => void
  onChange: (v: string) => void
  onConfirm: () => void
  onCancel: () => void
}) {
  if (isEditing) {
    return (
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <input
          autoFocus
          value={editValue}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onConfirm()
            if (e.key === 'Escape') onCancel()
          }}
          style={{
            flex: 1,
            background: '#17100F',
            border: '1.5px solid #E32024',
            borderRadius: 6,
            padding: '5px 8px',
            color: '#fff',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            outline: 'none',
          }}
        />
        <button
          onClick={onConfirm}
          style={{
            background: '#E32024',
            border: 'none',
            borderRadius: 5,
            color: '#0F0A09',
            fontWeight: 700,
            fontSize: 13,
            padding: '5px 8px',
            cursor: 'pointer',
          }}
        >
          ✓
        </button>
        <button
          onClick={onCancel}
          style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 5,
            color: 'rgba(255,255,255,0.32)',
            fontSize: 11,
            padding: '5px 7px',
            cursor: 'pointer',
          }}
        >
          ✕
        </button>
      </div>
    )
  }

  return (
    <div
      onClick={onStart}
      style={{
        fontSize: 13,
        color: value ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.18)',
        cursor: 'pointer',
        padding: '4px 0',
        fontStyle: value ? 'normal' : 'italic',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
      }}
    >
      <span>{value || placeholder}</span>
      <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12 }}>✏</span>
    </div>
  )
}
