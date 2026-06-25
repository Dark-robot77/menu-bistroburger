'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BISTROBURGER_LOGO_URL } from '@/lib/products-data'

const NAV_ITEMS = [
  { id: 'productos', label: 'Productos', icon: '▤', href: '/admin/productos' },
  { id: 'categorias', label: 'Categorías', icon: '⊞', href: '/admin/categorias' },
  { id: 'promos', label: 'Promos IA', icon: '✦', href: '/admin/promos' },
  { id: 'exportar', label: 'Exportar', icon: '↑', href: '/admin/exportar' },
  { id: 'ajustes', label: 'Ajustes', icon: '⚙', href: '/admin/ajustes' },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div
      style={{
        width: 236,
        flexShrink: 0,
        background: '#08070A',
        borderRight: '1px solid rgba(227,32,36,0.08)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: '18px 18px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        {/* Logo circular */}
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: '50%',
            overflow: 'hidden',
            flexShrink: 0,
            boxShadow: '0 0 0 1px rgba(255,255,255,0.08)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${BISTROBURGER_LOGO_URL}?tr=w-200,q-100`}
            alt="Bistroburger"
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
          />
        </div>
        {/* Texto */}
        <div>
          <div
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: 16,
              color: '#fff',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              lineHeight: 1.1,
            }}
          >
            Bistroburger
          </div>
          <div
            style={{
              fontSize: 9,
              color: 'rgba(227,32,36,0.5)',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginTop: 3,
            }}
          >
            Panel Admin
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: '14px 10px', flex: 1, overflowY: 'auto' }}>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.id}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 11,
                padding: '10px 12px',
                borderRadius: 8,
                marginBottom: 3,
                background: isActive ? 'rgba(227,32,36,0.1)' : 'transparent',
                color: isActive ? '#E32024' : 'rgba(255,255,255,0.52)',
                fontSize: 14,
                fontWeight: isActive ? 500 : 400,
                fontFamily: "'DM Sans', sans-serif",
                borderLeft: isActive ? '2px solid #E32024' : '2px solid transparent',
                textDecoration: 'none',
                transition: 'all 0.12s',
              }}
            >
              <span style={{ fontSize: 14, width: 18, textAlign: 'center', flexShrink: 0 }}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* User footer */}
      <div
        style={{
          padding: '14px 18px',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: 'linear-gradient(135deg,#E32024,#B51A1E)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>B</span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: '#fff',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            Bistroburger
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)' }}>Toledo · Parla</div>
        </div>
      </div>
    </div>
  )
}
