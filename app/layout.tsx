import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cargo — Simple Package Tracking",
  description:
    "Cargo is a beautiful, private package tracker for iPhone, iPad, and Mac. Track your deliveries from UPS, FedEx, USPS, DHL, and 1,300+ carriers.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Cargo — Simple Package Tracking",
    description:
      "Track your deliveries from UPS, FedEx, USPS, DHL, and 1,300+ carriers. Private by design. No account required.",
    type: "website",
    images: [{ url: "/cargo-logo.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
