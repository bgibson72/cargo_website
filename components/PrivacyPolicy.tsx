"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  {
    title: "Overview",
    content: `Cargo is a package tracking app for iOS and macOS. We are committed to protecting your privacy. This policy explains what data Cargo collects, how it is used, and your rights as a user.`,
  },
  {
    title: "Data We Collect",
    content: `Tracking Numbers\nTracking numbers you enter are stored locally on your device using Apple's SwiftData framework. They are transmitted to our third-party tracking provider, Ship24 (ship24.com), solely for the purpose of retrieving shipment status information.\n\nSubscription Information\nIf you purchase Cargo Pro, your subscription is managed entirely by Apple through the App Store. We do not have access to your payment information. We receive only a confirmation of your subscription status via Apple's StoreKit framework.\n\nCarrier Detection\nCargo may analyze the format of a tracking number to detect the likely carrier (UPS, FedEx, USPS, DHL, etc.). This analysis happens entirely on your device and is not transmitted anywhere.`,
  },
  {
    title: "Data We Do NOT Collect",
    content: `• We do not collect your name, email address, or any personally identifiable information\n• We do not collect location data\n• We do not use advertising SDKs or analytics frameworks\n• We do not sell, rent, or share your data with third parties beyond what is described above`,
  },
  {
    title: "Third-Party Services",
    content: `Ship24 (ship24.com/privacy) — Package tracking data\nApple App Store / StoreKit (apple.com/legal/privacy) — Subscription management`,
  },
  {
    title: "Data Storage & Security",
    content: `All package data is stored locally on your device. No Cargo account or server-side database is created. Data syncs between your devices only if you have iCloud enabled on your device, using Apple's iCloud infrastructure.`,
  },
  {
    title: "Data Retention & Deletion",
    content: `You can delete all data stored by Cargo at any time by deleting the app from your device. This permanently removes all locally stored tracking numbers and preferences.`,
  },
  {
    title: "Children's Privacy",
    content: `Cargo does not knowingly collect any data from children under the age of 13. The app is rated 4+ and contains no features directed at children.`,
  },
  {
    title: "Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. Any changes will be reflected by updating the Effective Date at the top of this page. Continued use of the app after changes constitutes acceptance of the updated policy.`,
  },
  {
    title: "Contact",
    content: `If you have any questions about this Privacy Policy, please contact us:\n\nVegvisir Design\nbryan.j.gibson@icloud.com`,
  },
];

function AccordionItem({
  section,
  isOpen,
  onToggle,
}: {
  section: (typeof sections)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: "1px solid var(--border)" }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors"
        style={{ backgroundColor: isOpen ? "color-mix(in srgb, var(--accent) 8%, var(--bg-card))" : "var(--bg-card)" }}
        aria-expanded={isOpen}
      >
        <span className="font-medium text-sm" style={{ color: "var(--text)" }}>
          {section.title}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-xl leading-none"
          style={{ color: "var(--accent)" }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div
              className="px-5 pb-5 pt-1 text-sm leading-relaxed whitespace-pre-line"
              style={{ color: "var(--text-muted)", backgroundColor: "var(--bg-card)" }}
            >
              {section.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PrivacyPolicy() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="privacy"
      className="py-24 px-6"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2
            className="text-3xl sm:text-4xl font-semibold tracking-tight mb-2"
            style={{ color: "var(--text)" }}
          >
            Privacy Policy
          </h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Effective Date: March 20, 2026 &nbsp;·&nbsp; Developer: Vegvisir Design
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-2"
        >
          {sections.map((section, i) => (
            <AccordionItem
              key={section.title}
              section={section}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
