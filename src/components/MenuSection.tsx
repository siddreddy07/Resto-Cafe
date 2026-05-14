import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { MENU_CATEGORIES } from "../constants";

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0].id);
  const [hoveredItem, setHoveredItem] = useState<{ name: string; image: string } | null>(null);
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

        <div className="flex flex-wrap justify-center gap-4 md:gap-8 overflow-x-auto pb-4 max-w-full">
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative px-4 py-2 text-sm font-bold uppercase tracking-widest transition-all ${
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
          className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16"
        >
          {MENU_CATEGORIES.find((c) => c.id === activeCategory)?.items.map((item, idx) => (
            <motion.div 
              key={idx} 
              className="group relative"
              onMouseEnter={() => setHoveredItem({ name: item.name, image: item.image })}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="flex justify-between items-baseline mb-3 pb-3 border-b border-brand-white/5 group-hover:border-brand-white/40 transition-all duration-500">
                <h3 className="text-xl md:text-2xl font-display font-medium text-brand-white uppercase tracking-tighter group-hover:pl-4 transition-all duration-500">
                  {item.name}
                </h3>
                <span className="text-brand-white font-display font-bold text-lg">₹{item.price}</span>
              </div>
              <p className="text-sm font-light text-brand-white/40 leading-relaxed italic group-hover:text-brand-white/70 transition-colors">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="mt-24 text-center">
        <p className="text-xs text-brand-white/30 uppercase tracking-[0.2em]">
          Prices are exclusive of taxes. All our ingredients are locally sourced.
        </p>
      </div>
    </section>
  );
}
