# Brief técnico — Menú digital Bistroburger

**Versión:** 1.0  
**Cliente:** Bistroburger Toledo  
**Fecha:** Junio 2026  

---

## 1. Visión general

Sistema web compuesto por dos partes:

- **Carta digital pública** — interfaz de cliente, accesible desde QR en mesa o enlace directo. Sin instalación, sin app. Mobile-first.
- **Panel de administración privado** — interfaz interna para el dueño. Gestión de precios, productos, generación de promos con IA y exportación de la carta para imprimir.

Ambas partes comparten la misma base de datos en tiempo real: cualquier cambio en el panel se refleja al instante en la carta pública.

---

## 2. Módulos del sistema

```
┌─────────────────────────────────────────────────────┐
│                  BISTROBURGER SYSTEM                │
├─────────────────┬───────────────────┬───────────────┤
│  Carta Digital  │  Panel de Admin   │  Módulo IA    │
│  (público)      │  (privado)        │  (interno)    │
├─────────────────┼───────────────────┼───────────────┤
│ - Menú por      │ - Login seguro    │ - Generador   │
│   categorías    │ - CRUD productos  │   de posts    │
│ - Búsqueda      │ - Edición precios │ - Texto promo │
│ - Filtros       │ - Toggle visib.   │ - Imagen IA   │
│ - QR en mesa    │ - Exportar PDF    │ - Descarga    │
│ - Responsive    │ - Print CMYK      │   lista       │
└─────────────────┴───────────────────┴───────────────┘
         ↕                  ↕                 ↕
┌─────────────────────────────────────────────────────┐
│              BASE DE DATOS (Supabase)               │
│   products · categories · extras · settings         │
└─────────────────────────────────────────────────────┘
```

---

## 3. Inventario de contenido (extraído del PDF)

### Categoría 1 — Hamburguesas
*Incluye patatas fritas o aros de cebolla. +1€ boniatos fritos.*

| Producto | Descripción | Precio |
|----------|-------------|--------|
| Bistro Ternera | 200g de ternera, queso, bacon, pepinillos, tomate, lechuga y salsa de la casa | 10.90€ |
| Bistro Pollo | Filete de pollo crujiente, queso, bacon, pepinillos, tomate, lechuga y salsa de la casa | 9.90€ |
| Bistro Doble | Doble carne, pollo o mixta, queso, bacon, pepinillos, tomate, lechuga y salsa de la casa | 14.90€ |
| Bistro Porky | Carne de cerdo horneada a fuego lento con especias, bacon, tomate, queso cheddar y salsa de la casa | 10.90€ |
| Bistro Fit | Filete de pollo a la plancha, queso, tomate, cebolla, pepinillo, lechuga y salsa de la casa | 9.90€ |
| Bistro Especial | Ternera, champiñones, cebolla caramelizada, queso, bacon, pepinillos, tomate, lechuga y salsa de la casa | 14.90€ |
| Bistro Super | 300g de ternera + 300g de cerdo horneado, queso cheddar y salsa de la casa | 16.90€ |
| Bistro Maxi | 200g cerdo + 350g ternera + pollo crujiente, lechuga, queso, bacon, tomate, huevo y salsa de la casa | 19.90€ |
| Bistro Vegana | Proteína de guisante, lechuga, tomate, cebolla, pepinillo y salsa de la casa | 10.90€ |

### Categoría 2 — Hamburguesas Exclusivas
*Incluye patatas fritas o aros de cebolla. +1€ boniatos fritos.*

