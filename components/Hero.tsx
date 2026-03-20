"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-screen px-6 pt-24 pb-16 overflow-hidden text-center"
    >
      {/* Warm radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 60%, color-mix(in srgb, var(--accent) 14%, transparent), transparent)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex flex-col items-center gap-6"
      >
        {/* App icon */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/app-icon.png"
            alt="Cargo app icon"
            width={300}
            height={300}
            className="rounded-[27%] shadow-2xl"
            priority
          />
        </motion.div>

        {/* Wordmark */}
        <h1
          className="text-8xl sm:text-9xl leading-none"
          style={{ fontFamily: "var(--font-magical)", color: "var(--accent)" }}
        >
          Cargo
        </h1>

        {/* Tagline */}
        <p
          className="max-w-md text-xl sm:text-2xl leading-relaxed font-light"
          style={{ color: "var(--text-muted)" }}
        >
          Package tracking that stays out of your way.
        </p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-3 mt-2"
        >
          <span
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-base font-medium"
            style={{ backgroundColor: "var(--bg-surface)", color: "var(--text-muted)", border: "1px solid var(--border)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            Coming Soon to the App Store
          </span>
        </motion.div>

        {/* Platform badges */}
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          iPhone · iPad · Mac
        </p>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <svg
            width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ color: "var(--text-muted)" }}
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
