export interface Product {
  id: string;
  name: string;
  price: number;
  discountPercentage: number; // e.g. 20 for 20%
  category: string;
  image: string;
  rating: number; // 1-5 stars
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  iconName: string; // To load appropriate LucideReact icon
}

export interface Order {
  id: string; // e.g., "AB-827461"
  customerName: string;
  phone: string;
  division: string;
  address: string;
  paymentMethod: "cod" | "bkash" | "nagad" | "rocket";
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  totalAmount: number;
  status: "Pending" | "Approved" | "Shipped" | "Delivered" | "Cancelled";
  date: string;
  trxId?: string;
}

