import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cargo — Simple Package Tracking",
  description:
    "Cargo is a beautiful, private package tracker for iPhone, iPad, and Mac. Track your deliveries from UPS, FedEx, USPS, DHL, and 1,300+ carriers.",
  openGraph: {
    title: "Cargo — Simple Package Tracking",
    description:
      "Track your deliveries from UPS, FedEx, USPS, DHL, and 1,300+ carriers. Private by design. No account required.",
    type: "website",
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
