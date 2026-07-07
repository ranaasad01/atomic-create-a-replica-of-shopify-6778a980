"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { TrendingUp, TrendingDown, ShoppingBag, Users, DollarSign, Package, ArrowRight, MoreHorizontal, Eye, Clock, CheckCircle, AlertCircle, Truck, XCircle, Star, Activity, BarChart2, RefreshCw } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

const revenueData = [
  { month: "Jan", revenue: 42000, orders: 310 },
  { month: "Feb", revenue: 38500, orders: 280 },
  { month: "Mar", revenue: 51200, orders: 390 },
  { month: "Apr", revenue: 47800, orders: 355 },
  { month: "May", revenue: 63400, orders: 470 },
  { month: "Jun", revenue: 58900, orders: 430 },
  { month: "Jul", revenue: 71200, orders: 520 },
  { month: "Aug", revenue: 68500, orders: 495 },
  { month: "Sep", revenue: 79300, orders: 580 },
  { month: "Oct", revenue: 84100, orders: 615 },
  { month: "Nov", revenue: 92600, orders: 680 },
  { month: "Dec", revenue: 108400, orders: 790 },
];

const topProducts = [
  { id: "1", name: "Wireless Noise-Cancelling Headphones", category: "Electronics", sold: 342, revenue: 68400, stock: 48, image: "https://m.media-amazon.com/images/I/71YM2N5whtL.jpg" },
  { id: "2", name: "Minimalist Leather Watch", category: "Accessories", sold: 289, revenue: 57800, stock: 23, image: "https://i.etsystatic.com/11276331/r/il/0d5206/3887810690/il_570xN.3887810690_pojq.jpg" },
  { id: "3", name: "Ergonomic Office Chair", category: "Furniture", sold: 201, revenue: 90450, stock: 12, image: "https://technimobili.com/cdn/shop/files/RTA-3263C-BK-01.jpg?v=1740778095&width=1780" },
  { id: "4", name: "Organic Cotton Tote Bag", category: "Bags", sold: 478, revenue: 19120, stock: 134, image: "https://cottoncreations.com/wp-content/uploads/2026/02/ORG-12oz-tote-bag.jpg" },
  { id: "5", name: "Ceramic Pour-Over Coffee Set", category: "Kitchen", sold: 167, revenue: 25050, stock: 67, image: "https://m.media-amazon.com/images/I/7159+ELcEOL._AC_UF894,1000_QL80_.jpg" },
];

const recentOrders = [
  { id: "#10482", customer: "Sarah Mitchell", email: "sarah@example.com", date: "Dec 18, 2024", status: "delivered", total: 248.00, items: 3 },
  { id: "#10481", customer: "James Thornton", email: "james@example.com", date: "Dec 18, 2024", status: "shipped", total: 89.99, items: 1 },
  { id: "#10480", customer: "Priya Sharma", email: "priya@example.com", date: "Dec 17, 2024", status: "processing", total: 412.50, items: 5 },
  { id: "#10479", customer: "Carlos Rivera", email: "carlos@example.com", date: "Dec 17, 2024", status: "pending", total: 134.00, items: 2 },
  { id: "#10478", customer: "Emma Johansson", email: "emma@example.com", date: "Dec 16, 2024", status: "cancelled", total: 67.00, items: 1 },
  { id: "#10477", customer: "Liam O'Brien", email: "liam@example.com", date: "Dec 16, 2024", status: "delivered", total: 329.99, items: 4 },
];

const channelData = [
  { channel: "Online Store", orders: 1240, revenue: 186000 },
  { channel: "Instagram", orders: 430, revenue: 64500 },
  { channel: "Facebook", orders: 310, revenue: 46500 },
  { channel: "Google", orders: 520, revenue: 78000 },
  { channel: "Email", orders: 180, revenue: 27000 },
];

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

