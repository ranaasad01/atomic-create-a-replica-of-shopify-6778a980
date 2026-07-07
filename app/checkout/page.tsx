"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { Check, ChevronRight, Lock, Tag, Truck, CreditCard, User, MapPin, ShoppingBag, ArrowLeft, X, AlertCircle } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Mock cart items ──────────────────────────────────────────────────────────
const CART_ITEMS = [
  {
    id: "1",
    name: "Wireless Noise-Cancelling Headphones",
    variant: "Midnight Black / One Size",
    price: 249.0,
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
    price: 79.0,
    quantity: 1,
    image: "https://i.etsystatic.com/11276331/r/il/0d5206/3887810690/il_570xN.3887810690_pojq.jpg",
  },
];

const SHIPPING_OPTIONS = [
  {
    id: "standard",
    label: "Standard Shipping",
    description: "5–7 business days",
    price: 0,
  },
  {
    id: "express",
    label: "Express Shipping",
    description: "2–3 business days",
    price: 12.99,
  },
  {
    id: "overnight",
    label: "Overnight Delivery",
    description: "Next business day",
    price: 29.99,
  },
];

const VALID_DISCOUNT = "SAVE10";
const DISCOUNT_AMOUNT = 0.1; // 10%

// ─── Step definitions ─────────────────────────────────────────────────────────
const STEPS = [
  { id: 1, label: "Contact", icon: User },
  { id: 2, label: "Shipping", icon: MapPin },
  { id: 3, label: "Delivery", icon: Truck },
  { id: 4, label: "Payment", icon: CreditCard },
];

// ─── Slide variant ────────────────────────────────────────────────────────────
const slideStep: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.38, ease: "easeOut" },
  },
  exit: { opacity: 0, x: -24, transition: { duration: 0.25, ease: "easeIn" } },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatPrice(n: number) {
  return `$${(n ?? 0).toFixed(2)}`;
}

