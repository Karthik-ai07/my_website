"use client";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Navbar() {
  const { scrollYProgress } = useScroll();
  
  // Fade in nav background as user scrolls past the first 5%
  const bgOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 0.8]);
  const blur = useTransform(scrollYProgress, [0, 0.05], ["blur(0px)", "blur(12px)"]);

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 border-b border-white/5"
      style={{ 
        backgroundColor: useTransform(bgOpacity, (v) => `rgba(5, 5, 5, ${v})`),
        backdropFilter: blur,
        WebkitBackdropFilter: blur
      }}
    >
      <div className="flex items-center gap-2 cursor-pointer">
        <span className="text-white font-medium tracking-wide text-sm uppercase">Nothing</span>
        <span className="text-white/60 font-medium tracking-wide text-sm uppercase">Phone</span>
      </div>

      <div className="hidden md:flex items-center gap-10 text-xs font-medium tracking-widest uppercase text-white/50">
        <a href="#" className="hover:text-white transition-colors">Overview</a>
        <a href="#" className="hover:text-white transition-colors">Design</a>
        <a href="#" className="hover:text-white transition-colors">Glyph</a>
        <a href="#" className="hover:text-white transition-colors">Specs</a>
      </div>

      <div>
        <button className="px-6 py-2 bg-white text-black text-xs font-bold tracking-widest uppercase rounded-full hover:bg-neutral-200 transition-colors">
          Buy
        </button>
      </div>
    </motion.nav>
  );
}
