"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Eye, ArrowUpRight, ArrowDownRight, Calendar, Download, Filter } from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";

const revenueData = [
  { month: "Jan", revenue: 42000, orders: 310, visitors: 8200 },
  { month: "Feb", revenue: 38500, orders: 285, visitors: 7600 },
  { month: "Mar", revenue: 51200, orders: 390, visitors: 9800 },
  { month: "Apr", revenue: 47800, orders: 355, visitors: 9100 },
  { month: "May", revenue: 63400, orders: 480, visitors: 11400 },
  { month: "Jun", revenue: 58900, orders: 445, visitors: 10700 },
  { month: "Jul", revenue: 71200, orders: 530, visitors: 13200 },
  { month: "Aug", revenue: 68500, orders: 510, visitors: 12600 },
  { month: "Sep", revenue: 79800, orders: 595, visitors: 14900 },
  { month: "Oct", revenue: 84300, orders: 630, visitors: 15800 },
  { month: "Nov", revenue: 96700, orders: 720, visitors: 18200 },
  { month: "Dec", revenue: 112400, orders: 840, visitors: 21000 },
];

const channelData = [
  { name: "Organic Search", value: 38, color: "#96BF48" },
  { name: "Direct", value: 24, color: "#5E8E3E" },
  { name: "Social Media", value: 19, color: "#B8D96A" },
  { name: "Email", value: 12, color: "#3B6E2A" },
  { name: "Paid Ads", value: 7, color: "#D4EE9A" },
];

const topProducts = [
  { id: "1", name: "Wireless Noise-Cancelling Headphones", category: "Electronics", revenue: 28400, units: 142, growth: 18.4 },
  { id: "2", name: "Minimalist Leather Watch", category: "Accessories", revenue: 22100, units: 98, growth: 12.7 },
  { id: "3", name: "Ergonomic Office Chair", category: "Furniture", revenue: 19800, units: 66, growth: -3.2 },
  { id: "4", name: "Premium Yoga Mat", category: "Sports", revenue: 15600, units: 234, growth: 31.5 },
  { id: "5", name: "Stainless Steel Water Bottle", category: "Lifestyle", revenue: 12300, units: 410, growth: 8.9 },
  { id: "6", name: "Smart Home Speaker", category: "Electronics", revenue: 11700, units: 78, growth: -1.4 },
];

const conversionData = [
  { stage: "Visitors", count: 142000, pct: 100 },
  { stage: "Product Views", count: 68400, pct: 48.2 },
  { stage: "Add to Cart", count: 21300, pct: 15.0 },
  { stage: "Checkout", count: 9800, pct: 6.9 },
  { stage: "Purchased", count: 7560, pct: 5.3 },
];

const statCards = [
  {
    id: "revenue",
    label: "Total Revenue",
    value: "$784,200",
    change: "+22.4%",
    positive: true,
    icon: DollarSign,
    sub: "vs last year",
  },
  {
    id: "orders",
    label: "Total Orders",
    value: "6,088",
    change: "+18.1%",
    positive: true,
    icon: ShoppingCart,
    sub: "vs last year",
  },
  {
    id: "customers",
    label: "New Customers",
    value: "3,412",
    change: "+9.7%",
    positive: true,
    icon: Users,
    sub: "vs last year",
  },
  {
    id: "visitors",
    label: "Store Visitors",
    value: "142,500",
    change: "-2.3%",
    positive: false,
    icon: Eye,
    sub: "vs last year",
  },
];

const RANGES = ["7D", "30D", "90D", "1Y"] as const;
type Range = (typeof RANGES)[number];

