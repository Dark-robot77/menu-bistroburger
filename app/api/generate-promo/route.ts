import { NextRequest, NextResponse } from 'next/server'

const PROMO_LABELS: Record<string, string> = {
  descuento: 'descuento especial',
  lanzamiento: 'nuevo lanzamiento',
  destacado: 'destacado del día',
  vuelta: 'vuelta al menú',
}

export async function POST(req: NextRequest) {
  const { product, promoType } = await req.json()

  const prompt = `Eres el community manager de Bistroburger, una hamburguesería premium en Toledo y Parla, España.
Crea una publicación corta y apetitosa para redes sociales (Instagram/WhatsApp).

Producto: ${product.name}
Descripción: ${product.description || 'deliciosa opción de nuestra carta'}
Precio: ${product.price}
Tipo de promo: ${PROMO_LABELS[promoType] ?? promoType}

Escribe SOLO el texto de la publicación (2-3 líneas en español, tono energético y apetitoso, con algún emoji). Sin comillas ni explicaciones.`

  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    await new Promise((r) => setTimeout(r, 800))
    return NextResponse.json({
      text: `🔥 ${product.name} — el sabor que te conquista.\nEste fin de semana en Bistroburger Toledo y Parla.\n💥 ¡No te lo puedes perder a solo ${product.price}!`,
    })
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 200,
        temperature: 0.8,
      }),
    })
    const data = await response.json()
    const text = data.choices?.[0]?.message?.content ?? 'No se pudo generar el texto.'
    return NextResponse.json({ text })
  } catch {
    return NextResponse.json(
      { text: 'No se pudo generar. Comprueba la conexión e intenta de nuevo.' },
      { status: 500 }
    )
  }
}
