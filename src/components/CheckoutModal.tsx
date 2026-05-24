import { useState, FormEvent } from "react";
import { X, CheckCircle, ShieldAlert, Phone, MapPin, User, Tag, ShoppingBag, Landmark } from "lucide-react";
import { CartItem } from "../types";
import { convertToBanglaNumber, formatBanglaPrice } from "../data";
import { motion, AnimatePresence } from "motion/react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderSuccess: () => void; // Clear the state and reset
}

type PaymentMethod = "cod" | "bkash" | "nagad" | "rocket";

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  onOrderSuccess,
}: CheckoutModalProps) {
  // Form fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [division, setDivision] = useState("Dhaka");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  
  // Checkout states
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderId, setOrderId] = useState("");

  const subtotal = cartItems.reduce((acc, item) => {
    const discountedPrice = Math.round(
      item.product.price * (1 - item.product.discountPercentage / 100)
    );
    return acc + discountedPrice * item.quantity;
  }, 0);

  const deliveryCharge = 60; // Flat price
  const totalAmount = subtotal + deliveryCharge;

  // Validate and Submit
  const handleConfirmOrder = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = "আপনার নাম লিখুন";
    }
    if (!phone.trim()) {
      newErrors.phone = "আপনার মোবাইল নম্বরটি লিখুন";
    } else if (!/^\d{11}$/.test(phone.trim())) {
      newErrors.phone = "সঠিক ১১ ডিজিটের মোবাইল নম্বরটি লিখুন (যেমন: ০১৭০০০০০০০০)";
    }
    if (!address.trim()) {
      newErrors.address = "সম্পূর্ণ ডেলিভারি ঠিকানা দিন";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Success! Generate mock Order ID in Bangla, e.g. AB-827461
    const randId = Math.floor(100000 + Math.random() * 900000).toString();
    setOrderId("AB-" + convertToBanglaNumber(randId));
    setOrderCompleted(true);
    setErrors({});
  };

  const handleFinish = () => {
    onOrderSuccess(); // Call app's success callback which resets cart
    setOrderCompleted(false);
    setName("");
    setPhone("");
    setAddress("");
    setPaymentMethod("cod");
    onClose();
  };

  const divisionInBangla = (div: string) => {
    switch (div) {
      case "Dhaka": return "ঢাকা বিভাগ";
      case "Chattogram": return "চট্টগ্রাম বিভাগ";
      case "Rajshahi": return "রাজশাহী বিভাগ";
      case "Khulna": return "খুলনা বিভাগ";
      case "Barishal": return "বরিশাল বিভাগ";
      case "Sylhet": return "সিলেট বিভাগ";
      case "Rangpur": return "রংপুর বিভাগ";
      case "Mymensingh": return "ময়মনসিংহ বিভাগ";
      default: return div;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" id="checkout-modal-root">
          {/* Black shade backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={!orderCompleted ? onClose : undefined}
            className="fixed inset-0 bg-[#1A1A1A]"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative bg-white text-gray-900 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]"
            id="checkout-card"
          >
            {/* Header */}
            <div className="bg-[#E53935] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                <h3 className="font-extrabold text-base sm:text-lg">
                  {orderCompleted ? "অর্ডার সম্পন্ন হয়েছে!" : "আপনার অর্ডার কনফার্ম করুন"}
                </h3>
              </div>
              {!orderCompleted && (
                <button
                  onClick={onClose}
                  className="text-white/80 hover:text-white p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                  id="close-checkout-modal"
                >
                  <X className="w-5.5 h-5.5" />
                </button>
              )}
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-7">
              {!orderCompleted ? (
                /* Checkout details form */
                <form onSubmit={handleConfirmOrder} className="space-y-6" id="checkout-form">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    
                    {/* Left Form Column */}
                    <div className="space-y-4">
                      <h4 className="font-bold text-gray-800 text-sm border-b border-gray-100 pb-2 flex items-center gap-1.5 text-[#E53935]">
                        <User className="w-4 h-4" />
                        শিপিং ও কন্টাক্ট ইনফরমেশন
                      </h4>

                      {/* Name input */}
                      <div className="space-y-1">
                        <label className="block text-xs sm:text-sm font-bold text-gray-700">আপনার নাম: <span className="text-[#E53935]">*</span></label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="যেমন: আমিনুল ইসলাম"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`w-full text-sm bg-gray-50 border rounded-xl pl-10 pr-4 py-2.5 outline-none transition-all ${
                              errors.name ? "border-red-500 bg-red-50 focus:bg-white" : "border-gray-200 focus:border-[#E53935] focus:bg-white focus:ring-2 focus:ring-rose-100"
                            }`}
                          />
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                        </div>
                        {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
                      </div>

                      {/* Phone input */}
                      <div className="space-y-1">
                        <label className="block text-xs sm:text-sm font-bold text-gray-700">মোবাইল নম্বর: <span className="text-[#E53935]">*</span></label>
                        <div className="relative">
                          <input
                            type="tel"
                            maxLength={11}
                            placeholder="যেমন: ০১XXXXXXXXX"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                            className={`w-full text-sm bg-gray-50 border rounded-xl pl-10 pr-4 py-2.5 outline-none transition-all ${
                              errors.phone ? "border-red-500 bg-red-50 focus:bg-white" : "border-gray-200 focus:border-[#E53935] focus:bg-white focus:ring-2 focus:ring-rose-100"
                            }`}
                          />
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                        </div>
                        {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</p>}
                      </div>

                      {/* Division select dropdown */}
                      <div className="space-y-1">
                        <label className="block text-xs sm:text-sm font-bold text-gray-700">বিভাগ সিলেক্ট করুন: <span className="text-[#E53935]">*</span></label>
                        <select
                          value={division}
                          onChange={(e) => setDivision(e.target.value)}
                          className="w-full text-sm bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#E53935] focus:bg-white focus:ring-2 focus:ring-rose-100 transition-all cursor-pointer font-bold"
                        >
                          <option value="Dhaka">ঢাকা (Dhaka)</option>
                          <option value="Chattogram">চট্টগ্রাম (Chattogram)</option>
                          <option value="Rajshahi">রাজশাহী (Rajshahi)</option>
                          <option value="Khulna">খুলনা (Khulna)</option>
                          <option value="Barishal">বরিশাল (Barishal)</option>
                          <option value="Sylhet">সিলেট (Sylhet)</option>
                          <option value="Rangpur">রংপুর (Rangpur)</option>
                          <option value="Mymensingh">ময়মনসিংহ (Mymensingh)</option>
                        </select>
                      </div>

                      {/* Address area */}
                      <div className="space-y-1">
                        <label className="block text-xs sm:text-sm font-bold text-gray-700">ডেলিভারি ঠিকানা: <span className="text-[#E53935]">*</span></label>
                        <div className="relative">
                          <textarea
                            placeholder="যেমন: হাউজ নং- ১২, রোড নং- ৫, মিরপুর- ১০, ঢাকা"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            rows={2}
                            className={`w-full text-sm bg-gray-50 border rounded-xl pl-10 pr-4 py-2.5 outline-none transition-all resize-none ${
                              errors.address ? "border-red-500 bg-red-50 focus:bg-white" : "border-gray-200 focus:border-[#E53935] focus:bg-white focus:ring-2 focus:ring-rose-100"
                            }`}
                          />
                          <MapPin className="absolute left-3.5 top-4 w-4.5 h-4.5 text-gray-400" />
                        </div>
                        {errors.address && <p className="text-red-500 text-xs mt-1 font-medium">{errors.address}</p>}
                      </div>

                    </div>

                    {/* Right Payment and Review Column */}
                    <div className="space-y-5">
                      {/* Payment gateway selection */}
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm border-b border-gray-100 pb-2 flex items-center gap-1.5 text-[#E53935] mb-3">
                          <Landmark className="w-4 h-4" />
                          পেমেন্ট মাধ্যম নির্বাচন করুন
                        </h4>

                        <div className="grid grid-cols-2 gap-2.5" id="payment-gateways">
                          {/* Cash on Delivery */}
                          <button
                            type="button"
                            onClick={() => setPaymentMethod("cod")}
                            className={`p-3 rounded-xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                              paymentMethod === "cod"
                                ? "border-[#E53935] bg-red-50 text-[#E53935] font-extrabold shadow-sm"
                                : "border-gray-200 bg-[#FAFAFA] hover:bg-white"
                            }`}
                          >
                            <span className="text-2xl leading-none">📦</span>
                            <span className="text-xs">ক্যাশ অন ডেলিভারি</span>
                          </button>

                          {/* BKash */}
                          <button
                            type="button"
                            onClick={() => setPaymentMethod("bkash")}
                            className={`p-3 rounded-xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                              paymentMethod === "bkash"
                                ? "border-pink-500 bg-pink-50 text-pink-700 font-extrabold shadow-sm"
                                : "border-gray-200 bg-[#FAFAFA] hover:bg-white"
                            }`}
                          >
                            <span className="text-xs bg-pink-500 text-white font-extrabold px-2 py-0.5 rounded-md leading-none">bKash</span>
                            <span className="text-xs">বিকাশ লাইভ পেমেন্ট</span>
                          </button>

                          {/* Nagad */}
                          <button
                            type="button"
                            onClick={() => setPaymentMethod("nagad")}
                            className={`p-3 rounded-xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                              paymentMethod === "nagad"
                                ? "border-orange-500 bg-orange-50 text-orange-700 font-extrabold shadow-sm"
                                : "border-gray-200 bg-[#FAFAFA] hover:bg-white"
                            }`}
                          >
                            <span className="text-xs bg-orange-500 text-white font-extrabold px-2 py-0.5 rounded-md leading-none">Nagad</span>
                            <span className="text-xs">নগদ ওয়ালেট পেমেন্ট</span>
                          </button>

                          {/* Rocket */}
                          <button
                            type="button"
                            onClick={() => setPaymentMethod("rocket")}
                            className={`p-3 rounded-xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                              paymentMethod === "rocket"
                                ? "border-indigo-600 bg-indigo-50 text-indigo-800 font-extrabold shadow-sm"
                                : "border-gray-200 bg-[#FAFAFA] hover:bg-white"
                            }`}
                          >
                            <span className="text-xs bg-purple-700 text-white font-extrabold px-1.5 py-0.5 rounded-md leading-none">Rocket</span>
                            <span className="text-xs">রকেট মোবাইল পেমেন্ট</span>
                          </button>
                        </div>
                      </div>

                      {/* Brief Bill Sheet */}
                      <div className="bg-gray-50 rounded-2xl p-4.5 border border-gray-100 space-y-2.5 text-xs sm:text-sm">
                        <h5 className="font-bold text-gray-800 border-b border-gray-200 pb-1.5 flex items-center justify-between">
                          <span>অর্ডারের বিবরণ</span>
                          <span className="text-[#E53935]">{convertToBanglaNumber(cartItems.length)}টি আইটেম</span>
                        </h5>
                        <div className="flex items-center justify-between text-gray-500">
                          <span>প্রোডাক্ট সাবটোটাল:</span>
                          <span className="font-semibold">৳{formatBanglaPrice(subtotal)}</span>
                        </div>
                        <div className="flex items-center justify-between text-gray-500">
                          <span>ডেলিভারি চার্জ ({division === "Dhaka" ? "ঢাকার ভেতরে" : "ঢাকার বাইরে"}):</span>
                          <span className="font-medium">৳{formatBanglaPrice(deliveryCharge)}</span>
                        </div>
                        <div className="border-t border-dashed border-gray-200 pt-2 flex items-center justify-between text-gray-900 font-black">
                          <span>আজকের সর্বমোট চার্জ:</span>
                          <span className="text-base text-[#E53935]">৳{formatBanglaPrice(totalAmount)}</span>
                        </div>
                      </div>

                      {/* Guarantee snippet */}
                      <p className="text-[10px] sm:text-xs text-gray-500 bg-amber-50 rounded-xl p-2.5 border border-amber-100 flex items-start gap-1.5 leading-relaxed">
                        <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0" />
                        <span>১০০% নিরাপদ ও সুরক্ষিত সার্ভার। আপনার কোনো কার্ড ইনফরমেশন আমাদের কাছে জমা রাখা থাকে না। নিশ্চিন্তে ক্যাশ অন ডেলিভারিতে অর্ডার দিন।</span>
                      </p>

                    </div>
                  </div>

                  {/* Submission triggers */}
                  <div className="border-t border-gray-100 pt-5 flex items-center justify-end gap-3.5">
                    <button
                      type="button"
                      onClick={onClose}
                      className="text-gray-500 hover:bg-gray-100 font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition-all cursor-pointer"
                    >
                      ফিরে যান
                    </button>
                    <button
                      type="submit"
                      className="bg-[#E53935] hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm px-8 py-3 rounded-xl shadow-md cursor-pointer transition-all transform active:scale-95"
                      id="confirm-checkout-btn"
                    >
                      অর্ডার কনফার্ম করুন
                    </button>
                  </div>
                </form>
              ) : (
                /* Success receipt state */
                <div className="py-8 text-center space-y-6 max-w-md mx-auto" id="order-completed-screen">
                  {/* Glowing success circle animation snippet */}
                  <div className="inline-flex bg-green-50 text-green-500 p-5 rounded-full border border-green-100">
                    <CheckCircle className="w-16 h-16 fill-white" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-2xl font-black text-gray-900">অভিনন্দন! অর্ডার সম্পন্ন হয়েছে!</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      ধন্যবাদ <span className="font-extrabold text-gray-800">{name}</span>! আপনার অর্ডারটি আমরা সফলভাবে পেয়েছি। খুব শীঘ্রই আমাদের একজন কলিং রিপ্রেজেন্টেন্টেটিভ আপনাকে ফোন দিয়ে অর্ডারটি ভেরিফাই করবেন।
                    </p>
                  </div>

                  {/* Receipt brief */}
                  <div className="bg-[#FAFAFA] rounded-2xl p-5 border border-gray-100 space-y-3.5 text-left text-xs sm:text-sm">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                      <span className="font-bold text-gray-500 text-xs sm:text-sm uppercase tracking-wide">অর্ডার আইডি (Order ID):</span>
                      <span className="font-black text-[#E53935] text-sm sm:text-base">{orderId}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-gray-600">
                        <span>ডেলিভারি ঠিকানা:</span>
                        <span className="font-semibold text-gray-800">{divisionInBangla(division)}</span>
                      </div>
                      <p className="text-gray-500 pr-2 block text-xs truncate bg-white rounded-lg p-1.5 border border-gray-50">{address}</p>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>পেমেন্ট মেথড:</span>
                      <span className="font-bold uppercase text-gray-800">
                        {paymentMethod === "cod" && "📦 ক্যাশ অন ডেলিভারি (COD)"}
                        {paymentMethod === "bkash" && "💖 বিকাশ ওয়ালেট"}
                        {paymentMethod === "nagad" && "🧡 নগদ ওয়ালেট"}
                        {paymentMethod === "rocket" && "💜 রকেট পেমেন্ট"}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-900 font-extrabold pt-1.5 border-t border-gray-200">
                      <span>মোট পরিশোধযোগ্য মূল্য:</span>
                      <span className="text-[#E53935]">৳{formatBanglaPrice(totalAmount)}</span>
                    </div>
                  </div>

                  {/* Finish and clear cart */}
                  <button
                    onClick={handleFinish}
                    className="w-full bg-[#E53935] hover:bg-red-700 text-white font-extrabold text-sm py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
                    id="finish-order-btn"
                  >
                    শপিং চালিয়ে যান
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
