import { motion } from "framer-motion";
import StatBar from "./components/StatsBar";

// Define your personal stats here!
// The 'value' is the number that will be displayed.
// The 'percentage' is how full the bar will be (0-100).
const statsData = [
  { label: "Cups of Coffee", value: 1387, percentage: 85 },
  { label: "Lines of Code Written", value: 454393, percentage: 95 },
  { label: "Projects Launched", value: 3, percentage: 30 },
  { label: "Hours Solving Differential Equations", value: 2146, percentage: 70 },
];

// Variants for the container to stagger the children's animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Each child will animate 0.2s after the previous one
    },
  },
};

const Stats = () => {
  return (
    <motion.div
      className="flex flex-col gap-4 w-full max-w-sm" // Control width and spacing
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }} // Animate when it comes into view
    >
      {statsData.map((stat, index) => (
        <StatBar
          key={index}
          label={stat.label}
          value={stat.value}
          percentage={stat.percentage}
        />
      ))}
    </motion.div>
  );
};

export default Stats;