export interface StaticProduct {
  id: string
  name: string
  description: string
  price: string
  category: string
  is_new?: boolean
  image_url?: string   // manual upload override (from edit modal)
  images?: string[]    // images from ImageKit folder (auto-assigned)
}

export const CATEGORIES: { id: string; label: string }[] = [
  { id: 'hamburguesas', label: 'Hamburguesas' },
  { id: 'exclusivas', label: 'Exclusivas' },
  { id: 'picar', label: 'Para Picar' },
  { id: 'postres', label: 'Postres' },
  { id: 'infantil', label: 'Menú Infantil' },
]

const IK = 'https://ik.imagekit.io/uuyhsxd9f/IMAGENES%20DE%20HAMBURGUESAS%20BISTROBURGER'

export const BISTROBURGER_LOGO_URL = `${IK}/LOGOBISTRO-2020-RGB.png`

export const PRODUCTS: StaticProduct[] = [
  // ── Hamburguesas ────────────────────────────────────────────────────────
  {
    id: 'h1', category: 'hamburguesas',
    name: 'Bistro Ternera',
    description: '200g de ternera, queso, bacon, pepinillos, tomate, lechuga y salsa de la casa',
    price: '10.90€',
    images: [`${IK}/BISTRO%20TERNERA.jpg`],
  },
  {
    id: 'h2', category: 'hamburguesas',
    name: 'Bistro Pollo',
    description: 'Filete de pollo crujiente, queso, bacon, pepinillos, tomate, lechuga y salsa de la casa',
    price: '9.90€',
    images: [`${IK}/BISTRO%20POLLO.jpg`],
  },
  {
    id: 'h3', category: 'hamburguesas',
    name: 'Bistro Doble',
    description: 'Doble carne, pollo o mixta, queso, bacon, pepinillos, tomate, lechuga y salsa de la casa',
    price: '14.90€',
    images: [`${IK}/BISTRO%20DOBLE.jpg`],
  },
  {
    id: 'h4', category: 'hamburguesas',
    name: 'Bistro Porky',
    description: 'Carne de cerdo horneada a fuego lento con especias, bacon, tomate, queso cheddar y salsa de la casa',
    price: '10.90€',
    images: [`${IK}/BISTRO%20PORKY.jpg`],
  },
  {
    id: 'h5', category: 'hamburguesas',
    name: 'Bistro Fit',
    description: 'Filete de pollo a la plancha, queso, tomate, cebolla, pepinillo, lechuga y salsa de la casa',
    price: '9.90€',
    images: [`${IK}/BISTRO%20FIT.jpg`],
  },
  {
    id: 'h6', category: 'hamburguesas',
    name: 'Bistro Especial',
    description: 'Ternera, champiñones, cebolla caramelizada, queso, bacon, pepinillos, tomate, lechuga y salsa de la casa',
    price: '14.90€',
    images: [
      `${IK}/BISTRO%20ESPECIAL_1.jpg`,
      `${IK}/BISTRO%20ESPECIAL_2.jpg`,
    ],
  },
  {
    id: 'h7', category: 'hamburguesas',
    name: 'Bistro Super',
    description: '300g de ternera + 300g de cerdo horneado, queso cheddar y salsa de la casa',
    price: '16.90€',
    images: [
      `${IK}/BISTRO%20S%C3%9APER_1.jpg`,
      `${IK}/BISTRO%20S%C3%9APER_2.jpg`,
    ],
  },
  {
    id: 'h8', category: 'hamburguesas',
    name: 'Bistro Maxi',
    description: '200g cerdo + 350g ternera + pollo crujiente, lechuga, queso, bacon, tomate, huevo y salsa de la casa',
    price: '19.90€',
    images: [`${IK}/BISTRO%20MAXI.jpg`],
  },
  {
    id: 'h9', category: 'hamburguesas',
    name: 'Bistro Vegana',
    description: 'Proteína de guisante, lechuga, tomate, cebolla, pepinillo y salsa de la casa',
    price: '10.90€',
    images: [`${IK}/BISTRO%20VEGANA.jpg`],
  },

  // ── Exclusivas ───────────────────────────────────────────────────────────
  {
    id: 'e1', category: 'exclusivas',
    name: 'Bistro Mexicana',
    description: 'Ternera, queso cheddar, crema agria, guacamole, pico de gallo y jalapeños',
    price: '13.90€',
    images: [
      `${IK}/BISTRO%20MEXICANA_1.jpg`,
      `${IK}/BISTRO%20MEXICANA_2.jpg`,
      `${IK}/BISTRO%20MEXICANA_3.jpg`,
    ],
  },
  {
    id: 'e2', category: 'exclusivas',
    name: 'Bistro Volanding',
    description: 'Pollo crujiente, salsa tres quesos (azul, curado, cheddar), bacon crujiente y huevo',
    price: '11.90€',
    images: [
      `${IK}/BISTRO%20VOLANDING_1.jpg`,
      `${IK}/BISTRO%20VOLANDING_2.jpg`,
      `${IK}/BISTRO%20VOLANDING_3.jpg`,
    ],
  },
  {
    id: 'e3', category: 'exclusivas',
    name: 'Bistro Plátano',
    description: 'Ternera, plátano macho maduro frito, queso curado empanado frito y salsa de la casa',
    price: '12.90€',
    images: [
      `${IK}/BISTRO%20PL%C3%81TANO_1.jpg`,
      `${IK}/BISTRO%20PL%C3%81TANO_2.jpg`,
    ],
  },
  {
    id: 'e4', category: 'exclusivas',
    name: 'Bistro Pizza',
    description: 'Ternera, salsa de tomate, queso mozzarella fundido, orégano y salsa de la casa',
    price: '12.90€',
    images: [
      `${IK}/BISTRO%20PIZZA_1.jpg`,
      `${IK}/BISTRO%20PIZZA_2.jpg`,
      `${IK}/BISTRO%20PIZZA_3.jpg`,
    ],
  },
  {
    id: 'e5', category: 'exclusivas',
    name: 'Bistro BBQ',
    description: 'Ternera, doble queso cheddar, triple bacon, salsa BBQ, cebolla tostada y salsa de la casa',
    price: '12.90€',
    images: [
      `${IK}/BISTRO%20BBQ_1.jpg`,
      `${IK}/BISTRO%20BBQ_2.jpg`,
      `${IK}/BISTRO%20BBQ_3.jpg`,
    ],
  },
  {
    id: 'e6', category: 'exclusivas',
    name: 'Bistro Cuatro Quesos',
    description: 'Ternera, cheddar, queso de cabra, queso curado, mozzarella y salsa de la casa',
    price: '13.90€',
    images: [
      `${IK}/BISTRO%20CUATRO%20QUESOS_1.jpg`,
      `${IK}/BISTRO%20CUATRO%20QUESOS_2.jpg`,
    ],
  },
  {
    id: 'e7', category: 'exclusivas',
    name: 'Bistro Mac & Cheese',
    description: 'Ternera, bacon, bañada en macarrones con queso fundido',
    price: '12.90€',
    images: [
      `${IK}/BISTRO%20MAC&CHEESE_1.jpg`,
      `${IK}/BISTRO%20MAC&CHEESE_2.jpg`,
    ],
  },
  {
    id: 'e8', category: 'exclusivas',
    name: 'Bistro Bacon Queso',
    description: 'Ternera, lonchas de bacon, queso de cabra bañado en miel y salsa de la casa',
    price: '12.90€',
    images: [
      `${IK}/BISTRO%20BACON%20QUESO_1.jpg`,
      `${IK}/BISTRO%20BACON%20QUESO_2.jpg`,
      `${IK}/BISTRO%20BACON%20QUESO_3.jpg`,
    ],
  },
  {
    id: 'e9', category: 'exclusivas',
    name: 'Bistro Róculita',
    description: 'Ternera, queso curado rayado, cebolla caramelizada, bacon, rúcula y salsa de la casa',
    price: '13.90€',
    images: [
      `${IK}/BISTRO%20R%C3%9ACULITA_1.jpg`,
      `${IK}/BISTRO%20R%C3%9ACULITA_2.jpg`,
      `${IK}/BISTRO%20R%C3%9ACULITA_3.jpg`,
    ],
  },
  {
    id: 'e10', category: 'exclusivas',
    name: 'Bistro Patacón',
    description: 'Pan sustituido por plátano macho frito, cerdo deshilachado, queso curado rallado y salsa',
    price: '13.90€',
    images: [
      `${IK}/BISTRO%20PATAC%C3%93N_1.jpg`,
      `${IK}/BISTRO%20PATAC%C3%93N_2.jpg`,
      `${IK}/BISTRO%20PATAC%C3%93N_3.png`,
    ],
  },
  {
    id: 'e11', category: 'exclusivas',
    name: 'Bistro Raclette',
    description: 'Ternera, salsa pepinillos, queso raclette, pepinillo, bacon, bañado en queso raclette',
    price: '13.90€',
    is_new: true,
    images: [],
  },

  // ── Para Picar ───────────────────────────────────────────────────────────
  {
    id: 'p1', category: 'picar',
    name: 'Nachos',
    description: 'Maíz, carne picada, alubias rojas, queso fundido, crema agria, guacamole y pico de gallo',
    price: '10.90€',
    images: [
      `${IK}/NACHOS_1.jpg`,
      `${IK}/NACHOS_2.jpg`,
      `${IK}/NACHOS_3.jpg`,
      `${IK}/NACHOS_4.jpg`,
    ],
  },
  {
    id: 'p2', category: 'picar',
    name: 'Alitas',
    description: '(12) alitas de pollo fritas con salsa barbecue o salsa picante',
    price: '9.90€',
    images: [
      `${IK}/ALITAS_1.jpg`,
      `${IK}/ALITAS_2.jpg`,
      `${IK}/ALITAS_3.jpg`,
    ],
  },
  {
    id: 'p3', category: 'picar',
    name: 'Tequeños',
    description: '(8) palitos de queso con masa de harina de trigo frita rellena de queso blanco',
    price: '8.90€',
    images: [
      `${IK}/TEQUE%C3%91OS_1.jpg`,
      `${IK}/TEQUE%C3%91OS_2.jpg`,
      `${IK}/TEQUE%C3%91OS_3.jpg`,
    ],
  },
  {
    id: 'p4', category: 'picar',
    name: 'Ensalada César',
    description: 'Lechuga romana, crotones, pollo empanado, queso padano y salsa césar',
    price: '9.90€',
    images: [`${IK}/ENSALADA%20C%C3%89SAR.jpg`],
  },
  {
    id: 'p5', category: 'picar',
    name: 'Nuggets',
    description: '(8) nuggets caseros con patatas fritas',
    price: '8.90€',
    images: [
      `${IK}/NUGGETS_1.jpg`,
      `${IK}/NUGGETS_2.jpg`,
      `${IK}/NUGGETS_3.jpg`,
    ],
  },
  {
    id: 'p6', category: 'picar',
    name: 'Patatas Especiales',
    description: 'Patatas fritas con queso fundido y bacon',
    price: '8.90€',
    images: [
      `${IK}/PATATAS%20ESPECIALES_1.jpg`,
      `${IK}/PATATAS%20ESPECIALES_2.jpg`,
    ],
  },
  {
    id: 'p7', category: 'picar',
    name: 'Bandeja Bistro',
    description: 'Nachos, nuggets, tequeños, aros de cebolla y patatas fritas',
    price: '16.90€',
    images: [
      `${IK}/BANDEJA%20BISTRO_1.jpg`,
      `${IK}/BANDEJA%20BISTRO_2.jpg`,
    ],
  },
  {
    id: 'p8', category: 'picar',
    name: 'Patatas Fritas',
    description: 'Ración de nuestras únicas patatas fritas',
    price: '3.20€',
    images: [
      `${IK}/PATATAS%20FRITAS_1.jpg`,
      `${IK}/PATATAS%20FRITAS_2.jpg`,
    ],
  },
  {
    id: 'p9', category: 'picar',
    name: 'Aros de Cebolla',
    description: '(5) aros de cebolla fritos',
    price: '3.20€',
    images: [
      `${IK}/AROS%20DE%20CEBOLLA_1.jpg`,
      `${IK}/AROS%20DE%20CEBOLLA_2.jpg`,
    ],
  },
  {
    id: 'p10', category: 'picar',
    name: 'Boniatos Fritos',
    description: 'Similar a la patata pero con un toque dulce',
    price: '3.90€',
    images: [
      `${IK}/BONIATOS%20FRITOS_1.jpg`,
      `${IK}/BONIATOS%20FRITOS_2.jpg`,
    ],
  },

  // ── Postres ──────────────────────────────────────────────────────────────
  {
    id: 'd1', category: 'postres',
    name: 'Tarta de Queso',
    description: '',
    price: '4.90€',
    images: [],
  },
  {
    id: 'd2', category: 'postres',
    name: 'Tarta de Chocolate',
    description: '',
    price: '4.90€',
    images: [],
  },
  {
    id: 'd3', category: 'postres',
    name: 'Tequeños de Chocolate',
    description: '',
    price: '5.90€',
    images: [`${IK}/Teque%C3%B1os%20de%20Chocolate.jpg`],
  },
  {
    id: 'd4', category: 'postres',
    name: 'Brownie con Helado',
    description: '',
    price: '4.90€',
    images: [
      `${IK}/Brownie%20con%20Helado_1.jpg`,
      `${IK}/Brownie%20con%20Helado_2.jpg`,
      `${IK}/Brownie%20con%20Helado_3.jpg`,
    ],
  },
  {
    id: 'd5', category: 'postres',
    name: 'Tortitas con Miel o Chocolate',
    description: '',
    price: '3.90€',
    images: [],
  },

  // ── Menú Infantil ────────────────────────────────────────────────────────
  {
    id: 'i1', category: 'infantil',
    name: 'Menú Burger',
    description: 'Carne junior 150g, queso y salsa de la casa',
    price: '9.90€',
    images: [],
  },
  {
    id: 'i2', category: 'infantil',
    name: 'Menú Nuggets',
    description: '(5) nuggets caseros',
    price: '9.90€',
    images: [],
  },
]

export function getProductsByCategory(categoryId: string): StaticProduct[] {
  return PRODUCTS.filter((p) => p.category === categoryId)
}
