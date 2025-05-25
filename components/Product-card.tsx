// "use client"

// import type React from "react"

// import { useState, useMemo, useCallback } from "react"
// import Image from "next/image"
// import { Heart } from "lucide-react"
// import type { Product } from "@/types/product"
// import Link from "next/link"

// interface ProductCardProps {
//   product: Product
//   priority?: boolean 
// }

// const ImageShimmer = () => (
//   <div className="absolute inset-0 bg-gray-200 animate-pulse">
//     <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer bg-[length:200%_100%]" />
//   </div>
// )

// export default function ProductCard({ product, priority = false }: ProductCardProps) {
//   const [isHovered, setIsHovered] = useState(false)
//   const [imageLoaded, setImageLoaded] = useState(false)
//   const [imageError, setImageError] = useState(false)
//   const imageData = useMemo(() => {
//   const imageObj = product.images?.[0]

//   if (!imageObj) {
//     return {
//       url: "/placeholder.svg?height=400&width=300",
//       blurDataURL:
//         "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==",
//     }
//   }

//   const rawUrl = imageObj.formats?.medium?.url || imageObj.url
//   const isAbsolute = rawUrl.startsWith("http")

//   return {
//     url: isAbsolute ? rawUrl : `https://dependable-cow-a08d589b62.media.strapiapp.com${rawUrl}`,
//     blurDataURL:
//       "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==",
//   }
// }, [product.images])


//   // Memoize discount calculation
//   const discountPercentage = useMemo(() => {
//     return (
//       product.discountPercentage ||
//       (product.discountedPrice && product.originalPrice
//         ? Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100)
//         : 0)
//     )
//   }, [product.discountPercentage, product.discountedPrice, product.originalPrice])

//   // Memoize price formatting
//   const prices = useMemo(() => {
//     const formatPrice = (price: number) => `$${price}`
//     return {
//       original: formatPrice(product.originalPrice),
//       discounted: product.discountedPrice > 0 ? formatPrice(product.discountedPrice) : null,
//     }
//   }, [product.originalPrice, product.discountedPrice])

//   // Memoize sizes string
//   const sizesString = useMemo(() => {
//     if (!product.sizes) return ""
//     return product.sizes.join(", ")
//   }, [product.sizes])

//   // Optimized event handlers
//   const handleMouseEnter = useCallback(() => setIsHovered(true), [])
//   const handleMouseLeave = useCallback(() => setIsHovered(false), [])

//   const handleImageLoad = useCallback(() => {
//     setImageLoaded(true)
//   }, [])

//   const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
//     const target = e.target as HTMLImageElement
//     target.src = "/placeholder.png"
//     setImageError(true)
//     setImageLoaded(true)
//   }, [])

//   const handleWishlistClick = useCallback((e: React.MouseEvent) => {
//     e.preventDefault()
//     e.stopPropagation()
//   }, [])

//   return (
//     <Link href={`/product/${product.documentId}`} className="block">
//       <div className="group relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
//         <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
//           {/* Shimmer loading effect */}
//           {!imageLoaded && !imageError && <ImageShimmer />}

//           <Image
//             src={imageData.url || "/placeholder.png"}
//             alt={product.name}
//             fill
//             className={`object-cover object-center transition-all duration-300 group-hover:scale-105 ${
//               imageLoaded ? "opacity-100" : "opacity-0"
//             }`}
//             sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
//             priority={priority}
//             placeholder="blur"
//             blurDataURL={imageData.blurDataURL}
//             onLoad={handleImageLoad}
//             onError={handleImageError}
//             quality={85}
//           />

//           <button
//             className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-red transition-colors duration-200"
//             onClick={handleWishlistClick}
//             aria-label="Add to wishlist"
//           >
//             <Heart className="h-5 w-5" />
//           </button>

//           {discountPercentage > 0 && (
//             <div className="absolute bottom-2 left-2 bg-red-700 text-white text-xs font-medium px-2 py-1">
//               -{discountPercentage}%
//             </div>
//           )}
//         </div>

