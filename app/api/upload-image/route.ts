import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  const fileName = (formData.get('fileName') as string) || `product_${Date.now()}`

  if (!file) {
    return NextResponse.json({ error: 'No se recibió ningún archivo' }, { status: 400 })
  }

  if (!privateKey) {
    // Dev fallback: return a placeholder ImageKit URL
    return NextResponse.json({
      url: `https://ik.imagekit.io/demo/bistroburger/${fileName}`,
      fileId: 'dev-mock',
    })
  }

  try {
    const bytes = await file.arrayBuffer()
    const base64File = Buffer.from(bytes).toString('base64')

    const ikForm = new FormData()
    ikForm.append('file', base64File)
    ikForm.append('fileName', fileName)
    ikForm.append('folder', '/bistroburger/products')
    ikForm.append('useUniqueFileName', 'true')

    const credentials = Buffer.from(`${privateKey}:`).toString('base64')

    const res = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
      method: 'POST',
      headers: { Authorization: `Basic ${credentials}` },
      body: ikForm,
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json(
        { error: data.message ?? 'Error al subir a ImageKit' },
        { status: 500 }
      )
    }

    return NextResponse.json({ url: data.url, fileId: data.fileId })
  } catch {
    return NextResponse.json({ error: 'Error de conexión con ImageKit' }, { status: 500 })
  }
}
