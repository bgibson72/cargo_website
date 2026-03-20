"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const features = [
  "Unlimited package tracking",
  "Priority status refreshes",
  "Supports all future features",
];

export default function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <section
      id="pricing"
      className="py-24 px-6"
      style={{ backgroundColor: "var(--bg-surface)" }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2
            className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4"
            style={{ color: "var(--text)" }}
          >
            Simple, honest pricing
          </h2>
          <p className="text-lg" style={{ color: "var(--text-muted)" }}>
            Start for free — upgrade when you&apos;re ready.
          </p>
        </motion.div>

        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <button
            onClick={() => setYearly(false)}
            className="text-sm font-medium transition-colors"
            style={{ color: yearly ? "var(--text-muted)" : "var(--text)" }}
          >
            Monthly
          </button>
          <button
            onClick={() => setYearly((v) => !v)}
            className="relative w-12 h-6 rounded-full transition-colors"
            style={{ backgroundColor: yearly ? "var(--accent)" : "var(--border)" }}
            aria-label="Toggle billing period"
          >
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
              style={{ left: yearly ? "calc(100% - 20px)" : "4px" }}
            />
          </button>
          <button
            onClick={() => setYearly(true)}
            className="text-sm font-medium transition-colors flex items-center gap-1.5"
            style={{ color: yearly ? "var(--text)" : "var(--text-muted)" }}
          >
            Yearly
            <span
              className="text-xs px-2 py-0.5 rounded-full font-semibold"
              style={{
                backgroundColor: "color-mix(in srgb, var(--accent) 18%, transparent)",
                color: "var(--accent)",
              }}
            >
              Save 37%
            </span>
          </button>
        </div>

        {/* Pricing cards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          {/* Free */}
          <div
            className="rounded-2xl p-7 flex flex-col gap-5"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border)",
            }}
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>
                Free
              </p>
              <div className="flex items-end gap-1">
                <span className="text-5xl font-bold" style={{ color: "var(--text)" }}>$0</span>
                <span className="text-base mb-2" style={{ color: "var(--text-muted)" }}>/ forever</span>
              </div>
            </div>

            <ul className="flex flex-col gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
              {["Track up to 3 packages", "All major carriers supported", "Light & dark mode"].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5" aria-hidden="true">
                    <circle cx="8" cy="8" r="8" fill="var(--border)" fillOpacity="0.6"/>
                    <path d="M5 8l2 2 4-4" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              <span
                className="w-full flex items-center justify-center py-3 rounded-xl text-sm font-medium"
                style={{ backgroundColor: "var(--bg-surface)", color: "var(--text-muted)", border: "1px solid var(--border)" }}
              >
                Coming Soon
              </span>
            </div>
          </div>

          {/* Pro */}
          <div
            className="rounded-2xl p-7 flex flex-col gap-5 relative overflow-hidden"
            style={{
              background: `linear-gradient(145deg, color-mix(in srgb, var(--accent) 22%, var(--bg-card)), var(--bg-card))`,
              border: "1px solid var(--accent)",
              boxShadow: "0 0 0 1px color-mix(in srgb, var(--accent) 30%, transparent), 0 16px 48px -12px color-mix(in srgb, var(--accent) 20%, transparent)",
            }}
          >
            {/* Pro badge */}
            <div
              className="absolute top-0 right-0 px-3 py-1.5 text-xs font-bold uppercase tracking-widest rounded-bl-xl"
              style={{ backgroundColor: "var(--accent)", color: "#fff" }}
            >
              Pro
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--accent)" }}>
                Cargo Pro
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={yearly ? "yearly" : "monthly"}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-end gap-1"
                >
                  {yearly ? (
                    <>
                      <span className="text-5xl font-bold" style={{ color: "var(--text)" }}>$14.99</span>
                      <span className="text-base mb-2" style={{ color: "var(--text-muted)" }}>/ year</span>
                    </>
                  ) : (
                    <>
                      <span className="text-5xl font-bold" style={{ color: "var(--text)" }}>$1.99</span>
                      <span className="text-base mb-2" style={{ color: "var(--text-muted)" }}>/ month</span>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
              {yearly && (
                <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                  That&apos;s just $1.25 / month
                </p>
              )}
            </div>

            <ul className="flex flex-col gap-3 text-sm" style={{ color: "var(--text)" }}>
              {["Track up to 3 packages (Free)", ...features].map((item, i) => (
                <li key={item} className="flex items-start gap-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5" aria-hidden="true">
                    <circle cx="8" cy="8" r="8" fill="var(--accent)" fillOpacity={i === 0 ? "0.3" : "1"}/>
                    <path d="M5 8l2 2 4-4" stroke={i === 0 ? "var(--accent)" : "#fff"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ color: i === 0 ? "var(--text-muted)" : "var(--text)" }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              <span
                className="w-full flex items-center justify-center py-3 rounded-xl text-sm font-semibold"
                style={{ backgroundColor: "var(--accent)", color: "#fff" }}
              >
                Coming Soon
              </span>
            </div>
          </div>
        </motion.div>

        <p className="text-center text-xs mt-6" style={{ color: "var(--text-muted)" }}>
          Subscriptions are managed by Apple. Cancel anytime from your App Store settings.
        </p>
      </div>
    </section>
  );
}
