import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface SectionCardProps {
  children: React.ReactNode;
  index?: number; // for stagger
}

export default function SectionCard({ children, index = 0 }: SectionCardProps) {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -100, y: 50, rotate: -10, scale: 0.95 }}
      animate={inView ? { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 } : {}}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 12,
        delay: index * 0.2, // stagger by index
      }}
      className="bg-background rounded-2xl shadow-xl p-10 my-16 mx-auto max-w-4xl min-h-screen"
      style={{ perspective: 1000 }}
    >
      {children}
    </motion.div>
  );
}
