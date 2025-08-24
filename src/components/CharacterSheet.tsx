import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
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
    title: "Full-Stack Developer",
    level: 28, // Added level
    alignment: "Lawful Good", // Added alignment
    types: [{ icon: <FaReact />, name: "React" }, { icon: <FaNodeJs />, name: "Node.js" }, { icon: <SiTypescript />, name: "TypeScript" },],
    description: "A developer with a passion for creating engaging and interactive web applications. Constantly learning and striving to improve.",
    baseStats: [{ id: "head", label: "Intelligence", value: "Creative Problem Solving", barPercentage: "90%", targetPosition: { top: "12%", left: "23%" } }, { id: "arm-right", label: "Power", value: "Frontend Development", barPercentage: "95%", targetPosition: { top: "45%", left: "28%" } }, { id: "chest", label: "Core", value: "Backend & DevOps", barPercentage: "85%", targetPosition: { top: "35%", left: "23%" } }, { id: "legs", label: "Foundation", value: "3+ Years Experience", barPercentage: "80%", targetPosition: { top: "70%", left: "24%" } }, { id: "projects", label: "Stamina", value: "40+ Projects Completed", barPercentage: "98%", targetPosition: { top: "55%", left: "20%" } },],
};

const TargetReticule = ({ position }: { position: { top: string; left: string } }) => (
    // THEME UPDATE
    <motion.div className="absolute w-8 h-8 rounded-full border-2 border-primary bg-primary/30 pointer-events-none" style={{...position}} initial={{scale:0.5,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.5,opacity:0}} transition={{type:"spring",stiffness:400,damping:20}}/>
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
        <div className="absolute top-4 left-4 flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-white/50"><div className="w-full h-full rounded-full bg-red-500 animate-ping"/></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400 border-2 border-white/50"/>
            <div className="w-3 h-3 rounded-full bg-green-400 border-2 border-white/50"/>
        </div>

        <SpriteAnimator images={animationFrames} fps={3} className="h-full object-contain filter drop-shadow-[0_0_15px_rgba(192,132,252,0.4)]"/>

        <div className="absolute bottom-4 left-4 right-4 bg-background/50 backdrop-blur-sm p-3 rounded-lg border border-primary/20 text-center">
            <p className="text-2xl font-bold text-foreground drop-shadow-sm">
                {characterData.name}
            </p>
            <div className="flex justify-center gap-3 mt-1">
                <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    Lv. {characterData.level} Background Character
                </span>
                <span className="bg-primary/20 border border-primary/50 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                    {characterData.alignment}
                </span>
            </div>
        </div>

        <AnimatePresence>
          {highlightedStat && view === 'base' && <TargetReticule position={highlightedStat.targetPosition} />}
        </AnimatePresence>
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