"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const screenshots = [
    {
        src: "/screenshots/screenshot-1.png",
        alt: "Cargo — content view",
        title: "Your Deliveries at a Glance",
        caption:
            "All your active packages in one clean list, with live status and estimated arrival.",
    },
    {
        src: "/screenshots/screenshot-2.png",
        alt: "Cargo — empty state",
        title: "Clean & Simple",
        caption:
            "No clutter, no noise. Add your first package and Cargo takes care of the rest.",
    },
    {
        src: "/screenshots/screenshot-3.png",
        alt: "Cargo — add a package",
        title: "Add a Package in Seconds",
        caption:
            "Paste any tracking number and Cargo detects the carrier automatically.",
    },
    {
        src: "/screenshots/screenshot-4.png",
        alt: "Cargo — select carrier",
        title: "1,300+ Carriers Supported",
        caption:
            "UPS, FedEx, USPS, DHL and over a thousand more — always the right carrier, automatically.",
    },
    {
        src: "/screenshots/screenshot-5.png",
        alt: "Cargo — package details",
        title: "Full Delivery Timeline",
        caption:
            "Every scan, every status update — from the warehouse to your front door.",
    },
    {
        src: "/screenshots/screenshot-6.png",
        alt: "Cargo Pro — paywall",
        title: "Cargo Pro",
        caption:
            "Unlock unlimited tracking, automatic background refresh, and priority support.",
    },
    {
        src: "/screenshots/screenshot-7.png",
        alt: "Cargo — light & dark mode settings",
        title: "Light & Dark Mode",
        caption:
            "A warm, hand-crafted design in both light and dark — switch anytime from Settings.",
    },
];

function PhoneFrame({ children }: { children: React.ReactNode }) {
    return (
        <div
            className="relative shrink-0 select-none"
            style={{ width: 260, height: 560 }}
        >
            {/* Phone shell */}
            <div
                className="absolute inset-0 rounded-[40px] border-[8px]"
                style={{
                    borderColor: "color-mix(in srgb, var(--text) 20%, transparent)",
                    backgroundColor: "var(--bg-card)",
                    boxShadow:
                        "0 32px 64px -12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
                }}
            >
                {/* Dynamic island */}
                <div
                    className="absolute top-3 left-1/2 -translate-x-1/2 w-[80px] h-[26px] rounded-full"
                    style={{ backgroundColor: "var(--text)" }}
                />
                {/* Screen content */}
                <div className="absolute inset-[1px] rounded-[33px] overflow-hidden">
                    {children}
                </div>
            </div>

            {/* Side button */}
            <div
                className="absolute -right-[10px] top-[100px] w-[4px] h-[60px] rounded-r-full"
                style={{
                    backgroundColor: "color-mix(in srgb, var(--text) 25%, transparent)",
                }}
            />
            {/* Volume buttons */}
            {[68, 112].map((top) => (
                <div
                    key={top}
                    className="absolute -left-[10px] w-[4px] h-[36px] rounded-l-full"
                    style={{
                        top,
                        backgroundColor: "color-mix(in srgb, var(--text) 25%, transparent)",
                    }}
                />
            ))}
        </div>
    );
}

export default function Screenshots() {
    const trackRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(0);
    const [hasImages, setHasImages] = useState<boolean[]>(
        screenshots.map(() => true)
    );

    const scrollTo = useCallback((index: number) => {
        const track = trackRef.current;
        if (!track) return;
        const card = track.children[index] as HTMLElement;
        if (!card) return;
        const offset =
            card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
        track.scrollTo({ left: offset, behavior: "smooth" });
        setActive(index);
    }, []);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const onScroll = () => {
            const center = track.scrollLeft + track.clientWidth / 2;
            let closest = 0;
            let minDist = Infinity;
            Array.from(track.children).forEach((child, i) => {
                const el = child as HTMLElement;
                const childCenter = el.offsetLeft + el.offsetWidth / 2;
                const dist = Math.abs(center - childCenter);
                if (dist < minDist) {
                    minDist = dist;
                    closest = i;
                }
            });
            setActive(closest);
        };

        track.addEventListener("scroll", onScroll, { passive: true });
        return () => track.removeEventListener("scroll", onScroll);
    }, []);

    const current = screenshots[active];

    return (
        <section
            id="screenshots"
            className="py-24 overflow-hidden"
            style={{ backgroundColor: "var(--bg)" }}
        >
            {/* Heading */}
            <div className="max-w-5xl mx-auto px-6 mb-12 text-center">
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
                    <p
                        className="text-lg"
                        style={{ color: "var(--text-muted)" }}
                    >
                        Clean, focused, and beautiful in every mode.
                    </p>
                </motion.div>
            </div>

            {/* Carousel track */}
            <div
                ref={trackRef}
                className="flex gap-8 overflow-x-auto no-scrollbar px-[max(24px,calc(50vw-160px))] pb-4"
                style={{ scrollSnapType: "x mandatory" }}
            >
                {screenshots.map((shot, i) => (
                    <motion.div
                        key={shot.src}
                        initial={{ opacity: 0, scale: 0.92 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{
                            duration: 0.55,
                            delay: i * 0.08,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        style={{
                            scrollSnapAlign: "center",
                            opacity: active === i ? 1 : 0.45,
                            transform: active === i ? "scale(1.04)" : "scale(1)",
                            transition: "opacity 0.3s ease, transform 0.3s ease",
                        }}
                        className="shrink-0 cursor-pointer"
                        onClick={() => scrollTo(i)}
                    >
                        <PhoneFrame>
                            {hasImages[i] ? (
                                <Image
                                    src={shot.src}
                                    alt={shot.alt}
                                    fill
                                    className="object-cover"
                                    onError={() => {
                                        setHasImages((prev) => {
                                            const next = [...prev];
                                            next[i] = false;
                                            return next;
                                        });
                                    }}
                                />
                            ) : (
                                <div
                                    className="w-full h-full flex flex-col items-center justify-center gap-3 text-center px-4"
                                    style={{ backgroundColor: "#1C1006" }}
                                >
                                    <p className="text-xs" style={{ color: "#9A7255" }}>
                                        {shot.alt}
                                    </p>
                                </div>
                            )}
                        </PhoneFrame>
                    </motion.div>
                ))}
            </div>

            {/* Animated caption */}
            <div className="mt-10 text-center min-h-[72px] px-6">
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
                        onClick={() => scrollTo(i)}
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
        </section>
    );
}