const statusConfig: Record<OrderStatus, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  pending: { label: "Pending", color: "text-amber-600", bg: "bg-amber-50", icon: <Clock className="w-3.5 h-3.5" /> },
  processing: { label: "Processing", color: "text-blue-600", bg: "bg-blue-50", icon: <RefreshCw className="w-3.5 h-3.5" /> },
  shipped: { label: "Shipped", color: "text-purple-600", bg: "bg-purple-50", icon: <Truck className="w-3.5 h-3.5" /> },
  delivered: { label: "Delivered", color: "text-green-600", bg: "bg-green-50", icon: <CheckCircle className="w-3.5 h-3.5" /> },
  cancelled: { label: "Cancelled", color: "text-red-500", bg: "bg-red-50", icon: <XCircle className="w-3.5 h-3.5" /> },
};

const statCards = [
  {
    label: "Total Revenue",
    value: "$108,400",
    change: "+18.2%",
    positive: true,
    icon: DollarSign,
    sub: "vs last month",
    accent: "#96BF48",
    accentLight: "#96BF4815",
  },
  {
    label: "Total Orders",
    value: "2,680",
    change: "+12.5%",
    positive: true,
    icon: ShoppingBag,
    sub: "vs last month",
    accent: "#6366f1",
    accentLight: "#6366f115",
  },
  {
    label: "Active Customers",
    value: "14,320",
    change: "+8.1%",
    positive: true,
    icon: Users,
    sub: "vs last month",
    accent: "#f59e0b",
    accentLight: "#f59e0b15",
  },
  {
    label: "Products in Stock",
    value: "1,248",
    change: "-3.4%",
    positive: false,
    icon: Package,
    sub: "vs last month",
    accent: "#ec4899",
    accentLight: "#ec489915",
  },
];

