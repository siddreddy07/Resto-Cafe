import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [show, setShow] = useState(true);
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smoother progress bar simulation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        // Slow down at the end for "preparation" feel
        const step = prev > 80 ? 0.2 : 0.8;
        return Math.min(prev + step, 100);
      });
    }, 30);

    // Phase Timeline synchronized with approximate progress
    const t1 = setTimeout(() => setPhase(1), 800);  
    const t2 = setTimeout(() => setPhase(2), 1400); 
    const t3 = setTimeout(() => setPhase(3), 2200); 
    const t4 = setTimeout(() => {
      setPhase(4); 
      setTimeout(() => {
        setShow(false);
        setTimeout(onComplete, 1000);
      }, 800);
    }, 4800);

    return () => {
      clearInterval(interval);
      [t1, t2, t3, t4].forEach(clearTimeout);
    };
  }, [onComplete]);

  const welcomeText = "Crafting your experience...";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[300] bg-brand-black flex flex-col items-center justify-center overflow-hidden"
          exit={{ 
            opacity: 0, 
            scale: 1.05,
            filter: "blur(10px)",
            transition: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] } 
          }}
        >
          {/* Sophisticated Parallax Background */}
          <motion.div 
            style={{ 
              scale: 1.1,
              x: (progress - 50) * 0.2, // Subtle horizontal drift
              y: (progress - 50) * 0.1  // Subtle vertical drift
            }}
            className="absolute inset-0 z-0 opacity-20 pointer-events-none"
          >
            <img 
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=2000" 
              alt="Cafe Texture"
              className="w-full h-full object-cover grayscale brightness-50 contrast-125"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Cinematic Light Leak */}
          <motion.div 
            animate={{ 
              x: ["-100%", "100%"],
              opacity: [0, 0.15, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 bottom-0 w-[60vw] bg-gradient-to-r from-transparent via-brand-accent/5 to-transparent skew-x-12 blur-[120px] pointer-events-none z-10"
          />

          {/* Top Shutter */}
          <motion.div 
            initial={{ y: 0 }}
            animate={{ y: phase === 4 ? "-100%" : 0 }}
            transition={{ duration: 1.2, ease: [0.85, 0, 0.15, 1] }}
            className="absolute top-0 left-0 right-0 h-1/2 bg-[#050505] z-[310] border-b border-brand-white/5"
          />
          
          {/* Bottom Shutter */}
          <motion.div 
            initial={{ y: 0 }}
            animate={{ y: phase === 4 ? "100%" : 0 }}
            transition={{ duration: 1.2, ease: [0.85, 0, 0.15, 1] }}
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#050505] z-[310] border-t border-brand-white/5"
          />

          <div className="relative z-[320] flex flex-col items-center">
            {/* The Brand Reveal */}
            <div className="overflow-hidden flex items-center justify-center">
              <AnimatePresence>
                {phase >= 1 && (
                  <motion.div
                    initial={{ y: "100%", rotateX: -90, opacity: 0 }}
                    animate={{ y: 0, rotateX: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="text-4xl md:text-7xl font-display font-black tracking-tighter text-brand-white uppercase">Resto Cafe</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cursive Handwriting Effect */}
            <div className="mt-12 h-16 md:h-24 flex items-center">
              <div className="flex">
                {welcomeText.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, filter: "blur(5px)" }}
                    animate={phase >= 3 ? { opacity: 0.8, filter: "blur(0px)" } : {}}
                    transition={{ 
                      duration: 0.5, 
                      delay: phase >= 3 ? (i * 0.08) : 0,
                      ease: "easeOut"
                    }}
                    className="font-cursive text-3xl md:text-5xl text-brand-accent tracking-normal italic"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Minimal Progress Bar */}
            <div className="mt-12 w-48 md:w-64 h-[1px] bg-brand-white/10 relative overflow-hidden">
               <motion.div 
                 style={{ scaleX: progress / 100 }}
                 className="absolute inset-0 bg-brand-accent origin-left"
               />
            </div>
          </div>

            {/* Footer Metadata */}
            <div className="absolute bottom-12 z-[320] flex flex-col items-center gap-3">
              <div className="flex items-center gap-4">
                <div className="w-8 h-[1px] bg-brand-accent/30" />
                <span className="text-[10px] font-black tracking-[0.5em] text-brand-white/40 uppercase">
                  {Math.round(progress)}%
                </span>
                <div className="w-8 h-[1px] bg-brand-accent/30" />
              </div>
              <span className="text-[9px] font-black tracking-[0.8em] text-brand-white/20 uppercase">
                HYDERABAD • ESTD 2024
              </span>
            </div>

          {/* High-End Texture Overlay */}
          <div className="absolute inset-0 z-[330] opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
