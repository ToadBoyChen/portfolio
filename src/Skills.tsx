import { motion } from "framer-motion";
import SkillCard from "./components/SkillCard";
import { FaReact, FaNodeJs, FaFigma, FaGitAlt } from "react-icons/fa";
import { SiTailwindcss, SiTypescript, SiPostgresql, SiPrisma } from "react-icons/si";

// --- UPDATED: Define skills with their respective tiers ---
const skillsData = [
  { name: "React", icon: FaReact, tier: 'gold' },
  { name: "TypeScript", icon: SiTypescript, tier: 'gold' },
  { name: "Node.js", icon: FaNodeJs, tier: 'silver' },
  { name: "Tailwind CSS", icon: SiTailwindcss, tier: 'silver' },
  { name: "PostgreSQL", icon: SiPostgresql, tier: 'bronze' },
  { name: "Prisma", icon: SiPrisma, tier: 'bronze' },
  // These are normal, so we don't add a tier property
  { name: "Git", icon: FaGitAlt },
  { name: "Figma", icon: FaFigma },
];
// --------------------------------------------------------

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Skills = () => {
  return (
    <div className="mt-16 text-center">
      <h3 className="text-3xl font-bold mb-8 chango-regular knewave-shadow text-background">
        My Best Technologies
      </h3>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto"
      >
        {skillsData.map((skill) => (
          // Pass the new tier prop to the SkillCard
          <SkillCard key={skill.name} name={skill.name} icon={skill.icon} tier={skill.tier} />
        ))}
      </motion.div>
    </div>
  );
};

export default Skills;