/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import MenuSection from "./components/MenuSection";
import GallerySection from "./components/GallerySection";
import ReservationSection from "./components/ReservationSection";
import LocationSection from "./components/LocationSection";
import Footer from "./components/Footer";
import AIAssistant from "./components/AIAssistant";
import CustomCursor from "./components/CustomCursor";
import LoadingScreen from "./components/LoadingScreen";
import FullMenu from "./pages/FullMenu";
import { useEffect, useState } from "react";

function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <Navbar />
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <main>
        <Hero />
        <AboutSection />
        <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-white/10 to-transparent" />
        <MenuSection />
        <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-white/10 to-transparent" />
        <GallerySection />
        <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-white/10 to-transparent" />
        <ReservationSection />
        <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-white/10 to-transparent" />
        <LocationSection />
      </main>
      <Footer />
      <AIAssistant />
    </motion.div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor && anchor.hash && anchor.origin === window.location.origin) {
        if (anchor.hash.startsWith("#")) {
          // If we are on home page, scroll
          if (window.location.pathname === "/") {
            e.preventDefault();
            const element = document.querySelector(anchor.hash);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <Router>
      <div className="relative overflow-x-hidden selection:bg-brand-white selection:text-brand-black">
        <LoadingScreen onComplete={() => setIsLoading(false)} />
        
        {!isLoading && (
          <>
            <CustomCursor />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/menu" element={<FullMenu />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

