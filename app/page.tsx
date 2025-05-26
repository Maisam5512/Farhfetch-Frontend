"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

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
      <div className="h-10"></div>
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
       
      {/* Information Cards Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* How to Shop Card */}
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="mb-4">
              <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">HOW TO SHOP</h3>
            <p className="text-sm text-gray-600">Your guide to shopping and placing orders</p>
          </div>

          {/* FAQs Card */}
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="mb-4">
              <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">FAQS</h3>
            <p className="text-sm text-gray-600">Your questions answered</p>
          </div>

          {/* Need Help Card */}
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="mb-4">
              <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">NEED HELP?</h3>
            <p className="text-sm text-gray-600">Contact our global Customer Service team</p>
          </div>
        </div>
      </div>

      {/* Newsletter Signup Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-3xl font-light text-gray-900 mb-4">Never miss a thing</h2>
              <p className="text-gray-600 leading-relaxed">
                Sign up for promotions, tailored new arrivals, stock updates and more – straight to your inbox
              </p>
            </div>

            {/* Right Form */}
            <div>
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-4">GET UPDATES BY</h3>

                {/* Email Option */}
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="email"
                    defaultChecked
                    className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-500"
                  />
                  <label htmlFor="email" className="ml-3 text-sm text-gray-700">
                    Email
                  </label>
                </div>

                {/* Email Input */}
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent mb-4"
                />

                {/* SMS Option */}
                <div className="flex items-center mb-6">
                  <input
                    type="checkbox"
                    id="sms"
                    className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-500"
                  />
                  <label htmlFor="sms" className="ml-3 text-sm text-gray-700">
                    SMS
                  </label>
                </div>

                {/* Sign Up Button */}
                <button className="w-full bg-gray-900 text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors font-medium">
                  Sign Up
                </button>

                {/* Legal Text */}
                <p className="text-xs text-gray-500 mt-4 leading-relaxed">
                  By signing up, you consent to receiving marketing by email and/or SMS and acknowledge you have read
                  our <button className="underline hover:no-underline">Privacy Policy</button>. You may unsubscribe at
                  any time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer before footer */}
      <div className="h-16"></div>
    </div>
  )
}




