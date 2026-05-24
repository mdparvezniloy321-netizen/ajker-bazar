import { useState, useRef, RefObject } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import ProductCard from "./components/ProductCard";
import CartSidebar from "./components/CartSidebar";
import CheckoutModal from "./components/CheckoutModal";
import Footer from "./components/Footer";
import { Product, CartItem } from "./types";
import { sampleProducts, convertToBanglaNumber } from "./data";
import { SearchX, Filter, RefreshCw, ShoppingCart, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  // Synchronously initialize cart from local storage to prevent flickering
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem("ajker_bazar_cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  // Scroll references for navigation anchors
  const contactRef = useRef<HTMLDivElement | null>(null);
  const productsRef = useRef<HTMLDivElement | null>(null);

  // Local storage synchronized update function
  const mutateCartState = (updateFn: (prev: CartItem[]) => CartItem[]) => {
    setCartItems((prev) => {
      const updated = updateFn(prev);
      try {
        localStorage.setItem("ajker_bazar_cart", JSON.stringify(updated));
      } catch (err) {
        console.error("Failed to persist cart items", err);
      }
      return updated;
    });
  };

  // Add to cart callback
  const handleAddToCart = (product: Product) => {
    mutateCartState((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    // Open the cart automatically so the user receives a confirmation
    setCartOpen(true);
  };

  // Increment/Decrement quantity
  const handleUpdateQuantity = (productId: string, action: "plus" | "minus") => {
    mutateCartState((prev) => {
      const existing = prev.find((item) => item.product.id === productId);
      if (!existing) return prev;

      if (action === "minus" && existing.quantity === 1) {
        return prev.filter((item) => item.product.id !== productId);
      }

      return prev.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity: action === "plus" ? item.quantity + 1 : item.quantity - 1,
            }
          : item
      );
    });
  };

  // Completely remove product from Cart drawer
  const handleRemoveItem = (productId: string) => {
    mutateCartState((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Clear cart after place-order success receipt
  const handleOrderSuccess = () => {
    mutateCartState(() => []);
  };

  // Derive cart count
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Smooth scroll helper
  const scrollToRef = (ref: RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Combinational Live Filter (Category + Search query)
  const filteredProducts = sampleProducts.filter((product) => {
    const categoryMatches = selectedCategory === "all" || product.category === selectedCategory;
    const searchMatches =
      !searchQuery.trim() ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatches && searchMatches;
  });

  return (
    <div className="min-h-screen bg-[#FCFCFC] font-sans text-gray-800 flex flex-col red-white-accent">
      
      {/* 1. Sticky Header / Navbar */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={cartCount}
        onCartToggle={() => setCartOpen(!cartOpen)}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onContactScroll={() => scrollToRef(contactRef)}
        onProductsScroll={() => scrollToRef(productsRef)}
      />

      {/* 2. Brand Hero Promotional Banner */}
      <Hero onCtaClick={() => scrollToRef(productsRef)} />

      {/* 3. Category Tiles Selector Section */}
      <Categories
        selectedCategory={selectedCategory}
        setSelectedCategory={(id) => {
          setSelectedCategory(id);
          // Auto-scroll to product grid to focus results
          scrollToRef(productsRef);
        }}
      />

      {/* 4. Display Products Section */}
      <main ref={productsRef} className="flex-1 py-4 sm:py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full scroll-mt-24" id="main-products-view">
        
        {/* Dynamic Section Header depending on active Category */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-rose-100 pb-5 mb-8">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
              <span className="w-2.5 h-6 bg-[#E53935] rounded-full inline-block" />
              {selectedCategory === "all" && "আমাদের প্রিমিয়াম পণ্যসমূহ"}
              {selectedCategory === "clothing" && "ক্যাজুয়াল ও আরামদায়ক পোশাক"}
              {selectedCategory === "electronics" && "স্মার্ট গ্যাজেটস ও ইলেকট্রনিক্স"}
              {selectedCategory === "food" && "১০০% খাঁটি ও সুস্বাদু খাবার সামগ্রী"}
              {selectedCategory === "beauty" && "মেয়েদের রূপচর্চা ও রূপ-সৌন্দর্য সামগ্রী"}
              {selectedCategory === "toys" && "বাচ্চাদের রঙ্গিন ও মজাদার খেলনা"}
              {selectedCategory === "accessories" && "অন্যান্য আকর্ষণীয় লাইফস্টাইল পণ্যসমূহ"}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              সর্বমোট {convertToBanglaNumber(filteredProducts.length)} টি পণ্য খুজে পাওয়া গেছে
            </p>
          </div>

          {/* Active Search indicators inside category header */}
          {(selectedCategory !== "all" || searchQuery.trim()) && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-gray-400 font-medium">অ্যাক্টিভ ফিল্টার:</span>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="inline-flex items-center gap-1.5 text-xs bg-red-50 text-[#E53935] px-3.5 py-1.5 rounded-full border border-red-200 hover:bg-red-100 transition-colors font-bold cursor-pointer"
              >
                রিসেট অল ফিল্টারস
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* The Actual Product Bento-Grid */}
        {filteredProducts.length > 0 ? (
          <div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            id="products-card-grid"
          >
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          /* Empty Search Filter State */
          <div className="py-20 text-center max-w-md mx-auto space-y-5" id="products-empty-state">
            <div className="bg-red-50 text-[#E53935] inline-flex p-6 rounded-full border border-rose-100 shadow-inner">
              <SearchX className="w-12 h-12" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">দুঃখিত, কোনো প্রোডাক্ট পাওয়া যায়নি!</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                আপনার খোঁজা নামের সাথে মিলে যায় এমন প্রোডাক্ট আজকের বাজারে এই মুহূর্তে স্টক আউট或是নেই। দয়া করে ভিন্ন শব্দ ব্যবহার করুন অথবা ফিল্টার পরিবর্তন করুন।
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="bg-[#E53935] hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-md transition-all cursor-pointer"
            >
              সব প্রোডাক্ট দেখুন
            </button>
          </div>
        )}

      </main>

      {/* 5. Drawers / Slides / Overlays */}

      {/* Cart Sidebar Side-Drawer */}
      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setCartOpen(false); // Close cart panel
          setCheckoutOpen(true); // Open payment checkout
        }}
      />

      {/* Place Order Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Quick floating cart button for mobile (only if cart contains items and cart is not already open) */}
      <AnimatePresence>
        {cartCount > 0 && !cartOpen && !checkoutOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setCartOpen(true)}
            className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 bg-[#E53935] text-white p-4.5 rounded-full shadow-2xl z-40 flex items-center justify-center border border-white/20 select-none cursor-pointer hover:bg-black transition-colors"
            id="mobile-floating-cart"
          >
            <ShoppingCart className="w-6.5 h-6.5" />
            <span className="absolute -top-1.5 -right-1 bg-white text-[#E53935] font-black text-xs w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#E53935] shadow-lg">
              {convertToBanglaNumber(cartCount)}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* 6. Footer contacts layout */}
      <Footer onContactRef={contactRef} />

    </div>
  );
}
