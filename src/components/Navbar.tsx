import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Menu, X, Instagram, MapPin, Wine } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-12 lg:px-20 h-20"
      >
        <div className="flex items-center gap-10 lg:gap-16">
          <Link to="/" className="flex flex-col items-center leading-[0.6] hover:opacity-80 transition-all shrink-0">
            <span className="text-xl md:text-2xl font-display font-black tracking-[-0.1em] text-brand-white">WILD</span>
            <span className="text-xl md:text-2xl font-display font-black tracking-[-0.1em] text-brand-white">GOAT</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-[10px] font-black uppercase tracking-[0.4em] text-brand-white/40">
            <Link to="/" className="hover:text-brand-white transition-all whitespace-nowrap">Home</Link>
            <Link to="/menu" className="hover:text-brand-white transition-all flex items-center gap-2 whitespace-nowrap">
              <Wine size={14} className="text-brand-accent" />
              Menu
            </Link>
            <a href="#about" className="hover:text-brand-white transition-all whitespace-nowrap">Heritage</a>
            <a href="#location" className="hover:text-brand-white transition-all whitespace-nowrap">Tribe</a>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden xl:flex flex-col items-end">
             <span className="text-[8px] font-black uppercase tracking-[0.4em] text-brand-white/20 mb-0.5">Location</span>
             <a
               href={CAFE_INFO.googleMapsLink}
               target="_blank"
               rel="noopener noreferrer"
               className="text-[10px] font-black uppercase tracking-widest text-brand-white/60 hover:text-brand-white transition-colors"
             >
               Jubilee Hills
             </a>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <a
              href={`https://instagram.com/${CAFE_INFO.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-brand-white hover:bg-brand-white/10 rounded-full transition-all"
            >
              <Instagram size={20} />
            </a>
            <Link 
              to="/menu" 
              className="hidden sm:flex px-6 py-2.5 bg-brand-accent text-brand-black rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
            >
              Menu
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-brand-white md:hidden rounded-full transition-colors relative z-[110]"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[90] bg-brand-black flex flex-col items-center justify-center gap-10 md:hidden px-6"
          >
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <Link
          to="/menu"
          onClick={() => setIsOpen(false)}
          className="text-4xl font-display font-bold tracking-tighter text-brand-accent hover:text-brand-white transition-colors"
        >
          MENU
        </Link>
        <a
          href="/"
          onClick={() => setIsOpen(false)}
          className="text-4xl font-display font-bold tracking-tighter hover:text-brand-stone transition-colors"
        >
          HOME
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
        )}
      </AnimatePresence>
    </>
  );
}
