"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function BambooScroll() {
  const { scrollYProgress } = useScroll();
  
  // As the user scrolls down, the panda climbs down the bamboo
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "80vh"]);

  return (
    <div className="hidden md:flex fixed right-16 top-0 bottom-0 w-8 pointer-events-none z-0 justify-center">
      {/* Bamboo Stalk */}
      <div className="absolute inset-y-0 w-6 bg-gradient-to-b from-green-600 via-green-500 to-green-700 shadow-inner flex flex-col justify-between overflow-hidden rounded-t-full rounded-b-full">
        {/* Bamboo Joints */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="w-full h-1.5 bg-green-900/40 my-8 shadow-sm" />
        ))}
      </div>

      {/* Climbing Panda */}
      <motion.div 
        style={{ y }}
        className="absolute top-12 -ml-8 w-24 h-24 flex items-center justify-center text-6xl drop-shadow-2xl"
      >
        <div className="animate-bounce">🐼</div>
      </motion.div>
    </div>
  );
}
