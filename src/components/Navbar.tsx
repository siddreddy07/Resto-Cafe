import { motion, useScroll, useTransform } from "motion/react";
import { Menu, X, Instagram, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { CAFE_INFO } from "../constants";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(8, 8, 8, 0)", "rgba(8, 8, 8, 0.95)"]
  );
  
  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(12px)"]
  );

  const borderBottom = useTransform(
    scrollY,
    [0, 100],
    ["1px solid rgba(245, 245, 245, 0)", "1px solid rgba(245, 245, 245, 0.1)"]
  );

  return (
    <>
      <motion.nav
        style={{ backgroundColor, backdropFilter: backdropBlur, borderBottom }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12"
      >
        <div className="flex items-center gap-8">
          <a href="#" className="text-2xl font-display font-bold tracking-tighter text-brand-white">
            WILD GOAT
          </a>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium uppercase tracking-widest text-brand-white/70">
            <a href="#menu" className="hover:text-brand-white transition-colors">Menu</a>
            <a href="#about" className="hover:text-brand-white transition-colors">About</a>
            <a href="#location" className="hover:text-brand-white transition-colors">Location</a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={CAFE_INFO.googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 text-xs uppercase tracking-widest text-brand-white/50 hover:text-brand-white transition-colors"
          >
            <MapPin size={14} />
            Jubilee Hills
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-brand-white hover:bg-brand-white/10 rounded-full transition-colors md:hidden"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <a
            href={`https://instagram.com/${CAFE_INFO.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex p-2 text-brand-white hover:bg-brand-white/10 rounded-full transition-colors"
          >
            <Instagram size={20} />
          </a>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { x: 0 } : { x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-40 bg-brand-black flex flex-col items-center justify-center gap-8 md:hidden"
      >
        <a
          href="#menu"
          onClick={() => setIsOpen(false)}
          className="text-4xl font-display font-bold tracking-tighter hover:text-brand-stone transition-colors"
        >
          MENU
        </a>
        <a
          href="#about"
          onClick={() => setIsOpen(false)}
          className="text-4xl font-display font-bold tracking-tighter hover:text-brand-stone transition-colors"
        >
          ABOUT
        </a>
        <a
          href="#location"
          onClick={() => setIsOpen(false)}
          className="text-4xl font-display font-bold tracking-tighter hover:text-brand-stone transition-colors"
        >
          LOCATION
        </a>
        <div className="flex gap-6 mt-8">
          <a href={`https://instagram.com/${CAFE_INFO.instagram}`} className="p-4 bg-brand-white/5 rounded-full">
            <Instagram size={24} />
          </a>
          <a href={CAFE_INFO.googleMapsLink} className="p-4 bg-brand-white/5 rounded-full">
            <MapPin size={24} />
          </a>
        </div>
      </motion.div>
    </>
  );
}
