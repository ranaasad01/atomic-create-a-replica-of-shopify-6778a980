"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, Tag, Shield, Truck, RotateCcw, ChevronRight, X, Check, Gift } from 'lucide-react';

type CartProduct = {
  id: string;
  name: string;
  brand: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  variant: string;
  quantity: number;
  stock: number;
};

const initialCart: CartProduct[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    brand: "SoundCraft",
    price: 149.99,
    compareAtPrice: 199.99,
    image: "https://m.media-amazon.com/images/I/61RahTQtAqL._AC_UF894,1000_QL80_.jpg",
    variant: "Midnight Black / Over-Ear",
    quantity: 1,
    stock: 8,
  },
  {
    id: "2",
    name: "Minimalist Leather Watch",
    brand: "Tempo",
    price: 249.0,
    image: "https://i.etsystatic.com/11276331/r/il/0d5206/3887810690/il_570xN.3887810690_pojq.jpg",
    variant: "Brown Leather / 40mm",
    quantity: 1,
    stock: 3,
  },
  {
    id: "3",
    name: "Organic Cotton Tote Bag",
    brand: "EcoCarry",
    price: 34.95,
    compareAtPrice: 44.95,
    image: "https://cottoncreations.com/wp-content/uploads/2026/02/ORG-12oz-tote-bag.jpg",
    variant: "Natural / Large",
    quantity: 2,
    stock: 20,
  },
];

const SHIPPING_THRESHOLD = 100;

const trustBadges = [
  { icon: Shield, label: "Secure Checkout", sub: "256-bit SSL encryption" },
  { icon: Truck, label: "Free Shipping", sub: "On orders over $100" },
  { icon: RotateCcw, label: "Easy Returns", sub: "30-day return policy" },
  { icon: Gift, label: "Gift Wrapping", sub: "Available at checkout" },
];

