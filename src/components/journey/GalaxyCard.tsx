import React, { useRef } from 'react';
import { motion, type Variants } from 'framer-motion';

// Interface for the component's props
interface GalaxyCardProps {
  name: string;
  icon: React.ReactNode;
  onSelect: () => void;
  layoutId: string;
}

// Variants are unchanged, they are just definitions of states
const cardVariant: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export const GalaxyCard: React.FC<GalaxyCardProps> = ({ name, icon, onSelect, layoutId }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // ... mouse move logic remains exactly the same
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    const rotateY = (x / (width / 2)) * 10;
    const rotateX = -(y / (height / 2)) * 10;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    cardRef.current.style.setProperty('--mouse-x', `${e.clientX - left}px`);
    cardRef.current.style.setProperty('--mouse-y', `${e.clientY - top}px`);
  };

  const handleMouseLeave = () => {
    // ... mouse leave logic remains exactly the same
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <motion.div
      layoutId={layoutId}
      onClick={onSelect}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group aspect-square relative flex flex-col items-center justify-center p-4 
                 rounded-2xl bg-slate-900/60 cursor-pointer overflow-hidden
                 border border-cyan-400/20 shadow-xl shadow-cyan-500/10
                 transition-all duration-300 ease-out"
      style={{ transformStyle: 'preserve-3d' }}
      variants={cardVariant}
      initial="hidden"       // Start hidden (same as before)
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }} // Configuration for the trigger
      // ---------------------------------------------
    >
      {/* ... child elements are unchanged ... */}
      <div className="absolute inset-0 opacity-50 group-hover:opacity-70 transition-opacity duration-500 bg-[length:200%_200%] animate-aurora"
        style={{ backgroundImage: `radial-gradient(ellipse at center, hsl(260, 80%, 35%) 0%, transparent 60%), linear-gradient(125deg, hsl(210, 80%, 30%), hsl(300, 80%, 25%))` }}/>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
        style={{ background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), hsla(185, 94%, 71%, 0.25), transparent 40%)` }}/>
      <div className="relative z-10 flex flex-col items-center justify-center text-center transition-transform duration-300 ease-out" style={{ transform: 'translateZ(40px)' }}>
        <div className="text-4xl md:text-5xl text-white/90 group-hover:text-white transition-all duration-300 [filter:drop-shadow(0_0_8px_theme(colors.cyan.400))] group-hover:[filter:drop-shadow(0_0_15px_theme(colors.cyan.300))]">
          {icon}
        </div>
        <p className="mt-4 text-sm md:text-base font-semibold text-slate-300 group-hover:text-white transition-colors duration-300 [text-shadow:0_0_8px_rgba(0,0,0,0.5)]">
          {name}
        </p>
      </div>
    </motion.div>
  );
};