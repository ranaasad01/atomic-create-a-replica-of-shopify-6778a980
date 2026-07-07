"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Users, Search, Filter, Download, ChevronDown, ChevronUp, ArrowUpDown, Mail, MapPin, ShoppingBag, TrendingUp, UserPlus, Star, MoreHorizontal, Eye, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
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
import { type Customer } from "@/lib/data";

const mockCustomers: Customer[] = [
  { id: "C001", name: "Emma Thompson", email: "emma.thompson@email.com", orders: 14, spent: 2340.5, joined: "2023-01-15", location: "New York, US" },
  { id: "C002", name: "Liam Chen", email: "liam.chen@email.com", orders: 8, spent: 1120.0, joined: "2023-03-22", location: "San Francisco, US" },
  { id: "C003", name: "Sofia Martinez", email: "sofia.martinez@email.com", orders: 21, spent: 4780.75, joined: "2022-11-08", location: "Miami, US" },
  { id: "C004", name: "Noah Williams", email: "noah.williams@email.com", orders: 5, spent: 640.25, joined: "2023-06-01", location: "Chicago, US" },
  { id: "C005", name: "Olivia Johnson", email: "olivia.j@email.com", orders: 33, spent: 7210.0, joined: "2022-07-19", location: "Austin, US" },
  { id: "C006", name: "James Brown", email: "james.brown@email.com", orders: 2, spent: 189.99, joined: "2024-01-03", location: "Seattle, US" },
  { id: "C007", name: "Ava Davis", email: "ava.davis@email.com", orders: 17, spent: 3450.6, joined: "2022-09-14", location: "Boston, US" },
  { id: "C008", name: "William Garcia", email: "w.garcia@email.com", orders: 9, spent: 1890.4, joined: "2023-04-27", location: "Denver, US" },
  { id: "C009", name: "Isabella Wilson", email: "isabella.w@email.com", orders: 6, spent: 920.15, joined: "2023-08-11", location: "Portland, US" },
  { id: "C010", name: "Ethan Moore", email: "ethan.moore@email.com", orders: 28, spent: 5670.3, joined: "2022-05-30", location: "Nashville, US" },
  { id: "C011", name: "Mia Taylor", email: "mia.taylor@email.com", orders: 11, spent: 2100.0, joined: "2023-02-18", location: "Phoenix, US" },
  { id: "C012", name: "Alexander Anderson", email: "alex.a@email.com", orders: 4, spent: 510.8, joined: "2023-10-05", location: "Las Vegas, US" },
  { id: "C013", name: "Charlotte Thomas", email: "charlotte.t@email.com", orders: 19, spent: 3980.45, joined: "2022-12-22", location: "Atlanta, US" },
  { id: "C014", name: "Benjamin Jackson", email: "ben.jackson@email.com", orders: 7, spent: 1340.0, joined: "2023-05-14", location: "Dallas, US" },
  { id: "C015", name: "Amelia White", email: "amelia.white@email.com", orders: 25, spent: 5120.9, joined: "2022-08-03", location: "Los Angeles, US" },
];

const growthData = [
  { month: "Jul", customers: 1240, newCustomers: 180 },
  { month: "Aug", customers: 1380, newCustomers: 210 },
  { month: "Sep", customers: 1520, newCustomers: 195 },
  { month: "Oct", customers: 1690, newCustomers: 230 },
  { month: "Nov", customers: 1850, newCustomers: 260 },
  { month: "Dec", customers: 2010, newCustomers: 290 },
  { month: "Jan", customers: 2180, newCustomers: 245 },
];

const spendingData = [
  { range: "$0-50", count: 320 },
  { range: "$51-200", count: 540 },
  { range: "$201-500", count: 410 },
  { range: "$501-1k", count: 280 },
  { range: "$1k-5k", count: 190 },
  { range: "$5k+", count: 65 },
];

