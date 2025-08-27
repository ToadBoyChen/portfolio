import { useState, useEffect, type FC } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaSchool, FaCode, FaChartLine, FaStar, FaBrain, FaBookOpen,
  FaRaspberryPi,
  FaPython,
  FaLaptopCode,
  FaBiohazard,
  FaBook
} from 'react-icons/fa';
import { PiBoxingGloveFill, PiFileCSharp, PiLinuxLogoFill } from "react-icons/pi";
import { Button } from "./ui/button";
import SpriteAnimator from "./SpriteAnimator";
import { BiMath } from "react-icons/bi";

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
import { GiClothes, GiLaptop, GiSolarSystem } from "react-icons/gi";

type Difficulty = "Trivial" | "Easy" | "Normal" | "Hard" | "Heroic";
type Rarity = "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary";

export interface JourneyStep {
  title: string;
  date: string;
  location: string;
  description: string;
  icon: React.ReactElement;
  questType: string;
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
    title: "Tutorial",
    date: "2015",
    location: "Priestlands School",
    description: "The journey begins! Choose your faction whether that's the Humanities cultist or STEM disciples. This will begin to shape your character build. Certain spells are unlocked depending on the faction you choose.",
    icon: <FaSchool />,
    questType: "Main Story",
    difficulty: "Trivial",
    recommendedLevel: 14,
    recommendedSkills: ["Curiosity", "Creativity", "Tome Inscription"],
    progress: 100,
    animationFrames: quest1,
    rewards: [
      { type: "XP", name: "Experience", amount: 500, icon: <FaStar /> },
      { type: "Skill", name: "STEM Disciple", icon: <GiSolarSystem /> },
      { type: "Skill", name: "Python Spells", icon: <FaCode /> },
      { type: "Skill", name: "PE Buff", icon: <PiBoxingGloveFill /> }
    ],
    specialItem: "GCSE Scroll",
    specialItemFrames: special1,
    specialItemRarity: "Common",
  },
  {
    title: "A visit from the Linuxites",
    date: "2017",
    location: "Hampshire",
    description: "An unexpected encounter with a group called the Linuxites opens a new path. It's not easy, many spells are closed to you, but they claim they can show you a new and better way. They say their leader is a Warlock called Linus. He has mastery over the Open Source domain. Maybe I can learn from him...",
    icon: <PiLinuxLogoFill />,
    questType: "Linux Story Line",
    difficulty: "Easy",
    recommendedLevel: 15,
    recommendedSkills: ["CLI curses", "Freedom Fighter", "Oppose Window Imperialist", "Oppose MacOS Empire"],
    progress: 100,
    animationFrames: quest2,
    rewards: [
      { type: "XP", name: "Experience", amount: 2500, icon: <FaStar /> },
      { type: "Item", name: "Mastery of Terminal Buffs", icon: <FaBookOpen /> },
      { type: "Item", name: "Arcane Pi Spells", icon: <FaRaspberryPi /> },
      { type: "Skill", name: "Linux Loyalist", icon: <PiLinuxLogoFill /> },
    ],
    specialItem: "Raspberry Pi",
    specialItemFrames: special2,
    specialItemRarity: "Rare",
  },
  {
    title: "The Library Serpent",
    date: "2019",
    location: "Southampton",
    description: "You find yourself in the depths of the library after meeting several Linux Loyalists. They speak of a serpent that guards ancient knowledge. This serpent can create incantations that manipulate the fabric of reality. You must seek its wisdom to unlock new powers.",
    icon: <FaPython />,
    questType: "Coding Story Line",
    difficulty: "Easy",
    recommendedLevel: 12,
    recommendedSkills: ["Common Incantation Table", "Member of Wizards Guild", "Earthly Network Caster"],
    progress: 100,
    animationFrames: quest3,
    rewards: [
      { type: "XP", name: "Experience", amount: 1000, icon: <FaStar /> },
      { type: "Skill", name: "Interpreter Spells", icon: <FaBrain /> },
      { type: "Skill", name: "Lesser Incantation Mastery", icon: <FaLaptopCode /> },
    ],
    specialItem: "Tome of Py",
    specialItemFrames: special3,
    specialItemRarity: "Common",
  },
  {
    title: "The Mathematics Society",
    date: "2020",
    location: "Brockenhurst",
    description: "You have obtained the GCSE Scroll which has unlocked new spells and abilities. During celebrations with your fellow STEM disciples an ominous presence looms. 'Hello, young scholar. Meet me and my party outside - we are members of the Mathematics Society'. You finish your drink and step outside...",
    icon: <BiMath />,
    questType: "Main Story",
    difficulty: "Hard",
    recommendedLevel: 16,
    recommendedSkills: ["Strong STEM Curses", "Lesser Incantation Mastery", "Greater Tome Inscription"],
    progress: 100,
    animationFrames: quest4,
    rewards: [
      { type: "XP", name: "Experience", amount: 15000, icon: <FaStar /> },
      { type: "Item", name: "Improved Fashion Sense", icon: <GiClothes /> },
      { type: "Skill", name: "HP Incantation Table", icon: <GiLaptop /> },
      { type: "Skill", name: "Incantation Buff", icon: <FaCode /> },
      { type: "Skill", name: "Lesser Biology Spells", icon: <FaBiohazard /> },
    ],
    specialItem: "Tome of Mathematics",
    specialItemFrames: special4,
    specialItemRarity: "Rare",
  },
  {
    title: "Ancient Scriptures Recovered",
    date: "2020",
    location: "Brockenhurst",
    description: "You converse with a Wizard within the Mathematics Society casually. They mention an ancient scroll that they have been working on. The wizard claims that they've translated it into 'C#'. You enquire more. To understand the Wizards translation you secretly meet up with Windows Imperialists - the Linuxites best not see this...",
    icon: <PiFileCSharp />,
    questType: "Coding Story Line",
    difficulty: "Normal",
    recommendedLevel: 15,
    recommendedSkills: ["Good Incantation Mastery", "Tome of Py", "Incantation Table"],
    progress: 100,
    animationFrames: quest4,
    rewards: [
      { type: "XP", name: "Experience", amount: 1000, icon: <FaStar /> },
      { type: "Item", name: "VS Spell Buffs", icon: <GiClothes /> },
      { type: "Skill", name: "Lesser Tome of C", icon: <FaBook /> },
    ],
    specialItem: "OOP Spellbook",
    specialItemFrames: special4,
    specialItemRarity: "Rare",
  },
  {
    title: "Travels to the North",
    date: "2022",
    location: "Edinburgh",
    description: "You converse with a Wizard within the Mathematics Society casually. They mention an ancient scroll that they have been working on. The wizard claims that they've translated it into 'C#'. You enquire more. To understand the Wizards translation you secretly meet up with Windows Imperialists - the Linuxites best not see this...",
    icon: <PiFileCSharp />,
    questType: "Coding Story Line",
    difficulty: "Normal",
    recommendedLevel: 15,
    recommendedSkills: ["Good Incantation Mastery", "Tome of Py", "Incantation Table"],
    progress: 100,
    animationFrames: quest4,
    rewards: [
      { type: "XP", name: "Experience", amount: 1000, icon: <FaStar /> },
      { type: "Item", name: "VS Spell Buffs", icon: <GiClothes /> },
      { type: "Skill", name: "Lesser Tome of C", icon: <FaBook /> },
    ],
    specialItem: "OOP Spellbook",
    specialItemFrames: special4,
    specialItemRarity: "Rare",
  },
  {
    title: "A New Dawn",
    date: "2020",
    location: "Brockenhurst",
    description: "You converse with a Wizard within the Mathematics Society casually. They mention an ancient scroll that they have been working on. The wizard claims that they've translated it into 'C#'. You enquire more. To understand the Wizards translation you secretly meet up with Windows Imperialists - the Linuxites best not see this...",
    icon: <PiFileCSharp />,
    questType: "Coding Story Line",
    difficulty: "Normal",
    recommendedLevel: 15,
    recommendedSkills: ["Good Incantation Mastery", "Tome of Py", "Incantation Table"],
    progress: 100,
    animationFrames: quest4,
    rewards: [
      { type: "XP", name: "Experience", amount: 1000, icon: <FaStar /> },
      { type: "Item", name: "VS Spell Buffs", icon: <GiClothes /> },
      { type: "Skill", name: "Lesser Tome of C", icon: <FaBook /> },
    ],
    specialItem: "OOP Spellbook",
    specialItemFrames: special4,
    specialItemRarity: "Rare",
  },
  {
    title: "The Linuxites Return",
    date: "2020",
    location: "Brockenhurst",
    description: "You converse with a Wizard within the Mathematics Society casually. They mention an ancient scroll that they have been working on. The wizard claims that they've translated it into 'C#'. You enquire more. To understand the Wizards translation you secretly meet up with Windows Imperialists - the Linuxites best not see this...",
    icon: <PiFileCSharp />,
    questType: "Coding Story Line",
    difficulty: "Normal",
    recommendedLevel: 15,
    recommendedSkills: ["Good Incantation Mastery", "Tome of Py", "Incantation Table"],
    progress: 100,
    animationFrames: quest4,
    rewards: [
      { type: "XP", name: "Experience", amount: 1000, icon: <FaStar /> },
      { type: "Item", name: "VS Spell Buffs", icon: <GiClothes /> },
      { type: "Skill", name: "Lesser Tome of C", icon: <FaBook /> },
    ],
    specialItem: "OOP Spellbook",
    specialItemFrames: special4,
    specialItemRarity: "Rare",
  },
  {
    title: "Spell Assassin",
    date: "2020",
    location: "Brockenhurst",
    description: "You converse with a Wizard within the Mathematics Society casually. They mention an ancient scroll that they have been working on. The wizard claims that they've translated it into 'C#'. You enquire more. To understand the Wizards translation you secretly meet up with Windows Imperialists - the Linuxites best not see this...",
    icon: <PiFileCSharp />,
    questType: "Coding Story Line",
    difficulty: "Normal",
    recommendedLevel: 15,
    recommendedSkills: ["Good Incantation Mastery", "Tome of Py", "Incantation Table"],
    progress: 100,
    animationFrames: quest4,
    rewards: [
      { type: "XP", name: "Experience", amount: 1000, icon: <FaStar /> },
      { type: "Item", name: "VS Spell Buffs", icon: <GiClothes /> },
      { type: "Skill", name: "Lesser Tome of C", icon: <FaBook /> },
    ],
    specialItem: "OOP Spellbook",
    specialItemFrames: special4,
    specialItemRarity: "Rare",
  },
  {
    title: "Man For Hire",
    date: "2020",
    location: "Brockenhurst",
    description: "You converse with a Wizard within the Mathematics Society casually. They mention an ancient scroll that they have been working on. The wizard claims that they've translated it into 'C#'. You enquire more. To understand the Wizards translation you secretly meet up with Windows Imperialists - the Linuxites best not see this...",
    icon: <PiFileCSharp />,
    questType: "Coding Story Line",
    difficulty: "Normal",
    recommendedLevel: 15,
    recommendedSkills: ["Good Incantation Mastery", "Tome of Py", "Incantation Table"],
    progress: 100,
    animationFrames: quest4,
    rewards: [
      { type: "XP", name: "Experience", amount: 1000, icon: <FaStar /> },
      { type: "Item", name: "VS Spell Buffs", icon: <GiClothes /> },
      { type: "Skill", name: "Lesser Tome of C", icon: <FaBook /> },
    ],
    specialItem: "OOP Spellbook",
    specialItemFrames: special4,
    specialItemRarity: "Rare",
  },
  {
    title: "Archaic Incantation Table",
    date: "2020",
    location: "Brockenhurst",
    description: "You converse with a Wizard within the Mathematics Society casually. They mention an ancient scroll that they have been working on. The wizard claims that they've translated it into 'C#'. You enquire more. To understand the Wizards translation you secretly meet up with Windows Imperialists - the Linuxites best not see this...",
    icon: <PiFileCSharp />,
    questType: "Coding Story Line",
    difficulty: "Normal",
    recommendedLevel: 15,
    recommendedSkills: ["Good Incantation Mastery", "Tome of Py", "Incantation Table"],
    progress: 100,
    animationFrames: quest4,
    rewards: [
      { type: "XP", name: "Experience", amount: 1000, icon: <FaStar /> },
      { type: "Item", name: "VS Spell Buffs", icon: <GiClothes /> },
      { type: "Skill", name: "Lesser Tome of C", icon: <FaBook /> },
    ],
    specialItem: "OOP Spellbook",
    specialItemFrames: special4,
    specialItemRarity: "Rare",
  },
];


