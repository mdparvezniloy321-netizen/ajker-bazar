import { useState, FormEvent } from "react";
import { X, CheckCircle, ShieldAlert, Phone, MapPin, User, Tag, ShoppingBag, Landmark } from "lucide-react";
import { CartItem, Order } from "../types";
import { convertToBanglaNumber, formatBanglaPrice } from "../data";
import { motion, AnimatePresence } from "motion/react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderSuccess: (order: Order) => void; // Pass constructed order details back
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
  const [trxId, setTrxId] = useState("");
  const [copiedNumber, setCopiedNumber] = useState(false);
  
  // Checkout states
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

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
      newErrors.name = "Please enter your name";
    }
    if (!phone.trim()) {
      newErrors.phone = "Please enter your mobile number";
    } else if (!/^\d{11}$/.test(phone.trim())) {
      newErrors.phone = "Please enter a valid 11-digit phone number (e.g., 01700000000)";
    }
    if (!address.trim()) {
      newErrors.address = "Please enter your complete delivery address";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Success! Generate mock Order ID, e.g. AB-827461
    const randId = Math.floor(100000 + Math.random() * 900000).toString();
    setOrderId("AB-" + randId);
    
    // Construct real order model
    const newOrder: Order = {
      id: "AB-" + randId,
      customerName: name,
      phone: phone,
      division: division,
      address: address,
      paymentMethod: paymentMethod,
      items: [...cartItems],
      subtotal: subtotal,
      deliveryCharge: deliveryCharge,
      totalAmount: totalAmount,
      status: "Pending",
      date: new Date().toLocaleString("en-US", { hour12: true }),
      trxId: paymentMethod !== "cod" ? trxId : undefined
    };
    
    setCreatedOrder(newOrder);
    setOrderCompleted(true);
    setErrors({});
  };

  const handleFinish = () => {
    if (createdOrder) {
      onOrderSuccess(createdOrder);
    }
    setOrderCompleted(false);
    setName("");
    setPhone("");
    setAddress("");
    setPaymentMethod("cod");
    setTrxId("");
    setCreatedOrder(null);
    onClose();
  };

  const getDivisionName = (div: string) => {
    switch (div) {
      case "Dhaka": return "Dhaka Division";
      case "Chattogram": return "Chattogram Division";
      case "Rajshahi": return "Rajshahi Division";
      case "Khulna": return "Khulna Division";
      case "Barishal": return "Barishal Division";
      case "Sylhet": return "Sylhet Division";
      case "Rangpur": return "Rangpur Division";
      case "Mymensingh": return "Mymensingh Division";
      default: return div + " Division";
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
                  {orderCompleted ? "Order Placed Successfully!" : "Confirm Your Order"}
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
                        Shipping & Contact Information
                      </h4>

                      {/* Name input */}
                      <div className="space-y-1">
                        <label className="block text-xs sm:text-sm font-bold text-gray-700">Your Name: <span className="text-[#E53935]">*</span></label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="e.g., Aminul Islam"
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
                        <label className="block text-xs sm:text-sm font-bold text-gray-700">Mobile Number: <span className="text-[#E53935]">*</span></label>
                        <div className="relative">
                          <input
                            type="tel"
                            maxLength={11}
                            placeholder="e.g., 017xxxxxxxx"
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
                        <label className="block text-xs sm:text-sm font-bold text-gray-700">Select Division: <span className="text-[#E53935]">*</span></label>
                        <select
                          value={division}
                          onChange={(e) => setDivision(e.target.value)}
                          className="w-full text-sm bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#E53935] focus:bg-white focus:ring-2 focus:ring-rose-100 transition-all cursor-pointer font-bold"
                        >
                          <option value="Dhaka">Dhaka</option>
                          <option value="Chattogram">Chattogram</option>
                          <option value="Rajshahi">Rajshahi</option>
                          <option value="Khulna">Khulna</option>
                          <option value="Barishal">Barishal</option>
                          <option value="Sylhet">Sylhet</option>
                          <option value="Rangpur">Rangpur</option>
                          <option value="Mymensingh">Mymensingh</option>
                        </select>
                      </div>

                      {/* Address area */}
                      <div className="space-y-1">
                        <label className="block text-xs sm:text-sm font-bold text-gray-700">Delivery Address: <span className="text-[#E53935]">*</span></label>
                        <div className="relative">
                          <textarea
                            placeholder="e.g., House 12, Road 5, Mirpur 10, Dhaka"
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
                          Select Payment Method
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
                            <span className="text-xs">Cash on Delivery</span>
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
                            <span className="text-xs">bKash Payment</span>
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
                            <span className="text-xs">Nagad Payment</span>
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
                            <span className="text-xs">Rocket Payment</span>
                          </button>
                        </div>

                        {paymentMethod !== "cod" && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 p-4 bg-gradient-to-br from-rose-50/50 to-pink-50 border border-pink-100 rounded-2xl space-y-3.5 text-xs text-left"
                            id="mfs-instructions-alert"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5 font-bold text-gray-800">
                                <span className="text-sm">⚡</span>
                                <span>
                                  Pay via {paymentMethod === "bkash" && "bKash"}
                                  {paymentMethod === "nagad" && "Nagad"}
                                  {paymentMethod === "rocket" && "Rocket"} Personal
                                </span>
                              </div>
                              <span className="bg-[#E53935] text-white text-[10px] font-black px-2 py-0.5 rounded-full select-none uppercase tracking-wider">
                                Send Money
                              </span>
                            </div>

                            <p className="text-gray-700 font-semibold leading-relaxed">
                              Send a total of <span className="font-sans font-black text-[#E53935] underline">৳{formatBanglaPrice(totalAmount)}</span> to our personal details receiver number below:
                            </p>

                            <div className="bg-white border border-rose-200/50 rounded-xl p-2.5 flex items-center justify-between">
                              <div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase">Receiver Number:</p>
                                <p className="font-mono text-sm sm:text-base font-black text-gray-950 tracking-wide select-all">01823848660</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  navigator.clipboard.writeText("01823848660");
                                  setCopiedNumber(true);
                                  setTimeout(() => setCopiedNumber(false), 2500);
                                }}
                                className="bg-rose-50 text-rose-600 hover:bg-[#E53935] hover:text-white px-3 py-2 rounded-lg border border-rose-100 font-extrabold text-[10px] transition-all cursor-pointer flex items-center gap-1 shrink-0"
                              >
                                {copiedNumber ? (
                                  <span className="text-green-600 font-bold">✓ Copied!</span>
                                ) : (
                                  <><span>📋</span> Copy Number</>
                                )}
                              </button>
                            </div>

                            <div className="space-y-1.5 pt-1">
                              <label className="block text-[11px] font-black text-gray-700">Enter payment Transaction ID (TrxID) after sending money: (Optional)</label>
                              <input
                                type="text"
                                placeholder="e.g. 8X9Y7Z6W"
                                value={trxId}
                                onChange={(e) => setTrxId(e.target.value.trim().toUpperCase())}
                                className="w-full text-xs font-mono font-bold uppercase bg-white border border-gray-300 rounded-xl px-3 py-2.5 outline-none focus:border-[#E53935] transition-all shadow-inner placeholder:text-gray-300 placeholder:normal-case"
                              />
                            </div>
                          </motion.div>
                        )}
                      </div>

                      {/* Brief Bill Sheet */}
                      <div className="bg-gray-50 rounded-2xl p-4.5 border border-gray-100 space-y-2.5 text-xs sm:text-sm">
                        <h5 className="font-bold text-gray-800 border-b border-gray-200 pb-1.5 flex items-center justify-between">
                          <span>Order Details</span>
                          <span className="text-[#E53935]">{cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}</span>
                        </h5>
                        <div className="flex items-center justify-between text-gray-500">
                          <span>Product Subtotal:</span>
                          <span className="font-semibold">৳{formatBanglaPrice(subtotal)}</span>
                        </div>
                        <div className="flex items-center justify-between text-gray-500">
                          <span>Delivery Charge ({division === "Dhaka" ? "Inside Dhaka" : "Outside Dhaka"}):</span>
                          <span className="font-medium">৳{formatBanglaPrice(deliveryCharge)}</span>
                        </div>
                        <div className="border-t border-dashed border-gray-200 pt-2 flex items-center justify-between text-gray-900 font-black">
                          <span>Grand Total Payable:</span>
                          <span className="text-base text-[#E53935]">৳{formatBanglaPrice(totalAmount)}</span>
                        </div>
                      </div>

                      {/* Guarantee snippet */}
                      <p className="text-[10px] sm:text-xs text-gray-500 bg-amber-50 rounded-xl p-2.5 border border-amber-100 flex items-start gap-1.5 leading-relaxed">
                        <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0" />
                        <span>100% safe & secure checkout. We do not store any card details. Order hassle-free with fallback Cash on Delivery.</span>
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
                      Go Back
                    </button>
                    <button
                      type="submit"
                      className="bg-[#E53935] hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm px-8 py-3 rounded-xl shadow-md cursor-pointer transition-all transform active:scale-95"
                      id="confirm-checkout-btn"
                    >
                      Confirm Order
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
                    <h4 className="text-2xl font-black text-gray-900">Congratulations! Order Placed!</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Thank you <span className="font-extrabold text-gray-800">{name}</span>! We have successfully received your order. One of our support representatives will call you shortly to verify your order.
                    </p>
                  </div>

                  {/* Receipt brief */}
                  <div className="bg-[#FAFAFA] rounded-2xl p-5 border border-gray-100 space-y-3.5 text-left text-xs sm:text-sm">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                      <span className="font-bold text-gray-500 text-xs sm:text-sm uppercase tracking-wide">Order ID:</span>
                      <span className="font-black text-[#E53935] text-sm sm:text-base">{orderId}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-gray-600">
                        <span>Delivery Info:</span>
                        <span className="font-semibold text-gray-800">{getDivisionName(division)}</span>
                      </div>
                      <p className="text-gray-500 pr-2 block text-xs truncate bg-white rounded-lg p-1.5 border border-gray-50">{address}</p>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Payment Method:</span>
                      <span className="font-bold uppercase text-gray-800">
                        {paymentMethod === "cod" && "📦 Cash on Delivery (COD)"}
                        {paymentMethod === "bkash" && "💖 bKash Personal"}
                        {paymentMethod === "nagad" && "🧡 Nagad Personal"}
                        {paymentMethod === "rocket" && "💜 Rocket Personal"}
                      </span>
                    </div>
                    {paymentMethod !== "cod" && trxId && (
                      <div className="flex justify-between text-gray-600">
                        <span>Transaction ID (TrxID):</span>
                        <span className="font-mono font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">{trxId}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-gray-900 font-extrabold pt-1.5 border-t border-gray-200">
                      <span>Grand Total:</span>
                      <span className="text-[#E53935]">৳{formatBanglaPrice(totalAmount)}</span>
                    </div>
                  </div>

                  {/* Finish and clear cart */}
                  <button
                    onClick={handleFinish}
                    className="w-full bg-[#E53935] hover:bg-red-700 text-white font-extrabold text-sm py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
                    id="finish-order-btn"
                  >
                    Continue Shopping
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
