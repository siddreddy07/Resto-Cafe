import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Coffee, ArrowLeft, ArrowRight, Utensils, Sparkles, ChevronRight, Info, Eye, X } from "lucide-react";
import { MENU_CATEGORIES } from "../constants";

export default function FullMenu() {
  const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0].id);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const currentCategory = MENU_CATEGORIES.find(cat => cat.id === activeCategory);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-brand-white font-sans selection:bg-brand-accent selection:text-brand-black">
      {/* Background Ambience */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0" />
      <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-accent/5 blur-[120px] rounded-full z-0 pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-white/5 blur-[100px] rounded-full z-0 pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 md:py-8 flex justify-between items-center bg-gradient-to-b from-brand-black/90 to-transparent backdrop-blur-md border-b border-brand-white/5">
        <Link to="/" className="group flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-brand-white/10 flex items-center justify-center group-hover:bg-brand-white group-hover:text-brand-black transition-all">
            <ArrowLeft size={18} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-white/40 group-hover:text-brand-white transition-all hidden sm:block">Explore Tribe</span>
        </Link>
        <div className="flex items-center gap-4">
           <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent italic">Spring Collection / ‘24</span>
           <div className="w-8 h-px bg-brand-white/20 hidden md:block" />
        </div>
      </nav>

      {/* Category Sidebar/Tabs (PC/Tablet) */}
      <aside className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-8 px-12">
        {MENU_CATEGORIES.map((cat, idx) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`group relative flex items-center gap-4 text-left transition-all ${activeCategory === cat.id ? 'opacity-100 scale-110' : 'opacity-30 hover:opacity-60'}`}
          >
            <span className="text-[10px] font-mono text-brand-accent">0{idx + 1}</span>
            <span className={`text-xs font-black uppercase tracking-[0.2em] transition-all ${activeCategory === cat.id ? 'text-brand-white' : 'text-brand-white/50'}`}>
              {cat.name}
            </span>
            {activeCategory === cat.id && (
              <motion.div layoutId="activeTab" className="absolute -left-4 w-1 h-1 bg-brand-accent rounded-full" />
            )}
          </button>
        ))}
      </aside>

      {/* Main Content Area */}
      <main className="pt-28 md:pt-40 pb-32 md:pb-40 px-4 md:px-8 lg:pl-64 lg:pr-12 max-w-7xl mx-auto relative z-10">
        
        {/* Mobile Category Scroll */}
        <div className="lg:hidden flex overflow-x-auto gap-3 mb-10 pb-4 no-scrollbar -mx-4 px-4">
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-2xl text-[9px] font-black uppercase tracking-widest border transition-all ${activeCategory === cat.id ? 'bg-brand-accent text-brand-black border-brand-accent shadow-[0_10px_20px_rgba(255,255,0,0.1)]' : 'border-brand-white/5 text-brand-white/30'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Category Header */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 md:mb-20 px-2"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-[1px] bg-brand-accent/40" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-brand-accent/60">House Specialties</span>
          </div>
          <h2 className="text-4xl md:text-7xl lg:text-8xl font-display font-black uppercase tracking-tighter leading-none">
            {currentCategory?.name.split(' ').map((word, i) => (
              <span key={i} className={i % 2 !== 0 ? "text-transparent stroke-text" : "text-[#F5F5F5]"}>{word} </span>
            ))}
          </h2>
        </motion.div>

        {/* Menu Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 md:gap-x-12 gap-y-8 md:gap-y-20">
          <AnimatePresence mode="wait">
            {currentCategory?.items.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ delay: idx * 0.05 }}
                className="group relative flex flex-col"
              >
                {/* Optimized Image Card */}
                <div 
                  onClick={() => setSelectedItem(item)}
                  className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-brand-white/5 border border-brand-white/5 mb-4 md:mb-6 cursor-pointer group-hover:rounded-2xl transition-all duration-700"
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover opacity-80 md:opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent transition-opacity duration-500" />
                  
                  {/* Hover Info Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px] hidden md:flex">
                    <div className="w-14 h-14 rounded-full bg-brand-accent text-brand-black flex items-center justify-center shadow-[0_0_30px_rgba(255,255,0,0.4)] scale-75 group-hover:scale-100 transition-transform">
                      <Eye size={20} />
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 flex flex-col">
                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-brand-white/40 mb-0.5 md:mb-1">Curation</span>
                    <span className="text-xl md:text-3xl font-display font-black text-brand-white">₹{item.price}</span>
                  </div>
                </div>

                <div className="space-y-1.5 md:space-y-3 px-1 md:px-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm md:text-2xl font-black uppercase tracking-tight group-hover:text-brand-accent transition-colors line-clamp-1">{item.name}</h3>
                  </div>
                  <p className="text-[9px] md:text-[11px] text-brand-white/30 md:text-brand-white/40 leading-relax max-w-[95%] font-medium uppercase tracking-widest leading-relaxed line-clamp-2">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* Item Detail Popover */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-12 bg-brand-black/95 backdrop-blur-2xl"
          >
            <motion.div 
              initial={{ scale: 0.92, opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                y: 0, 
                filter: "blur(0px)",
                transition: { 
                  duration: 0.8, 
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.1 
                } 
              }}
              exit={{ 
                scale: 0.95, 
                opacity: 0, 
                y: 30, 
                filter: "blur(10px)",
                transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
              }}
              className="relative bg-[#0F0F0F] border border-brand-white/5 md:border-brand-white/10 rounded-[1.5rem] md:rounded-[4rem] overflow-hidden w-full max-w-[90vw] sm:max-w-xl md:max-w-4xl max-h-[85vh] flex flex-col md:flex-row shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-3 right-3 md:top-8 md:right-8 z-30 w-9 h-9 md:w-14 md:h-14 rounded-full bg-brand-white text-brand-black flex items-center justify-center border border-brand-black/10 hover:scale-110 active:scale-95 transition-all shadow-xl"
              >
                <X size={18} className="md:w-6 md:h-6" />
              </button>

              <motion.div 
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }}
                className="w-full md:w-[45%] h-48 sm:h-64 md:h-auto overflow-hidden shrink-0 relative"
              >
                <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-brand-black/80 to-transparent" />
              </motion.div>

              <div className="flex-grow p-6 md:p-14 lg:p-16 flex flex-col justify-between overflow-y-auto">
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
                  className="space-y-4 md:space-y-10"
                >
                  <div className="space-y-2 md:space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-6 md:w-8 h-px bg-brand-accent/40" />
                      <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent">Information</span>
                    </div>
                    <h2 className="text-2xl sm:text-4xl lg:text-6xl font-display font-black uppercase tracking-tighter text-brand-white leading-tight md:leading-[0.9]">{selectedItem.name}</h2>
                    <p className="text-[11px] md:text-base text-brand-white/40 leading-relaxed max-w-md font-medium tracking-wide">{selectedItem.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {[
                      { icon: Coffee, text: "Handcrafted" },
                      { icon: Utensils, text: "A-Grade" }
                    ].map((badge, bIdx) => (
                      <div key={bIdx} className="px-3 py-1.5 md:px-5 md:py-3 bg-brand-white/5 border border-brand-white/5 rounded-xl md:rounded-2xl flex items-center gap-2 md:gap-3">
                        <badge.icon size={10} className="md:w-[14px] md:h-[14px] text-brand-accent/60" />
                        <span className="text-[7px] md:text-[10px] font-black uppercase tracking-widest">{badge.text}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
                  className="mt-8 md:mt-14 pt-6 md:pt-10 border-t border-brand-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 md:gap-8"
                >
                  <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-brand-white/20 mb-1 md:mb-2">Heritage Selection</span>
                    <span className="text-3xl md:text-6xl font-display font-black text-brand-white tracking-widest leading-none">₹{selectedItem.price}</span>
                  </div>
                  <button 
                    onClick={() => {
                        setSelectedItem(null);
                        const resSection = document.getElementById('reservations');
                        if (resSection) {
                          resSection.scrollIntoView({ behavior: 'smooth' });
                        } else {
                          window.location.hash = "#reservations";
                        }
                    }}
                    className="w-full sm:w-auto px-10 py-5 md:px-12 md:py-6 bg-brand-accent text-brand-black rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-[0.5em] hover:bg-brand-white transition-all shadow-xl"
                  >
                    Reserve Table
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.3);
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
