"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, ChevronRight, Package } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import type { CartItem } from "@/lib/data";

const initialCartItems: (CartItem & { id: string; color: string; size: string })[] = [
  {
    id: "ci-1",
    productId: "prod-1",
    name: "Classic Leather Sneakers",
    price: 129.99,
    image: "/images/classic-leather-sneakers.jpg",
    quantity: 1,
    variant: "White / US 10",
    color: "White",
    size: "US 10",
  },
  {
    id: "ci-2",
    productId: "prod-2",
    name: "Merino Wool Crewneck",
    price: 89.00,
    image: "/images/merino-wool-crewneck.jpg",
    quantity: 2,
    variant: "Navy / Medium",
    color: "Navy",
    size: "Medium",
  },
  {
    id: "ci-3",
    productId: "prod-3",
    name: "Slim Fit Chino Pants",
    price: 74.50,
    image: "https://picsum.photos/seed/88548b7e84b4/800/600",
    quantity: 1,
    variant: "Khaki / 32x30",
    color: "Khaki",
    size: "32x30",
  },
];

const SHIPPING_THRESHOLD = 150;
const SHIPPING_COST = 9.99;
const TAX_RATE = 0.08;

export default function CartPage() {
  const t = useTranslations();
  const [items, setItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [removingId, setRemovingId] = useState<string | null>(null);

  function updateQuantity(id: string, delta: number) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  }

  function removeItem(id: string) {
    setRemovingId(id);
    setTimeout(() => {
      setItems((prev) => prev.filter((item) => item.id !== id));
      setRemovingId(null);
    }, 300);
  }

  function applyPromo() {
    if (promoCode.trim().toUpperCase() === "SAVE10") {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoApplied(false);
      setPromoError("Invalid promo code. Try SAVE10.");
    }
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const discountedSubtotal = subtotal - discount;
  const shipping = discountedSubtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const taxes = discountedSubtotal * TAX_RATE;
  const total = discountedSubtotal + shipping + taxes;
  const freeShippingRemaining = Math.max(0, SHIPPING_THRESHOLD - discountedSubtotal);

  return (
    <main className="min-h-screen bg-neutral-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <div className="flex items-center gap-2 text-sm text-neutral-500 mb-3">
            <Link href="/" className="hover:text-[#5E8E3E] transition-colors duration-200">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-neutral-800 font-medium">Shopping Cart</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900">
            Your Cart
          </h1>
          <p className="text-neutral-500 mt-1.5 text-base">
            {items.length === 0
              ? "Your cart is empty."
              : `${items.reduce((s, i) => s + i.quantity, 0)} item${items.reduce((s, i) => s + i.quantity, 0) !== 1 ? "s" : ""} in your cart`}
          </p>
        </motion.div>

        {items.length === 0 ? (
          /* Empty State */
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-24 h-24 rounded-full bg-[#96BF48]/10 flex items-center justify-center mb-6">
              <ShoppingBag className="w-10 h-10 text-[#96BF48]" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">Your cart is empty</h2>
            <p className="text-neutral-500 mb-8 max-w-sm">
              Looks like you haven't added anything yet. Browse our collection and find something you love.
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

            {/* Left: Cart Items */}
            <div className="lg:col-span-2 space-y-4">

              {/* Free Shipping Progress */}
              {freeShippingRemaining > 0 && (
                <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  className="bg-white rounded-2xl border border-neutral-200 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.06)] p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-4 h-4 text-[#96BF48]" />
                    <p className="text-sm font-medium text-neutral-700">
                      Add <span className="text-[#5E8E3E] font-semibold">${freeShippingRemaining.toFixed(2)}</span> more for free shipping
                    </p>
                  </div>
                  <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#96BF48] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (discountedSubtotal / SHIPPING_THRESHOLD) * 100)}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              )}

              {freeShippingRemaining === 0 && (
                <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  className="bg-[#96BF48]/10 border border-[#96BF48]/30 rounded-2xl p-4 flex items-center gap-2"
                >
                  <Package className="w-4 h-4 text-[#5E8E3E]" />
                  <p className="text-sm font-semibold text-[#5E8E3E]">You qualify for free shipping!</p>
                </motion.div>
              )}

              {/* Items List */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-3"
              >
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={fadeInUp}
                      exit={{ opacity: 0, x: -40, transition: { duration: 0.25 } }}
                      layout
                      className={`bg-white rounded-2xl border border-neutral-200 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.06)] p-4 sm:p-5 transition-opacity duration-300 ${removingId === item.id ? "opacity-40" : "opacity-100"}`}
                    >
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/images/product-placeholder.jpg";
                            }}
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-semibold text-neutral-900 text-base leading-snug">{item.name}</h3>
                              {item.variant && (
                                <p className="text-sm text-neutral-500 mt-0.5">{item.variant}</p>
                              )}
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-1.5 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 flex-shrink-0"
                              aria-label={`Remove ${item.name}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
                            {/* Quantity Stepper */}
                            <div className="flex items-center gap-1 bg-neutral-100 rounded-xl p-1">
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, -1)}
                                disabled={item.quantity <= 1}
                                className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-600 hover:bg-white hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </motion.button>
                              <span className="w-8 text-center text-sm font-semibold text-neutral-900">
                                {item.quantity}
                              </span>
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-600 hover:bg-white hover:shadow-sm transition-all duration-150"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </motion.button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <p className="font-bold text-neutral-900 text-base">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                              {item.quantity > 1 && (
                                <p className="text-xs text-neutral-400">${item.price.toFixed(2)} each</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Continue Shopping */}
              <motion.div variants={fadeIn} initial="hidden" animate="visible">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#5E8E3E] hover:text-[#96BF48] transition-colors duration-200 group"
                >
                  <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform duration-200" />
                  Continue Shopping
                </Link>
              </motion.div>
            </div>

            {/* Right: Order Summary */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-2xl border border-neutral-200 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] p-6 sticky top-24">
                <h2 className="text-lg font-bold text-neutral-900 mb-5">Order Summary</h2>

                {/* Line Items */}
                <div className="space-y-3 mb-5">
                  <div className="flex justify-between text-sm text-neutral-600">
                    <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                    <span className="font-medium text-neutral-900">${subtotal.toFixed(2)}</span>
                  </div>

                  {promoApplied && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-[#5E8E3E] font-medium flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5" />
                        Promo (SAVE10)
                      </span>
                      <span className="text-[#5E8E3E] font-semibold">-${discount.toFixed(2)}</span>
                    </motion.div>
                  )}

                  <div className="flex justify-between text-sm text-neutral-600">
                    <span>Estimated Shipping</span>
                    <span className={`font-medium ${shipping === 0 ? "text-[#5E8E3E]" : "text-neutral-900"}`}>
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm text-neutral-600">
                    <span>Estimated Tax (8%)</span>
                    <span className="font-medium text-neutral-900">${taxes.toFixed(2)}</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-neutral-100 mb-5" />

                {/* Total */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-base font-bold text-neutral-900">Total</span>
                  <span className="text-xl font-bold text-neutral-900">${total.toFixed(2)}</span>
                </div>

                {/* Promo Code */}
                <div className="mb-5">
                  <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2 block">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => {
                        setPromoCode(e.target.value);
                        setPromoError("");
                      }}
                      placeholder="Enter code"
                      className="flex-1 px-3 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-[#96BF48] focus:ring-2 focus:ring-[#96BF48]/20 transition-all duration-200"
                    />
                    <button
                      onClick={applyPromo}
                      className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-700 text-white text-sm font-semibold rounded-xl transition-all duration-200"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-500 mt-1.5"
                    >
                      {promoError}
                    </motion.p>
                  )}
                  {promoApplied && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-[#5E8E3E] font-medium mt-1.5"
                    >
                      10% discount applied successfully.
                    </motion.p>
                  )}
                </div>

                {/* Checkout CTA */}
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/checkout"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#96BF48] hover:bg-[#5E8E3E] text-white font-bold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md text-base"
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>

                {/* Trust Badges */}
                <div className="mt-5 pt-5 border-t border-neutral-100">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {[
                      { icon: "🔒", label: "Secure Checkout" },
                      { icon: "↩️", label: "Free Returns" },
                      { icon: "🚚", label: "Fast Delivery" },
                    ].map((badge) => (
                      <div key={badge.label} className="flex flex-col items-center gap-1">
                        <span className="text-lg">{badge.icon}</span>
                        <span className="text-[10px] text-neutral-500 font-medium leading-tight">{badge.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
                  {["Visa", "MC", "Amex", "PayPal", "Apple Pay"].map((method) => (
                    <span
                      key={method}
                      className="px-2 py-1 bg-neutral-100 rounded-md text-[10px] font-semibold text-neutral-500 border border-neutral-200"
                    >
                      {method}
                    </span>
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