const statCards = [
  { label: "Total Customers", value: "2,184", change: "+12.4%", positive: true, icon: Users, color: "bg-blue-50 text-blue-600" },
  { label: "New This Month", value: "245", change: "+8.1%", positive: true, icon: UserPlus, color: "bg-green-50 text-green-600" },
  { label: "Avg. Order Value", value: "$94.20", change: "+3.7%", positive: true, icon: ShoppingBag, color: "bg-purple-50 text-purple-600" },
  { label: "Repeat Rate", value: "68.3%", change: "-1.2%", positive: false, icon: TrendingUp, color: "bg-amber-50 text-amber-600" },
];

type SortField = "name" | "orders" | "spent" | "joined";
type SortDir = "asc" | "desc";

function getInitials(name: string) {
  const parts = (name ?? "").split(" ");
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
}

function formatCurrency(val: number) {
  return (val ?? 0).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function getTier(spent: number): { label: string; color: string } {
  if (spent >= 5000) return { label: "VIP", color: "bg-amber-100 text-amber-700" };
  if (spent >= 2000) return { label: "Gold", color: "bg-yellow-100 text-yellow-700" };
  if (spent >= 500) return { label: "Silver", color: "bg-slate-100 text-slate-600" };
  return { label: "Bronze", color: "bg-orange-50 text-orange-600" };
}

const AVATAR_COLORS = [
  "bg-violet-500", "bg-blue-500", "bg-emerald-500", "bg-rose-500",
  "bg-amber-500", "bg-cyan-500", "bg-pink-500", "bg-indigo-500",
];

function avatarColor(id: string) {
  const idx = parseInt(id.replace("C", ""), 10) % AVATAR_COLORS.length;
  return AVATAR_COLORS[idx] ?? "bg-neutral-400";
}

export default function CustomersPage() {
  const t = useTranslations();

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("spent");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [tierFilter, setTierFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const PAGE_SIZE = 8;

  const filtered = useMemo(() => {
    let rows = [...mockCustomers];
    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q)
      );
    }
    if (tierFilter !== "All") {
      rows = rows.filter((c) => getTier(c.spent).label === tierFilter);
    }
    rows.sort((a, b) => {
      let av: number | string = a[sortField];
      let bv: number | string = b[sortField];
      if (sortField === "name") {
        av = a.name.toLowerCase();
        bv = b.name.toLowerCase();
      }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return rows;
  }, [search, sortField, sortDir, tierFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function toggleSort(field: SortField) {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("desc");
    }
    setPage(1);
  }

  function SortIcon({ field }: { field: SortField }) {
    if (sortField !== field) return <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />;
    return sortDir === "asc"
      ? <ChevronUp className="w-3.5 h-3.5 text-[#5E8E3E]" />
      : <ChevronDown className="w-3.5 h-3.5 text-[#5E8E3E]" />;
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <div className="flex items-center gap-2 text-sm text-neutral-500 mb-1">
              <Link href="/dashboard" className="hover:text-[#5E8E3E] transition-colors">Dashboard</Link>
              <span>/</span>
              <span className="text-neutral-800 font-medium">Customers</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Customers</h1>
            <p className="text-neutral-500 text-sm mt-0.5">Manage and analyze your customer base</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-200 bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#96BF48] hover:bg-[#5E8E3E] text-white text-sm font-semibold transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_4px_12px_-4px_rgba(150,191,72,0.4)]">
              <UserPlus className="w-4 h-4" />
              Add Customer
            </button>
          </div>
        </motion.div>

        {/* Stat Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                variants={scaleIn}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl border border-neutral-100 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.06)]"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${card.color}`}>
                    <Icon className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${card.positive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
                    {card.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-neutral-900 tracking-tight">{card.value}</p>
                <p className="text-xs text-neutral-500 mt-0.5">{card.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Charts Row */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
        >
          {/* Growth Chart */}
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-2 bg-white rounded-2xl border border-neutral-100 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.06)]"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-semibold text-neutral-900">Customer Growth</h2>
                <p className="text-xs text-neutral-500 mt-0.5">Total and new customers over 7 months</p>
              </div>
              <span className="text-xs font-medium text-[#5E8E3E] bg-[#96BF48]/10 px-2.5 py-1 rounded-full">Last 7 months</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={growthData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="totalGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#96BF48" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#96BF48" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="newGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5E8E3E" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#5E8E3E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
                  cursor={{ stroke: "#96BF48", strokeWidth: 1, strokeDasharray: "4 4" }}
                />
                <Area type="monotone" dataKey="customers" stroke="#96BF48" strokeWidth={2} fill="url(#totalGrad)" name="Total" />
                <Area type="monotone" dataKey="newCustomers" stroke="#5E8E3E" strokeWidth={2} fill="url(#newGrad)" name="New" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Spending Distribution */}
          <motion.div
            variants={fadeInUp}
            className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.06)]"
          >
            <div className="mb-6">
              <h2 className="text-base font-semibold text-neutral-900">Spending Tiers</h2>
              <p className="text-xs text-neutral-500 mt-0.5">Customers by lifetime spend</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={spendingData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="range" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
                  cursor={{ fill: "#96BF48", fillOpacity: 0.08 }}
                />
                <Bar dataKey="count" fill="#96BF48" radius={[6, 6, 0, 0]} name="Customers" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </motion.div>

        {/* Top Customers Spotlight */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.06)] mb-8"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-semibold text-neutral-900">Top Customers</h2>
              <p className="text-xs text-neutral-500 mt-0.5">Highest lifetime value this year</p>
            </div>
            <Star className="w-4 h-4 text-amber-400" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[...mockCustomers]
              .sort((a, b) => b.spent - a.spent)
              .slice(0, 3)
              .map((c, i) => {
                const tier = getTier(c.spent);
                return (
                  <motion.div
                    key={c.id}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-neutral-50 border border-neutral-100 hover:border-[#96BF48]/40 transition-all duration-200"
                  >
                    <div className="relative flex-shrink-0">
                      <div className={`w-11 h-11 rounded-full ${avatarColor(c.id)} flex items-center justify-center text-white font-bold text-sm`}>
                        {getInitials(c.name)}
                      </div>
                      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                        {i + 1}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-neutral-900 truncate">{c.name}</p>
                      <p className="text-xs text-neutral-500 truncate">{c.location}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-bold text-[#5E8E3E]">{formatCurrency(c.spent)}</span>
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${tier.color}`}>{tier.label}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </motion.div>

        {/* Customer Table */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="bg-white rounded-2xl border border-neutral-100 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.06)]"
        >
          {/* Table Header Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 border-b border-neutral-100">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search customers..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-neutral-200 text-sm text-neutral-800 placeholder-neutral-400 outline-none focus:border-[#96BF48] focus:ring-2 focus:ring-[#96BF48]/10 transition-all duration-200"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-neutral-100 rounded-xl p-1">
                {["All", "VIP", "Gold", "Silver", "Bronze"].map((tier) => (
                  <button
                    key={tier}
                    onClick={() => { setTierFilter(tier); setPage(1); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                      tierFilter === tier
                        ? "bg-white text-neutral-900 shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
                        : "text-neutral-500 hover:text-neutral-700"
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-neutral-200 text-sm text-neutral-600 hover:bg-neutral-50 transition-all duration-200">
                <Filter className="w-3.5 h-3.5" />
                Filter
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-100">
                  <th className="text-left px-5 py-3">
                    <button
                      onClick={() => toggleSort("name")}
                      className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 uppercase tracking-wide hover:text-neutral-800 transition-colors"
                    >
                      Customer <SortIcon field="name" />
                    </button>
                  </th>
                  <th className="text-left px-4 py-3 hidden md:table-cell">
                    <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">Location</span>
                  </th>
                  <th className="text-left px-4 py-3">
                    <button
                      onClick={() => toggleSort("orders")}
                      className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 uppercase tracking-wide hover:text-neutral-800 transition-colors"
                    >
                      Orders <SortIcon field="orders" />
                    </button>
                  </th>
                  <th className="text-left px-4 py-3">
                    <button
                      onClick={() => toggleSort("spent")}
                      className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 uppercase tracking-wide hover:text-neutral-800 transition-colors"
                    >
                      Spent <SortIcon field="spent" />
                    </button>
                  </th>
                  <th className="text-left px-4 py-3 hidden lg:table-cell">
                    <button
                      onClick={() => toggleSort("joined")}
                      className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 uppercase tracking-wide hover:text-neutral-800 transition-colors"
                    >
                      Joined <SortIcon field="joined" />
                    </button>
                  </th>
                  <th className="text-left px-4 py-3">
                    <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">Tier</span>
                  </th>
                  <th className="px-4 py-3 w-10"></th>
                </tr>
              </thead>
              <motion.tbody
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-16 text-neutral-400 text-sm">
                      No customers match your search.
                    </td>
                  </tr>
                ) : (
                  paginated.map((customer) => {
                    const tier = getTier(customer.spent);
                    return (
                      <motion.tr
                        key={customer.id}
                        variants={fadeInUp}
                        className="border-b border-neutral-50 hover:bg-neutral-50/70 transition-colors duration-150 group"
                      >
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-full ${avatarColor(customer.id)} flex items-center justify-center text-white font-semibold text-xs flex-shrink-0`}>
                              {getInitials(customer.name)}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-neutral-900 truncate">{customer.name}</p>
                              <p className="text-xs text-neutral-500 truncate flex items-center gap-1">
                                <Mail className="w-3 h-3 flex-shrink-0" />
                                {customer.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 hidden md:table-cell">
                          <span className="flex items-center gap-1.5 text-sm text-neutral-600">
                            <MapPin className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
                            {customer.location}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-1.5">
                            <ShoppingBag className="w-3.5 h-3.5 text-neutral-400" />
                            <span className="text-sm font-medium text-neutral-800">{customer.orders}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="text-sm font-semibold text-neutral-900">{formatCurrency(customer.spent)}</span>
                        </td>
                        <td className="px-4 py-3.5 hidden lg:table-cell">
                          <span className="text-sm text-neutral-600">{formatDate(customer.joined)}</span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tier.color}`}>{tier.label}</span>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="relative">
                            <button
                              onClick={() => setOpenMenuId(openMenuId === customer.id ? null : customer.id)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-all duration-150 opacity-0 group-hover:opacity-100"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                            {openMenuId === customer.id && (
                              <div className="absolute right-0 top-8 z-20 bg-white rounded-xl border border-neutral-200 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.12)] py-1 w-36">
                                <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors">
                                  <Eye className="w-3.5 h-3.5" /> View Profile
                                </button>
                                <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors">
                                  <Edit className="w-3.5 h-3.5" /> Edit
                                </button>
                                <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors">
                                  <Trash2 className="w-3.5 h-3.5" /> Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })
                )}
              </motion.tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-5 py-4 border-t border-neutral-100">
            <p className="text-xs text-neutral-500">
              Showing <span className="font-semibold text-neutral-700">{Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}</span>
              {" "}to{" "}
              <span className="font-semibold text-neutral-700">{Math.min(page * PAGE_SIZE, filtered.length)}</span>
              {" "}of{" "}
              <span className="font-semibold text-neutral-700">{filtered.length}</span> customers
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-8 h-8 rounded-lg flex items-center justify-center border border-neutral-200 text-neutral-600 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-all duration-150 ${
                    page === p
                      ? "bg-[#96BF48] text-white shadow-[0_2px_8px_-2px_rgba(150,191,72,0.5)]"
                      : "border border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-8 h-8 rounded-lg flex items-center justify-center border border-neutral-200 text-neutral-600 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
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