| Producto | Descripción | Precio |
|----------|-------------|--------|
| Bistro Mexicana | Ternera, queso cheddar, crema agria, guacamole, pico de gallo y jalapeños | 13.90€ |
| Bistro Volanding | Pollo crujiente, salsa tres quesos (azul, curado, cheddar), bacon crujiente y huevo | 11.90€ |
| Bistro Plátano | Ternera, plátano macho maduro frito, queso curado empanado frito y salsa de la casa | 12.90€ |
| Bistro Pizza | Ternera, salsa de tomate, queso mozzarella fundido, orégano y salsa de la casa | 12.90€ |
| Bistro BBQ | Ternera, doble queso cheddar, triple bacon, salsa BBQ, cebolla tostada y salsa de la casa | 12.90€ |
| Bistro Cuatro Quesos | Ternera, cheddar, queso de cabra, queso curado, mozzarella y salsa de la casa | 13.90€ |
| Bistro Mac & Cheese | Ternera, bacon, bañada en macarrones con queso fundido | 12.90€ |
| Bistro Bacon Queso | Ternera, lonchas de bacon, queso de cabra bañado en miel y salsa de la casa | 12.90€ |
| Bistro Róculita | Ternera, queso curado rayado, cebolla caramelizada, bacon, rúcula y salsa de la casa | 13.90€ |
| Bistro Patacón | Pan sustituido por plátano macho frito, cerdo deshilachado, queso curado rallado y salsa | 13.90€ |
| Bistro Raclette ⭐ NUEVA | Ternera, salsa pepinillos, queso raclette, pepinillo, bacon, bañado en queso raclette | 13.90€ |

### Categoría 3 — Para Picar

| Producto | Descripción | Precio |
|----------|-------------|--------|
| Nachos | Maíz, carne picada, alubias rojas, queso fundido, crema agria, guacamole y pico de gallo | 10.90€ |
| Alitas | (12) alitas de pollo fritas con salsa barbecue o salsa picante | 9.90€ |
| Tequeños | (8) palitos de queso con masa de harina de trigo frita rellena de queso blanco | 8.90€ |
| Ensalada César | Lechuga romana, crotones, pollo empanado, queso padano y salsa césar | 9.90€ |
| Nuggets | (8) nuggets caseros con patatas fritas | 8.90€ |
| Patatas Especiales | Patatas fritas con queso fundido y bacon | 8.90€ |
| Bandeja Bistro | Nachos, nuggets, tequeños, aros de cebolla y patatas fritas | 16.90€ |
| Patatas Fritas | Ración de nuestras únicas patatas fritas | 3.20€ |
| Aros de Cebolla | (5) aros de cebolla fritos | 3.20€ |
| Boniatos Fritos | Similar a la patata pero con un toque dulce | 3.90€ |

### Categoría 4 — Extras

| Producto | Precio |
|----------|--------|
| Queso Cheddar | 0.50€ |
| Champiñones | 0.50€ |
| Bacon | 0.50€ |
| Huevo | 1.00€ |
| Cebolla Caramelizada | 1.00€ |
| Queso Cabra | 1.00€ |

### Categoría 5 — Postres

| Producto | Precio |
|----------|--------|
| Tarta de Queso | 4.90€ |
| Tarta de Chocolate | 4.90€ |
| Tequeños de Chocolate | 5.90€ |
| Brownie con Helado | 4.90€ |
| Tortitas con Miel o Chocolate | 3.90€ |

### Categoría 6 — Menú Infantil
*Incluye patatas fritas y refresco o agua.*

| Producto | Descripción | Precio |
|----------|-------------|--------|
| Menú Burger | Carne junior 150g, queso y salsa de la casa | 9.90€ |
| Menú Nuggets | (5) nuggets caseros | 9.90€ |

---

## 4. Modelo de datos

### Tabla `categories`
```ts
{
  id: uuid
  name: string               // "Hamburguesas"
  slug: string               // "hamburguesas"
  includes_note: string      // "Incluye patatas fritas o aros de cebolla"
  addon_note: string         // "+1€ boniatos fritos"
  sort_order: number
  visible: boolean
  created_at: timestamp
}
```

### Tabla `products`
```ts
{
  id: uuid
  category_id: uuid (fk → categories)
  name: string               // "Bistro Ternera"
  description: text
  price: decimal(6,2)
  image_url: string          // Cloudinary URL
  available: boolean         // ocultar sin borrar
  is_new: boolean            // badge "NUEVA"
  is_featured: boolean       // destacado en carta
  sort_order: number
  created_at: timestamp
  updated_at: timestamp
}
```

### Tabla `extras`
```ts
{
  id: uuid
  name: string               // "Queso Cheddar"
  price: decimal(4,2)
  available: boolean
  sort_order: number
}
```

