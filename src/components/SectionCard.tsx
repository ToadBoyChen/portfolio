import { motion } from "framer-motion";
import React from "react";

const SectionCard = React.memo(function SectionCard({
  children,
  index = 0,
  color,
}: {
  children: React.ReactNode;
  index?: number;
  color?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100, y: 50, rotate: -10, scale: 0.95 }}
      whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 12,
        delay: index * 0.2,
      }}
      className={`
        rounded-2xl sm:rounded-3xl shadow-md 
        px-4 py-6 sm:px-8 sm:py-8 md:px-12 md:py-10 
        backdrop-blur-lg [will-change:transform,opacity]
        ${color ?? "bg-gradient-to-br from-blue-200/40 to-purple-300/50"}
      `}
      style={{ perspective: 1000 }}
    >
      {children}
    </motion.div>
  );
});

export default SectionCard;
