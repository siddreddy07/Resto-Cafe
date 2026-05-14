import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Coffee, Utensils, Pizza, GlassWater, Cookie, ChefHat, Sparkles, Heart } from "lucide-react";

const LOADING_MESSAGES = [
  "Awakening the Herd",
  "Taming the Roast",
  "Pouring Inspiration",
  "Grinding for Character",
  "Steeping in Stillness",
  "Plating the Soul",
  "Savouring the Wait"
];

const LOADING_ICONS = [
  Coffee,
  ChefHat,
  Sparkles,
  Utensils,
  Cookie,
  Heart
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);
  const [msgIndex, setMsgIndex] = useState(0);
  const [iconIndex, setIconIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          // Smoother sequence: shorter wait before fade, then complete
          setTimeout(() => {
            setShow(false);
            // Wait for the exit duration to complete before calling onComplete
            setTimeout(onComplete, 1200);
          }, 400);
          return 100;
        }
        
        const diff = Math.random() * 6; // Slower, more "brewed" pace
        const next = Math.min(oldProgress + diff, 100);
        
        const nextMsg = Math.floor((next / 100) * LOADING_MESSAGES.length);
        if (nextMsg < LOADING_MESSAGES.length) setMsgIndex(nextMsg);
        
        const nextIcon = Math.floor((next / 100) * LOADING_ICONS.length);
        if (nextIcon < LOADING_ICONS.length) setIconIndex(nextIcon);
        
        return next;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onComplete]);

  const CurrentIcon = LOADING_ICONS[iconIndex];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.05,
            filter: "blur(20px)",
            transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } 
          }}
          className="fixed inset-0 z-[100] bg-[#0A0908] flex flex-col items-center justify-center p-6 overflow-hidden"
        >
          {/* Subtle Texture */}
          <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
          
          {/* Central Experience */}
          <div className="relative flex flex-col items-center max-w-sm w-full gap-24">
            {/* The "Vessel" */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              {/* Coffee Stream / Steam */}
              <div className="absolute top-[-100px] w-[1px] h-20 bg-gradient-to-b from-transparent via-brand-accent/20 to-brand-accent/40" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={iconIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.6 }}
                  className="text-brand-accent"
                >
                  <CurrentIcon size={40} strokeWidth={1.5} />
                </motion.div>
              </AnimatePresence>

              {/* Liquid Level Indicator (Creative Progress) */}
              <div className="absolute bottom-0 w-16 h-[2px] bg-brand-white/10 overflow-hidden">
                <motion.div 
                  className="h-full bg-brand-accent shadow-[0_0_10px_#FFFF00]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Rising Aroma Particles */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 0, opacity: 0 }}
                  animate={{ 
                    y: -120, 
                    opacity: [0, 0.4, 0],
                    x: (i - 1.5) * 20
                  }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity, 
                    delay: i * 0.5,
                    ease: "easeOut"
                  }}
                  className="absolute bottom-4"
                >
                  <Sparkles size={8} className="text-brand-accent/30" />
                </motion.div>
              ))}
            </div>

            {/* Poetic Branding */}
            <div className="text-center space-y-4">
              <div className="overflow-hidden">
                <motion.h1 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-5xl font-display font-medium uppercase tracking-widest text-[#E8DCC4] leading-tight"
                >
                  Wild Goat
                </motion.h1>
              </div>
              
              <div className="h-4">
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={msgIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-[9px] font-black uppercase tracking-[0.6em] text-brand-accent/40 italic"
                  >
                    {LOADING_MESSAGES[msgIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Aesthetic Footer */}
          <div className="absolute bottom-16 left-0 right-0 flex flex-col items-center gap-6">
             <div className="h-12 w-px bg-gradient-to-b from-brand-white/20 to-transparent" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-white/10">Slow Living in Hyderabad</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

  );
}