//         <div className="mt-2 space-y-1">
//           {!isHovered ? (
//             <>
//               <p className=" font-bold text-black">{product.brand}</p>
//               <h3 className="text-sm font-medium truncate text-gray-400">{product.name}</h3>
//               <div className="flex items-center gap-2">
//                 {prices.discounted ? (
//                   <>
//                     <span className="font-medium text-red-600">{prices.discounted}</span>
//                     <span className="text-sm text-gray-400 line-through">{prices.original}</span>
//                   </>
//                 ) : (
//                   <span className="font-medium">{prices.original}</span>
//                 )}
//               </div>
//             </>
//           ) : (
//             <div className="py-2">
//               <p className="font-medium text-sm">Available in</p>
//               <div className="flex flex-wrap gap-1 mt-1">
//                 <span className="text-sm">{sizesString}</span>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </Link>
//   )
// }




"use client"

import type React from "react"
import { useState, useMemo, useCallback, memo } from "react"
import Image from "next/image"
import { Heart } from "lucide-react"
import type { Product } from "@/types/product"
import Link from "next/link"

interface ProductCardProps {
  product: Product
  priority?: boolean
}

// Memoized shimmer component
const ImageShimmer = memo(() => (
  <div className="absolute inset-0 bg-gray-200">
    <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
  </div>
))

ImageShimmer.displayName = "ImageShimmer"

// Optimized ProductCard component with memo
const ProductCard = memo(function ProductCard({ product, priority = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Memoize image data with better optimization
  const imageData = useMemo(() => {
    const imageObj = product.images?.[0]

    if (!imageObj) {
      return {
        url: "/placeholder.svg?height=400&width=300",
        blurDataURL:
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==",
      }
    }

    const rawUrl = imageObj.formats?.medium?.url || imageObj.url
    const isAbsolute = rawUrl.startsWith("http")

    return {
      url: isAbsolute ? rawUrl : `https://dependable-cow-a08d589b62.media.strapiapp.com${rawUrl}`,
      blurDataURL:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==",
    }
  }, [product.images])

  // Memoize discount calculation
  const discountPercentage = useMemo(() => {
    return (
      product.discountPercentage ||
      (product.discountedPrice && product.originalPrice
        ? Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100)
        : 0)
    )
  }, [product.discountPercentage, product.discountedPrice, product.originalPrice])

  // Memoize price formatting
  const prices = useMemo(() => {
    const formatPrice = (price: number) => `$${price}`
    return {
      original: formatPrice(product.originalPrice),
      discounted: product.discountedPrice > 0 ? formatPrice(product.discountedPrice) : null,
    }
  }, [product.originalPrice, product.discountedPrice])

  // Memoize sizes string
  const sizesString = useMemo(() => {
    if (!product.sizes) return ""
    return product.sizes.join(", ")
  }, [product.sizes])

  // Optimized event handlers with passive listeners
  const handleMouseEnter = useCallback(() => {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => setIsHovered(true))
    } else {
      setIsHovered(true)
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => setIsHovered(false))
    } else {
      setIsHovered(false)
    }
  }, [])

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true)
  }, [])

  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement
    target.src = "/placeholder.svg?height=400&width=300"
    setImageError(true)
    setImageLoaded(true)
  }, [])

  const handleWishlistClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Add wishlist logic here
  }, [])

  return (
    <Link href={`/product/${product.documentId}`} className="block">
      <div className="group relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
          {/* Shimmer loading effect */}
          {!imageLoaded && !imageError && <ImageShimmer />}

          <Image
            src={imageData.url || "/placeholder.svg?height=400&width=300"}
            alt={product.name}
            fill
            className={`object-cover object-center transition-transform duration-300 group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            placeholder="blur"
            blurDataURL={imageData.blurDataURL}
            onLoad={handleImageLoad}
            onError={handleImageError}
            quality={priority ? 90 : 75} // Higher quality for priority images
            loading={priority ? "eager" : "lazy"}
          />

          <button
            className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
            onClick={handleWishlistClick}
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
          {!isHovered ? (
            <>
              <p className="font-bold text-black">{product.brand}</p>
              <h3 className="text-sm font-medium truncate text-gray-400">{product.name}</h3>
              <div className="flex items-center gap-2">
                {prices.discounted ? (
                  <>
                    <span className="font-medium text-red-600">{prices.discounted}</span>
                    <span className="text-sm text-gray-400 line-through">{prices.original}</span>
                  </>
                ) : (
                  <span className="font-medium">{prices.original}</span>
                )}
              </div>
            </>
          ) : (
            <div className="py-2">
              <p className="font-medium text-sm">Available in</p>
              <div className="flex flex-wrap gap-1 mt-1">
                <span className="text-sm">{sizesString}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
})

export default ProductCard