export default function AnalyticsPage() {
  const t = useTranslations();
  const [activeRange, setActiveRange] = useState<Range>("1Y");
  const [activeChart, setActiveChart] = useState<"revenue" | "orders" | "visitors">("revenue");

  const chartKey = activeChart as keyof (typeof revenueData)[0];

  const displayData =
    activeRange === "7D"
      ? revenueData.slice(-2)
      : activeRange === "30D"
      ? revenueData.slice(-3)
      : activeRange === "90D"
      ? revenueData.slice(-6)
      : revenueData;

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
              Analytics
            </h1>
            <p className="text-neutral-500 text-sm mt-1">
              Track your store performance and growth trends.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors duration-200 shadow-sm">
              <Calendar className="w-4 h-4" />
              Jan 1 – Dec 31, 2024
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#96BF48] hover:bg-[#5E8E3E] rounded-xl transition-colors duration-200 shadow-sm">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </motion.div>

        {/* Stat Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                variants={scaleIn}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl border border-neutral-100 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)]"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#96BF48]/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#5E8E3E]" />
                  </div>
                  <span
                    className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                      card.positive
                        ? "text-emerald-700 bg-emerald-50"
                        : "text-red-600 bg-red-50"
                    }`}
                  >
                    {card.positive ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {card.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-neutral-900 tracking-tight">
                  {card.value}
                </p>
                <p className="text-sm text-neutral-500 mt-0.5">{card.label}</p>
                <p className="text-xs text-neutral-400 mt-1">{card.sub}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Chart */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="bg-white rounded-2xl border border-neutral-100 p-6 mb-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-base font-semibold text-neutral-900">
                Performance Over Time
              </h2>
              <p className="text-sm text-neutral-500 mt-0.5">
                Revenue, orders, and visitor trends
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {/* Metric toggle */}
              <div className="flex items-center bg-neutral-100 rounded-xl p-1 gap-1">
                {(["revenue", "orders", "visitors"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setActiveChart(m)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 capitalize ${
                      activeChart === m
                        ? "bg-white text-neutral-900 shadow-sm"
                        : "text-neutral-500 hover:text-neutral-700"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              {/* Range toggle */}
              <div className="flex items-center bg-neutral-100 rounded-xl p-1 gap-1">
                {RANGES.map((r) => (
                  <button
                    key={r}
                    onClick={() => setActiveRange(r)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                      activeRange === r
                        ? "bg-white text-neutral-900 shadow-sm"
                        : "text-neutral-500 hover:text-neutral-700"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={displayData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#96BF48" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#96BF48" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) =>
                  activeChart === "revenue"
                    ? `$${(v / 1000).toFixed(0)}k`
                    : v >= 1000
                    ? `${(v / 1000).toFixed(0)}k`
                    : String(v)
                }
              />
              <Tooltip
                contentStyle={{
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  fontSize: "13px",
                  boxShadow: "0 4px 16px -4px rgba(0,0,0,0.12)",
                }}
                formatter={(value: number) =>
                  activeChart === "revenue"
                    ? [`$${value.toLocaleString("en-US")}`, "Revenue"]
                    : [value.toLocaleString("en-US"), activeChart === "orders" ? "Orders" : "Visitors"]
                }
              />
              <Area
                type="monotone"
                dataKey={chartKey}
                stroke="#96BF48"
                strokeWidth={2.5}
                fill="url(#colorMetric)"
                dot={false}
                activeDot={{ r: 5, fill: "#5E8E3E", strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Two-column: Bar chart + Pie chart */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
          {/* Monthly Orders Bar */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-3 bg-white rounded-2xl border border-neutral-100 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)]"
          >
            <h2 className="text-base font-semibold text-neutral-900 mb-1">
              Monthly Orders
            </h2>
            <p className="text-sm text-neutral-500 mb-5">
              Order volume by month across 2024
            </p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={revenueData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    fontSize: "13px",
                    boxShadow: "0 4px 16px -4px rgba(0,0,0,0.12)",
                  }}
                  formatter={(value: number) => [value.toLocaleString("en-US"), "Orders"]}
                />
                <Bar dataKey="orders" fill="#96BF48" radius={[6, 6, 0, 0]} maxBarSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Traffic Channels Pie */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-2 bg-white rounded-2xl border border-neutral-100 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)]"
          >
            <h2 className="text-base font-semibold text-neutral-900 mb-1">
              Traffic Channels
            </h2>
            <p className="text-sm text-neutral-500 mb-4">
              Where your visitors come from
            </p>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={channelData}
                  cx="50%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={72}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {channelData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    fontSize: "13px",
                  }}
                  formatter={(value: number) => [`${value}%`, "Share"]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {channelData.map((ch) => (
                <div key={ch.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ background: ch.color }}
                    />
                    <span className="text-neutral-600">{ch.name}</span>
                  </div>
                  <span className="font-semibold text-neutral-900">{ch.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Conversion Funnel + Top Products */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
          {/* Conversion Funnel */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-2 bg-white rounded-2xl border border-neutral-100 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)]"
          >
            <h2 className="text-base font-semibold text-neutral-900 mb-1">
              Conversion Funnel
            </h2>
            <p className="text-sm text-neutral-500 mb-5">
              Visitor to purchase journey
            </p>
            <div className="space-y-3">
              {conversionData.map((stage, i) => (
                <div key={stage.stage}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-neutral-700 font-medium">
                      {stage.stage}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-neutral-400">
                        {stage.count.toLocaleString("en-US")}
                      </span>
                      <span className="text-xs font-semibold text-neutral-700">
                        {stage.pct}%
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${stage.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ background: i === 0 ? "#96BF48" : `rgba(150,191,72,${1 - i * 0.15})` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-neutral-100">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-500">Overall conversion rate</span>
                <span className="text-lg font-bold text-[#5E8E3E]">5.3%</span>
              </div>
            </div>
          </motion.div>

          {/* Top Products Table */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-3 bg-white rounded-2xl border border-neutral-100 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)]"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-base font-semibold text-neutral-900">
                  Top Products
                </h2>
                <p className="text-sm text-neutral-500 mt-0.5">
                  Best performers by revenue
                </p>
              </div>
              <button className="flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-800 transition-colors px-3 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50">
                <Filter className="w-3.5 h-3.5" />
                Filter
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-100">
                    <th className="text-left text-xs font-semibold text-neutral-400 uppercase tracking-wide pb-3 pr-4">
                      Product
                    </th>
                    <th className="text-right text-xs font-semibold text-neutral-400 uppercase tracking-wide pb-3 pr-4">
                      Revenue
                    </th>
                    <th className="text-right text-xs font-semibold text-neutral-400 uppercase tracking-wide pb-3 pr-4">
                      Units
                    </th>
                    <th className="text-right text-xs font-semibold text-neutral-400 uppercase tracking-wide pb-3">
                      Growth
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((product, i) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06, duration: 0.35, ease: "easeOut" }}
                      className="border-b border-neutral-50 hover:bg-neutral-50/60 transition-colors duration-150"
                    >
                      <td className="py-3 pr-4">
                        <div>
                          <p className="font-medium text-neutral-800 leading-snug">
                            {product.name}
                          </p>
                          <p className="text-xs text-neutral-400 mt-0.5">
                            {product.category}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-right font-semibold text-neutral-900">
                        ${(product.revenue ?? 0).toLocaleString("en-US")}
                      </td>
                      <td className="py-3 pr-4 text-right text-neutral-600">
                        {(product.units ?? 0).toLocaleString("en-US")}
                      </td>
                      <td className="py-3 text-right">
                        <span
                          className={`inline-flex items-center gap-0.5 text-xs font-semibold ${
                            product.growth >= 0
                              ? "text-emerald-600"
                              : "text-red-500"
                          }`}
                        >
                          {product.growth >= 0 ? (
                            <TrendingUp className="w-3.5 h-3.5" />
                          ) : (
                            <TrendingDown className="w-3.5 h-3.5" />
                          )}
                          {product.growth >= 0 ? "+" : ""}
                          {(product.growth ?? 0).toFixed(1)}%
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Summary insight strip */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            {
              id: "aov",
              label: "Avg. Order Value",
              value: "$128.80",
              detail: "Up $14 from last year",
              positive: true,
            },
            {
              id: "clv",
              label: "Customer Lifetime Value",
              value: "$342.50",
              detail: "Based on repeat purchase rate",
              positive: true,
            },
            {
              id: "churn",
              label: "Cart Abandonment Rate",
              value: "64.7%",
              detail: "Industry avg. is 69.8%",
              positive: true,
            },
          ].map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl border border-neutral-100 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)]"
            >
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-2">
                {item.label}
              </p>
              <p className="text-3xl font-bold text-neutral-900 tracking-tight">
                {item.value}
              </p>
              <p className="text-sm text-neutral-500 mt-1.5 flex items-center gap-1">
                {item.positive ? (
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                )}
                {item.detail}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}