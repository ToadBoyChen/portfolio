// UniverseEntryButton.tsx

import { motion } from "framer-motion";
import type { FC } from "react";
import { FaRocket } from "react-icons/fa";

interface UniverseEntryButtonProps {
  onClick: () => void;
}

export const UniverseEntryButton: FC<UniverseEntryButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="relative w-64 h-64 rounded-full flex items-center justify-center text-white font-bold text-xl tracking-wider uppercase"
      style={{
        transformStyle: "preserve-3d",
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, transition: { duration: 0.5, delay: 0.2 } }}
      exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.3 } }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Layer 1: Pulsing outer glow */}
      <motion.div
        className="absolute inset-0 bg-purple-500/50 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Layer 2: Core sphere */}
      <div className="absolute inset-4 bg-gradient-to-br from-gray-800 to-black rounded-full shadow-inner" />

      {/* Layer 3: Starfield pattern */}
      <div className="absolute inset-4 rounded-full opacity-30" style={{ backgroundImage: "url('/path-to-your/star-bg.svg')", backgroundSize: '300%' }}/>

      {/* Layer 4: Orbiting Particles */}
      <motion.div 
        className="absolute w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_8px_white]" />
        <div className="absolute bottom-10 left-10 -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
      </motion.div>
      <motion.div 
        className="absolute w-[80%] h-[80%]"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-pink-400 rounded-full shadow-[0_0_6px_white]" />
      </motion.div>

      {/* Text and Icon Content */}
      <div className="relative z-10 flex flex-col items-center" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)"}}>
        <FaRocket className="mb-2 text-4xl" />
        Enter Quest Universe
      </div>
    </motion.button>
  );
};