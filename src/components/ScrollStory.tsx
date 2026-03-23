"use client";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollStory() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="absolute top-0 left-0 w-full h-[400vh] pointer-events-none z-10">
      
      {/* 0-15% (Hero) */}
      <StoryBlock 
        progress={scrollYProgress} 
        start={0} end={0.15} 
        headline="Nothing Phone" 
        sub="Designed to be seen." 
      />

      {/* 15-35% (Initial Separation) */}
      <StoryBlock 
        progress={scrollYProgress} 
        start={0.15} end={0.35} 
        headline="Everything, exposed." 
      />

      {/* 35-60% (Full Anti-Gravity) */}
      <StoryBlock 
        progress={scrollYProgress} 
        start={0.35} end={0.60} 
        headline="Precision, in every detail." 
      />

      {/* 60-80% (Glyph Moment) */}
      <StoryBlock 
        progress={scrollYProgress} 
        start={0.60} end={0.80} 
        headline="Light that speaks." 
      />

      {/* 80-100% (Reassembly) */}
      <StoryBlock 
        progress={scrollYProgress} 
        start={0.80} end={1} 
        headline="Nothing unnecessary." 
        cta="Experience Nothing Phone"
      />

    </div>
  );
}

function StoryBlock({ progress, start, end, headline, sub, cta }: any) {
  // Fade in at the beginning of the range, stay, and fade out at the end
  // We add a tiny buffer to transition smoothly between blocks
  const fadeInStart = start;
  const fadeInEnd = start + 0.05;
  const fadeOutStart = end - 0.05;
  const fadeOutEnd = end;

  const opacity = useTransform(
    progress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [0, 1, 1, 0]
  );
  
  // Parallax float effect for text: moves slightly upwards as you scroll through the block
  const y = useTransform(
    progress,
    [fadeInStart, fadeOutEnd],
    [50, -50]
  );

  return (
    <motion.div 
      className="fixed inset-0 flex flex-col items-center justify-center px-4 text-center pointer-events-none"
      style={{ opacity, y }}
    >
      <h2 className="text-4xl md:text-6xl font-light tracking-tight text-white mb-4 drop-shadow-2xl">
        {headline}
      </h2>
      {sub && (
        <p className="text-lg md:text-2xl text-neutral-400 font-light tracking-wide">
          {sub}
        </p>
      )}
      {cta && (
        <motion.button 
          className="mt-12 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full hover:bg-white hover:text-black transition-colors pointer-events-auto text-sm tracking-widest uppercase font-medium shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {cta}
        </motion.button>
      )}
    </motion.div>
  );
}
