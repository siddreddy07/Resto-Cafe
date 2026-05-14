import { Instagram, ArrowUpRight } from "lucide-react";
import { CAFE_INFO } from "../constants";
import { motion } from "motion/react";

export default function Footer() {
  return (
    <footer className="bg-brand-black px-4 md:px-12 lg:px-24 py-32 md:py-48 border-t border-brand-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 justify-between items-start mb-32 md:mb-48">
          <div className="w-full lg:max-w-4xl">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-6xl sm:text-7xl md:text-[11vw] font-display font-black tracking-tighter leading-[0.8] uppercase mb-12 md:mb-20"
            >
              LET'S MAKE <br /> IT WILD.
            </motion.h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-16 border-t border-brand-white/10 pt-10 md:pt-16">
              <div className="space-y-4">
                 <p className="text-brand-accent/60 uppercase tracking-[0.4em] text-[10px] font-black">The Coordinates</p>
                 <div className="text-sm md:text-base font-medium uppercase tracking-widest text-brand-white/40 leading-relaxed">
                   <p>Jubilee Hills, Road 45</p>
                   <p>Hyderabad, TS 500033</p>
                 </div>
              </div>
              <div className="space-y-4">
                 <p className="text-brand-accent/60 uppercase tracking-[0.4em] text-[10px] font-black">The Connection</p>
                 <div className="text-sm md:text-base font-medium uppercase tracking-widest text-brand-white/40 leading-relaxed">
                   <p>{CAFE_INFO.phone}</p>
                   <p>hello@wildgoat.com</p>
                 </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8 items-start lg:items-end w-full lg:w-auto relative group">
            <a 
              href={`https://instagram.com/${CAFE_INFO.instagram}`}
              target="_blank"
              className="flex items-center gap-6 md:gap-10 text-7xl md:text-[8vw] font-display font-black tracking-tighter text-brand-white hover:text-brand-accent transition-all duration-500"
            >
              IG <ArrowUpRight className="w-10 h-10 md:w-20 md:h-20 group-hover:translate-x-3 group-hover:-translate-y-3 transition-transform" />
            </a>
            <div className="hidden lg:block h-32 w-px bg-gradient-to-b from-brand-accent/40 to-transparent mr-24" />
          </div>
        </div>

        <div className="relative pt-12 md:pt-20 border-t border-brand-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-16">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12 text-[9px] md:text-[10px] font-black tracking-[0.5em] uppercase text-brand-white/20 text-center md:text-left">
              <span>Designed for the Uncompromising</span>
              <div className="w-1.5 h-1.5 bg-brand-accent/20 rounded-full hidden md:block" />
              <span>MMXXIII - MMXXVI © HYD</span>
            </div>
            
            <div className="flex items-center gap-4 text-brand-white/10 select-none pointer-events-none">
              <span className="text-xs font-display font-black tracking-tighter italic">Wild Goat Archive</span>
            </div>
          </div>
          <div className="hidden md:flex flex-col absolute -bottom-10 left-0 select-none pointer-events-none">
            <span className="text-[12vw] lg:text-[10vw] xl:text-[8vw] leading-[0.5] font-display font-black tracking-[-0.11em] text-brand-white/[0.015] uppercase">WILD</span>
            <span className="text-[12vw] lg:text-[10vw] xl:text-[8vw] leading-[0.5] font-display font-black tracking-[-0.11em] text-brand-white/[0.015] uppercase">GOAT</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
