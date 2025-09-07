// CharacterSheet.tsx

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useEffect } from "react"; // Import useEffect and useMemo
import { FaReact, FaPython } from "react-icons/fa";
import { SiCplusplus, SiTypescript } from "react-icons/si";
import RadarChart from "./Radar.tsx";
import Attributes from "./Attributes.tsx";
import SpriteSheetAnimator from "../animation/SpriteSheetAnimator.tsx";
import Tooltip from "./ToolTip.tsx"; 
import { journeySteps } from './journey/journeyData';
import type { Rarity, Difficulty } from './journey/JourneyTypes'; 
import spriteSheet from '/src/animation/quests/me-5frame.png';

type FilterOption = {
  key: FilterStatus;
  label: string;
};

type FilterControlsProps = {
  filters: FilterOption[];
  currentFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
};

// --- Helper Objects for Dynamic Styling (Unchanged) ---
const rarityColors: Record<Rarity, { border: string, bg: string, text: string }> = {
    "Common": { border: "border-gray-400", bg: "bg-gray-500/20", text: "text-gray-300" },
    "Uncommon": { border: "border-green-500", bg: "bg-green-500/20", text: "text-green-400" },
    "Rare": { border: "border-blue-500", bg: "bg-blue-500/20", text: "text-blue-400" },
    "Epic": { border: "border-purple-500", bg: "bg-purple-500/20", text: "text-purple-400" },
    "Legendary": { border: "border-amber-500", bg: "bg-amber-500/20", text: "text-amber-400" },
};
const difficultyColors: Record<Difficulty, { border: string, bg: string, text: string }> = {
    "Trivial": { border: "border-gray-400", bg: "bg-gray-500/20", text: "text-gray-300" },
    "Easy": { border: "border-green-500", bg: "bg-green-500/20", text: "text-green-400" },
    "Normal": { border: "border-sky-500", bg: "bg-sky-500/20", text: "text-sky-400" },
    "Hard": { border: "border-orange-500", bg: "bg-orange-500/20", text: "text-orange-400" },
    "Heroic": { border: "border-red-500", bg: "bg-red-500/20", text: "text-red-400" },
    "Deadly": { border: "border-purple-600", bg: "bg-purple-600/20", text: "text-purple-400" },
};

const characterData = {
    name: "Toby Chen",
    title: "Mathematician & Programmer",
    level: 21, 
    alignment: "Lawful Good",
    types: [
      { icon: <FaReact />, name: "React" }, 
      { icon: <FaPython />, name: "Python" }, 
      { icon: <SiTypescript />, name: "TypeScript" }, 
      { icon: <SiCplusplus />, name: "C++" }
    ],
    description: "3rd year Pure Mathematics student at Queen Mary University of London. Growing programmer, math practitioner. Aspiring to obtain job that uses mathematical and programming skills.",
    baseStats: [
      { id: "head", label: "Intelligence", value: "Pure Mathematics Fanatic", barPercentage: "90%" }, 
      { id: "arm-right", label: "Power", value: "Athlete", barPercentage: "60%" }, 
      { id: "chest", label: "Core", value: "Programmer", barPercentage: "70%" }, 
      { id: "legs", label: "Foundation", value: "Mathematician", barPercentage: "80%" }, 
      { id: "projects", label: "Stamina", value: "Growing portfolio", barPercentage: "50%" },
    ],
    xp: 2316,
    xpToNextLevel: 10000,
};

type CharacterSheetView = 'base' | 'attributes' | 'radar' | 'special-items' | 'rare-encounters';
type FilterStatus = 'all' | 'achieved' | 'in-progress'; // New type for our filter

