"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 backdrop-blur-md"
          : "py-5"
      }`}
      style={{
        backgroundColor: scrolled ? "color-mix(in srgb, var(--bg) 85%, transparent)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
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

        <a
          href="#pricing"
          className="text-sm font-medium px-4 py-2 rounded-full transition-colors"
          style={{
            backgroundColor: "var(--accent)",
            color: "#fff",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--accent-light)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--accent)")
          }
        >
          Get Cargo
        </a>
      </div>
    </nav>
  );
}
