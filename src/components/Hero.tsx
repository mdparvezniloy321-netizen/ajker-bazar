import { motion } from "motion/react";
import { ArrowLeftRight, ShoppingBag, Sparkles, Tag, ShieldCheck } from "lucide-react";

interface HeroProps {
  onCtaClick: () => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#E53935] via-[#D32F2F] to-[#B71C1C] text-white py-14 md:py-24 px-4 sm:px-6 lg:px-8 shadow-inner" id="hero-banner">
      {/* Absolute Decorative Circles & Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
      <div className="absolute top-1/2 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-5 right-20 w-80 h-80 bg-red-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
        
        {/* Left text column */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold tracking-wide"
          >
            <Sparkles className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            <span>১০০% প্রিমিয়াম ও নির্ভরযোগ্য বাংলাদেশি স্টোর</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight"
          >
            স্বাগতম <span className="text-yellow-300 underline decoration-wavy decoration-2 underline-offset-8">আজকের বাজারে</span>!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl font-medium text-red-50 max-w-xl leading-relaxed"
          >
            বাংলাদেশের সেরা অনলাইন শপিং শপ—পোশাক, গ্যাজেট, শুকনো খাবার এবং ডেইলি প্রসাধন সামগ্রী একই ঠিকানায়!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-2"
          >
            <button
              onClick={onCtaClick}
              className="group relative inline-flex items-center gap-2 bg-white text-[#E53935] hover:text-white hover:bg-transparent font-bold text-base sm:text-lg px-8 py-4 rounded-full shadow-lg border border-white transition-all overflow-hidden cursor-pointer"
              id="hero-cta-btn"
            >
              {/* background color transition simulation */}
              <span className="absolute inset-0 bg-[#E53935] translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
              
              <span className="relative flex items-center gap-2">
                এখনই কিনুন
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </span>
            </button>
          </motion.div>

          {/* Quick trust metrics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ opacity: 1, delay: 0.5 }}
            className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 w-full max-w-md text-red-100"
          >
            <div className="flex items-center gap-1.5 md:gap-2">
              <ShieldCheck className="w-4 h-4 text-yellow-300 shrink-0" />
              <span className="text-xs font-semibold">১০০% গ্যারান্টি</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <ArrowLeftRight className="w-4 h-4 text-yellow-300 shrink-0" />
              <span className="text-xs font-semibold">৭ দিনে রিটার্ন</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <Tag className="w-4 h-4 text-yellow-300 shrink-0" />
              <span className="text-xs font-semibold">সেরা পাইকারি রেট</span>
            </div>
          </motion.div>

        </div>

        {/* Right graphical card stack/illustration column */}
        <div className="lg:col-span-5 h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative w-full max-w-sm sm:max-w-md"
          >
            {/* Visual Glassmorphism Card */}
            <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl relative">
              <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 font-black text-xs px-3 py-1.5 rounded-full rotate-12 uppercase tracking-wider animate-bounce">
                ৫০% পর্যন্ত ছাড়!
              </div>

              <div className="space-y-4">
                <div className="text-xs uppercase font-bold text-yellow-300 tracking-widest">আজকের জনপ্রিয় বিভাগ</div>
                
                {/* Floating Preview Card 1 */}
                <div className="flex items-center gap-4 bg-white/15 p-3 sm:p-4 rounded-2xl hover:bg-white/25 transition-all">
                  <div className="bg-white text-[#E53935] w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl shrink-0">
                    👕
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-sm sm:text-base">প্রিমিয়াম টি-শার্ট ও জিন্স</div>
                    <div className="text-xs text-red-100">স্টাইলিশ নতুন কালেকশন</div>
                  </div>
                </div>

                {/* Floating Preview Card 2 */}
                <div className="flex items-center gap-4 bg-white/15 p-3 sm:p-4 rounded-2xl hover:bg-white/25 transition-all">
                  <div className="bg-white text-[#E53935] w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl shrink-0">
                    🎧
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-sm sm:text-base">স্মার্ট ওয়াচ ও ব্লুটুথ স্পিকার</div>
                    <div className="text-xs text-red-100">আধুনিক গ্যাজেটস কালেকশন</div>
                  </div>
                </div>

                {/* Floating Preview Card 3 */}
                <div className="flex items-center gap-4 bg-white/15 p-3 sm:p-4 rounded-2xl hover:bg-white/25 transition-all">
                  <div className="bg-white text-[#E53935] w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl shrink-0">
                    💅
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-sm sm:text-base">মেয়েদের রূপচর্চা ও কসমেটিকস</div>
                    <div className="text-xs text-red-100">কোরিয়ান গ্লো ব্রাইট ক্রিম ও শাড়ি</div>
                  </div>
                </div>

              </div>
            </div>
            
            {/* Red & White theme background absolute accents */}
            <div className="absolute -bottom-3 -left-3 bg-white text-[#E53935] font-black py-2.5 px-5 rounded-2xl shadow-xl text-center z-20 shrink-0 select-none border border-[#E53935]">
              <div className="text-xs uppercase tracking-tight">ঢাকায় ডেলিভারি</div>
              <div className="text-lg">মাত্র ৬০ টাকা ৳</div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