// ─── Sub-components (inline) ──────────────────────────────────────────────────

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {STEPS.map((step, idx) => {
        const done = current > step.id;
        const active = current === step.id;
        const Icon = step.icon;
        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  done
                    ? "bg-[#96BF48] border-[#96BF48] text-white"
                    : active
                    ? "bg-white border-[#96BF48] text-[#5E8E3E]"
                    : "bg-white border-neutral-200 text-neutral-400"
                }`}
              >
                {done ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </div>
              <span
                className={`text-xs font-medium hidden sm:block ${
                  active
                    ? "text-[#5E8E3E]"
                    : done
                    ? "text-neutral-600"
                    : "text-neutral-400"
                }`}
              >
                {step.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={`h-0.5 w-10 sm:w-16 mx-1 mb-4 transition-all duration-300 ${
                  current > step.id ? "bg-[#96BF48]" : "bg-neutral-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function FieldGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-neutral-700 mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoComplete={autoComplete}
      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-900 placeholder-neutral-400 text-sm outline-none focus:border-[#96BF48] focus:ring-2 focus:ring-[#96BF48]/20 transition-all duration-200"
    />
  );
}

function SelectInput({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-900 text-sm outline-none focus:border-[#96BF48] focus:ring-2 focus:ring-[#96BF48]/20 transition-all duration-200 appearance-none"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const t = useTranslations();

  // Step state
  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);

  // Contact
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  // Shipping address
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [stateVal, setStateVal] = useState("CA");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("US");

  // Shipping method
  const [shippingId, setShippingId] = useState("standard");

  // Payment
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [billingMatch, setBillingMatch] = useState(true);

  // Discount
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountError, setDiscountError] = useState("");

  // Derived totals
  const subtotal = CART_ITEMS.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const selectedShipping =
    SHIPPING_OPTIONS.find((s) => s.id === shippingId) ?? SHIPPING_OPTIONS[0];
  const shippingCost = selectedShipping?.price ?? 0;
  const discountValue = discountApplied ? subtotal * DISCOUNT_AMOUNT : 0;
  const tax = (subtotal - discountValue) * 0.08;
  const total = subtotal - discountValue + shippingCost + tax;

  function applyDiscount() {
    if (discountCode.trim().toUpperCase() === VALID_DISCOUNT) {
      setDiscountApplied(true);
      setDiscountError("");
    } else {
      setDiscountApplied(false);
      setDiscountError("Invalid discount code. Try SAVE10.");
    }
  }

  function removeDiscount() {
    setDiscountApplied(false);
    setDiscountCode("");
    setDiscountError("");
  }

  function nextStep() {
    if (step < 4) setStep((s) => s + 1);
  }

  function prevStep() {
    if (step > 1) setStep((s) => s - 1);
  }

  function handleSubmit() {
    setConfirmed(true);
  }

  // ── Confirmation screen ──────────────────────────────────────────────────
  if (confirmed) {
    return (
      <main className="min-h-screen bg-neutral-50 pt-24 pb-20 px-4">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="max-w-lg mx-auto text-center"
        >
          <div className="w-20 h-20 rounded-full bg-[#96BF48]/15 flex items-center justify-center mx-auto mb-6">
            <div className="w-14 h-14 rounded-full bg-[#96BF48] flex items-center justify-center shadow-lg shadow-[#96BF48]/30">
              <Check className="w-7 h-7 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 mb-3">
            Order Confirmed!
          </h1>
          <p className="text-neutral-500 leading-relaxed mb-2">
            Thank you for your purchase. A confirmation email has been sent to{" "}
            <span className="font-medium text-neutral-700">
              {email || "your email"}
            </span>
            .
          </p>
          <p className="text-sm text-neutral-400 mb-8">
            Order{" "}
            <span className="font-mono font-semibold text-neutral-600">
              #SHO-48291
            </span>{" "}
            is now being processed.
          </p>

          <div className="bg-white rounded-2xl border border-neutral-100 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] p-6 mb-8 text-left">
            <h2 className="text-sm font-semibold text-neutral-700 mb-4 uppercase tracking-wide">
              Order Summary
            </h2>
            <div className="space-y-3">
              {CART_ITEMS.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-800 truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-neutral-400">{item.variant}</p>
                  </div>
                  <span className="text-sm font-semibold text-neutral-700">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-neutral-100 mt-4 pt-4 flex justify-between">
              <span className="font-semibold text-neutral-800">Total</span>
              <span className="font-bold text-[#5E8E3E] text-lg">
                {formatPrice(total)}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/products"
              className="px-6 py-3 rounded-xl bg-[#96BF48] hover:bg-[#5E8E3E] text-white font-semibold text-sm transition-colors duration-200 shadow-sm"
            >
              Continue Shopping
            </Link>
            <Link
              href="/dashboard/orders"
              className="px-6 py-3 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 font-semibold text-sm transition-colors duration-200"
            >
              View Orders
            </Link>
          </div>
        </motion.div>
      </main>
    );
  }

  // ── Main checkout layout ─────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-neutral-50 pt-20 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <Link
            href="/cart"
            className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-800 transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to cart
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
            Checkout
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 items-start">
          {/* ── Left: multi-step form ─────────────────────────────────────── */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-2xl border border-neutral-100 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] p-6 sm:p-8"
          >
            <StepIndicator current={step} />

            <AnimatePresence mode="wait">
              {/* ── Step 1: Contact Info ─────────────────────────────────── */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  variants={slideStep}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <h2 className="text-xl font-bold text-neutral-900 mb-1">
                    Contact Information
                  </h2>
                  <p className="text-sm text-neutral-500 mb-6">
                    We will use this to send your order confirmation.
                  </p>

                  <FieldGroup label="Email address">
                    <TextInput
                      value={email}
                      onChange={setEmail}
                      placeholder="you@example.com"
                      type="email"
                      autoComplete="email"
                    />
                  </FieldGroup>

                  <FieldGroup label="Phone number (optional)">
                    <TextInput
                      value={phone}
                      onChange={setPhone}
                      placeholder="+1 (555) 000-0000"
                      type="tel"
                      autoComplete="tel"
                    />
                  </FieldGroup>

                  <label className="flex items-center gap-3 cursor-pointer mb-8">
                    <div
                      onClick={() => setNewsletter((v) => !v)}
                      className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-all duration-200 cursor-pointer ${
                        newsletter
                          ? "bg-[#96BF48] border-[#96BF48]"
                          : "border-neutral-300 bg-white"
                      }`}
                    >
                      {newsletter && (
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      )}
                    </div>
                    <span className="text-sm text-neutral-600">
                      Email me with news and offers
                    </span>
                  </label>

                  <button
                    onClick={nextStep}
                    disabled={!email}
                    className="w-full py-3 rounded-xl bg-[#96BF48] hover:bg-[#5E8E3E] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    Continue to Shipping
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

              {/* ── Step 2: Shipping Address ─────────────────────────────── */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  variants={slideStep}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <h2 className="text-xl font-bold text-neutral-900 mb-1">
                    Shipping Address
                  </h2>
                  <p className="text-sm text-neutral-500 mb-6">
                    Where should we deliver your order?
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <FieldGroup label="First name">
                      <TextInput
                        value={firstName}
                        onChange={setFirstName}
                        placeholder="Jane"
                        autoComplete="given-name"
                      />
                    </FieldGroup>
                    <FieldGroup label="Last name">
                      <TextInput
                        value={lastName}
                        onChange={setLastName}
                        placeholder="Smith"
                        autoComplete="family-name"
                      />
                    </FieldGroup>
                  </div>

                  <FieldGroup label="Address">
                    <TextInput
                      value={address1}
                      onChange={setAddress1}
                      placeholder="123 Main Street"
                      autoComplete="address-line1"
                    />
                  </FieldGroup>

                  <FieldGroup label="Apartment, suite, etc. (optional)">
                    <TextInput
                      value={address2}
                      onChange={setAddress2}
                      placeholder="Apt 4B"
                      autoComplete="address-line2"
                    />
                  </FieldGroup>

                  <FieldGroup label="City">
                    <TextInput
                      value={city}
                      onChange={setCity}
                      placeholder="San Francisco"
                      autoComplete="address-level2"
                    />
                  </FieldGroup>

                  <div className="grid grid-cols-2 gap-4">
                    <FieldGroup label="State">
                      <SelectInput
                        value={stateVal}
                        onChange={setStateVal}
                        options={[
                          { value: "CA", label: "California" },
                          { value: "NY", label: "New York" },
                          { value: "TX", label: "Texas" },
                          { value: "FL", label: "Florida" },
                          { value: "WA", label: "Washington" },
                          { value: "IL", label: "Illinois" },
                          { value: "OR", label: "Oregon" },
                          { value: "CO", label: "Colorado" },
                        ]}
                      />
                    </FieldGroup>
                    <FieldGroup label="ZIP code">
                      <TextInput
                        value={zip}
                        onChange={setZip}
                        placeholder="94102"
                        autoComplete="postal-code"
                      />
                    </FieldGroup>
                  </div>

                  <FieldGroup label="Country">
                    <SelectInput
                      value={country}
                      onChange={setCountry}
                      options={[
                        { value: "US", label: "United States" },
                        { value: "CA", label: "Canada" },
                        { value: "GB", label: "United Kingdom" },
                        { value: "AU", label: "Australia" },
                        { value: "DE", label: "Germany" },
                        { value: "FR", label: "France" },
                      ]}
                    />
                  </FieldGroup>

                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={prevStep}
                      className="flex-1 py-3 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 font-semibold text-sm transition-colors duration-200"
                    >
                      Back
                    </button>
                    <button
                      onClick={nextStep}
                      disabled={!firstName || !address1 || !city || !zip}
                      className="flex-[2] py-3 rounded-xl bg-[#96BF48] hover:bg-[#5E8E3E] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      Continue to Delivery
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── Step 3: Shipping Method ──────────────────────────────── */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  variants={slideStep}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <h2 className="text-xl font-bold text-neutral-900 mb-1">
                    Shipping Method
                  </h2>
                  <p className="text-sm text-neutral-500 mb-6">
                    Choose how fast you want your order to arrive.
                  </p>

                  <div className="space-y-3 mb-8">
                    {SHIPPING_OPTIONS.map((option) => {
                      const selected = shippingId === option.id;
                      return (
                        <motion.button
                          key={option.id}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => setShippingId(option.id)}
                          className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                            selected
                              ? "border-[#96BF48] bg-[#96BF48]/5"
                              : "border-neutral-200 bg-white hover:border-neutral-300"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                                selected
                                  ? "border-[#96BF48] bg-[#96BF48]"
                                  : "border-neutral-300"
                              }`}
                            >
                              {selected && (
                                <div className="w-2 h-2 rounded-full bg-white" />
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-neutral-800">
                                {option.label}
                              </p>
                              <p className="text-xs text-neutral-500">
                                {option.description}
                              </p>
                            </div>
                          </div>
                          <span className="text-sm font-bold text-neutral-700">
                            {option.price === 0
                              ? "Free"
                              : formatPrice(option.price)}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={prevStep}
                      className="flex-1 py-3 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 font-semibold text-sm transition-colors duration-200"
                    >
                      Back
                    </button>
                    <button
                      onClick={nextStep}
                      className="flex-[2] py-3 rounded-xl bg-[#96BF48] hover:bg-[#5E8E3E] text-white font-semibold text-sm transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      Continue to Payment
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── Step 4: Payment ──────────────────────────────────────── */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  variants={slideStep}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <h2 className="text-xl font-bold text-neutral-900 mb-1">
                    Payment
                  </h2>
                  <p className="text-sm text-neutral-500 mb-6">
                    All transactions are encrypted and secure.
                  </p>

                  {/* Stripe-style card panel */}
                  <div className="border border-neutral-200 rounded-xl overflow-hidden mb-5">
                    <div className="flex items-center gap-2 px-4 py-3 bg-neutral-50 border-b border-neutral-200">
                      <CreditCard className="w-4 h-4 text-neutral-500" />
                      <span className="text-sm font-semibold text-neutral-700">
                        Credit or debit card
                      </span>
                      <div className="ml-auto flex items-center gap-1.5">
                        {["visa", "mc", "amex", "discover"].map((brand) => (
                          <div
                            key={brand}
                            className="h-5 px-1.5 rounded bg-white border border-neutral-200 flex items-center justify-center"
                          >
                            <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-wide">
                              {brand === "mc"
                                ? "MC"
                                : brand === "amex"
                                ? "AMEX"
                                : brand === "discover"
                                ? "DISC"
                                : "VISA"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 space-y-4">
                      <FieldGroup label="Name on card">
                        <TextInput
                          value={cardName}
                          onChange={setCardName}
                          placeholder="Jane Smith"
                          autoComplete="cc-name"
                        />
                      </FieldGroup>
                      <FieldGroup label="Card number">
                        <div className="relative">
                          <TextInput
                            value={cardNumber}
                            onChange={(v) => {
                              const digits = v.replace(/\D/g, "").slice(0, 16);
                              const formatted =
                                digits.match(/.{1,4}/g)?.join(" ") ?? digits;
                              setCardNumber(formatted);
                            }}
                            placeholder="1234 5678 9012 3456"
                            autoComplete="cc-number"
                          />
                          <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                        </div>
                      </FieldGroup>
                      <div className="grid grid-cols-2 gap-4">
                        <FieldGroup label="Expiry date">
                          <TextInput
                            value={cardExpiry}
                            onChange={(v) => {
                              const digits = v.replace(/\D/g, "").slice(0, 4);
                              const formatted =
                                digits.length > 2
                                  ? `${digits.slice(0, 2)}/${digits.slice(2)}`
                                  : digits;
                              setCardExpiry(formatted);
                            }}
                            placeholder="MM/YY"
                            autoComplete="cc-exp"
                          />
                        </FieldGroup>
                        <FieldGroup label="Security code">
                          <TextInput
                            value={cardCvc}
                            onChange={(v) =>
                              setCardCvc(v.replace(/\D/g, "").slice(0, 4))
                            }
                            placeholder="CVC"
                            autoComplete="cc-csc"
                          />
                        </FieldGroup>
                      </div>
                    </div>
                  </div>

                  {/* Billing address toggle */}
                  <label className="flex items-center gap-3 cursor-pointer mb-6">
                    <div
                      onClick={() => setBillingMatch((v) => !v)}
                      className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-all duration-200 cursor-pointer ${
                        billingMatch
                          ? "bg-[#96BF48] border-[#96BF48]"
                          : "border-neutral-300 bg-white"
                      }`}
                    >
                      {billingMatch && (
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      )}
                    </div>
                    <span className="text-sm text-neutral-600">
                      Billing address same as shipping address
                    </span>
                  </label>

                  {/* Security note */}
                  <div className="flex items-center gap-2 text-xs text-neutral-400 mb-6 bg-neutral-50 rounded-xl px-4 py-3 border border-neutral-100">
                    <Lock className="w-3.5 h-3.5 flex-shrink-0 text-[#96BF48]" />
                    <span>
                      Your payment information is encrypted with 256-bit SSL.
                      We never store your card details.
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={prevStep}
                      className="flex-1 py-3 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 font-semibold text-sm transition-colors duration-200"
                    >
                      Back
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubmit}
                      disabled={!cardName || cardNumber.length < 19 || cardExpiry.length < 5 || cardCvc.length < 3}
                      className="flex-[2] py-3 rounded-xl bg-[#96BF48] hover:bg-[#5E8E3E] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm shadow-[#96BF48]/30"
                    >
                      <Lock className="w-4 h-4" />
                      Pay {formatPrice(total)}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Right: Order Summary (sticky) ────────────────────────────── */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="lg:sticky lg:top-24"
          >
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-2 px-6 py-4 border-b border-neutral-100">
                <ShoppingBag className="w-4 h-4 text-[#96BF48]" />
                <h2 className="text-sm font-bold text-neutral-800 uppercase tracking-wide">
                  Order Summary
                </h2>
                <span className="ml-auto text-xs text-neutral-400 font-medium">
                  {CART_ITEMS.reduce((a, i) => a + i.quantity, 0)} items
                </span>
              </div>

              {/* Line items */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="px-6 py-4 space-y-4 border-b border-neutral-100"
              >
                {CART_ITEMS.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={fadeInUp}
                    className="flex items-start gap-3"
                  >
                    <div className="relative flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-neutral-600 text-white text-[10px] font-bold flex items-center justify-center">
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
                    <span className="text-sm font-semibold text-neutral-700 flex-shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Discount code */}
              <div className="px-6 py-4 border-b border-neutral-100">
                <p className="text-xs font-semibold text-neutral-600 uppercase tracking-wide mb-2">
                  Discount Code
                </p>
                {discountApplied ? (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#96BF48]/10 border border-[#96BF48]/30">
                    <Tag className="w-4 h-4 text-[#5E8E3E]" />
                    <span className="text-sm font-semibold text-[#5E8E3E] flex-1">
                      {discountCode.toUpperCase()} applied
                    </span>
                    <button
                      onClick={removeDiscount}
                      className="text-neutral-400 hover:text-neutral-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 px-3 py-2 rounded-xl border border-neutral-200 bg-white text-neutral-900 placeholder-neutral-400 text-sm outline-none focus:border-[#96BF48] focus:ring-2 focus:ring-[#96BF48]/20 transition-all duration-200"
                    />
                    <button
                      onClick={applyDiscount}
                      className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-700 text-white text-sm font-semibold transition-colors duration-200"
                    >
                      Apply
                    </button>
                  </div>
                )}
                {discountError && (
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-red-500">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    {discountError}
                  </div>
                )}
              </div>

              {/* Totals */}
              <div className="px-6 py-4 space-y-2.5">
                <div className="flex justify-between text-sm text-neutral-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-neutral-800">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between text-sm text-[#5E8E3E]">
                    <span>Discount (10%)</span>
                    <span className="font-medium">
                      -{formatPrice(discountValue)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-neutral-600">
                  <span>Shipping</span>
                  <span className="font-medium text-neutral-800">
                    {shippingCost === 0 ? "Free" : formatPrice(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-neutral-600">
                  <span>Estimated tax</span>
                  <span className="font-medium text-neutral-800">
                    {formatPrice(tax)}
                  </span>
                </div>
                <div className="border-t border-neutral-100 pt-3 flex justify-between items-center">
                  <span className="font-bold text-neutral-900">Total</span>
                  <span className="text-xl font-bold text-[#5E8E3E]">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Security badges */}
              <div className="px-6 pb-5">
                <div className="flex items-center justify-center gap-4 pt-3 border-t border-neutral-100">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                    <Lock className="w-3 h-3" />
                    <span>SSL Secure</span>
                  </div>
                  <div className="w-px h-3 bg-neutral-200" />
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                    <Check className="w-3 h-3" />
                    <span>Buyer Protection</span>
                  </div>
                  <div className="w-px h-3 bg-neutral-200" />
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                    <Truck className="w-3 h-3" />
                    <span>Free Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}