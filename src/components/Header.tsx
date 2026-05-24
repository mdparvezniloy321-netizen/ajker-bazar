import { useState } from "react";
import { Search, ShoppingCart, Menu, X, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { convertToBanglaNumber } from "../data";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartCount: number;
  onCartToggle: () => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  onContactScroll: () => void;
  onProductsScroll: () => void;
  isAdminMode: boolean;
  setIsAdminMode: (val: boolean) => void;
}

export default function Header({
  searchQuery,
  setSearchQuery,
  cartCount,
  onCartToggle,
  selectedCategory,
  setSelectedCategory,
  onContactScroll,
  onProductsScroll,
  isAdminMode,
  setIsAdminMode,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Helper to click on visual navigation
  const handleNavClick = (target: "home" | "products" | "offers" | "contact") => {
    setMobileMenuOpen(false);
    if (target === "home") {
      setSelectedCategory("all");
      setSearchQuery("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (target === "products") {
      onProductsScroll();
    } else if (target === "offers") {
      // Filter for products that have a high discount or just set search to empty and scroll to top of products with some filter
      setSelectedCategory("all");
      // filter to high discount items (like items >= 15% discount) by scrolling there
      onProductsScroll();
    } else if (target === "contact") {
      onContactScroll();
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-rose-100 shadow-sm" id="shop-header">
      {/* Top Banner Accent */}
      <div className="bg-[#E53935] text-white py-1.5 px-4 text-center text-xs sm:text-sm font-medium tracking-wide">
        💥 বিশেষ অফার! প্রতিটি কেনাকাটায় নিশ্চিত আকর্ষণীয় উপহার এবং সারা দেশে ক্যাশ অন ডেলিভারি!
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20 gap-4">
          {/* Custom SVG Red & White Logo */}
          <div 
            onClick={() => handleNavClick("home")} 
            className="flex items-center gap-3 cursor-pointer shrink-0 group select-none"
            id="site-logo"
          >
            {/* Elegant Shopping Bag Logo Container */}
            <div className="bg-[#E53935] hover:bg-[#d32f2f] transition-colors p-2.5 rounded-xl text-white shadow-md flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold text-[#E53935] tracking-tight hover:scale-102 transition-transform duration-200 font-sans">
                আজকের বাজার<span className="text-gray-800 text-[15px] font-normal font-sans">.com</span>
              </span>
              <span className="text-[10px] sm:text-[11px] text-gray-500 font-medium tracking-wider">
                সেরা পণ্য, সেরা দাম
              </span>
            </div>
          </div>

          {/* Search Bar - Center */}
          <div className="hidden md:flex relative flex-1 max-w-md mx-4" id="search-container-desktop">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="পণ্য খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm bg-gray-50 text-gray-900 pl-4 pr-11 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:border-[#E53935] focus:bg-white focus:ring-2 focus:ring-rose-100 transition-all placeholder-gray-400"
              />
              <button className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#E53935] transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Action Icons & Desktop Links */}
          <div className="flex items-center gap-2 sm:gap-4" id="header-actions">
            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 mr-2">
              <button
                onClick={() => handleNavClick("home")}
                className="text-gray-600 hover:text-[#E53935] font-medium text-sm transition-colors cursor-pointer"
              >
                হোম
              </button>
              <button
                onClick={() => handleNavClick("products")}
                className="text-gray-600 hover:text-[#E53935] font-medium text-sm transition-colors cursor-pointer"
              >
                পণ্য
              </button>
              <button
                onClick={() => handleNavClick("offers")}
                className="text-gray-600 hover:text-[#E53935] font-medium text-sm transition-colors cursor-pointer bg-red-50 text-[#E53935] px-3 py-1 rounded-full hover:bg-red-100"
              >
                অফার
              </button>
              <button
                onClick={() => handleNavClick("contact")}
                className="text-gray-600 hover:text-[#E53935] font-medium text-sm transition-colors cursor-pointer"
              >
                যোগাযোগ
              </button>
              <button
                onClick={() => setIsAdminMode(!isAdminMode)}
                className="text-xs font-bold bg-[#E53935]/10 text-[#E53935] hover:bg-[#E53935]/25 px-4 py-2 rounded-full border border-red-200 transition-colors cursor-pointer inline-flex items-center gap-1.5 font-sans"
              >
                ⚙️ {isAdminMode ? "কাস্টমার ভিউ" : "এডমিন প্যানেল"}
              </button>
            </nav>

            {/* Shopping Cart Icon with Count Badge */}
            <button
              onClick={onCartToggle}
              className="relative p-2.5 text-gray-700 hover:text-[#E53935] hover:bg-rose-50 rounded-full transition-all cursor-pointer"
              aria-label="শপিং কার্ট"
              id="cart-toggle-btn"
            >
              <ShoppingCart className="w-6 h-6" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-1 right-1 bg-[#E53935] text-white text-[10px] md:text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm"
                  >
                    {convertToBanglaNumber(cartCount)}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 sm:p-2.5 text-gray-700 hover:text-[#E53935] hover:bg-rose-50 rounded-full lg:hidden transition-colors cursor-pointer"
              aria-label="মেনু"
              id="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search - Visible under md breakpoint */}
        <div className="pb-3 md:hidden" id="search-container-mobile">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="পণ্য খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs bg-gray-50 text-gray-900 pl-4 pr-11 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-[#E53935] focus:bg-white transition-all placeholder-gray-400"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Animated Dropdown Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-rose-50 bg-white overflow-hidden shadow-inner"
            id="mobile-nav-panel"
          >
            <div className="px-4 pt-2 pb-4 space-y-2">
              <button
                onClick={() => handleNavClick("home")}
                className="block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-[#E53935] transition-colors"
              >
                হোম
              </button>
              <button
                onClick={() => handleNavClick("products")}
                className="block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-[#E53935] transition-colors"
              >
                পণ্য সমূহ
              </button>
              <button
                onClick={() => handleNavClick("offers")}
                className="block w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold text-[#E53935] bg-red-50 hover:bg-red-100 transition-colors"
              >
                বিশেষ সুপার অফারসমূহ
              </button>
              <button
                onClick={() => handleNavClick("contact")}
                className="block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-[#E53935] transition-colors"
              >
                যোগাযোগ করুন
              </button>
              <button
                onClick={() => {
                  setIsAdminMode(!isAdminMode);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold text-[#E53935] bg-red-50 hover:bg-red-100 transition-colors"
              >
                ⚙️ {isAdminMode ? "কাস্টমার ভিউ" : "এডমিন প্যানেল (ড্যাশবোর্ড)"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
