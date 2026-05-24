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
              <h5 className="font-bold text-sm sm:text-base leading-none">সারা বাংলাদেশে ডেলিভারি</h5>
              <span className="text-xs text-red-100">ঢাকার বাইরে মাত্র ১২০ টাকা</span>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <span className="text-2xl sm:text-3xl">🔄</span>
            <div>
              <h5 className="font-bold text-sm sm:text-base leading-none">সহজ রিটার্ন পলিসি</h5>
              <span className="text-xs text-red-100">৭ দিনের মধ্যে প্রোডাক্ট বদল করুন</span>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <span className="text-2xl sm:text-3xl">🛡️</span>
            <div>
              <h5 className="font-bold text-sm sm:text-base leading-none">১০০% ক্যাশ অন ডেলিভারি</h5>
              <span className="text-xs text-red-100">প্রোডাক্ট হাতে পেয়ে টাকা পরিশোধ</span>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <span className="text-2xl sm:text-3xl">📞</span>
            <div>
              <h5 className="font-bold text-sm sm:text-base leading-none">২৪/৭ কাস্টমার সাপোর্ট</h5>
              <span className="text-xs text-red-100">সরাসরি কথা বলুন প্রয়োজনে</span>
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
            আজকের বাজার ডট কম বাংলাদেশের একটি নির্ভরযোগ্য ও বিশ্বস্ত অনলাইন মার্চেন্ট শপিং শপ। আমাদের লক্ষ্য হচ্ছে দেশ সেরা প্রিমিয়াম মানের লেবেল ও ট্রেন্ডি পোশাক এবং ক্যাজুয়াল আনুষঙ্গিক সামগ্রী অত্যন্ত সুলভ মূল্যে আপনার দোরগোড়ায় পৌঁছে দেওয়া।
          </p>

          <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer"
              className="bg-gray-800 hover:bg-[#E53935] hover:text-white text-gray-400 p-2.5 rounded-full transition-colors"
              aria-label="ফেসবুক পেজ"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noreferrer"
              className="bg-gray-800 hover:bg-[#E53935] hover:text-white text-gray-400 p-2.5 rounded-full transition-colors"
              aria-label="ইউটিউব চ্যানেল"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <div className="bg-gray-800 text-yellow-500 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-yellow-500" />
              <span>ভেরিফাইড পেজ</span>
            </div>
          </div>
        </div>

        {/* Links Column */}
        <div className="md:col-span-3 text-center md:text-left">
          <h4 className="text-white font-extrabold text-sm sm:text-base border-l-4 border-[#E53935] pl-2.5 mb-5 md:mb-6 uppercase tracking-wider">
            গুরুত্বপূর্ণ লিংকসমূহ
          </h4>
          <ul className="space-y-3.5 text-xs sm:text-sm text-gray-400">
            <li>
              <a href="#about" className="hover:text-white hover:underline transition-colors block">
                সম্পর্কে আমরা (About Us)
              </a>
            </li>
            <li>
              <a href="#return" className="hover:text-white hover:underline transition-colors block">
                রিটার্ন পলিসি (Return Policy)
              </a>
            </li>
            <li>
              <a href="#privacy" className="hover:text-white hover:underline transition-colors block">
                প্রাইভেসি পলিসি (Privacy Policy)
              </a>
            </li>
            <li>
              <a href="#terms" className="hover:text-white hover:underline transition-colors block">
                ব্যবহারের শর্তাবলী (Terms & Service)
              </a>
            </li>
          </ul>
        </div>

        {/* Contact column */}
        <div className="md:col-span-4 text-center md:text-left space-y-4">
          <h4 className="text-white font-extrabold text-sm sm:text-base border-l-4 border-[#E53935] pl-2.5 mb-5 md:mb-6 uppercase tracking-wider">
            সরাসরি যোগাযোগ
          </h4>
          
          <div className="space-y-3.5 text-xs sm:text-sm text-gray-400">
            <div className="flex items-start gap-3 justify-center md:justify-start">
              <MapPin className="w-5 h-5 text-[#E53935] shrink-0 mt-0.5" />
              <span>হাউজ নং- ৪৫, রোড নং- ৮, সেক্টর- ১০, উত্তরা, ঢাকা- ১২৩০, বাংলাদেশ।</span>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <Phone className="w-5 h-5 text-[#E53935] shrink-0" />
              <span>হটলাইন: +৮৮০ ১৭৫৫ ৫৪৪ ৩২২</span>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <Mail className="w-5 h-5 text-[#E53935] shrink-0" />
              <span>সহায়তায়: support@ajker-bazar.com</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Legal Copyright */}
      <div className="border-t border-gray-800 py-6 text-center text-xs text-gray-500 bg-gray-950 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 font-medium">
          <p>© ২০২৬ আজকের বাজার.com। সর্বস্বত্ব সংরক্ষিত।</p>
          <p className="flex items-center gap-1 justify-center">
            মেইড উইথ <Heart className="w-3.5 h-3.5 text-[#E53935] fill-[#E53935]" /> ইন বাংলাদেশ।
          </p>
        </div>
      </div>

    </footer>
  );
}
