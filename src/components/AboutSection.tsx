import { motion } from "motion/react";

export default function AboutSection() {
  return (
    <section id="about" className="section-padding bg-brand-black relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="flex flex-col items-center">
          <motion.div
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1.2 }}
             className="flex flex-col gap-12"
          >
            <div>
              <span className="text-[10px] md:text-xs font-bold tracking-[0.5em] uppercase text-brand-accent mb-6 block">
                The Manifesto
              </span>
              <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter mb-8 leading-[0.9] uppercase text-brand-white">
                CRAFTED FOR <br /> THE RAW <br /> SOUL.
              </h2>
              <p className="text-brand-white/50 text-lg md:text-xl leading-relaxed font-light italic border-l-2 border-brand-accent/20 pl-8">
                "Wild Goat isn't just a space; it's a culinary rejection of the mundane. We strip back the noise to reveal the soul of global cuisine and the depth of the bean."
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-brand-white/10">
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-white/20">The Beans</p>
                <h4 className="text-lg font-display font-bold text-brand-white">SINGLE ESTATE</h4>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-white/20">The Plate</p>
                <h4 className="text-lg font-display font-bold text-brand-white">GLOBAL FUSION</h4>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Supporting Secondary Image Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { img: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800", label: "Artisanal Brew" },
             { img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800", label: "Global Cuisine" },
             { img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=800", label: "Raw Textures" }
           ].map((item, idx) => (
             <motion.div
               key={idx}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.2, duration: 1 }}
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

      {/* Decorative vertical lines */}
      <div className="absolute left-[15%] top-0 bottom-0 w-px bg-brand-white/5 hidden lg:block" />
      <div className="absolute right-[15%] top-0 bottom-0 w-px bg-brand-white/5 hidden lg:block" />
    </section>
  );
}
