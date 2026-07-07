"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Star, ShoppingCart, Zap, Heart, Share2, ChevronRight, Truck, RotateCcw, Shield, Check, Minus, Plus, ChevronDown } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn, slideInLeft, slideInRight } from "@/lib/motion";
import type { Product } from "@/lib/data";

const mockProducts: Product[] = [
  {
    id: "1",
    slug: "premium-wireless-headphones",
    name: "Premium Wireless Headphones",
    price: 249.99,
    compareAtPrice: 329.99,
    description:
      "Experience studio-quality sound with our flagship wireless headphones. Featuring 40mm custom-tuned drivers, active noise cancellation, and a 30-hour battery life, these headphones redefine what portable audio can be. The premium aluminum and leather construction ensures lasting comfort during extended listening sessions.",
    category: "Electronics",
    tags: ["audio", "wireless", "noise-cancelling"],
    image: "https://m.media-amazon.com/images/I/61RahTQtAqL._AC_UF894,1000_QL80_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/61RahTQtAqL._AC_UF894,1000_QL80_.jpg",
      "/images/headphones-side-view.jpg",
      "/images/headphones-folded.jpg",
      "/images/headphones-case.jpg",
    ],
    variants: {
      color: ["Midnight Black", "Pearl White", "Forest Green"],
      size: [],
    },
    stock: 42,
    rating: 4.8,
    reviewCount: 312,
    featured: true,
  },
  {
    id: "2",
    slug: "minimalist-leather-watch",
    name: "Minimalist Leather Watch",
    price: 189.0,
    compareAtPrice: 240.0,
    description:
      "A timeless piece crafted for the modern professional. The slim 38mm case houses a Swiss quartz movement, paired with a hand-stitched Italian leather strap. Water-resistant to 50m and built to last a lifetime.",
    category: "Accessories",
    tags: ["watch", "leather", "minimalist"],
    image: "https://i.etsystatic.com/11276331/r/il/0d5206/3887810690/il_570xN.3887810690_pojq.jpg",
    images: [
      "https://i.etsystatic.com/11276331/r/il/0d5206/3887810690/il_570xN.3887810690_pojq.jpg",
      "/images/watch-close-up.jpg",
      "/images/watch-on-wrist.jpg",
      "/images/watch-strap-detail.jpg",
    ],
    variants: {
      color: ["Tan", "Dark Brown", "Black"],
      size: ["38mm", "42mm"],
    },
    stock: 18,
    rating: 4.6,
    reviewCount: 87,
    featured: false,
  },
  {
    id: "3",
    slug: "ergonomic-office-chair",
    name: "Ergonomic Office Chair",
    price: 499.0,
    compareAtPrice: 649.0,
    description:
      "Engineered for all-day comfort, this ergonomic chair features lumbar support, adjustable armrests, a breathable mesh back, and a synchronized tilt mechanism. Designed to keep you focused and pain-free through the longest work sessions.",
    category: "Furniture",
    tags: ["office", "ergonomic", "chair"],
    image: "https://technimobili.com/cdn/shop/files/RTA-3263C-BK-01.jpg?v=1740778095&width=1780",
    images: [
      "https://technimobili.com/cdn/shop/files/RTA-3263C-BK-01.jpg?v=1740778095&width=1780",
      "/images/chair-back-view.jpg",
      "/images/chair-armrest-detail.jpg",
      "/images/chair-base-detail.jpg",
    ],
    variants: {
      color: ["Charcoal", "Slate Blue", "Warm Gray"],
      size: [],
    },
    stock: 9,
    rating: 4.9,
    reviewCount: 204,
    featured: true,
  },
  {
    id: "4",
    slug: "cold-brew-coffee-kit",
    name: "Cold Brew Coffee Kit",
    price: 59.95,
    compareAtPrice: undefined,
    description:
      "Brew smooth, low-acid cold brew at home with our all-in-one kit. Includes a 1-liter borosilicate glass carafe, a fine-mesh stainless steel filter, and a step-by-step brewing guide. Perfect for coffee enthusiasts who want cafe-quality results without leaving the house.",
    category: "Kitchen",
    tags: ["coffee", "kitchen", "brewing"],
    image: "/images/cold-brew-coffee-kit.jpg",
    images: [
      "/images/cold-brew-coffee-kit.jpg",
      "/images/coffee-kit-carafe.jpg",
      "/images/coffee-kit-filter.jpg",
      "/images/coffee-kit-lifestyle.jpg",
    ],
    variants: {
      color: [],
      size: ["1L", "2L"],
    },
    stock: 75,
    rating: 4.7,
    reviewCount: 156,
    featured: false,
  },
];

