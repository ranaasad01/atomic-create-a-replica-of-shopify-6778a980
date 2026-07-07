"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Search, Plus, Filter, MoreHorizontal, Edit, Trash2, Eye, Package, TrendingUp, TrendingDown, Star, ChevronDown, ChevronUp, ArrowUpDown, Tag, AlertCircle, CheckCircle, XCircle, Download, Upload, Copy, BarChart2 } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

const mockProducts = [
  {
    id: "prod_001",
    name: "Wireless Noise-Cancelling Headphones",
    sku: "WNC-HP-001",
    category: "Electronics",
    price: 299.99,
    compareAtPrice: 349.99,
    stock: 142,
    status: "active" as const,
    image: "https://m.media-amazon.com/images/I/71YM2N5whtL.jpg",
    rating: 4.8,
    reviewCount: 312,
    sales: 1840,
    revenue: 551760,
    tags: ["audio", "wireless", "premium"],
    vendor: "SoundTech",
    createdAt: "2024-01-15",
  },
  {
    id: "prod_002",
    name: "Minimalist Leather Watch",
    sku: "MLW-002",
    category: "Accessories",
    price: 189.0,
    compareAtPrice: 220.0,
    stock: 58,
    status: "active" as const,
    image: "https://i.etsystatic.com/11276331/r/il/0d5206/3887810690/il_570xN.3887810690_pojq.jpg",
    rating: 4.6,
    reviewCount: 198,
    sales: 920,
    revenue: 173880,
    tags: ["watch", "leather", "fashion"],
    vendor: "TimeCraft",
    createdAt: "2024-02-03",
  },
  {
    id: "prod_003",
    name: "Ergonomic Office Chair",
    sku: "EOC-003",
    category: "Furniture",
    price: 449.0,
    compareAtPrice: undefined,
    stock: 23,
    status: "active" as const,
    image: "https://technimobili.com/cdn/shop/files/RTA-3263C-BK-01.jpg?v=1740778095&width=1780",
    rating: 4.7,
    reviewCount: 87,
    sales: 340,
    revenue: 152660,
    tags: ["office", "ergonomic", "seating"],
    vendor: "ComfortWorks",
    createdAt: "2024-02-18",
  },
  {
    id: "prod_004",
    name: "Portable Espresso Maker",
    sku: "PEM-004",
    category: "Kitchen",
    price: 79.99,
    compareAtPrice: 99.99,
    stock: 0,
    status: "out_of_stock" as const,
    image: "/images/portable-espresso-maker.jpg",
    rating: 4.4,
    reviewCount: 256,
    sales: 2100,
    revenue: 167979,
    tags: ["coffee", "portable", "kitchen"],
    vendor: "BrewCo",
    createdAt: "2024-01-28",
  },
  {
    id: "prod_005",
    name: "Merino Wool Crew Neck Sweater",
    sku: "MWS-005",
    category: "Apparel",
    price: 129.0,
    compareAtPrice: 159.0,
    stock: 204,
    status: "active" as const,
    image: "/images/merino-wool-crew-neck-sweater.jpg",
    rating: 4.9,
    reviewCount: 143,
    sales: 780,
    revenue: 100620,
    tags: ["wool", "sweater", "winter"],
    vendor: "NordicThread",
    createdAt: "2024-03-05",
  },
  {
    id: "prod_006",
    name: "Smart Home Hub",
    sku: "SHH-006",
    category: "Electronics",
    price: 149.99,
    compareAtPrice: undefined,
    stock: 11,
    status: "low_stock" as const,
    image: "/images/smart-home-hub-device.jpg",
    rating: 4.3,
    reviewCount: 421,
    sales: 1560,
    revenue: 233984,
    tags: ["smart home", "iot", "tech"],
    vendor: "NexaHome",
    createdAt: "2024-01-10",
  },
  {
    id: "prod_007",
    name: "Bamboo Yoga Mat",
    sku: "BYM-007",
    category: "Sports",
    price: 64.99,
    compareAtPrice: 79.99,
    stock: 317,
    status: "active" as const,
    image: "/images/bamboo-yoga-mat.jpg",
    rating: 4.7,
    reviewCount: 509,
    sales: 3200,
    revenue: 207968,
    tags: ["yoga", "eco", "fitness"],
    vendor: "ZenGear",
    createdAt: "2024-02-22",
  },
  {
    id: "prod_008",
    name: "Ceramic Pour-Over Coffee Set",
    sku: "CPC-008",
    category: "Kitchen",
    price: 54.99,
    compareAtPrice: undefined,
    stock: 0,
    status: "draft" as const,
    image: "https://m.media-amazon.com/images/I/7159+ELcEOL._AC_UF894,1000_QL80_.jpg",
    rating: 0,
    reviewCount: 0,
    sales: 0,
    revenue: 0,
    tags: ["coffee", "ceramic", "kitchen"],
    vendor: "BrewCo",
    createdAt: "2024-03-20",
  },
];

