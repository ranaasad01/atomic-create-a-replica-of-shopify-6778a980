"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { TrendingUp, TrendingDown, ShoppingBag, Users, DollarSign, Package, ArrowRight, Eye, MoreHorizontal, CheckCircle, Clock, Truck, XCircle, AlertCircle, Star, BarChart2, Activity } from 'lucide-react';
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
} from "recharts";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { type Order, type Customer } from "@/lib/data";

const revenueData = [
  { month: "Jan", revenue: 42000, orders: 310 },
  { month: "Feb", revenue: 38500, orders: 278 },
  { month: "Mar", revenue: 51200, orders: 401 },
  { month: "Apr", revenue: 47800, orders: 365 },
  { month: "May", revenue: 63400, orders: 489 },
  { month: "Jun", revenue: 58900, orders: 452 },
  { month: "Jul", revenue: 71200, orders: 541 },
  { month: "Aug", revenue: 68400, orders: 523 },
  { month: "Sep", revenue: 79100, orders: 612 },
  { month: "Oct", revenue: 84300, orders: 648 },
  { month: "Nov", revenue: 92700, orders: 714 },
  { month: "Dec", revenue: 108500, orders: 832 },
];

const topProducts = [
  { id: "1", name: "Wireless Noise-Cancelling Headphones", sales: 1243, revenue: 186450, stock: 84, image: "https://m.media-amazon.com/images/I/71YM2N5whtL.jpg" },
  { id: "2", name: "Minimalist Leather Watch", sales: 987, revenue: 147050, stock: 52, image: "https://i.etsystatic.com/11276331/r/il/0d5206/3887810690/il_570xN.3887810690_pojq.jpg" },
  { id: "3", name: "Ergonomic Desk Chair", sales: 762, revenue: 228600, stock: 31, image: "https://i.etsystatic.com/11276331/r/il/0d5206/3887810690/il_570xN.3887810690_pojq.jpg" },
  { id: "4", name: "Portable Espresso Maker", sales: 654, revenue: 58860, stock: 118, image: "/images/portable-espresso-maker.jpg" },
  { id: "5", name: "Smart Home Hub", sales: 541, revenue: 97380, stock: 67, image: "/images/smart-home-hub.jpg" },
];

const recentOrders: Order[] = [
  { id: "#ORD-8821", customer: "Sophia Williams", email: "sophia@example.com", date: "2024-12-14", status: "delivered", total: 249.99, items: 3 },
  { id: "#ORD-8820", customer: "James Carter", email: "james@example.com", date: "2024-12-14", status: "shipped", total: 89.00, items: 1 },
  { id: "#ORD-8819", customer: "Aisha Patel", email: "aisha@example.com", date: "2024-12-13", status: "processing", total: 412.50, items: 4 },
  { id: "#ORD-8818", customer: "Luca Rossi", email: "luca@example.com", date: "2024-12-13", status: "pending", total: 134.00, items: 2 },
  { id: "#ORD-8817", customer: "Emma Johnson", email: "emma@example.com", date: "2024-12-12", status: "delivered", total: 67.99, items: 1 },
  { id: "#ORD-8816", customer: "Noah Kim", email: "noah@example.com", date: "2024-12-12", status: "cancelled", total: 299.00, items: 2 },
  { id: "#ORD-8815", customer: "Olivia Chen", email: "olivia@example.com", date: "2024-12-11", status: "shipped", total: 178.50, items: 3 },
];

const recentCustomers: Customer[] = [
  { id: "c1", name: "Sophia Williams", email: "sophia@example.com", orders: 8, spent: 1240.50, joined: "2024-01-15", location: "New York, US" },
  { id: "c2", name: "James Carter", email: "james@example.com", orders: 3, spent: 389.00, joined: "2024-03-22", location: "London, UK" },
  { id: "c3", name: "Aisha Patel", email: "aisha@example.com", orders: 12, spent: 2180.75, joined: "2023-11-08", location: "Toronto, CA" },
  { id: "c4", name: "Luca Rossi", email: "luca@example.com", orders: 5, spent: 720.00, joined: "2024-06-01", location: "Milan, IT" },
];

