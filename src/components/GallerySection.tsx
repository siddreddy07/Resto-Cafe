import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GALLERY_ROW_1, GALLERY_ROW_2 } from "../constants";
import { X, Maximize2 } from "lucide-react";

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="bg-brand-black py-24 md:py-48 lg:py-64 overflow-hidden border-t border-brand-white/5 relative">
      <div className="px-6 md:px-12 lg:px-24 mb-16 md:mb-24 relative z-10">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="text-center md:text-left">
              <span className="text-[10px] font-black tracking-[1.5em] text-brand-accent uppercase mb-6 md:mb-8 block italic">Curated Exhibition</span>
              <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10vw] font-display font-black tracking-tighter uppercase whitespace-pre-line leading-[0.7] text-brand-white mix-blend-difference">
                THE <br /> ARCHIVE.
              </h2>
            </div>
            <p className="text-xs md:text-sm font-mono text-brand-white/30 max-w-sm leading-relaxed italic text-center md:text-right">
              "A culinary journal capturing the intersection of raw nature, elevated taste, and modern urbanity."
            </p>
         </div>
      </div>
      
      {/* Infinite Marquee Experience */}
      <div className="space-y-12 md:space-y-24 lg:space-y-32">
        {/* Row 1: Fast & Bold */}
        <div className="relative flex overflow-hidden">
          <div className="animate-marquee whitespace-nowrap flex gap-6 md:gap-16 lg:gap-24 px-4">
            {[...GALLERY_ROW_1, ...GALLERY_ROW_1].map((img, idx) => (
              <motion.div
                key={`r1-${idx}`}
                whileHover={{ y: -15, scale: 1.02 }}
                onClick={() => setSelectedImage(img + '|' + idx)}
                className="inline-block w-[80vw] sm:w-[60vw] md:w-[700px] lg:w-[1000px] aspect-[16/9] md:aspect-[21/9] rounded-[2rem] md:rounded-[4rem] overflow-hidden group cursor-none relative shadow-2xl"
              >
                <img 
                  src={img} 
                  alt={`Exhibit ${idx}`} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 brightness-50 group-hover:brightness-100" 
                />
                <div className="absolute inset-0 p-6 md:p-12 lg:p-16 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-700 bg-brand-black/40 backdrop-blur-sm">
                   <div className="flex justify-between items-start text-brand-white">
                      <span className="text-[10px] font-black tracking-[0.8em] md:tracking-[1em] uppercase">HYD_SEC_0{idx}</span>
                      <Maximize2 size={24} className="md:size-32 opacity-40" />
                   </div>
                   <div className="text-brand-white">
                      <h4 className="text-3xl md:text-5xl lg:text-[6vw] font-display font-black tracking-tighter uppercase leading-none">ATMOS.</h4>
                      <div className="h-[1px] w-16 md:w-24 bg-brand-accent mt-3 md:mt-4" />
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Row 2: Slower & Atmospheric */}
        <div className="relative flex overflow-hidden">
          <div className="animate-marquee-reverse whitespace-nowrap flex gap-6 md:gap-16 lg:gap-24 px-4">
            {[...GALLERY_ROW_2, ...GALLERY_ROW_2].map((img, idx) => (
              <motion.div
                key={`r2-${idx}`}
                whileHover={{ y: -15, scale: 1.02 }}
                onClick={() => setSelectedImage(img + '|' + (idx + 100))}
                className="inline-block w-[70vw] sm:w-[50vw] md:w-[600px] lg:w-[800px] aspect-[16/9] md:aspect-[21/9] rounded-[2rem] md:rounded-[4rem] overflow-hidden group cursor-none relative shadow-2xl"
              >
                <img 
                  src={img} 
                  alt={`Exhibit ${idx}`} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 brightness-50 group-hover:brightness-100" 
                />
                <div className="absolute inset-0 p-6 md:p-12 lg:p-16 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-700 bg-brand-black/40 backdrop-blur-sm">
                   <div className="flex justify-between items-start text-brand-white">
                      <span className="text-[10px] font-black tracking-[0.8em] md:tracking-[1em] uppercase">RAW_DEPOSIT</span>
                      <Maximize2 size={24} className="md:size-32 opacity-40" />
                   </div>
                   <div className="text-brand-white">
                      <h4 className="text-3xl md:text-5xl lg:text-[6vw] font-display font-black tracking-tighter uppercase leading-none">VOID.</h4>
                      <div className="h-[1px] w-16 md:w-24 bg-brand-white/40 mt-3 md:mt-4" />
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-brand-black/98 backdrop-blur-3xl p-4 md:p-20"
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 md:top-12 md:right-12 z-[1010] w-12 h-12 md:w-20 md:h-20 bg-brand-white text-brand-black rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-2xl"
            >
              <X size={20} className="md:w-8 md:h-8" />
            </button>
            
            <motion.div
              layoutId={selectedImage}
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-6xl max-h-[70vh] md:max-h-[85vh] aspect-[4/5] md:aspect-video rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)] border border-brand-white/10"
            >
              <img 
                src={selectedImage.split('|')[0]} 
                alt="Fullscreen View" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
                 <div className="flex items-center gap-3 mb-2 opacity-60">
                    <div className="w-6 h-px bg-brand-accent" />
                    <span className="text-[8px] md:text-[10px] font-black tracking-[0.5em] text-brand-white uppercase">Visual Archive</span>
                 </div>
                 <h3 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tighter text-brand-white">HYD_SEC_0{selectedImage.split('|')[1]}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 100s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 120s linear infinite;
        }
        .animate-marquee:hover, .animate-marquee-reverse:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
