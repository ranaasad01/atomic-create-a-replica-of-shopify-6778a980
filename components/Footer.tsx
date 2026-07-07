"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { footerLinks, APP_NAME } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Code2 as Github, MessageCircle as Twitter, Briefcase as Linkedin, Globe as Facebook, Mail } from 'lucide-react';

export default function Footer() {
  const t = useTranslations();
  const pathname = usePathname();

  function handleAnchorClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    if (href.startsWith("#")) {
      if (pathname === "/") {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  function getHref(href: string) {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  }

  const isDashboard = pathname.startsWith("/dashboard");

  if (isDashboard) return null;

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      {/* Newsletter bar */}
      <div className="border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white text-lg font-semibold tracking-tight">
                {t("footer.newsletter.title")}
              </h3>
              <p className="text-neutral-400 text-sm mt-1">
                {t("footer.newsletter.subtitle")}
              </p>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-2 w-full md:w-auto"
            >
              <input
                type="email"
                placeholder={t("footer.newsletter.placeholder")}
                className="flex-1 md:w-72 px-4 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 text-sm outline-none focus:border-[#96BF48] transition-colors duration-200"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#96BF48] hover:bg-[#5E8E3E] text-white text-sm font-semibold rounded-xl transition-colors duration-200 whitespace-nowrap"
              >
                {t("footer.newsletter.cta")}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14"
      >
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand column */}
          <motion.div
            variants={fadeInUp}
            className="col-span-2 md:col-span-1"
          >
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-[#96BF48] flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-5 h-5 text-white"
                >
                  <path
                    d="M20.5 7.5L16 3H8L3.5 7.5V16.5L8 21H16L20.5 16.5V7.5Z"
                    fill="currentColor"
                    opacity="0.9"
                  />
                  <path
                    d="M12 8V16M8.5 10.5L12 8L15.5 10.5"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-white font-bold text-lg tracking-tight">
                {APP_NAME}
              </span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed">
              {t("footer.brand.description")}
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[
                { icon: Twitter, label: "Twitter" },
                { icon: Github, label: "GitHub" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Facebook, label: "Facebook" },
                { icon: Mail, label: "Email" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-[#96BF48] flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Store links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wide uppercase text-xs">
              {t("footer.sections.store")}
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.store.map((link) => (
                <li key={link.href}>
                  <Link
                    href={getHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-sm text-neutral-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Merchant links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wide uppercase text-xs">
              {t("footer.sections.merchant")}
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.merchant.map((link) => (
                <li key={link.href}>
                  <Link
                    href={getHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-sm text-neutral-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wide uppercase text-xs">
              {t("footer.sections.company")}
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <a
                    href={getHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-sm text-neutral-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wide uppercase text-xs">
              {t("footer.sections.support")}
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <a
                    href={getHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-sm text-neutral-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-neutral-500 text-xs">
            {t("footer.copyright", { year: "2024", brand: APP_NAME })}
          </p>
          <div className="flex items-center gap-4">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="text-neutral-500 hover:text-neutral-300 text-xs transition-colors duration-200"
                >
                  {item}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}