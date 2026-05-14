import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Coffee, ArrowLeft, ArrowRight, Utensils, Sparkles, ChevronRight, Info, Eye } from "lucide-react";
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
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-8 flex justify-between items-center mix-blend-difference">
        <Link to="/" className="group flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-brand-white/20 flex items-center justify-center group-hover:bg-brand-white group-hover:text-brand-black transition-all">
            <ArrowLeft size={18} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-0 group-hover:opacity-100 transition-opacity">Back to Tribe</span>
        </Link>
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-display font-black uppercase tracking-tighter mix-blend-difference">Wild Goat Menu</h1>
        </div>
        <div className="flex items-center gap-4">
           {/* Decorative */}
           <div className="w-8 h-px bg-brand-white/20 hidden md:block" />
           <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent italic">Spring / Summer ‘24</span>
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
      <main className="pt-32 pb-40 px-6 lg:pl-64 lg:pr-20 max-w-7xl mx-auto relative z-10">
        
        {/* Mobile Category Scroll */}
        <div className="lg:hidden flex overflow-x-auto gap-4 mb-12 pb-4 no-scrollbar">
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${activeCategory === cat.id ? 'bg-brand-white text-brand-black border-brand-white' : 'border-brand-white/10 text-brand-white/40'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Category Header */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-brand-accent" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-accent">Explore Selection</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-display font-black uppercase tracking-tighter leading-none mb-8">
            {currentCategory?.name.split(' ').map((word, i) => (
              <span key={i} className={i % 2 !== 0 ? "text-transparent stroke-text" : ""}>{word} </span>
            ))}
          </h2>
        </motion.div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12 md:gap-y-20">
          <AnimatePresence mode="wait">
            {currentCategory?.items.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative"
              >
                {/* Image Reveal on PC / Main display for Mobile */}
                <div 
                  onClick={() => setSelectedItem(item)}
                  className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-brand-white/5 border border-brand-white/10 mb-6 cursor-pointer"
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/20 to-transparent transition-opacity duration-500" />
                  
                  {/* Hover Info Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px]">
                    <div className="w-16 h-16 rounded-full bg-brand-accent text-brand-black flex items-center justify-center shadow-[0_0_30px_rgba(255,255,0,0.4)] scale-75 group-hover:scale-100 transition-transform">
                      <Eye size={24} />
                    </div>
                  </div>
                  
                  <div className="absolute bottom-6 left-6">
                    <span className="text-[40px] font-display font-black text-brand-white">₹{item.price}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-black uppercase tracking-tight group-hover:text-brand-accent transition-colors">{item.name}</h3>
                  </div>
                  <p className="text-xs text-brand-white/40 leading-relaxed max-w-[90%] font-medium uppercase tracking-wider">{item.description}</p>
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
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-brand-black/90 backdrop-blur-3xl"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative bg-[#111] border border-brand-white/10 rounded-[3rem] overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row shadow-[0_50px_100px_rgba(0,0,0,0.5)]"
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-brand-white text-brand-black flex items-center justify-center border border-brand-black/10 hover:scale-110 transition-transform"
              >
                <ChevronRight size={24} className="rotate-45 md:rotate-0" />
              </button>

              <div className="w-full md:w-1/2 aspect-video md:aspect-square overflow-hidden shrink-0">
                <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex-grow p-10 md:p-14 flex flex-col justify-between overflow-y-auto">
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles size={14} className="text-brand-accent" />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-accent">Exquisite Quality</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter text-brand-white mb-4">{selectedItem.name}</h2>
                    <p className="text-sm text-brand-white/50 leading-relaxed max-w-md font-medium">{selectedItem.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <div className="px-4 py-2 bg-brand-white/5 border border-brand-white/10 rounded-xl flex items-center gap-3">
                      <Coffee size={16} className="text-brand-accent/60" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Handcrafted</span>
                    </div>
                    <div className="px-4 py-2 bg-brand-white/5 border border-brand-white/10 rounded-xl flex items-center gap-3">
                      <Utensils size={16} className="text-brand-accent/60" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Global Sourcing</span>
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-white/30 mb-2">Price Value</span>
                    <span className="text-5xl font-display font-black text-brand-white tracking-widest">₹{selectedItem.price}</span>
                  </div>
                  <button 
                    onClick={() => {
                        setSelectedItem(null);
                        window.location.hash = "#reservations";
                    }}
                    className="px-10 py-5 bg-brand-accent text-brand-black rounded-full text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-transform"
                  >
                    Reserve Table
                  </button>
                </div>
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