const channelData = [
  { channel: "Online Store", value: 58 },
  { channel: "Social", value: 22 },
  { channel: "Email", value: 12 },
  { channel: "Referral", value: 8 },
];

const statCards = [
  {
    label: "Total Revenue",
    value: "$108,500",
    change: "+18.4%",
    positive: true,
    icon: DollarSign,
    sub: "vs last month",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Total Orders",
    value: "832",
    change: "+16.5%",
    positive: true,
    icon: ShoppingBag,
    sub: "vs last month",
    color: "bg-blue-50 text-blue-600",
  },
  {
    label: "Active Customers",
    value: "4,291",
    change: "+9.2%",
    positive: true,
    icon: Users,
    sub: "vs last month",
    color: "bg-violet-50 text-violet-600",
  },
  {
    label: "Avg. Order Value",
    value: "$130.41",
    change: "-2.1%",
    positive: false,
    icon: Activity,
    sub: "vs last month",
    color: "bg-amber-50 text-amber-600",
  },
];

function StatusBadge({ status }: { status: Order["status"] }) {
  const map: Record<Order["status"], { label: string; icon: React.ReactNode; cls: string }> = {
    pending: { label: "Pending", icon: <Clock className="w-3 h-3" />, cls: "bg-amber-50 text-amber-700 border-amber-200" },
    processing: { label: "Processing", icon: <AlertCircle className="w-3 h-3" />, cls: "bg-blue-50 text-blue-700 border-blue-200" },
    shipped: { label: "Shipped", icon: <Truck className="w-3 h-3" />, cls: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    delivered: { label: "Delivered", icon: <CheckCircle className="w-3 h-3" />, cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    cancelled: { label: "Cancelled", icon: <XCircle className="w-3 h-3" />, cls: "bg-red-50 text-red-700 border-red-200" },
  };
  const s = map[status] ?? map["pending"];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${s.cls}`}>
      {s.icon}
      {s.label}
    </span>
  );
}

function Avatar({ name, size = "sm" }: { name: string; size?: "sm" | "md" }) {
  const initials = (name ?? "?")
    .split(" ")
    .map((n) => n.charAt(0))
    .slice(0, 2)
    .join("");
  const colors = [
    "bg-violet-100 text-violet-700",
    "bg-blue-100 text-blue-700",
    "bg-emerald-100 text-emerald-700",
    "bg-amber-100 text-amber-700",
    "bg-rose-100 text-rose-700",
  ];
  const idx = (name ?? "").charCodeAt(0) % colors.length;
  const sz = size === "md" ? "w-9 h-9 text-sm" : "w-7 h-7 text-xs";
  return (
    <div className={`${sz} rounded-full ${colors[idx]} flex items-center justify-center font-semibold flex-shrink-0`}>
      {initials}
    </div>
  );
}

export default function DashboardPage() {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<"revenue" | "orders">("revenue");
  const [orderFilter, setOrderFilter] = useState<"all" | Order["status"]>("all");

  const filteredOrders =
    orderFilter === "all"
      ? recentOrders
      : recentOrders.filter((o) => o.status === orderFilter);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Page header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
                Dashboard
              </h1>
              <p className="text-sm text-neutral-500 mt-0.5">
                Welcome back. Here is what is happening with your store today.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard/orders"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-200 bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
              >
                <Package className="w-4 h-4" />
                View Orders
              </Link>
              <Link
                href="/dashboard/products"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#96BF48] hover:bg-[#5E8E3E] text-white text-sm font-semibold transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_4px_12px_-4px_rgba(150,191,72,0.4)]"
              >
                <BarChart2 className="w-4 h-4" />
                Add Product
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Stat cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                variants={scaleIn}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-8px_rgba(0,0,0,0.08)] flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-500">{card.label}</span>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${card.color}`}>
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold tracking-tight text-neutral-900">{card.value}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    {card.positive ? (
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5 text-red-400" />
                    )}
                    <span className={`text-xs font-semibold ${card.positive ? "text-emerald-600" : "text-red-500"}`}>
                      {card.change}
                    </span>
                    <span className="text-xs text-neutral-400">{card.sub}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Revenue chart + channel breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Area chart */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-8px_rgba(0,0,0,0.08)]"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-semibold text-neutral-900">Performance Overview</h2>
                <p className="text-xs text-neutral-400 mt-0.5">Full year 2024</p>
              </div>
              <div className="flex items-center gap-1 bg-neutral-100 rounded-xl p-1">
                {(["revenue", "orders"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 capitalize ${
                      activeTab === tab
                        ? "bg-white text-neutral-900 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
                        : "text-neutral-500 hover:text-neutral-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#96BF48" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#96BF48" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#a3a3a3" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#a3a3a3" }} axisLine={false} tickLine={false}
                  tickFormatter={(v) => activeTab === "revenue" ? `$${(v / 1000).toFixed(0)}k` : `${v}`}
                />
                <Tooltip
                  contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb", fontSize: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
                  formatter={(value: number) =>
                    activeTab === "revenue"
                      ? [`$${value.toLocaleString("en-US")}`, "Revenue"]
                      : [value, "Orders"]
                  }
                />
                <Area
                  type="monotone"
                  dataKey={activeTab}
                  stroke="#96BF48"
                  strokeWidth={2.5}
                  fill="url(#colorRevenue)"
                  dot={false}
                  activeDot={{ r: 5, fill: "#96BF48", strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Channel breakdown */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-8px_rgba(0,0,0,0.08)]"
          >
            <h2 className="text-base font-semibold text-neutral-900 mb-1">Sales Channels</h2>
            <p className="text-xs text-neutral-400 mb-6">Revenue share by source</p>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={channelData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="channel" tick={{ fontSize: 11, fill: "#737373" }} axisLine={false} tickLine={false} width={72} />
                <Tooltip
                  contentStyle={{ borderRadius: "10px", border: "1px solid #e5e7eb", fontSize: 12 }}
                  formatter={(v: number) => [`${v}%`, "Share"]}
                />
                <Bar dataKey="value" fill="#96BF48" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-6 space-y-3">
              {channelData.map((c) => (
                <div key={c.channel} className="flex items-center justify-between">
                  <span className="text-xs text-neutral-600">{c.channel}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 rounded-full bg-neutral-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#96BF48]"
                        style={{ width: `${c.value}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-neutral-700 w-8 text-right">{c.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Orders table */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="bg-white rounded-2xl border border-neutral-200 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-8px_rgba(0,0,0,0.08)] overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-neutral-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-neutral-900">Recent Orders</h2>
              <p className="text-xs text-neutral-400 mt-0.5">Latest transactions from your store</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {(["all", "pending", "processing", "shipped", "delivered", "cancelled"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setOrderFilter(f)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 capitalize ${
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
                <tr className="border-b border-neutral-100 bg-neutral-50/60">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-400 uppercase tracking-wide">Order</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-400 uppercase tracking-wide">Customer</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-400 uppercase tracking-wide hidden md:table-cell">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-400 uppercase tracking-wide">Status</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-neutral-400 uppercase tracking-wide hidden sm:table-cell">Items</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-neutral-400 uppercase tracking-wide">Total</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {(filteredOrders ?? []).map((order, i) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                    className="border-b border-neutral-50 hover:bg-neutral-50/80 transition-colors duration-150"
                  >
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs font-semibold text-neutral-700">{order.id}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={order.customer ?? ""} />
                        <div>
                          <p className="font-medium text-neutral-800 text-xs leading-tight">{order.customer}</p>
                          <p className="text-neutral-400 text-xs">{order.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="text-xs text-neutral-500">{order.date}</span>
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-4 py-4 text-right hidden sm:table-cell">
                      <span className="text-xs text-neutral-500">{order.items} item{order.items !== 1 ? "s" : ""}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-semibold text-neutral-900">${(order.total ?? 0).toFixed(2)}</span>
                    </td>
                    <td className="px-4 py-4">
                      <button className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors duration-150">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            {filteredOrders.length === 0 && (
              <div className="py-12 text-center text-sm text-neutral-400">No orders match this filter.</div>
            )}
          </div>
          <div className="px-6 py-4 border-t border-neutral-100 flex items-center justify-between">
            <span className="text-xs text-neutral-400">Showing {filteredOrders.length} of {recentOrders.length} orders</span>
            <Link
              href="/dashboard/orders"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5E8E3E] hover:text-[#96BF48] transition-colors duration-200"
            >
              View all orders <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>

        {/* Top products + recent customers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top products */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="bg-white rounded-2xl border border-neutral-200 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-8px_rgba(0,0,0,0.08)] overflow-hidden"
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
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="divide-y divide-neutral-50"
            >
              {topProducts.map((product, i) => (
                <motion.li
                  key={product.id}
                  variants={fadeInUp}
                  className="flex items-center gap-3 px-6 py-4 hover:bg-neutral-50/80 transition-colors duration-150"
                >
                  <span className="text-xs font-bold text-neutral-300 w-4 flex-shrink-0">{i + 1}</span>
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0">
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
                    <p className="text-xs font-semibold text-neutral-800 truncate">{product.name}</p>
                    <p className="text-xs text-neutral-400 mt-0.5">{product.sales.toLocaleString("en-US")} sold</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-bold text-neutral-900">${(product.revenue ?? 0).toLocaleString("en-US")}</p>
                    <p className="text-xs text-neutral-400">{product.stock} in stock</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Recent customers */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="bg-white rounded-2xl border border-neutral-200 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-8px_rgba(0,0,0,0.08)] overflow-hidden"
          >
            <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-neutral-900">Recent Customers</h2>
                <p className="text-xs text-neutral-400 mt-0.5">Newest members of your community</p>
              </div>
              <Link
                href="/dashboard/customers"
                className="text-xs font-semibold text-[#5E8E3E] hover:text-[#96BF48] transition-colors duration-200 flex items-center gap-1"
              >
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="divide-y divide-neutral-50"
            >
              {recentCustomers.map((customer) => (
                <motion.li
                  key={customer.id}
                  variants={fadeInUp}
                  className="flex items-center gap-3 px-6 py-4 hover:bg-neutral-50/80 transition-colors duration-150"
                >
                  <Avatar name={customer.name ?? ""} size="md" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-neutral-800">{customer.name}</p>
                    <p className="text-xs text-neutral-400 truncate">{customer.email}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-bold text-neutral-900">${(customer.spent ?? 0).toLocaleString("en-US")}</p>
                    <p className="text-xs text-neutral-400">{customer.orders} orders</p>
                  </div>
                  <button className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors duration-150 ml-1">
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </motion.li>
              ))}
            </motion.ul>
            <div className="px-6 py-4 border-t border-neutral-100">
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>4 new customers joined this week</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick links to sub-pages */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
        >
          {[
            { label: "Orders", href: "/dashboard/orders", icon: ShoppingBag, color: "text-blue-600 bg-blue-50" },
            { label: "Products", href: "/dashboard/products", icon: Package, color: "text-emerald-600 bg-emerald-50" },
            { label: "Customers", href: "/dashboard/customers", icon: Users, color: "text-violet-600 bg-violet-50" },
            { label: "Analytics", href: "/dashboard/analytics", icon: BarChart2, color: "text-amber-600 bg-amber-50" },
            { label: "Discounts", href: "/dashboard/discounts", icon: Star, color: "text-rose-600 bg-rose-50" },
            { label: "Settings", href: "/dashboard/settings", icon: Activity, color: "text-neutral-600 bg-neutral-100" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.label} variants={scaleIn} whileHover={{ y: -2, transition: { duration: 0.2 } }}>
                <Link
                  href={item.href}
                  className="flex flex-col items-center gap-2.5 p-4 bg-white rounded-2xl border border-neutral-200 hover:border-neutral-300 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.1)] transition-all duration-200 group"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
                    <Icon className="w-5 h-5" />
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