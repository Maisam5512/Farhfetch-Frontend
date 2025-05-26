import { Suspense } from "react"
import type { Product } from "@/types/product"
import ProductCard from "@/components/Product-card"

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

// Server component for data fetching
async function ProductList() {
  let products: Product[] = []
  let error: string | null = null

  try {
    const response = await fetch("https://dependable-cow-a08d589b62.strapiapp.com/api/products?populate=*", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      next: { revalidate: 300 }, 
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    products = data.data || []
  } catch (err) {
    console.error("Error fetching products:", err)
    error = err instanceof Error ? err.message : "Failed to fetch products"
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading products: {error}</p>
        </div>
      </div>
    )
  }

  const gridLayout = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"

  return (
    <div className={gridLayout}>
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={index < 4} 
        />
      ))}
    </div>
  )
}


function ProductListSkeleton() {
  const gridLayout = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"

  return (
    <div className={gridLayout}>
      {Array.from({ length: 8 }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList />
      </Suspense>
    </div>
  )
}





