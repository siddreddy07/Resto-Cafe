import { motion, useScroll, useTransform } from "motion/react";
import { ChevronRight, Sparkles } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen w-full bg-brand-black overflow-hidden flex flex-col justify-center">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-accent/30 rounded-full blur-[150px]"
        />
        <motion.div 
          animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#3D2B1F]/40 rounded-full blur-[120px]"
        />
      </div>

      {/* Main Grid Content */}
      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24 lg:py-32 flex flex-col md:flex-row items-center gap-12 md:gap-16">
        
        {/* Left: Branding & Core Message */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8 md:space-y-12"
          >
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-12 bg-brand-accent/40" />
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em] text-brand-accent">
                Hyderabadi Modernity
              </span>
            </div>

            <div className="relative">
              <h1 className="text-6xl sm:text-8xl lg:text-[9vw] font-display font-black leading-[0.85] tracking-[-0.05em] text-brand-white uppercase">
                THE <br />
                <span className="text-outline-white text-transparent">WILD</span> <br />
                GOAT.
              </h1>
            </div>

            <div className="flex flex-col xl:flex-row items-start xl:items-center gap-8 lg:gap-10 xl:gap-16">
              <p className="max-w-xs text-xs md:text-sm font-light text-brand-white/40 leading-relaxed italic border-l border-brand-white/10 pl-6">
                "Where raw culinary heritage meets the precision of modern roasting. Experience the herd."
              </p>
              
              <Link to="/menu" className="group relative overflow-hidden px-6 py-3.5 md:px-8 md:py-4 bg-brand-white rounded-xl text-brand-black text-[10px] md:text-xs font-black uppercase tracking-widest transition-all shrink-0">
                <span className="relative z-10 flex items-center gap-3">
                  Discover Menu <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-brand-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right: Immersive Image Layer */}
        <div className="w-full md:w-1/2 h-[35vh] md:h-[40vh] lg:h-[65vh] relative group overflow-visible">
          <motion.div 
            style={{ y }}
            className="relative w-full h-full"
          >
            {/* The "Main" Visual */}
            <div className="relative w-full h-full rounded-2xl md:rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=2600"
                alt="Cafe Interior" 
                className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Global Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[50] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <style>{`
        .text-outline-white {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </section>
  );
}
