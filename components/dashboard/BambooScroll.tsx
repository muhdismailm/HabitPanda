"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function BambooScroll() {
  const { scrollYProgress } = useScroll();
  
  // As the user scrolls down, the panda climbs down the bamboo
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "80vh"]);

  return (
    <div className="hidden md:flex fixed right-16 top-0 bottom-0 w-8 pointer-events-none z-0 justify-center">

      {/* Climbing Panda */}
      <motion.div 
        style={{ y }}
        className="absolute top-12 -ml-4 w-16 h-16 flex items-center justify-center text-4xl drop-shadow-2xl"
      >
        <div className="animate-bounce">🐼</div>
      </motion.div>
    </div>
  );
}
