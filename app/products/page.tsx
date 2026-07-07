"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { Search, SlidersHorizontal, X, ChevronDown, ChevronRight, Star, Heart, ShoppingCart, Grid3X3, List, Package, Filter } from 'lucide-react';

type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  description: string;
  category: string;
  tags: string[];
  image: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
  stock: number;
  badge?: string;
};

const PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "wireless-noise-cancelling-headphones",
    name: "Wireless Noise-Cancelling Headphones",
    price: 299,
    compareAtPrice: 399,
    description: "Premium over-ear headphones with active noise cancellation and 30-hour battery life.",
    category: "Electronics",
    tags: ["audio", "wireless", "premium"],
    image: "https://m.media-amazon.com/images/I/71YM2N5whtL.jpg",
    rating: 4.8,
    reviewCount: 2341,
    featured: true,
    stock: 45,
    badge: "Sale",
  },
  {
    id: "2",
    slug: "minimalist-leather-watch",
    name: "Minimalist Leather Watch",
    price: 189,
    compareAtPrice: undefined,
    description: "Slim profile watch with genuine leather strap and sapphire crystal glass.",
    category: "Accessories",
    tags: ["watch", "leather", "minimalist"],
    image: "https://i.etsystatic.com/11276331/r/il/0d5206/3887810690/il_570xN.3887810690_pojq.jpg",
    rating: 4.6,
    reviewCount: 876,
    featured: true,
    stock: 12,
    badge: "Low Stock",
  },
  {
    id: "3",
    slug: "ergonomic-office-chair",
    name: "Ergonomic Office Chair",
    price: 549,
    compareAtPrice: 699,
    description: "Fully adjustable lumbar support chair designed for all-day comfort.",
    category: "Furniture",
    tags: ["office", "ergonomic", "chair"],
    image: "https://technimobili.com/cdn/shop/files/RTA-3263C-BK-01.jpg?v=1740778095&width=1780",
    rating: 4.7,
    reviewCount: 1203,
    featured: false,
    stock: 8,
    badge: "Sale",
  },
  {
    id: "4",
    slug: "ceramic-pour-over-coffee-set",
    name: "Ceramic Pour-Over Coffee Set",
    price: 79,
    compareAtPrice: undefined,
    description: "Handcrafted ceramic dripper and carafe for the perfect morning brew.",
    category: "Kitchen",
    tags: ["coffee", "ceramic", "handmade"],
    image: "https://m.media-amazon.com/images/I/7159+ELcEOL._AC_UF894,1000_QL80_.jpg",
    rating: 4.9,
    reviewCount: 543,
    featured: true,
    stock: 60,
    badge: "New",
  },
  {
    id: "5",
    slug: "merino-wool-crewneck-sweater",
    name: "Merino Wool Crewneck Sweater",
    price: 145,
    compareAtPrice: 180,
    description: "Ultra-soft 100% merino wool sweater, naturally temperature-regulating.",
    category: "Clothing",
    tags: ["wool", "sweater", "winter"],
    image: "/images/merino-wool-crewneck-sweater.jpg",
    rating: 4.5,
    reviewCount: 389,
    featured: false,
    stock: 34,
    badge: "Sale",
  },
  {
    id: "6",
    slug: "portable-bluetooth-speaker",
    name: "Portable Bluetooth Speaker",
    price: 129,
    compareAtPrice: undefined,
    description: "360-degree sound with 20-hour battery and IPX7 waterproof rating.",
    category: "Electronics",
    tags: ["audio", "bluetooth", "outdoor"],
    image: "/images/portable-bluetooth-speaker.jpg",
    rating: 4.4,
    reviewCount: 1876,
    featured: false,
    stock: 55,
  },
  {
    id: "7",
    slug: "natural-skincare-gift-set",
    name: "Natural Skincare Gift Set",
    price: 89,
    compareAtPrice: 110,
    description: "Curated set of organic serums, moisturizers, and cleansers for radiant skin.",
    category: "Beauty",
    tags: ["skincare", "organic", "gift"],
    image: "/images/natural-skincare-gift-set.jpg",
    rating: 4.7,
    reviewCount: 712,
    featured: true,
    stock: 28,
    badge: "Sale",
  },
  {
    id: "8",
    slug: "stainless-steel-water-bottle",
    name: "Stainless Steel Water Bottle",
    price: 45,
    compareAtPrice: undefined,
    description: "Double-wall vacuum insulation keeps drinks cold 24h or hot 12h.",
    category: "Kitchen",
    tags: ["hydration", "eco", "stainless"],
    image: "https://picsum.photos/seed/f2e6e4bc1ee9/800/600",
    rating: 4.8,
    reviewCount: 3201,
    featured: false,
    stock: 120,
    badge: "Best Seller",
  },
  {
    id: "9",
    slug: "yoga-mat-premium-grip",
    name: "Premium Grip Yoga Mat",
    price: 98,
    compareAtPrice: 120,
    description: "6mm thick non-slip mat with alignment lines and carrying strap.",
    category: "Sports",
    tags: ["yoga", "fitness", "mat"],
    image: "/images/yoga-mat-premium-grip.jpg",
    rating: 4.6,
    reviewCount: 945,
    featured: false,
    stock: 40,
    badge: "Sale",
  },
  {
    id: "10",
    slug: "mechanical-keyboard-compact",
    name: "Compact Mechanical Keyboard",
    price: 179,
    compareAtPrice: undefined,
    description: "75% layout with hot-swappable switches and per-key RGB backlighting.",
    category: "Electronics",
    tags: ["keyboard", "mechanical", "gaming"],
    image: "https://cdn.thewirecutter.com/wp-content/media/2025/03/BEST-COMPACT-MECHANICAL-KEYBOARD-2048px-6780.jpg?width=2048&quality=60&crop=2048:1365&auto=webp",
    rating: 4.7,
    reviewCount: 1542,
    featured: true,
    stock: 22,
    badge: "New",
  },
  {
    id: "11",
    slug: "linen-throw-blanket",
    name: "Stonewashed Linen Throw Blanket",
    price: 115,
    compareAtPrice: undefined,
    description: "Breathable, pre-washed linen throw in earthy tones for year-round comfort.",
    category: "Furniture",
    tags: ["linen", "home", "cozy"],
    image: "https://m.media-amazon.com/images/I/71EUmwZhM6L.jpg",
    rating: 4.5,
    reviewCount: 287,
    featured: false,
    stock: 18,
  },
  {
    id: "12",
    slug: "trail-running-shoes",
    name: "All-Terrain Trail Running Shoes",
    price: 165,
    compareAtPrice: 200,
    description: "Aggressive lug outsole with cushioned midsole for technical trail running.",
    category: "Sports",
    tags: ["running", "trail", "shoes"],
    image: "/images/trail-running-shoes.jpg",
    rating: 4.6,
    reviewCount: 634,
    featured: false,
    stock: 30,
    badge: "Sale",
  },
];

