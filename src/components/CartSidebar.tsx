import { X, Plus, Minus, Trash2, ShoppingBasket } from "lucide-react";
import { CartItem } from "../types";
import { convertToBanglaNumber, formatBanglaPrice } from "../data";
import { motion, AnimatePresence } from "motion/react";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, action: "plus" | "minus") => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export default function CartSidebar({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartSidebarProps) {
  // Calculate pricing
  const subtotal = cartItems.reduce((acc, item) => {
    const discountedPrice = Math.round(
      item.product.price * (1 - item.product.discountPercentage / 100)
    );
    return acc + discountedPrice * item.quantity;
  }, 0);

  const totalOriginal = cartItems.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  const discountSavings = totalOriginal - subtotal;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Glass Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40 cursor-pointer"
            id="cart-overlay"
          />

          {/* Slide-in sidebar panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col border-l border-rose-50"
            id="cart-sidebar"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-red-50/50">
              <div className="flex items-center gap-2">
                <ShoppingBasket className="w-5 h-5 text-[#E53935]" />
                <h2 className="text-lg sm:text-xl font-black text-gray-800">Your Shopping Bag</h2>
                <span className="bg-[#E53935] text-white text-xs font-bold px-2.5 py-0.5 rounded-full ml-1">
                  {cartItems.length}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-red-50 hover:text-[#E53935] rounded-full text-gray-400 transition-colors cursor-pointer"
                aria-label="Close"
                id="close-cart-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Items Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" id="cart-items-container">
              {cartItems.length === 0 ? (
                /* Empty Cart State */
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 h-full" id="empty-cart-state">
                  <div className="bg-red-50 p-6 rounded-full text-[#E53935] inline-flex">
                    <ShoppingBasket className="w-14 h-14" />
                  </div>
                  <div className="space-y-1.5 max-w-xs">
                    <p className="text-lg font-bold text-gray-900">Your bag is empty!</p>
                    <p className="text-xs sm:text-sm text-gray-500">There are no products in your shopping bag. Choose from our outstanding collection of premium goods.</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="bg-[#E53935] text-white hover:bg-red-700 font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-md transition-all cursor-pointer"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                /* Listed Cart Items */
                cartItems.map((item) => {
                  const discountedPrice = Math.round(
                    item.product.price * (1 - item.product.discountPercentage / 100)
                  );
                  return (
                    <motion.div
                      layout
                      key={item.product.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3 bg-[#FAFAFA] border border-gray-100 p-3 rounded-2xl relative group"
                    >
                      {/* Product Snippet Graphic */}
                      <div className="w-20 h-20 bg-white rounded-lg border border-gray-100 overflow-hidden shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info & Math */}
                      <div className="flex-1 flex flex-col justify-between min-w-0 py-0.5">
                        <div className="space-y-1 pr-4">
                          <h4 className="font-bold text-gray-800 text-xs sm:text-sm leading-tight truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-xs text-gray-400 font-medium">Category: {
                            item.product.category === "clothing" ? "Clothing" :
                            item.product.category === "electronics" ? "Electronics" :
                            item.product.category === "food" ? "Food & Groceries" :
                            item.product.category === "beauty" ? "Beauty & Cosmetics" :
                            item.product.category === "toys" ? "Toys & Games" : "Accessories"
                          }</p>
                        </div>

                        <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
                          {/* Price */}
                          <div className="flex items-baseline gap-1">
                            <span className="text-sm font-bold text-[#E53935]">
                              ৳{formatBanglaPrice(discountedPrice)}
                            </span>
                            {item.product.discountPercentage > 0 && (
                              <span className="text-[10px] text-gray-400 line-through">
                                ৳{formatBanglaPrice(item.product.price)}
                              </span>
                            )}
                          </div>

                          {/* Up/Down quantity selector */}
                          <div className="flex items-center border border-gray-200 bg-white rounded-lg overflow-hidden shrink-0">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, "minus")}
                              className="p-1 sm:p-1.5 hover:bg-red-50 hover:text-[#E53935] transition-colors cursor-pointer"
                              aria-label="Decrease Quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-bold text-xs px-2.5 text-gray-800 text-center min-w-6">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, "plus")}
                              className="p-1 sm:p-1.5 hover:bg-red-50 hover:text-[#E53935] transition-colors cursor-pointer"
                              aria-label="Increase Quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Remove Trash Bin Button */}
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="absolute top-2.5 right-2.5 text-gray-400 hover:text-[#E53935] p-1 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
                        aria-label="Remove Item"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Bottom pricing sheet & Place Order Form CTA */}
            {cartItems.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-gray-100 space-y-4 bg-gray-50/50">
                <div className="space-y-2 text-sm">
                  {/* Raw Price */}
                  <div className="flex items-center justify-between text-gray-500">
                    <span>Original Price</span>
                    <span className="font-semibold">৳{formatBanglaPrice(totalOriginal)}</span>
                  </div>

                  {/* Savings */}
                  {discountSavings > 0 && (
                    <div className="flex items-center justify-between text-green-600 font-medium">
                      <span>Discount (Savings)</span>
                      <span>-৳{formatBanglaPrice(discountSavings)}</span>
                    </div>
                  )}

                  {/* Delivery Charges (Flat 60 Taka for Bangladesh) */}
                  <div className="flex items-center justify-between text-gray-500">
                    <span>Delivery Charge</span>
                    <span className="font-medium">৳{formatBanglaPrice(60)}</span>
                  </div>

                  <hr className="border-dashed border-gray-200 my-1.5" />

                  {/* Grand total */}
                  <div className="flex items-center justify-between text-base font-black text-gray-900">
                    <span>Grand Total</span>
                    <span className="text-[#E53935] text-[19px]">
                      ৳{formatBanglaPrice(subtotal + 60)}
                    </span>
                  </div>
                </div>

                {/* Place Order Checkout Drawer Trigger */}
                <button
                  onClick={onCheckout}
                  className="w-full bg-[#E53935] hover:bg-red-700 text-white font-extrabold text-sm sm:text-base py-3.5 sm:py-4 rounded-2xl shadow-lg hover:shadow-red-200 transition-all cursor-pointer flex items-center justify-center gap-2 transform active:scale-98"
                  id="checkout-cta-btn"
                >
                  Place Order (Checkout)
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
