export interface Category {
  id: string
  name: string
  slug: string
  includes_note?: string
  addon_note?: string
  sort_order: number
  visible: boolean
}

export interface Product {
  id: string
  category_id: string
  name: string
  description: string
  price: number
  image_url?: string
  available: boolean
  is_new: boolean
  is_featured: boolean
  sort_order: number
  created_at?: string
  updated_at?: string
}

export interface Extra {
  id: string
  name: string
  price: number
  available: boolean
  sort_order: number
}

export interface PriceHistoryEntry {
  id: string
  product_id: string
  old_price: number
  new_price: number
  changed_at: string
  changed_by: string
}
