"use client";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";

export default function CanvasScrubber() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();
  
  // adding a spring to make scrolling the frames smooth and anti-gravity-like
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001
  });

  const frameIndex = useTransform(smoothProgress, [0, 1], [1, 240]);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Preload images
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      // We know there are 240 frames
      for (let i = 1; i <= 240; i++) {
        const img = new Image();
        const paddedIndex = i.toString().padStart(3, "0");
        img.src = `/images/ezgif-frame-${paddedIndex}.jpg`;
        await new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve; // Continue on error to prevent blocking
        });
        loadedImages.push(img);
      }
      setImages(loadedImages);
      setLoaded(true);
    };
    loadImages();
  }, []);

  useEffect(() => {
    if (!loaded || !canvasRef.current || images.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fixed size for the rendering calculation to maintain quality
    canvas.width = 1920;
    canvas.height = 1080;

    const render = () => {
      let idx = Math.floor(frameIndex.get()) - 1;
      idx = Math.max(0, Math.min(239, idx));
      const img = images[idx];
      if (img && img.complete && img.naturalHeight !== 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Calculate cover sizing
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;
        
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
    };

    render(); // Initial render

    const unsubscribe = frameIndex.on("change", render);
    return () => unsubscribe();
  }, [loaded, images, frameIndex]);

  // Overarching parallax depth for the canvas container
  const canvasScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.15, 1]);
  const canvasY = useTransform(smoothProgress, [0, 1], ["0%", "8%"]);

  return (
    <div className="sticky top-0 h-screen w-full bg-[#050505] overflow-hidden flex items-center justify-center">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center text-white/50 text-sm tracking-widest uppercase z-50">
          Activating Anti-Gravity Engine...
        </div>
      )}
      <motion.canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
        style={{ scale: canvasScale, y: canvasY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 1 }}
      />
      {/* Soft visual glow at 60-80% mark based on requirement "Glyph lights softly activate" */}
      <motion.div 
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{ 
          background: "radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0) 70%)",
          opacity: useTransform(scrollYProgress, [0.55, 0.6, 0.8, 0.85], [0, 1, 1, 0]) 
        }}
      />
    </div>
  );
}
