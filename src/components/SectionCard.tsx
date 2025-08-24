import { motion } from "framer-motion";
import React from "react"; // Import React for React.memo

// It's good practice to memoize components that are rendered in a list
// to prevent unnecessary re-renders if their props haven't changed.
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
      // 1. Define the initial "off-screen" state directly here
      initial={{ opacity: 0, x: -100, y: 50, rotate: -10, scale: 0.95 }}
      
      // 2. Use `whileInView` for the "on-screen" state.
      // Framer Motion handles the Intersection Observer internally and efficiently.
      whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
      
      // 3. The KEY for performance: Use `viewport` to trigger the animation only ONCE.
      viewport={{ once: true, amount: 0.2 }}
      
      // 4. Your transition logic remains the same - it's already good!
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 12,
        delay: index * 0.2,
      }}
      
      // 5. Add the `will-change` CSS property as a hint to the browser
      //    for even smoother animations.
      className={`
        rounded-3xl shadow-md px-12 py-10 backdrop-blur-lg
        [will-change:transform,opacity]
        ${color ?? "bg-gradient-to-br from-blue-200/40 to-purple-300/50"}
      `}
      style={{ perspective: 1000 }}
    >
      {children}
    </motion.div>
  );
});

export default SectionCard;
