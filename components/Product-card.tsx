"use client"
import { memo } from "react"
import Image from "next/image"
import { Heart } from "lucide-react"
import type { Product } from "@/types/product"
import Link from "next/link"

interface ProductCardProps {
  product: Product
  priority?: boolean
}


const ProductCard = memo(function ProductCard({ product, priority = false }: ProductCardProps) {
  const getImageUrl = () => {
    const imageObj = product.images?.[0]
    if (!imageObj) return "/placeholder.png"

    const rawUrl = imageObj.formats?.medium?.url || imageObj.url
    return rawUrl.startsWith("http") ? rawUrl : `${process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL}${rawUrl}`
  }

  
  const discountPercentage =
    product.discountPercentage ||
    (product.discountedPrice && product.originalPrice
      ? Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100)
      : 0)

  const formatPrice = (price: number) => `$${price}`
  const originalPrice = formatPrice(product.originalPrice)
  const discountedPrice = product.discountedPrice > 0 ? formatPrice(product.discountedPrice) : null

  
  const sizesString = product.sizes?.join(", ") || ""

  return (
    <Link href={`/product/${product.slug}`} className="block">
      <div className="group relative">
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
          <Image
            src={getImageUrl() || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            quality={priority ? 90 : 75}
            loading={priority ? "eager" : "lazy"}
          />

          <button
            className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              // Add wishlist logic here
            }}
            aria-label={`Add ${product.name} to wishlist`}
            type="button"
          >
            <Heart className="h-5 w-5" />
          </button>

          {discountPercentage > 0 && (
            <div className="absolute bottom-2 left-2 bg-red-700 text-white text-xs font-medium px-2 py-1 rounded">
              -{discountPercentage}%
            </div>
          )}
        </div>

        <div className="mt-2 space-y-1">
          <div className="group-hover:hidden">
            <p className="font-bold text-black">{product.brand}</p>
            <h3 className="text-sm font-medium truncate text-gray-400">{product.name}</h3>
            <div className="flex items-center gap-2">
              {discountedPrice ? (
                <>
                  <span className="font-medium text-red-600">{discountedPrice}</span>
                  <span className="text-sm text-gray-400 line-through">{originalPrice}</span>
                </>
              ) : (
                <span className="font-medium">{originalPrice}</span>
              )}
            </div>
          </div>

          <div className="hidden group-hover:block py-2">
            <p className="font-medium text-sm">Available in</p>
            <div className="flex flex-wrap gap-1 mt-1">
              <span className="text-sm">{sizesString}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
})

export default ProductCard











