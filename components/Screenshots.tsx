"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const screenshots = [
    {
        src: "/screenshots/screenshot-1.png",
        alt: "Cargo — empty state",
        title: "Clean & Simple",
        caption:
            "No clutter, no noise. Add your first package and Cargo takes care of the rest.",
    },
    {
        src: "/screenshots/screenshot-2.png",
        alt: "Cargo — content view",
        title: "Your Deliveries at a Glance",
        caption:
            "All your active packages in one clean list, with live status and estimated arrival.",
    },
    {
        src: "/screenshots/screenshot-3.png",
        alt: "Cargo — select carrier",
        title: "1,300+ Carriers Supported",
        caption:
            "UPS, FedEx, USPS, DHL and over a thousand more — always the right carrier, automatically.",
    },
    {
        src: "/screenshots/screenshot-4.png",
        alt: "Cargo — package details",
        title: "Full Delivery Timeline",
        caption:
            "Every scan, every status update — from the warehouse to your front door.",
    },
    {
        src: "/screenshots/screenshot-5.png",
        alt: "Cargo — light & dark mode settings",
        title: "Light & Dark Mode",
        caption:
            "A warm, hand-crafted design in both light and dark — switch anytime from Settings.",
    },
    {
        src: "/screenshots/screenshot-6.png",
        alt: "Cargo Pro — paywall",
        title: "Cargo Pro",
        caption:
            "Unlock unlimited tracking, automatic background refresh, and priority support.",
    },
];

// Dimensions
const ACTIVE_W = 260;
const ACTIVE_H = 560;
const SIDE_SCALE = 0.78;
const SIDE_W = ACTIVE_W * SIDE_SCALE;
const SIDE_H = ACTIVE_H * SIDE_SCALE;
// How much the side phones are horizontally offset from centre (negative = overlap)
const SIDE_OFFSET = ACTIVE_W * 0.52;

function PhoneShell({
    width,
    height,
    children,
    shadow,
}: {
    width: number;
    height: number;
    children: React.ReactNode;
    shadow: string;
}) {
    const border = Math.round(width * 0.03);
    const radius = Math.round(width * 0.154);
    const innerRadius = radius - border - 1;
    const islandW = Math.round(width * 0.308);
    const islandH = Math.round(width * 0.1);

    return (
        <div
            className="relative shrink-0 select-none overflow-visible"
            style={{ width, height }}
        >
            <div
                className="absolute inset-0"
                style={{
                    borderRadius: radius,
                    border: `${border}px solid`,
                    borderColor: "color-mix(in srgb, var(--text) 22%, transparent)",
                    backgroundColor: "var(--bg-card)",
                    boxShadow: shadow,
                }}
            >
                {/* Dynamic Island */}
                <div
                    className="absolute left-1/2 -translate-x-1/2"
                    style={{
                        top: border + 4,
                        width: islandW,
                        height: islandH,
                        borderRadius: islandH / 2,
                        backgroundColor: "var(--text)",
                    }}
                />
                {/* Screen */}
                <div
                    className="absolute overflow-hidden"
                    style={{
                        inset: 1,
                        borderRadius: innerRadius,
                    }}
                >
                    {children}
                </div>
            </div>
            {/* Side button */}
            <div
                className="absolute rounded-r-full"
                style={{
                    right: -Math.round(width * 0.038),
                    top: Math.round(height * 0.178),
                    width: Math.round(width * 0.015),
                    height: Math.round(height * 0.107),
                    backgroundColor: "color-mix(in srgb, var(--text) 25%, transparent)",
                }}
            />
            {/* Volume buttons */}
            {[0.121, 0.2].map((topFrac, i) => (
                <div
                    key={i}
                    className="absolute rounded-l-full"
                    style={{
                        left: -Math.round(width * 0.038),
                        top: Math.round(height * topFrac),
                        width: Math.round(width * 0.015),
                        height: Math.round(height * 0.064),
                        backgroundColor: "color-mix(in srgb, var(--text) 25%, transparent)",
                    }}
                />
            ))}
        </div>
    );
}

function SlideImage({ src, alt }: { src: string; alt: string }) {
    return (
        <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="320px"
            priority
        />
    );
}