const CATEGORIES = ["All", "Electronics", "Accessories", "Furniture", "Kitchen", "Clothing", "Beauty", "Sports"];

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
];

const PRICE_RANGES = [
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 – $100", min: 50, max: 100 },
  { label: "$100 – $200", min: 100, max: 200 },
  { label: "$200+", min: 200, max: Infinity },
];

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${
              star <= Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-neutral-200 text-neutral-200"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-neutral-500">({(count ?? 0).toLocaleString("en-US")})</span>
    </div>
  );
}

function ProductCard({ product, view }: { product: Product; view: "grid" | "list" }) {
  const [wished, setWished] = useState(false);
  const discount =
    product.compareAtPrice
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : null;

  if (view === "list") {
    return (
      <motion.div
        variants={fadeInUp}
        whileHover={{ y: -2 }}
        className="group bg-white rounded-2xl border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] overflow-hidden flex gap-0 hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.14)] transition-all duration-300"
      >
        <div className="relative w-48 shrink-0 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.badge && (
            <span
              className={`absolute top-3 left-3 text-xs font-semibold px-2 py-0.5 rounded-full ${
                product.badge === "Sale"
                  ? "bg-red-500 text-white"
                  : product.badge === "New"
                  ? "bg-[#96BF48] text-white"
                  : product.badge === "Best Seller"
                  ? "bg-amber-500 text-white"
                  : "bg-neutral-800 text-white"
              }`}
            >
              {product.badge}
            </span>
          )}
        </div>
        <div className="flex flex-col justify-between p-5 flex-1">
          <div>
            <p className="text-xs text-neutral-400 font-medium uppercase tracking-wide mb-1">{product.category}</p>
            <Link href={`/products/${product.slug}`}>
              <h3 className="text-neutral-900 font-semibold text-base leading-snug hover:text-[#5E8E3E] transition-colors duration-200 mb-2">
                {product.name}
              </h3>
            </Link>
            <p className="text-sm text-neutral-500 leading-relaxed mb-3">{product.description}</p>
            <StarRating rating={product.rating} count={product.reviewCount} />
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-neutral-900">${(product.price ?? 0).toLocaleString("en-US")}</span>
              {product.compareAtPrice && (
                <span className="text-sm text-neutral-400 line-through">${product.compareAtPrice.toLocaleString("en-US")}</span>
              )}
              {discount && (
                <span className="text-xs font-semibold text-red-500">{discount}% off</span>
              )}
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#96BF48] hover:bg-[#5E8E3E] text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md">
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      className="group bg-white rounded-2xl border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] overflow-hidden hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.16)] transition-all duration-300"
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${
              product.badge === "Sale"
                ? "bg-red-500 text-white"
                : product.badge === "New"
                ? "bg-[#96BF48] text-white"
                : product.badge === "Best Seller"
                ? "bg-amber-500 text-white"
                : "bg-neutral-800 text-white"
            }`}
          >
            {product.badge}
          </span>
        )}
        {discount && (
          <span className="absolute top-3 right-3 text-xs font-bold bg-white text-red-500 px-2 py-0.5 rounded-full shadow-sm">
            -{discount}%
          </span>
        )}
        <button
          onClick={() => setWished((w) => !w)}
          className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-200 ${wished ? "fill-red-500 text-red-500" : "text-neutral-400"}`}
          />
        </button>
      </div>
      <div className="p-4">
        <p className="text-xs text-neutral-400 font-medium uppercase tracking-wide mb-1">{product.category}</p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-neutral-900 font-semibold text-sm leading-snug hover:text-[#5E8E3E] transition-colors duration-200 mb-2 line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <StarRating rating={product.rating} count={product.reviewCount} />
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-neutral-900">${(product.price ?? 0).toLocaleString("en-US")}</span>
            {product.compareAtPrice && (
              <span className="text-xs text-neutral-400 line-through">${product.compareAtPrice.toLocaleString("en-US")}</span>
            )}
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#96BF48] hover:bg-[#5E8E3E] text-white text-xs font-semibold rounded-xl transition-all duration-200"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductsPage() {
  const t = useTranslations();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [categoryExpanded, setCategoryExpanded] = useState(true);
  const [priceExpanded, setPriceExpanded] = useState(true);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);

  const activeFilters = useMemo(() => {
    const filters: { label: string; key: string }[] = [];
    if (selectedCategory !== "All") filters.push({ label: selectedCategory, key: "category" });
    if (selectedPriceRange) filters.push({ label: selectedPriceRange, key: "price" });
    if (ratingFilter) filters.push({ label: `${ratingFilter}+ Stars`, key: "rating" });
    if (searchQuery.trim()) filters.push({ label: `"${searchQuery.trim()}"`, key: "search" });
    return filters;
  }, [selectedCategory, selectedPriceRange, ratingFilter, searchQuery]);

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedPriceRange) {
      const range = PRICE_RANGES.find((r) => r.label === selectedPriceRange);
      if (range) {
        result = result.filter((p) => p.price >= range.min && p.price < range.max);
      }
    }

    if (ratingFilter !== null) {
      result = result.filter((p) => p.rating >= ratingFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.tags ?? []).some((tag) => tag.toLowerCase().includes(q))
      );
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [selectedCategory, selectedPriceRange, ratingFilter, searchQuery, sortBy]);

  function clearFilter(key: string) {
    if (key === "category") setSelectedCategory("All");
    if (key === "price") setSelectedPriceRange(null);
    if (key === "rating") setRatingFilter(null);
    if (key === "search") setSearchQuery("");
  }

  function clearAllFilters() {
    setSelectedCategory("All");
    setSelectedPriceRange(null);
    setRatingFilter(null);
    setSearchQuery("");
  }

  const SidebarContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <button
          onClick={() => setCategoryExpanded((v) => !v)}
          className="flex items-center justify-between w-full text-sm font-semibold text-neutral-900 mb-3"
        >
          Categories
          <ChevronDown
            className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${categoryExpanded ? "rotate-180" : ""}`}
          />
        </button>
        <AnimatePresence initial={false}>
          {categoryExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all duration-200 flex items-center justify-between ${
                      selectedCategory === cat
                        ? "bg-[#96BF48]/10 text-[#5E8E3E] font-semibold"
                        : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                    }`}
                  >
                    {cat}
                    <span className="text-xs text-neutral-400">
                      {cat === "All"
                        ? PRODUCTS.length
                        : PRODUCTS.filter((p) => p.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="h-px bg-neutral-100" />

      {/* Price Range */}
      <div>
        <button
          onClick={() => setPriceExpanded((v) => !v)}
          className="flex items-center justify-between w-full text-sm font-semibold text-neutral-900 mb-3"
        >
          Price Range
          <ChevronDown
            className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${priceExpanded ? "rotate-180" : ""}`}
          />
        </button>
        <AnimatePresence initial={false}>
          {priceExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="space-y-1">
                {PRICE_RANGES.map((range) => (
                  <button
                    key={range.label}
                    onClick={() =>
                      setSelectedPriceRange((prev) =>
                        prev === range.label ? null : range.label
                      )
                    }
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all duration-200 flex items-center gap-2 ${
                      selectedPriceRange === range.label
                        ? "bg-[#96BF48]/10 text-[#5E8E3E] font-semibold"
                        : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors duration-200 ${
                        selectedPriceRange === range.label
                          ? "border-[#96BF48] bg-[#96BF48]"
                          : "border-neutral-300"
                      }`}
                    >
                      {selectedPriceRange === range.label && (
                        <svg viewBox="0 0 10 8" className="w-2.5 h-2.5 fill-white">
                          <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    {range.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="h-px bg-neutral-100" />

      {/* Rating Filter */}
      <div>
        <p className="text-sm font-semibold text-neutral-900 mb-3">Minimum Rating</p>
        <div className="space-y-1">
          {[4, 3, 2].map((stars) => (
            <button
              key={stars}
              onClick={() => setRatingFilter((prev) => (prev === stars ? null : stars))}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all duration-200 flex items-center gap-2 ${
                ratingFilter === stars
                  ? "bg-[#96BF48]/10 text-[#5E8E3E] font-semibold"
                  : "text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-3.5 h-3.5 ${s <= stars ? "fill-amber-400 text-amber-400" : "fill-neutral-200 text-neutral-200"}`}
                  />
                ))}
              </div>
              <span>& up</span>
            </button>
          ))}
        </div>
      </div>

      {activeFilters.length > 0 && (
        <>
          <div className="h-px bg-neutral-100" />
          <button
            onClick={clearAllFilters}
            className="w-full text-sm text-red-500 hover:text-red-600 font-medium py-2 rounded-xl hover:bg-red-50 transition-all duration-200"
          >
            Clear All Filters
          </button>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-neutral-500">
            <Link href="/" className="hover:text-neutral-900 transition-colors duration-200">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
            <span className="text-neutral-900 font-medium">Products</span>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="bg-white border-b border-neutral-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-neutral-900 text-balance">
                All Products
              </h1>
              <p className="text-neutral-500 mt-1 text-sm leading-relaxed">
                Discover our curated collection of premium goods, from everyday essentials to standout finds.
              </p>
            </div>
            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-[#96BF48] focus:bg-white transition-all duration-200"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <AnimatePresence initial={false}>
            {sidebarOpen && (
              <motion.aside
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 256, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="hidden lg:block shrink-0 overflow-hidden"
              >
                <div className="w-64 bg-white rounded-2xl border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] p-5 sticky top-24">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-neutral-500" />
                      <span className="text-sm font-semibold text-neutral-900">Filters</span>
                    </div>
                    {activeFilters.length > 0 && (
                      <span className="text-xs bg-[#96BF48] text-white font-bold px-2 py-0.5 rounded-full">
                        {activeFilters.length}
                      </span>
                    )}
                  </div>
                  <SidebarContent />
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSidebarOpen((v) => !v)}
                  className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-600 hover:border-neutral-300 hover:text-neutral-900 transition-all duration-200"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  {sidebarOpen ? "Hide" : "Show"} Filters
                </button>
                <button
                  onClick={() => setMobileSidebarOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-600"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                  {activeFilters.length > 0 && (
                    <span className="bg-[#96BF48] text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                      {activeFilters.length}
                    </span>
                  )}
                </button>
                <span className="text-sm text-neutral-500">
                  <span className="font-semibold text-neutral-900">{filteredProducts.length}</span>{" "}
                  {filteredProducts.length === 1 ? "product" : "products"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-700 outline-none focus:border-[#96BF48] transition-colors duration-200 cursor-pointer"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <div className="flex items-center gap-1 bg-white border border-neutral-200 rounded-xl p-1">
                  <button
                    onClick={() => setView("grid")}
                    className={`p-1.5 rounded-lg transition-all duration-200 ${
                      view === "grid" ? "bg-neutral-900 text-white" : "text-neutral-400 hover:text-neutral-700"
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={`p-1.5 rounded-lg transition-all duration-200 ${
                      view === "list" ? "bg-neutral-900 text-white" : "text-neutral-400 hover:text-neutral-700"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filter Badges */}
            <AnimatePresence>
              {activeFilters.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-wrap items-center gap-2 mb-5 overflow-hidden"
                >
                  <span className="text-xs text-neutral-500 font-medium">Active filters:</span>
                  {activeFilters.map((filter) => (
                    <motion.span
                      key={filter.key}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#96BF48]/10 text-[#5E8E3E] text-xs font-semibold rounded-full border border-[#96BF48]/20"
                    >
                      {filter.label}
                      <button
                        onClick={() => clearFilter(filter.key)}
                        className="hover:text-red-500 transition-colors duration-200"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.span>
                  ))}
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-neutral-400 hover:text-red-500 transition-colors duration-200 underline underline-offset-2"
                  >
                    Clear all
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Product Grid / List */}
            {filteredProducts.length === 0 ? (
              <motion.div
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <div className="w-20 h-20 rounded-2xl bg-neutral-100 flex items-center justify-center mb-5">
                  <Package className="w-10 h-10 text-neutral-300" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">No products found</h3>
                <p className="text-sm text-neutral-500 max-w-xs leading-relaxed mb-6">
                  We could not find any products matching your current filters. Try adjusting your search or clearing some filters.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-5 py-2.5 bg-[#96BF48] hover:bg-[#5E8E3E] text-white text-sm font-semibold rounded-xl transition-all duration-200"
                >
                  Clear All Filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={`${view}-${selectedCategory}-${sortBy}`}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className={
                  view === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                    : "flex flex-col gap-4"
                }
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} view={view} />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-white z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-neutral-500" />
                    <span className="text-sm font-semibold text-neutral-900">Filters</span>
                    {activeFilters.length > 0 && (
                      <span className="text-xs bg-[#96BF48] text-white font-bold px-2 py-0.5 rounded-full">
                        {activeFilters.length}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setMobileSidebarOpen(false)}
                    className="p-2 rounded-xl hover:bg-neutral-100 text-neutral-500 transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <SidebarContent />
                <div className="mt-6 pt-6 border-t border-neutral-100">
                  <button
                    onClick={() => setMobileSidebarOpen(false)}
                    className="w-full py-3 bg-[#96BF48] hover:bg-[#5E8E3E] text-white font-semibold rounded-xl transition-all duration-200"
                  >
                    View {filteredProducts.length} Products
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}