"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { useParams } from "next/navigation"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"
import type { Product } from "@/types/product"

const ImageGallery = dynamic(() => import("@/components/Image-gallery"), {
  loading: () => (
    <div className="relative w-full" style={{ aspectRatio: "3/4", minHeight: "600px" }}>
      <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
    </div>
  ),
  ssr: false,
})

const ProductSkeleton = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="relative w-full" style={{ aspectRatio: "3/4", minHeight: "600px" }}>
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      </div>

      <div className="flex flex-col" style={{ minHeight: "600px" }}>
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded animate-pulse" />
          <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
          <div className="h-10 bg-gray-200 rounded w-1/2 animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-12 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 h-12 bg-gray-200 rounded animate-pulse" />
            <div className="w-32 h-12 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default function ProductPage() {
  const params = useParams()
  const productId = params.id

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [selectedSize, setSelectedSize] = useState<string>("")




  const apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/products?filters[slug][$eq]=${productId}&populate=*`


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("Fetching product with slug:", productId);
        const response = await fetch(apiUrl, {
          headers: {
            Accept: "application/json",
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log("API Response:", data);


        if (Array.isArray(data.data) && data.data.length > 0) {

          const rawProduct = data.data[0]


          const formattedProduct = {
            id: rawProduct.id,
            ...rawProduct,
            images: rawProduct.images || [],
          }
          setProduct(formattedProduct)


          if (formattedProduct.sizes?.length > 0) {
            setSelectedSize(formattedProduct.sizes[0])
          }
        } else {
          console.log("No product found for slug:", productId);

          setProduct(null)
        }

        setLoading(false)
      } catch (error) {
        console.error("Error fetching product:", error)
        setProduct(null)
        setLoading(false)
      }
    }

    if (productId) {
      fetchProduct()
    }
  }, [productId, apiUrl])


  const priceInfo = useMemo(() => {
    if (!product) return null

    const formatPrice = (price: number) => `$${price}`
    const originalPrice = formatPrice(product.originalPrice)
    const discountedPrice = product.discountedPrice > 0 ? formatPrice(product.discountedPrice) : null
    const discountPercentage =
      product.discountPercentage ||
      (product.discountedPrice && product.originalPrice
        ? Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100)
        : 0)

    return {
      originalPrice,
      discountedPrice,
      discountPercentage,
    }
  }, [product])

  const deliveryInfo = useMemo(() => {
    if (!product) return null

    const estimatedDeliveryMin = new Date(product.estimatedDeliveryMin).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
    const estimatedDeliveryMax = new Date(product.estimatedDeliveryMax).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })

    return { estimatedDeliveryMin, estimatedDeliveryMax }
  }, [product])

  const productImages = useMemo(() => {
    if (!product?.images?.length) {
      return [
        {
          id: 1,
          url: "/placeholder.svg?height=600&width=450",
          alt: product?.name || "Product image",
        },
      ]
    }

    return product.images.map((img) => ({
      id: img.id,
      url: img.formats?.large?.url?.startsWith("http")
        ? img.formats.large.url
        : `https://dependable-cow-a08d589b62.media.strapiapp.com${img.formats.large?.url || img.url}`,
      alt: product.name,
    }))
  }, [product])

  const handleAddToBag = useCallback(() => {
    if (!product) return

    console.log(`Added ${product.name} (Size: ${selectedSize}) to bag!`)

    const button = document.querySelector("[data-add-to-bag]") as HTMLButtonElement
    if (button) {
      const originalText = button.textContent
      button.textContent = "Added!"
      button.disabled = true

      setTimeout(() => {
        button.textContent = originalText
        button.disabled = false
      }, 1500)
    }
  }, [product, selectedSize])

  const toggleWishlist = useCallback(() => {
    setIsWishlisted((prev) => !prev)
  }, [])

  const handleSizeSelect = useCallback((size: string) => {
    setSelectedSize(size)
  }, [])

  if (loading) {
    return <ProductSkeleton />
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center" style={{ minHeight: "400px" }}>
          <h1 className="text-2xl font-bold mb-4 text-gray-900">Product Not Found</h1>
          <p className="text-gray-700">The product you are looking for does not exist or has been removed.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative w-full" style={{ minHeight: "600px" }}>
          <ImageGallery images={productImages} />
        </div>

        <div className="flex flex-col" style={{ minHeight: "600px" }}>
          <div className="mb-6" style={{ minHeight: "120px" }}>
            <h1 className="text-2xl font-bold mb-1 text-gray-900">{product.brand}</h1>
            <p className="text-lg text-gray-800 mb-4">{product.name}</p>

            <div className="mb-2" style={{ minHeight: "60px" }}>
              {priceInfo?.discountedPrice ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 line-through text-lg">{priceInfo.originalPrice}</span>
                    <span className="text-2xl font-bold text-red-600">{priceInfo.discountedPrice}</span>
                  </div>
                  <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded inline-block">
                    -{priceInfo.discountPercentage}%
                  </div>
                </div>
              ) : (
                <span className="text-2xl font-bold text-gray-900">{priceInfo?.originalPrice}</span>
              )}
            </div>
          </div>

          <div className="mb-6" style={{ minHeight: "100px" }}>
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
                    onClick={() => handleSizeSelect(size)}
                    className={`border px-4 py-3 text-sm hover:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors duration-200 ${selectedSize === size ? "border-gray-900 bg-gray-900 text-white" : "border-gray-400 text-gray-900"
                      }`}
                    style={{ minHeight: "44px", minWidth: "44px" }}
                    aria-label={`Select size ${size}`}
                    type="button"
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 mb-6" style={{ minHeight: "50px" }}>
            <Button
              className="flex-1 cursor-pointer bg-gray-900 hover:bg-gray-800 text-white transition-colors duration-200"
              onClick={handleAddToBag}
              style={{ minHeight: "50px" }}
              aria-label={`Add ${product.name} to bag`}
              data-add-to-bag
              type="button"
            >
              Add To Bag
            </Button>

            <Button
              variant="outline"
              className="flex items-center justify-center border-gray-400 hover:border-gray-900 cursor-pointer transition-colors duration-200"
              onClick={toggleWishlist}
              style={{ minHeight: "50px", minWidth: "120px" }}
              aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
              type="button"
            >
              <Heart className={`h-5 w-5 transition-colors duration-200 ${isWishlisted ? "fill-gray-900" : ""}`} />
              <span className="ml-2">Wishlist</span>
            </Button>
          </div>

          <div className="mb-6" style={{ minHeight: "60px" }}>
            <p className="font-bold mb-1 text-gray-900">Estimated delivery</p>
            {deliveryInfo && (
              <p className="text-gray-800">
                {deliveryInfo.estimatedDeliveryMin} - {deliveryInfo.estimatedDeliveryMax}
              </p>
            )}
          </div>

          {product.avaliableColors && product.avaliableColors.length > 0 && (
            <div className="mt-6" style={{ minHeight: "80px" }}>
              <h2 className="font-bold mb-2 text-gray-900">Available Colors</h2>
              <div className="flex gap-2 items-center">
                {product.avaliableColors.map((color) => (
                  <button
                    key={color.id}
                    className="w-8 h-8 rounded-full border-2 border-gray-400 hover:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors duration-200"
                    style={{
                      backgroundColor: color.hexCode || "#ccc",
                      minHeight: "44px",
                      minWidth: "44px",
                    }}
                    title={color.name}
                    aria-label={`Select ${color.name} color`}
                    type="button"
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