export default function MerchantDashboardOverviewPage() {
  const t = useTranslations();
  const [activeChart, setActiveChart] = useState<"revenue" | "orders">("revenue");
  const [orderFilter, setOrderFilter] = useState<"all" | OrderStatus>("all");

  const filteredOrders = orderFilter === "all"
    ? recentOrders
    : recentOrders.filter((o) => o.status === orderFilter);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Page header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
                Merchant Dashboard
              </h1>
              <p className="text-sm text-neutral-500 mt-0.5">
                Welcome back. Here is what is happening with your store today.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-neutral-400 bg-neutral-100 px-3 py-1.5 rounded-full font-medium">
                December 2024
              </span>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#96BF48] hover:bg-[#5E8E3E] text-white text-sm font-semibold rounded-xl transition-colors duration-200 shadow-sm"
              >
                <Activity className="w-4 h-4" />
                Full Analytics
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Stat Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                variants={scaleIn}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.06)] flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-500">{card.label}</span>
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: card.accentLight }}
                  >
                    <Icon className="w-4.5 h-4.5" style={{ color: card.accent }} />
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold tracking-tight text-neutral-900">{card.value}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    {card.positive ? (
                      <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5 text-red-400" />
                    )}
                    <span className={`text-xs font-semibold ${card.positive ? "text-green-600" : "text-red-500"}`}>
                      {card.change}
                    </span>
                    <span className="text-xs text-neutral-400">{card.sub}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Revenue Chart + Channel Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Area Chart */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200/80 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.06)]"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-semibold text-neutral-900">Performance Overview</h2>
                <p className="text-xs text-neutral-400 mt-0.5">Full year 2024</p>
              </div>
              <div className="flex items-center gap-1 bg-neutral-100 rounded-xl p-1">
                <button
                  onClick={() => setActiveChart("revenue")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
                    activeChart === "revenue"
                      ? "bg-white text-neutral-900 shadow-sm"
                      : "text-neutral-500 hover:text-neutral-700"
                  }`}
                >
                  Revenue
                </button>
                <button
                  onClick={() => setActiveChart("orders")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
                    activeChart === "orders"
                      ? "bg-white text-neutral-900 shadow-sm"
                      : "text-neutral-500 hover:text-neutral-700"
                  }`}
                >
                  Orders
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#96BF48" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#96BF48" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb", fontSize: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
                  formatter={(value: number) =>
                    activeChart === "revenue"
                      ? [`$${(value ?? 0).toLocaleString("en-US")}`, "Revenue"]
                      : [(value ?? 0).toLocaleString("en-US"), "Orders"]
                  }
                />
                {activeChart === "revenue" ? (
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#96BF48"
                    strokeWidth={2.5}
                    fill="url(#colorRevenue)"
                    dot={false}
                    activeDot={{ r: 5, fill: "#96BF48" }}
                  />
                ) : (
                  <Area
                    type="monotone"
                    dataKey="orders"
                    stroke="#6366f1"
                    strokeWidth={2.5}
                    fill="url(#colorOrders)"
                    dot={false}
                    activeDot={{ r: 5, fill: "#6366f1" }}
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Sales by Channel */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="bg-white rounded-2xl border border-neutral-200/80 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.06)]"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-base font-semibold text-neutral-900">Sales by Channel</h2>
                <p className="text-xs text-neutral-400 mt-0.5">This month</p>
              </div>
              <BarChart2 className="w-4 h-4 text-neutral-400" />
            </div>
            <div className="space-y-3">
              {channelData.map((ch, i) => {
                const maxRevenue = Math.max(...channelData.map((c) => c.revenue));
                const pct = Math.round(((ch.revenue ?? 0) / maxRevenue) * 100);
                const colors = ["#96BF48", "#6366f1", "#f59e0b", "#ec4899", "#14b8a6"];
                return (
                  <div key={ch.channel}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-neutral-700">{ch.channel}</span>
                      <span className="text-xs font-semibold text-neutral-900">
                        ${(ch.revenue ?? 0).toLocaleString("en-US")}
                      </span>
                    </div>
                    <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: i * 0.08, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: colors[i % colors.length] }}
                      />
                    </div>
                    <p className="text-[10px] text-neutral-400 mt-0.5">{(ch.orders ?? 0).toLocaleString("en-US")} orders</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Recent Orders */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="bg-white rounded-2xl border border-neutral-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.06)] overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-neutral-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-neutral-900">Recent Orders</h2>
              <p className="text-xs text-neutral-400 mt-0.5">Latest transactions across your store</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {(["all", "pending", "processing", "shipped", "delivered", "cancelled"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setOrderFilter(f)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 capitalize ${
                    orderFilter === f
                      ? "bg-[#96BF48] text-white"
                      : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-100">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Order</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Customer</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide hidden md:table-cell">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Status</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Total</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide hidden sm:table-cell">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50">
                {(filteredOrders ?? []).map((order) => {
                  const s = statusConfig[order.status as OrderStatus] ?? statusConfig.pending;
                  return (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.25 }}
                      className="hover:bg-neutral-50/60 transition-colors duration-150"
                    >
                      <td className="px-6 py-4">
                        <span className="font-semibold text-neutral-900 text-sm">{order.id}</span>
                        <p className="text-xs text-neutral-400 mt-0.5">{order.items} item{order.items !== 1 ? "s" : ""}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-medium text-neutral-800 text-sm">{order.customer ?? ""}</p>
                        <p className="text-xs text-neutral-400">{order.email ?? ""}</p>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <span className="text-sm text-neutral-500">{order.date ?? ""}</span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${s.color} ${s.bg}`}>
                          {s.icon}
                          {s.label}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <span className="font-semibold text-neutral-900">
                          ${(order.total ?? 0).toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right hidden sm:table-cell">
                        <button className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors duration-150">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors duration-150 ml-1">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
            {filteredOrders.length === 0 && (
              <div className="py-12 text-center text-neutral-400 text-sm">
                No orders match this filter.
              </div>
            )}
          </div>
          <div className="px-6 py-4 border-t border-neutral-100 flex items-center justify-between">
            <p className="text-xs text-neutral-400">Showing {filteredOrders.length} of {recentOrders.length} orders</p>
            <Link
              href="/dashboard/orders"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5E8E3E] hover:text-[#96BF48] transition-colors duration-200"
            >
              View all orders
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>

        {/* Top Products + Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Products */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.06)] overflow-hidden"
          >
            <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-neutral-900">Top Products</h2>
                <p className="text-xs text-neutral-400 mt-0.5">Best sellers this month</p>
              </div>
              <Link
                href="/dashboard/products"
                className="text-xs font-semibold text-[#5E8E3E] hover:text-[#96BF48] transition-colors duration-200 flex items-center gap-1"
              >
                Manage <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="divide-y divide-neutral-50"
            >
              {topProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  variants={fadeInUp}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-neutral-50/60 transition-colors duration-150"
                >
                  <span className="text-xs font-bold text-neutral-300 w-4 shrink-0">{i + 1}</span>
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-neutral-100 shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-800 truncate">{product.name}</p>
                    <p className="text-xs text-neutral-400">{product.category}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold text-neutral-900">
                      ${(product.revenue ?? 0).toLocaleString("en-US")}
                    </p>
                    <p className="text-xs text-neutral-400">{product.sold} sold</p>
                  </div>
                  <div className="shrink-0 hidden sm:block">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      (product.stock ?? 0) < 20
                        ? "bg-red-50 text-red-500"
                        : "bg-green-50 text-green-600"
                    }`}>
                      {product.stock} left
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Stats Panel */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-5"
          >
            {/* Avg Order Value */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.06)]">
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">Avg. Order Value</p>
              <p className="text-3xl font-bold tracking-tight text-neutral-900">$40.45</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                <span className="text-xs font-semibold text-green-600">+5.3%</span>
                <span className="text-xs text-neutral-400">vs last month</span>
              </div>
              <div className="mt-4 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "68%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-[#96BF48] rounded-full"
                />
              </div>
              <p className="text-[10px] text-neutral-400 mt-1">68% of monthly target</p>
            </div>

            {/* Conversion Rate */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.06)]">
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">Conversion Rate</p>
              <p className="text-3xl font-bold tracking-tight text-neutral-900">3.82%</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                <span className="text-xs font-semibold text-green-600">+0.4%</span>
                <span className="text-xs text-neutral-400">vs last month</span>
              </div>
              <div className="mt-4 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "76%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                  className="h-full bg-indigo-500 rounded-full"
                />
              </div>
              <p className="text-[10px] text-neutral-400 mt-1">76% of monthly target</p>
            </div>

            {/* Customer Satisfaction */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.06)]">
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">Customer Satisfaction</p>
              <div className="flex items-end gap-2">
                <p className="text-3xl font-bold tracking-tight text-neutral-900">4.8</p>
                <div className="flex items-center gap-0.5 mb-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-3.5 h-3.5 ${s <= 4 ? "text-amber-400 fill-amber-400" : "text-amber-300 fill-amber-200"}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-neutral-400 mt-1">Based on 1,240 reviews</p>
              <div className="mt-4 space-y-1.5">
                {[
                  { stars: 5, pct: 72 },
                  { stars: 4, pct: 18 },
                  { stars: 3, pct: 6 },
                  { stars: 2, pct: 3 },
                  { stars: 1, pct: 1 },
                ].map((row) => (
                  <div key={row.stars} className="flex items-center gap-2">
                    <span className="text-[10px] text-neutral-400 w-3">{row.stars}</span>
                    <div className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${row.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="h-full bg-amber-400 rounded-full"
                      />
                    </div>
                    <span className="text-[10px] text-neutral-400 w-5 text-right">{row.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Links */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
        >
          {[
            { label: "Orders", href: "/dashboard/orders", icon: ShoppingBag, color: "#6366f1", bg: "#6366f110" },
            { label: "Products", href: "/dashboard/products", icon: Package, color: "#96BF48", bg: "#96BF4810" },
            { label: "Customers", href: "/dashboard/customers", icon: Users, color: "#f59e0b", bg: "#f59e0b10" },
            { label: "Analytics", href: "/dashboard/analytics", icon: BarChart2, color: "#ec4899", bg: "#ec489910" },
            { label: "Discounts", href: "/dashboard/discounts", icon: Star, color: "#14b8a6", bg: "#14b8a610" },
            { label: "Full Dashboard", href: "/dashboard", icon: Activity, color: "#8b5cf6", bg: "#8b5cf610" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.label} variants={scaleIn} whileHover={{ y: -2, transition: { duration: 0.15 } }}>
                <Link
                  href={item.href}
                  className="flex flex-col items-center gap-2.5 p-4 bg-white rounded-2xl border border-neutral-200/80 hover:border-neutral-300 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.1)] transition-all duration-200 group"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                    style={{ backgroundColor: item.bg }}
                  >
                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <span className="text-xs font-semibold text-neutral-700 group-hover:text-neutral-900 transition-colors duration-200">
                    {item.label}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </div>
  );
}