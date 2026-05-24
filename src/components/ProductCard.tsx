import { Star, ShoppingCart } from "lucide-react";
import { Product } from "../types";
import { convertToBanglaNumber, formatBanglaPrice } from "../data";
import { motion } from "motion/react";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  key?: string;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { name, price, discountPercentage, image, rating } = product;

  // Calculate discounted price
  const discountedPrice = Math.round(price * (1 - discountPercentage / 100));

  // Render yellow/grey stars
  const renderStars = (ratingVal: number) => {
    return (
      <div className="flex items-center gap-0.5 text-yellow-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${
              star <= ratingVal ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: "0 10px 25px -5px rgba(229, 57, 53, 0.1), 0 8px 10px -6px rgba(229, 57, 53, 0.1)" }}
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col h-full group transition-all"
      id={`product-card-${product.id}`}
    >
      {/* Product Image and Discount Badge container */}
      <div className="relative pt-[100%] overflow-hidden bg-gray-50">
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
          loading="lazy"
        />

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-3 left-3 bg-[#E53935] text-white font-extrabold text-xs sm:text-sm px-2.5 py-1 rounded-lg shadow-md z-10 select-none">
            {discountPercentage}% OFF
          </div>
        )}
      </div>

      {/* Content wrapper */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        
        {/* Name and Stars */}
        <div className="space-y-1.5">
          <span className="text-[10px] uppercase font-bold tracking-wide">
            {product.category === "clothing" && <span className="text-gray-400">Clothing</span>}
            {product.category === "electronics" && <span className="text-gray-400">Electronics</span>}
            {product.category === "food" && <span className="text-gray-400">Food & Groceries</span>}
            {product.category === "beauty" && (
              <span className="text-[#E53935] bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100 inline-flex items-center gap-1 font-sans">
                ✨ Beauty & Cosmetics
              </span>
            )}
            {product.category === "toys" && <span className="text-gray-400">Toys & Games</span>}
            {product.category === "accessories" && <span className="text-gray-400">Accessories</span>}
          </span>
          <h3 className="font-bold text-gray-800 text-sm sm:text-[15px] leading-snug line-clamp-2 h-10 group-hover:text-[#E53935] transition-colors">
            {name}
          </h3>
          <div className="flex items-center justify-between pt-0.5">
            {renderStars(rating)}
            <span className="text-[10px] text-gray-400 font-medium">({rating}/5)</span>
          </div>
        </div>

        {/* Price and Cart Button */}
        <div className="space-y-3 pt-2 border-t border-gray-50">
          <div className="flex items-baseline flex-wrap gap-1.5">
            {/* Discounted Price */}
            <span className="text-base sm:text-lg font-black text-[#E53935]">
              ৳{formatBanglaPrice(discountedPrice)}
            </span>
            {/* Original Price */}
            {discountPercentage > 0 && (
              <span className="text-xs text-gray-400 line-through">
                ৳{formatBanglaPrice(price)}
              </span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="w-full flex items-center justify-center gap-1.5 bg-white text-[#E53935] hover:bg-[#E53935] hover:text-white border-2 border-[#E53935] font-bold text-xs sm:text-sm py-2 px-3 rounded-xl transition-all duration-300 transform active:scale-95 cursor-pointer"
            id={`add-to-cart-btn-${product.id}`}
          >
            <ShoppingCart className="w-4 h-4 shrink-0" />
            Add to Cart
          </button>
        </div>

      </div>
    </motion.div>
  );
}
