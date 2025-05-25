"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import dynamic from "next/dynamic"
import type { Product } from "@/types/product"

// Dynamically import ProductCard to reduce initial bundle size
const ProductCard = dynamic(() => import("@/components/Product-card"), {
  loading: () => <ProductCardSkeleton />,
  ssr: false,
})

// Lightweight skeleton component
function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[3/4] bg-gray-200 rounded"></div>
      <div className="mt-2 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  )
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Simplified fetch function without AbortController
  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch("https://dependable-cow-a08d589b62.strapiapp.com/api/products?populate=*", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      // Use requestIdleCallback to defer state updates
      if ("requestIdleCallback" in window) {
        requestIdleCallback(() => {
          setProducts(data.data || [])
          setLoading(false)
        })
      } else {
        // Fallback for browsers without requestIdleCallback
        setTimeout(() => {
          setProducts(data.data || [])
          setLoading(false)
        }, 0)
      }
    } catch (error) {
      let errorMessage = "Failed to fetch products"

      if (error instanceof Error) {
        if (error.message.includes("Failed to fetch")) {
          errorMessage = "Network error. Please check your connection."
        } else {
          errorMessage = error.message
        }
      }

      console.error("Error fetching products:", error)
      setError(errorMessage)
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  // Memoize grid layout to prevent unnecessary re-renders
  const gridLayout = useMemo(() => "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6", [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Product Listing</h1>
        <div className={gridLayout}>
          {Array.from({ length: 8 }, (_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error loading products: {error}</p>
            <button onClick={fetchProducts} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Product Listing</h1>
      <div className={gridLayout}>
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            priority={index < 4} // Only prioritize first 4 images
          />
        ))}
      </div>
    </div>
  )
}



// import { Suspense } from "react"
// import type { Product } from "@/types/product"
// import ProductCard from "@/components/Product-card"

// // Lightweight skeleton component
// function ProductCardSkeleton() {
//   return (
//     <div className="animate-pulse">
//       <div className="aspect-[3/4] bg-gray-200 rounded"></div>
//       <div className="mt-2 space-y-2">
//         <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//         <div className="h-3 bg-gray-200 rounded w-1/2"></div>
//         <div className="h-4 bg-gray-200 rounded w-1/3"></div>
//       </div>
//     </div>
//   )
// }

// // Server component for data fetching
// async function ProductList() {
//   let products: Product[] = []
//   let error: string | null = null

//   try {
//     const response = await fetch("https://dependable-cow-a08d589b62.strapiapp.com/api/products?populate=*", {
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       // Add caching for better performance
//       next: { revalidate: 300 }, // Revalidate every 5 minutes
//     })

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`)
//     }

//     const data = await response.json()
//     products = data.data || []
//   } catch (err) {
//     console.error("Error fetching products:", err)
//     error = err instanceof Error ? err.message : "Failed to fetch products"
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-[50vh]">
//         <div className="text-center">
//           <p className="text-red-600 mb-4">Error loading products: {error}</p>
//         </div>
//       </div>
//     )
//   }

//   const gridLayout = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"

//   return (
//     <div className={gridLayout}>
//       {products.map((product, index) => (
//         <ProductCard
//           key={product.id}
//           product={product}
//           priority={index < 4} // Only prioritize first 4 images
//         />
//       ))}
//     </div>
//   )
// }

// // Loading component
// function ProductListSkeleton() {
//   const gridLayout = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"

//   return (
//     <div className={gridLayout}>
//       {Array.from({ length: 8 }, (_, i) => (
//         <ProductCardSkeleton key={i} />
//       ))}
//     </div>
//   )
// }

// export default function Home() {
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-8">Product Listing</h1>
//       <Suspense fallback={<ProductListSkeleton />}>
//         <ProductList />
//       </Suspense>
//     </div>
//   )
// }





