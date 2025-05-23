"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart } from "lucide-react"

// This is a simplified version of the product card that doesn't rely on API data
export default function MockProductCard() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="group relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <Image
          src="/placeholder.png"
          alt="Check-print peplum top"
          fill
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <button className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white">
          <Heart className="h-5 w-5" />
        </button>

        <div className="absolute bottom-2 left-2 bg-black text-white text-xs font-medium px-2 py-1">-30%</div>
      </div>

      <div className="mt-2 space-y-1">
        {!isHovered ? (
          <>
            <p className="text-sm text-gray-500">GANNI</p>
            <h3 className="text-sm font-medium truncate">Check-print peplum top</h3>
            <div className="flex items-center gap-2">
              <span className="font-medium">$257</span>
              <span className="text-sm text-gray-500 line-through">$369</span>
            </div>
          </>
        ) : (
          <div className="py-2">
            <p className="font-medium text-sm">Available in</p>
            <div className="flex flex-wrap gap-1 mt-1">
              <span className="text-sm">XS, S, M, L, XL</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
