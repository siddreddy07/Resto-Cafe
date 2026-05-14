import { Instagram, ArrowUpRight } from "lucide-react";
import { CAFE_INFO } from "../constants";
import { motion } from "motion/react";

export default function Footer() {
  return (
    <footer className="bg-brand-black px-6 md:px-12 lg:px-24 py-48 border-t border-brand-white/5 overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-32 justify-between items-start mb-64">
        <div className="max-w-4xl">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-7xl md:text-[12vw] font-display font-black tracking-tighter leading-[0.75] uppercase mb-16"
          >
            LET'S MAKE <br /> IT WILD.
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-sm uppercase tracking-[0.5em] font-black text-brand-white/20 italic">
            <div>
               <p className="mb-2 text-brand-white/10 uppercase tracking-widest text-[9px] not-italic">The Coordinates</p>
               <p>Jubilee Hills, Road 45</p>
               <p>Hyderabad, TS 500033</p>
            </div>
            <div>
               <p className="mb-2 text-brand-white/10 uppercase tracking-widest text-[9px] not-italic">The Connection</p>
               <p>{CAFE_INFO.phone}</p>
               <p>hello@wildgoat.com</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-12 items-end w-full lg:w-auto pt-12">
          <a 
            href={`https://instagram.com/${CAFE_INFO.instagram}`}
            target="_blank"
            className="group flex items-center gap-10 text-8xl md:text-[10vw] font-display font-black tracking-tighter hover:text-brand-accent transition-colors"
          >
            IG <ArrowUpRight className="w-16 h-16 md:w-32 md:h-32 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform" />
          </a>
        </div>
      </div>

      <div className="relative">
        <motion.div
           initial={{ scaleX: 0 }}
           whileInView={{ scaleX: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 2, ease: "circOut" }}
           className="h-px w-full bg-brand-white/10 origin-left mb-16"
        />
        
        <div className="flex flex-col md:flex-row justify-between items-end gap-16">
          <span className="text-[22vw] leading-none select-none font-display font-black text-brand-white/[0.02] absolute -bottom-20 left-0 pointer-events-none">WILD GOAT</span>
          <div className="relative z-10 flex flex-col md:flex-row gap-12 md:gap-24 text-[10px] font-black tracking-[0.4em] uppercase text-brand-white/20">
            <span>Designed for the Uncompromising</span>
            <span>MMXXIV © HYD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