export default function CartPage() {
  const t = useTranslations();
  const [cartItems, setCartItems] = useState<CartProduct[]>(initialCart);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState("");
  const [removingId, setRemovingId] = useState<string | null>(null);

  const subtotal = (cartItems ?? []).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = appliedCoupon === "SAVE10" ? subtotal * 0.1 : 0;
  const shipping = subtotal - discount >= SHIPPING_THRESHOLD ? 0 : 9.99;
  const total = subtotal - discount + shipping;
  const savings = (cartItems ?? []).reduce((sum, item) => {
    if (item.compareAtPrice) {
      return sum + (item.compareAtPrice - item.price) * item.quantity;
    }
    return sum;
  }, 0);

  const shippingProgress = Math.min(
    ((subtotal - discount) / SHIPPING_THRESHOLD) * 100,
    100
  );
  const amountToFreeShipping = Math.max(
    SHIPPING_THRESHOLD - (subtotal - discount),
    0
  );

  function updateQuantity(id: string, delta: number) {
    setCartItems((prev) =>
      (prev ?? []).map((item) => {
        if (item.id !== id) return item;
        const newQty = Math.max(1, Math.min(item.stock, item.quantity + delta));
        return { ...item, quantity: newQty };
      })
    );
  }

  function removeItem(id: string) {
    setRemovingId(id);
    setTimeout(() => {
      setCartItems((prev) => (prev ?? []).filter((item) => item.id !== id));
      setRemovingId(null);
    }, 300);
  }

  function applyCoupon() {
    if (couponCode.trim().toUpperCase() === "SAVE10") {
      setAppliedCoupon("SAVE10");
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code. Try SAVE10.");
      setAppliedCoupon(null);
    }
  }

  function removeCoupon() {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
  }

  const isEmpty = (cartItems ?? []).length === 0;

  return (
    <main className="min-h-screen bg-neutral-50 pt-20 pb-24">
      {/* Page Header */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
          <Link href="/" className="hover:text-[#5E8E3E] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-neutral-900 font-medium">Shopping Cart</span>
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
            Your Cart
          </h1>
          {!isEmpty && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#96BF48]/15 text-[#5E8E3E] text-sm font-semibold">
              {cartItems.reduce((s, i) => s + i.quantity, 0)} items
            </span>
          )}
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isEmpty ? (
          /* Empty State */
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-24 h-24 rounded-full bg-neutral-100 flex items-center justify-center mb-6">
              <ShoppingCart className="w-10 h-10 text-neutral-400" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-neutral-500 mb-8 max-w-sm">
              Looks like you haven't added anything yet. Browse our products and
              find something you'll love.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#96BF48] hover:bg-[#5E8E3E] text-white font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Browse Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Free Shipping Progress */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-2xl border border-neutral-100 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#5E8E3E]" />
                    {amountToFreeShipping > 0 ? (
                      <span className="text-sm text-neutral-700">
                        Add{" "}
                        <span className="font-semibold text-neutral-900">
                          ${amountToFreeShipping.toFixed(2)}
                        </span>{" "}
                        more for free shipping
                      </span>
                    ) : (
                      <span className="text-sm font-semibold text-[#5E8E3E]">
                        You've unlocked free shipping!
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-neutral-400">
                    ${(subtotal - discount).toFixed(2)} / ${SHIPPING_THRESHOLD}
                  </span>
                </div>
                <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#96BF48] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${shippingProgress}%` }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                  />
                </div>
              </motion.div>

              {/* Items List */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-3"
              >
                <AnimatePresence>
                  {(cartItems ?? []).map((item) => (
                    <motion.div
                      key={item.id}
                      variants={fadeInUp}
                      exit={{ opacity: 0, x: -40, transition: { duration: 0.25 } }}
                      className={`bg-white rounded-2xl border border-neutral-100 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] p-5 transition-opacity duration-300 ${
                        removingId === item.id ? "opacity-40" : "opacity-100"
                      }`}
                    >
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-100">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'%3E%3Crect width='96' height='96' fill='%23f5f5f5'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23aaa' font-size='12'%3ENo Image%3C/text%3E%3C/svg%3E";
                            }}
                          />
                          {item.compareAtPrice && (
                            <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-md">
                              SALE
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-xs text-neutral-400 font-medium uppercase tracking-wide mb-0.5">
                                {item.brand}
                              </p>
                              <h3 className="font-semibold text-neutral-900 text-sm leading-snug">
                                {item.name}
                              </h3>
                              <p className="text-xs text-neutral-500 mt-1">
                                {item.variant}
                              </p>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="flex-shrink-0 p-1.5 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            {/* Quantity */}
                            <div className="flex items-center gap-1 bg-neutral-100 rounded-xl p-1">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                disabled={item.quantity <= 1}
                                className="w-7 h-7 flex items-center justify-center rounded-lg text-neutral-600 hover:bg-white hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="w-8 text-center text-sm font-semibold text-neutral-900">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                disabled={item.quantity >= item.stock}
                                className="w-7 h-7 flex items-center justify-center rounded-lg text-neutral-600 hover:bg-white hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <p className="font-bold text-neutral-900">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                              {item.compareAtPrice && (
                                <p className="text-xs text-neutral-400 line-through">
                                  $
                                  {(
                                    item.compareAtPrice * item.quantity
                                  ).toFixed(2)}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Low stock warning */}
                          {item.stock <= 5 && (
                            <p className="text-xs text-amber-600 font-medium mt-2">
                              Only {item.stock} left in stock
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Continue Shopping */}
              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="pt-2"
              >
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-sm text-[#5E8E3E] font-medium hover:gap-3 transition-all duration-200"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Continue Shopping
                </Link>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4"
              >
                {trustBadges.map((badge) => (
                  <motion.div
                    key={badge.label}
                    variants={fadeInUp}
                    className="flex flex-col items-center text-center p-4 bg-white rounded-2xl border border-neutral-100 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                  >
                    <badge.icon className="w-5 h-5 text-[#5E8E3E] mb-2" />
                    <p className="text-xs font-semibold text-neutral-800">
                      {badge.label}
                    </p>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      {badge.sub}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Order Summary */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="lg:col-span-1 space-y-4 lg:sticky lg:top-24"
            >
              {/* Summary Card */}
              <div className="bg-white rounded-2xl border border-neutral-100 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] p-6">
                <h2 className="text-lg font-bold text-neutral-900 mb-5">
                  Order Summary
                </h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-neutral-600">
                    <span>
                      Subtotal (
                      {cartItems.reduce((s, i) => s + i.quantity, 0)} items)
                    </span>
                    <span className="font-medium text-neutral-900">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span className="flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5" />
                        Coupon (SAVE10)
                      </span>
                      <span className="font-medium">-${discount.toFixed(2)}</span>
                    </div>
                  )}

                  {savings > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Sale savings</span>
                      <span className="font-medium">-${savings.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-neutral-600">
                    <span>Shipping</span>
                    <span
                      className={`font-medium ${
                        shipping === 0
                          ? "text-green-600"
                          : "text-neutral-900"
                      }`}
                    >
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-neutral-600">
                    <span>Estimated tax</span>
                    <span className="text-neutral-400 text-xs italic">
                      Calculated at checkout
                    </span>
                  </div>

                  <div className="border-t border-neutral-100 pt-3 flex justify-between">
                    <span className="font-bold text-neutral-900 text-base">
                      Total
                    </span>
                    <span className="font-bold text-neutral-900 text-base">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Coupon */}
                <div className="mt-5">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between px-3 py-2.5 bg-green-50 border border-green-200 rounded-xl">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-semibold text-green-700">
                          {appliedCoupon} applied
                        </span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-green-600 hover:text-green-800 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => {
                            setCouponCode(e.target.value);
                            setCouponError("");
                          }}
                          onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                          placeholder="Coupon code"
                          className="flex-1 px-3 py-2.5 text-sm border border-neutral-200 rounded-xl outline-none focus:border-[#96BF48] focus:ring-2 focus:ring-[#96BF48]/20 transition-all duration-200 placeholder-neutral-400"
                        />
                        <button
                          onClick={applyCoupon}
                          className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-700 text-white text-sm font-semibold rounded-xl transition-all duration-200"
                        >
                          Apply
                        </button>
                      </div>
                      {couponError && (
                        <p className="text-xs text-red-500">{couponError}</p>
                      )}
                      <p className="text-xs text-neutral-400">
                        Try{" "}
                        <button
                          onClick={() => {
                            setCouponCode("SAVE10");
                            setCouponError("");
                          }}
                          className="text-[#5E8E3E] font-medium hover:underline"
                        >
                          SAVE10
                        </button>{" "}
                        for 10% off
                      </p>
                    </div>
                  )}
                </div>

                {/* Checkout Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-5 py-3.5 bg-[#96BF48] hover:bg-[#5E8E3E] text-white font-bold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2 text-sm"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <p className="text-center text-xs text-neutral-400 mt-3">
                  Secure checkout powered by Shopify
                </p>
              </div>

              {/* Payment Methods */}
              <div className="bg-white rounded-2xl border border-neutral-100 shadow-[0_1px_2px_rgba(0,0,0,0.04)] p-4">
                <p className="text-xs text-neutral-500 text-center mb-3 font-medium">
                  Accepted Payment Methods
                </p>
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  {["Visa", "MC", "Amex", "PayPal", "Apple Pay", "Shop Pay"].map(
                    (method) => (
                      <span
                        key={method}
                        className="px-2.5 py-1 bg-neutral-50 border border-neutral-200 rounded-lg text-[11px] font-semibold text-neutral-600"
                      >
                        {method}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Recently Viewed */}
              <div className="bg-white rounded-2xl border border-neutral-100 shadow-[0_1px_2px_rgba(0,0,0,0.04)] p-5">
                <h3 className="text-sm font-bold text-neutral-900 mb-4">
                  You Might Also Like
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      name: "Bamboo Desk Organizer",
                      price: 49.95,
                      image: "https://meedenart.com/cdn/shop/files/1-07_a24e45f6-ae9b-4b15-b218-cc80ca127696_1600x.png?v=1732685200",
                    },
                    {
                      name: "Ceramic Pour-Over Set",
                      price: 64.0,
                      image: "https://m.media-amazon.com/images/I/7159+ELcEOL._AC_UF894,1000_QL80_.jpg",
                    },
                  ].map((rec) => (
                    <div
                      key={rec.name}
                      className="flex items-center gap-3 group cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0">
                        <img
                          src={rec.image}
                          alt={rec.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%23f5f5f5'/%3E%3C/svg%3E";
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-neutral-800 truncate group-hover:text-[#5E8E3E] transition-colors">
                          {rec.name}
                        </p>
                        <p className="text-xs text-neutral-500 mt-0.5">
                          ${rec.price.toFixed(2)}
                        </p>
                      </div>
                      <button className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg bg-[#96BF48]/10 text-[#5E8E3E] hover:bg-[#96BF48] hover:text-white transition-all duration-200">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </main>
  );
}