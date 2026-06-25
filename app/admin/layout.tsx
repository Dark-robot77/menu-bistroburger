import { AdminSidebar } from '@/components/admin/AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        background: '#0F0A09',
        fontFamily: "'DM Sans', sans-serif",
        color: '#fff',
        overflow: 'hidden',
      }}
    >
      <AdminSidebar />
      <main
        style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
        }}
      >
        {children}
      </main>
    </div>
  )
}
