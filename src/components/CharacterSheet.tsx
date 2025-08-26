import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { FaReact, FaNodeJs, FaPython, FaPrescription } from "react-icons/fa";
import { SiCplusplus, SiTypescript } from "react-icons/si";
import RadarChart from "./Radar.tsx";
import SpriteAnimator from "./SpriteAnimator.tsx";
import Attributes from "./Attributes.tsx";

import me1 from '/src/assets/me/ani/me1.png';
import me2 from '/src/assets/me/ani/me2.png';
import me3 from '/src/assets/me/ani/me3.png';
import me4 from '/src/assets/me/ani/me4.png';
import me5 from '/src/assets/me/ani/me5.png';

const animationFrames = [me1, me2, me3, me4, me5];

const characterData = {
    name: "Toby Chen",
    title: "Mathematician & Programmer",
    level: 21, 
    alignment: "Lawful Good",
    types: [{ icon: <FaReact />, name: "React" }, { icon: <FaPython />, name: "Python" }, { icon: <SiTypescript />, name: "TypeScript" }, { icon: <SiCplusplus />, name: "C++" }],
    description: "3rd year Pure Mathematics student at Queen Mary  University of London. Growing programmer, math practitioner. Aspiring to obtain job that uses mathematical and programming skills.",
    baseStats: [
      { id: "head", label: "Intelligence", value: "Pure Mathematics Fanatic", barPercentage: "90%", targetPosition: { top: "30%", left: "50%" } }, 
      { id: "arm-right", label: "Power", value: "Athlete", barPercentage: "60%", targetPosition: { top: "60%", left: "20%" } }, 
      { id: "chest", label: "Core", value: "Programmer", barPercentage: "70%", targetPosition: { top: "70%", left: "50%" } }, { id: "legs", label: "Foundation", value: "Mathematician", barPercentage: "80%", targetPosition: { top: "70%", left: "70%" } }, { id: "projects", label: "Stamina", value: "Growing portfolio", barPercentage: "50%", targetPosition: { top: "60%", left: "70%" } },
    ],
    xp: 7500,
    xpToNextLevel: 10000,
};

const TargetReticule = ({ position }: { position: { top: string; left: string } }) => (
    <motion.div 
      className="absolute w-8 h-8 rounded-full border-2 border-primary bg-primary/30 pointer-events-none" 
      style={{...position}} 
      initial={{scale:0.5,opacity:0}} 
      animate={{scale:1,opacity:1}} 
      exit={{scale:0.5,opacity:0}} 
      transition={{type:"spring",stiffness:400,damping:20}}/>
);

function CharacterSheet() {
  const [view, setView] = useState<'base' | 'attributes' | 'radar'>('base');
  const [highlightedStatId, setHighlightedStatId] = useState<string | null>(null);
  const highlightedStat = characterData.baseStats.find(s => s.id === highlightedStatId);

  return (
    <motion.div 
        className="flex flex-col md:flex-row w-full max-w-6xl mx-auto gap-0 my-12 bg-gradient-to-br from-blue-200/40 to-purple-300/50 backdrop-blur-lg rounded-2xl shadow-md overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
    >
      <div className="relative w-full md:w-1/3 h-[500px] p-4 flex items-center justify-center">


        <div className="flex flex-col mt-8 gap-8">
          <SpriteAnimator 
            images={animationFrames} 
            fps={3} 
            className="object-contain filter drop-shadow-[0_0_15px_rgba(192,132,252,0.4)] w-full h-full bg-gradient-to-r from-rose-300 via-violet-300 to-purple-300 gradient-border border-4 border-foreground rounded-lg"
          />

          {/* Character MMORPG Stats */}
          <div className="bottom-4 left-4 right-4 bg-background/70 backdrop-blur-sm p-3 rounded-lg text-center">
              <p className="text-2xl font-bold text-foreground drop-shadow-sm mb-8">
                  Toby Chen
              </p>
              <div className="mt-1 text-sm font-semibold">
                <div className=" gap-2 flex justify-center">
                    <span className="bg-primary/20 text-foreground px-3 py-1 border-2 border-foreground rounded-xl">
                        Lv. {characterData.level} Alchemist & Artificer
                    </span>
                    <span className="bg-green-500/20 border-2 border-green-800/50 text-green-800 px-3 py-1 rounded-xl">
                        {characterData.alignment}
                    </span>
                </div>
                <div>
                <p 
                  className="bg-primary/20 border-2 border-primary/50 text-primary px-3 py-1 rounded-xl mt-2">  
                    0 Rebirths
                  </p>
                </div>
              </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-2/3 p-6 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div><h2 className="text-4xl font-bold text-foreground">{characterData.name}</h2><p className="text-primary font-semibold">{characterData.title}</p></div>
          <div className="flex gap-3 text-2xl">{characterData.types.map(type=><div key={type.name} className="p-2 bg-primary rounded-md text-primary-foreground" title={type.name}>{type.icon}</div>)}</div>
        </div>
        <p className="text-foreground/90 mb-6">"{characterData.description}"</p>
        
        <div className="flex gap-2 mb-4">
          <button onClick={() => setView('base')} className={`py-2 px-4 font-semibold rounded-md transition-colors ${view === 'base' ? 'bg-background text-foreground shadow-md' : 'text-primary hover:bg-background/50'}`}>Base Stats</button>
          <button onClick={() => setView('attributes')} className={`py-2 px-4 font-semibold rounded-md transition-colors ${view === 'attributes' ? 'bg-background text-foreground shadow-md' : 'text-primary hover:bg-background/50'}`}>Attributes</button>
          <button onClick={() => setView('radar')} className={`py-2 px-4 font-semibold rounded-md transition-colors ${view === 'radar' ? 'bg-background text-foreground shadow-md' : 'text-primary hover:bg-background/50'}`}>Skill Radar</button>
        </div>

        <div className="min-h-[350px] flex-grow flex flex-col justify-center bg-background/30 rounded-lg p-4">
          <AnimatePresence mode="wait">
            {view === 'base' && ( <motion.div key="base" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="space-y-4">{characterData.baseStats.map((stat) => ( <div key={stat.id} className="grid grid-cols-3 gap-2 items-center text-left" onMouseEnter={() => setHighlightedStatId(stat.id)} onMouseLeave={() => setHighlightedStatId(null)}>
                {/* THEME UPDATE */}
                <p className="font-bold text-foreground/80">{stat.label}</p>
                <div className="col-span-2">
                    <p className="text-foreground font-semibold text-sm mb-1">{stat.value}</p>
                    <div className="w-full bg-background/50 rounded-full h-2.5"><motion.div className="bg-primary h-2.5 rounded-full" initial={{ width: "0%" }} animate={{ width: stat.barPercentage }} transition={{ duration: 1, ease: "circOut", delay: 0.5 }}/></div>
                </div>
            </div> ))}</motion.div> )}
            {view === 'attributes' && ( <motion.div key="attributes" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}> <Attributes /> </motion.div> )}
            {view === 'radar' && ( <motion.div key="radar" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}> <RadarChart /> </motion.div> )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default CharacterSheet;