import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { MENU_CATEGORIES } from "../constants";

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0].id);
  const [hoveredItem, setHoveredItem] = useState<{ name: string; image: string } | null>(null);
  const [selectedItem, setSelectedItem] = useState<typeof MENU_CATEGORIES[0]["items"][0] | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleCategoryNav = (e: any) => {
      const { categoryId } = e.detail;
      if (categoryId) {
        setActiveCategory(categoryId);
        const section = document.getElementById("menu");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
    window.addEventListener("navigate-to-menu-category", handleCategoryNav);
    return () => window.removeEventListener("navigate-to-menu-category", handleCategoryNav);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section id="menu" ref={sectionRef} className="section-padding bg-brand-gray relative">
      {/* Floating Hover Image - Shown on desktop/tablet */}
      <AnimatePresence>
        {hoveredItem && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotate: 0,
              x: mousePos.x + 20, 
              y: mousePos.y + 20 
            }}
            exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
            transition={{ 
              type: "spring", 
              damping: 30, 
              stiffness: 300, 
              mass: 0.5,
              x: { type: "spring", damping: 40, stiffness: 400 },
              y: { type: "spring", damping: 40, stiffness: 400 }
            }}
            className="fixed pointer-events-none z-[60] w-48 md:w-64 aspect-[4/5] overflow-hidden rounded-xl shadow-2xl hidden md:block"
            style={{ left: 0, top: 0 }}
          >
            <motion.img 
              key={hoveredItem.image}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={hoveredItem.image} 
              alt={hoveredItem.name} 
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-center mb-16">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-xs font-bold tracking-[0.4em] uppercase text-brand-white/40 mb-4"
        >
          Resto-Cafe Signatures
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-display font-black tracking-tighter mb-12"
        >
          THE MENU
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-6 overflow-x-auto pb-4 max-w-full">
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative px-4 py-2 text-sm lg:text-xs font-bold uppercase tracking-widest transition-all ${
                activeCategory === cat.id ? "text-brand-white" : "text-brand-white/30 hover:text-brand-white/60"
              }`}
            >
              {cat.name}
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-brand-white"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-24 lg:gap-x-12 xl:gap-x-16 gap-y-16 lg:gap-y-10 xl:gap-y-8"
          >
            {MENU_CATEGORIES.find((c) => c.id === activeCategory)?.items.map((item, idx) => (
              <motion.div 
                key={idx} 
                className="group relative cursor-pointer"
                onMouseEnter={() => setHoveredItem({ name: item.name, image: item.image })}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => setSelectedItem(item)}
              >
                <div className="flex justify-between items-baseline mb-3 pb-3 border-b border-brand-white/5 group-hover:border-brand-white/40 transition-all duration-500">
                  <h3 className="text-xl md:text-2xl lg:text-base xl:text-sm font-display font-medium text-brand-white uppercase tracking-tighter group-hover:pl-4 transition-all duration-500">
                    {item.name}
                  </h3>
                  <span className="text-brand-white font-display font-bold text-lg lg:text-sm xl:text-xs">₹{item.price}</span>
                </div>
                <p className="text-sm lg:text-xs font-light text-brand-white/40 leading-relaxed italic group-hover:text-brand-white/70 transition-colors">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
      </div>

      <div className="mt-24 flex flex-col items-center gap-8">
        <motion.div
           whileHover={{ scale: 1.05 }}
           className="relative group"
        >
          <Link 
            to="/menu" 
            className="flex items-center gap-4 px-12 py-6 bg-brand-white text-brand-black rounded-full text-[10px] font-black uppercase tracking-[0.4em] transition-all hover:bg-brand-accent shadow-[0_20px_50px_rgba(255,255,255,0.1)] group-hover:shadow-brand-accent/30"
          >
            Explore Interactive Menu
            <ChevronRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
        
        <p className="text-[10px] text-brand-white/30 uppercase tracking-[0.2em] font-bold">
          High-Definition Textures & Handcrafted Flavors
        </p>
      </div>

      {/* Item Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-black/90 backdrop-blur-xl"
            onClick={() => setSelectedItem(null)}
          >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-brand-gray/50 border border-brand-white/10 p-4 md:p-8 lg:p-6 xl:p-4 rounded-[2rem] max-w-2xl lg:max-w-lg xl:max-w-md w-full relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-6 right-6 z-10 w-8 h-8 md:w-10 md:h-10 bg-brand-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-brand-white hover:bg-brand-white hover:text-brand-black transition-all"
                >
                  <ChevronRight className="rotate-180 w-4 h-4 md:w-5 md:h-5" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-6 xl:gap-4 items-center">
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={selectedItem.image} 
                      alt={selectedItem.name} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="space-y-6 lg:space-y-4">
                    <div>
                      <span className="text-[10px] lg:text-[8px] font-black tracking-[0.5em] uppercase text-brand-accent">Wild Selection</span>
                      <h3 className="text-3xl md:text-4xl lg:text-2xl xl:text-xl font-display font-black text-brand-white uppercase mt-2 tracking-tighter">
                        {selectedItem.name}
                      </h3>
                    </div>
                    <p className="text-brand-white/60 text-base md:text-lg lg:text-sm xl:text-xs italic leading-relaxed">
                      "{selectedItem.description}"
                    </p>
                    <div className="pt-6 lg:pt-4 border-t border-brand-white/10 flex justify-between items-center">
                      <span className="text-[10px] lg:text-[8px] font-black uppercase tracking-[0.3em] text-brand-white/40">Value</span>
                      <span className="text-2xl lg:text-xl xl:text-lg font-display font-bold text-brand-white">₹{selectedItem.price}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