function CharacterSheet() {
  const [view, setView] = useState<CharacterSheetView>('special-items');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  useEffect(() => {
    setFilterStatus('all');
  }, [view]);

    const itemFilters: FilterOption[] = [
    { key: 'all', label: 'All' },
    { key: 'achieved', label: 'Obtained' },
    { key: 'in-progress', label: 'In Progress' },
  ];

    const encounterFilters: FilterOption[] = [
    { key: 'all', label: 'All' },
    { key: 'achieved', label: 'Completed' }, 
    { key: 'in-progress', label: 'Uncompleted' }, 
  ];

  const filteredQuests = useMemo(() => {
    const allStartedQuests = journeySteps.filter(j => j.progress > 0);
    switch (filterStatus) {
      case 'achieved':
        return allStartedQuests.filter(j => j.progress === 100);
      case 'in-progress':
        return allStartedQuests.filter(j => j.progress > 0 && j.progress < 100);
      case 'all':
      default:
        return allStartedQuests;
    }
  }, [filterStatus]);

  const FilterControls = ({ filters, currentFilter, onFilterChange }: FilterControlsProps) => (
    <div className="flex items-center gap-2 mb-4">
      {filters.map(filter => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`py-1 px-3 text-xs font-semibold rounded-full transition-colors duration-200 ${
            currentFilter === filter.key
              ? 'bg-primary/80 text-background'
              : 'bg-background/50 text-foreground/70 hover:bg-primary/20'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );

  return (
    <motion.div 
        className="relative flex flex-col md:flex-row w-full max-w-6xl mx-auto gap-0 my-12 bg-gradient-to-br from-blue-200/40 to-purple-300/50 backdrop-blur-lg rounded-2xl shadow-md overflow-hidden pb-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
    >
      <div className="flex flex-col md:flex-row w-full">
        {/* Left Column */}
        <div className="w-full md:w-1/3 p-4 flex items-center justify-center">
          <div className="flex flex-col mt-8 gap-8 w-full max-w-xs sm:max-w-sm">
            <div className="pt-8 bg-gradient-to-r from-rose-300 via-violet-300 to-purple-300 gradient-border border-4 border-foreground rounded-lg flex justify-center items-center">
              <SpriteSheetAnimator spriteSheet={spriteSheet} frameCount={5} frameWidth={96} frameHeight={96} fps={3} />
            </div>
            <div className="bg-background/60 backdrop-blur-sm p-4 rounded-lg text-center">
                <p className="text-xl sm:text-2xl font-bold text-foreground drop-shadow-sm mb-4">Toby Chen</p>
                <div className="mt-1 text-xs sm:text-sm font-semibold">
                  <div className="gap-2 flex flex-col sm:flex-row justify-center">
                      <span className="bg-primary/20 text-foreground px-3 py-1 border-2 border-foreground rounded-xl flex justify-center">Lv. {characterData.level} Arch Linux Loyalist</span>
                      <span className="bg-green-500/20 border-2 border-green-800/50 text-green-800 px-3 py-1 rounded-xl flex justify-center">{characterData.alignment}</span>
                  </div>
                  <p className="bg-primary/20 border-2 border-primary/50 text-primary px-3 py-1 rounded-xl mt-2">Member of Thinkpad Guild</p>
                </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-2/3 p-6 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-4">
            <div className="text-center sm:text-left">
              <h2 className="text-2xl sm:text-4xl font-bold text-foreground">{characterData.name}</h2>
              <p className="text-primary font-semibold">{characterData.title}</p>
            </div>
            <div className="flex flex-wrap justify-center sm:justify-end gap-2 text-xl sm:text-2xl">
              {characterData.types.map(type => <div key={type.name} className="px-3 py-2 sm:px-4 bg-primary/90 rounded-md text-background flex items-center justify-center" title={type.name}>{type.icon}</div>)}
            </div>
          </div>

          <p className="text-foreground/90 mb-6 text-center sm:text-left text-sm sm:text-base">{characterData.description}</p>
          
          {/* Main Tabs */}
          <div className="flex flex-wrap gap-2 sm:gap-4 mb-4">
            {[{ key: 'special-items', label: 'Special Items' }, { key: 'rare-encounters', label: 'Rare Encounters' }, { key: 'base', label: 'Base Stats' }, { key: 'attributes', label: 'Attributes' }, { key: 'radar', label: 'Skill Radar' }].map(tab => (
              <button key={tab.key} onClick={() => setView(tab.key as CharacterSheetView)} className={`py-2 px-4 text-sm sm:text-base font-semibold rounded-md transition-all duration-200 ease-in-out ${view === tab.key ? 'bg-background text-foreground shadow-md' : 'text-primary hover:bg-primary/90 hover:text-background bg-background/50'}`}>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Dynamic Content */}
          <div className="min-h-[300px] sm:min-h-[350px] flex-grow flex flex-col justify-start bg-background/40 rounded-lg p-4 sm:p-8">
            <AnimatePresence mode="wait">
              {view === 'base' && ( <motion.div key="base" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="space-y-4"> {characterData.baseStats.map((stat) => ( <div key={stat.id} className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center text-left"> <p className="font-bold text-foreground/90">{stat.label}</p> <div className="sm:col-span-2"> <p className="text-foreground font-semibold text-xs sm:text-sm mb-1">{stat.value}</p> <div className="w-full bg-background/50 rounded-full h-2.5"> <motion.div className="bg-primary h-2.5 rounded-full" initial={{ width: "0%" }} animate={{ width: stat.barPercentage }} transition={{ duration: 1, ease: "circOut", delay: 0.5 }} /> </div> </div> </div> ))} </motion.div> )}
              {view === 'attributes' && <motion.div key="attributes" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}><Attributes /></motion.div>}
              {view === 'radar' && <motion.div key="radar" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}><RadarChart /></motion.div>}

              {view === 'special-items' && (
                <motion.div key="special-items" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold text-foreground">Collected Items</h3>
                    </div>
                          <FilterControls 
                            filters={itemFilters} 
                            currentFilter={filterStatus} 
                            onFilterChange={setFilterStatus} 
                          />
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-background/30">
                        {filteredQuests.length > 0 ? (
                            filteredQuests.map((journey) => (
                                <Tooltip key={journey.title} content={ <> <p className={`font-bold text-sm ${rarityColors[journey.specialItemRarity].text}`}>{journey.specialItem}</p> <p className="font-semibold">{journey.specialItemRarity}</p> <hr className="my-1 border-foreground/20" /> <p><span className="font-semibold">Source:</span> {journey.title}</p> <p><span className="font-semibold">Found:</span> {journey.location}</p> <p><span className="font-semibold">Req. Lvl:</span> {journey.recommendedLevel}</p> </> }>
                                    <div tabIndex={0} className="outline-none cursor-pointer">
                                        <div className={`aspect-square p-2 rounded-lg border-2 transition-all duration-300 ${rarityColors[journey.specialItemRarity].border} ${rarityColors[journey.specialItemRarity].bg} hover:scale-105 hover:shadow-lg focus:scale-105 focus:shadow-lg`}>
                                            <SpriteSheetAnimator {...journey.specialItemFrames} />
                                        </div>
                                    </div>
                                </Tooltip>
                            ))
                        ) : (
                            <p className="col-span-full text-center text-foreground/70 py-8">No items match this filter.</p>
                        )}
                    </div>
                </motion.div>
              )}
              {view === 'rare-encounters' && (
                <motion.div key="rare-encounters" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                    <h3 className="text-xl font-bold text-foreground mb-4">Encounter Log</h3>
                      <FilterControls 
                        filters={encounterFilters} 
                        currentFilter={filterStatus} 
                        onFilterChange={setFilterStatus} 
                      />
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-background/30">
                        {filteredQuests.length > 0 ? (
                          filteredQuests.map((journey) => (
                           <Tooltip key={journey.title} content={ <> <p className={`font-bold text-sm ${difficultyColors[journey.difficulty].text}`}>{journey.title}</p> <p className="font-semibold">{journey.difficulty}</p> <hr className="my-1 border-foreground/20" /> <p><span className="font-semibold">Location:</span> {journey.location}</p> <p><span className="font-semibold">Req. Lvl:</span> {journey.recommendedLevel}</p> </> }>
                                <div tabIndex={0} className="outline-none cursor-pointer">
                                    <div className={`aspect-square p-2 rounded-lg border-2 transition-all duration-300 ${difficultyColors[journey.difficulty].border} ${difficultyColors[journey.difficulty].bg} hover:scale-105 hover:shadow-lg focus:scale-105 focus:shadow-lg`}>
                                        <SpriteSheetAnimator {...journey.animationFrames} />
                                    </div>
                                </div>
                           </Tooltip>
                          ))
                        ) : (
                           <p className="col-span-full text-center text-foreground/70 py-8">No encounters match this filter.</p>
                        )}
                    </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      {/* XP Bar */}
      <div className="absolute bottom-0 left-0 w-full p-4 sm:px-6 sm:py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm font-semibold text-foreground/80 mb-1 px-1 gap-1">
          <span>Experience</span>
          <span>{characterData.xp.toLocaleString()} / {characterData.xpToNextLevel.toLocaleString()}</span>
        </div>
        <div className="w-full bg-background/50 rounded-full h-3">
          <motion.div 
            className="bg-gradient-to-r from-cyan-400 to-purple-500 h-3 rounded-full"
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