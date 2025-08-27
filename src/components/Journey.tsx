import { useState, useEffect, type FC } from "react";
import { motion, useAnimation, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaSchool, FaCode, FaUniversity, FaChartLine, FaLaptopCode, FaBug, FaHtml5, FaShieldAlt,
  FaStar, FaFistRaised, FaBrain, FaBookOpen
} from 'react-icons/fa';
import { Button } from "./ui/button";
import SpriteAnimator from "./SpriteAnimator";

const quest1 = [
  './src/assets/me/ani/me1.png',
  './src/assets/me/ani/me2.png',
  './src/assets/me/ani/me3.png',
  './src/assets/me/ani/me4.png',
  './src/assets/me/ani/me5.png',
];
const quest2 = [
  './src/assets/me/ani/me1.png',
  './src/assets/me/ani/me2.png',
  './src/assets/me/ani/me3.png',
  './src/assets/me/ani/me4.png',
  './src/assets/me/ani/me5.png',
];
const quest3 = [
  './src/assets/me/ani/me1.png',
  './src/assets/me/ani/me2.png',
  './src/assets/me/ani/me3.png',
  './src/assets/me/ani/me4.png',
  './src/assets/me/ani/me5.png',
];
const quest4 = [
  './src/assets/me/ani/me1.png',
  './src/assets/me/ani/me2.png',
  './src/assets/me/ani/me3.png',
  './src/assets/me/ani/me4.png',
  './src/assets/me/ani/me5.png',
];

const special1 = [
  './src/assets/me/ani/me1.png',
  './src/assets/me/ani/me2.png',
  './src/assets/me/ani/me3.png',
  './src/assets/me/ani/me4.png',
  './src/assets/me/ani/me5.png',
];
const special2 = [
  './src/assets/me/ani/me1.png',
  './src/assets/me/ani/me2.png',
  './src/assets/me/ani/me3.png',
  './src/assets/me/ani/me4.png',
  './src/assets/me/ani/me5.png',
];
const special3 = [
  './src/assets/me/ani/me1.png',
  './src/assets/me/ani/me2.png',
  './src/assets/me/ani/me3.png',
  './src/assets/me/ani/me4.png',
  './src/assets/me/ani/me5.png',
];
const special4 = [
  './src/assets/me/ani/me1.png',
  './src/assets/me/ani/me2.png',
  './src/assets/me/ani/me3.png',
  './src/assets/me/ani/me4.png',
  './src/assets/me/ani/me5.png',
];

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import Hamburger from "hamburger-react";

type Difficulty = "Trivial" | "Easy" | "Normal" | "Hard" | "Heroic";
type QuestType = "Main Story" | "Side Quest" | "Skill Quest";
type Rarity = "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary";

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
  animationFrames: string[];
  rewards: {
    type: "XP" | "Skill" | "Item";
    name: string;
    amount?: number;
    icon: React.ReactElement;
  }[];
  specialItem: string;
  specialItemFrames: string[];
  specialItemRarity: Rarity;
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
    progress: 100,
    animationFrames: quest1,
    rewards: [
      { type: "XP", name: "Experience", amount: 500, icon: <FaStar /> },
      { type: "Skill", name: "Python (Basic)", icon: <FaCode /> },
    ],
    specialItem: "Raspberry Pi",
    specialItemFrames: special1,
    specialItemRarity: "Legendary",
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
    animationFrames: quest2,
    rewards: [
      { type: "XP", name: "Experience", amount: 2500, icon: <FaStar /> },
      { type: "Item", name: "Tome of Market Analysis", icon: <FaBookOpen /> },
    ],
    specialItem: "yFinance Bible",
    specialItemFrames: special2,
    specialItemRarity: "Legendary",
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
    animationFrames: quest3,
    rewards: [
      { type: "XP", name: "Experience", amount: 10000, icon: <FaStar /> },
      { type: "Skill", name: "Mathematical Maturity", icon: <FaBrain /> },
    ],
    specialItem: "Tome of Real Analysis",
    specialItemFrames: special3,
    specialItemRarity: "Legendary",
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
    animationFrames: quest4,
    rewards: [
      { type: "XP", name: "Experience", amount: 15000, icon: <FaStar /> },
      { type: "Item", name: "The Quant's Ledger", icon: <FaBookOpen /> },
      { type: "Skill", name: "Algorithmic Trading", icon: <FaChartLine /> },
    ],
    specialItem: "Lesser Norm Spell",
    specialItemFrames: special4,
    specialItemRarity: "Legendary",
  },
];


const difficultyColor: Record<Difficulty, string> = {
  "Trivial": "text-gray-400",
  "Easy": "text-green-500",
  "Normal": "text-blue-500",
  "Hard": "text-orange-500",
  "Heroic": "text-red-600",
};

const rarityColor: Record<Rarity, string> = {
  "Common": "text-gray-400",
  "Uncommon": "text-green-500",
  "Rare": "text-blue-500",
  "Epic": "text-purple-500",
  "Legendary": "text-orange-500",
};

