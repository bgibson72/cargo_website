"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const screenshots = [
    {
        src: "/screenshots/screenshot-1.png",
        alt: "Cargo — empty state",
        title: "Clean & Simple",
        caption: "No clutter, no noise. Add your first package and Cargo takes care of the rest.",
    },
    {
        src: "/screenshots/screenshot-2.png",
        alt: "Cargo — content view",
        title: "Your Deliveries at a Glance",
        caption: "All your active packages in one clean list, with live status and estimated arrival.",
    },
    {
        src: "/screenshots/screenshot-3.png",
        alt: "Cargo — select carrier",
        title: "1,300+ Carriers Supported",
        caption: "UPS, FedEx, USPS, DHL and over a thousand more — always the right carrier, automatically.",
    },
    {
        src: "/screenshots/screenshot-4.png",
        alt: "Cargo — package details",
        title: "Full Delivery Timeline",
        caption: "Every scan, every status update — from the warehouse to your front door.",
    },
    {
        src: "/screenshots/screenshot-5.png",
        alt: "Cargo — light & dark mode settings",
        title: "Light & Dark Mode",
        caption: "A warm, hand-crafted design in both light and dark — switch anytime from Settings.",
    },
    {
        src: "/screenshots/screenshot-6.png",
        alt: "Cargo Pro — paywall",
        title: "Cargo Pro",
        caption: "Unlock unlimited tracking, automatic background refresh, and priority support.",
    },
];

const N = screenshots.length;

const ACTIVE_W = 260;
const ACTIVE_H = 560;
const SIDE_SCALE = 0.78;
const SIDE_W = Math.round(ACTIVE_W * SIDE_SCALE);
const SIDE_H = Math.round(ACTIVE_H * SIDE_SCALE);
const SIDE_OFFSET = Math.round(ACTIVE_W * 0.52);
const ARROW_OFFSET = SIDE_OFFSET + SIDE_W + 16;

function PhoneShell({
    width,
    height,
    shadow,
    children,
}: {
    width: number;
    height: number;
    shadow: string;
    children?: React.ReactNode;
}) {
    const border = Math.round(width * 0.03);
    const radius = Math.round(width * 0.154);
    const innerRadius = radius - border - 1;

    return (
        <div className="relative shrink-0 select-none" style={{ width, height }}>
            {/* Frame border */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    borderRadius: radius,
                    border: `${border}px solid`,
                    borderColor: "color-mix(in srgb, var(--text) 22%, transparent)",
                    boxShadow: shadow,
                    zIndex: 2,
                }}
            />
            {/* Screen — clips children to rounded rect */}
            <div
                className="absolute overflow-hidden"
                style={{ inset: border, borderRadius: innerRadius, zIndex: 1 }}
            >
                {children}
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
                    zIndex: 2,
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
                        zIndex: 2,
                    }}
                />
            ))}
        </div>
    );
}

function ArrowBtn({ onClick, label, side }: { onClick: () => void; label: string; side: "left" | "right" }) {
    return (
        <button
            onClick={onClick}
            aria-label={label}
            className="absolute top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            style={{
                [side]: -ARROW_OFFSET - 22,
                zIndex: 10,
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border)",
                color: "var(--text)",
                fontSize: 18,
                boxShadow: "0 4px 12px rgba(0,0,0,0.18)",
            }}
        >
            {side === "left" ? "←" : "→"}
        </button>
    );
}

