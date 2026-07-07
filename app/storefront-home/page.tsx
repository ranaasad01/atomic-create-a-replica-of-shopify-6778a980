"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ShoppingBag, Star, ArrowRight, ChevronRight, Truck, Shield, RefreshCw, Headphones, TrendingUp, Zap, Heart, Eye, ShoppingCart, Tag, Award, Users, Package, Mail } from 'lucide-react';
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

const featuredProducts = [
  {
    id: "1",
    name: "Wireless Noise-Cancelling Headphones",
    price: 299,
    compareAtPrice: 399,
    category: "Electronics",
    rating: 4.8,
    reviewCount: 2341,
    image: "https://m.media-amazon.com/images/I/71YM2N5whtL.jpg",
    badge: "Best Seller",
    badgeColor: "#96BF48",
  },
  {
    id: "2",
    name: "Minimalist Leather Watch",
    price: 189,
    compareAtPrice: 249,
    category: "Accessories",
    rating: 4.7,
    reviewCount: 1892,
    image: "https://i.etsystatic.com/11276331/r/il/0d5206/3887810690/il_570xN.3887810690_pojq.jpg",
    badge: "New",
    badgeColor: "#3B82F6",
  },
  {
    id: "3",
    name: "Premium Yoga Mat",
    price: 89,
    compareAtPrice: null,
    category: "Fitness",
    rating: 4.9,
    reviewCount: 3104,
    image: "/images/premium-yoga-mat.jpg",
    badge: "Top Rated",
    badgeColor: "#F59E0B",
  },
  {
    id: "4",
    name: "Ceramic Pour-Over Coffee Set",
    price: 64,
    compareAtPrice: 85,
    category: "Kitchen",
    rating: 4.6,
    reviewCount: 987,
    image: "https://m.media-amazon.com/images/I/7159+ELcEOL._AC_UF894,1000_QL80_.jpg",
    badge: "Sale",
    badgeColor: "#EF4444",
  },
  {
    id: "5",
    name: "Merino Wool Crewneck Sweater",
    price: 145,
    compareAtPrice: 195,
    category: "Apparel",
    rating: 4.8,
    reviewCount: 1456,
    image: "/images/merino-wool-crewneck-sweater.jpg",
    badge: null,
    badgeColor: null,
  },
  {
    id: "6",
    name: "Portable Bluetooth Speaker",
    price: 129,
    compareAtPrice: 159,
    category: "Electronics",
    rating: 4.7,
    reviewCount: 2089,
    image: "/images/portable-bluetooth-speaker.jpg",
    badge: "Popular",
    badgeColor: "#8B5CF6",
  },
  {
    id: "7",
    name: "Handcrafted Soy Candle Set",
    price: 48,
    compareAtPrice: null,
    category: "Home",
    rating: 4.9,
    reviewCount: 743,
    image: "/images/handcrafted-soy-candle-set.jpg",
    badge: null,
    badgeColor: null,
  },
  {
    id: "8",
    name: "Stainless Steel Water Bottle",
    price: 39,
    compareAtPrice: 55,
    category: "Lifestyle",
    rating: 4.8,
    reviewCount: 4201,
    image: "https://picsum.photos/seed/f2e6e4bc1ee9/800/600",
    badge: "Best Seller",
    badgeColor: "#96BF48",
  },
];