const difficultyColor: Record<Difficulty, string> = {
  "Trivial": "text-gray-600",
  "Easy": "text-green-600",
  "Normal": "text-blue-500",
  "Hard": "text-orange-500",
  "Heroic": "text-red-600",
};

const rarityColor: Record<Rarity, string> = {
  "Common": "text-gray-600",
  "Uncommon": "text-green-600",
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
                <h3 className="font-bold text-foreground text-right">Story Line</h3>
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
                      Rec. Traits
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
            <div className="flex flex-wrap justify-evenly gap-4 mt-2">
              {step.rewards.map(reward => (
                <div key={reward.name} className="flex items-center gap-2 p-2 rounded-md bg-yellow-100/50">
                  <div className="text-yellow-600 text-lg">{reward.icon}</div>
                  <p className="text-foreground font-semibold text-sm">{reward.name} {reward.amount && `+${reward.amount.toLocaleString()}`}</p>
                </div>
              ))}
            </div>
              <div className="mt-4">
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span className={`font-bold ${step.progress === 100 ? 'text-green-600' : 'text-cyan-600'}`}>
                    {step.progress === 100 ? "Completed" : "Active"}
                  </span>
                </div>
                <div className="w-full bg-black/20 rounded-full h-2 relative overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${step.progress === 100 ? 'bg-green-600' : 'bg-gradient-to-r from-cyan-400 to-purple-500'}`}
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

const QuestGridItem: FC<{ step: JourneyStep; onSelect: (step: JourneyStep) => void; }> = ({ step, onSelect }) => {
  const [ref] = useInView({ threshold: 0.3, triggerOnce: true });
  return (
    <div
      ref={ref}
      className="bg-gradient-to-br from-blue-200/20 to-purple-400/40 p-4 rounded-xl backdrop-blur-lg shadow-md cursor-pointer transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1"
      onClick={() => onSelect(step)}
    >
      <div className="flex flex-row items-center gap-4">
        <div className="bg-background/80 text-primary text-2xl p-3 rounded-lg border-2 border-primary/60">
          {step.icon}
        </div>
        <div className="flex-1">
        <p className="text-md text-background chango-regular-small knewave-shadow-xsmall">
          {step.title}
        </p>
        </div>
      </div>
      <div className="mt-3 text-right flex justify-between">
        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary/20 text-primary">
            {step.questType}
          </span>
          <p className="text-xs text-primary/80">
          Level {step.recommendedLevel} <span className={`${difficultyColor[step.difficulty]}`}>({step.difficulty})</span>
        </p>
      </div>
    </div>
  );
};

// const JourneyStepCard: FC<{
//   step: JourneyStep;
//   index: number;
//   onSelect: (step: JourneyStep) => void;
//   isTooltipVisible: boolean;
// }> = ({ step, index, onSelect, isTooltipVisible }) => {
//   const isRightSide = index % 2 !== 0;
//   const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });

//   const count = useMotionValue(0);
//   const rounded = useTransform(count, Math.round);

//   useEffect(() => {
//     if (inView) {
//       const animation = animate(count, step.progress, {
//         duration: 1.5,
//         ease: "easeOut",
//         delay: 0.5,
//       });
//       return () => animation.stop();
//     }
//   }, [inView, count, step.progress]);

//   return (
//     <div ref={ref} className="flex my-10 items-center">
//       <div
//         className="absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-background rounded-full border-4 border-primary flex items-center justify-center z-40"
//       >
//         <div className="text-primary text-xl">{step.icon}</div>
//       </div>
//       <div className={`w-1/2 ${isRightSide ? "pl-8" : "pr-8 ml-auto"}`}>
//         <TooltipProvider>
//           <Tooltip
//             open={isTooltipVisible}
//             delayDuration={100}
//           >
//             <TooltipTrigger asChild>
//               <div
//                 className="text-left bg-gradient-to-br from-blue-200/40 to-purple-300/50 p-4 rounded-xl backdrop-blur-lg shadow-md cursor-pointer transition-all duration-300 hover:brightness-90"
//                 onClick={() => onSelect(step)}
//               >
//                 <div className={`flex flex-col ${isRightSide ? 'items-start' : 'items-end'}`}>
//                   <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-primary/20 text-primary`}>{step.questType}</span>
//                   <h3 className="text-xl font-bold text-background knewave-shadow-small mt-1 chango-regular">{step.title}</h3>
//                   <p className="text-sm text-primary/80">{step.date} - {step.location}</p>
//                 </div>

//                 <div className="mt-4">
//                   <div className="flex justify-between items-center mb-1 text-xs">
//                     <span className={`font-bold ${step.progress === 100 ? 'text-green-400' : 'text-cyan-400'}`}>
//                       {step.progress === 100 ? "Completed" : "Active"}
//                     </span>
//                   </div>
//                   <div className="w-full bg-black/20 rounded-full h-2 relative overflow-hidden">
//                     <motion.div
//                       className={`h-full rounded-full ${step.progress === 100 ? 'bg-green-500' : 'bg-gradient-to-r from-cyan-400 to-purple-500'}`}
//                       initial={{ width: "0%" }}
//                       animate={{ width: inView ? `${step.progress}%` : "0%" }}
//                       transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
//                     />
//                     <div className="absolute inset-0 flex justify-center items-center">
//                       <motion.span className="text-white text-[10px] font-bold drop-shadow-sm">{rounded}</motion.span>
//                       <span className="text-white text-[10px] font-bold drop-shadow-sm">%</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </TooltipTrigger>
//             <TooltipContent><p>Click a quest to see details!</p></TooltipContent>
//           </Tooltip>
//         </TooltipProvider>
//       </div>
//     </div>
//   );
// };

// Replace your old JourneyStepCard and Journey function with this

function Journey() {
  const [selectedStep, setSelectedStep] = useState<JourneyStep | null>(null);
  const [activeTab, setActiveTab] = useState("All");

  const questTypes = ["All", ...Array.from(new Set(journeySteps.map(step => step.questType)))];

  const filteredQuests = activeTab === "All"
    ? journeySteps
    : journeySteps.filter(step => step.questType === activeTab);

  const handleSelectStep = (step: JourneyStep) => {
    setSelectedStep(step);
  };

  return (
    <div id="journey" className="py-10 mt-8">
      
      {/* --- TAB NAVIGATION --- */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {questTypes.map(type => (
          <Button
            key={type}
            onClick={() => setActiveTab(type)}
            variant={activeTab === type ? "default" : "outline"}
            className={`transition-all duration-200 ${activeTab === type ? 'shadow-lg shadow-primary/30' : ''}`}
          >
            {type}
          </Button>
        ))}
      </div>

      {/* --- QUEST GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {filteredQuests.map((step) => (
          <QuestGridItem
            key={step.title}
            step={step}
            onSelect={handleSelectStep}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedStep && (
          <QuestModal step={selectedStep} onClose={() => setSelectedStep(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Journey;