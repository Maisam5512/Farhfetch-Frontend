"use client"

import Link from "next/link"
import { Search, User, Heart, ShoppingBag } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function Navbar() {
  return (
    <header className="w-full bg-white border-b sticky top-0 z-50">
      {/* Top Navigation */}
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Navigation */}
        <nav className="flex items-center space-x-8">
          <button className="text-sm font-medium text-gray-900 hover:text-gray-600">Womenswear</button>
          <Link href="/product" className="text-sm font-medium text-gray-900 hover:text-gray-600">
            Menswear
          </Link>
          <button className="text-sm font-medium text-gray-900 hover:text-gray-600">Kidswear</button>
        </nav>

        {/* Center Logo */}
        <Link href="/" className="text-2xl font-bold tracking-wider">
          FARFETCH
        </Link>

        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-200">
            <div className="w-full h-1/2 bg-green-600"></div>
            <div className="w-full h-1/2 bg-white"></div>
          </div>
          <User className="w-6 h-6 text-gray-700 cursor-pointer hover:text-gray-900" />
          <Heart className="w-6 h-6 text-gray-700 cursor-pointer hover:text-gray-900" />
          <ShoppingBag className="w-6 h-6 text-gray-700 cursor-pointer hover:text-gray-900" />
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between px-6 py-3 border-t">
        <nav className="flex items-center space-x-8">
          <Link href="/product" className="text-sm font-medium text-red-600 hover:text-red-700">
            Sale
          </Link>
          <button className="text-sm font-medium text-gray-700 hover:text-gray-900">New in</button>
          <button className="text-sm font-medium text-gray-700 hover:text-gray-900">Vacation</button>
          <button className="text-sm font-medium text-gray-700 hover:text-gray-900">Brands</button>
          <button className="text-sm font-medium text-gray-700 hover:text-gray-900">Clothing</button>
          <button className="text-sm font-medium text-gray-700 hover:text-gray-900">Shoes</button>
          <button className="text-sm font-medium text-gray-700 hover:text-gray-900">Bags</button>
          <button className="text-sm font-medium text-gray-700 hover:text-gray-900">Accessories</button>
          <button className="text-sm font-medium text-gray-700 hover:text-gray-900">Watches</button>
          <button className="text-sm font-medium text-gray-700 hover:text-gray-900">Homeware</button>
        </nav>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input type="search" placeholder="Search" className="pl-10 w-64 border-gray-300 focus:border-gray-500" />
        </div>
      </div>
    </header>
  )
}


