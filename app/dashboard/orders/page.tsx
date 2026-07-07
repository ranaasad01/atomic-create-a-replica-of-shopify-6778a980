"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Filter, Download, Eye, ChevronDown, ChevronLeft, ChevronRight, Package, Clock, Truck, CheckCircle, XCircle, RefreshCw, ArrowUpDown, MoreHorizontal, TrendingUp, ShoppingBag, DollarSign, AlertCircle } from 'lucide-react';
import { useTranslations } from "next-intl";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

type OrderItem = {
  name: string;
  qty: number;
  price: number;
};

type Order = {
  id: string;
  customer: string;
  email: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
  itemCount: number;
  paymentMethod: string;
  shippingAddress: string;
  trackingNumber?: string;
};

const MOCK_ORDERS: Order[] = [
  {
    id: "#10045",
    customer: "Emma Rodriguez",
    email: "emma.r@example.com",
    date: "2024-06-12",
    status: "delivered",
    total: 249.99,
    itemCount: 3,
    paymentMethod: "Visa •••• 4242",
    shippingAddress: "123 Maple St, Austin, TX 78701",
    trackingNumber: "1Z999AA10123456784",
    items: [
      { name: "Wireless Headphones Pro", qty: 1, price: 149.99 },
      { name: "Phone Stand Deluxe", qty: 2, price: 50.00 },
    ],
  },
  {
    id: "#10044",
    customer: "James Whitfield",
    email: "j.whitfield@example.com",
    date: "2024-06-12",
    status: "shipped",
    total: 89.50,
    itemCount: 1,
    paymentMethod: "Mastercard •••• 5555",
    shippingAddress: "456 Oak Ave, Portland, OR 97201",
    trackingNumber: "1Z999AA10123456785",
    items: [
      { name: "Leather Wallet Slim", qty: 1, price: 89.50 },
    ],
  },
  {
    id: "#10043",
    customer: "Priya Nair",
    email: "priya.nair@example.com",
    date: "2024-06-11",
    status: "processing",
    total: 412.00,
    itemCount: 4,
    paymentMethod: "PayPal",
    shippingAddress: "789 Pine Rd, Chicago, IL 60601",
    items: [
      { name: "Mechanical Keyboard TKL", qty: 1, price: 229.00 },
      { name: "Mouse Pad XL", qty: 1, price: 39.00 },
      { name: "USB-C Hub 7-in-1", qty: 2, price: 72.00 },
    ],
  },
  {
    id: "#10042",
    customer: "Liam Chen",
    email: "liam.chen@example.com",
    date: "2024-06-11",
    status: "pending",
    total: 59.99,
    itemCount: 1,
    paymentMethod: "Visa •••• 1234",
    shippingAddress: "321 Birch Blvd, Seattle, WA 98101",
    items: [
      { name: "Bamboo Desk Organizer", qty: 1, price: 59.99 },
    ],
  },
  {
    id: "#10041",
    customer: "Sofia Andersen",
    email: "sofia.a@example.com",
    date: "2024-06-10",
    status: "cancelled",
    total: 175.00,
    itemCount: 2,
    paymentMethod: "Amex •••• 3782",
    shippingAddress: "654 Cedar Ln, Miami, FL 33101",
    items: [
      { name: "Scented Candle Set", qty: 2, price: 87.50 },
    ],
  },
  {
    id: "#10040",
    customer: "Marcus Johnson",
    email: "m.johnson@example.com",
    date: "2024-06-10",
    status: "delivered",
    total: 329.95,
    itemCount: 2,
    paymentMethod: "Visa •••• 9876",
    shippingAddress: "987 Elm St, Denver, CO 80201",
    trackingNumber: "1Z999AA10123456786",
    items: [
      { name: "Smart Watch Series 5", qty: 1, price: 299.95 },
      { name: "Watch Band Sport", qty: 1, price: 30.00 },
    ],
  },
  {
    id: "#10039",
    customer: "Aisha Patel",
    email: "aisha.p@example.com",
    date: "2024-06-09",
    status: "shipped",
    total: 144.00,
    itemCount: 3,
    paymentMethod: "PayPal",
    shippingAddress: "159 Walnut Dr, Boston, MA 02101",
    trackingNumber: "1Z999AA10123456787",
    items: [
      { name: "Yoga Mat Premium", qty: 1, price: 79.00 },
      { name: "Resistance Bands Set", qty: 1, price: 35.00 },
      { name: "Water Bottle 32oz", qty: 1, price: 30.00 },
    ],
  },
  {
    id: "#10038",
    customer: "Noah Williams",
    email: "noah.w@example.com",
    date: "2024-06-09",
    status: "delivered",
    total: 519.00,
    itemCount: 1,
    paymentMethod: "Mastercard •••• 8888",
    shippingAddress: "753 Spruce Ave, Nashville, TN 37201",
    trackingNumber: "1Z999AA10123456788",
    items: [
      { name: "Noise-Cancelling Earbuds Elite", qty: 1, price: 519.00 },
    ],
  },
  {
    id: "#10037",
    customer: "Chloe Martin",
    email: "chloe.m@example.com",
    date: "2024-06-08",
    status: "processing",
    total: 88.00,
    itemCount: 2,
    paymentMethod: "Visa •••• 5678",
    shippingAddress: "246 Ash Ct, Phoenix, AZ 85001",
    items: [
      { name: "Ceramic Mug Set (4)", qty: 1, price: 48.00 },
      { name: "French Press Coffee Maker", qty: 1, price: 40.00 },
    ],
  },
  {
    id: "#10036",
    customer: "Ethan Brooks",
    email: "ethan.b@example.com",
    date: "2024-06-08",
    status: "pending",
    total: 199.00,
    itemCount: 1,
    paymentMethod: "Amex •••• 0005",
    shippingAddress: "864 Poplar St, Atlanta, GA 30301",
    items: [
      { name: "Standing Desk Converter", qty: 1, price: 199.00 },
    ],
  },
];

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  pending: {
    label: "Pending",
    color: "text-amber-700",
    bg: "bg-amber-50 border-amber-200",
    icon: <Clock className="w-3.5 h-3.5" />,
  },
  processing: {
    label: "Processing",
    color: "text-blue-700",
    bg: "bg-blue-50 border-blue-200",
    icon: <RefreshCw className="w-3.5 h-3.5" />,
  },
  shipped: {
    label: "Shipped",
    color: "text-purple-700",
    bg: "bg-purple-50 border-purple-200",
    icon: <Truck className="w-3.5 h-3.5" />,
  },
  delivered: {
    label: "Delivered",
    color: "text-green-700",
    bg: "bg-green-50 border-green-200",
    icon: <CheckCircle className="w-3.5 h-3.5" />,
  },
  cancelled: {
    label: "Cancelled",
    color: "text-red-700",
    bg: "bg-red-50 border-red-200",
    icon: <XCircle className="w-3.5 h-3.5" />,
  },
};

