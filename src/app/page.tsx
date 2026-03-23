"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import CanvasScrubber from "@/components/CanvasScrubber";
import ScrollStory from "@/components/ScrollStory";
import Navbar from "@/components/Navbar";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5, // Increased for that floaty anti-gravity feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple-like easing curve
      orientation: "vertical",
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative bg-[#050505] text-white selection:bg-white/30">
      <Navbar />
      {/* 
        The h-[400vh] container defines how much scrolling space exists.
        The CanvasScrubber points to this height implicitly by checking scrollYProgress of the document.
      */}
      <div className="relative h-[400vh]">
        <CanvasScrubber />
        <ScrollStory />
      </div>
    </main>
  );
}
