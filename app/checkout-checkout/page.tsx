"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ChevronRight, Lock, CreditCard, Truck, Check, Tag, ChevronDown, ShoppingBag, ArrowLeft, Shield } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

const cartItems = [
  {
    id: "1",
    name: "Wireless Noise-Cancelling Headphones",
    variant: "Midnight Black / One Size",
    price: 249.99,
    quantity: 1,
    image: "https://m.media-amazon.com/images/I/71YM2N5whtL.jpg",
  },
  {
    id: "2",
    name: "Minimalist Leather Watch",
    variant: "Brown Strap / 42mm",
    price: 189.0,
    quantity: 2,
    image: "https://i.etsystatic.com/11276331/r/il/0d5206/3887810690/il_570xN.3887810690_pojq.jpg",
  },
  {
    id: "3",
    name: "Ergonomic Desk Lamp",
    variant: "Matte White",
    price: 79.95,
    quantity: 1,
    image: "https://i.etsystatic.com/11276331/r/il/0d5206/3887810690/il_570xN.3887810690_pojq.jpg",
  },
];

const subtotal = cartItems.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);
const shipping = 0;
const tax = subtotal * 0.08;
const total = subtotal + shipping + tax;

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "Mexico",
];

const steps = ["Information", "Shipping", "Payment"];

