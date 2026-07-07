"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Search, SlidersHorizontal, Grid3X3, List, Star, Heart, ShoppingCart, ChevronDown, X, ArrowUpDown, Tag, Filter } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

const ALL_PRODUCTS = [
  {
    id: "1",
    slug: "classic-white-tee",
    name: "Classic White Tee",
    price: 29.99,
    compareAtPrice: 39.99,
    description: "Premium cotton everyday essential with a relaxed fit.",
    category: "Apparel",
    tags: ["basics", "cotton", "unisex"],
    image: "https://shopredone.com/cdn/shop/files/024-2WSC1-CLASSIC-TEE-OPTIUC-WHITE_2.jpg?v=1742502940&width=1500",
    stock: 142,
    rating: 4.8,
    reviewCount: 312,
    featured: true,
    badge: "Best Seller",
  },
  {
    id: "2",
    slug: "leather-crossbody-bag",
    name: "Leather Crossbody Bag",
    price: 119.0,
    compareAtPrice: undefined,
    description: "Full-grain leather with adjustable strap and brass hardware.",
    category: "Accessories",
    tags: ["leather", "bag", "everyday"],
    image: "https://urbansouthern.com/cdn/shop/files/23_urbanorchard0044.jpg?v=1714567205&width=1946",
    stock: 38,
    rating: 4.9,
    reviewCount: 187,
    featured: true,
    badge: "New",
  },
  {
    id: "3",
    slug: "minimalist-desk-lamp",
    name: "Minimalist Desk Lamp",
    price: 74.95,
    compareAtPrice: 89.95,
    description: "Adjustable arm, warm/cool LED, USB-C charging base.",
    category: "Home",
    tags: ["lighting", "desk", "modern"],
    image: "https://m.media-amazon.com/images/I/61H49SeYn3L._AC_UF894,1000_QL80_.jpg",
    stock: 55,
    rating: 4.6,
    reviewCount: 98,
    featured: false,
    badge: "Sale",
  },
  {
    id: "4",
    slug: "wireless-noise-cancelling-headphones",
    name: "Wireless Noise-Cancelling Headphones",
    price: 249.0,
    compareAtPrice: 299.0,
    description: "40-hour battery, adaptive ANC, premium sound profile.",
    category: "Electronics",
    tags: ["audio", "wireless", "premium"],
    image: "https://m.media-amazon.com/images/I/71YM2N5whtL.jpg",
    stock: 21,
    rating: 4.7,
    reviewCount: 543,
    featured: true,
    badge: "Sale",
  },
  {
    id: "5",
    slug: "ceramic-pour-over-coffee-set",
    name: "Ceramic Pour-Over Coffee Set",
    price: 58.0,
    compareAtPrice: undefined,
    description: "Handcrafted ceramic dripper, carafe, and two mugs.",
    category: "Kitchen",
    tags: ["coffee", "ceramic", "handmade"],
    image: "https://m.media-amazon.com/images/I/7159+ELcEOL._AC_UF894,1000_QL80_.jpg",
    stock: 67,
    rating: 4.9,
    reviewCount: 221,
    featured: false,
    badge: undefined,
  },
  {
    id: "6",
    slug: "slim-fit-chino-pants",
    name: "Slim Fit Chino Pants",
    price: 64.99,
    compareAtPrice: 79.99,
    description: "Stretch-cotton blend, tapered leg, available in 6 colors.",
    category: "Apparel",
    tags: ["pants", "chino", "slim"],
    image: "https://picsum.photos/seed/88548b7e84b4/800/600",
    stock: 89,
    rating: 4.5,
    reviewCount: 156,
    featured: false,
    badge: "Sale",
  },
  {
    id: "7",
    slug: "stainless-steel-water-bottle",
    name: "Stainless Steel Water Bottle",
    price: 34.95,
    compareAtPrice: undefined,
    description: "Triple-wall insulation, 24 oz, keeps cold 36 hours.",
    category: "Accessories",
    tags: ["hydration", "eco", "outdoor"],
    image: "https://picsum.photos/seed/f2e6e4bc1ee9/800/600",
    stock: 203,
    rating: 4.7,
    reviewCount: 408,
    featured: false,
    badge: "Best Seller",
  },
  {
    id: "8",
    slug: "linen-throw-blanket",
    name: "Linen Throw Blanket",
    price: 89.0,
    compareAtPrice: undefined,
    description: "Stonewashed European linen, 50x70 in, naturally breathable.",
    category: "Home",
    tags: ["linen", "cozy", "natural"],
    image: "https://m.media-amazon.com/images/I/71EUmwZhM6L.jpg",
    stock: 44,
    rating: 4.8,
    reviewCount: 134,
    featured: false,
    badge: "New",
  },
  {
    id: "9",
    slug: "mechanical-keyboard-compact",
    name: "Compact Mechanical Keyboard",
    price: 139.0,
    compareAtPrice: 159.0,
    description: "75% layout, hot-swap switches, per-key RGB, USB-C.",
    category: "Electronics",
    tags: ["keyboard", "mechanical", "productivity"],
    image: "https://cdn.thewirecutter.com/wp-content/media/2025/03/BEST-COMPACT-MECHANICAL-KEYBOARD-2048px-6780.jpg?width=2048&quality=60&crop=2048:1365&auto=webp",
    stock: 30,
    rating: 4.6,
    reviewCount: 275,
    featured: true,
    badge: "Sale",
  },
  {
    id: "10",
    slug: "natural-soy-candle-set",
    name: "Natural Soy Candle Set",
    price: 42.0,
    compareAtPrice: undefined,
    description: "Set of 3 hand-poured soy candles, 40-hour burn each.",
    category: "Home",
    tags: ["candle", "soy", "gift"],
    image: "https://lovery.com/cdn/shop/files/121_fc70862e-d690-4eb5-9bec-9f8ef7ff1fb5.jpg?v=1699415474&width=1946",
    stock: 78,
    rating: 4.9,
    reviewCount: 189,
    featured: false,
    badge: undefined,
  },
  {
    id: "11",
    slug: "running-shoes-lightweight",
    name: "Lightweight Running Shoes",
    price: 124.95,
    compareAtPrice: 149.95,
    description: "Responsive foam midsole, breathable mesh upper, 7.2 oz.",
    category: "Footwear",
    tags: ["running", "shoes", "sport"],
    image: "/images/lightweight-running-shoes.jpg",
    stock: 56,
    rating: 4.7,
    reviewCount: 362,
    featured: true,
    badge: "Sale",
  },
  {
    id: "12",
    slug: "bamboo-cutting-board-set",
    name: "Bamboo Cutting Board Set",
    price: 47.0,
    compareAtPrice: undefined,
    description: "Set of 3 sizes, juice groove, antimicrobial bamboo.",
    category: "Kitchen",
    tags: ["bamboo", "kitchen", "eco"],
    image: "/images/bamboo-cutting-board-set.jpg",
    stock: 91,
    rating: 4.6,
    reviewCount: 143,
    featured: false,
    badge: undefined,
  },
];

