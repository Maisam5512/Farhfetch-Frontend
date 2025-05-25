// "use client"

// import { useState, useEffect } from "react"
// import { useParams } from "next/navigation"
// import { Heart } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import ImageGallery from "@/components/Image-gallery"
// import type { Product } from "@/types/product"


// export default function ProductPage() {
//   const params = useParams()
//   const productId = params.id

//   const [product, setProduct] = useState<Product | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [isWishlisted, setIsWishlisted] = useState(false)

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await fetch(`https://dependable-cow-a08d589b62.strapiapp.com/api/products/${productId}?populate=*`)
//         const data = await response.json()
//         setProduct(data.data)
//         setLoading(false)
//       } catch (error) {
//         console.error("Error fetching product:", error)
//         setLoading(false)
//       }
//     }

//     fetchProduct()
//   }, [productId])

//   if (loading) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex justify-center items-center min-h-[50vh]">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
//         </div>
//       </div>
//     )
//   }

//   if (!product) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
//           <p>The product you are looking for does not exist or has been removed.</p>
//         </div>
//       </div>
//     )
//   }

//   // Format prices
//   const formatPrice = (price: number) => `$${price}`
//   const originalPrice = formatPrice(product.originalPrice)
//   const discountedPrice = product.discountedPrice > 0 ? formatPrice(product.discountedPrice) : null
//   const discountPercentage =
//     product.discountPercentage ||
//     (product.discountedPrice && product.originalPrice
//       ? Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100)
//       : 0)

//   // Get estimated delivery dates
//   const estimatedDeliveryMin = new Date(product.estimatedDeliveryMin).toLocaleDateString("en-US", {
//     month: "short",
//     day: "numeric",
//   })
//   const estimatedDeliveryMax = new Date(product.estimatedDeliveryMax).toLocaleDateString("en-US", {
//     month: "short",
//     day: "numeric",
//   })

//   // Handle add to bag
//   const handleAddToBag = () => {
//     alert(`Added ${product.name} to bag!`)
//     // In a real app, you would add the product to the cart state or make an API call
//   }

//   // Handle wishlist toggle
//   const toggleWishlist = () => {
//     setIsWishlisted(!isWishlisted)
//     // In a real app, you would update the wishlist state or make an API call
//   }

//   const productImages =
//   product.images && product.images.length > 0
//     ? product.images.map((img) => ({
//         id: img.id,
//         url: img.formats?.large?.url?.startsWith("http")
//           ? img.formats.large.url
//           : `https://dependable-cow-a08d589b62.media.strapiapp.com${img.formats.large?.url || img.url}`,
//         alt: product.name,
//       }))
//       : [
//           {
//             id: 1,
//             url: "/placeholder.png",
//             alt: product.name,
//           },
//           {
//             id: 2,
//             url: "/placeholder.png",
//             alt: product.name,
//           },
//         ]

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Image Gallery */}
//         <div className="relative">
//           <ImageGallery images={productImages} />
//         </div>

//         {/* Product Details */}
//         <div className="flex flex-col">
//           <div className="mb-6">
//             <h1 className="text-2xl font-bold mb-1">{product.brand}</h1>
//             <p className="text-lg text-gray-700 mb-4">{product.name}</p>

//             <div className=" mb-2">
//               {discountedPrice ? (
//                 <>
//                   <div className="flex items-center">
//                   <span className="text-gray-500 line-through mr-2">{originalPrice}</span>
//                   <span className="text-2xl  text-red-500">{discountedPrice}</span>
//                   </div>
                  
//                   <div className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded inline-block">
//                     -{discountPercentage}%
//                   </div>
            
//                 </>
//               ) : (
//                 <span className="text-2xl font-bold">{originalPrice}</span>
//               )}
//             </div>
//           </div>

//           <div className="mb-6">
//             <p className="font-medium mb-2">
//               {product.sizes && product.sizes.length === 1 && product.sizes[0] === "One Size"
//                 ? "One Size available"
//                 : "Available Sizes"}
//             </p>

//             {product.sizes && product.sizes.length > 1 && (
//               <div className="flex flex-wrap gap-2 mb-4">
//                 {product.sizes.map((size, index) => (
//                   <button
//                     key={index}
//                     className="border border-gray-300 px-2 py-1 text-sm hover:border-black focus:outline-none focus:ring-2 focus:ring-black"
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className="flex items-center gap-4 mb-6">
//             <Button className="flex-1 cursor-pointer bg-black hover:bg-gray-800 text-white py-6 h-[50px]" onClick={handleAddToBag}>
//               Add To Bag
//             </Button>

//             <Button variant="outline" className="flex items-center justify-center border-gray-300 hover:border-black cursor-pointer h-[50px]" onClick={toggleWishlist}>
//               <Heart className={`h-5 w-5 ${isWishlisted ? "fill-black" : ""}`} />
//               <span className="ml-2">Wishlist</span>
//             </Button>
//           </div>

//           <div className="mb-6">
//             <p className="font-medium mb-1">Estimated delivery</p>
//             <p className="text-gray-700">
//               {estimatedDeliveryMin} - {estimatedDeliveryMax}
//             </p>
//           </div>