export default function CheckoutPage() {
  const t = useTranslations();

  const [currentStep, setCurrentStep] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [showOrderSummary, setShowOrderSummary] = useState(false);

  const [info, setInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    country: "United States",
    state: "",
    zip: "",
    phone: "",
    saveInfo: false,
  });

  const [shipping2, setShipping2] = useState("standard");

  const [payment, setPayment] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
    sameAsBilling: true,
  });

  const discount = couponApplied ? subtotal * 0.1 : 0;
  const finalTotal = total - discount;

  function handleApplyCoupon() {
    if (couponCode.trim().toUpperCase() === "SAVE10") {
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponApplied(false);
      setCouponError("Invalid coupon code. Try SAVE10.");
    }
  }

  function handleContinue() {
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setOrderPlaced(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleBack() {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-24">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] border border-black/5 p-10 max-w-md w-full text-center"
        >
          <div className="w-16 h-16 rounded-full bg-[#96BF48]/15 flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-[#5E8E3E]" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight mb-2">
            {t("checkout.success.title")}
          </h1>
          <p className="text-neutral-500 text-sm leading-relaxed mb-2">
            {t("checkout.success.subtitle")}
          </p>
          <p className="text-neutral-400 text-xs mb-8">
            {t("checkout.success.orderNumber")}{" "}
            <span className="font-semibold text-neutral-700">#SH-20481</span>
          </p>
          <div className="bg-neutral-50 rounded-xl p-4 mb-8 text-left space-y-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 rounded-lg object-cover border border-black/5"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-800 truncate">
                    {item.name}
                  </p>
                  <p className="text-xs text-neutral-400">{item.variant}</p>
                </div>
                <span className="text-sm font-semibold text-neutral-700">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href="/products"
              className="w-full py-3 bg-[#96BF48] hover:bg-[#5E8E3E] text-white font-semibold rounded-xl transition-colors duration-200 text-sm text-center"
            >
              {t("checkout.success.continueShopping")}
            </Link>
            <Link
              href="/dashboard/orders"
              className="w-full py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold rounded-xl transition-colors duration-200 text-sm text-center"
            >
              {t("checkout.success.viewOrders")}
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Top bar */}
      <div className="bg-white border-b border-neutral-100 sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link
            href="/cart"
            className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-800 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("checkout.backToCart")}
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-neutral-400">
            <Lock className="w-3.5 h-3.5" />
            {t("checkout.secureCheckout")}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="sr-only">{t("checkout.title")}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">
          {/* Left: Form */}
          <div>
            {/* Step indicator */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-2 mb-8"
            >
              {steps.map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <button
                    onClick={() => i < currentStep && setCurrentStep(i)}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
                      i === currentStep
                        ? "text-neutral-900"
                        : i < currentStep
                        ? "text-[#5E8E3E] cursor-pointer hover:underline"
                        : "text-neutral-400 cursor-default"
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-200 ${
                        i < currentStep
                          ? "bg-[#96BF48] text-white"
                          : i === currentStep
                          ? "bg-neutral-900 text-white"
                          : "bg-neutral-200 text-neutral-500"
                      }`}
                    >
                      {i < currentStep ? <Check className="w-3 h-3" /> : i + 1}
                    </span>
                    {step}
                  </button>
                  {i < steps.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-neutral-300" />
                  )}
                </div>
              ))}
            </motion.div>

            {/* Step 0: Information */}
            {currentStep === 0 && (
              <motion.div
                key="step-info"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <motion.div variants={fadeInUp}>
                  <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                    {t("checkout.info.contactTitle")}
                  </h2>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder={t("checkout.info.emailPlaceholder")}
                      value={info.email}
                      onChange={(e) =>
                        setInfo((p) => ({ ...p, email: e.target.value }))
                      }
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-[#96BF48] focus:ring-2 focus:ring-[#96BF48]/20 transition-all duration-200"
                    />
                    <label className="flex items-center gap-2 text-sm text-neutral-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={info.saveInfo}
                        onChange={(e) =>
                          setInfo((p) => ({ ...p, saveInfo: e.target.checked }))
                        }
                        className="rounded border-neutral-300 text-[#96BF48] focus:ring-[#96BF48]"
                      />
                      {t("checkout.info.emailOffers")}
                    </label>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                    {t("checkout.info.shippingTitle")}
                  </h2>
                  <div className="space-y-3">
                    <div className="relative">
                      <select
                        value={info.country}
                        onChange={(e) =>
                          setInfo((p) => ({ ...p, country: e.target.value }))
                        }
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 outline-none focus:border-[#96BF48] focus:ring-2 focus:ring-[#96BF48]/20 transition-all duration-200 appearance-none"
                      >
                        {countries.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder={t("checkout.info.firstName")}
                        value={info.firstName}
                        onChange={(e) =>
                          setInfo((p) => ({ ...p, firstName: e.target.value }))
                        }
                        className="px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-[#96BF48] focus:ring-2 focus:ring-[#96BF48]/20 transition-all duration-200"
                      />
                      <input
                        type="text"
                        placeholder={t("checkout.info.lastName")}
                        value={info.lastName}
                        onChange={(e) =>
                          setInfo((p) => ({ ...p, lastName: e.target.value }))
                        }
                        className="px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-[#96BF48] focus:ring-2 focus:ring-[#96BF48]/20 transition-all duration-200"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder={t("checkout.info.address")}
                      value={info.address}
                      onChange={(e) =>
                        setInfo((p) => ({ ...p, address: e.target.value }))
                      }
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-[#96BF48] focus:ring-2 focus:ring-[#96BF48]/20 transition-all duration-200"
                    />
                    <input
                      type="text"
                      placeholder={t("checkout.info.apartment")}
                      value={info.apartment}
                      onChange={(e) =>
                        setInfo((p) => ({ ...p, apartment: e.target.value }))
                      }
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-[#96BF48] focus:ring-2 focus:ring-[#96BF48]/20 transition-all duration-200"
                    />
                    <div className="grid grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder={t("checkout.info.city")}
                        value={info.city}
                        onChange={(e) =>
                          setInfo((p) => ({ ...p, city: e.target.value }))
                        }
                        className="px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-[#96BF48] focus:ring-2 focus:ring-[#96BF48]/20 transition-all duration-200"
                      />
                      <input
                        type="text"
                        placeholder={t("checkout.info.state")}
                        value={info.state}
                        onChange={(e) =>
                          setInfo((p) => ({ ...p, state: e.target.value }))
                        }
                        className="px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-[#96BF48] focus:ring-2 focus:ring-[#96BF48]/20 transition-all duration-200"
                      />
                      <input
                        type="text"
                        placeholder={t("checkout.info.zip")}
                        value={info.zip}
                        onChange={(e) =>
                          setInfo((p) => ({ ...p, zip: e.target.value }))
                        }
                        className="px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-[#96BF48] focus:ring-2 focus:ring-[#96BF48]/20 transition-all duration-200"
                      />
                    </div>
                    <input
                      type="tel"
                      placeholder={t("checkout.info.phone")}
                      value={info.phone}
                      onChange={(e) =>
                        setInfo((p) => ({ ...p, phone: e.target.value }))
                      }
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-[#96BF48] focus:ring-2 focus:ring-[#96BF48]/20 transition-all duration-200"
                    />
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <label className="flex items-center gap-2 text-sm text-neutral-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={info.saveInfo}
                      onChange={(e) =>
                        setInfo((p) => ({ ...p, saveInfo: e.target.checked }))
                      }
                      className="rounded border-neutral-300 text-[#96BF48] focus:ring-[#96BF48]"
                    />
                    {t("checkout.info.saveInfo")}
                  </label>
                </motion.div>
              </motion.div>
            )}

            {/* Step 1: Shipping */}
            {currentStep === 1 && (
              <motion.div
                key="step-shipping"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <motion.div variants={fadeInUp}>
                  <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                    {t("checkout.shipping.title")}
                  </h2>

                  {/* Contact summary */}
                  <div className="bg-white rounded-xl border border-neutral-200 divide-y divide-neutral-100 mb-6">
                    <div className="flex items-center justify-between px-4 py-3">
                      <span className="text-xs text-neutral-400 uppercase tracking-wide font-medium">
                        {t("checkout.shipping.contact")}
                      </span>
                      <span className="text-sm text-neutral-700">
                        {info.email || "—"}
                      </span>
                      <button
                        onClick={() => setCurrentStep(0)}
                        className="text-xs text-[#5E8E3E] hover:underline"
                      >
                        {t("checkout.shipping.change")}
                      </button>
                    </div>
                    <div className="flex items-center justify-between px-4 py-3">
                      <span className="text-xs text-neutral-400 uppercase tracking-wide font-medium">
                        {t("checkout.shipping.shipTo")}
                      </span>
                      <span className="text-sm text-neutral-700 flex-1 mx-4 truncate">
                        {[info.address, info.city, info.state, info.zip]
                          .filter(Boolean)
                          .join(", ") || "—"}
                      </span>
                      <button
                        onClick={() => setCurrentStep(0)}
                        className="text-xs text-[#5E8E3E] hover:underline"
                      >
                        {t("checkout.shipping.change")}
                      </button>
                    </div>
                  </div>

                  {/* Shipping options */}
                  <div className="space-y-3">
                    {[
                      {
                        id: "standard",
                        label: t("checkout.shipping.standard"),
                        detail: t("checkout.shipping.standardDetail"),
                        price: 0,
                      },
                      {
                        id: "express",
                        label: t("checkout.shipping.express"),
                        detail: t("checkout.shipping.expressDetail"),
                        price: 12.99,
                      },
                      {
                        id: "overnight",
                        label: t("checkout.shipping.overnight"),
                        detail: t("checkout.shipping.overnightDetail"),
                        price: 24.99,
                      },
                    ].map((opt) => (
                      <label
                        key={opt.id}
                        className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                          shipping2 === opt.id
                            ? "border-[#96BF48] bg-[#96BF48]/5 ring-2 ring-[#96BF48]/20"
                            : "border-neutral-200 bg-white hover:border-neutral-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shipping"
                            value={opt.id}
                            checked={shipping2 === opt.id}
                            onChange={() => setShipping2(opt.id)}
                            className="text-[#96BF48] focus:ring-[#96BF48]"
                          />
                          <div>
                            <p className="text-sm font-medium text-neutral-800">
                              {opt.label}
                            </p>
                            <p className="text-xs text-neutral-400">
                              {opt.detail}
                            </p>
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-neutral-700">
                          {opt.price === 0
                            ? t("checkout.shipping.free")
                            : `$${opt.price.toFixed(2)}`}
                        </span>
                      </label>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Step 2: Payment */}
            {currentStep === 2 && (
              <motion.div
                key="step-payment"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <motion.div variants={fadeInUp}>
                  <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                    {t("checkout.payment.title")}
                  </h2>

                  {/* Payment methods */}
                  <div className="flex gap-2 mb-5">
                    {["Visa", "MC", "Amex", "PayPal"].map((brand) => (
                      <div
                        key={brand}
                        className="px-3 py-1.5 rounded-lg border border-neutral-200 bg-white text-xs font-semibold text-neutral-500"
                      >
                        {brand}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder={t("checkout.payment.cardNumber")}
                        value={payment.cardNumber}
                        onChange={(e) =>
                          setPayment((p) => ({
                            ...p,
                            cardNumber: e.target.value,
                          }))
                        }
                        maxLength={19}
                        className="w-full px-4 py-3 pr-12 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-[#96BF48] focus:ring-2 focus:ring-[#96BF48]/20 transition-all duration-200"
                      />
                      <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-300" />
                    </div>
                    <input
                      type="text"
                      placeholder={t("checkout.payment.cardName")}
                      value={payment.cardName}
                      onChange={(e) =>
                        setPayment((p) => ({ ...p, cardName: e.target.value }))
                      }
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-[#96BF48] focus:ring-2 focus:ring-[#96BF48]/20 transition-all duration-200"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder={t("checkout.payment.expiry")}
                        value={payment.expiry}
                        onChange={(e) =>
                          setPayment((p) => ({ ...p, expiry: e.target.value }))
                        }
                        maxLength={5}
                        className="px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-[#96BF48] focus:ring-2 focus:ring-[#96BF48]/20 transition-all duration-200"
                      />
                      <input
                        type="text"
                        placeholder={t("checkout.payment.cvv")}
                        value={payment.cvv}
                        onChange={(e) =>
                          setPayment((p) => ({ ...p, cvv: e.target.value }))
                        }
                        maxLength={4}
                        className="px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-[#96BF48] focus:ring-2 focus:ring-[#96BF48]/20 transition-all duration-200"
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <label className="flex items-center gap-2 text-sm text-neutral-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={payment.sameAsBilling}
                      onChange={(e) =>
                        setPayment((p) => ({
                          ...p,
                          sameAsBilling: e.target.checked,
                        }))
                      }
                      className="rounded border-neutral-300 text-[#96BF48] focus:ring-[#96BF48]"
                    />
                    {t("checkout.payment.sameAsBilling")}
                  </label>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  className="flex items-center gap-2 text-xs text-neutral-400 bg-neutral-50 rounded-xl px-4 py-3 border border-neutral-100"
                >
                  <Shield className="w-4 h-4 text-[#96BF48] shrink-0" />
                  {t("checkout.payment.secureNote")}
                </motion.div>
              </motion.div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-100">
              {currentStep > 0 ? (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-800 transition-colors duration-200"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t("checkout.back")}
                </button>
              ) : (
                <Link
                  href="/cart"
                  className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-800 transition-colors duration-200"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t("checkout.backToCart")}
                </Link>
              )}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleContinue}
                className="flex items-center gap-2 px-8 py-3 bg-[#96BF48] hover:bg-[#5E8E3E] text-white font-semibold rounded-xl transition-colors duration-200 text-sm shadow-[0_2px_8px_rgba(150,191,72,0.35)]"
              >
                {currentStep === steps.length - 1
                  ? t("checkout.placeOrder")
                  : t("checkout.continue")}
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:sticky lg:top-32 h-fit">
            {/* Mobile toggle */}
            <button
              onClick={() => setShowOrderSummary((v) => !v)}
              className="lg:hidden w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-neutral-200 mb-4 text-sm font-medium text-neutral-700"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#96BF48]" />
                {t("checkout.summary.toggle")}
              </span>
              <span className="flex items-center gap-2">
                <span className="font-bold text-neutral-900">
                  ${finalTotal.toFixed(2)}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    showOrderSummary ? "rotate-180" : ""
                  }`}
                />
              </span>
            </button>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className={`bg-white rounded-2xl border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] overflow-hidden ${
                showOrderSummary ? "block" : "hidden lg:block"
              }`}
            >
              <div className="p-6 border-b border-neutral-100">
                <h2 className="text-base font-semibold text-neutral-900 flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#96BF48]" />
                  {t("checkout.summary.title")}
                </h2>
              </div>

              {/* Items */}
              <div className="p-6 space-y-4 border-b border-neutral-100">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover border border-black/5"
                      />
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-neutral-500 text-white text-xs font-bold flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-800 leading-snug">
                        {item.name}
                      </p>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        {item.variant}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-neutral-700 shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div className="p-6 border-b border-neutral-100">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input
                      type="text"
                      placeholder={t("checkout.summary.couponPlaceholder")}
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value);
                        setCouponError("");
                      }}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-[#96BF48] focus:ring-2 focus:ring-[#96BF48]/20 transition-all duration-200"
                    />
                  </div>
                  <button
                    onClick={handleApplyCoupon}
                    className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-700 text-white text-sm font-semibold rounded-xl transition-colors duration-200"
                  >
                    {t("checkout.summary.apply")}
                  </button>
                </div>
                {couponError && (
                  <p className="text-xs text-red-500 mt-2">{couponError}</p>
                )}
                {couponApplied && (
                  <p className="text-xs text-[#5E8E3E] mt-2 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    {t("checkout.summary.couponApplied")}
                  </p>
                )}
              </div>

              {/* Totals */}
              <div className="p-6 space-y-3">
                <div className="flex justify-between text-sm text-neutral-600">
                  <span>{t("checkout.summary.subtotal")}</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-neutral-600">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5" />
                    {t("checkout.summary.shipping")}
                  </span>
                  <span className="text-[#5E8E3E] font-medium">
                    {t("checkout.summary.free")}
                  </span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-sm text-[#5E8E3E]">
                    <span>{t("checkout.summary.discount")}</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-neutral-600">
                  <span>{t("checkout.summary.tax")}</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-neutral-900 pt-3 border-t border-neutral-100">
                  <span>{t("checkout.summary.total")}</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Trust badges */}
              <div className="px-6 pb-6 flex items-center justify-center gap-4 text-xs text-neutral-400">
                <span className="flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  {t("checkout.trust.ssl")}
                </span>
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  {t("checkout.trust.secure")}
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3 h-3" />
                  {t("checkout.trust.returns")}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}