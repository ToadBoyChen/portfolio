import { useState, useEffect, type FC } from "react";
import { motion, useAnimation, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaSchool, FaCode, FaUniversity, FaChartLine, FaLaptopCode, FaBug, FaHtml5, FaShieldAlt,
  FaStar, FaFistRaised, FaBrain, FaBookOpen
} from 'react-icons/fa';
import { IoClose } from "react-icons/io5";
import { Button } from "./ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import Hamburger from "hamburger-react";

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
  progress: number;
  rewards: {
    type: "XP" | "Skill" | "Item";
    name: string;
    amount?: number;
    icon: React.ReactElement;
  }[];
}

const journeySteps: JourneyStep[] = [
  // ... journeySteps data is unchanged
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
    progress: 100,
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
    progress: 100,
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
    progress: 100,
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
    progress: 75,
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
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
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
          className="bg-gradient-to-br from-blue-100/90 to-purple-400/90 backdrop-blur-lg rounded-2xl overflow-hidden"
        >
          <div className="p-6 bg-black/10">
            <div className="flex justify-between items-start">
              <div className="flex flex-col items-start w-full">
                <span className="px-3 py-1 text-xs font-bold text-primary bg-primary/20 rounded-full">
                  {step.questType}
                </span>
                <p className="text-3xl font-bold text-background my-2 chango-regular knewave-shadow-small ">
                  {step.title}
                </p>
                <div className="text-primary font-semibold flex flex-row justify-between w-full">
                  <p className="self-start">
                    {step.location}
                  </p>
                  <p className="self-end">
                    {step.date}
                  </p>
                </div>
              </div>
              <Button
                onClick={onClose} 
                className={`rounded-full text-primary bg-background shadow-md hover:text-background hover:bg-primary hover:shadow-lg active:scale-90 transition-all duration-300 ease-in-out hover:rotate-12 translate-x-40`}
              >
                <Hamburger size={18} color="background"/>
              </Button>
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


// --- JourneyStepCard DRAMATICALLY SIMPLIFIED ---
const JourneyStepCard: FC<{
  step: JourneyStep;
  index: number;
  onSelect: (step: JourneyStep) => void;
  isTooltipVisible: boolean;
}> = ({ step, index, onSelect, isTooltipVisible }) => {
  const isRightSide = index % 2 !== 0;
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });

  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  // --- This useEffect is now only for the number animation ---
  useEffect(() => {
    if (inView) {
      const animation = animate(count, step.progress, {
        duration: 1.5,
        ease: "easeOut",
        delay: 0.5, // Delay this slightly so it starts after the card is in place
      });
      return () => animation.stop();
    }
  }, [inView, count, step.progress]);

  // --- Simplified variants for direct use ---
  const containerVariants = {
    hidden: { opacity: 0, x: isRightSide ? 100 : -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
    },
  };

  const nodeVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20, delay: 0.2 },
    },
  };

  return (
    <div ref={ref} className="relative w-full flex my-10 px-4 items-center">
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-background rounded-full border-4 border-primary flex items-center justify-center z-40"
        variants={nodeVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"} // Animate when in view
      >
        <div className="text-primary text-xl">{step.icon}</div>
      </motion.div>

      <div className={`w-1/2 ${isRightSide ? "pl-16" : "pr-16 ml-auto"}`}>
        <TooltipProvider>
          <Tooltip open={isTooltipVisible} delayDuration={100}>
            <TooltipTrigger asChild>
              <motion.div
                className="relative text-left bg-gradient-to-br from-blue-200/40 to-purple-300/50 p-4 rounded-xl backdrop-blur-lg shadow-md cursor-pointer transition-all duration-300 hover:brightness-90"
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"} // Animate when in view
                onClick={() => onSelect(step)}
              >
                {/* Card content is unchanged */}
                <div className={`flex flex-col ${isRightSide ? 'items-start' : 'items-end'}`}>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-primary/20 text-primary`}>{step.questType}</span>
                  <h3 className="text-xl font-bold text-foreground mt-1">{step.title}</h3>
                  <p className="text-sm text-primary/80">{step.date} - {step.location}</p>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between items-center mb-1 text-xs">
                    <span className={`font-bold ${step.progress === 100 ? 'text-green-400' : 'text-cyan-400'}`}>
                      {step.progress === 100 ? "Completed" : "Active"}
                    </span>
                  </div>
                  <div className="w-full bg-black/20 rounded-full h-2 relative overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${step.progress === 100 ? 'bg-green-500' : 'bg-gradient-to-r from-cyan-400 to-purple-500'}`}
                      initial={{ width: "0%" }}
                      // Animate the width directly when the card is in view
                      animate={{ width: inView ? `${step.progress}%` : "0%" }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                    />
                    <div className="absolute inset-0 flex justify-center items-center">
                      <motion.span className="text-white text-[10px] font-bold drop-shadow-sm">{rounded}</motion.span>
                      <span className="text-white text-[10px] font-bold drop-shadow-sm">%</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent><p>Click a quest to see details!</p></TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

function Journey() {
  const [selectedStep, setSelectedStep] = useState<JourneyStep | null>(null);
  const [tooltipShown, setTooltipShown] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const { ref: firstCardRef, inView: firstCardInView } = useInView({ threshold: 0.5, triggerOnce: true });

  useEffect(() => {
    if (firstCardInView && !tooltipShown) {
      setIsTooltipVisible(true);
      setTooltipShown(true);
      const timer = setTimeout(() => {
        setIsTooltipVisible(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [firstCardInView, tooltipShown]);

  const handleSelectStep = (step: JourneyStep) => {
    setSelectedStep(step);
    setIsTooltipVisible(false);
  };

  return (
    <div
      id="journey"
      className="relative py-10 mt-8"
    >
      <div className="absolute left-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-blue-500/0 via-purple-500/50 to-purple-500/0 -translate-x-1/2"></div>
      {journeySteps.map((step, index) => (
        <div ref={index === 0 ? firstCardRef : null} key={step.title}>
          <JourneyStepCard
            step={step}
            index={index}
            onSelect={handleSelectStep}
            isTooltipVisible={index === 0 && isTooltipVisible}
          />
        </div>
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