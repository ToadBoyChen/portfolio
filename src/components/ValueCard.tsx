// src/components/ValueCard.tsx
import { motion } from "framer-motion";
import type { IconType } from "react-icons";

interface ValueCardProps {
  icon: IconType;
  title: string;
  description: string;
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export function ValueCard({ icon: Icon, title, description }: ValueCardProps) {
  return (
    <motion.div variants={cardVariants} className="flex flex-col items-center p-6 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-lg text-center">
      <Icon className="text-4xl text-primary mb-4" />
      <h4 className="text-xl font-bold text-background mb-2 chango-regular">{title}</h4>
      <p className="text-foreground">{description}</p>
    </motion.div>
  );
}