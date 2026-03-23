"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import SupportForm from "./SupportForm";

export default function Footer() {
  const [showSupport, setShowSupport] = useState(false);
  const year = 2026;

  return (
    <>
      <footer
        className="py-10 px-6"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <Image src="/app-icon.png" alt="Cargo app icon" width={28} height={28} className="rounded-[27%]" />
            <span
              className="text-xl leading-none"
              style={{ fontFamily: "var(--font-magical)", color: "var(--accent)" }}
            >
              Cargo
            </span>
            <span style={{ color: "var(--border)" }}>·</span>
            <span style={{ color: "var(--text-muted)" }}>© {year} Vegvisir Design</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-5">
            <a
              href="#privacy"
              className="hover:underline underline-offset-2 transition-colors"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              Privacy Policy
            </a>
            <button
              onClick={() => setShowSupport(true)}
              className="hover:underline underline-offset-2 transition-colors bg-transparent border-none cursor-pointer p-0"
              style={{ color: "var(--text-muted)", fontSize: "inherit" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              Support
            </button>
          </div>
        </div>
      </footer>

      {/* Support modal */}
      <AnimatePresence>
        {showSupport && <SupportForm onClose={() => setShowSupport(false)} />}
      </AnimatePresence>
    </>
  );
}
