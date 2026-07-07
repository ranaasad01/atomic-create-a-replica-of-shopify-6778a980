"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, Check, Star, ShoppingCart, BarChart2, Globe, Shield, Zap, Users, Package, CreditCard, Smartphone, ChevronRight, Play, TrendingUp, Award, Heart } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn, slideInLeft, slideInRight } from "@/lib/motion";
import { APP_NAME, APP_TAGLINE } from "@/lib/data";

// ─── Inline mock data ────────────────────────────────────────────────────────

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
  },
  {
    id: "2",
    name: "Minimalist Leather Watch",
    price: 189,
    compareAtPrice: 249,
    category: "Accessories",
    rating: 4.9,
    reviewCount: 1872,
    image: "https://i.etsystatic.com/11276331/r/il/0d5206/3887810690/il_570xN.3887810690_pojq.jpg",
    badge: "New",
  },
  {
    id: "3",
    name: "Ergonomic Office Chair",
    price: 549,
    compareAtPrice: 699,
    category: "Furniture",
    rating: 4.7,
    reviewCount: 934,
    image: "https://technimobili.com/cdn/shop/files/RTA-3263C-BK-01.jpg?v=1740778095&width=1780",
    badge: "Sale",
  },
  {
    id: "4",
    name: "Ceramic Pour-Over Coffee Set",
    price: 89,
    compareAtPrice: undefined,
    category: "Kitchen",
    rating: 4.6,
    reviewCount: 612,
    image: "https://m.media-amazon.com/images/I/7159+ELcEOL._AC_UF894,1000_QL80_.jpg",
    badge: undefined,
  },
];

const features = [
  {
    icon: ShoppingCart,
    title: "Seamless Storefront",
    description:
      "Launch a beautiful online store in minutes. Customize every detail with our drag-and-drop editor and 100+ premium themes.",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: CreditCard,
    title: "Payments Built In",
    description:
      "Accept credit cards, PayPal, Apple Pay, and 100+ payment methods worldwide. No third-party setup required.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: BarChart2,
    title: "Real-Time Analytics",
    description:
      "Track sales, traffic, and customer behavior with a live dashboard. Make smarter decisions backed by data.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: Globe,
    title: "Sell Everywhere",
    description:
      "Reach customers on Instagram, TikTok, Amazon, and your own store — all managed from one unified dashboard.",
    color: "bg-orange-50 text-orange-600",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "PCI-compliant, SSL-encrypted, and protected by 24/7 fraud analysis. Your store and customers stay safe.",
    color: "bg-red-50 text-red-600",
  },
  {
    icon: Smartphone,
    title: "Mobile Commerce",
    description:
      "Manage your entire business from your phone. Process orders, respond to customers, and track inventory on the go.",
    color: "bg-teal-50 text-teal-600",
  },
];

const testimonials = [
  {
    id: "t1",
    name: "Sarah Chen",
    role: "Founder, Bloom Botanicals",
    avatar: "https://imageio.forbes.com/specials-images/imageserve/5c928fa04bbe6f52641ab341/0x0.jpg?format=jpg&crop=2124,2123,x980,y756,safe&height=416&width=416&fit=bounds",
    quote:
      "Switching to Shopify was the best decision I made for my business. Revenue grew 340% in the first year. The analytics alone paid for itself.",
    stars: 5,
    revenue: "$2.4M",
    revenueLabel: "Annual Revenue",
  },
  {
    id: "t2",
    name: "Marcus Rivera",
    role: "CEO, Apex Streetwear",
    avatar: "http://tinabangel.com/wp-content/uploads/2015/04/MARCUS-RIVERA.png",
    quote:
      "We launched 12 product drops last year without a single technical issue. The platform scales effortlessly whether we sell 10 or 10,000 units.",
    stars: 5,
    revenue: "10K+",
    revenueLabel: "Orders Processed",
  },
  {
    id: "t3",
    name: "Priya Nair",
    role: "Owner, Spice Route Kitchen",
    avatar: "https://media.licdn.com/dms/image/v2/D5622AQE3NpM1FP01Yg/feedshare-shrink_800/B56Zf4pvKcGUAg-/0/1752223383746?e=2147483647&v=beta&t=C11dC6M36dpAKpcbBRMtusPrnkgE-cNJfHc93ZNpFoQ",
    quote:
      "The multi-channel selling feature is incredible. I manage my Etsy, Instagram shop, and website from one place. It saves me 15 hours a week.",
    stars: 5,
    revenue: "15 hrs",
    revenueLabel: "Saved Per Week",
  },
];

