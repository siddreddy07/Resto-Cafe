import { motion } from "motion/react";
import { Clock, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { Map, Marker } from "pigeon-maps";
import { CAFE_INFO } from "../constants";

export default function LocationSection() {
  return (
    <section id="location" className="section-padding bg-brand-black">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-xs font-bold tracking-[0.4em] uppercase text-brand-white/40 mb-4 block">
            Visit Us
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-black tracking-tighter mb-8 md:mb-12">
            HYDERABAD <br className="hidden md:block" /> 400 036
          </h2>

          <div className="space-y-12">
            <div className="flex gap-6">
              <div className="p-3 bg-brand-white/5 rounded-lg h-fit text-brand-white">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-brand-white/40 mb-2">Location</p>
                <p className="text-lg font-light text-brand-white/80 leading-relaxed max-w-xs">
                  {CAFE_INFO.address}
                </p>
                <a
                  href={CAFE_INFO.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-xs font-bold uppercase tracking-[0.2em] text-brand-white hover:underline group"
                >
                  Get Directions <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="p-3 bg-brand-white/5 rounded-lg h-fit text-brand-white">
                <Clock size={24} />
              </div>
              <div className="w-full">
                <p className="text-xs uppercase tracking-widest text-brand-white/40 mb-2">Hours</p>
                <div className="space-y-2">
                  {CAFE_INFO.hours.map((h, i) => (
                    <div key={i} className="flex justify-between max-w-xs text-brand-white/80 font-light">
                      <span>{h.day}</span>
                      <span>{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="p-3 bg-brand-white/5 rounded-lg h-fit text-brand-white">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-brand-white/40 mb-2">Connect</p>
                <p className="text-lg font-light text-brand-white/80">
                  {CAFE_INFO.phone}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative h-[400px] sm:h-[500px] lg:h-[600px] w-full overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-brand-white/5 border border-brand-white/10"
        >
          <div className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-1000 opacity-80 hover:opacity-100">
            <Map 
              defaultCenter={[CAFE_INFO.coordinates.lat, CAFE_INFO.coordinates.lng]} 
              defaultZoom={16}
              metaWheelZoom={true}
            >
              <Marker 
                width={50} 
                anchor={[CAFE_INFO.coordinates.lat, CAFE_INFO.coordinates.lng]} 
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-brand-accent/40 blur-xl rounded-full scale-150 animate-pulse" />
                  <div className="relative w-12 h-12 bg-brand-black border-2 border-brand-white rounded-full flex items-center justify-center shadow-2xl">
                    <MapPin className="text-brand-white w-6 h-6" />
                  </div>
                  <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-brand-black border border-brand-white/10 px-4 py-2 rounded-lg whitespace-nowrap shadow-2xl backdrop-blur-xl">
                    <p className="text-[10px] font-black uppercase tracking-widest text-brand-white">Wild Goat</p>
                  </div>
                </div>
              </Marker>
            </Map>
          </div>
          
          {/* Stylistic Overlay */}
          <div className="absolute inset-0 border border-brand-white/10 rounded-[3rem] pointer-events-none z-10"></div>
          <div className="absolute inset-0 bg-brand-black/5 pointer-events-none mix-blend-overlay"></div>
          
          {/* Map Interaction Hint */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-6 py-2 bg-brand-black/80 backdrop-blur-3xl border border-brand-white/10 rounded-full z-20 pointer-events-none hidden md:block">
            <p className="text-[8px] font-black uppercase tracking-[0.4em] text-brand-white/40">Scroll to Explore Domain</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

