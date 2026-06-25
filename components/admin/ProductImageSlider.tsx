'use client'

import { useState, useEffect } from 'react'

interface Props {
  images: string[]
  interval?: number
  showDots?: boolean
  style?: React.CSSProperties
}

export function ProductImageSlider({ images, interval = 5000, showDots = false, style }: Props) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return
    const id = setInterval(() => setCurrent(i => (i + 1) % images.length), interval)
    return () => clearInterval(id)
  }, [images.length, interval])

  if (!images.length) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(145deg, #241210 0%, #160C0B 100%)', ...style }}>
        <span style={{ fontSize: 20, opacity: 0.12 }}>🍔</span>
      </div>
    )
  }

  return (
    <div style={{ position: 'relative', overflow: 'hidden', ...style }}>
      {images.map((url, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={url}
          src={url}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: i === current ? 1 : 0,
            transition: 'opacity 0.8s ease-in-out',
          }}
        />
      ))}
      {showDots && images.length > 1 && (
        <div style={{ position: 'absolute', bottom: 6, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 4, zIndex: 1 }}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? 14 : 5,
                height: 5,
                borderRadius: 3,
                background: i === current ? '#fff' : 'rgba(255,255,255,0.35)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
