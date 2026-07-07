"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Star, Heart, ShoppingCart, ArrowLeft, Check, Truck, Shield, RotateCcw, ChevronDown, ChevronRight, Plus, Minus, Share2, Eye, Package, Award, Zap } from 'lucide-react';
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";
import { type Variants } from "framer-motion";

// ─── Mock product data ────────────────────────────────────────────────────────

const product = {
  id: "prod_001",
  slug: "premium-wireless-headphones",
  name: "Premium Wireless Headphones",
  brand: "SoundCraft",
  price: 249.99,
  compareAtPrice: 329.99,
  rating: 4.8,
  reviewCount: 1247,
  stock: 14,
  sku: "SC-WH-PRO-BLK",
  description:
    "Experience audio like never before with the SoundCraft Pro Wireless Headphones. Engineered for audiophiles and casual listeners alike, these headphones deliver studio-quality sound with 40mm custom-tuned drivers, active noise cancellation, and up to 30 hours of battery life.",
  highlights: [
    "40mm custom-tuned dynamic drivers",
    "Active Noise Cancellation (ANC)",
    "30-hour battery life with quick charge",
    "Bluetooth 5.3 with multipoint connection",
    "Foldable design with premium carry case",
    "Built-in voice assistant support",
  ],
  images: [
    "/images/premium-wireless-headphones-black.jpg",
    "/images/premium-wireless-headphones-side.jpg",
    "/images/premium-wireless-headphones-folded.jpg",
    "/images/premium-wireless-headphones-case.jpg",
  ],
  variants: {
    color: [
      { label: "Midnight Black", value: "black", hex: "#1a1a1a" },
      { label: "Pearl White", value: "white", hex: "#f5f5f0" },
      { label: "Forest Green", value: "green", hex: "#3d6b4f" },
      { label: "Navy Blue", value: "navy", hex: "#1e3a5f" },
    ],
  },
  specs: [
    { label: "Driver Size", value: "40mm" },
    { label: "Frequency Response", value: "20Hz – 20kHz" },
    { label: "Impedance", value: "32 Ohm" },
    { label: "Battery Life", value: "30 hours" },
    { label: "Charging Time", value: "2 hours" },
    { label: "Bluetooth", value: "5.3" },
    { label: "Weight", value: "250g" },
    { label: "Connectivity", value: "Bluetooth / 3.5mm" },
  ],
  category: "Electronics",
  tags: ["headphones", "wireless", "audio", "noise-cancelling"],
};

const reviews = [
  {
    id: "r1",
    author: "Marcus T.",
    avatar: "/images/reviewer-marcus.jpg",
    rating: 5,
    date: "December 12, 2024",
    title: "Best headphones I've ever owned",
    body: "The sound quality is absolutely incredible. The bass is deep without being overwhelming, and the highs are crystal clear. ANC works perfectly on my daily commute.",
    verified: true,
    helpful: 42,
  },
  {
    id: "r2",
    author: "Priya S.",
    avatar: "/images/reviewer-priya.jpg",
    rating: 5,
    date: "December 8, 2024",
    title: "Worth every penny",
    body: "I was hesitant at first given the price, but these headphones are genuinely worth it. The build quality feels premium, and the battery life is exactly as advertised.",
    verified: true,
    helpful: 31,
  },
  {
    id: "r3",
    author: "James K.",
    avatar: "/images/reviewer-james.jpg",
    rating: 4,
    date: "November 29, 2024",
    title: "Great sound, minor comfort issue",
    body: "Sound quality is top-notch and the ANC is impressive. My only gripe is that after 3+ hours of continuous use, the ear cups get a bit warm. Still a solid 4 stars.",
    verified: true,
    helpful: 18,
  },
  {
    id: "r4",
    author: "Sofia R.",
    avatar: "/images/reviewer-sofia.jpg",
    rating: 5,
    date: "November 20, 2024",
    title: "Perfect for remote work",
    body: "I use these all day for video calls and music. The microphone quality is surprisingly good, and colleagues say I sound clear. The multipoint connection is a game changer.",
    verified: false,
    helpful: 27,
  },
];