### Tabla `price_history`
```ts
{
  id: uuid
  product_id: uuid (fk → products)
  old_price: decimal(6,2)
  new_price: decimal(6,2)
  changed_at: timestamp
  changed_by: string         // email del admin
}
```

### Tabla `settings`
```ts
{
  key: string     // "logo_url", "brand_color", "phone", "address", "instagram"
  value: text
}
```

---

## 5. Funcionalidades por módulo

### 5.1 Carta digital (público)

- Navegación por categorías (tabs o scroll snapping)
- Cada ítem muestra: imagen, nombre, descripción, precio, badge (NUEVA, DESTACADA)
- Búsqueda en tiempo real por nombre o ingrediente
- Sección de extras al final
- Datos de contacto y ubicación en footer
- Responsive mobile-first (el 90% del tráfico será móvil)
- Sin login, sin carrito (en v1) — solo consulta del menú
- Carga rápida: imágenes optimizadas vía Cloudinary con lazy loading
- SEO básico: meta tags, Open Graph para compartir en redes

### 5.2 Panel de administración (privado)

#### Gestión de productos
- Listar todos los productos por categoría
- Editar precio directamente en línea (click → input → guardar)
- Editar nombre, descripción, imagen
- Toggle disponible/no disponible (sin eliminar)
- Toggle "es nueva" para el badge
- Reordenar ítems (drag & drop)
- Añadir / eliminar productos

#### Gestión de categorías
- Mostrar/ocultar categoría entera
- Editar nota de inclusión ("Incluye patatas…")
- Reordenar categorías

#### Historial de precios
- Ver log de todos los cambios de precio con fecha y hora

#### Configuración general
- Logo, color de marca, datos de contacto, redes sociales

### 5.3 Generador de promos con IA

Flujo desde el panel de admin:

```
1. El admin selecciona un producto
2. Hace clic en "Crear promo"
3. Aparece un modal con opciones:
     - Tipo: Lanzamiento | Descuento | Destacado del día | Vuelta al menú
     - Red: Instagram | Facebook | WhatsApp | Story
     - Detalles opcionales: "20% este fin de semana", "edición limitada", etc.
4. Clic en "Generar"
5. El sistema llama a OpenAI API (GPT-4o) → genera el caption del post
6. El sistema llama a KIE AI → genera imagen con IA
     (prompt construido automáticamente con nombre del producto + tipo de promo)
7. El modal muestra:
     - Vista previa de la imagen generada
     - Texto del caption con hashtags
     - Botones: "Descargar imagen" | "Copiar texto" | "Regenerar"
```

#### Datos que se envían a OpenAI para generar el caption:
```
- Nombre del producto
- Descripción
- Precio
- Tipo de promo
- Red destino
- Detalles adicionales del admin
- Tono: cercano, informal, en español España
```

### 5.4 Exportación e impresión

| Opción | Detalle |
|--------|---------|
| Formato | A4 vertical · A4 horizontal · A3 · Personalizado |
| Selección | Todas las categorías o selección manual |
| Color modo pantalla | RGB, para digital |
| Color impresión | CMYK, generado con perfil ICC estándar (ISO Coated v2) |
| Output | PDF descargable, generado en servidor con Puppeteer |
| Resolución | 300 DPI mínimo para impresión |

> **Nota CMYK:** El navegador no soporta CMYK nativo. La conversión se hace en el servidor: Puppeteer genera el PDF en RGB → Ghostscript lo convierte a CMYK con perfil ISO Coated v2. El PDF resultante es apto para imprenta profesional.

---

## 6. Stack tecnológico

| Capa | Tecnología | Por qué |
|------|-----------|---------|
| Framework | Next.js 14 (App Router) | Full-stack JS, SSR, API routes, ideal para Claude Code |
| Base de datos | Supabase | Postgres + real-time subscriptions + auth out of the box |
| Estilos | Tailwind CSS | Rápido para vibe coding, responsive fácil |
| Imágenes | Cloudinary | Upload, optimización, lazy loading y transformaciones automáticas |
| IA texto | OpenAI API (GPT-4o) | Generación de captions para promos |
| IA imagen | KIE AI | Imagen del promo generada por IA |
| PDF / Print | Puppeteer (server) + Ghostscript | Generación de PDF con conversión CMYK real |
| Auth admin | Supabase Auth | Email + password, simple y seguro |
| Deploy | Vercel | Compatible con Next.js, deploy instantáneo |
| Storage | Supabase Storage o Cloudinary | Para imágenes de productos subidas por el admin |