const CATEGORIES = ["All", "Apparel", "Accessories", "Electronics", "Home", "Kitchen", "Footwear"];
const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Best Rating", value: "rating" },
  { label: "Most Reviews", value: "reviews" },
  { label: "Newest", value: "newest" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-neutral-200 text-neutral-200"
          }`}
        />
      ))}
    </div>
  );
}

type Product = (typeof ALL_PRODUCTS)[number];

function ProductCard({ product, view }: { product: Product; view: "grid" | "list" }) {
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  const discount =
    product.compareAtPrice
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : null;

  if (view === "list") {
    return (
      <motion.div
        variants={fadeInUp}
        whileHover={{ y: -2 }}
        className="group bg-white rounded-2xl border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] overflow-hidden flex gap-0 transition-shadow duration-300 hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.14)]"
      >
        <Link href={`/products/${product.slug}`} className="relative w-40 sm:w-52 flex-shrink-0 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.badge && (
            <span className="absolute top-2 left-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-[#96BF48] text-white">
              {product.badge}
            </span>
          )}
        </Link>
        <div className="flex flex-col justify-between p-5 flex-1 min-w-0">
          <div>
            <span className="text-xs font-medium text-[#5E8E3E] uppercase tracking-wide">{product.category}</span>
            <Link href={`/products/${product.slug}`}>
              <h3 className="text-neutral-900 font-semibold text-base mt-0.5 hover:text-[#5E8E3E] transition-colors duration-200 line-clamp-1">
                {product.name}
              </h3>
            </Link>
            <p className="text-neutral-500 text-sm mt-1 line-clamp-2 leading-relaxed">{product.description}</p>
            <div className="flex items-center gap-2 mt-2">
              <StarRating rating={product.rating} />
              <span className="text-xs text-neutral-400">({product.reviewCount})</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-neutral-900">${product.price.toFixed(2)}</span>
              {product.compareAtPrice && (
                <span className="text-sm text-neutral-400 line-through">${product.compareAtPrice.toFixed(2)}</span>
              )}
              {discount && (
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                  -{discount}%
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setWished((w) => !w)}
                className={`p-2 rounded-xl border transition-all duration-200 ${
                  wished
                    ? "border-rose-200 bg-rose-50 text-rose-500"
                    : "border-neutral-200 text-neutral-400 hover:border-rose-200 hover:text-rose-400"
                }`}
              >
                <Heart className={`w-4 h-4 ${wished ? "fill-rose-500" : ""}`} />
              </button>
              <button
                onClick={handleAdd}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  added
                    ? "bg-emerald-500 text-white"
                    : "bg-[#96BF48] hover:bg-[#5E8E3E] text-white"
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                {added ? "Added!" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -4 }}
      className="group bg-white rounded-2xl border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] overflow-hidden transition-shadow duration-300 hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.16)]"
    >
      <Link href={`/products/${product.slug}`} className="relative block overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {product.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold rounded-full bg-[#96BF48] text-white shadow-sm">
            {product.badge}
          </span>
        )}
        {discount && (
          <span className="absolute top-3 right-3 px-2 py-0.5 text-xs font-bold rounded-full bg-white text-emerald-600 shadow-sm">
            -{discount}%
          </span>
        )}
        <button
          onClick={(e) => { e.preventDefault(); setWished((w) => !w); }}
          className={`absolute bottom-3 right-3 p-2 rounded-xl backdrop-blur-sm transition-all duration-200 opacity-0 group-hover:opacity-100 ${
            wished
              ? "bg-rose-500 text-white"
              : "bg-white/90 text-neutral-500 hover:text-rose-500"
          }`}
        >
          <Heart className={`w-4 h-4 ${wished ? "fill-white" : ""}`} />
        </button>
      </Link>
      <div className="p-4">
        <span className="text-xs font-medium text-[#5E8E3E] uppercase tracking-wide">{product.category}</span>
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-neutral-900 font-semibold text-sm mt-0.5 hover:text-[#5E8E3E] transition-colors duration-200 line-clamp-2 leading-snug">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1.5 mt-2">
          <StarRating rating={product.rating} />
          <span className="text-xs text-neutral-400">({product.reviewCount})</span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-neutral-900">${product.price.toFixed(2)}</span>
            {product.compareAtPrice && (
              <span className="text-xs text-neutral-400 line-through">${product.compareAtPrice.toFixed(2)}</span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
              added
                ? "bg-emerald-500 text-white"
                : "bg-[#96BF48] hover:bg-[#5E8E3E] text-white"
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            {added ? "Added!" : "Add"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductsPage() {
  const t = useTranslations();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortOpen, setSortOpen] = useState(false);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);

  const filtered = useMemo(() => {
    let list = [...ALL_PRODUCTS];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((tag) => tag.includes(q))
      );
    }

    if (category !== "All") {
      list = list.filter((p) => p.category === category);
    }

    if (onSaleOnly) {
      list = list.filter((p) => p.compareAtPrice !== undefined);
    }

    if (inStockOnly) {
      list = list.filter((p) => p.stock > 0);
    }

    const minVal = parseFloat(priceMin);
    const maxVal = parseFloat(priceMax);
    if (!isNaN(minVal)) list = list.filter((p) => p.price >= minVal);
    if (!isNaN(maxVal)) list = list.filter((p) => p.price <= maxVal);

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "reviews":
        list.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "newest":
        list.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      default:
        list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return list;
  }, [search, category, sort, priceMin, priceMax, onSaleOnly, inStockOnly]);

  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === sort)?.label ?? "Featured";

  function clearFilters() {
    setSearch("");
    setCategory("All");
    setPriceMin("");
    setPriceMax("");
    setOnSaleOnly(false);
    setInStockOnly(false);
    setSort("featured");
  }

  const hasActiveFilters =
    search.trim() !== "" ||
    category !== "All" ||
    priceMin !== "" ||
    priceMax !== "" ||
    onSaleOnly ||
    inStockOnly;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Page header */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="bg-white border-b border-neutral-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <motion.div variants={fadeInUp} initial="hidden" animate="visible">
            <div className="flex items-center gap-2 text-sm text-neutral-500 mb-3">
              <Link href="/" className="hover:text-[#5E8E3E] transition-colors duration-200">Home</Link>
              <span>/</span>
              <span className="text-neutral-900 font-medium">All Products</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 text-balance">
              All Products
            </h1>
            <p className="text-neutral-500 mt-2 text-base leading-relaxed max-w-xl">
              Browse our full catalog. Free shipping on orders over $75. New arrivals every week.
            </p>
          </motion.div>

          {/* Category pills */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-2 mt-6"
          >
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                variants={fadeInUp}
                onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                  category === cat
                    ? "bg-[#96BF48] text-white border-[#96BF48] shadow-sm"
                    : "bg-white text-neutral-600 border-neutral-200 hover:border-[#96BF48] hover:text-[#5E8E3E]"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-[#96BF48] focus:ring-2 focus:ring-[#96BF48]/20 transition-all duration-200"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter toggle (mobile) */}
          <button
            onClick={() => setFilterOpen((o) => !o)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-sm font-medium text-neutral-700 hover:border-[#96BF48] hover:text-[#5E8E3E] transition-all duration-200 sm:hidden"
          >
            <Filter className="w-4 h-4" />
            Filters
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[#96BF48]" />
            )}
          </button>

          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortOpen((o) => !o)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-sm font-medium text-neutral-700 hover:border-[#96BF48] hover:text-[#5E8E3E] transition-all duration-200 whitespace-nowrap"
            >
              <ArrowUpDown className="w-4 h-4" />
              {currentSortLabel}
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`} />
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-xl border border-neutral-100 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.16)] z-20 overflow-hidden">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setSort(opt.value); setSortOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 ${
                      sort === opt.value
                        ? "bg-[#96BF48]/10 text-[#5E8E3E] font-semibold"
                        : "text-neutral-700 hover:bg-neutral-50"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-1 p-1 bg-white rounded-xl border border-neutral-200">
            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded-lg transition-all duration-200 ${
                view === "grid" ? "bg-[#96BF48] text-white shadow-sm" : "text-neutral-400 hover:text-neutral-700"
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2 rounded-lg transition-all duration-200 ${
                view === "list" ? "bg-[#96BF48] text-white shadow-sm" : "text-neutral-400 hover:text-neutral-700"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar filters (desktop) */}
          <aside className="hidden sm:block w-56 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] p-5 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-neutral-900 flex items-center gap-1.5">
                  <SlidersHorizontal className="w-4 h-4 text-[#96BF48]" />
                  Filters
                </h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-[#5E8E3E] hover:underline font-medium"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Price range */}
              <div className="mb-5">
                <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">Price Range</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    placeholder="Min"
                    className="w-full px-3 py-2 rounded-lg border border-neutral-200 text-xs text-neutral-900 placeholder-neutral-400 outline-none focus:border-[#96BF48] transition-colors duration-200"
                  />
                  <span className="text-neutral-400 text-xs">to</span>
                  <input
                    type="number"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    placeholder="Max"
                    className="w-full px-3 py-2 rounded-lg border border-neutral-200 text-xs text-neutral-900 placeholder-neutral-400 outline-none focus:border-[#96BF48] transition-colors duration-200"
                  />
                </div>
              </div>

              {/* Availability */}
              <div className="mb-5">
                <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">Availability</h3>
                <label className="flex items-center gap-2 cursor-pointer mb-2">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 rounded border-neutral-300 accent-[#96BF48]"
                  />
                  <span className="text-sm text-neutral-700">In Stock Only</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onSaleOnly}
                    onChange={(e) => setOnSaleOnly(e.target.checked)}
                    className="w-4 h-4 rounded border-neutral-300 accent-[#96BF48]"
                  />
                  <span className="text-sm text-neutral-700">On Sale</span>
                </label>
              </div>

              {/* Category */}
              <div>
                <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">Category</h3>
                <div className="flex flex-col gap-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`text-left px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                        category === cat
                          ? "bg-[#96BF48]/10 text-[#5E8E3E] font-semibold"
                          : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile filter panel */}
          {filterOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="sm:hidden fixed inset-0 z-40 bg-black/40"
              onClick={() => setFilterOpen(false)}
            >
              <div
                className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-semibold text-neutral-900">Filters</h2>
                  <button onClick={() => setFilterOpen(false)}>
                    <X className="w-5 h-5 text-neutral-500" />
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">Price Range</h3>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={priceMin}
                        onChange={(e) => setPriceMin(e.target.value)}
                        placeholder="Min"
                        className="w-full px-3 py-2 rounded-lg border border-neutral-200 text-sm outline-none focus:border-[#96BF48]"
                      />
                      <span className="text-neutral-400 text-sm">to</span>
                      <input
                        type="number"
                        value={priceMax}
                        onChange={(e) => setPriceMax(e.target.value)}
                        placeholder="Max"
                        className="w-full px-3 py-2 rounded-lg border border-neutral-200 text-sm outline-none focus:border-[#96BF48]"
                      />
                    </div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="w-4 h-4 accent-[#96BF48]"
                    />
                    <span className="text-sm text-neutral-700">In Stock Only</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={onSaleOnly}
                      onChange={(e) => setOnSaleOnly(e.target.checked)}
                      className="w-4 h-4 accent-[#96BF48]"
                    />
                    <span className="text-sm text-neutral-700">On Sale</span>
                  </label>
                  <button
                    onClick={() => { clearFilters(); setFilterOpen(false); }}
                    className="mt-2 w-full py-2.5 rounded-xl bg-[#96BF48] text-white font-semibold text-sm"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {/* Results count + active filters */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-neutral-500">
                <span className="font-semibold text-neutral-900">{filtered.length}</span> products
                {category !== "All" && (
                  <span> in <span className="text-[#5E8E3E] font-medium">{category}</span></span>
                )}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-xs text-neutral-500 hover:text-rose-500 transition-colors duration-200"
                >
                  <X className="w-3.5 h-3.5" />
                  Clear filters
                </button>
              )}
            </div>

            {filtered.length === 0 ? (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mb-4">
                  <Tag className="w-8 h-8 text-neutral-300" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-1">No products found</h3>
                <p className="text-neutral-500 text-sm mb-4">Try adjusting your search or filters.</p>
                <button
                  onClick={clearFilters}
                  className="px-5 py-2 rounded-xl bg-[#96BF48] text-white text-sm font-semibold hover:bg-[#5E8E3E] transition-colors duration-200"
                >
                  Clear all filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={`${view}-${category}-${sort}`}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className={
                  view === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                    : "flex flex-col gap-4"
                }
              >
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} view={view} />
                ))}
              </motion.div>
            )}

            {/* Load more */}
            {filtered.length > 0 && (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex justify-center mt-12"
              >
                <button className="px-8 py-3 rounded-xl border-2 border-[#96BF48] text-[#5E8E3E] font-semibold text-sm hover:bg-[#96BF48] hover:text-white transition-all duration-200">
                  Load More Products
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Promo banner */}
      <motion.section
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-16 bg-gradient-to-r from-[#5E8E3E] to-[#96BF48] py-12"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h2 className="text-white text-2xl font-bold tracking-tight">Free shipping on orders over $75</h2>
            <p className="text-white/80 mt-1 text-sm">Plus free returns within 30 days. No questions asked.</p>
          </div>
          <Link
            href="/cart"
            className="px-7 py-3 bg-white text-[#5E8E3E] font-semibold rounded-xl text-sm hover:bg-neutral-50 transition-colors duration-200 shadow-sm whitespace-nowrap"
          >
            Shop Now
          </Link>
        </div>
      </motion.section>
    </div>
  );
}