const relatedProducts = [
  {
    id: "rp1",
    name: "SoundCraft Earbuds Pro",
    price: 149.99,
    compareAtPrice: 199.99,
    rating: 4.6,
    image: "/images/soundcraft-earbuds-pro.jpg",
    slug: "soundcraft-earbuds-pro",
  },
  {
    id: "rp2",
    name: "Portable Speaker X1",
    price: 89.99,
    compareAtPrice: null,
    rating: 4.4,
    image: "/images/portable-speaker-x1.jpg",
    slug: "portable-speaker-x1",
  },
  {
    id: "rp3",
    name: "Headphone Stand Deluxe",
    price: 34.99,
    compareAtPrice: null,
    rating: 4.7,
    image: "/images/headphone-stand-deluxe.jpg",
    slug: "headphone-stand-deluxe",
  },
  {
    id: "rp4",
    name: "USB-C Audio Adapter",
    price: 19.99,
    compareAtPrice: 24.99,
    rating: 4.3,
    image: "/images/usbc-audio-adapter.jpg",
    slug: "usbc-audio-adapter",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const sz = size === "md" ? "w-5 h-5" : "w-4 h-4";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${sz} ${
            i <= Math.floor(rating)
              ? "fill-amber-400 text-amber-400"
              : i - 0.5 <= rating
              ? "fill-amber-200 text-amber-400"
              : "fill-neutral-200 text-neutral-300"
          }`}
        />
      ))}
    </div>
  );
}

function RatingBar({ label, count, total }: { label: string; count: number; total: number }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="w-8 text-neutral-500 text-right">{label}</span>
      <div className="flex-1 h-2 bg-neutral-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-400 rounded-full transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-8 text-neutral-400">{count}</span>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ProductDetailPage() {
  const t = useTranslations();

  const [selectedColor, setSelectedColor] = useState(product.variants.color[0]?.value ?? "black");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>("description");

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  function handleAddToCart() {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  }

  function toggleAccordion(key: string) {
    setOpenAccordion((prev) => (prev === key ? null : key));
  }

  const accordionSections = [
    {
      key: "description",
      label: "Description",
      content: (
        <div className="space-y-4">
          <p className="text-neutral-600 leading-relaxed">{product.description}</p>
          <ul className="space-y-2">
            {product.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-neutral-600">
                <Check className="w-4 h-4 text-[#96BF48] mt-0.5 shrink-0" />
                {h}
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      key: "specs",
      label: "Specifications",
      content: (
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          {product.specs.map((s) => (
            <div key={s.label} className="flex justify-between border-b border-neutral-100 pb-2">
              <span className="text-sm text-neutral-500">{s.label}</span>
              <span className="text-sm font-medium text-neutral-800">{s.value}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "shipping",
      label: "Shipping & Returns",
      content: (
        <div className="space-y-4">
          {[
            { icon: Truck, title: "Free Standard Shipping", desc: "Orders over $50 ship free. Estimated 3-5 business days." },
            { icon: Zap, title: "Express Delivery", desc: "Next-day delivery available for $12.99. Order before 2pm." },
            { icon: RotateCcw, title: "30-Day Returns", desc: "Not satisfied? Return within 30 days for a full refund." },
            { icon: Shield, title: "2-Year Warranty", desc: "All SoundCraft products include a 2-year manufacturer warranty." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#96BF48]/10 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-[#5E8E3E]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-800">{title}</p>
                <p className="text-sm text-neutral-500 mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-neutral-100 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-neutral-500">
            <Link href="/" className="hover:text-neutral-800 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/products" className="hover:text-neutral-800 transition-colors">Products</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-neutral-400">{product.category}</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-neutral-800 font-medium truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">

          {/* ── Left: Image gallery ── */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {/* Main image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-50 border border-neutral-100 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)]">
              <img
                src={product.images[activeImage] ?? product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/images/premium-wireless-headphones-black.jpg";
                }}
              />
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  -{discount}%
                </div>
              )}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setWishlisted((w) => !w)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-colors duration-200 ${
                    wishlisted ? "bg-red-500 text-white" : "bg-white text-neutral-500 hover:text-red-500"
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? "fill-current" : ""}`} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-full bg-white text-neutral-500 hover:text-neutral-800 flex items-center justify-center shadow-md transition-colors duration-200"
                  aria-label="Share"
                >
                  <Share2 className="w-4 h-4" />
                </motion.button>
              </div>
              {/* View count */}
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">
                <Eye className="w-3 h-3" />
                <span>38 people viewing</span>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveImage(i)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    activeImage === i
                      ? "border-[#96BF48] shadow-[0_0_0_3px_rgba(150,191,72,0.2)]"
                      : "border-neutral-200 hover:border-neutral-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    className="w-full h-full object-cover bg-neutral-50"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/images/premium-wireless-headphones-black.jpg";
                    }}
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Product info ── */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            {/* Brand + badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold text-[#5E8E3E] bg-[#96BF48]/10 px-2.5 py-0.5 rounded-full">
                {product.brand}
              </span>
              <span className="text-sm text-neutral-400 bg-neutral-100 px-2.5 py-0.5 rounded-full">
                {product.category}
              </span>
              {product.stock <= 20 && (
                <span className="text-sm text-orange-600 bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-full font-medium">
                  Only {product.stock} left
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 tracking-tight text-balance leading-tight">
              {product.name}
            </h1>

            {/* Rating row */}
            <div className="flex items-center gap-3 flex-wrap">
              <StarRating rating={product.rating} size="md" />
              <span className="text-sm font-semibold text-neutral-800">{product.rating}</span>
              <span className="text-sm text-neutral-400">
                ({(product.reviewCount ?? 0).toLocaleString("en-US")} reviews)
              </span>
              <span className="text-sm text-neutral-300">|</span>
              <span className="text-sm text-[#5E8E3E] font-medium">SKU: {product.sku}</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-neutral-900">
                ${(product.price ?? 0).toFixed(2)}
              </span>
              {product.compareAtPrice && (
                <>
                  <span className="text-xl text-neutral-400 line-through">
                    ${(product.compareAtPrice ?? 0).toFixed(2)}
                  </span>
                  <span className="text-sm font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-lg">
                    Save ${((product.compareAtPrice ?? 0) - (product.price ?? 0)).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            {/* Color selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-neutral-700">Color</span>
                <span className="text-sm text-neutral-500">
                  {product.variants.color.find((c) => c.value === selectedColor)?.label ?? ""}
                </span>
              </div>
              <div className="flex gap-3 flex-wrap">
                {product.variants.color.map((c) => (
                  <motion.button
                    key={c.value}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedColor(c.value)}
                    title={c.label}
                    className={`w-9 h-9 rounded-full border-2 transition-all duration-200 relative ${
                      selectedColor === c.value
                        ? "border-[#96BF48] shadow-[0_0_0_3px_rgba(150,191,72,0.25)]"
                        : "border-neutral-200 hover:border-neutral-400"
                    }`}
                    style={{ backgroundColor: c.hex }}
                  >
                    {selectedColor === c.value && (
                      <Check
                        className="w-4 h-4 absolute inset-0 m-auto"
                        style={{ color: c.value === "white" ? "#333" : "#fff" }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quantity + Add to cart */}
            <div className="flex items-center gap-3 flex-wrap">
              {/* Quantity */}
              <div className="flex items-center border border-neutral-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-11 h-11 flex items-center justify-center text-neutral-600 hover:bg-neutral-50 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-sm font-semibold text-neutral-800 select-none">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="w-11 h-11 flex items-center justify-center text-neutral-600 hover:bg-neutral-50 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to cart */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className={`flex-1 min-w-[180px] h-11 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                  addedToCart
                    ? "bg-[#5E8E3E] text-white"
                    : "bg-[#96BF48] hover:bg-[#5E8E3E] text-white shadow-[0_2px_8px_rgba(150,191,72,0.35)]"
                }`}
              >
                {addedToCart ? (
                  <>
                    <Check className="w-4 h-4" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </>
                )}
              </motion.button>

              {/* Wishlist */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setWishlisted((w) => !w)}
                className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-200 ${
                  wishlisted
                    ? "border-red-300 bg-red-50 text-red-500"
                    : "border-neutral-200 text-neutral-500 hover:border-neutral-300 hover:bg-neutral-50"
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${wishlisted ? "fill-current" : ""}`} />
              </motion.button>
            </div>

            {/* Buy now */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full h-11 rounded-xl border-2 border-neutral-900 text-neutral-900 font-semibold text-sm hover:bg-neutral-900 hover:text-white transition-all duration-200"
            >
              Buy Now
            </motion.button>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { icon: Truck, label: "Free Shipping", sub: "Orders over $50" },
                { icon: RotateCcw, label: "30-Day Returns", sub: "Hassle-free" },
                { icon: Shield, label: "2-Year Warranty", sub: "Manufacturer" },
              ].map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="flex flex-col items-center text-center gap-1.5 p-3 rounded-xl bg-neutral-50 border border-neutral-100"
                >
                  <Icon className="w-5 h-5 text-[#5E8E3E]" />
                  <span className="text-xs font-semibold text-neutral-700 leading-tight">{label}</span>
                  <span className="text-xs text-neutral-400">{sub}</span>
                </div>
              ))}
            </div>

            {/* Accordion */}
            <div className="border border-neutral-200 rounded-2xl overflow-hidden divide-y divide-neutral-100">
              {accordionSections.map(({ key, label, content }) => (
                <div key={key}>
                  <button
                    onClick={() => toggleAccordion(key)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-neutral-50 transition-colors duration-150"
                  >
                    <span className="text-sm font-semibold text-neutral-800">{label}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-400 transition-transform duration-300 ${
                        openAccordion === key ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openAccordion === key && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="px-5 pb-5"
                    >
                      {content}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Reviews section ── */}
      <section className="bg-neutral-50 border-t border-neutral-100 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-10"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 tracking-tight">
              Customer Reviews
            </h2>
            <p className="text-neutral-500 mt-1">
              {(product.reviewCount ?? 0).toLocaleString("en-US")} verified reviews
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Rating summary */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] h-fit"
            >
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-neutral-900">{product.rating}</div>
                <StarRating rating={product.rating} size="md" />
                <p className="text-sm text-neutral-500 mt-2">out of 5</p>
              </div>
              <div className="space-y-2">
                <RatingBar label="5★" count={892} total={product.reviewCount} />
                <RatingBar label="4★" count={248} total={product.reviewCount} />
                <RatingBar label="3★" count={71} total={product.reviewCount} />
                <RatingBar label="2★" count={22} total={product.reviewCount} />
                <RatingBar label="1★" count={14} total={product.reviewCount} />
              </div>
              <div className="mt-6 pt-6 border-t border-neutral-100 space-y-3">
                {[
                  { label: "Sound Quality", pct: 96 },
                  { label: "Comfort", pct: 88 },
                  { label: "Battery Life", pct: 94 },
                  { label: "Value", pct: 91 },
                ].map(({ label, pct }) => (
                  <div key={label} className="space-y-1">
                    <div className="flex justify-between text-xs text-neutral-500">
                      <span>{label}</span>
                      <span className="font-medium text-neutral-700">{pct}%</span>
                    </div>
                    <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#96BF48] rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Review list */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="lg:col-span-2 space-y-5"
            >
              {reviews.map((review) => (
                <motion.div
                  key={review.id}
                  variants={fadeInUp}
                  className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.06)]"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#96BF48]/20 flex items-center justify-center text-[#5E8E3E] font-bold text-sm shrink-0">
                        {(review.author ?? "?").charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-neutral-800">{review.author}</span>
                          {review.verified && (
                            <span className="text-xs text-[#5E8E3E] bg-[#96BF48]/10 px-1.5 py-0.5 rounded-full flex items-center gap-1">
                              <Check className="w-3 h-3" />
                              Verified
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-neutral-400">{review.date}</span>
                      </div>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                  <h4 className="text-sm font-semibold text-neutral-800 mb-1">{review.title}</h4>
                  <p className="text-sm text-neutral-600 leading-relaxed">{review.body}</p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-neutral-400">
                    <span>Helpful?</span>
                    <button className="hover:text-neutral-700 transition-colors px-2 py-0.5 rounded border border-neutral-200 hover:border-neutral-300">
                      Yes ({review.helpful})
                    </button>
                    <button className="hover:text-neutral-700 transition-colors px-2 py-0.5 rounded border border-neutral-200 hover:border-neutral-300">
                      No
                    </button>
                  </div>
                </motion.div>
              ))}

              <motion.button
                variants={fadeInUp}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-3 rounded-xl border border-neutral-200 text-sm font-medium text-neutral-600 hover:bg-neutral-50 hover:border-neutral-300 transition-all duration-200"
              >
                Load More Reviews
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Related products ── */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex items-center justify-between mb-10"
          >
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 tracking-tight">
                You Might Also Like
              </h2>
              <p className="text-neutral-500 mt-1">Frequently bought together</p>
            </div>
            <Link
              href="/products"
              className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-[#5E8E3E] hover:text-[#96BF48] transition-colors"
            >
              View all
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {relatedProducts.map((rp) => (
              <motion.div
                key={rp.id}
                variants={scaleIn}
                whileHover={{ y: -4 }}
                className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.14)] transition-all duration-300"
              >
                <Link href={`/products/${rp.slug}`} className="block">
                  <div className="aspect-square bg-neutral-50 overflow-hidden">
                    <img
                      src={rp.image}
                      alt={rp.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/images/premium-wireless-headphones-black.jpg";
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-neutral-800 leading-snug mb-1 group-hover:text-[#5E8E3E] transition-colors">
                      {rp.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-2">
                      <StarRating rating={rp.rating} />
                      <span className="text-xs text-neutral-400">{rp.rating}</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-bold text-neutral-900">
                        ${(rp.price ?? 0).toFixed(2)}
                      </span>
                      {rp.compareAtPrice && (
                        <span className="text-xs text-neutral-400 line-through">
                          ${(rp.compareAtPrice ?? 0).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
                <div className="px-4 pb-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2 rounded-xl bg-[#96BF48]/10 hover:bg-[#96BF48] text-[#5E8E3E] hover:text-white text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Sticky bottom bar (mobile) ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-neutral-200 px-4 py-3 flex items-center gap-3 shadow-[0_-4px_24px_-4px_rgba(0,0,0,0.12)]">
        <div className="flex-1">
          <div className="text-xs text-neutral-500">{product.name}</div>
          <div className="text-lg font-bold text-neutral-900">${(product.price ?? 0).toFixed(2)}</div>
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleAddToCart}
          className={`px-6 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all duration-300 ${
            addedToCart
              ? "bg-[#5E8E3E] text-white"
              : "bg-[#96BF48] hover:bg-[#5E8E3E] text-white"
          }`}
        >
          {addedToCart ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
          {addedToCart ? "Added!" : "Add to Cart"}
        </motion.button>
      </div>
    </main>
  );
}