//           {product.avaliableColors && product.avaliableColors.length > 0 && (
//             <div className="mt-6">
//               <h2 className="font-medium mb-2">Available Colors</h2>
//               <div className="flex gap-2">
//                 {product.avaliableColors.map((color) => (
//                   <div
//                     key={color.id}
//                     className="w-6 h-6 rounded-full border border-gray-300"
//                     style={{ backgroundColor: color.hexCode || "#ccc" }}
//                     title={color.name}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }



"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import ImageGallery from "@/components/Image-gallery"
import type { Product } from "@/types/product"

export default function ProductPage() {
  const params = useParams()
  const productId = params.id

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://dependable-cow-a08d589b62.strapiapp.com/api/products/${productId}?populate=*`,
        )
        const data = await response.json()
        setProduct(data.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching product:", error)
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-900">Product Not Found</h1>
          <p className="text-gray-700">The product you are looking for does not exist or has been removed.</p>
        </div>
      </div>
    )
  }

  // Format prices
  const formatPrice = (price: number) => `$${price}`
  const originalPrice = formatPrice(product.originalPrice)
  const discountedPrice = product.discountedPrice > 0 ? formatPrice(product.discountedPrice) : null
  const discountPercentage =
    product.discountPercentage ||
    (product.discountedPrice && product.originalPrice
      ? Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100)
      : 0)

  // Get estimated delivery dates
  const estimatedDeliveryMin = new Date(product.estimatedDeliveryMin).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
  const estimatedDeliveryMax = new Date(product.estimatedDeliveryMax).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })

  // Handle add to bag
  const handleAddToBag = () => {
    alert(`Added ${product.name} to bag!`)
    // In a real app, you would add the product to the cart state or make an API call
  }

  // Handle wishlist toggle
  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    // In a real app, you would update the wishlist state or make an API call
  }

  const productImages =
    product.images && product.images.length > 0
      ? product.images.map((img) => ({
          id: img.id,
          url: img.formats?.large?.url?.startsWith("http")
            ? img.formats.large.url
            : `https://dependable-cow-a08d589b62.media.strapiapp.com${img.formats.large?.url || img.url}`,
          alt: product.name,
        }))
      : [
          {
            id: 1,
            url: "/placeholder.svg?height=600&width=450",
            alt: product.name,
          },
          {
            id: 2,
            url: "/placeholder.svg?height=600&width=450",
            alt: product.name,
          },
        ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="relative">
          <ImageGallery images={productImages} />
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1 text-gray-900">{product.brand}</h1>
            <p className="text-lg text-gray-800 mb-4">{product.name}</p>

            <div className="mb-2">
              {discountedPrice ? (
                <>
                  <div className="flex items-center">
                    <span className="text-gray-600 line-through mr-2">{originalPrice}</span>
                    <span className="text-2xl font-bold text-red-600">{discountedPrice}</span>
                  </div>

                  <div className="ml-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded inline-block">
                    -{discountPercentage}%
                  </div>
                </>
              ) : (
                <span className="text-2xl font-bold text-gray-900">{originalPrice}</span>
              )}
            </div>
          </div>

          <div className="mb-6">
            <p className="font-medium mb-2 text-gray-900">
              {product.sizes && product.sizes.length === 1 && product.sizes[0] === "One Size"
                ? "One Size available"
                : "Available Sizes"}
            </p>

            {product.sizes && product.sizes.length > 1 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {product.sizes.map((size, index) => (
                  <button
                    key={index}
                    className="border border-gray-400 px-4 py-3 text-sm hover:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 min-h-[44px] min-w-[44px] text-gray-900"
                    aria-label={`Select size ${size}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 mb-6">
            <Button
              className="flex-1 cursor-pointer bg-gray-900 hover:bg-gray-800 text-white py-6 h-[50px] min-h-[44px]"
              onClick={handleAddToBag}
              aria-label={`Add ${product.name} to bag`}
            >
              Add To Bag
            </Button>

            <Button
              variant="outline"
              className="flex items-center justify-center border-gray-400 hover:border-gray-900 cursor-pointer h-[50px] min-h-[44px] min-w-[44px] text-gray-900"
              onClick={toggleWishlist}
              aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? "fill-gray-900" : ""}`} />
              <span className="ml-2">Wishlist</span>
            </Button>
          </div>

          <div className="mb-6">
            <p className="font-medium mb-1 text-gray-900">Estimated delivery</p>
            <p className="text-gray-800">
              {estimatedDeliveryMin} - {estimatedDeliveryMax}
            </p>
          </div>

          {product.avaliableColors && product.avaliableColors.length > 0 && (
            <div className="mt-6">
              <h2 className="font-medium mb-2 text-gray-900">Available Colors</h2>
              <div className="flex gap-2">
                {product.avaliableColors.map((color) => (
                  <button
                    key={color.id}
                    className="w-8 h-8 rounded-full border-2 border-gray-400 hover:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 min-h-[44px] min-w-[44px]"
                    style={{ backgroundColor: color.hexCode || "#ccc" }}
                    title={color.name}
                    aria-label={`Select ${color.name} color`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

