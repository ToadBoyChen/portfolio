import { motion } from "framer-motion";
import type { IconType } from "react-icons";

// Add an optional 'tier' prop to the interface
interface SkillCardProps {
  name: string;
  icon: IconType;
  tier?: 'gold' | 'silver' | 'bronze';
}

// Animation variants for each card (remains the same)
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// --- NEW: Configuration for Tier Styles ---
// This object makes it easy to manage and customize the look of each tier.
const tierConfig = {
  gold: {
    card: "bg-gradient-to-br from-yellow-400/50 to-amber-600/50 border-none shadow-yellow-500/50",
    icon: "text-yellow-900",
    text: "text-yellow-950 font-bold",
  },
  silver: {
    card: "bg-gradient-to-br from-slate-300/50 to-gray-500/50 border-none shadow-gray-500/50",
    icon: "text-gray-800",
    text: "text-gray-900 font-bold",
  },
  bronze: {
    card: "bg-gradient-to-br from-amber-600/50 to-orange-800/50 border-none shadow-orange-700/50",
    icon: "text-orange-950",
    text: "text-orange-950 font-bold",
  },
  default: {
    card: "border-none bg-white/30 backdrop-blur-md",
    icon: "text-primary",
    text: "text-foreground font-semibold",
  },
};
// -----------------------------------------

function SkillCard({ name, icon: Icon, tier }: SkillCardProps) {
  // Get the correct style set based on the tier, or use 'default' if no tier is provided.
  const styles = tierConfig[tier || 'default'];

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5, scale: 1.05 }}
      // Dynamically combine base classes with tier-specific card styles
      className={`flex flex-col items-center justify-center gap-2 p-4 sm:p-6 rounded-2xl border cursor-pointer ${styles.card}`}
    >
      {/* Apply the tier-specific icon styles */}
      <Icon className={`text-4xl sm:text-5xl ${styles.icon}`} />
      {/* Apply the tier-specific text styles */}
      <p className={`text-sm sm:text-base ${styles.text}`}>{name}</p>
    </motion.div>
  );
}

export default SkillCard;