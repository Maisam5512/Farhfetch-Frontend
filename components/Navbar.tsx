"use client"

import Link from "next/link"
import { Search, User, Heart, ShoppingBag, Menu, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="w-full bg-white border-b sticky top-0 z-50">
 
      <div className="flex items-center justify-between px-4 sm:px-6 py-4">
     
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
          <button className="text-sm font-medium text-gray-900 hover:text-gray-600">Womenswear</button>
          <Link href="/product" className="text-sm font-medium text-gray-900 hover:text-gray-600">
            Menswear
          </Link>
          <button className="text-sm font-medium text-gray-900 hover:text-gray-600">Kidswear</button>
        </nav>

        
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
        </button>

        
        <Link href="/" className="text-xl sm:text-2xl font-bold tracking-wider">
          FARFETCH
        </Link>

        
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden border border-gray-200">
            <div className="w-full h-1/2 bg-green-600"></div>
            <div className="w-full h-1/2 bg-white"></div>
          </div>
          <User className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 cursor-pointer hover:text-gray-900" />
          <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 cursor-pointer hover:text-gray-900" />
          <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 cursor-pointer hover:text-gray-900" />
        </div>
      </div>

      
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <nav className="flex flex-col px-4 py-3 space-y-3">
            <button className="text-sm font-medium text-gray-900 hover:text-gray-600 text-left">Womenswear</button>
            <Link href="/product" className="text-sm font-medium text-gray-900 hover:text-gray-600">
              Menswear
            </Link>
            <button className="text-sm font-medium text-gray-900 hover:text-gray-600 text-left">Kidswear</button>
          </nav>
        </div>
      )}

    
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-t">
        
        <nav className="flex items-center space-x-2 sm:space-x-4 lg:space-x-8 overflow-x-auto">
          <Link
            href="/product"
            className="text-xs sm:text-sm font-medium text-red-600 hover:text-red-700 whitespace-nowrap"
          >
            Sale
          </Link>
          <button className="text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 whitespace-nowrap">
            New in
          </button>
          <button className="text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 whitespace-nowrap">
            Vacation
          </button>
          <button className="text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 whitespace-nowrap">
            Brands
          </button>
          <button className="hidden sm:block text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 whitespace-nowrap">
            Clothing
          </button>
          <button className="hidden sm:block text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 whitespace-nowrap">
            Shoes
          </button>
          <button className="hidden md:block text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 whitespace-nowrap">
            Bags
          </button>
          <button className="hidden md:block text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 whitespace-nowrap">
            Accessories
          </button>
          <button className="hidden lg:block text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 whitespace-nowrap">
            Watches
          </button>
          <button className="hidden lg:block text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 whitespace-nowrap">
            Homeware
          </button>
        </nav>

        
        <div className="relative ml-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search"
            className="pl-10 w-32 sm:w-48 md:w-64 border-gray-300 focus:border-gray-500 text-sm"
          />
        </div>
      </div>
    </header>
  )
}
