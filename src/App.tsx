import { useState, useRef, RefObject } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import ProductCard from "./components/ProductCard";
import CartSidebar from "./components/CartSidebar";
import CheckoutModal from "./components/CheckoutModal";
import Footer from "./components/Footer";
import AdminDashboard from "./components/AdminDashboard";
import { Product, CartItem, Order } from "./types";
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
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Synchronously initialize orders database
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem("ajker_bazar_orders");
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Falback to empty/mock lists below
    }

    const defaultMockOrders: Order[] = [
      {
        id: "AB-729482",
        customerName: "Miraj Hossain",
        phone: "01712345678",
        division: "Dhaka",
        address: "40/A Dhanmondi Lake Circular Road, Dhaka-1209",
        paymentMethod: "bkash",
        items: [
          {
            product: {
              id: "p9_1",
              name: "Korean Vitamin C Glow Booster Moisturizer Cream",
              price: 1350,
              discountPercentage: 15,
              category: "beauty",
              image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80",
              rating: 5,
            },
            quantity: 1
          }
        ],
        subtotal: 1148,
        deliveryCharge: 60,
        totalAmount: 1208,
        status: "Pending",
        date: "05/25/2026, 4:20 PM"
      },
      {
        id: "AB-290481",
        customerName: "Farhana Akter",
        phone: "01998765432",
        division: "Chattogram",
        address: "H-252, O.R. Nizam Road, GEC Circle, Chattogram",
        paymentMethod: "cod",
        items: [
          {
            product: {
              id: "p9_3",
              name: "Silky Soft Long-Lasting Matte Lipstick Set (5 Shades)",
              price: 1150,
              discountPercentage: 25,
              category: "beauty",
              image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80",
              rating: 5,
            },
            quantity: 2
          }
        ],
        subtotal: 1726,
        deliveryCharge: 60,
        totalAmount: 1786,
        status: "Approved",
        date: "05/24/2026, 10:15 AM"
      }
    ];

    try {
      localStorage.setItem("ajker_bazar_orders", JSON.stringify(defaultMockOrders));
    } catch {}
    return defaultMockOrders;
  });

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

  // Clear cart & save order after successful creation
  const handleOrderSuccess = (newOrder: Order) => {
    setOrders((prev) => {
      const updated = [newOrder, ...prev];
      try {
        localStorage.setItem("ajker_bazar_orders", JSON.stringify(updated));
      } catch (err) {
        console.error("Failed to save order", err);
      }
      return updated;
    });
    // Reset cart locally
    mutateCartState(() => []);
  };

  // Admin operational actions
  const handleUpdateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders((prev) => {
      const updated = prev.map((o) => o.id === orderId ? { ...o, status } : o);
      try {
        localStorage.setItem("ajker_bazar_orders", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrders((prev) => {
      const updated = prev.filter((o) => o.id !== orderId);
      try {
        localStorage.setItem("ajker_bazar_orders", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleClearAllOrders = () => {
    setOrders([]);
    try {
      localStorage.removeItem("ajker_bazar_orders");
    } catch {}
  };

  const handleAddSimulatedOrder = () => {
    const randomProduct = sampleProducts[Math.floor(Math.random() * sampleProducts.length)];
    const randId = Math.floor(100000 + Math.random() * 900000).toString();
    
    const buyers = [
      { name: "Kazi Habibur Rahman", phone: "01715124151", address: "3/12 Razia Sultana Road, Mohammadpur, Dhaka", division: "Dhaka" },
      { name: "Tasnova Sultana", phone: "01811223344", address: "Sobhanbag Residential Area, Sylhet", division: "Sylhet" },
      { name: "Moinul Islam Sajal", phone: "01988776655", address: "Mahapal Lane, Kotwali, Rangpur", division: "Rangpur" },
      { name: "Nabila Tabassum", phone: "01533444555", address: "Nirala Housing Avenue, Khulna", division: "Khulna" }
    ];
    
    const buyer = buyers[Math.floor(Math.random() * buyers.length)];
    const paymentMethods: ("cod" | "bkash" | "nagad" | "rocket")[] = ["cod", "bkash", "nagad", "rocket"];
    const payment = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
    
    const discountedPrice = Math.round(
      randomProduct.price * (1 - randomProduct.discountPercentage / 100)
    );
    
    const simOrder: Order = {
      id: "AB-" + randId,
      customerName: buyer.name,
      phone: buyer.phone,
      division: buyer.division,
      address: buyer.address,
      paymentMethod: payment,
      items: [
        { product: randomProduct, quantity: 1 }
      ],
      subtotal: discountedPrice,
      deliveryCharge: 60,
      totalAmount: discountedPrice + 60,
      status: "Pending",
      date: new Date().toLocaleString("en-US", { hour12: true })
    };

    setOrders((prev) => {
      const updated = [simOrder, ...prev];
      try {
        localStorage.setItem("ajker_bazar_orders", JSON.stringify(updated));
      } catch {}
      return updated;
    });
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
        isAdminMode={isAdminMode}
        setIsAdminMode={setIsAdminMode}
      />

      {isAdminMode ? (
        <AdminDashboard
          orders={orders}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onDeleteOrder={handleDeleteOrder}
          onClearAllOrders={handleClearAllOrders}
          onAddSimulatedOrder={handleAddSimulatedOrder}
          onClose={() => setIsAdminMode(false)}
        />
      ) : (
        <>
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
                  {selectedCategory === "all" && "Our Premium Products"}
                  {selectedCategory === "clothing" && "Casual & Comfortable Apparel"}
                  {selectedCategory === "electronics" && "Smart Gadgets & Electronics"}
                  {selectedCategory === "food" && "100% Pure & Delicious Foods"}
                  {selectedCategory === "beauty" && "Girls' Cosmetics & Personal Beauty"}
                  {selectedCategory === "toys" && "Kids' Colorful & Fun Toys"}
                  {selectedCategory === "accessories" && "Other Attractive Lifestyle Products"}
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">
                  Total {filteredProducts.length} items found
                </p>
              </div>

              {/* Active Search indicators inside category header */}
              {(selectedCategory !== "all" || searchQuery.trim()) && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-gray-400 font-medium">Active Filter:</span>
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setSearchQuery("");
                    }}
                    className="inline-flex items-center gap-1.5 text-xs bg-red-50 text-[#E53935] px-3.5 py-1.5 rounded-full border border-red-200 hover:bg-red-100 transition-colors font-bold cursor-pointer"
                  >
                    Reset All Filters
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
                  <h3 className="text-xl font-bold text-gray-900">Sorry, no products found!</h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    We couldn't find any products matching your search term. Please try different keywords or reset filters to explore our full collections.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchQuery("");
                  }}
                  className="bg-[#E53935] hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-md transition-all cursor-pointer"
                >
                  View All Products
                </button>
              </div>
            )}

          </main>
        </>
      )}

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
              {cartCount}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* 6. Footer contacts layout */}
      <Footer onContactRef={contactRef} />

    </div>
  );
}
