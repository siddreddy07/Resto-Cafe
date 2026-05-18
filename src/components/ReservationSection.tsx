import { motion } from "motion/react";
import { useState, FormEvent, useEffect } from "react";
import { CAFE_INFO } from "../constants";
import { Calendar, Users, Clock, ShieldCheck } from "lucide-react";

export default function ReservationSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    guests: "2",
    date: "",
    time: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handlePrefill = (e: any) => {
      const { name, guests, date } = e.detail;
      setFormData(prev => ({
        ...prev,
        name: name || prev.name,
        guests: guests?.toString() || prev.guests,
        date: date || prev.date
      }));
      
      const section = document.getElementById("reservations");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    };
    
    window.addEventListener("prefill-reservation", handlePrefill);
    return () => window.removeEventListener("prefill-reservation", handlePrefill);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate high-end processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section id="reservations" className="relative bg-[#050505] border-t border-brand-white/5 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
        {/* Left Side: Immersive Brand Story */}
        <div className="relative h-[50vh] lg:h-auto lg:col-span-5 overflow-hidden lg:sticky lg:top-0">
          <motion.div
             initial={{ scale: 1.1 }}
             whileInView={{ scale: 1 }}
             transition={{ duration: 15, ease: "easeOut" }}
             className="h-full w-full"
          >
            <img 
              src="https://images.unsplash.com/photo-1559925393-8be0ec41b5ec?auto=format&fit=crop&q=80&w=2400" 
              alt="The Domain" 
              className="w-full h-full object-cover grayscale brightness-[0.35] contrast-125"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-brand-black/90 via-brand-black/40 to-transparent" />
          
          <div className="absolute inset-0 p-8 md:p-12 lg:p-16 flex flex-col justify-between z-10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-brand-white/10 flex items-center justify-center backdrop-blur-md bg-brand-white/5">
                 <ShieldCheck size={18} className="text-brand-accent shadow-[0_0_15px_rgba(202,138,4,0.5)]" />
              </div>
              <div className="space-y-0.5">
                 <span className="text-[9px] font-black tracking-[0.4em] text-brand-white uppercase block">Concierge Desk</span>
                 <span className="text-[8px] font-mono text-brand-white/20 uppercase tracking-tighter">AUTHENTIC HOSPITALITY</span>
              </div>
            </div>
            
            <div className="max-w-md">
               <span className="text-[9px] font-black tracking-[0.8em] text-brand-accent uppercase mb-4 block opacity-60">Exclusively Yours</span>
               <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[6vw] font-display font-black tracking-tighter uppercase leading-[0.85] text-brand-white mb-8">
                 CLAIM <br /> YOUR <br /> SPACE.
               </h2>
               <div className="grid grid-cols-2 gap-8 border-t border-brand-white/10 pt-6">
                  <div className="space-y-1">
                     <span className="text-[8px] font-black tracking-widest text-brand-white/30 uppercase">Availability</span>
                     <p className="text-sm font-display font-bold text-brand-white/70">LIMITED SEATING</p>
                  </div>
                  <div className="space-y-1">
                     <span className="text-[8px] font-black tracking-widest text-brand-white/30 uppercase">Destination</span>
                     <p className="text-sm font-display font-bold text-brand-white/70">CONNAUGHT PLACE</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Right Side: High-Precision Concierge Form */}
        <div className="relative lg:col-span-7 bg-[#080808] p-6 md:p-16 lg:p-20 xl:p-24 flex flex-col justify-center border-l border-brand-white/5">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="relative inline-block mb-8 md:mb-12">
                <div className="absolute inset-0 bg-brand-accent/20 blur-[60px] md:blur-[80px] rounded-full animate-pulse" />
                <div className="relative w-24 h-24 md:w-32 md:h-32 bg-brand-white rounded-full flex items-center justify-center transform -rotate-12">
                  <motion.svg 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="w-12 h-12 md:w-16 md:h-16 text-brand-black" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </motion.svg>
                </div>
              </div>
              
              <h3 className="text-4xl md:text-5xl lg:text-7xl font-display font-black uppercase tracking-tighter mb-4 md:mb-6 text-brand-white">CONFIRMED.</h3>
              <p className="text-brand-white/30 text-base md:text-lg font-light italic max-w-sm mx-auto mb-10 md:mb-16 leading-relaxed">
                "The experience is set. Your place in the wild is reserved. Expect a message shortly."
              </p>
              
              <button 
                onClick={() => setSubmitted(false)}
                className="px-12 md:px-16 py-4 md:py-5 bg-brand-white/5 border border-brand-white/10 rounded-full hover:bg-brand-white hover:text-brand-black transition-all text-[10px] md:text-xs font-black uppercase tracking-[0.5em] text-brand-white/40"
              >
                EXPLORE CAFE
              </button>
            </motion.div>
          ) : (
            <div className="max-w-xl mx-auto w-full space-y-6 md:space-y-12">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                   <div className="h-[1px] w-8 bg-brand-accent" />
                   <span className="text-[10px] font-black tracking-[0.8em] text-brand-accent uppercase italic">The Invitation</span>
                </div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-black tracking-tighter uppercase text-brand-white leading-none">BOOK YOUR EXPERIENCE.</h3>
                 <p className="text-[10px] md:text-xs font-mono text-brand-white/20 italic tracking-tight">Experience the sensory legacy of Connaught Place.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 md:space-y-10">
                <div className="space-y-5 md:space-y-10">
                  <div className="group space-y-1">
                    <label className="text-[8px] font-black tracking-[0.5em] text-brand-white/10 uppercase group-focus-within:text-brand-accent transition-colors">GUEST NAME</label>
                    <input
                      required
                      type="text"
                      className="w-full bg-transparent border-b border-brand-white/10 py-1.5 md:py-4 text-base md:text-3xl font-display font-bold uppercase tracking-tight focus:border-brand-accent outline-none transition-all placeholder:text-brand-white/[0.01]"
                      placeholder="ENTER NAME"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  
                  <div className="group space-y-1">
                    <label className="text-[8px] font-black tracking-[0.5em] text-brand-white/10 uppercase group-focus-within:text-brand-accent transition-colors">CONTACT EMAIL</label>
                    <input
                      required
                      type="email"
                      className="w-full bg-transparent border-b border-brand-white/10 py-1.5 md:py-4 text-base md:text-3xl font-display font-bold uppercase tracking-tight focus:border-brand-accent outline-none transition-all placeholder:text-brand-white/[0.01]"
                      placeholder="EMAIL@SOURCE"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6 md:gap-12">
                     <div className="group space-y-1">
                        <label className="text-[8px] font-black tracking-[0.5em] text-brand-white/10 uppercase group-focus-within:text-brand-accent transition-colors">PARTY SIZE</label>
                        <select
                          className="w-full bg-transparent border-b border-brand-white/10 py-1.5 md:py-4 text-xs md:text-lg font-bold focus:border-brand-accent outline-none appearance-none cursor-pointer text-brand-white/60"
                          value={formData.guests}
                          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        >
                          {[1, 2, 3, 4, 5, 6].map((n) => (
                            <option key={n} value={n} className="bg-brand-black text-brand-white">{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                          ))}
                        </select>
                     </div>
                     <div className="group space-y-1">
                        <label className="text-[8px] font-black tracking-[0.5em] text-brand-white/10 uppercase group-focus-within:text-brand-accent transition-colors">DATE</label>
                        <input
                          required
                          type="date"
                          className="w-full bg-transparent border-b border-brand-white/10 py-1.5 md:py-4 text-xs md:text-lg font-bold focus:border-brand-accent outline-none appearance-none text-brand-white/60"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                     </div>
                  </div>
                </div>

                <div className="pt-4">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={isSubmitting}
                    className="w-full py-3 md:py-8 lg:py-10 bg-brand-white text-brand-black font-display font-black text-lg md:text-3xl lg:text-4xl uppercase tracking-tighter rounded-xl relative overflow-hidden group"
                  >
                    <div className="relative z-10 flex items-center justify-center gap-4">
                       {isSubmitting ? (
                         <span className="flex items-center gap-4">
                            <div className="w-5 h-5 border-4 border-brand-black border-t-transparent rounded-full animate-spin" />
                            PROCESSING...
                         </span>
                       ) : (
                         <>REQUEST TABLE <span className="text-2xl md:text-4xl">→</span></>
                       )}
                    </div>
                    {!isSubmitting && (
                      <div className="absolute inset-0 bg-brand-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
                    )}
                  </motion.button>
                </div>
              </form>
              
              <div className="pt-8 md:pt-12 flex justify-between items-center opacity-30">
                  <p className="text-[8px] md:text-[10px] font-black tracking-widest text-brand-white uppercase italic">Resto Cafe / Connaught Place</p>
                 <div className="h-[1px] flex-grow mx-4 md:mx-8 bg-brand-white/20" />
                 <p className="text-[8px] md:text-[10px] font-mono text-brand-white uppercase">©2026</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