export default function Screenshots() {
    const [active, setActive] = useState(0);
    const direction = useRef(1);

    const prev = useCallback(() => {
        direction.current = -1;
        setActive((a) => (a - 1 + N) % N);
    }, []);

    const next = useCallback(() => {
        direction.current = 1;
        setActive((a) => (a + 1) % N);
    }, []);

    const goTo = useCallback((i: number, cur: number) => {
        direction.current = i > cur ? 1 : -1;
        setActive(i);
    }, []);

    const prevIdx = (active - 1 + N) % N;
    const nextIdx = (active + 1) % N;
    const current = screenshots[active];

    const SLIDE_TRAVEL = ACTIVE_W * 1.1;
    const variants = {
        enter: (dir: number) => ({ x: dir * SLIDE_TRAVEL, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit:  (dir: number) => ({ x: -dir * SLIDE_TRAVEL, opacity: 0 }),
    };

    const stackH = ACTIVE_H + 40;

    return (
        <section id="screenshots" className="py-24 overflow-hidden" style={{ backgroundColor: "var(--bg)" }}>
            {/* Heading */}
            <div className="max-w-5xl mx-auto px-6 mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4" style={{ color: "var(--text)" }}>
                        See it in action
                    </h2>
                    <p className="text-lg" style={{ color: "var(--text-muted)" }}>
                        Clean, focused, and beautiful in every mode.
                    </p>
                </motion.div>
            </div>

            {/* Three-phone stage */}
            <div className="relative mx-auto" style={{ width: ACTIVE_W, height: stackH }}>

                {/* Prev phone */}
                <motion.div
                    className="absolute cursor-pointer"
                    style={{ zIndex: 1 }}
                    animate={{ x: -SIDE_OFFSET, y: (ACTIVE_H - SIDE_H) / 2, opacity: 0.72 }}
                    transition={{ type: "spring", stiffness: 300, damping: 32 }}
                    onClick={prev}
                >
                    <PhoneShell width={SIDE_W} height={SIDE_H} shadow="0 16px 40px -8px rgba(0,0,0,0.45)">
                        <Image src={screenshots[prevIdx].src} alt={screenshots[prevIdx].alt} fill className="object-cover" sizes="220px" />
                    </PhoneShell>
                </motion.div>

                {/* Next phone */}
                <motion.div
                    className="absolute cursor-pointer"
                    style={{ zIndex: 1 }}
                    animate={{ x: SIDE_OFFSET, y: (ACTIVE_H - SIDE_H) / 2, opacity: 0.72 }}
                    transition={{ type: "spring", stiffness: 300, damping: 32 }}
                    onClick={next}
                >
                    <PhoneShell width={SIDE_W} height={SIDE_H} shadow="0 16px 40px -8px rgba(0,0,0,0.45)">
                        <Image src={screenshots[nextIdx].src} alt={screenshots[nextIdx].alt} fill className="object-cover" sizes="220px" />
                    </PhoneShell>
                </motion.div>

                {/* Active phone — image slides inside the shell */}
                <div className="absolute" style={{ zIndex: 2, left: 0, top: 0 }}>
                    <PhoneShell
                        width={ACTIVE_W}
                        height={ACTIVE_H}
                        shadow="0 32px 64px -12px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.06)"
                    >
                        <AnimatePresence initial={false} custom={direction.current} mode="popLayout">
                            <motion.div
                                key={active}
                                custom={direction.current}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.18 },
                                }}
                                className="absolute inset-0"
                            >
                                <Image src={current.src} alt={current.alt} fill className="object-cover" sizes="280px" priority />
                            </motion.div>
                        </AnimatePresence>
                    </PhoneShell>
                </div>

                <ArrowBtn onClick={prev} label="Previous screenshot" side="left" />
                <ArrowBtn onClick={next} label="Next screenshot" side="right" />
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
                        <p className="text-base font-semibold mb-1" style={{ color: "var(--text)" }}>{current.title}</p>
                        <p className="text-sm max-w-sm mx-auto" style={{ color: "var(--text-muted)" }}>{current.caption}</p>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
                {screenshots.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i, active)}
                        aria-label={`Go to screenshot ${i + 1}`}
                        className="transition-all duration-300 rounded-full"
                        style={{
                            width: active === i ? 24 : 8,
                            height: 8,
                            backgroundColor: active === i ? "var(--accent)" : "var(--border)",
                        }}
                    />
                ))}
            </div>
        </section>
    );
}
