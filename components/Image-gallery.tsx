"use client"

import React from "react"

import { useState, useRef, useEffect, useMemo, useCallback } from "react"
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

// Shimmer component for loading state
const ImageShimmer = () => (
  <div className="absolute inset-0 bg-gray-200 animate-pulse">
    <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer bg-[length:200%_100%]" />
  </div>
)

// Memoized image component to prevent unnecessary re-renders
const GalleryImageItem = React.memo(
  ({
    image,
    index,
    visibleImages,
    priority = false,
  }: {
    image: GalleryImage
    index: number
    visibleImages: number
    priority?: boolean
  }) => {
    const [imageLoaded, setImageLoaded] = useState(false)
    const [imageError, setImageError] = useState(false)

    // Memoize blur data URL
    const blurDataURL = useMemo(
      () =>
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==",
      [],
    )

    const handleImageLoad = useCallback(() => {
      setImageLoaded(true)
    }, [])

    const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
      const target = e.target as HTMLImageElement
      target.src = "/placeholder.svg"
      setImageError(true)
      setImageLoaded(true)
    }, [])

    return (
      <div className="flex-shrink-0 w-full sm:w-1/2 snap-start">
        <div className="relative aspect-[3/4] m-1">
          {/* Shimmer loading effect */}
          {!imageLoaded && !imageError && <ImageShimmer />}

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
            quality={85}
            loading={priority ? "eager" : "lazy"}
          />
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

  // Memoize visible images calculation
  const updateVisibleImages = useCallback(() => {
    if (window.innerWidth < 640) {
      setVisibleImages(1)
    } else {
      setVisibleImages(2)
    }
  }, [])

  useEffect(() => {
    updateVisibleImages()
    window.addEventListener("resize", updateVisibleImages)

    return () => {
      window.removeEventListener("resize", updateVisibleImages)
    }
  }, [updateVisibleImages])

  // Memoize scroll function
  const scrollToImage = useCallback(
    (index: number) => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current
        const imageWidth = container.clientWidth / visibleImages
        container.scrollTo({
          left: index * imageWidth,
          behavior: "smooth",
        })
      }
      setCurrentImageIndex(index)
    },
    [visibleImages],
  )

  // Memoize navigation handlers
  const handlePrevious = useCallback(() => {
    const newIndex = Math.max(currentImageIndex - visibleImages, 0)
    scrollToImage(newIndex)
  }, [currentImageIndex, visibleImages, scrollToImage])

  const handleNext = useCallback(() => {
    const newIndex = Math.min(currentImageIndex + visibleImages, images.length - visibleImages)
    scrollToImage(newIndex)
  }, [currentImageIndex, visibleImages, images.length, scrollToImage])

  // Memoize button visibility
  const buttonVisibility = useMemo(
    () => ({
      showPrevButton: currentImageIndex > 0,
      showNextButton: currentImageIndex < images.length - visibleImages,
    }),
    [currentImageIndex, images.length, visibleImages],
  )

  // Memoize pagination dots data
  const paginationData = useMemo(() => {
    const totalSets = Math.ceil(images.length / visibleImages)
    const activeSet = Math.floor(currentImageIndex / visibleImages)

    return {
      totalSets,
      activeSet,
      showPagination: images.length > visibleImages,
    }
  }, [images.length, visibleImages, currentImageIndex])

  // Memoize pagination dot click handlers
  const paginationHandlers = useMemo(
    () => Array.from({ length: paginationData.totalSets }, (_, i) => () => scrollToImage(i * visibleImages)),
    [paginationData.totalSets, scrollToImage, visibleImages],
  )

  // Memoize container style
  const containerStyle = useMemo(
    () => ({
      scrollbarWidth: "none" as const,
      msOverflowStyle: "none" as const,
    }),
    [],
  )

  return (
    <div className="relative">
      {/* Main scrollable container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        style={containerStyle}
      >
        {images.map((image, index) => (
          <GalleryImageItem
            key={image.id}
            image={image}
            index={index}
            visibleImages={visibleImages}
            priority={index < 2} // Prioritize first 2 images
          />
        ))}
      </div>

      {/* Navigation buttons */}
      {buttonVisibility.showPrevButton && (
        <button
          onClick={handlePrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
          aria-label="Previous image"
          type="button"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}

      {buttonVisibility.showNextButton && (
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
          aria-label="Next image"
          type="button"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}

      {/* Pagination dots */}
      {paginationData.showPagination && (
        <div className="flex justify-center mt-4 gap-1.5">
          {Array.from({ length: paginationData.totalSets }).map((_, i) => (
            <button
              key={i}
              onClick={paginationHandlers[i]}
              className={`h-2 w-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 ${
                i === paginationData.activeSet ? "bg-black" : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to image set ${i + 1}`}
              type="button"
            />
          ))}
        </div>
      )}
    </div>
  )
}

