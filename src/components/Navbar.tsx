import { motion, useScroll, useTransform } from "motion/react";
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
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 lg:px-20 h-20"
      >
        <div className="flex items-center gap-12 lg:gap-16">
          <Link to="/" className="text-xl md:text-2xl font-display font-black tracking-widest text-[#E8DCC4] hover:text-brand-accent transition-colors">
            WILD GOAT
          </Link>
          <div className="hidden lg:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-brand-white/40">
            <Link to="/" className="hover:text-brand-white hover:tracking-[0.4em] transition-all">Home</Link>
            <Link to="/menu" className="hover:text-brand-white hover:tracking-[0.4em] transition-all flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-brand-accent rounded-full" />
              Menu
            </Link>
            <a href="#about" className="hover:text-brand-white hover:tracking-[0.4em] transition-all">Heritage</a>
            <a href="#location" className="hover:text-brand-white hover:tracking-[0.4em] transition-all">Tribe</a>
          </div>
        </div>

        <div className="flex items-center gap-6 md:gap-8">
          <div className="hidden md:flex flex-col items-end">
             <span className="text-[8px] font-black uppercase tracking-[0.4em] text-brand-white/20 mb-0.5">Location</span>
             <a
               href={CAFE_INFO.googleMapsLink}
               target="_blank"
               rel="noopener noreferrer"
               className="text-[10px] font-black uppercase tracking-widest text-brand-white/60 hover:text-brand-accent transition-colors flex items-center gap-2"
             >
               Jubilee Hills
               <MapPin size={12} className="text-brand-accent" />
             </a>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <a
              href={`https://instagram.com/${CAFE_INFO.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 text-brand-white hover:bg-brand-white/5 rounded-full transition-all border border-transparent hover:border-brand-white/10"
            >
              <Instagram size={18} />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 text-brand-white bg-brand-white/5 md:hidden rounded-full transition-colors border border-brand-white/10"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link 
              to="/menu" 
              className="hidden md:flex px-6 py-2.5 bg-brand-accent text-brand-black rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-brand-white transition-all shadow-lg"
            >
              Explore Menu
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { x: 0 } : { x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-40 bg-brand-black flex flex-col items-center justify-center gap-8 md:hidden"
      >
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
    </>
  );
}
