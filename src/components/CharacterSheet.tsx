import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaReact, FaPython } from "react-icons/fa";
import { SiCplusplus, SiTypescript } from "react-icons/si";
import RadarChart from "./Radar.tsx";
import Attributes from "./Attributes.tsx";
import SpriteSheetAnimator from "../animation/SpriteSheetAnimator.tsx";

import spriteSheet from '/src/animation/quests/me-5frame.png';

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

function CharacterSheet() {
  const [view, setView] = useState<'base' | 'attributes' | 'radar'>('base');

  return (
    <motion.div 
        className="relative flex flex-col md:flex-row w-full max-w-6xl mx-auto gap-0 my-12 bg-gradient-to-br from-blue-200/40 to-purple-300/50 backdrop-blur-lg rounded-2xl shadow-md overflow-hidden pb-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
    >
      <div className="flex flex-col md:flex-row w-full">
        <div className="w-full md:w-1/3 p-4 flex items-center justify-center">
          <div className="flex flex-col mt-8 gap-8">
            <div className="pt-8 bg-gradient-to-r from-rose-300 via-violet-300 to-purple-300 gradient-border border-4 border-foreground rounded-lg filter flex justify-center items-center">
              <SpriteSheetAnimator
                spriteSheet={spriteSheet}
                frameCount={5}
                frameWidth={96}
                frameHeight={96}
                fps={3}
              />
              
            </div>
            <div className="bottom-4 left-4 right-4 bg-background/60 backdrop-blur-sm p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-foreground drop-shadow-sm mb-8">
                    Toby Chen
                </p>
                <div className="mt-1 text-sm font-semibold">
                  <div className=" gap-2 flex justify-center">
                      <span className="bg-primary/20 text-foreground px-3 py-1 border-2 border-foreground rounded-xl items-center flex">
                          Lv. {characterData.level} Arch Linux Loyalist
                      </span>
                      <span className="bg-green-500/20 border-2 border-green-800/50 text-green-800 px-3 py-1 rounded-xl items-center flex">
                          {characterData.alignment}
                      </span>
                  </div>
                  <div>
                  <p 
                    className="bg-primary/20 border-2 border-primary/50 text-primary px-3 py-1 rounded-xl mt-2">  
                      Member of Thinkpad Guild
                    </p>
                  </div>
                </div>
            </div>
          </div>
        </div>

        {/* Right Column (Info) */}
        <div className="w-full md:w-2/3 p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-4xl font-bold text-foreground text-left">
                {characterData.name}
              </h2>
                <p className="text-primary font-semibold text-left">
                  {characterData.title}
                </p>
            </div>
            <div className="flex gap-2 text-2xl">
              {characterData.types.map(type=>
                <div 
                  key={type.name} 
                  className="px-4 py-2 bg-primary/90 rounded-md text-background" 
                  title={type.name}>{type.icon}
                </div>)}
            </div>
          </div>
          <p className="text-foreground/90 mb-6">
            {characterData.description}
          </p>

          <div className="flex gap-4 mb-4">
            <button 
              onClick={() => setView('base')} 
              className={`py-2 px-4 font-semibold rounded-md transition-all duration-200 ease-in-out ${view === 'base' ? 'bg-background text-foreground shadow-md' : 'text-primary hover:bg-primary/90 hover:text-background bg-background/50'}`}
            >
              Base Stats
            </button>
            <button 
              onClick={() => setView('attributes')} 
              className={`py-2 px-4 font-semibold rounded-md transition-all duration-200 ease-in-out ${view === 'attributes' ? 'bg-background text-foreground shadow-md' : 'text-primary hover:bg-primary/90 hover:text-background bg-background/50'}`}
            >
              Attributes
            </button>
            <button 
              onClick={() => setView('radar')} 
              className={`py-2 px-4 font-semibold rounded-md transition-all duration-200 ease-in-out ${view === 'radar' ? 'bg-background text-foreground shadow-md' : 'text-primary hover:bg-primary/90 hover:text-background bg-background/50'}`}
            >
              Skill Radar
            </button>
          </div>

          <div 
            className="min-h-[350px] flex-grow flex flex-col justify-center bg-background/40 rounded-lg p-8"
          >
            <AnimatePresence mode="wait">
              {view === 'base' && ( 
                <motion.div 
                  key="base" 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -20 }} 
                  transition={{ duration: 0.3 }} 
                  className="space-y-4">
                    {characterData.baseStats.map((stat) => ( 
                      <div 
                        key={stat.id} 
                        className="grid grid-cols-3 gap-2 items-center text-left">
                        <p className="font-bold text-foreground/90">{stat.label}</p>
                        <div className="col-span-2">
                          <p className="text-foreground font-semibold text-sm mb-1">{stat.value}</p>
                          <div className="w-full bg-background/50 rounded-full h-2.5">
                              <motion.div className="bg-primary h-2.5 rounded-full" initial={{ width: "0%" }} animate={{ width: stat.barPercentage }} transition={{ duration: 1, ease: "circOut", delay: 0.5 }}/>
                            </div>
                          </div>
                        </div> 
                      )
                    )
                  }
                </motion.div> 
              )}
              {view === 'attributes' && ( <motion.div key="attributes" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}> <Attributes /> </motion.div> )}
              {view === 'radar' && ( <motion.div key="radar" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}> <RadarChart /> </motion.div> )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      {/* CHANGE #2: Position the XP bar absolutely at the bottom */}
      <div className="absolute bottom-0 left-0 w-full p-4 md:px-6 md:py-4">
        <div className="flex justify-between items-center text-sm font-semibold text-foreground/80 mb-1 px-1">
          <span>Experience</span>
          <span>{characterData.xp.toLocaleString()} / {characterData.xpToNextLevel.toLocaleString()}</span>
        </div>
        <div className="w-full bg-background/50 rounded-full h-3.5">
          <motion.div 
            className="bg-gradient-to-r from-cyan-400 to-purple-500 h-3.5 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${(characterData.xp / characterData.xpToNextLevel) * 100}%` }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default CharacterSheet;