const categories = [
  { name: "Electronics", icon: Zap, count: 248, image: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Arduino_ftdi_chip-1.jpg", color: "#3B82F6" },
  { name: "Apparel", icon: Tag, count: 512, image: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Arduino_ftdi_chip-1.jpg", color: "#EC4899" },
  { name: "Home & Living", icon: Package, count: 389, image: "https://static01.nyt.com/images/2024/02/06/multimedia/FASHION-PREVIEW-gmkt/FASHION-PREVIEW-gmkt-mobileMasterAt3x.jpg?auto=webp&quality=90", color: "#F59E0B" },
  { name: "Fitness", icon: TrendingUp, count: 176, image: "/images/fitness-category-sports.jpg", color: "#10B981" },
  { name: "Accessories", icon: Award, count: 294, image: "/images/accessories-category-bags.jpg", color: "#8B5CF6" },
  { name: "Kitchen", icon: ShoppingBag, count: 203, image: "/images/kitchen-category-cookware.jpg", color: "#EF4444" },
];

const testimonials = [
  {
    id: "1",
    name: "Sarah Mitchell",
    role: "Verified Buyer",
    avatar: "/images/customer-sarah-mitchell.jpg",
    rating: 5,
    text: "Absolutely love the quality of everything I've ordered. Fast shipping and the products exceeded my expectations. Will definitely be a repeat customer.",
    product: "Wireless Headphones",
  },
  {
    id: "2",
    name: "James Okafor",
    role: "Verified Buyer",
    avatar: "/images/customer-james-okafor.jpg",
    rating: 5,
    text: "The leather watch is stunning in person. The craftsmanship is exceptional and it arrived beautifully packaged. Perfect gift for myself.",
    product: "Minimalist Watch",
  },
  {
    id: "3",
    name: "Priya Sharma",
    role: "Verified Buyer",
    avatar: "/images/customer-priya-sharma.jpg",
    rating: 5,
    text: "I've been using the yoga mat for three months now and it still looks brand new. The grip is incredible and the thickness is just right.",
    product: "Premium Yoga Mat",
  },
];

const trustBadges = [
  { icon: Truck, title: "Free Shipping", subtitle: "On orders over $75" },
  { icon: Shield, title: "Secure Checkout", subtitle: "256-bit SSL encryption" },
  { icon: RefreshCw, title: "Easy Returns", subtitle: "30-day return policy" },
  { icon: Headphones, title: "24/7 Support", subtitle: "Always here to help" },
];

const stats = [
  { value: "2M+", label: "Happy Customers", icon: Users },
  { value: "50K+", label: "Products Listed", icon: Package },
  { value: "98%", label: "Satisfaction Rate", icon: Star },
  { value: "150+", label: "Countries Served", icon: TrendingUp },
];

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${
              star <= Math.floor(rating)
                ? "fill-amber-400 text-amber-400"
                : star - 0.5 <= rating
                ? "fill-amber-200 text-amber-400"
                : "fill-neutral-200 text-neutral-300"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-neutral-500">({(count ?? 0).toLocaleString("en-US")})</span>
    </div>
  );
}

function ProductCard({ product, index }: { product: typeof featuredProducts[0]; index: number }) {
  const [wished, setWished] = useState(false);
  const [hovered, setHovered] = useState(false);

  const discount =
    product.compareAtPrice
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : null;

  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.06),0_16px_40px_-12px_rgba(0,0,0,0.14)] transition-all duration-300"
    >
      <div className="relative aspect-square overflow-hidden bg-neutral-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span
            className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold text-white"
            style={{ backgroundColor: product.badgeColor ?? "#96BF48" }}
          >
            {product.badge}
          </span>
        )}
        {discount && (
          <span className="absolute top-3 right-10 px-2 py-1 rounded-full text-xs font-semibold bg-red-500 text-white">
            -{discount}%
          </span>
        )}
        <button
          onClick={() => setWished((w) => !w)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-all duration-200"
          aria-label="Add to wishlist"
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-200 ${
              wished ? "fill-red-500 text-red-500" : "text-neutral-400"
            }`}
          />
        </button>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-3 left-3 right-3"
        >
          <button className="w-full py-2.5 bg-neutral-900 hover:bg-[#5E8E3E] text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors duration-200">
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </motion.div>
      </div>
      <div className="p-4">
        <p className="text-xs text-neutral-400 font-medium uppercase tracking-wide mb-1">
          {product.category}
        </p>
        <h3 className="text-sm font-semibold text-neutral-900 leading-snug mb-2 line-clamp-2">
          {product.name}
        </h3>
        <StarRating rating={product.rating} count={product.reviewCount} />
        <div className="flex items-center gap-2 mt-2">
          <span className="text-base font-bold text-neutral-900">
            ${(product.price ?? 0).toLocaleString("en-US")}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-neutral-400 line-through">
              ${(product.compareAtPrice ?? 0).toLocaleString("en-US")}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function StorefrontHomePage() {
  const t = useTranslations();
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");

  const categoryFilters = ["All", "Electronics", "Apparel", "Home", "Fitness", "Accessories", "Kitchen"];

  const filteredProducts =
    activeCategory === "All"
      ? featuredProducts
      : featuredProducts.filter(
          (p) =>
            p.category === activeCategory ||
            (activeCategory === "Home" && p.category === "Home & Living") ||
            (activeCategory === "Home" && p.category === "Kitchen") ||
            (activeCategory === "Home" && p.category === "Lifestyle")
        );

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 pt-24 pb-0">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#96BF48]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#96BF48]/8 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="pb-16 lg:pb-24"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#96BF48]/15 border border-[#96BF48]/30 mb-6">
                <Zap className="w-3.5 h-3.5 text-[#96BF48]" />
                <span className="text-xs font-semibold text-[#96BF48] tracking-wide uppercase">New Arrivals This Week</span>
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.05] text-balance mb-6"
              >
                Shop the
                <span className="block text-[#96BF48]">World's Best</span>
                Products
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-lg text-neutral-300 leading-relaxed max-w-md mb-8 text-pretty"
              >
                Discover thousands of premium products from independent brands and makers. Quality you can trust, delivered to your door.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#96BF48] hover:bg-[#5E8E3E] text-white font-semibold rounded-xl transition-all duration-200 shadow-[0_4px_14px_rgba(150,191,72,0.4)] hover:shadow-[0_6px_20px_rgba(150,191,72,0.5)]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Shop Now
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl border border-white/20 transition-all duration-200"
                >
                  View Collections
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.div variants={fadeInUp} className="flex items-center gap-6 mt-10">
                {[
                  { value: "2M+", label: "Customers" },
                  { value: "50K+", label: "Products" },
                  { value: "4.9", label: "Avg Rating" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-neutral-400 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              variants={slideInRight}
              initial="hidden"
              animate="visible"
              className="relative hidden lg:block"
            >
              <div className="relative h-[520px]">
                <div className="absolute bottom-0 right-0 w-[420px] h-[480px] rounded-t-3xl overflow-hidden">
                  <img
                    src="/images/hero-storefront-lifestyle-products.jpg"
                    alt="Featured products"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent" />
                </div>
                <motion.div
                  initial={{ opacity: 0, x: -20, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="absolute top-12 -left-4 bg-white rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.16)] w-52"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-[#96BF48]/10 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-[#96BF48]" />
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500">Today's Sales</div>
                      <div className="text-lg font-bold text-neutral-900">$12,480</div>
                    </div>
                  </div>
                  <div className="text-xs text-[#96BF48] font-semibold">+24% from yesterday</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20, y: -20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute bottom-16 -left-8 bg-white rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.16)] w-48"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex -space-x-1.5">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-6 h-6 rounded-full bg-neutral-200 border-2 border-white overflow-hidden">
                          <img src={`/images/avatar-customer-${i}.jpg`} alt="" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-neutral-700">+2.4k</span>
                  </div>
                  <div className="text-xs text-neutral-500">New customers this week</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-neutral-50 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {trustBadges.map((badge) => (
              <motion.div
                key={badge.title}
                variants={fadeInUp}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#96BF48]/10 flex items-center justify-center flex-shrink-0">
                  <badge.icon className="w-5 h-5 text-[#96BF48]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-neutral-900">{badge.title}</div>
                  <div className="text-xs text-neutral-500">{badge.subtitle}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <p className="text-xs font-semibold text-[#96BF48] uppercase tracking-widest mb-2">Browse by Category</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
                Find What You Love
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[#5E8E3E] hover:text-[#96BF48] transition-colors duration-200"
            >
              All Categories <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {categories.map((cat) => (
              <motion.div
                key={cat.name}
                variants={scaleIn}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <Link
                  href="/products"
                  className="group flex flex-col items-center gap-3 p-4 rounded-2xl bg-neutral-50 hover:bg-white border border-neutral-100 hover:border-neutral-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-300"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: `${cat.color}15` }}
                  >
                    <cat.icon className="w-7 h-7" style={{ color: cat.color }} />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-neutral-800 group-hover:text-neutral-900">{cat.name}</div>
                    <div className="text-xs text-neutral-400 mt-0.5">{cat.count} items</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
          >
            <div>
              <p className="text-xs font-semibold text-[#96BF48] uppercase tracking-widest mb-2">Handpicked for You</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
                Featured Products
              </h2>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#5E8E3E] hover:text-[#96BF48] transition-colors duration-200"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex gap-2 flex-wrap mb-8"
          >
            {categoryFilters.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#96BF48] text-white shadow-[0_2px_8px_rgba(150,191,72,0.4)]"
                    : "bg-white text-neutral-600 border border-neutral-200 hover:border-[#96BF48] hover:text-[#5E8E3E]"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {(filteredProducts ?? []).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#96BF48]/15 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#96BF48]/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
            </div>
            <div className="relative grid lg:grid-cols-2 gap-8 items-center p-10 lg:p-16">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#96BF48]/20 border border-[#96BF48]/30 mb-5">
                  <Tag className="w-3.5 h-3.5 text-[#96BF48]" />
                  <span className="text-xs font-semibold text-[#96BF48] uppercase tracking-wide">Limited Time Offer</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
                  Up to 40% Off
                  <span className="block text-[#96BF48]">Summer Collection</span>
                </h2>
                <p className="text-neutral-300 text-lg leading-relaxed mb-8 max-w-md">
                  Refresh your wardrobe and home with our biggest sale of the season. Hundreds of items marked down for a limited time.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#96BF48] hover:bg-[#5E8E3E] text-white font-semibold rounded-xl transition-all duration-200 shadow-[0_4px_14px_rgba(150,191,72,0.4)]"
                  >
                    Shop the Sale
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              <div className="hidden lg:flex justify-end">
                <div className="relative w-80 h-72 rounded-2xl overflow-hidden">
                  <img
                    src="/images/summer-sale-collection-fashion.jpg"
                    alt="Summer sale collection"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-[#96BF48] flex items-center justify-center shadow-lg">
                    <div className="text-center">
                      <div className="text-white font-extrabold text-lg leading-none">40%</div>
                      <div className="text-white/80 text-xs font-medium">OFF</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#96BF48]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-4xl font-extrabold text-white tracking-tight">{stat.value}</div>
                <div className="text-white/80 text-sm font-medium mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <p className="text-xs font-semibold text-[#96BF48] uppercase tracking-widest mb-2">Customer Reviews</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
              Loved by Millions
            </h2>
            <p className="text-neutral-500 mt-3 max-w-xl mx-auto text-pretty">
              Real reviews from real customers. See why shoppers keep coming back.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-3 gap-6"
          >
            {testimonials.map((review) => (
              <motion.div
                key={review.id}
                variants={fadeInUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)]"
              >
                <div className="flex items-center gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-neutral-700 text-sm leading-relaxed mb-5">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-100 flex-shrink-0">
                    <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-neutral-900">{review.name}</div>
                    <div className="text-xs text-neutral-400">{review.role} · {review.product}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Recently Viewed / Trending */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <p className="text-xs font-semibold text-[#96BF48] uppercase tracking-widest mb-3">Why Choose Us</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight mb-6">
                Shopping Made Simple and Secure
              </h2>
              <p className="text-neutral-500 leading-relaxed mb-8 text-pretty">
                We partner with the world's best independent brands to bring you a curated selection of premium products. Every purchase is protected by our buyer guarantee.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Shield, title: "Buyer Protection", desc: "Every order is covered by our full money-back guarantee." },
                  { icon: Truck, title: "Fast Delivery", desc: "Most orders ship within 24 hours and arrive in 2-5 days." },
                  { icon: Award, title: "Curated Quality", desc: "Every product is vetted by our team before it goes live." },
                  { icon: Headphones, title: "Expert Support", desc: "Our team is available around the clock to help you." },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#96BF48]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <item.icon className="w-5 h-5 text-[#96BF48]" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-neutral-900 mb-0.5">{item.title}</div>
                      <div className="text-sm text-neutral-500">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
                <img
                  src="/images/shopping-experience-happy-customer.jpg"
                  alt="Happy customer shopping"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/30 to-transparent" />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-neutral-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#96BF48]/10 flex items-center justify-center">
                    <Eye className="w-6 h-6 text-[#96BF48]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-neutral-900">98%</div>
                    <div className="text-xs text-neutral-500">Customer Satisfaction</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#96BF48]/15 border border-[#96BF48]/30 mb-6">
              <Mail className="w-3.5 h-3.5 text-[#96BF48]" />
              <span className="text-xs font-semibold text-[#96BF48] uppercase tracking-wide">Stay in the Loop</span>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4 text-balance"
            >
              Get Exclusive Deals Delivered to Your Inbox
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-neutral-400 text-lg mb-8 text-pretty"
            >
              Join over 500,000 shoppers who get early access to sales, new arrivals, and members-only discounts.
            </motion.p>
            <motion.form
              variants={fadeInUp}
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-5 py-3.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 text-sm outline-none focus:border-[#96BF48] transition-colors duration-200"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-[#96BF48] hover:bg-[#5E8E3E] text-white font-semibold rounded-xl transition-all duration-200 whitespace-nowrap shadow-[0_4px_14px_rgba(150,191,72,0.4)]"
              >
                Subscribe Free
              </button>
            </motion.form>
            <motion.p variants={fadeInUp} className="text-neutral-600 text-xs mt-4">
              No spam, ever. Unsubscribe at any time.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
