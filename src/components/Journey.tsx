import { useState, useEffect, type FC } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  FaSchool, FaCode, FaUniversity, FaChartLine, FaLaptopCode, FaBug, FaHtml5, FaShieldAlt, 
  FaStar, FaFistRaised, FaBrain, FaBookOpen 
} from 'react-icons/fa';
import { IoClose } from "react-icons/io5";

// --- 1. Upgraded Type Definition and Data ---

type Difficulty = "Trivial" | "Easy" | "Normal" | "Hard" | "Heroic";
type QuestType = "Main Story" | "Side Quest" | "Skill Quest";

export interface JourneyStep {
  title: string;
  date: string;
  location: string;
  description: string;
  icon: React.ReactElement;
  questType: QuestType;
  difficulty: Difficulty;
  recommendedLevel: number;
  recommendedSkills: string[];
  rewards: {
    type: "XP" | "Skill" | "Item";
    name: string;
    amount?: number;
    icon: React.ReactElement;
  }[];
}

const journeySteps: JourneyStep[] = [
  { 
    title: "School Starts", 
    date: "2015", 
    location: "Priestlands School", 
    description: "The journey begins! Discovered a passion for problem-solving and logic within the structured world of mathematics and the creative freedom of Python on a Raspberry Pi.",
    icon: <FaSchool />,
    questType: "Main Story",
    difficulty: "Trivial",
    recommendedLevel: 1,
    recommendedSkills: ["Curiosity"],
    rewards: [
      { type: "XP", name: "Experience", amount: 500, icon: <FaStar /> },
      { type: "Skill", name: "Python (Basic)", icon: <FaCode /> },
    ]
  },
  { 
    title: "The First Trade", 
    date: "2022", 
    location: "Edinburgh", 
    description: "Ventured into the volatile markets. Initial reliance on technical indicators taught valuable lessons about market dynamics and the need for a more quantitative approach, inspired by legends like Jim Simons.",
    icon: <FaChartLine />,
    questType: "Side Quest",
    difficulty: "Normal",
    recommendedLevel: 16,
    recommendedSkills: ["Risk Analysis", "Pattern Recognition"],
    rewards: [
      { type: "XP", name: "Experience", amount: 2500, icon: <FaStar /> },
      { type: "Item", name: "Tome of Market Analysis", icon: <FaBookOpen /> },
    ]
  },
  {
    title: "The Gauntlet of London",
    date: "2023",
    location: "Queen Mary University",
    description: "Having proven resilient, the challenge was accepted to study at a higher level in the bustling city of London. This quest involves specializing in Pure Mathematics and seizing the many opportunities the capital offers.",
    icon: <FaUniversity />,
    questType: "Main Story",
    difficulty: "Hard",
    recommendedLevel: 18,
    recommendedSkills: ["Abstract Algebra", "Complex Analysis", "Resilience"],
    rewards: [
      { type: "XP", name: "Experience", amount: 10000, icon: <FaStar /> },
      { type: "Skill", name: "Mathematical Maturity", icon: <FaBrain /> },
    ]
  },
  {
    title: "Trial by Code: Algorithmic Trading",
    date: "2025",
    location: "London",
    description: "Combine the knowledge of markets and programming to create an automated trading entity. This ultimate test of skill requires building and backtesting a Python algorithm capable of outperforming the market.",
    icon: <FaBug />,
    questType: "Skill Quest",
    difficulty: "Heroic",
    recommendedLevel: 21,
    recommendedSkills: ["Python (Advanced)", "API Integration", "Statistical Modeling"],
    rewards: [
      { type: "XP", name: "Experience", amount: 15000, icon: <FaStar /> },
      { type: "Item", name: "The Quant's Ledger", icon: <FaBookOpen /> },
      { type: "Skill", name: "Algorithmic Trading", icon: <FaChartLine /> },
    ]
  },
];

const difficultyColor: Record<Difficulty, string> = {
    "Trivial": "text-gray-400",
    "Easy": "text-green-500",
    "Normal": "text-blue-500",
    "Hard": "text-orange-500",
    "Heroic": "text-red-600",
};