const mockReviews = [
  {
    id: "r1",
    author: "Sarah M.",
    avatar: "/images/reviewer-sarah.jpg",
    rating: 5,
    date: "March 12, 2025",
    title: "Absolutely worth every penny",
    body: "I was skeptical at first given the price, but after two weeks of daily use I can honestly say this is the best purchase I've made this year. The build quality is exceptional and it performs exactly as advertised.",
    verified: true,
  },
  {
    id: "r2",
    author: "James T.",
    avatar: "/images/reviewer-james.jpg",
    rating: 4,
    date: "February 28, 2025",
    title: "Great product, minor quibbles",
    body: "Really solid overall. The main feature works flawlessly and the design is clean and premium. Knocked off one star because the packaging could be more eco-friendly, but the product itself is excellent.",
    verified: true,
  },
  {
    id: "r3",
    author: "Priya K.",
    avatar: "/images/reviewer-priya.jpg",
    rating: 5,
    date: "February 14, 2025",
    title: "Exceeded my expectations",
    body: "Ordered this as a gift and the recipient was thrilled. Arrived well-packaged and ahead of schedule. The quality feels premium and it looks even better in person than in the photos.",
    verified: false,
  },
];

const relatedProducts = mockProducts.slice(1, 4);

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= Math.floor(rating);
        const partial = !filled && star === Math.ceil(rating) && rating % 1 > 0;
        return (
          <span key={star} className="relative inline-block" style={{ width: size, height: size }}>
            <Star
              size={size}
              className="text-neutral-200"
              fill="currentColor"
            />
            {(filled || partial) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: partial ? `${(rating % 1) * 100}%` : "100%" }}
              >
                <Star size={size} className="text-amber-400" fill="currentColor" />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const t = useTranslations();
  const product =
    mockProducts.find((p) => p.slug === params.slug) ?? mockProducts[0];

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    (product.variants.color ?? [])[0] ?? ""
  );
  const [selectedSize, setSelectedSize] = useState(
    (product.variants.size ?? [])[0] ?? ""
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews">("description");
  const [wishlist, setWishlist] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const discount =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(
          ((product.compareAtPrice - product.price) / product.compareAtPrice) *
            100
        )
      : 0;

  function handleAddToCart() {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }

  function decrementQty() {
    setQuantity((q) => Math.max(1, q - 1));
  }

  function incrementQty() {
    setQuantity((q) => Math.min(product.stock, q + 1));
  }

  const colors = product.variants.color ?? [];
  const sizes = product.variants.size ?? [];

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2"
      >
        <nav className="flex items-center gap-1.5 text-sm text-neutral-500">
          <Link href="/" className="hover:text-neutral-900 transition-colors duration-150">
            {t("breadcrumb.home")}
          </Link>
          <ChevronRight size={14} className="text-neutral-300" />
          <Link href="/products" className="hover:text-neutral-900 transition-colors duration-150">
            {t("breadcrumb.products")}
          </Link>
          <ChevronRight size={14} className="text-neutral-300" />
          <span className="text-neutral-900 font-medium truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>
      </motion.div>

      {/* Main product section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
          {/* LEFT: Image gallery */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-4"
          >
            {/* Main image */}
            <div className="relative overflow-hidden rounded-2xl bg-neutral-50 border border-neutral-100 aspect-square shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)]">
              <motion.img
                key={selectedImage}
                src={product.images[selectedImage] ?? product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = product.image;
                }}
              />
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  -{discount}%
                </div>
              )}
              <button
                onClick={() => setWishlist((w) => !w)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm border border-neutral-200 flex items-center justify-center shadow-sm hover:scale-110 transition-transform duration-200"
                aria-label="Add to wishlist"
              >
                <Heart
                  size={16}
                  className={wishlist ? "text-red-500 fill-red-500" : "text-neutral-500"}
                />
              </button>
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-3 overflow-x-auto pb-1">
              {(product.images ?? []).map((img, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === idx
                      ? "border-[#96BF48] shadow-[0_0_0_3px_rgba(150,191,72,0.2)]"
                      : "border-neutral-200 hover:border-neutral-400"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = product.image;
                    }}
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Product info */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            {/* Category + share */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#5E8E3E] bg-[#96BF48]/10 px-3 py-1 rounded-full">
                {product.category}
              </span>
              <button className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 transition-colors duration-150">
                <Share2 size={15} />
                <span>{t("product.share")}</span>
              </button>
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900 text-balance leading-tight">
              {product.name}
            </h1>

            {/* Rating row */}
            <div className="flex items-center gap-3">
              <StarRating rating={product.rating} size={18} />
              <span className="text-sm font-semibold text-neutral-800">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-sm text-neutral-500">
                ({product.reviewCount} {t("product.reviews")})
              </span>
              <span className="text-sm text-[#5E8E3E] font-medium cursor-pointer hover:underline" onClick={() => setActiveTab("reviews")}>
                {t("product.readReviews")}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-neutral-900">
                ${(product.price ?? 0).toFixed(2)}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <>
                  <span className="text-xl text-neutral-400 line-through">
                    ${product.compareAtPrice.toFixed(2)}
                  </span>
                  <span className="text-sm font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                    {t("product.save")} ${(product.compareAtPrice - product.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            <div className="h-px bg-neutral-100" />

            {/* Color selector */}
            {colors.length > 0 && (
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-neutral-700">
                    {t("product.color")}:
                  </span>
                  <span className="text-sm text-neutral-500">{selectedColor}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <motion.button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all duration-200 ${
                        selectedColor === color
                          ? "border-[#96BF48] bg-[#96BF48]/10 text-[#5E8E3E]"
                          : "border-neutral-200 text-neutral-600 hover:border-neutral-400"
                      }`}
                    >
                      {color}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Size selector */}
            {sizes.length > 0 && (
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-neutral-700">
                    {t("product.size")}:
                  </span>
                  <span className="text-sm text-neutral-500">{selectedSize}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <motion.button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all duration-200 ${
                        selectedSize === size
                          ? "border-[#96BF48] bg-[#96BF48]/10 text-[#5E8E3E]"
                          : "border-neutral-200 text-neutral-600 hover:border-neutral-400"
                      }`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity picker */}
            <div className="flex flex-col gap-2.5">
              <span className="text-sm font-semibold text-neutral-700">
                {t("product.quantity")}
              </span>
              <div className="flex items-center gap-3">
                <div className="flex items-center border-2 border-neutral-200 rounded-xl overflow-hidden">
                  <button
                    onClick={decrementQty}
                    disabled={quantity <= 1}
                    className="w-10 h-10 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center text-sm font-semibold text-neutral-900">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQty}
                    disabled={quantity >= product.stock}
                    className="w-10 h-10 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <span className="text-sm text-neutral-500">
                  {product.stock} {t("product.inStock")}
                </span>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                onClick={handleAddToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  addedToCart
                    ? "bg-[#5E8E3E] text-white"
                    : "bg-neutral-900 text-white hover:bg-neutral-700"
                }`}
              >
                {addedToCart ? (
                  <>
                    <Check size={18} />
                    {t("product.addedToCart")}
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} />
                    {t("product.addToCart")}
                  </>
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-[#96BF48] hover:bg-[#5E8E3E] text-white transition-colors duration-200"
              >
                <Zap size={18} />
                {t("product.buyNow")}
              </motion.button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              {[
                { icon: Truck, label: t("product.trust.shipping") },
                { icon: RotateCcw, label: t("product.trust.returns") },
                { icon: Shield, label: t("product.trust.secure") },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-neutral-50 border border-neutral-100 text-center"
                >
                  <Icon size={18} className="text-[#5E8E3E]" />
                  <span className="text-xs text-neutral-600 font-medium leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tabs: Description / Specs / Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Tab bar */}
        <div className="flex gap-1 border-b border-neutral-200 mb-8">
          {(["description", "specs", "reviews"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-sm font-semibold capitalize transition-all duration-200 border-b-2 -mb-px ${
                activeTab === tab
                  ? "border-[#96BF48] text-[#5E8E3E]"
                  : "border-transparent text-neutral-500 hover:text-neutral-800"
              }`}
            >
              {t(`product.tab.${tab}`)}
              {tab === "reviews" && (
                <span className="ml-1.5 text-xs bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded-full">
                  {product.reviewCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <motion.div
          key={activeTab}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          {activeTab === "description" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-4">
                <p className="text-neutral-700 leading-relaxed text-base">
                  {product.description}
                </p>
                <p className="text-neutral-600 leading-relaxed text-base">
                  Designed with both form and function in mind, every detail has been carefully considered to deliver a product that not only looks great but performs flawlessly day after day. Our team of engineers and designers spent over 18 months perfecting this product before it reached your hands.
                </p>
                <ul className="space-y-2 pt-2">
                  {[
                    "Premium materials sourced from certified suppliers",
                    "Rigorously tested to exceed industry standards",
                    "Backed by our 2-year manufacturer warranty",
                    "Designed for everyday use and built to last",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-neutral-700 text-sm">
                      <Check size={16} className="text-[#5E8E3E] mt-0.5 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider">
                  {t("product.tags")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(product.tags ?? []).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-neutral-100 text-neutral-600 text-xs font-medium rounded-full capitalize"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-xl bg-[#96BF48]/8 border border-[#96BF48]/20">
                  <p className="text-sm font-semibold text-[#5E8E3E] mb-1">
                    {t("product.sku")}
                  </p>
                  <p className="text-sm text-neutral-600 font-mono">
                    SKU-{product.id.padStart(6, "0")}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "specs" && (
            <div className="max-w-2xl">
              <div className="divide-y divide-neutral-100 rounded-2xl border border-neutral-200 overflow-hidden">
                {[
                  { label: t("product.spec.category"), value: product.category },
                  { label: t("product.spec.rating"), value: `${product.rating.toFixed(1)} / 5.0` },
                  { label: t("product.spec.reviews"), value: product.reviewCount.toString() },
                  { label: t("product.spec.stock"), value: `${product.stock} units` },
                  {
                    label: t("product.spec.colors"),
                    value: colors.length > 0 ? colors.join(", ") : "N/A",
                  },
                  {
                    label: t("product.spec.sizes"),
                    value: sizes.length > 0 ? sizes.join(", ") : "One size",
                  },
                  { label: t("product.spec.sku"), value: `SKU-${product.id.padStart(6, "0")}` },
                  { label: t("product.spec.warranty"), value: "2 Years" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center px-5 py-3.5 odd:bg-neutral-50">
                    <span className="w-40 text-sm font-semibold text-neutral-600 flex-shrink-0">
                      {label}
                    </span>
                    <span className="text-sm text-neutral-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-8">
              {/* Summary */}
              <div className="flex flex-col sm:flex-row gap-8 p-6 rounded-2xl bg-neutral-50 border border-neutral-100">
                <div className="flex flex-col items-center justify-center gap-1 min-w-[120px]">
                  <span className="text-6xl font-bold text-neutral-900">
                    {product.rating.toFixed(1)}
                  </span>
                  <StarRating rating={product.rating} size={20} />
                  <span className="text-sm text-neutral-500 mt-1">
                    {product.reviewCount} {t("product.reviews")}
                  </span>
                </div>
                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const pct = star === 5 ? 68 : star === 4 ? 22 : star === 3 ? 7 : star === 2 ? 2 : 1;
                    return (
                      <div key={star} className="flex items-center gap-3">
                        <span className="text-xs text-neutral-500 w-4 text-right">{star}</span>
                        <Star size={12} className="text-amber-400 fill-amber-400 flex-shrink-0" />
                        <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-400 rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-xs text-neutral-500 w-8">{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Review list */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-5"
              >
                {mockReviews.map((review) => (
                  <motion.div
                    key={review.id}
                    variants={fadeInUp}
                    className="p-5 rounded-2xl border border-neutral-100 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.06)]"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={review.avatar}
                        alt={review.author}
                        className="w-10 h-10 rounded-full object-cover bg-neutral-200 flex-shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-neutral-900">
                            {review.author}
                          </span>
                          {review.verified && (
                            <span className="flex items-center gap-1 text-xs text-[#5E8E3E] bg-[#96BF48]/10 px-2 py-0.5 rounded-full">
                              <Check size={10} />
                              {t("product.verifiedPurchase")}
                            </span>
                          )}
                          <span className="text-xs text-neutral-400 ml-auto">
                            {review.date}
                          </span>
                        </div>
                        <StarRating rating={review.rating} size={14} />
                        <h4 className="text-sm font-semibold text-neutral-800 mt-2 mb-1">
                          {review.title}
                        </h4>
                        <p className="text-sm text-neutral-600 leading-relaxed">
                          {review.body}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}
        </motion.div>
      </section>

      {/* Related products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 border-t border-neutral-100">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex items-center justify-between mb-8"
        >
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
            {t("product.relatedProducts")}
          </h2>
          <Link
            href="/products"
            className="text-sm font-semibold text-[#5E8E3E] hover:text-[#96BF48] flex items-center gap-1 transition-colors duration-150"
          >
            {t("product.viewAll")}
            <ChevronRight size={16} />
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {relatedProducts.map((rp) => {
            const rpDiscount =
              rp.compareAtPrice && rp.compareAtPrice > rp.price
                ? Math.round(
                    ((rp.compareAtPrice - rp.price) / rp.compareAtPrice) * 100
                  )
                : 0;
            return (
              <motion.div key={rp.id} variants={scaleIn}>
                <Link href={`/products/${rp.slug}`} className="group block">
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="rounded-2xl overflow-hidden border border-neutral-100 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.06),0_16px_40px_-12px_rgba(0,0,0,0.14)] transition-shadow duration-300"
                  >
                    <div className="relative aspect-square overflow-hidden bg-neutral-50">
                      <img
                        src={rp.image}
                        alt={rp.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/images/product-placeholder.jpg";
                        }}
                      />
                      {rpDiscount > 0 && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                          -{rpDiscount}%
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-neutral-400 font-medium uppercase tracking-wider mb-1">
                        {rp.category}
                      </p>
                      <h3 className="text-sm font-semibold text-neutral-900 group-hover:text-[#5E8E3E] transition-colors duration-150 line-clamp-2">
                        {rp.name}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <StarRating rating={rp.rating} size={12} />
                        <span className="text-xs text-neutral-500">({rp.reviewCount})</span>
                      </div>
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-base font-bold text-neutral-900">
                          ${(rp.price ?? 0).toFixed(2)}
                        </span>
                        {rp.compareAtPrice && rp.compareAtPrice > rp.price && (
                          <span className="text-sm text-neutral-400 line-through">
                            ${rp.compareAtPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </main>
  );
}