const statCards = [
  {
    label: "Total Products",
    value: "8",
    change: "+3 this month",
    trend: "up" as const,
    icon: Package,
    color: "text-[#96BF48]",
    bg: "bg-[#96BF48]/10",
  },
  {
    label: "Active Listings",
    value: "5",
    change: "2 need attention",
    trend: "neutral" as const,
    icon: CheckCircle,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    label: "Total Revenue",
    value: "$1.59M",
    change: "+18.4% vs last month",
    trend: "up" as const,
    icon: TrendingUp,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    label: "Out of Stock",
    value: "2",
    change: "Restock needed",
    trend: "down" as const,
    icon: AlertCircle,
    color: "text-red-500",
    bg: "bg-red-50",
  },
];

const CATEGORIES = ["All", "Electronics", "Accessories", "Furniture", "Kitchen", "Apparel", "Sports"];
const STATUSES = ["All", "active", "low_stock", "out_of_stock", "draft"];

type SortKey = "name" | "price" | "stock" | "sales" | "revenue";
type SortDir = "asc" | "desc";

const statusConfig = {
  active: { label: "Active", color: "bg-emerald-100 text-emerald-700", icon: CheckCircle },
  low_stock: { label: "Low Stock", color: "bg-amber-100 text-amber-700", icon: AlertCircle },
  out_of_stock: { label: "Out of Stock", color: "bg-red-100 text-red-600", icon: XCircle },
  draft: { label: "Draft", color: "bg-neutral-100 text-neutral-500", icon: Edit },
};