const QuestModal: FC<{ step: JourneyStep; onClose: () => void }> = ({ step, onClose }) => {
  return (
    <>
      <motion.div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
      />
      <motion.div 
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-3xl z-50"
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        exit={{ scale: 0.9, opacity: 0 }} 
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div 
          className="bg-gradient-to-br from-blue-200/40 to-purple-300/50 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10 overflow-hidden"
        >
          <div className="p-6 bg-black/10">
            <div className="flex justify-between items-start">
              <div>
                <span className="px-3 py-1 text-xs font-bold text-primary bg-primary/20 rounded-full">{step.questType}</span>
                <h2 className="text-3xl font-bold text-foreground mt-2">{step.title}</h2>
                <p className="text-primary font-semibold">{step.location} - {step.date}</p>
              </div>
              <button onClick={onClose} className="text-foreground/60 hover:text-foreground transition-colors"><IoClose size={28} /></button>
            </div>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h3 className="font-bold text-foreground">Objectives</h3>
              <p className="mt-2 text-foreground/80 leading-relaxed">{step.description}</p>
            </div>
            <div className="space-y-4 bg-black/10 p-4 rounded-lg">
              <div>
                <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Difficulty</h4>
                <p className={`font-bold text-lg ${difficultyColor[step.difficulty]}`}>{step.difficulty}</p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Rec. Level</h4>
                <p className="font-bold text-lg text-foreground">{step.recommendedLevel}</p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Required Skills</h4>
                <div className="flex flex-wrap gap-1 mt-1">
                  {step.recommendedSkills.map(skill => <span key={skill} className="text-xs bg-background/50 text-foreground px-2 py-0.5 rounded">{skill}</span>)}
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 bg-black/10">
            <h3 className="font-bold text-foreground">Rewards</h3>
            <div className="flex flex-wrap gap-4 mt-2">
              {step.rewards.map(reward => (
                <div key={reward.name} className="flex items-center gap-2 bg-background/50 p-2 rounded-md">
                  <div className="text-yellow-400 text-lg">{reward.icon}</div>
                  <p className="text-foreground font-semibold text-sm">{reward.name} {reward.amount && `+${reward.amount.toLocaleString()}`}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

const JourneyStepCard: FC<{ step: JourneyStep; index: number; onSelect: (step: JourneyStep) => void; }> = ({ step, index, onSelect }) => {
  const isRightSide = index % 2 !== 0;
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => { if (inView) { controls.start("visible"); } }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, x: isRightSide ? 100 : -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };
  const nodeVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { duration: 0.4, type: "spring", stiffness: 300, damping: 20, delay: 0.3 } },
  };

  return (
    <div 
      ref={ref} 
      className="relative w-full flex my-10 px-4 items-center"
    >
      <motion.div 
        className="absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-background rounded-full border-4 border-primary flex items-center justify-center z-[101]" 
        variants={nodeVariants} 
        initial="hidden" 
        animate={controls}
      >
        <div className="text-primary text-xl">
          {step.icon}
        </div>
      </motion.div>
      <div className={`w-1/2 ${isRightSide ? "pl-16" : "pr-16 ml-auto"}`}>
        <motion.div className="relative text-left bg-gradient-to-br from-blue-200/40 to-purple-300/50 p-4 rounded-xl backdrop-blur-lg shadow-md cursor-pointer group" variants={containerVariants} initial="hidden" animate={controls} onClick={() => onSelect(step)}>
          {/* THE ONLY CHANGE IS ON THIS LINE */}
          <div className={`transition-transform duration-300 group-hover:scale-105 flex flex-col ${isRightSide ? 'items-start' : 'items-end'}`}>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-primary/20 text-primary`}>{step.questType}</span>
            <h3 className="text-xl font-bold text-foreground mt-1">{step.title}</h3>
            <p className="text-sm text-primary/80">{step.date} - {step.location}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// --- 4. Main Journey Component ---

function Journey() {
  const [selectedStep, setSelectedStep] = useState<JourneyStep | null>(null);

  return (
    <div id="journey" className="relative py-10">
      <div className="absolute left-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 -translate-x-1/2 z-100"></div>
      {journeySteps.map((step, index) => (
        <JourneyStepCard key={step.title} step={step} index={index} onSelect={setSelectedStep} />
      ))}

      <AnimatePresence>
        {selectedStep && (
          <QuestModal step={selectedStep} onClose={() => setSelectedStep(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Journey;