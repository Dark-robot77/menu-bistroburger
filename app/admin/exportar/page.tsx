export default function ExportarPage() {
  return <PendingSection title="EXPORTAR" fase="Fase 4" desc="Generación de PDF de la carta en A4/A3 con conversión CMYK para imprenta profesional mediante Puppeteer y Ghostscript." />
}

function PendingSection({ title, fase, desc }: { title: string; fase: string; desc: string }) {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 14,
        padding: 60,
        minHeight: '60vh',
      }}
    >
      <div
        style={{
          background: 'rgba(227,32,36,0.07)',
          border: '1px solid rgba(227,32,36,0.15)',
          borderRadius: 8,
          padding: '4px 12px',
          fontSize: 11,
          color: 'rgba(227,32,36,0.6)',
          letterSpacing: 2,
          fontWeight: 600,
        }}
      >
        {fase.toUpperCase()}
      </div>
      <div
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 32,
          fontWeight: 700,
          color: 'rgba(255,255,255,0.55)',
          letterSpacing: 2,
          textTransform: 'uppercase',
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 14,
          color: 'rgba(255,255,255,0.3)',
          maxWidth: 360,
          textAlign: 'center',
          lineHeight: 1.6,
        }}
      >
        {desc}
      </div>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.15)', marginTop: 4 }}>
        Pendiente de implementar
      </div>
    </div>
  )
}