const STAT_CARDS = [
  {
    label: "Total Orders",
    value: "10,045",
    change: "+12.5%",
    positive: true,
    icon: <ShoppingBag className="w-5 h-5" />,
    accent: "bg-[#96BF48]/10 text-[#5E8E3E]",
  },
  {
    label: "Revenue (June)",
    value: "$48,320",
    change: "+8.2%",
    positive: true,
    icon: <DollarSign className="w-5 h-5" />,
    accent: "bg-blue-50 text-blue-600",
  },
  {
    label: "Pending Review",
    value: "24",
    change: "-3 today",
    positive: true,
    icon: <AlertCircle className="w-5 h-5" />,
    accent: "bg-amber-50 text-amber-600",
  },
  {
    label: "Avg. Order Value",
    value: "$127.40",
    change: "+4.1%",
    positive: true,
    icon: <TrendingUp className="w-5 h-5" />,
    accent: "bg-purple-50 text-purple-600",
  },
];

const STATUS_FILTERS: { label: string; value: string }[] = [
  { label: "All Orders", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Processing", value: "processing" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

export default function DashboardOrdersPage() {
  const t = useTranslations();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState<"date" | "total" | "customer">("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());

  const PAGE_SIZE = 7;

  const filtered = (MOCK_ORDERS ?? []).filter((o) => {
    const matchesSearch =
      search.trim() === "" ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      (o.customer ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (o.email ?? "").toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sorted = [...filtered].sort((a, b) => {
    let cmp = 0;
    if (sortField === "date") cmp = a.date.localeCompare(b.date);
    else if (sortField === "total") cmp = a.total - b.total;
    else if (sortField === "customer") cmp = (a.customer ?? "").localeCompare(b.customer ?? "");
    return sortDir === "asc" ? cmp : -cmp;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function toggleSort(field: "date" | "total" | "customer") {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  }

  function toggleSelect(id: string) {
    setSelectedOrders((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleSelectAll() {
    if (selectedOrders.size === paginated.length) {
      setSelectedOrders(new Set());
    } else {
      setSelectedOrders(new Set(paginated.map((o) => o.id)));
    }
  }

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    setPage(1);
  }

  function handleStatusFilter(val: string) {
    setStatusFilter(val);
    setPage(1);
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Page Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div>
            <div className="flex items-center gap-2 text-sm text-neutral-500 mb-1">
              <Link href="/dashboard" className="hover:text-[#5E8E3E] transition-colors">Dashboard</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-neutral-800 font-medium">Orders</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Orders</h1>
            <p className="text-neutral-500 text-sm mt-0.5">Manage and track all customer orders</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <Download className="w-4 h-4" />
              Export
            </button>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#96BF48] hover:bg-[#5E8E3E] rounded-xl transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
            >
              <Package className="w-4 h-4" />
              New Order
            </Link>
          </div>
        </motion.div>

        {/* Stat Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {STAT_CARDS.map((card) => (
            <motion.div
              key={card.label}
              variants={scaleIn}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl border border-neutral-100 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.06)]"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${card.accent}`}>
                  {card.icon}
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${card.positive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                  {card.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-neutral-900 tracking-tight">{card.value}</div>
              <div className="text-xs text-neutral-500 mt-0.5">{card.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Filters & Search */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl border border-neutral-100 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.06)] mb-4"
        >
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-4 border-b border-neutral-100">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search by order ID, customer, or email..."
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-[#96BF48] focus:bg-white transition-all duration-200 placeholder-neutral-400"
              />
            </div>
            {/* Sort */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleSort("date")}
                className={`flex items-center gap-1.5 px-3 py-2.5 text-sm rounded-xl border transition-all duration-200 ${sortField === "date" ? "border-[#96BF48] text-[#5E8E3E] bg-[#96BF48]/5" : "border-neutral-200 text-neutral-600 hover:bg-neutral-50"}`}
              >
                <ArrowUpDown className="w-3.5 h-3.5" />
                Date
              </button>
              <button
                onClick={() => toggleSort("total")}
                className={`flex items-center gap-1.5 px-3 py-2.5 text-sm rounded-xl border transition-all duration-200 ${sortField === "total" ? "border-[#96BF48] text-[#5E8E3E] bg-[#96BF48]/5" : "border-neutral-200 text-neutral-600 hover:bg-neutral-50"}`}
              >
                <ArrowUpDown className="w-3.5 h-3.5" />
                Total
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2.5 text-sm rounded-xl border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-all duration-200">
                <Filter className="w-3.5 h-3.5" />
                Filter
              </button>
            </div>
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1 px-4 py-2 overflow-x-auto scrollbar-hide">
            {STATUS_FILTERS.map((sf) => {
              const count = sf.value === "all"
                ? MOCK_ORDERS.length
                : MOCK_ORDERS.filter((o) => o.status === sf.value).length;
              return (
                <button
                  key={sf.value}
                  onClick={() => handleStatusFilter(sf.value)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-all duration-200 ${
                    statusFilter === sf.value
                      ? "bg-[#96BF48]/10 text-[#5E8E3E]"
                      : "text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100"
                  }`}
                >
                  {sf.label}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${statusFilter === sf.value ? "bg-[#96BF48]/20 text-[#5E8E3E]" : "bg-neutral-100 text-neutral-500"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Orders Table */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl border border-neutral-100 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.06)] overflow-hidden"
        >
          {/* Bulk action bar */}
          {selectedOrders.size > 0 && (
            <div className="flex items-center gap-3 px-5 py-3 bg-[#96BF48]/5 border-b border-[#96BF48]/20">
              <span className="text-sm font-medium text-[#5E8E3E]">{selectedOrders.size} selected</span>
              <button className="text-sm text-neutral-600 hover:text-neutral-900 px-3 py-1 rounded-lg hover:bg-white transition-all">Mark Shipped</button>
              <button className="text-sm text-neutral-600 hover:text-neutral-900 px-3 py-1 rounded-lg hover:bg-white transition-all">Mark Delivered</button>
              <button className="text-sm text-red-600 hover:text-red-700 px-3 py-1 rounded-lg hover:bg-red-50 transition-all">Cancel Orders</button>
            </div>
          )}

          {/* Table Header */}
          <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 items-center px-5 py-3 border-b border-neutral-100 bg-neutral-50/60">
            <input
              type="checkbox"
              checked={selectedOrders.size === paginated.length && paginated.length > 0}
              onChange={toggleSelectAll}
              className="w-4 h-4 rounded accent-[#96BF48] cursor-pointer"
            />
            <button
              onClick={() => toggleSort("customer")}
              className="flex items-center gap-1 text-xs font-semibold text-neutral-500 uppercase tracking-wide hover:text-neutral-800 transition-colors text-left"
            >
              Customer <ArrowUpDown className="w-3 h-3" />
            </button>
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wide hidden md:block">Status</span>
            <button
              onClick={() => toggleSort("date")}
              className="flex items-center gap-1 text-xs font-semibold text-neutral-500 uppercase tracking-wide hover:text-neutral-800 transition-colors hidden lg:flex"
            >
              Date <ArrowUpDown className="w-3 h-3" />
            </button>
            <button
              onClick={() => toggleSort("total")}
              className="flex items-center gap-1 text-xs font-semibold text-neutral-500 uppercase tracking-wide hover:text-neutral-800 transition-colors"
            >
              Total <ArrowUpDown className="w-3 h-3" />
            </button>
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">Actions</span>
          </div>

          {/* Table Rows */}
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            {paginated.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-neutral-400">
                <Package className="w-10 h-10 mb-3 opacity-40" />
                <p className="text-sm font-medium">No orders found</p>
                <p className="text-xs mt-1">Try adjusting your search or filters</p>
              </div>
            ) : (
              paginated.map((order) => {
                const statusCfg = STATUS_CONFIG[order.status];
                const isExpanded = expandedOrder === order.id;
                const isSelected = selectedOrders.has(order.id);

                return (
                  <motion.div
                    key={order.id}
                    variants={fadeInUp}
                    className={`border-b border-neutral-100 last:border-0 transition-colors duration-150 ${isSelected ? "bg-[#96BF48]/3" : "hover:bg-neutral-50/60"}`}
                  >
                    {/* Main Row */}
                    <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 items-center px-5 py-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(order.id)}
                        className="w-4 h-4 rounded accent-[#96BF48] cursor-pointer"
                      />

                      {/* Customer */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#96BF48]/30 to-[#5E8E3E]/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-[#5E8E3E]">
                              {(order.customer ?? "?").charAt(0)}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-neutral-900 truncate">{order.customer}</span>
                              <span className="text-xs text-neutral-400 font-mono">{order.id}</span>
                            </div>
                            <div className="text-xs text-neutral-500 truncate">{order.email}</div>
                          </div>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="hidden md:flex">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusCfg.bg} ${statusCfg.color}`}>
                          {statusCfg.icon}
                          {statusCfg.label}
                        </span>
                      </div>

                      {/* Date */}
                      <div className="hidden lg:block text-sm text-neutral-500 whitespace-nowrap">
                        {order.date}
                      </div>

                      {/* Total */}
                      <div className="text-sm font-semibold text-neutral-900 whitespace-nowrap">
                        ${(order.total ?? 0).toFixed(2)}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-[#5E8E3E] hover:bg-[#96BF48]/10 transition-all duration-200"
                          title="View details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-all duration-200">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Expanded Detail Panel */}
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="px-5 pb-5 border-t border-neutral-100 bg-neutral-50/40"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                          {/* Items */}
                          <div>
                            <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">
                              Items ({order.itemCount})
                            </h4>
                            <div className="space-y-2">
                              {(order.items ?? []).map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between text-sm">
                                  <span className="text-neutral-700 truncate pr-2">{item.name} <span className="text-neutral-400">×{item.qty}</span></span>
                                  <span className="font-medium text-neutral-900 whitespace-nowrap">${(item.price ?? 0).toFixed(2)}</span>
                                </div>
                              ))}
                              <div className="flex items-center justify-between text-sm font-semibold text-neutral-900 pt-2 border-t border-neutral-200">
                                <span>Total</span>
                                <span>${(order.total ?? 0).toFixed(2)}</span>
                              </div>
                            </div>
                          </div>

                          {/* Shipping */}
                          <div>
                            <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">Shipping</h4>
                            <p className="text-sm text-neutral-700 leading-relaxed">{order.shippingAddress}</p>
                            {order.trackingNumber && (
                              <div className="mt-3">
                                <span className="text-xs text-neutral-500">Tracking</span>
                                <p className="text-sm font-mono text-[#5E8E3E] mt-0.5">{order.trackingNumber}</p>
                              </div>
                            )}
                          </div>

                          {/* Payment & Status */}
                          <div>
                            <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">Payment</h4>
                            <p className="text-sm text-neutral-700">{order.paymentMethod}</p>
                            <div className="mt-4">
                              <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">Update Status</h4>
                              <select
                                defaultValue={order.status}
                                onChange={() => {}}
                                className="w-full text-sm px-3 py-2 bg-white border border-neutral-200 rounded-xl outline-none focus:border-[#96BF48] transition-colors cursor-pointer"
                              >
                                {Object.entries(STATUS_CONFIG).map(([val, cfg]) => (
                                  <option key={val} value={val}>{cfg.label}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })
            )}
          </motion.div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4 border-t border-neutral-100 bg-neutral-50/40">
            <p className="text-sm text-neutral-500">
              Showing <span className="font-medium text-neutral-800">{Math.min((page - 1) * PAGE_SIZE + 1, sorted.length)}</span>–<span className="font-medium text-neutral-800">{Math.min(page * PAGE_SIZE, sorted.length)}</span> of <span className="font-medium text-neutral-800">{sorted.length}</span> orders
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-xl border border-neutral-200 text-neutral-500 hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                <button
                  key={pg}
                  onClick={() => setPage(pg)}
                  className={`w-9 h-9 rounded-xl text-sm font-medium transition-all duration-200 ${
                    pg === page
                      ? "bg-[#96BF48] text-white shadow-sm"
                      : "border border-neutral-200 text-neutral-600 hover:bg-neutral-100"
                  }`}
                >
                  {pg}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-xl border border-neutral-200 text-neutral-500 hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}