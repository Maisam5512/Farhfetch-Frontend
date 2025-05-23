export interface Product {
  id: number
  documentId: string
  name: string
  brand: string
  description: string
  originalPrice: number
  discountedPrice: number
  discountPercentage: number
  sizes: string[]
  slug: string
  estimatedDeliveryMin: string
  estimatedDeliveryMax: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  images: ProductImage[]
  avaliableColors: ProductColor[]
}

export interface ProductImage {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  width: number
  height: number
  formats: {
    thumbnail: ImageFormat
    large: ImageFormat
    medium: ImageFormat
    small: ImageFormat
  }
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: any
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface ImageFormat {
  name: string
  hash: string
  ext: string
  mime: string
  path: string | null
  width: number
  height: number
  size: number
  sizeInBytes: number
  url: string
}

export interface ProductColor {
  id: number
  name: string
  hexCode: string | null
}
