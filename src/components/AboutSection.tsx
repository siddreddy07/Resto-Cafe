import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

const ABOUT_IMAGES = [
  { img: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800", label: "Artisanal Brew" },
  { img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800", label: "Global Cuisine" },
  { img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=800", label: "Raw Textures" }
];

export default function AboutSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ABOUT_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="about" className="py-12 md:pt-16 md:pb-32 lg:py-48 bg-brand-black relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="flex flex-col items-center">
          <motion.div
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1.2 }}
             className="flex flex-col gap-6 md:gap-12"
          >
            <div>
              <span className="text-[10px] md:text-xs font-bold tracking-[0.5em] uppercase text-brand-accent mb-3 md:mb-6 block">
                The Manifesto
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-7xl font-display font-black tracking-tighter mb-4 md:mb-8 leading-[0.9] uppercase text-brand-white">
                CRAFTED FOR <br /> THE RAW <br /> SOUL.
              </h2>
              <p className="text-brand-white/50 text-sm md:text-xl leading-relaxed font-light italic border-l-2 border-brand-accent/20 pl-4 md:pl-8 mx-auto max-w-2xl">
                "Wild Goat isn't just a space; it's a culinary rejection of the mundane. We strip back the noise to reveal the soul of global cuisine and the depth of the bean."
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 md:gap-8 pt-6 md:pt-8 border-t border-brand-white/10">
              <div className="space-y-1">
                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-brand-white/20">The Beans</p>
                <h4 className="text-base md:text-lg font-display font-bold text-brand-white">SINGLE ESTATE</h4>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-brand-white/20">The Plate</p>
                <h4 className="text-base md:text-lg font-display font-bold text-brand-white">GLOBAL FUSION</h4>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Supporting Secondary Image Grid - Auto Carousel on Mobile, Grid on Desktop */}
        <div className="mt-16 md:mt-24">
           {/* Mobile Auto-Carousel (One at a time) */}
           <div className="md:hidden relative h-64 overflow-hidden rounded-xl border border-brand-white/5">
             <AnimatePresence mode="wait">
               <motion.div
                 key={currentIndex}
                 initial={{ opacity: 0, x: 20, scale: 1.1 }}
                 animate={{ opacity: 1, x: 0, scale: 1 }}
                 exit={{ opacity: 0, x: -20, scale: 0.95 }}
                 transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                 className="absolute inset-0"
               >
                 <img 
                   src={ABOUT_IMAGES[currentIndex].img} 
                   alt={ABOUT_IMAGES[currentIndex].label} 
                   className="w-full h-full object-cover grayscale" 
                 />
                 <div className="absolute inset-0 bg-brand-black/40" />
                 <div className="absolute bottom-6 left-6 right-6 flex flex-col items-start">
                   <motion.span 
                     initial={{ y: 20, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ delay: 0.3 }}
                     className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent mb-2"
                   >
                     {ABOUT_IMAGES[currentIndex].label}
                   </motion.span>
                   <div className="flex gap-2">
                     {ABOUT_IMAGES.map((_, i) => (
                       <div 
                         key={i} 
                         className={`h-[1px] transition-all duration-500 ${i === currentIndex ? "w-8 bg-brand-accent" : "w-2 bg-brand-white/20"}`}
                       />
                     ))}
                   </div>
                 </div>
               </motion.div>
             </AnimatePresence>
           </div>

           {/* Desktop Grid (Static High-Res) */}
           <div className="hidden md:grid grid-cols-3 gap-8">
              {ABOUT_IMAGES.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 1 }}
                  className="relative h-64 rounded-2xl overflow-hidden group shadow-xl"
                >
                  <img src={item.img} alt={item.label} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105" />
                  <div className="absolute inset-0 bg-brand-black/20 group-hover:bg-transparent transition-colors" />
                  <div className="absolute top-4 left-4 p-2 bg-brand-black/40 backdrop-blur-md rounded-lg">
                    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-brand-white">{item.label}</span>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>
      </div>

      {/* Decorative vertical lines */}
      <div className="absolute left-[15%] top-0 bottom-0 w-px bg-brand-white/5 hidden lg:block" />
      <div className="absolute right-[15%] top-0 bottom-0 w-px bg-brand-white/5 hidden lg:block" />
    </section>
  );
}
