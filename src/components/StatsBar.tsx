import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

interface StatBarProps {
  label: string;
  value: number;
  percentage: number;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function StatBar({ label, value, percentage }: StatBarProps) {
  // This is the magic for the counting number animation
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 1.5, // Animate over 1.5 seconds
      ease: "easeOut",
    });
    // Cleanup function to stop animation on unmount
    return controls.stop;
  }, [value]);

  return (
    <motion.div variants={itemVariants} className="w-full">
      {/* Label and the animated number */}
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <motion.span className="text-sm font-bold text-primary">
          {rounded}
        </motion.span>
      </div>
      {/* The background of the bar */}
      <div className="w-full bg-white/20 rounded-full h-2.5">
        {/* The animated, gradient-filled bar */}
        <motion.div
          className="bg-gradient-to-r from-rose-400/70 via-amber-500/70 to-yellow-500/70 h-2.5 rounded-full text-lg text-foreground"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

export default StatBar;