const stats = [
  { value: "4.4M", label: "Active Merchants", icon: Users },
  { value: "$700B+", label: "Total Sales Processed", icon: TrendingUp },
  { value: "175+", label: "Countries Supported", icon: Globe },
  { value: "99.99%", label: "Platform Uptime", icon: Zap },
];

const pricingPlans = [
  {
    id: "basic",
    name: "Basic",
    price: 29,
    description: "Perfect for new merchants just getting started.",
    features: [
      "Online store with unlimited products",
      "2 staff accounts",
      "Up to 4 inventory locations",
      "24/7 chat support",
      "Shopify Payments (2.9% + 30¢)",
      "Basic reports",
    ],
    cta: "Start free trial",
    highlighted: false,
  },
  {
    id: "shopify",
    name: "Shopify",
    price: 79,
    description: "For growing businesses ready to scale.",
    features: [
      "Everything in Basic",
      "5 staff accounts",
      "Up to 5 inventory locations",
      "Professional reports",
      "Shopify Payments (2.6% + 30¢)",
      "Gift cards & discount codes",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    id: "advanced",
    name: "Advanced",
    price: 299,
    description: "For high-volume merchants who need advanced tools.",
    features: [
      "Everything in Shopify",
      "15 staff accounts",
      "Up to 8 inventory locations",
      "Advanced report builder",
      "Shopify Payments (2.4% + 30¢)",
      "Third-party calculated shipping",
    ],
    cta: "Start free trial",
    highlighted: false,
  },
];

const categories = [
  { name: "Fashion", image: "https://static01.nyt.com/images/2024/02/06/multimedia/FASHION-PREVIEW-gmkt/FASHION-PREVIEW-gmkt-mobileMasterAt3x.jpg?auto=webp&quality=90", count: "12,400+ products" },
  { name: "Electronics", image: "https://static01.nyt.com/images/2024/02/06/multimedia/FASHION-PREVIEW-gmkt/FASHION-PREVIEW-gmkt-mobileMasterAt3x.jpg?auto=webp&quality=90", count: "8,200+ products" },
  { name: "Home & Living", image: "https://static01.nyt.com/images/2024/02/06/multimedia/FASHION-PREVIEW-gmkt/FASHION-PREVIEW-gmkt-mobileMasterAt3x.jpg?auto=webp&quality=90", count: "15,600+ products" },
  { name: "Beauty", image: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Arduino_ftdi_chip-1.jpg", count: "6,800+ products" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" data-atomic-id="aqs3qkq">
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

function ProductCard({ product }: { product: typeof featuredProducts[0] }) {
  const [wished, setWished] = useState(false);
  const discount =
    product.compareAtPrice
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : 0;

  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group bg-white rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] border border-black/5 flex flex-col"
    >
      <div
        className="relative overflow-hidden aspect-[4/3] bg-neutral-100"
        data-atomic-id="acgjrgw">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          data-atomic-id="a13mxhot" />
        {product.badge && (
          <span
            className="absolute top-3 left-3 px-2.5 py-1 bg-[#96BF48] text-white text-xs font-semibold rounded-full"
            data-atomic-id="a161kfww">
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span
            className="absolute top-3 right-10 px-2.5 py-1 bg-red-500 text-white text-xs font-semibold rounded-full"
            data-atomic-id="ab30jyq">
            -{discount}%
          </span>
        )}
        <button
          onClick={() => setWished((w) => !w)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors duration-200"
          aria-label="Wishlist"
          data-atomic-id="ad6qu2a">
          <Heart
            className={`w-4 h-4 transition-colors duration-200 ${
              wished ? "fill-red-500 text-red-500" : "text-neutral-400"
            }`}
          />
        </button>
      </div>
      <div className="p-4 flex flex-col flex-1" data-atomic-id="achylle">
        <span
          className="text-xs font-medium text-[#5E8E3E] uppercase tracking-wide mb-1"
          data-atomic-id="a13xhhgk">
          {product.category}
        </span>
        <h3
          className="text-sm font-semibold text-neutral-900 leading-snug mb-2 flex-1"
          data-atomic-id="ap31l73">
          {product.name}
        </h3>
        <div className="flex items-center gap-1.5 mb-3" data-atomic-id="a1ahmlzt">
          <StarRating rating={product.rating} />
          <span className="text-xs text-neutral-500" data-atomic-id="asq0b59">
            ({(product.reviewCount ?? 0).toLocaleString("en-US")})
          </span>
        </div>
        <div className="flex items-center justify-between" data-atomic-id="a1aj1g4b">
          <div className="flex items-baseline gap-1.5" data-atomic-id="aid89q6">
            <span className="text-base font-bold text-neutral-900" data-atomic-id="ap5tnv4">
              ${product.price}
            </span>
            {product.compareAtPrice && (
              <span
                className="text-sm text-neutral-400 line-through"
                data-atomic-id="a1rrq6ri">
                ${product.compareAtPrice}
              </span>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#96BF48] hover:bg-[#5E8E3E] text-white text-xs font-semibold rounded-lg transition-colors duration-200"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const t = useTranslations();
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<"monthly" | "yearly">("monthly");
  const [email, setEmail] = useState("");

  const motionProps = shouldReduceMotion
    ? { initial: "visible", animate: "visible", whileInView: undefined }
    : {};

  return (
    <main className="overflow-x-hidden" data-atomic-id="ajigxjc">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 overflow-hidden"
        data-atomic-id="ayt3h4t">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(150,191,72,0.18) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(94,142,62,0.12) 0%, transparent 40%)",
          }}
          data-atomic-id="a1eouor4" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
          data-atomic-id="a1eq9ivm" />

        <div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-16 items-center"
          data-atomic-id="a1erod04">Start</div>
      </section>
      {/* ── STATS BAR ────────────────────────────────────────────────────── */}
      <section className="bg-[#96BF48] py-10" data-atomic-id="am125q9">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, __atomicIdx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="flex flex-col items-center text-center"
              >
                <Icon className="w-6 h-6 text-white/70 mb-2" />
                <span
                  className="text-3xl font-extrabold text-white tracking-tight"
                  data-atomic-id="a7q32by"
                  data-atomic-instance={__atomicIdx}>
                  {stat.value}
                </span>
                <span
                  className="text-sm text-white/80 mt-1 font-medium"
                  data-atomic-id="a90oogg"
                  data-atomic-instance={__atomicIdx}>{stat.label}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
      {/* ── FEATURED PRODUCTS ────────────────────────────────────────────── */}
      <section id="products" className="py-24 bg-neutral-50" data-atomic-id="a1s5hqmk">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          data-atomic-id="a1334j25">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-12"
          >
            <motion.p variants={fadeInUp} className="text-[#5E8E3E] text-sm font-semibold uppercase tracking-widest mb-2">
              {t("products.eyebrow")}
            </motion.p>
            <div
              className="flex items-end justify-between gap-4 flex-wrap"
              data-atomic-id="a14sesx1">
              <motion.h2
                variants={fadeInUp}
                className="text-4xl font-extrabold text-neutral-900 tracking-tight text-balance"
              >
                {t("products.heading")}
              </motion.h2>
              <motion.div variants={fadeInUp}>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#5E8E3E] hover:text-[#96BF48] transition-colors duration-200"
                >
                  {t("products.view_all")}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </div>
      </section>
      {/* ── CATEGORIES ───────────────────────────────────────────────────── */}
      <section id="about" className="py-24 bg-white" data-atomic-id="a1fdgf80">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          data-atomic-id="a1gmvnr5">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <motion.p variants={fadeInUp} className="text-[#5E8E3E] text-sm font-semibold uppercase tracking-widest mb-2">
              {t("categories.eyebrow")}
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl font-extrabold text-neutral-900 tracking-tight text-balance">
              {t("categories.heading")}
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                variants={scaleIn}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className={`relative overflow-hidden rounded-2xl cursor-pointer group ${
                  i === 0 ? "lg:col-span-2 lg:row-span-1" : ""
                }`}
              >
                <div
                  className="aspect-square lg:aspect-auto lg:h-64 relative"
                  data-atomic-id="asity53"
                  data-atomic-instance={i}>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    data-atomic-id="amw4050"
                    data-atomic-instance={i} />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
                    data-atomic-id="amxipz0"
                    data-atomic-instance={i} />
                  <div
                    className="absolute bottom-0 left-0 right-0 p-5"
                    data-atomic-id="amyxk3i"
                    data-atomic-instance={i}>
                    <h3
                      className="text-white font-bold text-lg"
                      data-atomic-id="ava9wc9"
                      data-atomic-instance={i}>{cat.name}</h3>
                    <p
                      className="text-white/70 text-sm mt-0.5"
                      data-atomic-id="a1n2bats"
                      data-atomic-instance={i}>{cat.count}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section id="features" className="py-24 bg-neutral-950" data-atomic-id="a12lf3tg">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          data-atomic-id="a1u6msg5">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.p variants={fadeInUp} className="text-[#96BF48] text-sm font-semibold uppercase tracking-widest mb-2">
              {t("features.eyebrow")}
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl font-extrabold text-white tracking-tight text-balance max-w-2xl mx-auto">
              {t("features.heading")}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-neutral-400 text-lg mt-4 max-w-xl mx-auto leading-relaxed text-pretty">
              {t("features.subtext")}
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feat, __atomicIdx) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  variants={fadeInUp}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-[#96BF48]/30 transition-all duration-300"
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${feat.color}`}
                    data-atomic-id="a18gy385"
                    data-atomic-instance={__atomicIdx}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3
                    className="text-white font-semibold text-base mb-2"
                    data-atomic-id="a1eusb67"
                    data-atomic-instance={__atomicIdx}>{feat.title}</h3>
                  <p
                    className="text-neutral-400 text-sm leading-relaxed"
                    data-atomic-id="a124s31i"
                    data-atomic-instance={__atomicIdx}>{feat.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section id="testimonials" className="py-24 bg-white" data-atomic-id="a1mvuasv">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          data-atomic-id="afkqt6o">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <motion.p variants={fadeInUp} className="text-[#5E8E3E] text-sm font-semibold uppercase tracking-widest mb-2">
              {t("testimonials.eyebrow")}
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl font-extrabold text-neutral-900 tracking-tight text-balance">
              {t("testimonials.heading")}
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {testimonials.map((t_item, i) => (
              <motion.div
                key={t_item.id}
                variants={fadeInUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`rounded-2xl p-7 flex flex-col shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] border ${
                  i === 1
                    ? "bg-neutral-950 border-[#96BF48]/30 text-white"
                    : "bg-white border-black/5"
                }`}
              >
                <div
                  className="flex items-center gap-0.5 mb-4"
                  data-atomic-id="aqty4za"
                  data-atomic-instance={i}>
                  {Array.from({ length: t_item.stars }).map((_, si) => (
                    <Star key={si} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p
                  className={`text-sm leading-relaxed flex-1 mb-6 ${i === 1 ? "text-neutral-300" : "text-neutral-600"}`}
                  data-atomic-id="azu0eit"
                  data-atomic-instance={i}>
                  &ldquo;{t_item.quote}&rdquo;
                </p>
                <div
                  className="flex items-center justify-between"
                  data-atomic-id="aqwrt8a"
                  data-atomic-instance={i}>
                  <div
                    className="flex items-center gap-3"
                    data-atomic-id="a1fid9rx"
                    data-atomic-instance={i}>
                    <img
                      src={t_item.avatar}
                      alt={t_item.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-[#96BF48]/30"
                      data-atomic-id="a4ju5ju"
                      data-atomic-instance={i} />
                    <div data-atomic-id="a4l8vdu" data-atomic-instance={i}>
                      <p
                        className={`text-sm font-semibold ${i === 1 ? "text-white" : "text-neutral-900"}`}
                        data-atomic-id="a1i2uzjm"
                        data-atomic-instance={i}>
                        {t_item.name}
                      </p>
                      <p
                        className={`text-xs ${i === 1 ? "text-neutral-400" : "text-neutral-500"}`}
                        data-atomic-id="a1i2v184"
                        data-atomic-instance={i}>
                        {t_item.role}
                      </p>
                    </div>
                  </div>
                  <div className="text-right" data-atomic-id="a1fjs3wf" data-atomic-instance={i}>
                    <p
                      className="text-[#96BF48] font-bold text-lg"
                      data-atomic-id="a1tfjq3z"
                      data-atomic-instance={i}>{t_item.revenue}</p>
                    <p
                      className={`text-xs ${i === 1 ? "text-neutral-400" : "text-neutral-500"}`}
                      data-atomic-id="a1tfjrsh"
                      data-atomic-instance={i}>
                      {t_item.revenueLabel}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* ── PRICING ──────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-24 bg-neutral-50" data-atomic-id="a1a3szeb">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          data-atomic-id="at4hxvo">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <motion.p variants={fadeInUp} className="text-[#5E8E3E] text-sm font-semibold uppercase tracking-widest mb-2">
              {t("pricing.eyebrow")}
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl font-extrabold text-neutral-900 tracking-tight text-balance mb-4">
              {t("pricing.heading")}
            </motion.h2>
            <motion.div variants={fadeInUp} className="inline-flex items-center bg-neutral-200 rounded-full p-1 gap-1">
              <button
                onClick={() => setActiveTab("monthly")}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeTab === "monthly"
                    ? "bg-white text-neutral-900 shadow-sm"
                    : "text-neutral-500 hover:text-neutral-700"
                }`}
                data-atomic-id="a1woyr2i">
                {t("pricing.monthly")}
              </button>
              <button
                onClick={() => setActiveTab("yearly")}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeTab === "yearly"
                    ? "bg-white text-neutral-900 shadow-sm"
                    : "text-neutral-500 hover:text-neutral-700"
                }`}
                data-atomic-id="a1lqjxos">
                {t("pricing.yearly")}
                <span
                  className="ml-1.5 text-xs text-[#5E8E3E] font-bold"
                  data-atomic-id="a1afw03r">{t("pricing.save")}</span>
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {pricingPlans.map((plan, __atomicIdx) => {
              const displayPrice =
                activeTab === "yearly"
                  ? Math.round(plan.price * 0.8)
                  : plan.price;
              return (
                <motion.div
                  key={plan.id}
                  variants={scaleIn}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`rounded-2xl p-7 flex flex-col relative ${
                    plan.highlighted
                      ? "bg-neutral-950 border-2 border-[#96BF48] shadow-[0_0_40px_rgba(150,191,72,0.15)]"
                      : "bg-white border border-black/8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)]"
                  }`}
                >
                  {plan.highlighted && (
                    <div
                      className="absolute -top-3.5 left-1/2 -translate-x-1/2"
                      data-atomic-id="a1n48osg"
                      data-atomic-instance={__atomicIdx}>
                      <span
                        className="inline-flex items-center gap-1 px-3 py-1 bg-[#96BF48] text-white text-xs font-bold rounded-full"
                        data-atomic-id="aoq8zte"
                        data-atomic-instance={__atomicIdx}>
                        <Award className="w-3 h-3" />
                        {t("pricing.popular")}
                      </span>
                    </div>
                  )}
                  <div
                    className="mb-6"
                    data-atomic-id="afap01i"
                    data-atomic-instance={__atomicIdx}>
                    <h3
                      className={`text-lg font-bold mb-1 ${plan.highlighted ? "text-white" : "text-neutral-900"}`}
                      data-atomic-id="a14in8fl"
                      data-atomic-instance={__atomicIdx}>
                      {plan.name}
                    </h3>
                    <p
                      className={`text-sm ${plan.highlighted ? "text-neutral-400" : "text-neutral-500"}`}
                      data-atomic-id="axiiyh4"
                      data-atomic-instance={__atomicIdx}>
                      {plan.description}
                    </p>
                  </div>
                  <div
                    className="mb-6"
                    data-atomic-id="afc3u60"
                    data-atomic-instance={__atomicIdx}>
                    <div
                      className="flex items-baseline gap-1"
                      data-atomic-id="a1tb596j"
                      data-atomic-instance={__atomicIdx}>
                      <span
                        className={`text-4xl font-extrabold ${plan.highlighted ? "text-white" : "text-neutral-900"}`}
                        data-atomic-id="a1kv7dhp"
                        data-atomic-instance={__atomicIdx}>
                        ${displayPrice}
                      </span>
                      <span
                        className={`text-sm ${plan.highlighted ? "text-neutral-400" : "text-neutral-500"}`}
                        data-atomic-id="a1m5szm7"
                        data-atomic-instance={__atomicIdx}>
                        /mo
                      </span>
                    </div>
                    {activeTab === "yearly" && (
                      <p
                        className="text-xs text-[#96BF48] font-medium mt-1"
                        data-atomic-id="a16n01h2"
                        data-atomic-instance={__atomicIdx}>
                        {t("pricing.billed_yearly")}
                      </p>
                    )}
                  </div>
                  <ul
                    className="space-y-3 flex-1 mb-7"
                    data-atomic-id="a92q5rs"
                    data-atomic-instance={__atomicIdx}>
                    {plan.features.map((feat, __atomicIdx) => (<li
                      key={feat}
                      className="flex items-start gap-2.5"
                      data-atomic-id="a1mn1dkq"
                      data-atomic-instance={__atomicIdx}>
                      <Check
                        className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          plan.highlighted ? "text-[#96BF48]" : "text-[#5E8E3E]"
                        }`}
                      />
                      <span
                        className={`text-sm ${plan.highlighted ? "text-neutral-300" : "text-neutral-600"}`}
                        data-atomic-id="a183nzjw"
                        data-atomic-instance={__atomicIdx}>
                        {feat}
                      </span>
                    </li>))}
                  </ul>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/dashboard"
                      className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                        plan.highlighted
                          ? "bg-[#96BF48] hover:bg-[#5E8E3E] text-white"
                          : "bg-neutral-100 hover:bg-neutral-200 text-neutral-900"
                      }`}
                    >
                      {plan.cta}
                    </Link>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="py-24 bg-[#96BF48] relative overflow-hidden"
        data-atomic-id="a1ue86dq">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 10% 50%, rgba(255,255,255,0.6) 0%, transparent 40%), radial-gradient(circle at 90% 50%, rgba(255,255,255,0.4) 0%, transparent 40%)",
          }}
          data-atomic-id="a1djq0lb" />
        <div
          className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          data-atomic-id="a1dl4upt">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight text-balance mb-4"
            >
              {t("cta.heading")}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white/80 text-lg mb-10 max-w-xl mx-auto leading-relaxed text-pretty">
              {t("cta.subtext")}
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
                placeholder={t("cta.placeholder")}
                className="flex-1 px-5 py-3.5 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 text-sm outline-none focus:bg-white/30 focus:border-white/60 transition-all duration-200"
                data-atomic-id="a1la14qj" />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="px-6 py-3.5 bg-white text-[#5E8E3E] font-bold rounded-xl text-sm hover:bg-neutral-100 transition-colors duration-200 whitespace-nowrap shadow-[0_4px_16px_rgba(0,0,0,0.15)]"
              >
                {t("cta.button")}
              </motion.button>
            </motion.form>
            <motion.p variants={fadeInUp} className="text-white/60 text-xs mt-4">
              {t("cta.disclaimer")}
            </motion.p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}