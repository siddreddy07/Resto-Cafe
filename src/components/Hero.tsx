import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

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
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=2600"
            alt="Wild Goat Interior"
            className="h-full w-full object-cover grayscale brightness-50"
          />
        </motion.div>
        <div className="absolute inset-0 bg-brand-black/40 mix-blend-multiply" />
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-12"
        >
          <span className="text-[10px] font-black uppercase tracking-[1em] text-brand-white/40 block ml-4">
            HYDERABAD • JUBILEE HILLS • RESTO CAFE
          </span>
        </motion.div>

        <div className="overflow-hidden mb-12">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl sm:text-9xl md:text-[20vw] font-display font-black tracking-tighter leading-[0.7] select-none text-brand-white mix-blend-difference"
          >
            WILD <br /> GOAT
          </motion.h1>
        </div>

        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1, duration: 1.5 }}
           className="flex flex-col items-center gap-12"
        >
          <div className="h-px w-24 bg-brand-white/20" />
          <p className="max-w-xs mx-auto text-[9px] font-black text-brand-white/30 leading-loose uppercase tracking-[0.4em] italic">
            A Culinary Archive in Concrete & Caffeine.
          </p>
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
