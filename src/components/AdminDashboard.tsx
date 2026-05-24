import { useState, useMemo } from "react";
import { 
  TrendingUp, 
  Coins, 
  Package, 
  Clock, 
  CheckCircle, 
  Truck, 
  XSquare, 
  Search, 
  Bell, 
  Sparkles, 
  Phone, 
  MapPin, 
  Trash2, 
  User, 
  CreditCard, 
  FolderHeart, 
  Check, 
  Play, 
  Ban, 
  ArrowLeft,
  X,
  AlertCircle,
  Copy,
  PlusCircle,
  ShoppingBag
} from "lucide-react";
import { Order, Product } from "../types";
import { convertToBanglaNumber, formatBanglaPrice, sampleProducts } from "../data";
import { motion, AnimatePresence } from "motion/react";

interface AdminDashboardProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: Order["status"]) => void;
  onDeleteOrder: (orderId: string) => void;
  onClearAllOrders: () => void;
  onAddSimulatedOrder: () => void;
  onClose: () => void;
}

export default function AdminDashboard({
  orders,
  onUpdateOrderStatus,
  onDeleteOrder,
  onClearAllOrders,
  onAddSimulatedOrder,
  onClose
}: AdminDashboardProps) {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [notificationCount, setNotificationCount] = useState<number>(() => {
    // New pending orders act as fresh notifications
    return orders.filter(o => o.status === "Pending").length;
  });

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Division translation
  const getDivisionLabel = (div: string) => {
    switch (div) {
      case "Dhaka": return "Dhaka Division";
      case "Chattogram": return "Chattogram Division";
      case "Rajshahi": return "Rajshahi Division";
      case "Khulna": return "Khulna Division";
      case "Barishal": return "Barishal Division";
      case "Sylhet": return "Sylhet Division";
      case "Rangpur": return "Rangpur Division";
      case "Mymensingh": return "Mymensingh Division";
      default: return div;
    }
  };

  // Payment method label
  const renderPaymentMethod = (method: string) => {
    switch (method) {
      case "cod": return { label: "Cash on Delivery (COD)", color: "bg-gray-100 text-gray-800" };
      case "bkash": return { label: "bKash wallet", color: "bg-pink-100 text-pink-700" };
      case "nagad": return { label: "Nagad wallet", color: "bg-orange-100 text-orange-700 font-bold" };
      case "rocket": return { label: "Rocket wallet", color: "bg-purple-100 text-purple-700" };
      default: return { label: method, color: "bg-gray-100 text-gray-800" };
    }
  };

  // Order filtration logic
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const statusMatched = statusFilter === "all" || order.status === statusFilter;
      const searchMatched = !searchQuery.trim() || 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.phone.includes(searchQuery);
      return statusMatched && searchMatched;
    }).sort((a,b) => b.id.localeCompare(a.id)); // Newest orders first
  }, [orders, statusFilter, searchQuery]);

  // Derive stats
  const stats = useMemo(() => {
    let sales = 0;
    let pending = 0;
    let approved = 0;
    let shipped = 0;
    let delivered = 0;
    let cancelled = 0;

    orders.forEach(o => {
      if (o.status !== "Cancelled") {
        sales += o.totalAmount;
      }
      if (o.status === "Pending") pending++;
      else if (o.status === "Approved") approved++;
      else if (o.status === "Shipped") shipped++;
      else if (o.status === "Delivered") delivered++;
      else if (o.status === "Cancelled") cancelled++;
    });

    return { sales, pending, approved, shipped, delivered, cancelled, total: orders.length };
  }, [orders]);

  return (
    <div className="bg-[#FAF9F9] min-h-screen py-6 sm:py-10 px-4 sm:px-6 lg:px-8 font-sans text-gray-800" id="admin-dashboard-container">
      {/* Upper Context Header */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs font-bold bg-white hover:bg-rose-50 text-[#E53935] px-4 py-2.5 rounded-full border border-gray-200 transition-colors shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Customer View
          </button>
          <div className="h-6 w-px bg-gray-200 hidden md:block" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-2 font-sans">
              Ajker Bazar <span className="bg-[#E53935] text-white text-xs px-3 py-1 rounded-full uppercase font-mono tracking-wider ml-1">ADMIN CONTROL</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">Dashboard - Sales Tracker & Order Processing Hub</p>
          </div>
        </div>

        {/* Admin interactive controls */}
        <div className="flex items-center gap-3.5 self-start md:self-auto flex-wrap">
          {/* Order Simulation Tooltip Trigger */}
          <button
            onClick={() => {
              onAddSimulatedOrder();
              setNotificationCount(prev => prev + 1);
            }}
            className="bg-green-600 hover:bg-green-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-md transition-colors flex items-center gap-2 cursor-pointer"
            title="Create a simulated demo customer order"
          >
            <PlusCircle className="w-4 h-4" />
            Add Simulated Order
          </button>

          <button
            onClick={() => {
              if (confirm("Are you sure you want to clear all orders?")) {
                onClearAllOrders();
                setNotificationCount(0);
                setSelectedOrder(null);
              }
            }}
            className="border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            Clear All Orders
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Statistics Widgets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" id="admin-stats-grid">
          {/* Stat 1: Total Sales */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="space-y-1.5">
              <span className="text-xs text-gray-400 font-bold tracking-wider uppercase">Total Sales (Active)</span>
              <p className="text-2xl sm:text-3xl font-black text-gray-900 font-sans">
                ৳{formatBanglaPrice(stats.sales)}
              </p>
              <div className="flex items-center gap-1 text-[11px] text-green-600 font-bold">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Successful & Pipeline Transactions</span>
              </div>
            </div>
            <div className="bg-green-50 text-green-600 p-4 rounded-2xl border border-green-100 shadow-inner">
              <Coins className="w-7 h-7" />
            </div>
          </div>

          {/* Stat 2: Pending Orders */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="space-y-1.5">
              <span className="text-xs text-gray-400 font-bold tracking-wider uppercase">New Pending Orders</span>
              <p className="text-2xl sm:text-3xl font-black text-gray-900 font-sans">
                {stats.pending} <span className="text-xs text-gray-400 font-normal">Orders</span>
              </p>
              <div className="flex items-center gap-1 text-[11px] text-amber-600 font-bold">
                <Clock className="w-3.5 h-3.5 animate-pulse" />
                <span>Awaiting confirmation</span>
              </div>
            </div>
            <div className="bg-amber-50 text-amber-600 p-4 rounded-2xl border border-amber-100 shadow-inner">
              <Bell className="w-7 h-7 animate-bounce" />
            </div>
          </div>

          {/* Stat 3: Processing & Shipped */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="space-y-1.5">
              <span className="text-xs text-gray-400 font-bold tracking-wider uppercase">Processing & Shipped</span>
              <p className="text-2xl sm:text-3xl font-black text-gray-900 font-sans">
                {stats.approved + stats.shipped} <span className="text-xs text-gray-400 font-normal">Orders</span>
              </p>
              <div className="flex items-center gap-1 text-[11px] text-blue-600 font-bold">
                <Truck className="w-3.5 h-3.5" />
                <span>In courier or prepared</span>
              </div>
            </div>
            <div className="bg-blue-50 text-blue-600 p-4 rounded-2xl border border-blue-100 shadow-inner">
              <Package className="w-7 h-7" />
            </div>
          </div>

          {/* Stat 4: Completed Deliveries */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="space-y-1.5">
              <span className="text-xs text-gray-400 font-bold tracking-wider uppercase">Completed Deliveries</span>
              <p className="text-2xl sm:text-3xl font-black text-gray-900 font-sans">
                {stats.delivered} <span className="text-xs text-gray-400 font-normal">Orders</span>
              </p>
              <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Successfully Delivered</span>
              </div>
            </div>
            <div className="bg-emerald-50 text-emerald-600 p-4 rounded-2xl border border-emerald-100 shadow-inner">
              <CheckCircle className="w-7 h-7" />
            </div>
          </div>
        </div>

        {/* Order Alerts Bar for pending items */}
        {stats.pending > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-red-50 text-[#E53935] px-5 py-4 rounded-2xl border border-rose-100 animate-pulse">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>You have {stats.pending} new customer orders awaiting validation and approval!</span>
            </div>
            {notificationCount > 0 && (
              <button 
                onClick={() => setNotificationCount(0)}
                className="text-xs bg-white text-[#E53935] border border-rose-200 px-3.5 py-1.5 rounded-full hover:bg-rose-100 font-extrabold cursor-pointer"
              >
                Mark as Read
              </button>
            )}
          </div>
        )}

        {/* Live Orders Database Workspace (Split view on large screen) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Orders List (Left) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-100 shadow-md overflow-hidden">
            
            {/* List Toolbar Control Panel */}
            <div className="p-5 border-b border-gray-100 bg-gray-50 flex flex-col md:flex-row items-center justify-between gap-4">
              <h3 className="font-bold text-gray-900 text-base sm:text-lg self-start md:self-auto flex items-center gap-2">
                📂 Total Orders List
                <span className="bg-[#E53935]/10 text-[#E53935] text-xs font-black px-2.5 py-0.5 rounded-full font-mono">
                  {filteredOrders.length}
                </span>
              </h3>

              <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-2.5">
                {/* Search control wrapper */}
                <div className="relative w-full sm:w-56">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by ID or customer..."
                    className="w-full text-xs font-medium bg-white border border-gray-300 rounded-xl pl-9 pr-4 py-2 outline-none focus:border-[#E53935] transition-colors"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                </div>

                {/* Status select filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full sm:w-auto text-xs font-bold bg-white border border-gray-300 rounded-xl px-3 py-2 outline-none focus:border-[#E53935] cursor-pointer"
                >
                  <option value="all">All Statuses</option>
                  <option value="Pending">🕒 Pending</option>
                  <option value="Approved">👍 Approved</option>
                  <option value="Shipped">🚚 Shipped</option>
                  <option value="Delivered">✅ Delivered</option>
                  <option value="Cancelled">❌ Cancelled</option>
                </select>
              </div>
            </div>

            {/* List Rows */}
            <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => {
                  const isSelected = selectedOrder?.id === order.id;
                  const payment = renderPaymentMethod(order.paymentMethod);
                  
                  return (
                    <div 
                      key={order.id}
                      onClick={() => setSelectedOrder(order)}
                      className={`p-4 hover:bg-rose-50/35 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        isSelected ? "bg-[#E53935]/5 border-l-4 border-[#E53935]" : ""
                      }`}
                    >
                      {/* Left: ID & User Basic details */}
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono font-black text-[#E53935] text-sm tracking-tight flex items-center gap-1 bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-100">
                            {order.id}
                          </span>
                          <span className="font-mono text-[10px] text-gray-400 font-bold">{order.date}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-gray-400" />
                          <h4 className="font-bold text-gray-900 text-sm sm:text-base truncate">
                            {order.customerName}
                          </h4>
                          <span className={`text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full ${payment.color}`}>
                            {payment.label}
                          </span>
                        </div>

                        <p className="text-xs text-gray-500 font-medium flex items-center gap-2">
                          <span className="flex items-center gap-0.5"><Phone className="w-3 h-3" /> {order.phone}</span>
                          <span className="text-gray-200">|</span>
                          <span className="flex items-center gap-0.5 truncate"><MapPin className="w-3 h-3" /> {getDivisionLabel(order.division)}</span>
                        </p>
                      </div>

                      {/* Right: Price Tag and Action trigger badges */}
                      <div className="flex items-center gap-3 justify-between sm:justify-start">
                        <div className="text-left sm:text-right">
                          <p className="text-xs text-[#E53935] font-bold">Total Charge:</p>
                          <p className="text-sm sm:text-base font-black text-[#E53935]">
                            ৳{formatBanglaPrice(order.totalAmount)}
                          </p>
                          <p className="text-[10px] text-gray-400 font-medium">({order.items.length} items)</p>
                        </div>

                        <div className="flex flex-col items-end gap-1.5 min-w-[100px]">
                          {/* Colored Badge depending on Status */}
                          {order.status === "Pending" && (
                            <span className="bg-amber-100 text-amber-700 font-bold text-[10px] sm:text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping" />
                              Pending
                            </span>
                          )}
                          {order.status === "Approved" && (
                            <span className="bg-indigo-100 text-indigo-700 font-bold text-[10px] sm:text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5">
                              Approved
                            </span>
                          )}
                          {order.status === "Shipped" && (
                            <span className="bg-blue-100 text-blue-700 font-bold text-[10px] sm:text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5">
                              Shipped
                            </span>
                          )}
                          {order.status === "Delivered" && (
                            <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] sm:text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5">
                              Delivered
                            </span>
                          )}
                          {order.status === "Cancelled" && (
                            <span className="bg-rose-100 text-rose-700 font-bold text-[10px] sm:text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5">
                              Cancelled
                            </span>
                          )}
                          <span className="text-[9px] text-[#E53935] bg-rose-50 px-1.5 py-0.5 rounded border border-rose-100 uppercase tracking-widest font-mono">View Details</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-20 text-center max-w-sm mx-auto space-y-4">
                  <div className="bg-gray-50 text-gray-300 inline-flex p-5 rounded-full border border-gray-100">
                    <Package className="w-10 h-10" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-gray-800 text-sm sm:text-base">No orders registered!</p>
                    <p className="text-xs text-gray-400">There are no orders in the system. Go to the Catalog view to submit an order or click "Add Simulated Order".</p>
                  </div>
                </div>
              )}
            </div>
            
          </div>

          {/* Interactive Order Detail Workspace (Right Panel) */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-gray-100 shadow-md p-5 sm:p-6 space-y-6 lg:sticky lg:top-24">
            
            {selectedOrder ? (
              <div className="space-y-6" id="selected-order-detail-card">
                
                {/* Header Actions */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div>
                    <h3 className="font-black text-gray-900 text-sm uppercase tracking-wide">Order Processing Hub</h3>
                    <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                      <span>Order ID:</span>
                      <strong className="font-mono text-[#E53935]">{selectedOrder.id}</strong>
                      <button 
                        onClick={() => handleCopyId(selectedOrder.id)}
                        className="text-gray-400 hover:text-gray-800 p-0.5"
                        title="Copy Order ID"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      {copiedId === selectedOrder.id && (
                        <span className="text-[10px] text-green-600 bg-green-50 px-1.5 py-0.1 select-none border border-green-100 rounded">Copied!</span>
                      )}
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      if (confirm("Are you sure you want to permanently delete this customer order?")) {
                        onDeleteOrder(selectedOrder.id);
                        setSelectedOrder(null);
                      }
                    }}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-xl border border-red-100 transition-colors cursor-pointer"
                    title="Delete Order"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Sub-State transition timeline triggers */}
                <div className="space-y-2.5">
                  <h4 className="font-bold text-gray-800 text-xs sm:text-sm flex items-center gap-1.5 text-gray-900 uppercase">
                    🛠️ Carrier & Customer Lifecycle Actions
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-2" id="order-lifecycle-actions">
                    {/* Approve button */}
                    <button
                      onClick={() => onUpdateOrderStatus(selectedOrder.id, "Approved")}
                      disabled={selectedOrder.status === "Approved"}
                      className={`text-xs p-2.5 rounded-xl border font-bold flex items-center justify-center gap-1.5 btn hover:scale-101 active:scale-99 transition-all cursor-pointer ${
                        selectedOrder.status === "Approved"
                          ? "bg-indigo-50 border-indigo-200 text-indigo-700 h-10 select-none"
                          : "border-gray-200 bg-[#FAFAFA] hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 shrink-0" />
                      Approve Order
                    </button>

                    {/* Ship button */}
                    <button
                      onClick={() => onUpdateOrderStatus(selectedOrder.id, "Shipped")}
                      disabled={selectedOrder.status === "Shipped"}
                      className={`text-xs p-2.5 rounded-xl border font-bold flex items-center justify-center gap-1.5 hover:scale-101 active:scale-99 transition-all cursor-pointer ${
                        selectedOrder.status === "Shipped"
                          ? "bg-blue-50 border-blue-200 text-blue-700 h-10 select-none"
                          : "border-gray-200 bg-[#FAFAFA] hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200"
                      }`}
                    >
                      <Truck className="w-3.5 h-3.5 shrink-0" />
                      Ship Order
                    </button>

                    {/* Deliver button */}
                    <button
                      onClick={() => onUpdateOrderStatus(selectedOrder.id, "Delivered")}
                      disabled={selectedOrder.status === "Delivered"}
                      className={`text-xs p-2.5 rounded-xl border font-bold flex items-center justify-center gap-1.5 hover:scale-101 active:scale-99 transition-all cursor-pointer ${
                        selectedOrder.status === "Delivered"
                          ? "bg-emerald-100 border-emerald-200 text-emerald-800 h-10 select-none"
                          : "border-gray-200 bg-[#FAFAFA] hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200"
                      }`}
                    >
                      <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                      Deliver Order
                    </button>

                    {/* Cancel button */}
                    <button
                      onClick={() => onUpdateOrderStatus(selectedOrder.id, "Cancelled")}
                      disabled={selectedOrder.status === "Cancelled"}
                      className={`text-xs p-2.5 rounded-xl border font-bold flex items-center justify-center gap-1.5 hover:scale-101 active:scale-99 transition-all cursor-pointer ${
                        selectedOrder.status === "Cancelled"
                          ? "bg-red-50 border-red-200 text-red-700 h-10 select-none"
                          : "border-gray-200 bg-[#FAFAFA] hover:bg-red-50 hover:border-red-200 hover:text-red-700"
                      }`}
                    >
                      <XSquare className="w-3.5 h-3.5 shrink-0" />
                      Cancel Order
                    </button>
                  </div>
                </div>

                {/* Customer full info card panel */}
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 text-xs sm:text-sm space-y-3.5">
                  <h4 className="font-bold text-gray-800 text-xs border-b border-gray-200 pb-1.5 uppercase flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    Shipping & Contact Details
                  </h4>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-gray-400 font-bold uppercase">Customer Name</span>
                      <p className="font-bold text-gray-900">{selectedOrder.customerName}</p>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-gray-400 font-bold uppercase">Phone Number</span>
                      <p className="font-bold text-gray-900 text-xs sm:text-sm flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block" />
                        {selectedOrder.phone}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-dashed border-gray-200 space-y-1">
                    <span className="text-[10px] text-gray-400 font-bold uppercase">Full Address</span>
                    <p className="text-gray-800 font-semibold leading-relaxed bg-white border border-gray-100 rounded-xl p-2.5 text-xs">
                      {selectedOrder.address}, {getDivisionLabel(selectedOrder.division)}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-dashed border-gray-200 grid grid-cols-2 gap-4">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-gray-400 font-bold uppercase">Payment Method</span>
                      <p className="font-bold text-gray-900 text-xs text-left">
                        {selectedOrder.paymentMethod === "cod" && "📦 Cash on Delivery (COD)"}
                        {selectedOrder.paymentMethod === "bkash" && "💖 bKash Wallet"}
                        {selectedOrder.paymentMethod === "nagad" && "🧡 Nagad Wallet"}
                        {selectedOrder.paymentMethod === "rocket" && "💜 Rocket Wallet"}
                      </p>
                    </div>
                    {selectedOrder.trxId && (
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-gray-400 font-bold uppercase text-rose-600">Transaction ID (TrxID)</span>
                        <p className="font-mono text-xs font-black text-[#E53935] uppercase bg-rose-50 px-2 py-1 rounded-lg border border-rose-100 w-fit">{selectedOrder.trxId}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Ordered Items grid */}
                <div className="space-y-3">
                  <h4 className="font-bold text-gray-800 text-xs uppercase tracking-wide">
                    🎁 Ordered Items List ({selectedOrder.items.length} items)
                  </h4>

                  <div className="divide-y divide-gray-100 max-h-48 overflow-y-auto pr-1">
                    {selectedOrder.items.map((item, idx) => {
                      const itemDiscountedPrice = Math.round(
                        item.product.price * (1 - item.product.discountPercentage / 100)
                      );
                      const totalItemVal = itemDiscountedPrice * item.quantity;
                      
                      return (
                        <div key={idx} className="flex gap-3 py-2 items-center justify-between text-xs font-semibold">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <img 
                              src={item.product.image} 
                              alt={item.product.name} 
                              className="w-10 h-10 rounded-lg object-cover bg-gray-50 border border-gray-100 shrink-0"
                              referrerPolicy="no-referrer"
                            />
                            <div className="min-w-0">
                              <p className="font-bold text-gray-900 truncate max-w-xs">{item.product.name}</p>
                              <p className="text-[10px] text-gray-400">
                                ৳{formatBanglaPrice(itemDiscountedPrice)} x {item.quantity} pcs
                              </p>
                            </div>
                          </div>
                          <span className="font-black text-[#E53935] shrink-0 font-sans">
                            ৳{formatBanglaPrice(totalItemVal)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bill Summary */}
                <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-4 text-xs sm:text-sm space-y-2">
                  <div className="flex items-center justify-between text-gray-500">
                    <span>Product Subtotal:</span>
                    <span className="font-semibold text-gray-800 font-sans">৳{formatBanglaPrice(selectedOrder.subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-500">
                    <span>Delivery Charge:</span>
                    <span className="font-semibold text-gray-800 font-sans">৳{formatBanglaPrice(selectedOrder.deliveryCharge)}</span>
                  </div>
                  <div className="border-t border-gray-200/60 pt-2 flex items-center justify-between font-black text-gray-900">
                    <span>Grand Total:</span>
                    <span className="text-base text-[#E53935] font-sans">৳{formatBanglaPrice(selectedOrder.totalAmount)}</span>
                  </div>
                </div>

              </div>
            ) : (
              <div className="py-20 text-center text-gray-400 space-y-4" id="select-order-instructions">
                <div className="bg-gray-50 text-gray-300 inline-flex p-5 rounded-full border border-gray-100">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <div className="space-y-1 max-w-xs mx-auto">
                  <p className="font-black text-gray-800 text-sm uppercase">Order Details Hub</p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Select any order row from the list to view full shipping details, action triggers, and product breakdowns.
                  </p>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Dynamic Products Inventory Hub section */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-md p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-100 pb-4 gap-2">
            <div>
              <h3 className="font-black text-gray-900 text-sm sm:text-base flex items-center gap-1.5 uppercase font-sans">
                📦 Quick Stock Inventory Summary
              </h3>
              <p className="text-xs text-gray-400 font-medium">In-stock product catalogs and items overview</p>
            </div>
            <span className="text-xs font-bold text-[#E53935] bg-rose-50 border border-rose-100 px-3 py-1 rounded-full font-mono">
              Total Categories: 6
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {sampleProducts.map((prod) => (
              <div key={prod.id} className="bg-gray-50 hover:bg-rose-50/20 transition-all border border-gray-100 rounded-2xl p-2.5 flex flex-col gap-2 relative group text-xs text-left">
                <img 
                  src={prod.image} 
                  alt={prod.name} 
                  className="w-full h-20 rounded-xl object-cover bg-white"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-1">
                  <p className="font-bold text-gray-800 line-clamp-2 h-7 leading-tight">{prod.name}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-black text-[#E53935] font-sans">৳{formatBanglaPrice(prod.price * (1 - prod.discountPercentage / 100))}</span>
                    <span className="text-[10px] text-green-600 font-bold bg-green-50 px-1 border border-green-100 rounded">In Stock</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
