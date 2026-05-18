import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Coffee, ArrowLeft, Utensils, Eye, X, ChefHat } from "lucide-react";
import { MENU_CATEGORIES } from "../constants";

export default function FullMenu() {
  const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0].id);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Initial reveal delay
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const currentCategory = MENU_CATEGORIES.find(cat => cat.id === activeCategory);

  return (
    <div className="min-h-screen bg-[#080808] text-brand-white font-sans selection:bg-brand-accent selection:text-brand-black overflow-x-hidden">
      {/* Cinematic Overlays */}
      <div className="fixed inset-0 pointer-events-none z-[5]">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <motion.div 
          animate={{ 
            opacity: [0.05, 0.1, 0.05],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -right-[10%] w-[80vw] h-[80vw] bg-brand-accent/20 rounded-full blur-[180px]"
        />
        <motion.div 
          animate={{ 
            opacity: [0.03, 0.08, 0.03],
            scale: [1.2, 1, 1.2]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] bg-brand-white/10 rounded-full blur-[150px]"
        />
      </div>

      {/* Minimal Navigation */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 md:py-8 flex justify-between items-center backdrop-blur-md bg-brand-black/20"
      >
        <Link to="/" className="group flex items-center gap-4">
          <div className="w-10 h-10 rounded-full border border-brand-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-brand-white group-hover:text-brand-black">
            <ArrowLeft size={18} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-white/40 group-hover:text-brand-white transition-all">Back to Home</span>
        </Link>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-accent/60" />
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-brand-white/30">/MENU</span>
           </div>
        </div>
      </motion.nav>

      {/* High-Concept Sidebar Navigation */}
      <aside className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-12 px-12">
        <LayoutGroup>
          {MENU_CATEGORIES.map((cat, idx) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`group relative flex items-center gap-6 transition-all duration-700 ${activeCategory === cat.id ? 'opacity-100' : 'opacity-20 hover:opacity-50'}`}
            >
              <span className="text-[10px] font-mono text-brand-accent/60 w-4">0{idx + 1}</span>
              <div className="flex flex-col">
                <span className={`text-xs font-black uppercase tracking-[0.3em] transition-all duration-500 ${activeCategory === cat.id ? 'text-brand-white translate-x-2' : 'text-brand-white/50 group-hover:translate-x-1'}`}>
                  {cat.name}
                </span>
                {activeCategory === cat.id && (
                  <motion.div 
                    layoutId="categoryLine"
                    className="h-[1px] bg-brand-accent mt-1 w-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
            </button>
          ))}
        </LayoutGroup>
      </aside>

      {/* Main Content Area */}
      <main className="pt-28 md:pt-48 pb-32 md:pb-48 px-6 md:px-12 lg:pl-80 lg:pr-12 max-w-[1600px] mx-auto relative z-10">
        
        {/* Mobile Floating Category Bar */}
        <div className="lg:hidden flex overflow-x-auto gap-4 mb-12 pb-6 no-scrollbar -mx-6 px-6 sticky top-24 z-30">
          <AnimatePresence>
            {MENU_CATEGORIES.map((cat) => (
              <motion.button
                key={cat.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap px-6 py-3 rounded-full text-[9px] font-black uppercase tracking-widest border backdrop-blur-md transition-all duration-500 ${activeCategory === cat.id ? 'bg-brand-accent text-brand-black border-brand-accent shadow-[0_15px_30px_rgba(202,138,4,0.3)]' : 'bg-brand-black/40 border-brand-white/5 text-brand-white/40'}`}
              >
                {cat.name}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* Dynamic Section Header */}
        <div className="mb-12 md:mb-16">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-px bg-brand-accent/40" />
                <span className="text-[10px] font-black uppercase tracking-[0.6em] text-brand-accent/60">Discovery Series</span>
              </div>
              <h2 className="text-5xl xs:text-6xl md:text-8xl lg:text-[9rem] font-display font-black uppercase tracking-tighter leading-[0.85] italic">
                {currentCategory?.name.split(' ').map((word, i) => (
                  <span key={i} className={`inline-block ${i % 2 !== 0 ? "text-transparent stroke-text" : "text-brand-white"}`}>
                    {word}&nbsp;
                  </span>
                ))}
              </h2>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Stunning Menu Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 md:gap-x-6 lg:gap-x-12 gap-y-10 md:gap-y-16 lg:gap-y-24">
          <AnimatePresence mode="popLayout">
            {currentCategory?.items.map((item, idx) => (
              <motion.div
                key={item.name}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30, transition: { duration: 0.4 } }}
                transition={{ 
                  delay: idx * 0.05, 
                  duration: 0.6, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className="group relative flex flex-col"
              >
                {/* Hyper-Aesthetic Image Card */}
                <div 
                  onClick={() => setSelectedItem(item)}
                  className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] md:rounded-[2rem] lg:rounded-[3.5rem] bg-brand-white/5 border border-brand-white/5 mb-4 md:mb-6 cursor-pointer shadow-2xl transition-all duration-700"
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover opacity-80 md:opacity-70 group-hover:opacity-100 group-hover:scale-110 group-hover:rotate-1 transition-all duration-1000" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/95 via-brand-black/10 to-transparent transition-opacity duration-700" />
                  
                  {/* Subtle Interactive Ring */}
                  <div className="absolute inset-0 border-[0px] group-hover:border-[1px] border-brand-accent/20 transition-all duration-700 rounded-inherit" />

                  {/* Micro-Interaction Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div 
                      className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-brand-accent/90 text-brand-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100 shadow-[0_0_50px_rgba(202,138,4,0.5)]"
                    >
                      <Eye size={20} className="md:w-6 md:h-6" />
                    </motion.div>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 flex flex-col">
                    <div className="flex items-center gap-2 mb-1 md:mb-2 opacity-50">
                      <ChefHat size={10} className="text-brand-accent md:w-3 md:h-3" />
                      <span className="text-[7px] md:text-[9px] font-black uppercase tracking-[0.3em] text-brand-white">Heritage Dish</span>
                    </div>
                    <span className="text-xl md:text-4xl font-display font-black text-brand-white tracking-widest">₹{item.price}</span>
                  </div>
                </div>

                <div className="space-y-2 md:space-y-4 px-1">
                  <div className="flex flex-col gap-1 md:gap-1.5">
                    <h3 className="text-xs md:text-xl font-black uppercase tracking-tight text-brand-white group-hover:text-brand-accent transition-all duration-500">
                      {item.name}
                    </h3>
                    <div className="h-px w-0 group-hover:w-full bg-brand-accent/30 transition-all duration-700" />
                  </div>
                  <p className="text-[8px] md:text-[10px] text-brand-white/30 md:text-brand-white/40 leading-relaxed font-medium uppercase tracking-[0.1em] line-clamp-2 transition-colors duration-500 italic">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* Immersive Item Detail Portal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] grid place-items-center p-4 md:p-8 bg-brand-black/95 backdrop-blur-[20px]"
          >
            <motion.div 
              initial={{ scale: 0.98, opacity: 0, y: 10 }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } 
              }}
              exit={{ 
                scale: 0.98, 
                opacity: 0, 
                y: 10,
                transition: { duration: 0.3 } 
              }}
              className="relative bg-[#0A0A0A] border border-brand-white/10 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden w-full max-w-[90vw] md:max-w-4xl lg:max-w-3xl max-h-[85vh] md:max-h-[480px] flex flex-col md:flex-row shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
            >
              {/* Close Button UI */}
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-[110] transition-transform hover:scale-110 active:scale-95"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-white/10 backdrop-blur-md flex items-center justify-center text-brand-white border border-brand-white/10 hover:bg-brand-white hover:text-brand-black transition-all">
                  <X size={18} className="md:w-5 md:h-5" />
                </div>
              </button>

              {/* Visual Section */}
              <div className="w-full md:w-[40%] h-48 sm:h-64 md:h-auto overflow-hidden shrink-0 relative">
                <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-brand-black/40 via-transparent to-transparent" />
              </div>

              {/* Content Narrative Section */}
              <div className="flex-grow p-6 md:p-8 lg:p-10 flex flex-col justify-center gap-6 overflow-hidden">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-black uppercase tracking-tighter text-brand-white italic leading-tight">
                      {selectedItem.name}
                    </h2>
                    <p className="text-[10px] md:text-xs text-brand-white/40 leading-relaxed max-w-sm font-medium tracking-wide">
                      {selectedItem.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {[
                      { icon: ChefHat, text: "Signature" },
                      { icon: Coffee, text: "Rare Origin" }
                    ].map((badge, bIdx) => (
                      <div 
                        key={bIdx} 
                        className="px-3 py-1.5 bg-brand-white/5 border border-brand-white/10 rounded-full flex items-center gap-2"
                      >
                        <badge.icon size={10} className="text-brand-accent/60" />
                        <span className="text-[7px] md:text-[8px] font-black uppercase tracking-widest">{badge.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-brand-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                    <span className="text-3xl md:text-5xl font-display font-black text-brand-white tracking-widest leading-none">₹{selectedItem.price}</span>
                  </div>
                  <button 
                    onClick={() => {
                        setSelectedItem(null);
                        const resSection = document.getElementById('reservations');
                        if (resSection) {
                          resSection.scrollIntoView({ behavior: 'smooth' });
                        } else {
                           window.location.href = "/#reservations";
                        }
                    }}
                    className="w-full sm:w-auto px-8 py-3 bg-brand-accent text-brand-black rounded-full text-[9px] font-black uppercase tracking-[0.4em] transition-all hover:bg-brand-white shadow-lg active:scale-95 whitespace-nowrap"
                  >
                    Secure Experience
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.2);
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
        .perspective-2000 {
          perspective: 2000px;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(202, 138, 4, 0.2);
          border-radius: 10px;
        }
        .rounded-inherit {
          border-radius: inherit;
        }
      `}</style>
    </div>
  );
}