---

## 7. Arquitectura de carpetas (Next.js)

```
bistroburger/
├── app/
│   ├── page.tsx                  ← Carta digital (público)
│   ├── admin/
│   │   ├── page.tsx              ← Dashboard admin
│   │   ├── productos/page.tsx    ← Gestión de productos
│   │   ├── categorias/page.tsx   ← Gestión de categorías
│   │   ├── promos/page.tsx       ← Generador de promos IA
│   │   └── configuracion/page.tsx
│   └── api/
│       ├── products/route.ts     ← CRUD productos
│       ├── generate-promo/route.ts ← Claude + fal.ai
│       └── export-pdf/route.ts   ← Puppeteer + Ghostscript
├── components/
│   ├── menu/
│   │   ├── CategoryTab.tsx
│   │   ├── ProductCard.tsx
│   │   └── ExtrasSection.tsx
│   ├── admin/
│   │   ├── PriceEditor.tsx       ← Edición inline de precios
│   │   ├── PromoModal.tsx        ← Modal generador de promos
│   │   └── PrintModal.tsx        ← Opciones de impresión
│   └── ui/                       ← Componentes reutilizables
├── lib/
│   ├── supabase.ts
│   ├── openai.ts                 ← Cliente OpenAI API
│   ├── kieai.ts                  ← Cliente KIE AI
│   └── pdf.ts                    ← Lógica Puppeteer
└── types/
    └── menu.ts                   ← Tipos TS para productos, categorías, etc.
```

---

## 8. Fases de desarrollo

### Fase 1 — Base (1-2 semanas)
- [ ] Setup proyecto Next.js + Supabase + Tailwind
- [ ] Modelo de datos + seed con toda la carta del PDF
- [ ] Carta digital pública (solo lectura, sin imágenes aún)
- [ ] Panel admin: login + edición de precios en tiempo real
- [ ] Deploy en Vercel con dominio provisional

### Fase 2 — Contenido visual (1 semana)
- [ ] Integración Cloudinary
- [ ] Upload de imágenes por producto en el admin
- [ ] Carta pública con imágenes reales
- [ ] Optimización mobile + animaciones suaves

### Fase 3 — IA y promos (1 semana)
- [ ] Integración OpenAI API para generación de captions
- [ ] Integración KIE AI para generación de imagen
- [ ] Modal de "Crear promo" completo en el admin
- [ ] Descarga de imagen + texto

### Fase 4 — Print y export (1 semana)
- [ ] Modal de impresión con selector de formato
- [ ] Generación de PDF con Puppeteer
- [ ] Conversión CMYK con Ghostscript
- [ ] Preview antes de descargar

### Fase 5 — Pulido final (3-5 días)
- [ ] SEO y meta tags para la carta pública
- [ ] Historial de precios
- [ ] QR generado automáticamente para imprimir
- [ ] Documentación de uso para el dueño

---

## 9. Variables de entorno necesarias

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# OpenAI
OPENAI_API_KEY=

# KIE AI (generación de imágenes)
KIEAI_API_KEY=

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## 10. Consideraciones adicionales

**Alérgenos (recomendado para fase futura)**  
La normativa española obliga a informar de 14 alérgenos en hostelería. Añadir una tabla `allergens` y `product_allergens` en una siguiente versión es recomendable y diferenciador frente a la competencia.

**Internacionalización**  
Si el cliente quisiera la carta en inglés (Toledo recibe turismo), i18n con `next-intl` es sencillo de añadir sobre esta arquitectura.

**Pedidos online (v2)**  
La arquitectura está preparada para añadir un módulo de pedidos (carrito, pago con Stripe, notificación a cocina) sin rediseñar la base.

**QR en mesa**  
Cada mesa puede tener su propio QR con parámetro `?mesa=4` para que el sistema registre de dónde viene el pedido (útil cuando se añadan pedidos online).

---

*Brief preparado para desarrollo con Claude Code. Lista para iniciar Fase 1.*