export default function Screenshots() {
    const [active, setActive] = useState(0);

    const prev = useCallback(
        () => setActive((a) => (a - 1 + screenshots.length) % screenshots.length),
        []
    );
    const next = useCallback(
        () => setActive((a) => (a + 1) % screenshots.length),
        []
    );

    const prevIdx = (active - 1 + screenshots.length) % screenshots.length;
    const nextIdx = (active + 1) % screenshots.length;
    const current = screenshots[active];

    // Total visual height of the stack
    const stackH = ACTIVE_H + 40; // 40px breathing room below active for shadow

    return (
        <section
            id="screenshots"
            className="py-24 overflow-hidden"
            style={{ backgroundColor: "var(--bg)" }}
        >
            {/* Heading */}
            <div className="max-w-5xl mx-auto px-6 mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                >
                    <h2
                        className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4"
                        style={{ color: "var(--text)" }}
                    >
                        See it in action
                    </h2>
                    <p className="text-lg" style={{ color: "var(--text-muted)" }}>
                        Clean, focused, and beautiful in every mode.
                    </p>
                </motion.div>
            </div>

            {/* ── Three-phone stage ── */}
            <div
                className="relative mx-auto"
                style={{ width: ACTIVE_W, height: stackH }}
            >
                {/* PREV phone — left, behind active */}
                <motion.div
                    key={`prev-${prevIdx}`}
                    className="absolute cursor-pointer"
                    style={{ zIndex: 1 }}
                    animate={{
                        x: -SIDE_OFFSET,
                        y: (ACTIVE_H - SIDE_H) / 2,
                        scale: 1,
                        opacity: 0.72,
                    }}
                    transition={{ type: "spring", stiffness: 320, damping: 34 }}
                    onClick={prev}
                    aria-label="Previous screenshot"
                >
                    <PhoneShell
                        width={SIDE_W}
                        height={SIDE_H}
                        shadow="0 16px 40px -8px rgba(0,0,0,0.45)"
                    >
                        <SlideImage
                            src={screenshots[prevIdx].src}
                            alt={screenshots[prevIdx].alt}
                        />
                    </PhoneShell>
                </motion.div>

                {/* NEXT phone — right, behind active */}
                <motion.div
                    key={`next-${nextIdx}`}
                    className="absolute cursor-pointer"
                    style={{ zIndex: 1 }}
                    animate={{
                        x: SIDE_OFFSET,
                        y: (ACTIVE_H - SIDE_H) / 2,
                        scale: 1,
                        opacity: 0.72,
                    }}
                    transition={{ type: "spring", stiffness: 320, damping: 34 }}
                    onClick={next}
                    aria-label="Next screenshot"
                >
                    <PhoneShell
                        width={SIDE_W}
                        height={SIDE_H}
                        shadow="0 16px 40px -8px rgba(0,0,0,0.45)"
                    >
                        <SlideImage
                            src={screenshots[nextIdx].src}
                            alt={screenshots[nextIdx].alt}
                        />
                    </PhoneShell>
                </motion.div>

                {/* ACTIVE phone — centre, in front */}
                <motion.div
                    className="absolute"
                    style={{ zIndex: 2, left: 0, top: 0 }}
                    animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 320, damping: 34 }}
                >
                    <PhoneShell
                        width={ACTIVE_W}
                        height={ACTIVE_H}
                        shadow="0 32px 64px -12px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.06)"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active}
                                className="absolute inset-0"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.22 }}
                            >
                                <SlideImage
                                    src={current.src}
                                    alt={current.alt}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </PhoneShell>
                </motion.div>
            </div>

            {/* Caption */}
            <div className="mt-12 text-center min-h-[72px] px-6">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                    >
                        <p
                            className="text-base font-semibold mb-1"
                            style={{ color: "var(--text)" }}
                        >
                            {current.title}
                        </p>
                        <p
                            className="text-sm max-w-sm mx-auto"
                            style={{ color: "var(--text-muted)" }}
                        >
                            {current.caption}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-6">
                {screenshots.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setActive(i)}
                        aria-label={`Go to screenshot ${i + 1}`}
                        className="transition-all duration-300 rounded-full"
                        style={{
                            width: active === i ? 24 : 8,
                            height: 8,
                            backgroundColor:
                                active === i ? "var(--accent)" : "var(--border)",
                        }}
                    />
                ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex justify-center gap-4 mt-6">
                <button
                    onClick={prev}
                    aria-label="Previous"
                    className="w-11 h-11 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                    style={{
                        backgroundColor: "var(--bg-card)",
                        border: "1px solid var(--border)",
                        color: "var(--text)",
                        fontSize: 18,
                    }}
                >
                    ←
                </button>
                <button
                    onClick={next}
                    aria-label="Next"
                    className="w-11 h-11 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                    style={{
                        backgroundColor: "var(--bg-card)",
                        border: "1px solid var(--border)",
                        color: "var(--text)",
                        fontSize: 18,
                    }}
                >
                    →
                </button>
            </div>
        </section>
    );
}
