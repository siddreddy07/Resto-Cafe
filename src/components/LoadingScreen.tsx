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
          setTimeout(() => {
            setShow(false);
            setTimeout(onComplete, 1000);
          }, 800);
          return 100;
        }
        
        const diff = Math.random() * 8;
        const next = Math.min(oldProgress + diff, 100);
        
        const nextMsg = Math.floor((next / 100) * LOADING_MESSAGES.length);
        if (nextMsg < LOADING_MESSAGES.length) setMsgIndex(nextMsg);
        
        const nextIcon = Math.floor((next / 100) * LOADING_ICONS.length);
        if (nextIcon < LOADING_ICONS.length) setIconIndex(nextIcon);
        
        return next;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onComplete]);

  const CurrentIcon = LOADING_ICONS[iconIndex];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            clipPath: "circle(0% at 50% 50%)",
            transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[100] bg-[#0C0B0A] flex flex-col items-center justify-center p-6 overflow-hidden"
        >
          {/* Warm Ambient Glows */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
          
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-full bg-[#3D2B1F]/20 blur-[120px] rounded-full pointer-events-none"
          />

          <div className="relative flex flex-col items-center max-w-sm w-full gap-16">
            {/* The "Aroma" Experience */}
            <div className="relative w-40 h-40 flex items-center justify-center">
              {/* Rising Aroma Particles (Steam) */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 20, opacity: 0, scale: 0.5 }}
                  animate={{ 
                    y: -100 - (Math.random() * 40), 
                    opacity: [0, 1, 0],
                    x: (Math.random() * 60) - 30,
                    rotate: (Math.random() * 360)
                  }}
                  transition={{ 
                    duration: 3 + Math.random(), 
                    repeat: Infinity, 
                    delay: i * 0.6,
                    ease: "easeOut"
                  }}
                  className="absolute text-brand-accent/40"
                >
                  {i % 2 === 0 ? <Heart size={12} className="fill-current" /> : <Sparkles size={14} />}
                </motion.div>
              ))}

              {/* Central Iconic Vessel */}
              <motion.div
                animate={{ 
                  y: [0, -8, 0],
                  rotate: [-1, 1, -1]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-28 h-28 flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-brand-accent/5 rounded-full blur-2xl" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={iconIndex}
                    initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 1.5, opacity: 0, rotate: 20 }}
                    transition={{ type: "spring", damping: 15 }}
                    className="relative z-10 bg-brand-white/5 p-8 rounded-[2.5rem] border border-brand-white/10 backdrop-blur-sm"
                  >
                    <CurrentIcon size={48} className="text-brand-accent" />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Poetic Branding */}
            <div className="text-center space-y-6">
              <div className="overflow-hidden">
                <motion.h1 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="text-6xl md:text-7xl font-display font-black uppercase tracking-tighter text-brand-white leading-[0.8]"
                >
                  Wild<br />Goat
                </motion.h1>
              </div>
              
              <div className="h-4 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={msgIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-accent/60 italic"
                  >
                    {LOADING_MESSAGES[msgIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* Stylized Progress (Non-Numeric) */}
            <div className="w-24 h-1 bg-brand-white/5 rounded-full overflow-hidden relative">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-accent to-transparent"
                animate={{ 
                  x: ["-100%", "100%"]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut"
                }}
              />
            </div>
          </div>

          {/* Location Marks */}
          <div className="absolute top-12 left-12 md:top-16 md:left-16 flex items-center gap-4">
             <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-white/20">Setting the table</span>
          </div>

          <div className="absolute bottom-12 right-12 md:bottom-16 md:right-16 text-right">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-white/10 italic">Slow living • Fresh brewing</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

