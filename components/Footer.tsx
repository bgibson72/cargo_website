"use client";

import Image from "next/image";

export default function Footer() {
  const year = 2026;

  return (
    <footer
      className="py-10 px-6"
      style={{
        backgroundColor: "var(--bg-surface)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-2.5">
          <Image
            src="/app-icon.png"
            alt="Cargo app icon"
            width={28}
            height={28}
            className="rounded-[27%]"
          />
          <span
            className="text-xl leading-none"
            style={{ fontFamily: "var(--font-magical)", color: "var(--accent)" }}
          >
            Cargo
          </span>
          <span style={{ color: "var(--border)" }}>·</span>
          <span style={{ color: "var(--text-muted)" }}>
            © {year} Vegvisir Design
          </span>
        </div>

        <div className="flex items-center gap-5" style={{ color: "var(--text-muted)" }}>
          <a
            href="#privacy"
            className="hover:underline underline-offset-2 transition-colors"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            Privacy Policy
          </a>
          <a
            href="mailto:bryan.j.gibson@icloud.com"
            className="hover:underline underline-offset-2 transition-colors"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
