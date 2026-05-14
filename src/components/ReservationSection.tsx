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
    <section id="reservations" className="relative min-h-screen bg-brand-black border-t border-brand-white/5 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side: Immersive Brand Story */}
        <div className="relative h-[60vh] lg:h-screen overflow-hidden lg:sticky lg:top-0">
          <motion.div
             initial={{ scale: 1.2 }}
             whileInView={{ scale: 1 }}
             transition={{ duration: 30, ease: "linear" }}
             className="h-full w-full"
          >
            <img 
              src="https://images.unsplash.com/photo-1559925393-8be0ec41b5ec?auto=format&fit=crop&q=80&w=2400" 
              alt="The Domain" 
              className="w-full h-full object-cover grayscale brightness-[0.25] contrast-125"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-brand-black/80 to-transparent" />
          
          <div className="absolute inset-0 p-6 md:p-12 lg:p-24 flex flex-col justify-between z-10">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-brand-white/10 flex items-center justify-center backdrop-blur-xl">
                 <ShieldCheck size={20} className="text-brand-accent brightness-150" />
              </div>
              <div className="space-y-1">
                 <span className="text-[10px] font-black tracking-[0.6em] md:tracking-[0.8em] text-brand-white uppercase block">Secure Connection</span>
                 <span className="text-[8px] font-mono text-brand-white/20 uppercase">PROTOCOL: WILD_ACCESS_V4</span>
              </div>
            </div>
            
            <div className="max-w-2xl">
               <span className="text-[10px] md:text-[11px] font-black tracking-[1.2em] md:tracking-[1.5em] text-brand-accent uppercase mb-8 md:mb-12 block opacity-80">Reserved Priority</span>
               <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[8vw] font-display font-black tracking-tighter uppercase leading-[0.7] text-brand-white mb-8 md:mb-16">
                 CLAIM <br /> YOUR <br /> SPACE.
               </h2>
               <div className="grid grid-cols-2 gap-8 md:gap-12 border-t border-brand-white/5 pt-8 md:pt-12">
                  <div className="space-y-2 md:space-y-4">
                     <span className="text-[8px] md:text-[9px] font-black tracking-widest text-brand-white/20 uppercase">Availability</span>
                     <p className="text-lg md:text-xl font-display font-bold text-brand-white/60">LIMITED SEATING</p>
                  </div>
                  <div className="space-y-2 md:space-y-4">
                     <span className="text-[8px] md:text-[9px] font-black tracking-widest text-brand-white/20 uppercase">Location</span>
                     <p className="text-lg md:text-xl font-display font-bold text-brand-white/60">ROAD 45 SITE</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Right Side: High-Precision Concierge Form */}
        <div className="relative bg-[#080808] min-h-[70vh] lg:min-h-screen p-6 md:p-12 lg:p-24 xl:p-32 flex flex-col justify-center border-l border-brand-white/5 shadow-[-50px_0_100px_rgba(0,0,0,0.5)]">
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
              
              <h3 className="text-4xl md:text-5xl lg:text-7xl font-display font-black uppercase tracking-tighter mb-4 md:mb-6 text-brand-white">INITIATED.</h3>
              <p className="text-brand-white/30 text-base md:text-lg font-light italic max-w-sm mx-auto mb-10 md:mb-16 leading-relaxed">
                "The covenant is sealed. Your place in the wild is reserved. Expect a communication shortly."
              </p>
              
              <button 
                onClick={() => setSubmitted(false)}
                className="px-12 md:px-16 py-4 md:py-5 bg-brand-white/5 border border-brand-white/10 rounded-full hover:bg-brand-white hover:text-brand-black transition-all text-[10px] md:text-xs font-black uppercase tracking-[0.5em] text-brand-white/40"
              >
                RETURN TO GRID
              </button>
            </motion.div>
          ) : (
            <div className="max-w-xl mx-auto w-full space-y-12 md:space-y-20">
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-4">
                   <div className="h-[1px] w-8 md:w-12 bg-brand-accent" />
                   <span className="text-[10px] font-black tracking-[0.8em] md:tracking-[1.0em] text-brand-accent uppercase italic">The Invitation</span>
                </div>
                <h3 className="text-4xl md:text-5xl lg:text-7xl font-display font-black tracking-tighter uppercase text-brand-white leading-none">SECURE THE PACK.</h3>
                <p className="text-xs md:text-sm font-mono text-brand-white/20 italic tracking-tight">Venture deep into the sensory archive of Jubilee Hills.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8 md:space-y-12 pt-4 md:pt-8">
                <div className="space-y-8 md:space-y-12">
                  <div className="group space-y-3 md:space-y-4">
                    <label className="text-[8px] md:text-[9px] font-black tracking-[0.6em] md:tracking-[0.8em] text-brand-white/10 uppercase group-focus-within:text-brand-accent transition-colors">IDENTIFICATION / ALIAS</label>
                    <input
                      required
                      type="text"
                      className="w-full bg-transparent border-b border-brand-white/10 py-3 md:py-5 text-xl md:text-4xl font-display font-bold uppercase tracking-tight focus:border-brand-accent outline-none transition-all placeholder:text-brand-white/[0.02]"
                      placeholder="ENTER NAME"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  
                  <div className="group space-y-3 md:space-y-4">
                    <label className="text-[8px] md:text-[9px] font-black tracking-[0.6em] md:tracking-[0.8em] text-brand-white/10 uppercase group-focus-within:text-brand-accent transition-colors">COMMUNICATION FREQUENCY</label>
                    <input
                      required
                      type="email"
                      className="w-full bg-transparent border-b border-brand-white/10 py-3 md:py-5 text-xl md:text-4xl font-display font-bold uppercase tracking-tight focus:border-brand-accent outline-none transition-all placeholder:text-brand-white/[0.02]"
                      placeholder="EMAIL@SOURCE"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-8 md:gap-12">
                     <div className="group space-y-3 md:space-y-4">
                        <label className="text-[8px] md:text-[9px] font-black tracking-[0.6em] md:tracking-[0.8em] text-brand-white/10 uppercase group-focus-within:text-brand-accent transition-colors">CONGREGATION</label>
                        <select
                          className="w-full bg-transparent border-b border-brand-white/10 py-3 md:py-5 text-lg md:text-xl font-bold focus:border-brand-accent outline-none appearance-none cursor-pointer text-brand-white/60"
                          value={formData.guests}
                          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        >
                          {[1, 2, 3, 4, 5, 6].map((n) => (
                            <option key={n} value={n} className="bg-brand-black text-brand-white">{n} {n === 1 ? 'Soul' : 'Souls'}</option>
                          ))}
                        </select>
                     </div>
                     <div className="group space-y-3 md:space-y-4">
                        <label className="text-[8px] md:text-[9px] font-black tracking-[0.6em] md:tracking-[0.8em] text-brand-white/10 uppercase group-focus-within:text-brand-accent transition-colors">ALIGNMENT</label>
                        <input
                          required
                          type="date"
                          className="w-full bg-transparent border-b border-brand-white/10 py-3 md:py-5 text-lg md:text-xl font-bold focus:border-brand-accent outline-none appearance-none text-brand-white/60"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                     </div>
                  </div>
                </div>

                <div className="pt-4 md:pt-8">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    className="w-full py-6 md:py-8 lg:py-10 bg-brand-white text-brand-black font-display font-black text-2xl md:text-3xl lg:text-4xl uppercase tracking-tighter rounded-xl md:rounded-[2rem] relative overflow-hidden group shadow-[0_50px_100px_rgba(255,255,255,0.1)]"
                  >
                    <div className="relative z-10 flex items-center justify-center gap-4 md:gap-6">
                       {isSubmitting ? (
                         <span className="flex items-center gap-4">
                            <div className="w-5 h-5 md:w-6 md:h-6 border-4 border-brand-black border-t-transparent rounded-full animate-spin" />
                            PROCESSING...
                         </span>
                       ) : (
                         <>SEAL THE PACT <span className="text-3xl md:text-5xl">→</span></>
                       )}
                    </div>
                    {!isSubmitting && (
                      <div className="absolute inset-0 bg-brand-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
                    )}
                  </motion.button>
                </div>
              </form>
              
              <div className="pt-10 md:pt-16 flex justify-between items-center opacity-20 hover:opacity-100 transition-opacity">
                 <p className="text-[8px] md:text-[10px] font-black tracking-widest text-brand-white uppercase italic">Wild Goat / Jubilee Hills</p>
                 <div className="h-[1px] flex-grow mx-4 md:mx-8 bg-brand-white/20" />
                 <p className="text-[8px] md:text-[10px] font-mono text-brand-white uppercase">©2024</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
