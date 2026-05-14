import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-brand-black">
      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Abstract Architectural Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
           initial={{ scale: 1.1, opacity: 0 }}
           animate={{ scale: 1, opacity: 0.5 }}
           transition={{ duration: 4, ease: [0.16, 1, 0.3, 1] }}
           className="h-full w-full"
        >
          <img
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=2600"
            alt="Wild Goat Culinary Experience"
            className="h-full w-full object-cover brightness-50"
          />
        </motion.div>
        <div className="absolute inset-0 bg-brand-black/40 mix-blend-multiply" />
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-8 md:mb-12"
        >
          <div className="inline-flex items-center gap-4 px-5 py-2.5 bg-brand-accent/20 border border-brand-accent/30 rounded-full backdrop-blur-xl">
            <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse" />
            <span className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em] text-brand-accent">
              Premium Resto-Cafe • Jubilee Hills
            </span>
          </div>
        </motion.div>

        <div className="mb-12 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center leading-[0.5] font-display font-black tracking-[-0.11em] select-none text-brand-white mix-blend-difference uppercase"
          >
            <span className="text-7xl sm:text-9xl -mt-2 md:text-[10vw] lg:text-[10vw] xl:text-[10vw]">WILD</span>
            <span className="text-7xl sm:text-9xl -mt-2 sm:-mt-2 md:-mt-6 xl:-mt-10 md:text-[10vw] lg:text-[10vw] xl:text-[10vw]">GOAT</span>
          </motion.div>
        </div>

        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1, duration: 1.5 }}
           className="flex flex-col items-center gap-10 md:gap-14"
        >
          <div className="h-px w-24 bg-brand-white/20" />
          <p className="max-w-md mx-auto text-[10px] md:text-sm font-black text-brand-white/50 leading-loose uppercase tracking-[0.4em] italic">
            Artisanal Roasts & Global Culinary Heritage.
          </p>
          <div className="flex gap-4">
            <Link to="/menu" className="group px-10 py-4 bg-brand-accent text-brand-black text-[11px] font-black uppercase tracking-widest rounded-full hover:bg-brand-white transition-all shadow-2xl flex items-center gap-3">
              Explore Menu
              <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Side HUD Elements */}
      <div className="absolute top-1/2 -translate-y-1/2 left-12 hidden lg:flex flex-col gap-24 items-center">
        <div className="w-px h-32 bg-brand-white/10" />
        <span className="rotate-90 text-[10px] font-black text-brand-white/20 tracking-[0.5em] uppercase whitespace-nowrap">EST. MMXXIII</span>
      </div>

      <div className="absolute bottom-12 left-12 flex items-end gap-4 overflow-hidden">
        <span className="text-4xl font-display font-black text-brand-white/10">01</span>
        <div className="w-12 h-px bg-brand-white/10 mb-2" />
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 right-12 text-brand-white/20 uppercase tracking-[0.5em] text-[8px] font-black flex items-center gap-4"
      >
        DISCOVER <div className="w-4 h-px bg-brand-white/20" />
      </motion.div>
    </section>
  );
}