const QuestModal: FC<{ step: JourneyStep; onClose: () => void }> = ({ step, onClose }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, step.progress, {
      duration: 1.5,
      ease: "easeOut",
      delay: 0.5,
    });
    return () => animation.stop();
  }, [count, step.progress]);

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
        <div className="bg-gradient-to-br from-blue-100/90 to-purple-400/90 backdrop-blur-lg rounded-2xl overflow-hidden">
          <div className="p-6 bg-black/10">
            <div className="flex justify-between items-start">
              <div className="flex flex-col items-start w-full">
                <div className="flex justify-between w-full">
                  <span 
                    className="p-3 px-4 text-xs font-bold text-primary bg-primary/20 rounded-full self-start">
                    {step.questType}
                  </span>
                  <Button
                    onClick={onClose} 
                    className={`self-end rounded-full text-primary bg-background shadow-md hover:text-background hover:bg-primary hover:shadow-lg active:scale-90 transition-all duration-300 ease-in-out hover:rotate-12`}
                    >
                      <Hamburger toggled={true} size={18} color="currentColor"/>
                  </Button>
                </div>
                <p className="text-3xl font-bold text-background my-2 chango-regular knewave-shadow-small ">
                  {step.title}
                </p>
                <div className="text-primary font-semibold flex flex-row justify-between min-w-full">
                  <div>
                    <p className="flex flex-row self-end">{step.location}</p>
                  </div>
                  <div className="flex flex-col gap-8">
                    <p className="self-end">{step.date}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="flex justify-center items-center row-start-2 md:row-start-1">
              <SpriteAnimator 
                images={step.animationFrames} 
                fps={4}
                className="w-64 h-auto object-contain drop-shadow-lg" 
              />
            </div>
            
            <div className="md:col-span-2 flex flex-col gap-4">
              <div>
                <h3 className="font-bold text-foreground text-right">Objectives</h3>
                <p className="mt-2 text-foreground/80 leading-relaxed text-right">{step.description}</p>
              </div>

              {/* Flex container to enforce equal height for the two cards below */}
              <div className="flex gap-4">
                
                {/* CARD 1: SPECIAL ITEM */}
                <div className="w-1/2 bg-black/10 p-4 rounded-lg flex flex-col items-center justify-between gap-2">
                  <p className="text-sm text-primary font-semibold">
                    Special Item
                  </p>
                  <p className={`text-lg font-bold text-center ${rarityColor[step.specialItemRarity]}`}>
                    {step.specialItem}
                  </p>
                  <SpriteAnimator 
                    images={step.specialItemFrames} 
                    fps={4}
                    className="w-32 h-auto object-contain drop-shadow-lg" 
                  />
                </div>
                
                {/* CARD 2: DETAILS */}
                <div className="w-1/2 bg-black/10 p-4 rounded-lg flex flex-col justify-between text-right gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Difficulty</h4>
                    <p className={`font-bold text-lg ${difficultyColor[step.difficulty]}`}>{step.difficulty}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Rec. Level</h4>
                    <p className="font-bold text-lg text-foreground">{step.recommendedLevel}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-primary uppercase tracking-wider">
                      Required Skills
                    </h4>
                    <div className="flex flex-wrap justify-end gap-1 mt-1">
                      {step.recommendedSkills.map(skill => 
                        <span key={skill} className="text-xs bg-background/50 text-foreground px-2 py-0.5 rounded">
                          {skill}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* --- BOTTOM SECTION --- */}
          <div className="bg-black/10 p-4">
            <h3 className="font-bold text-foreground">Rewards</h3>
            <div className="flex flex-row justify-evenly gap-4 mt-2">
              {step.rewards.map(reward => (
                <div key={reward.name} className="flex items-center gap-2 p-2 rounded-md bg-yellow-100/50">
                  <div className="text-yellow-500 text-lg">{reward.icon}</div>
                  <p className="text-foreground font-semibold text-sm">{reward.name} {reward.amount && `+${reward.amount.toLocaleString()}`}</p>
                </div>
              ))}
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
                    animate={{ width: `${step.progress}%` }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                  />
                  <div className="absolute inset-0 flex justify-center items-center">
                    <motion.span className="text-white text-[10px] font-bold drop-shadow-sm">{rounded}</motion.span>
                    <span className="text-white text-[10px] font-bold drop-shadow-sm">%</span>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

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

  useEffect(() => {
    if (inView) {
      const animation = animate(count, step.progress, {
        duration: 1.5,
        ease: "easeOut",
        delay: 0.5,
      });
      return () => animation.stop();
    }
  }, [inView, count, step.progress]);

  return (
    <div ref={ref} className="flex my-10 items-center">
      <div
        className="absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-background rounded-full border-4 border-primary flex items-center justify-center z-40"
      >
        <div className="text-primary text-xl">{step.icon}</div>
      </div>
      <div className={`w-1/2 ${isRightSide ? "pl-8" : "pr-8 ml-auto"}`}>
        <TooltipProvider>
          <Tooltip
            open={isTooltipVisible}
            delayDuration={100}
          >
            <TooltipTrigger asChild>
              <div
                className="text-left bg-gradient-to-br from-blue-200/40 to-purple-300/50 p-4 rounded-xl backdrop-blur-lg shadow-md cursor-pointer transition-all duration-300 hover:brightness-90"
                onClick={() => onSelect(step)}
              >
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
                      animate={{ width: inView ? `${step.progress}%` : "0%" }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                    />
                    <div className="absolute inset-0 flex justify-center items-center">
                      <motion.span className="text-white text-[10px] font-bold drop-shadow-sm">{rounded}</motion.span>
                      <span className="text-white text-[10px] font-bold drop-shadow-sm">%</span>
                    </div>
                  </div>
                </div>
              </div>
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
      <div 
        className="absolute left-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-blue-500/0 via-purple-500/50 to-purple-500/0 -translate-x-1/2"
      >
      </div>
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