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
          <Link to="/" className="flex flex-col items-center leading-[0.5] hover:opacity-80 transition-all shrink-0">
            <span className="text-xl md:text-2xl font-display font-black tracking-[-0.11em] text-brand-white">WILD</span>
            <span className="text-xl md:text-2xl font-display font-black tracking-[-0.11em] text-brand-white">GOAT</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-[10px] font-black uppercase tracking-[0.4em] text-brand-white/40">
            <Link to="/" className="hover:text-brand-white transition-all whitespace-nowrap">Home</Link>
            <Link to="/menu" className="hover:text-brand-white transition-all flex items-center gap-2 whitespace-nowrap">
              <Wine size={14} className="text-brand-accent" />
              Menu
            </Link>
            <a href="#about" className="hover:text-brand-white transition-all whitespace-nowrap">About</a>
            <a href="#location" className="hover:text-brand-white transition-all whitespace-nowrap">Location</a>
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
              className="group relative w-12 h-12 flex md:hidden items-center justify-center rounded-full transition-colors z-[110]"
              aria-label="Toggle Menu"
            >
              <div className="relative w-6 h-6">
                <motion.span 
                  animate={isOpen ? { rotate: 45, y: 0, width: "100%" } : { rotate: 0, y: -6, width: "100%" }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="absolute top-1/2 left-0 h-[1.5px] bg-brand-accent rounded-full origin-center"
                />
                <motion.span 
                  animate={isOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-1/2 left-0 w-4 h-[1.5px] bg-brand-white rounded-full origin-center"
                />
                <motion.span 
                  animate={isOpen ? { rotate: -45, y: 0, width: "100%" } : { rotate: 0, y: 6, width: "100%" }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="absolute top-1/2 left-0 h-[1.5px] bg-brand-accent rounded-full origin-center"
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 48px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 48px) 40px)" }}
            exit={{ 
              clipPath: "circle(0% at calc(100% - 48px) 40px)",
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
            }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[90] bg-brand-black flex flex-col items-center justify-center md:hidden"
          >
            {/* Cinematic Backdrop */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
               <motion.div 
                 animate={{ 
                   opacity: [0.03, 0.1, 0.03],
                   scale: [1, 1.2, 1],
                   rotate: [0, 45, 0]
                 }}
                 transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                 className="absolute top-1/4 -right-1/4 w-full h-full bg-brand-accent/20 rounded-full blur-[180px]"
               />
               <div className="absolute inset-0 bg-[#050505]/40 backdrop-blur-[2px]" />
               <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </div>

            <div className="relative z-10 w-full px-12 flex flex-col items-center">
              <div className="flex flex-col items-center gap-6 md:gap-10">
                {[
                  { label: "Home", path: "/" },
                  { label: "Menu", path: "/menu" },
                  { label: "About", path: "#about" },
                  { label: "Location", path: "#location" }
                ].map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ y: 100, rotateX: -30, opacity: 0 }}
                    animate={{ y: 0, rotateX: 0, opacity: 1 }}
                    exit={{ y: -60, rotateX: 20, opacity: 0 }}
                    transition={{ 
                      delay: 0.2 + i * 0.1, 
                      duration: 0.9, 
                      ease: [0.215, 0.61, 0.355, 1] 
                    }}
                    className="perspective-1000"
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="group flex flex-col items-center"
                    >
                      <div className="relative overflow-hidden py-2 px-4">
                        <span className="text-4xl sm:text-5xl font-display font-black tracking-[-0.05em] text-brand-white uppercase block transition-transform duration-700 group-hover:-translate-y-full">
                          {link.label}
                        </span>
                        <span className="absolute inset-0 py-2 px-4 text-4xl sm:text-5xl font-display font-black tracking-[-0.05em] text-brand-accent uppercase block translate-y-full transition-transform duration-700 group-hover:translate-y-0 italic">
                          {link.label}
                        </span>
                      </div>
                      <motion.div 
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        className="h-2 w-2 rounded-full bg-brand-accent opacity-0 group-hover:opacity-100 transition-all duration-300"
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex gap-8 mt-16"
              >
                {[
                  { Icon: Instagram, href: `https://instagram.com/${CAFE_INFO.instagram}` },
                  { Icon: MapPin, href: CAFE_INFO.googleMapsLink }
                ].map(({ Icon, href }, i) => (
                  <motion.a 
                    key={i}
                    whileHover={{ 
                      scale: 1.15, 
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      borderColor: "rgba(202, 138, 4, 0.5)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    href={href} 
                    className="w-14 h-14 flex items-center justify-center bg-brand-white/5 border border-brand-white/10 rounded-full text-brand-white transition-all duration-500"
                  >
                    <Icon size={22} />
                  </motion.a>
                ))}
              </motion.div>
            </div>

            <div className="absolute bottom-16 flex flex-col items-center gap-4">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: 48 }}
                 transition={{ delay: 1, duration: 1.2 }}
                 className="h-[1px] bg-brand-accent/30"
               />
               <div className="flex flex-col items-center">
                 <span className="text-[10px] font-black tracking-[0.8em] text-brand-white/40 uppercase mb-1">Jubilee Hills</span>
                 <span className="text-[8px] font-mono text-brand-white/10 uppercase tracking-widest">Hyd • 2024</span>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
