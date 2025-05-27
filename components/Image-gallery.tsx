"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface GalleryImage {
  id: number
  url: string
  alt: string
}

interface ImageGalleryProps {
  images: GalleryImage[]
}

const blurDataURL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="

const ImageShimmer = React.memo(() => (
  <div className="absolute inset-0 bg-gray-200 overflow-hidden">
    <div
      className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
      style={{
        animation: "shimmer 2s infinite linear",
        backgroundSize: "200% 100%",
      }}
    />
    <style jsx>{`
      @keyframes shimmer {
        0% {
          background-position: -200% 0;
        }
        100% {
          background-position: 200% 0;
        }
      }
    `}</style>
  </div>
))

ImageShimmer.displayName = "ImageShimmer"

const GalleryImageItem = React.memo(
  ({
    image,
    index,
    priority = false,
    isVisible = true,
  }: {
    image: GalleryImage
    index: number
    priority?: boolean
    isVisible?: boolean
  }) => {
    const [imageLoaded, setImageLoaded] = useState(false)
    const [imageError, setImageError] = useState(false)

    const handleImageLoad = useCallback(() => {
      setImageLoaded(true)
    }, [])

    const handleImageError = useCallback(
      (e: React.SyntheticEvent<HTMLImageElement>) => {
        const target = e.target as HTMLImageElement
        target.src = "/placeholder.png"
        setImageError(true)
        setImageLoaded(true)
      },
      [],
    )

    return (
      <div className="flex-shrink-0 w-full sm:w-1/2 snap-start">
        <div
          className="relative m-1"
          style={{
            aspectRatio: "3/4",
            minHeight: "400px",
            maxHeight: "600px",
          }}
        >
          {!imageLoaded && !imageError && <ImageShimmer />}

          {(isVisible || priority) && (
            <Image
              src={image.url || "/placeholder.png"}
              alt={image.alt}
              fill
              className={`object-cover object-center transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              sizes="(max-width: 640px) 100vw, 50vw"
              priority={priority}
              placeholder="blur"
              blurDataURL={blurDataURL}
              onLoad={handleImageLoad}
              onError={handleImageError}
              quality={priority ? 90 : 80}
              loading={priority ? "eager" : "lazy"}
              decoding={priority ? "sync" : "async"}
            />
          )}
        </div>
      </div>
    )
  },
)

GalleryImageItem.displayName = "GalleryImageItem"

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [visibleImages, setVisibleImages] = useState(2)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const updateVisibleImages = useCallback(() => {
    setVisibleImages(window.innerWidth < 640 ? 1 : 2)
  }, [])

  useEffect(() => {
    updateVisibleImages()

    let timeoutId: NodeJS.Timeout
    const debouncedResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(updateVisibleImages, 150)
    }

    window.addEventListener("resize", debouncedResize, { passive: true })

    return () => {
      window.removeEventListener("resize", debouncedResize)
      clearTimeout(timeoutId)
    }
  }, [updateVisibleImages])

  const scrollToImage = useCallback(
    (index: number) => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current
        const imageWidth = container.clientWidth / visibleImages

        requestAnimationFrame(() => {
          container.scrollTo({
            left: index * imageWidth,
            behavior: "smooth",
          })
        })
      }
      setCurrentImageIndex(index)
    },
    [visibleImages],
  )

  const handlePrevious = useCallback(() => {
    scrollToImage(Math.max(currentImageIndex - visibleImages, 0))
  }, [currentImageIndex, visibleImages, scrollToImage])

  const handleNext = useCallback(() => {
    scrollToImage(Math.min(currentImageIndex + visibleImages, images.length - visibleImages))
  }, [currentImageIndex, visibleImages, images.length, scrollToImage])

  const totalSets = Math.ceil(images.length / visibleImages)
  const activeSet = Math.floor(currentImageIndex / visibleImages)
  const showPagination = images.length > visibleImages

  const paginationHandlers = Array.from({ length: totalSets }, (_, i) => () =>
    scrollToImage(i * visibleImages),
  )

  const getVisibleImageIndices = () => {
    const start = currentImageIndex
    const end = Math.min(start + visibleImages + 1, images.length)
    return { start, end }
  }

  const { start, end } = getVisibleImageIndices()

  return (
    <div className="relative" style={{ minHeight: "500px", maxHeight: "700px" }}>
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          minHeight: "500px",
        }}
      >
        {images.map((image, index) => (
          <GalleryImageItem
            key={image.id}
            image={image}
            index={index}
            priority={index < 2}
            isVisible={index >= start && index < end}
          />
        ))}
      </div>

      {currentImageIndex > 0 && (
        <button
          onClick={handlePrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-md hover:bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          style={{ minHeight: "44px", minWidth: "44px" }}
          aria-label="Previous image"
          type="button"
        >
          <ChevronLeft className="h-5 w-5 text-gray-900" />
        </button>
      )}

      {currentImageIndex < images.length - visibleImages && (
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-md hover:bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          style={{ minHeight: "44px", minWidth: "44px" }}
          aria-label="Next image"
          type="button"
        >
          <ChevronRight className="h-5 w-5 text-gray-900" />
        </button>
      )}

      {showPagination && (
        <div className="flex justify-center mt-4 gap-2" style={{ minHeight: "20px" }}>
          {Array.from({ length: totalSets }).map((_, i) => (
            <button
              key={i}
              onClick={paginationHandlers[i]}
              className={`h-3 w-3 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 ${
                i === activeSet ? "bg-gray-900" : "bg-gray-400 hover:bg-gray-600"
              }`}
              style={{ minHeight: "20px", minWidth: "20px" }}
              aria-label={`Go to image set ${i + 1}`}
              type="button"
            />
          ))}
        </div>
      )}
    </div>
  )
}



