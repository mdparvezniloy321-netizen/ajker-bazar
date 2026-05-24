import { Product, Category } from "./types";

// Categories in Bangla with appropriate Lucide Icon strings
export const categories: Category[] = [
  { id: "all", name: "সব পণ্য", iconName: "LayoutGrid" },
  { id: "clothing", name: "পোশাক", iconName: "Shirt" },
  { id: "electronics", name: "ইলেকট্রনিক্স", iconName: "Smartphone" },
  { id: "food", name: "খাবার", iconName: "Flame" },
  { id: "beauty", name: "মেয়েদের রূপচর্চা ও সৌন্দর্য", iconName: "Sparkles" },
  { id: "toys", name: "খেলনা", iconName: "Gamepad" },
  { id: "accessories", name: "আরও", iconName: "Tv" },
];

// 12 curated products in Bangla with high-quality unsplash images
export const sampleProducts: Product[] = [
  {
    id: "p1",
    name: "প্রিমিয়াম উলের হুডি (পিওর ব্ল্যাক)",
    price: 1550,
    discountPercentage: 20,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80",
    rating: 5,
  },
  {
    id: "p2",
    name: "ক্ল্যাসিক কটন স্লিম-ফিট ক্যাজুয়াল শার্ট",
    price: 1200,
    discountPercentage: 15,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80",
    rating: 4,
  },
  {
    id: "p3",
    name: "মেটাল ফ্রেম প্রিমিয়াম হুডি জ্যাকেট",
    price: 2400,
    discountPercentage: 25,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
    rating: 4,
  },
  {
    id: "p4",
    name: "স্মার্ট ফিটনেস ট্র্যাকার ও হার্ট স্পোর্টস ব্যান্ড",
    price: 2800,
    discountPercentage: 10,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=600&q=80",
    rating: 5,
  },
  {
    id: "p5",
    name: "নয়েজ ক্যান্সেলেশন ওয়্যারলেস স্টুডিও হেডফোন",
    price: 3500,
    discountPercentage: 30,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    rating: 4,
  },
  {
    id: "p6",
    name: "আল্ট্রা-ডিফিনিশন ওয়্যারলেস মিনি ব্লুটুথ স্পিকার",
    price: 1850,
    discountPercentage: 18,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80",
    rating: 4,
  },
  {
    id: "p7",
    name: "প্রিমিয়াম ক্রাঞ্চি মিক্সড ড্রাই ফ্রুটস অ্যান্ড নাটস",
    price: 950,
    discountPercentage: 8,
    category: "food",
    image: "https://images.unsplash.com/photo-1596560548464-f040c5da364d?auto=format&fit=crop&w=600&q=80",
    rating: 5,
  },
  {
    id: "p8",
    name: "১০০% খাঁটি সুন্দরবনের প্রাকৃতিক চাকের মধু",
    price: 1100,
    discountPercentage: 12,
    category: "food",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80",
    rating: 5,
  },
  {
    id: "p9",
    name: "অর্গানিক কোরিয়ান গ্লো ফেস ফেসিয়াল সিরাম",
    price: 1450,
    discountPercentage: 20,
    category: "beauty",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
    rating: 4,
  },
  {
    id: "p9_1",
    name: "কোরিয়ান ভিটামিন সি গ্লো বুস্টার ময়েশ্চারাইজার ক্রিম",
    price: 1350,
    discountPercentage: 15,
    category: "beauty",
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80",
    rating: 5,
  },
  {
    id: "p9_2",
    name: "পন্ডস ব্রাইট বিউটি ওভাল স্পটলেস স্পট রিমুভাল ক্রিম",
    price: 490,
    discountPercentage: 10,
    category: "beauty",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
    rating: 4,
  },
  {
    id: "p9_3",
    name: "সিল্কি সফট লং-লাস্টিং ম্যাট লিপস্টিক সেট (৫টি রোমান্টিক শেড)",
    price: 1150,
    discountPercentage: 25,
    category: "beauty",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80",
    rating: 5,
  },
  {
    id: "p9_4",
    name: " গর্জিয়াস অল-ইন-ওয়ান গোল্ডেন গ্লো মেকআপ কিট অ্যান্ড আইশ্যাডো বক্স",
    price: 2450,
    discountPercentage: 18,
    category: "beauty",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80",
    rating: 5,
  },
  {
    id: "p9_5",
    name: "মেয়েদের প্রিমিয়াম সিল্ক গর্জিয়াস এমব্রয়ডারি ডিজিটাল প্রিন্ট শাড়ি",
    price: 3600,
    discountPercentage: 15,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
    rating: 5,
  },
  {
    id: "p9_6",
    name: "ডিজাইনার জর্জেট পার্টি থ্রি-পিস লং কুর্তি স্যালওয়ার স্যুট",
    price: 2850,
    discountPercentage: 20,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80",
    rating: 4,
  },
  {
    id: "p10",
    name: "ন্যাচারাল সুদিং অ্যালোভেরা ময়শ্চারাইজিং জেল",
    price: 490,
    discountPercentage: 10,
    category: "beauty",
    image: "https://images.unsplash.com/photo-1563172771-143576c0eb9a?auto=format&fit=crop&w=600&q=80",
    rating: 4,
  },
  {
    id: "p11",
    name: "বাচ্চাদের ইন্টারেক্টিভ রিমোট কন্ট্রোল স্পোর্টস কার",
    price: 2100,
    discountPercentage: 15,
    category: "toys",
    image: "https://images.unsplash.com/photo-1532330393533-443990a51d10?auto=format&fit=crop&w=600&q=80",
    rating: 5,
  },
  {
    id: "p12",
    name: "রঙ্গিন জ্যামিতিক কাঠের ব্লক পাজল সেট",
    price: 750,
    discountPercentage: 10,
    category: "toys",
    image: "https://images.unsplash.com/photo-1515488042361-404e9250afef?auto=format&fit=crop&w=600&q=80",
    rating: 4,
  },
  {
    id: "p13",
    name: "বাইকার স্পেশাল ট্রাভেল ওয়াটারপ্রুফ ডাফেল ব্যাকপ্যাক",
    price: 2600,
    discountPercentage: 15,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    rating: 5,
  },
  {
    id: "p14",
    name: "প্রিমিয়াম রিয়েল লেদার ক্যাজুয়াল বাইফোল্ড ওয়ালেট",
    price: 1350,
    discountPercentage: 20,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80",
    rating: 4,
  }
];

// Helper to convert standard numbers (including floats or formatted strings) into beautiful Bangla numerals
export function convertToBanglaNumber(num: number | string): string {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  const numStr = num.toString();
  let result = "";
  for (let i = 0; i < numStr.length; i++) {
    const char = numStr[i];
    if (char >= "0" && char <= "9") {
      result += banglaDigits[parseInt(char, 10)];
    } else if (char === ".") {
      result += ".";
    } else {
      result += char;
    }
  }
  return result;
}

// Format prices nicely with comma separation, e.g. 15,500 -> ১৫,৫০০
export function formatBanglaPrice(price: number): string {
  const formatted = Math.round(price).toLocaleString("en-US");
  return convertToBanglaNumber(formatted);
}
