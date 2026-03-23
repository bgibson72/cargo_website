"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import SupportForm from "./SupportForm";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("cargo-theme") as Theme | null;
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("cargo-theme", theme);
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);
  const [showSupport, setShowSupport] = useState(false);

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    applyTheme(initial);
    setMounted(true);

    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  };

  const linkStyle = { color: "var(--text-muted)" } as React.CSSProperties;
  const linkHover = (e: React.MouseEvent<HTMLElement>) =>
    ((e.currentTarget as HTMLElement).style.color = "var(--accent)");
  const linkLeave = (e: React.MouseEvent<HTMLElement>) =>
    ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)");

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "py-3 backdrop-blur-md" : "py-5"
        }`}
        style={{
          backgroundColor: scrolled
            ? "color-mix(in srgb, var(--bg) 85%, transparent)"
            : "transparent",
          borderBottom: scrolled ? "1px solid var(--border)" : "none",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5 select-none">
            <Image
              src="/app-icon.png"
              alt="Cargo app icon"
              width={36}
              height={36}
              className="rounded-[27%]"
            />
            <span
              className="text-3xl leading-none"
              style={{ fontFamily: "var(--font-magical)", color: "var(--accent)" }}
            >
              Cargo
            </span>
          </div>

          {/* All right-side items: Privacy Policy, Support, Get Cargo, theme toggle */}
          <div className="flex items-center gap-5">
            {/* Nav links — hidden on small screens */}
            <a
              href="#privacy"
              className="hidden sm:block text-sm transition-colors"
              style={linkStyle}
              onMouseEnter={linkHover}
              onMouseLeave={linkLeave}
            >
              Privacy Policy
            </a>
            <button
              onClick={() => setShowSupport(true)}
              className="hidden sm:block text-sm bg-transparent border-none cursor-pointer p-0 transition-colors"
              style={linkStyle}
              onMouseEnter={linkHover}
              onMouseLeave={linkLeave}
            >
              Support
            </button>

            {/* Get Cargo CTA */}
            <a
              href="#pricing"
              className="text-sm font-medium px-4 py-2 rounded-full transition-colors"
              style={{ backgroundColor: "var(--accent)", color: "#fff" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--accent-light)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--accent)")}
            >
              Get Cargo
            </a>

            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                style={{
                  backgroundColor: "color-mix(in srgb, var(--text) 8%, transparent)",
                  border: "1px solid var(--border)",
                  color: "var(--text-muted)",
                }}
              >
                {theme === "dark" ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Support modal */}
      <AnimatePresence>
        {showSupport && <SupportForm onClose={() => setShowSupport(false)} />}
      </AnimatePresence>
    </>
  );
}
