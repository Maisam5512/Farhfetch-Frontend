import { Instagram, Facebook, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <button className="text-sm text-gray-600 hover:text-gray-900">Contact us</button>
              </li>
              <li>
                <button className="text-sm text-gray-600 hover:text-gray-900">FAQs</button>
              </li>
              <li>
                <button className="text-sm text-gray-600 hover:text-gray-900">Orders and delivery</button>
              </li>
              <li>
                <button className="text-sm text-gray-600 hover:text-gray-900">Returns and refunds</button>
              </li>
              <li>
                <button className="text-sm text-gray-600 hover:text-gray-900">Payment and pricing</button>
              </li>
              <li>
                <button className="text-sm text-gray-600 hover:text-gray-900">Cryptocurrency payments</button>
              </li>
              <li>
                <button className="text-sm text-gray-600 hover:text-gray-900">Promotion terms and conditions</button>
              </li>
              <li>
                <button className="text-sm text-gray-600 hover:text-gray-900">FARFETCH Customer Promise</button>
              </li>
            </ul>
          </div>

          {/* About FARFETCH */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">About FARFETCH</h3>
            <ul className="space-y-3">
              <li>
                <button className="text-sm text-gray-600 hover:text-gray-900">About us</button>
              </li>
              <li>
                <button className="text-sm text-gray-600 hover:text-gray-900">FARFETCH partner boutiques</button>
              </li>
              <li>
                <button className="text-sm text-gray-600 hover:text-gray-900">Careers</button>
              </li>
              <li>
                <button className="text-sm text-gray-600 hover:text-gray-900">FARFETCH app</button>
              </li>
              <li>
                <button className="text-sm text-gray-600 hover:text-gray-900">Modern slavery statement</button>
              </li>
              <li>
                <button className="text-sm text-gray-600 hover:text-gray-900">FARFETCH Advertising</button>
              </li>
            </ul>
          </div>

          {/* Discounts and membership */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Discounts and membership</h3>
            <ul className="space-y-3">
              <li>
                <button className="text-sm text-gray-600 hover:text-gray-900">Affiliate program</button>
              </li>
              <li>
                <button className="text-sm text-gray-600 hover:text-gray-900">Refer a friend</button>
              </li>
              <li>
                <button className="text-sm text-gray-600 hover:text-gray-900">FARFETCH membership</button>
              </li>
              <li>
                <button className="text-sm text-gray-600 hover:text-gray-900">Student Beans and Graduates</button>
              </li>
            </ul>
          </div>

          {/* Follow us */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Follow us</h3>
            <div className="flex space-x-4">
              <Instagram className="w-6 h-6 text-gray-600 hover:text-gray-900 cursor-pointer" />
              <Facebook className="w-6 h-6 text-gray-600 hover:text-gray-900 cursor-pointer" />
              <div className="w-6 h-6 text-gray-600 hover:text-gray-900 cursor-pointer">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </div>
              <Twitter className="w-6 h-6 text-gray-600 hover:text-gray-900 cursor-pointer" />
              <div className="w-6 h-6 text-gray-600 hover:text-gray-900 cursor-pointer">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                </svg>
              </div>
              <Youtube className="w-6 h-6 text-gray-600 hover:text-gray-900 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <button className="text-sm text-gray-600 hover:text-gray-900 underline">Privacy policy</button>
              <button className="text-sm text-gray-600 hover:text-gray-900 underline">Terms and conditions</button>
              <button className="text-sm text-gray-600 hover:text-gray-900 underline">Accessibility</button>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <p>
              <span className="font-semibold">FARFETCH</span> and the {"FARFETCH"} logo are trade marks of FARFETCH UK{" "}
              <span className="underline">Limited</span> and are registered in numerous jurisdictions around the world.
            </p>
            <p className="mt-1">© Copyright 2025 FARFETCH UK Limited. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
