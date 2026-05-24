import { LayoutGrid, Shirt, Smartphone, Flame, Sparkles, Gamepad, Tv } from "lucide-react";
import { categories } from "../data";
import { Category } from "../types";
import { motion } from "motion/react";

interface CategoriesProps {
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
}

// Icon mapper helper
function getCategoryIcon(iconName: string, className: string) {
  switch (iconName) {
    case "LayoutGrid":
      return <LayoutGrid className={className} />;
    case "Shirt":
      return <Shirt className={className} />;
    case "Smartphone":
      return <Smartphone className={className} />;
    case "Flame":
      return <Flame className={className} />;
    case "Sparkles":
      return <Sparkles className={className} />;
    case "Gamepad":
      return <Gamepad className={className} />;
    case "Tv":
      return <Tv className={className} />;
    default:
      return <LayoutGrid className={className} />;
  }
}

export default function Categories({ selectedCategory, setSelectedCategory }: CategoriesProps) {
  return (
    <section className="py-10 bg-white" id="categories-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-8">
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#E53935] uppercase bg-red-50 px-3.5 py-1.5 rounded-full border border-red-100">
            Departments
          </span>
          <h2 className="text-2xl sm:text-3.5xl font-black text-gray-900 mt-3 tracking-tight">
            Choose From Our Popular Categories
          </h2>
          <div className="h-1.5 w-18 bg-[#E53935] mx-auto rounded-full mt-3" />
        </div>

        {/* Carousel/Flex list of tiles */}
        <div 
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-5"
          id="category-tiles-container"
        >
          {categories.map((cat: Category) => {
            const isActive = selectedCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-2.5 sm:gap-3 px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base font-bold transition-all border shadow-sm cursor-pointer select-none ${
                  isActive
                    ? "bg-[#E53935] border-[#E53935] text-white shadow-md shadow-red-200"
                    : "bg-[#FAFAFA] border-gray-100 text-gray-700 hover:bg-white hover:border-[#E53935] hover:text-[#E53935]"
                }`}
                aria-label={cat.name}
              >
                {getCategoryIcon(
                  cat.iconName, 
                  `w-5 h-5 sm:w-5.5 sm:h-5.5 transition-transform ${isActive ? "text-white" : "text-[#E53935]"}`
                )}
                <span>{cat.name}</span>
              </motion.button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
