"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

// Shimmer components for loading state
const ImageShimmer = () => (
  <div className="absolute inset-0 bg-gray-200">
    <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
  </div>
)

const TextShimmer = () => (
  <div className="space-y-6">
    <div className="h-12 bg-gray-200 rounded">
      <div className="h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded" />
    </div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 rounded">
        <div className="h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded" />
      </div>
      <div className="h-4 bg-gray-200 rounded w-3/4">
        <div className="h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded" />
      </div>
    </div>
    <div className="h-12 bg-gray-200 rounded w-32">
      <div className="h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded" />
    </div>
  </div>
)

const HomePageSkeleton = () => (
  <div className="bg-white">
    {[1, 2].map((index) => (
      <section key={index} className="w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-2 w-full">
          {index % 2 === 1 ? (
            <>
              <div className="relative w-full aspect-[4/3]">
                <ImageShimmer />
              </div>
              <div className="flex items-center justify-center p-8 lg:p-16 order-2 bg-gray-50 w-full">
                <div className="max-w-md w-full">
                  <TextShimmer />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center p-8 lg:p-16 order-2 lg:order-1 bg-gray-50 w-full">
                <div className="max-w-md w-full">
                  <TextShimmer />
                </div>
              </div>
              <div className="relative w-full aspect-[4/3] order-1 lg:order-2">
                <ImageShimmer />
              </div>
            </>
          )}
        </div>
      </section>
    ))}
  </div>
)

interface HomePageItem {
  id: number
  documentId: string
  title: string
  description: string
  button_text: string
  layout: "left" | "right"
  order: number
  image: {
    id: number
    name: string
    url: string
    alternativeText: string | null
    width: number
    height: number
    formats?: {
      small?: {
        url: string
        width: number
        height: number
      }
    }
  }
}

interface ApiResponse {
  data: Array<{
    id: number
    documentId: string
    title: string
    description: string
    button_text: string
    layout: "left" | "right"
    order: number
    createdAt: string
    updatedAt: string
    publishedAt: string
    image: {
      id: number
      documentId: string
      name: string
      alternativeText: string | null
      caption: string | null
      width: number
      height: number
      formats?: {
        thumbnail?: {
          url: string
          width: number
          height: number
        }
        small?: {
          url: string
          width: number
          height: number
        }
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
  }>
}

export default function HomePage() {
  const [homeData, setHomeData] = useState<HomePageItem[]>([])
  const [loading, setLoading] = useState(true)
  const [imageLoadStates, setImageLoadStates] = useState<Record<number, boolean>>({})
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dependable-cow-a08d589b62.strapiapp.com/api/Home-sections?populate=*", {
          headers: {
            Accept: "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }

        const apiData: ApiResponse = await response.json()

        // Transform API data to match component interface
        const transformedData: HomePageItem[] = apiData.data.map((item) => ({
          id: item.id,
          documentId: item.documentId,
          title: item.title,
          description: item.description,
          button_text: item.button_text,
          layout: item.layout,
          order: item.order,
          image: {
            id: item.image.id,
            name: item.image.name,
            url: item.image.url,
            alternativeText: item.image.alternativeText,
            width: item.image.width,
            height: item.image.height,
            formats: item.image.formats
              ? {
                  small: item.image.formats.small
                    ? {
                        url: item.image.formats.small.url,
                        width: item.image.formats.small.width,
                        height: item.image.formats.small.height,
                      }
                    : undefined,
                }
              : undefined,
          },
        }))

        setHomeData(transformedData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching homepage data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleShopNowClick = () => {
    router.push("/product")
  }

  const handleImageLoad = (imageId: number) => {
    setImageLoadStates((prev) => ({ ...prev, [imageId]: true }))
  }

  if (loading) {
    return <HomePageSkeleton />
  }

  const sortedData = homeData.sort((a, b) => a.order - b.order)

  return (
    <div className="bg-white">
      {sortedData.map((item, index) => {
        const isFirstImage = index === 0
        const imageUrl = item.image.formats?.small?.url || item.image.url || "/placeholder.svg"
        const isImageLoaded = imageLoadStates[item.id]

        return (
          <section key={item.id} className="w-full">
            <div className="flex flex-col lg:grid lg:grid-cols-2 w-full">
              {item.layout === "left" ? (
                <>
                  <div className="relative w-full aspect-[4/3]">
                    {!isImageLoaded && <ImageShimmer />}
                    <Image
                      src={imageUrl || "/placeholder.svg"}
                      alt={item.image.alternativeText || item.title}
                      fill
                      className={`object-cover transition-opacity duration-300 ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
                      priority={isFirstImage}
                      loading={isFirstImage ? "eager" : "lazy"}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={85}
                      onLoad={() => handleImageLoad(item.id)}
                    />
                  </div>
                  <div className="flex items-center justify-center p-8 lg:p-16 order-2 bg-gray-50 w-full">
                    <div className="max-w-md space-y-6 text-center">
                      <h1 className="text-lg lg:text-5xl font-light text-gray-900 leading-tight">{item.title}</h1>
                      <p className="text-md text-gray-600 leading-relaxed">{item.description}</p>
                      <div className="flex justify-center">
                        <Button
                          onClick={handleShopNowClick}
                          className="bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 px-8 py-3 text-base font-medium transition-colors duration-200"
                        >
                          {item.button_text}
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center p-8 lg:p-16 order-2 lg:order-1 bg-gray-50 w-full">
                    <div className="max-w-md space-y-6 text-center">
                      <h1 className="text-lg lg:text-5xl font-light text-gray-900 leading-tight">{item.title}</h1>
                      <p className="text-md text-gray-600 leading-relaxed">{item.description}</p>
                      <div className="flex justify-center">
                        <Button
                          onClick={handleShopNowClick}
                          className="bg-white text-gray-800 cursor-pointer border border-gray-300 hover:bg-gray-100 px-8 py-3 text-base font-medium transition-colors duration-200"
                        >
                          {item.button_text}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="relative w-full aspect-[4/3] order-1 lg:order-2">
                    {!isImageLoaded && <ImageShimmer />}
                    <Image
                      src={imageUrl || "/placeholder.svg"}
                      alt={item.image.alternativeText || item.title}
                      fill
                      className={`object-cover transition-opacity duration-300 ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
                      priority={isFirstImage}
                      loading={isFirstImage ? "eager" : "lazy"}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={85}
                      onLoad={() => handleImageLoad(item.id)}
                    />
                  </div>
                </>
              )}
            </div>
          </section>
        )
      })}
    </div>
  )
}




