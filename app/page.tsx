import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Screenshots from "@/components/Screenshots";
import Pricing from "@/components/Pricing";
import PrivacyPolicy from "@/components/PrivacyPolicy";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Screenshots />
        <Pricing />
        <PrivacyPolicy />
      </main>
      <Footer />
    </>
  );
}