export default function DashboardProductsPage() {
  const t = useTranslations();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortKey, setSortKey] = useState<SortKey>("revenue");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  const filtered = useMemo(() => {
    let rows = [...mockProducts];
    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.vendor.toLowerCase().includes(q)
      );
    }
    if (category !== "All") rows = rows.filter((p) => p.category === category);
    if (statusFilter !== "All") rows = rows.filter((p) => p.status === statusFilter);
    rows.sort((a, b) => {
      const av = a[sortKey] ?? 0;
      const bv = b[sortKey] ?? 0;
      if (typeof av === "string" && typeof bv === "string") {
        return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      }
      return sortDir === "asc" ? (av as number) - (bv as number) : (bv as number) - (av as number);
    });
    return rows;
  }, [search, category, statusFilter, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  function toggleSelect(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function toggleSelectAll() {
    if (selectedIds.length === filtered.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map((p) => p.id));
    }
  }

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return <ArrowUpDown className="w-3.5 h-3.5 opacity-40" />;
    return sortDir === "asc" ? (
      <ChevronUp className="w-3.5 h-3.5 text-[#96BF48]" />
    ) : (
      <ChevronDown className="w-3.5 h-3.5 text-[#96BF48]" />
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Page Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <div className="flex items-center gap-2 text-sm text-neutral-500 mb-1">
              <Link href="/dashboard" className="hover:text-[#96BF48] transition-colors">Dashboard</Link>
              <span>/</span>
              <span className="text-neutral-800 font-medium">Products</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Products</h1>
            <p className="text-neutral-500 text-sm mt-0.5">Manage your product catalog, inventory, and listings.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-neutral-600 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-all duration-200 shadow-sm">
              <Upload className="w-4 h-4" />
              Import
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-neutral-600 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-all duration-200 shadow-sm">
              <Download className="w-4 h-4" />
              Export
            </button>
            <Link
              href="/dashboard/products"
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-[#96BF48] hover:bg-[#5E8E3E] rounded-xl transition-all duration-200 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Add Product
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
                  <div className={`w-9 h-9 rounded-xl ${card.bg} flex items-center justify-center`}>
                    <Icon className={`w-4.5 h-4.5 ${card.color}`} style={{ width: 18, height: 18 }} />
                  </div>
                  {card.trend === "up" && <TrendingUp className="w-4 h-4 text-emerald-500" />}
                  {card.trend === "down" && <TrendingDown className="w-4 h-4 text-red-400" />}
                </div>
                <div className="text-2xl font-bold text-neutral-900 tracking-tight">{card.value}</div>
                <div className="text-xs text-neutral-500 mt-0.5">{card.label}</div>
                <div className={`text-xs mt-1.5 font-medium ${card.trend === "up" ? "text-emerald-600" : card.trend === "down" ? "text-red-500" : "text-amber-600"}`}>
                  {card.change}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Filters & Search Bar */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl border border-neutral-100 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.06)] mb-4"
        >
          <div className="p-4 flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products, SKU, vendor..."
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-[#96BF48] focus:ring-2 focus:ring-[#96BF48]/10 transition-all duration-200 placeholder-neutral-400"
              />
            </div>
            {/* Category */}
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-[#96BF48] transition-all duration-200 text-neutral-700 cursor-pointer"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
            </div>
            {/* Status */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-[#96BF48] transition-all duration-200 text-neutral-700 cursor-pointer"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s === "All" ? "All Statuses" : statusConfig[s as keyof typeof statusConfig]?.label ?? s}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
            </div>
            {/* View toggle */}
            <div className="flex items-center gap-1 bg-neutral-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode("table")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${viewMode === "table" ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-700"}`}
              >
                Table
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${viewMode === "grid" ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-700"}`}
              >
                Grid
              </button>
            </div>
          </div>

          {/* Bulk action bar */}
          {selectedIds.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-neutral-100 px-4 py-3 flex items-center gap-3 bg-[#96BF48]/5"
            >
              <span className="text-sm font-medium text-neutral-700">{selectedIds.length} selected</span>
              <button className="text-xs px-3 py-1.5 bg-white border border-neutral-200 rounded-lg text-neutral-600 hover:bg-neutral-50 transition-colors">
                Set Active
              </button>
              <button className="text-xs px-3 py-1.5 bg-white border border-neutral-200 rounded-lg text-neutral-600 hover:bg-neutral-50 transition-colors">
                Set Draft
              </button>
              <button className="text-xs px-3 py-1.5 bg-red-50 border border-red-200 rounded-lg text-red-600 hover:bg-red-100 transition-colors">
                Delete
              </button>
              <button
                onClick={() => setSelectedIds([])}
                className="ml-auto text-xs text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                Clear
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Table View */}
        {viewMode === "table" && (
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-2xl border border-neutral-100 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.06)] overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-100 bg-neutral-50/60">
                    <th className="pl-4 pr-2 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedIds.length === filtered.length && filtered.length > 0}
                        onChange={toggleSelectAll}
                        className="rounded border-neutral-300 accent-[#96BF48] cursor-pointer"
                      />
                    </th>
                    <th className="px-3 py-3 text-left font-semibold text-neutral-600 text-xs uppercase tracking-wide">
                      <button onClick={() => toggleSort("name")} className="flex items-center gap-1 hover:text-neutral-900 transition-colors">
                        Product <SortIcon col="name" />
                      </button>
                    </th>
                    <th className="px-3 py-3 text-left font-semibold text-neutral-600 text-xs uppercase tracking-wide hidden md:table-cell">Status</th>
                    <th className="px-3 py-3 text-left font-semibold text-neutral-600 text-xs uppercase tracking-wide hidden lg:table-cell">Category</th>
                    <th className="px-3 py-3 text-right font-semibold text-neutral-600 text-xs uppercase tracking-wide">
                      <button onClick={() => toggleSort("price")} className="flex items-center gap-1 ml-auto hover:text-neutral-900 transition-colors">
                        Price <SortIcon col="price" />
                      </button>
                    </th>
                    <th className="px-3 py-3 text-right font-semibold text-neutral-600 text-xs uppercase tracking-wide hidden sm:table-cell">
                      <button onClick={() => toggleSort("stock")} className="flex items-center gap-1 ml-auto hover:text-neutral-900 transition-colors">
                        Stock <SortIcon col="stock" />
                      </button>
                    </th>
                    <th className="px-3 py-3 text-right font-semibold text-neutral-600 text-xs uppercase tracking-wide hidden xl:table-cell">
                      <button onClick={() => toggleSort("sales")} className="flex items-center gap-1 ml-auto hover:text-neutral-900 transition-colors">
                        Sales <SortIcon col="sales" />
                      </button>
                    </th>
                    <th className="px-3 py-3 text-right font-semibold text-neutral-600 text-xs uppercase tracking-wide hidden xl:table-cell">
                      <button onClick={() => toggleSort("revenue")} className="flex items-center gap-1 ml-auto hover:text-neutral-900 transition-colors">
                        Revenue <SortIcon col="revenue" />
                      </button>
                    </th>
                    <th className="px-3 py-3 text-right font-semibold text-neutral-600 text-xs uppercase tracking-wide hidden lg:table-cell">Rating</th>
                    <th className="pl-2 pr-4 py-3"></th>
                  </tr>
                </thead>
                <motion.tbody variants={staggerContainer} initial="hidden" animate="visible">
                  {filtered.map((product) => {
                    const sc = statusConfig[product.status];
                    const StatusIcon = sc.icon;
                    const isSelected = selectedIds.includes(product.id);
                    return (
                      <motion.tr
                        key={product.id}
                        variants={fadeInUp}
                        className={`border-b border-neutral-50 hover:bg-neutral-50/70 transition-colors duration-150 ${isSelected ? "bg-[#96BF48]/5" : ""}`}
                      >
                        <td className="pl-4 pr-2 py-3.5">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelect(product.id)}
                            className="rounded border-neutral-300 accent-[#96BF48] cursor-pointer"
                          />
                        </td>
                        <td className="px-3 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0 border border-neutral-100">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).src = "";
                                  (e.currentTarget as HTMLImageElement).style.display = "none";
                                }}
                              />
                            </div>
                            <div className="min-w-0">
                              <div className="font-medium text-neutral-900 truncate max-w-[180px]">{product.name}</div>
                              <div className="text-xs text-neutral-400 mt-0.5">{product.sku}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3.5 hidden md:table-cell">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${sc.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            {sc.label}
                          </span>
                        </td>
                        <td className="px-3 py-3.5 hidden lg:table-cell">
                          <span className="text-xs px-2.5 py-1 bg-neutral-100 text-neutral-600 rounded-full font-medium">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-3 py-3.5 text-right">
                          <div className="font-semibold text-neutral-900">${(product.price ?? 0).toFixed(2)}</div>
                          {product.compareAtPrice != null && (
                            <div className="text-xs text-neutral-400 line-through">${product.compareAtPrice.toFixed(2)}</div>
                          )}
                        </td>
                        <td className="px-3 py-3.5 text-right hidden sm:table-cell">
                          <span className={`font-medium ${product.stock === 0 ? "text-red-500" : product.stock < 20 ? "text-amber-600" : "text-neutral-700"}`}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="px-3 py-3.5 text-right hidden xl:table-cell">
                          <span className="text-neutral-700">{(product.sales ?? 0).toLocaleString("en-US")}</span>
                        </td>
                        <td className="px-3 py-3.5 text-right hidden xl:table-cell">
                          <span className="font-medium text-neutral-900">
                            ${(product.revenue ?? 0).toLocaleString("en-US")}
                          </span>
                        </td>
                        <td className="px-3 py-3.5 text-right hidden lg:table-cell">
                          {product.reviewCount > 0 ? (
                            <div className="flex items-center justify-end gap-1">
                              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                              <span className="text-neutral-700 text-xs font-medium">{product.rating}</span>
                              <span className="text-neutral-400 text-xs">({product.reviewCount})</span>
                            </div>
                          ) : (
                            <span className="text-neutral-300 text-xs">No reviews</span>
                          )}
                        </td>
                        <td className="pl-2 pr-4 py-3.5">
                          <div className="relative">
                            <button
                              onClick={() => setOpenMenuId(openMenuId === product.id ? null : product.id)}
                              className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                            {openMenuId === product.id && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: -4 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                className="absolute right-0 top-8 z-20 bg-white border border-neutral-100 rounded-xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.12)] w-40 py-1"
                              >
                                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors">
                                  <Eye className="w-3.5 h-3.5" /> View
                                </button>
                                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors">
                                  <Edit className="w-3.5 h-3.5" /> Edit
                                </button>
                                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors">
                                  <Copy className="w-3.5 h-3.5" /> Duplicate
                                </button>
                                <div className="border-t border-neutral-100 my-1" />
                                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors">
                                  <Trash2 className="w-3.5 h-3.5" /> Delete
                                </button>
                              </motion.div>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </motion.tbody>
              </table>
            </div>

            {filtered.length === 0 && (
              <div className="py-16 text-center">
                <Package className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
                <p className="text-neutral-500 font-medium">No products found</p>
                <p className="text-neutral-400 text-sm mt-1">Try adjusting your search or filters.</p>
              </div>
            )}

            {/* Table footer */}
            <div className="border-t border-neutral-100 px-4 py-3 flex items-center justify-between text-xs text-neutral-500">
              <span>Showing {filtered.length} of {mockProducts.length} products</span>
              <div className="flex items-center gap-1">
                <button className="px-2.5 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors disabled:opacity-40" disabled>
                  Previous
                </button>
                <button className="px-2.5 py-1.5 rounded-lg bg-[#96BF48] text-white font-medium">1</button>
                <button className="px-2.5 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors disabled:opacity-40" disabled>
                  Next
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Grid View */}
        {viewMode === "grid" && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filtered.map((product) => {
              const sc = statusConfig[product.status];
              const StatusIcon = sc.icon;
              return (
                <motion.div
                  key={product.id}
                  variants={scaleIn}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="bg-white rounded-2xl border border-neutral-100 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.06)] overflow-hidden group"
                >
                  <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${sc.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {sc.label}
                      </span>
                    </div>
                    <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button className="w-7 h-7 bg-white rounded-lg shadow-sm flex items-center justify-center text-neutral-600 hover:text-[#96BF48] transition-colors">
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-semibold text-neutral-900 text-sm leading-snug line-clamp-2">{product.name}</h3>
                        <p className="text-xs text-neutral-400 mt-0.5">{product.sku}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div>
                        <span className="font-bold text-neutral-900">${(product.price ?? 0).toFixed(2)}</span>
                        {product.compareAtPrice != null && (
                          <span className="text-xs text-neutral-400 line-through ml-1.5">${product.compareAtPrice.toFixed(2)}</span>
                        )}
                      </div>
                      <span className={`text-xs font-medium ${product.stock === 0 ? "text-red-500" : product.stock < 20 ? "text-amber-600" : "text-neutral-500"}`}>
                        {product.stock === 0 ? "Out of stock" : `${product.stock} in stock`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-neutral-50">
                      <div className="flex items-center gap-1">
                        {product.reviewCount > 0 ? (
                          <>
                            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                            <span className="text-xs text-neutral-600 font-medium">{product.rating}</span>
                            <span className="text-xs text-neutral-400">({product.reviewCount})</span>
                          </>
                        ) : (
                          <span className="text-xs text-neutral-400">No reviews yet</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <BarChart2 className="w-3.5 h-3.5 text-neutral-400" />
                        <span className="text-xs text-neutral-500">{(product.sales ?? 0).toLocaleString("en-US")} sold</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {filtered.length === 0 && (
              <div className="col-span-full py-16 text-center">
                <Package className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
                <p className="text-neutral-500 font-medium">No products found</p>
                <p className="text-neutral-400 text-sm mt-1">Try adjusting your search or filters.</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Category breakdown */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-8 bg-white rounded-2xl border border-neutral-100 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.06)] p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-semibold text-neutral-900">Revenue by Category</h2>
              <p className="text-xs text-neutral-400 mt-0.5">Lifetime revenue breakdown across product categories</p>
            </div>
            <Tag className="w-4 h-4 text-neutral-400" />
          </div>
          <div className="space-y-3">
            {[
              { category: "Electronics", revenue: 785744, color: "bg-[#96BF48]" },
              { category: "Sports", revenue: 207968, color: "bg-blue-400" },
              { category: "Furniture", revenue: 152660, color: "bg-purple-400" },
              { category: "Kitchen", revenue: 167979, color: "bg-amber-400" },
              { category: "Accessories", revenue: 173880, color: "bg-pink-400" },
              { category: "Apparel", revenue: 100620, color: "bg-teal-400" },
            ].map((row) => {
              const total = 1588851;
              const pct = Math.round(((row.revenue ?? 0) / total) * 100);
              return (
                <div key={row.category} className="flex items-center gap-3">
                  <div className="w-24 text-sm text-neutral-600 font-medium flex-shrink-0">{row.category}</div>
                  <div className="flex-1 bg-neutral-100 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                      className={`h-full rounded-full ${row.color}`}
                    />
                  </div>
                  <div className="w-16 text-right text-sm font-semibold text-neutral-800">{pct}%</div>
                  <div className="w-24 text-right text-xs text-neutral-500 hidden sm:block">
                    ${(row.revenue ?? 0).toLocaleString("en-US")}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Low stock alert */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-5"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-amber-900 text-sm">Inventory Alert</h3>
              <p className="text-amber-700 text-xs mt-0.5 mb-3">
                3 products need your attention. Restock soon to avoid lost sales.
              </p>
              <div className="flex flex-wrap gap-2">
                {mockProducts
                  .filter((p) => p.status === "low_stock" || p.status === "out_of_stock")
                  .map((p) => (
                    <span
                      key={p.id}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border ${
                        p.status === "out_of_stock"
                          ? "bg-red-50 border-red-200 text-red-700"
                          : "bg-amber-100 border-amber-300 text-amber-800"
                      }`}
                    >
                      <span className="truncate max-w-[140px]">{p.name}</span>
                      <span className="font-bold">{p.stock === 0 ? "0" : p.stock} left</span>
                    </span>
                  ))}
              </div>
            </div>
            <button className="flex-shrink-0 text-xs font-semibold text-amber-700 hover:text-amber-900 transition-colors px-3 py-1.5 bg-amber-100 hover:bg-amber-200 rounded-lg">
              Restock All
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}