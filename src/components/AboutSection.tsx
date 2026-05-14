import { motion } from "motion/react";

export default function AboutSection() {
  return (
    <section id="about" className="section-padding bg-brand-black relative overflow-hidden">
      <div className="max-w-5xl mx-auto py-24 md:py-32 text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
        >
          <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] md:tracking-[0.5em] uppercase text-brand-white/20 mb-6 md:mb-8 block">
            The Manifesto
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-black tracking-tighter mb-12 md:mb-16 leading-tight uppercase">
            CRAFTED FOR THE <br /> UNCOMPROMISING.
          </h2>
          <div className="space-y-12 text-brand-white/50 text-lg md:text-2xl leading-relaxed font-light italic">
            <p className="max-w-3xl mx-auto border-l border-brand-white/10 pl-8 md:pl-12">
              "Wild Goat isn't just a resto-cafe; it's a culinary rejection of the mundane. We strip back the noise to reveal the soul of global cuisine, the depth of the bean, and the beauty of raw architecture."
            </p>
          </div>
          
          <div className="mt-20 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 border-t border-brand-white/5 pt-16 md:pt-20">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand-white/30 mb-4">Origin</p>
              <h3 className="text-xl font-display font-bold">ETHIOPIA & BRAZIL</h3>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand-white/30 mb-4">Method</p>
              <h3 className="text-xl font-display font-bold">SLOW EXTRACTION</h3>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand-white/30 mb-4">Environment</p>
              <h3 className="text-xl font-display font-bold">BRUTALIST CHIC</h3>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative vertical lines */}
      <div className="absolute left-[15%] top-0 bottom-0 w-px bg-brand-white/5 hidden lg:block" />
      <div className="absolute right-[15%] top-0 bottom-0 w-px bg-brand-white/5 hidden lg:block" />
    </section>
  );
}
