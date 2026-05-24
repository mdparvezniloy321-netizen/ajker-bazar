import { RefObject } from "react";
import { ShoppingBag, Phone, Mail, MapPin, ShieldCheck, Heart, Facebook, Youtube } from "lucide-react";
import { convertToBanglaNumber } from "../data";

interface FooterProps {
  onContactRef: RefObject<HTMLDivElement | null>;
}

export default function Footer({ onContactRef }: FooterProps) {
  return (
    <footer ref={onContactRef} className="bg-gray-900 text-gray-300 border-t-4 border-[#E53935]" id="contacts-footer">
      
      {/* Top Value Propositions Row */}
      <div className="bg-[#E53935] text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <span className="text-2xl sm:text-3xl">🚚</span>
            <div>
              <h5 className="font-bold text-sm sm:text-base leading-none">Bangladesh Delivery</h5>
              <span className="text-xs text-red-100">Outside Dhaka only ৳120</span>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <span className="text-2xl sm:text-3xl">🔄</span>
            <div>
              <h5 className="font-bold text-sm sm:text-base leading-none">Easy Return Policy</h5>
              <span className="text-xs text-red-100">Replace product within 7 days</span>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <span className="text-2xl sm:text-3xl">🛡️</span>
            <div>
              <h5 className="font-bold text-sm sm:text-base leading-none">100% Cash on Delivery</h5>
              <span className="text-xs text-red-100">Pay after receiving product</span>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <span className="text-2xl sm:text-3xl">📞</span>
            <div>
              <h5 className="font-bold text-sm sm:text-base leading-none">24/7 Support</h5>
              <span className="text-xs text-red-100">Direct support line</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-11">
        
        {/* Brand column */}
        <div className="md:col-span-5 space-y-4 text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="bg-[#E53935] p-2 rounded-xl text-white">
              <ShoppingBag className="w-5.5 h-5.5" />
            </div>
            <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
              আজকের বাজার<span className="text-red-500 font-normal">.com</span>
            </span>
          </div>
          
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm mx-auto md:mx-0">
            Ajker Bazar is a reliable and trusted online store in Bangladesh. Our goal is to deliver premium quality products and trendy apparel to your doorstep at wholesale prices.
          </p>

          <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer"
              className="bg-gray-800 hover:bg-[#E53935] hover:text-white text-gray-400 p-2.5 rounded-full transition-colors"
              aria-label="Facebook Page"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noreferrer"
              className="bg-gray-800 hover:bg-[#E53935] hover:text-white text-gray-400 p-2.5 rounded-full transition-colors"
              aria-label="YouTube Channel"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <div className="bg-gray-800 text-yellow-500 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-yellow-500" />
              <span>Verified Page</span>
            </div>
          </div>
        </div>

        {/* Links Column */}
        <div className="md:col-span-3 text-center md:text-left">
          <h4 className="text-white font-extrabold text-sm sm:text-base border-l-4 border-[#E53935] pl-2.5 mb-5 md:mb-6 uppercase tracking-wider">
            Useful Links
          </h4>
          <ul className="space-y-3.5 text-xs sm:text-sm text-gray-400">
            <li>
              <a href="#about" className="hover:text-white hover:underline transition-colors block">
                About Us
              </a>
            </li>
            <li>
              <a href="#return" className="hover:text-white hover:underline transition-colors block">
                Return Policy
              </a>
            </li>
            <li>
              <a href="#privacy" className="hover:text-white hover:underline transition-colors block">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#terms" className="hover:text-white hover:underline transition-colors block">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        {/* Contact column */}
        <div className="md:col-span-4 text-center md:text-left space-y-4">
          <h4 className="text-white font-extrabold text-sm sm:text-base border-l-4 border-[#E53935] pl-2.5 mb-5 md:mb-6 uppercase tracking-wider">
            Contact Channels
          </h4>
          
          <div className="space-y-3.5 text-xs sm:text-sm text-gray-400">
            <div className="flex items-start gap-3 justify-center md:justify-start">
              <MapPin className="w-5 h-5 text-[#E53935] shrink-0 mt-0.5" />
              <span>House 45, Road 8, Sector 10, Uttara, Dhaka-1230, Bangladesh.</span>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <Phone className="w-5 h-5 text-[#E53935] shrink-0" />
              <span>Hotline: +880 1755 544 322</span>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <Mail className="w-5 h-5 text-[#E53935] shrink-0" />
              <span>Support: support@ajker-bazar.com</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Legal Copyright */}
      <div className="border-t border-gray-800 py-6 text-center text-xs text-gray-500 bg-gray-950 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 font-medium">
          <p>© 2026 Ajker Bazar. All rights reserved.</p>
          <p className="flex items-center gap-1 justify-center">
            Made with <Heart className="w-3.5 h-3.5 text-[#E53935] fill-[#E53935]" /> in Bangladesh.
          </p>
        </div>
      </div>

    </footer>
  );
}
