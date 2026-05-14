import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, Command } from "lucide-react";
import Groq from "groq-sdk";
import { MENU_CATEGORIES } from "../constants";

const SUGGESTIONS = [
  "Looking for a spicy brunch",
  "Something cold and caffeinated",
  "A caffeine-free infusion",
  "Light bite for the afternoon",
  "Adventurous coffee choice",
  "Bold breakfast pairing"
];

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [suggestionIndex, setSuggestionIndex] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSuggestionClick = (suggestion: string) => {
    triggerSearch(suggestion);
  };

  const cycleSuggestions = () => {
    const nextIndex = (suggestionIndex + 1) % SUGGESTIONS.length;
    setSuggestionIndex(nextIndex);
    setQuery(SUGGESTIONS[nextIndex]);
  };

  const triggerSearch = async (val: string) => {
    if (!val.trim() || loading) return;
    
    // Add user message
    const userMsg = { role: 'user' as const, content: val };
    setMessages(prev => [...prev, userMsg]);
    setQuery("");
    setLoading(true);

    try {
      const apiKey = process.env.GROQ_API_KEY;
      if (!apiKey) throw new Error("API Key missing");

      const groq = new Groq({ apiKey, dangerouslyAllowBrowser: true });
      
      const menuContext = JSON.stringify(MENU_CATEGORIES);
      const systemInstruction = `
        You are "Wild Scout", the AI concierge for "Wild Goat", a minimalist resto-cafe in Hyderabad.
        Recommend something to eat or drink based on this context. Be stylish, minimalist, and concise.
        Focus on the vibe of the resto-cafe: global cuisine, specialty coffee, and raw design.
        Menu Categories provided as context: ${menuContext}
        
        RESERVATIONS:
        If a user mentions wanting to book or reserve a table:
        1. Extract their name, guest count, and date if provided.
        2. At the VERY END of your response, include the reservation data in this EXACT format:
           [[RESERVATION:{"name":"Value","guests":"Value","date":"YYYY-MM-DD"}]]
        3. Even if they don't provide all details, include the tag with what you found.
        4. Make sure to tell them that you've initiated the pre-fill process.

        NAVIGATION:
        Whenever you recommend a specific dish or drink, you MUST include a clickable reference to its category at the end of your response using this EXACT format: [Explore {CategoryName}](#{category-id}).
        Example: "I recommend the Wild Cortado. [Explore Specialty Coffee](#specialty-coffee)"
      `;

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: systemInstruction },
          { role: "user", content: val }
        ],
        model: "openai/gpt-oss-120b",
        temperature: 1,
        max_completion_tokens: 8192,
        top_p: 1,
        stop: null
      });

      let text = chatCompletion.choices[0]?.message?.content || "";
      
      if (!text) throw new Error("Empty response");

      // Handle Reservation Event
      const reservationMatch = text.match(/\[\[RESERVATION:(\{.*?\})\]\]/);
      if (reservationMatch) {
        try {
          const data = JSON.parse(reservationMatch[1]);
          window.dispatchEvent(new CustomEvent("prefill-reservation", { detail: data }));
          // Clean up the text for the user
          text = text.replace(/\[\[RESERVATION:\{.*?\}\]\]/, "").trim();
        } catch (e) {
          console.error("Failed to parse reservation data", e);
        }
      }

      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    } catch (error: any) {
      console.error("Groq API Error details:", error);
      let errorMsg = "The connection to the archive is unstable. Please try again soon.";
      
      if (error?.status === 401) {
        errorMsg = "Archive access denied. Check your API key.";
      } else if (error?.status === 429) {
        errorMsg = "The scout is overworked. Rest for a moment.";
      }
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: errorMsg 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const renderMessageContent = (content: string) => {
    const parts = content.split(/(\[.*?\]\(#.*?\))/g);
    return parts.map((part, i) => {
      const match = part.match(/\[(.*?)\]\(#(.*?)\)/);
      if (match) {
        const [, label, id] = match;
        return (
          <button
            key={i}
            onClick={() => {
              window.dispatchEvent(new CustomEvent("navigate-to-menu-category", { 
                detail: { categoryId: id } 
              }));
              // Close AI scout to let user see the menu? 
              // User might want it closed to see the selection.
              // setIsOpen(false); 
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 my-2 bg-brand-accent text-brand-black text-[10px] font-black uppercase tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg"
          >
            {label}
            <Command size={10} />
          </button>
        );
      }
      return part;
    });
  };

  const askWildScout = () => triggerSearch(query);

  return (
    <>
      <motion.button
        whileHover={{ 
          scale: 1.05, 
          boxShadow: "0 0 40px rgba(255, 255, 255, 0.15)",
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[70] h-16 pl-6 pr-8 bg-brand-black text-brand-white rounded-full shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex items-center gap-4 group border border-brand-white/10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
        <div className="relative w-10 h-10 bg-brand-white rounded-full flex items-center justify-center transition-transform group-hover:rotate-12 group-hover:scale-110">
          <Sparkles size={20} className="text-brand-black" />
          <div className="absolute -inset-1 bg-brand-accent/20 rounded-full blur-md animate-pulse" />
        </div>
        <div className="flex flex-col items-start leading-none shrink-0 hidden md:flex">
          <span className="text-[8px] font-black uppercase tracking-[0.3em] text-brand-accent mb-1 group-hover:translate-x-1 transition-transform">Live Archive</span>
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-white">Consult Scout</span>
        </div>
        <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-ping hidden md:block" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-8 z-[70] w-[350px] md:w-[400px] bg-brand-black/95 backdrop-blur-3xl border border-brand-white/10 rounded-3xl overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,1)] flex flex-col h-auto max-h-[80vh]"
          >
            <div className="p-6 border-b border-brand-white/10 flex justify-between items-center bg-brand-black/40 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-white flex items-center justify-center">
                  <Command size={16} className="text-brand-black" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-brand-white">Wild Scout</h4>
                  <p className="text-[10px] text-brand-white/40 uppercase tracking-widest">AI Concierge</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-brand-white/40 hover:text-brand-white p-2">
                <X size={20} />
              </button>
            </div>

            <div 
              ref={scrollRef}
              className="flex-grow overflow-y-auto p-6 space-y-4 custom-scrollbar bg-brand-black/20 min-h-[100px]"
            >
              {messages.length === 0 && !loading && (
                <div className="flex flex-col justify-center items-center text-center opacity-40 py-12">
                   <Sparkles size={24} className="mb-4" />
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] italic">
                     "The archive is ready. <br /> What is the craving?"
                   </p>
                </div>
              )}
              
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`p-4 rounded-2xl text-sm max-w-[85%] break-words whitespace-pre-wrap ${
                    msg.role === 'user' 
                       ? 'bg-brand-accent text-brand-black font-semibold' 
                       : 'bg-brand-white/5 text-brand-white/80 border border-brand-white/10 font-light'
                  } leading-relaxed`}>
                    {msg.role === 'assistant' ? renderMessageContent(msg.content) : msg.content}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <div className="flex flex-col gap-2 p-4 justify-start">
                  <p className="text-[10px] font-black uppercase tracking-widest text-brand-white/20 animate-pulse">Scout is analyzing archives...</p>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-brand-white/20 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-brand-white/20 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-2 h-2 bg-brand-white/20 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 bg-brand-black/40 border-t border-brand-white/5 space-y-4 shrink-0">
              {/* Type Note / Instruction */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 px-2 py-2 bg-brand-accent/5 border border-brand-accent/10 rounded-lg"
              >
                <div className="w-1 h-1 bg-brand-accent rounded-full animate-pulse" />
                <p className="text-[8px] font-bold uppercase tracking-widest text-brand-accent/80">
                  Quick Log: Mention <span className="text-brand-white">Name, Date, & Guests</span> to auto-reserve.
                </p>
              </motion.div>

              {/* Marquee Suggestions - Only show if no messages or just a few */}
              {messages.length < 3 && (
                <div className="overflow-hidden relative grayscale hover:grayscale-0 transition-all">
                  <div className="flex gap-4 animate-marquee-fast whitespace-nowrap">
                    {[...SUGGESTIONS, ...SUGGESTIONS].map((s, i) => (
                      <button
                        key={i}
                        onClick={() => handleSuggestionClick(s)}
                        className="text-[9px] font-black tracking-widest uppercase py-2 px-4 bg-brand-white/5 hover:bg-brand-white hover:text-brand-black rounded-full border border-brand-white/10 transition-all shrink-0"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2 items-center">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={cycleSuggestions}
                  className="h-11 w-11 flex-shrink-0 bg-brand-accent text-brand-black rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,0,0.3)] group relative overflow-hidden transition-all"
                  title="Cycle Suggestions"
                >
                  <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <Sparkles size={18} className="relative z-10 group-hover:rotate-12 transition-transform" />
                </motion.button>
                
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Ask Scout..."
                    className="w-full bg-brand-white/5 border border-brand-white/10 rounded-xl px-4 py-3 text-sm font-mono focus:border-brand-accent transition-all outline-none pr-12 text-brand-white"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && askWildScout()}
                  />
                  <button
                    onClick={askWildScout}
                    disabled={loading || !query.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-brand-white/40 hover:text-brand-accent disabled:opacity-30 transition-colors"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
            
            <style>{`
              @keyframes marquee-fast {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              @keyframes shimmer {
                100% { transform: translateX(100%); }
              }
              .animate-marquee-fast {
                animation: marquee-fast 30s linear infinite;
              }
              .animate-marquee-fast:hover {
                animation-play-state: paused;
              }
              .group-hover\:animate-shimmer:hover {
                animation: shimmer 1.5s infinite;
              }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
