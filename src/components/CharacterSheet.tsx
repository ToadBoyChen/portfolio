// CharacterSheet.tsx

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, type FC, type ReactNode, Fragment } from "react";
import { FaReact, FaPython } from "react-icons/fa";
import { SiCplusplus, SiTypescript } from "react-icons/si";
import { FiCheck, FiChevronDown } from "react-icons/fi";
import { Listbox, Transition } from '@headlessui/react';
import SkillRadar from "./Radar.tsx";
import Attributes from "./Attributes.tsx";
import ActivityFeed from "./ActivityFeed.tsx";
import SpriteSheetAnimator from "../animation/SpriteSheetAnimator.tsx";
import Tooltip from "./ToolTip.tsx";
import { journeySteps } from './journey/journeyData';
import type { Rarity, Difficulty, JourneyStep } from './journey/JourneyTypes';
import spriteSheet from '/src/animation/quests/me-5frame.png';
import { useMediaQuery } from "./useMediaQuery.tsx"; // Adjust path as needed
import InteractivePaneGroup from "./InteractivePaneGroup.tsx"; // Adjust path as needed

type FilterStatus = 'all' | 'achieved' | 'in-progress';
type LogbookViewType = 'items' | 'encounters';

// --- Data (Unchanged) ---
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
    types: [{ icon: <FaReact />, name: "React" }, { icon: <FaPython />, name: "Python" }, { icon: <SiTypescript />, name: "TypeScript" }, { icon: <SiCplusplus />, name: "C++" }],
    description: "3rd year Pure Mathematics student at Queen Mary University of London. Growing programmer, math practitioner. Aspiring to obtain job that uses mathematical and programming skills.",
    baseStats: [
        { id: "head", label: "Intellect", value: "Pure Mathematics Fanatic", barPercentage: 90 },
        { id: "arm-right", label: "Power", value: "Athlete", barPercentage: 60 },
        { id: "chest", label: "Core", value: "Programmer", barPercentage: 70 },
        { id: "legs", label: "Foundation", value: "Mathematician", barPercentage: 80 },
        { id: "projects", label: "Stamina", value: "Growing portfolio", barPercentage: 50 },
        { id: "social", label: "Charisma", value: "Team Player", barPercentage: 65 },
    ],
    xp: 2316,
    xpToNextLevel: 10000,
};

interface ResponsiveFilterOption<T extends string> {
    value: T;
    label: string;
    colorClass?: string;
}

interface ResponsiveFilterControlsProps<T extends string> {
    options: readonly ResponsiveFilterOption<T>[];
    currentValue: T;
    onValueChange: (value: T) => void;
    isMdScreen: boolean;
    groupLabel?: string; 
    className?: string;
}

const ResponsiveFilterControls = <T extends string>({ options, currentValue, onValueChange, isMdScreen, groupLabel, className = "" }: ResponsiveFilterControlsProps<T>) => {
    if (isMdScreen) {
        const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } } };
        const itemVariants = { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } };
        return (
            <div className={className}>
                {groupLabel && <p className="text-xs font-semibold text-foreground/60 mb-2">{groupLabel}</p>}
                <motion.div className="flex items-center flex-wrap gap-2" variants={containerVariants} initial="hidden" animate="visible">
                    {options.map(option => (
                        <motion.button
                            key={option.value}
                            onClick={() => onValueChange(option.value)}
                            className={`relative py-1.5 px-4 text-xs font-bold rounded-full transition-all duration-200 flex items-center gap-2 capitalize
                              ${currentValue === option.value
                                    ? 'bg-primary text-background shadow-md shadow-primary/30'
                                    : 'bg-white/5 text-foreground/70 ring-1 ring-inset ring-white/10 hover:bg-white/10 hover:text-foreground'
                                }`}
                            variants={itemVariants}
                        >
                            {option.colorClass && <span className={`block w-2 h-2 rounded-full ${option.colorClass}`} />}
                            {option.label}
                        </motion.button>
                    ))}
                </motion.div>
            </div>
        );
    }
    const currentOption = options.find(opt => opt.value === currentValue);
    return (
        <div className={`w-full ${className}`}>
            <Listbox value={currentValue} onChange={onValueChange}>
                <div className="relative">
                    <Listbox.Button className="relative w-full cursor-pointer rounded-lg py-2 pl-3 pr-10 text-left shadow-md ring-1 ring-inset ring-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary text-xs text-foreground bg-background/80">
                        <span className="block truncate capitalize font-bold text-foreground/90">
                            {currentOption?.label ?? 'Select'}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"><FiChevronDown className="h-5 w-5 text-foreground/70" /></span>
                    </Listbox.Button>
                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-background/80 backdrop-blur-sm py-1 text-xs shadow-lg ring-1 ring-white/10 focus:outline-none sm:text-sm">
                            {options.map((option) => (
                                <Listbox.Option key={option.value} className={({ active }) => `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-primary/20' : ''}`} value={option.value}>
                                    {({ selected }) => (
                                        <div className="flex items-center gap-3">
                                            <span className={`flex-grow block truncate capitalize ${selected ? 'font-bold text-primary' : 'font-normal text-foreground'}`}>{option.label}</span>
                                            {selected && <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary"><FiCheck className="h-5 w-5" /></span>}
                                        </div>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
};


interface LogbookViewProps { items: JourneyStep[]; renderItem: (item: JourneyStep) => ReactNode; emptyText: string; }
const LogbookView: FC<LogbookViewProps> = ({ items, renderItem, emptyText }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4 max-h-60 sm:max-h-80 overflow-y-auto pr-2 mt-4 scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-background/30">
        {items.length > 0 ? items.map(item => renderItem(item)) : <p className="col-span-full text-center text-foreground/70 py-8">{emptyText}</p>}
    </div>
);

const GradientKeyframes: FC = () => (
  <style>
    {`
      @keyframes gradient-pan {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
    `}
  </style>
);

const CharacterProfile: FC = () => {
    const tags = [
        { 
            label: `Lv. ${characterData.level}`, 
            gradient: 'bg-gradient-to-r from-amber-400 via-orange-500 to-red-500' 
        },
        { 
            label: characterData.alignment, 
            gradient: 'bg-gradient-to-r from-green-400 to-emerald-500' 
        },
        { 
            label: 'Thinkpad Guild', 
            gradient: 'bg-gradient-to-r from-sky-400 to-cyan-400' 
        },
        { 
            label: 'Arch Linux Loyalist', 
            gradient: 'bg-gradient-to-r from-blue-500 to-indigo-600' 
        },
        { 
            label: 'Advanced Trader', 
            gradient: 'bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500' 
        },
    ];
    const baseTagStyle = `
        py-1.5 px-4 rounded-full text-white text-xs font-semibold shadow-md
        transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg
        bg-[size:200%_auto]
    `;

    return (
        <div className="p-2 sm:p-4 flex-shrink-0 flex items-center justify-center">
            <GradientKeyframes />

            <div className="flex flex-col gap-4 w-full max-w-xs mx-auto">
                <div 
                    className="relative bg-gradient-to-r from-rose-300 via-violet-300 to-purple-300 p-1 rounded-lg 
                               shadow-xl shadow-purple-500/20 transition-all duration-300 
                               hover:shadow-purple-400/40 hover:scale-105 overflow-hidden aspect-square"
                >
                    <div className="bg-background/80 rounded-lg flex justify-center items-center aspect-square">
                        <SpriteSheetAnimator 
                            spriteSheet={spriteSheet} 
                            frameCount={5} 
                            frameWidth={96} 
                            frameHeight={96} 
                            fps={3} 
                        />
                    </div>
                </div>

                <div className="bg-background/60 backdrop-blur-sm p-4 rounded-lg text-center ring-1 ring-inset ring-white/10">
                    <p className="text-xl sm:text-2xl font-bold text-foreground drop-shadow-sm">
                        {characterData.name}
                    </p>
                    <p className="text-primary font-medium text-sm sm:text-base -mt-1 mb-4">
                        {characterData.title}
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-2">
                        {tags.map((tag, index) => (
                            <span 
                                key={index} 
                                className={`${baseTagStyle} ${tag.gradient}`}
                                style={{ animation: 'gradient-pan 3s ease infinite' }}
                            >
                                {tag.label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const XpBarKeyframes: FC = () => (
  <style>
    {`
      @keyframes shimmer-pan {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(100%);
        }
      }
    `}
  </style>
);

interface AnimatedXpBarProps {
  currentXp: number;
  maxXp: number;
}

const AnimatedXpBar: FC<AnimatedXpBarProps> = ({ currentXp, maxXp }) => {
  const percentage = (currentXp / maxXp) * 100;

  return (
    <>
      <XpBarKeyframes />
      <div className="left-0 w-full p-4 sm:px-6 sm:py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm font-semibold text-foreground/80 mb-1 px-1 gap-1">
            <span>Experience</span>
            <span>{currentXp.toLocaleString()} / {maxXp.toLocaleString()}</span>
        </div>
        <div className="w-full bg-background/50 rounded-full h-3 overflow-hidden shadow-inner">
            <motion.div
                className="relative h-full rounded-full overflow-hidden"
                initial={{ width: "0%" }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
            >
                <div 
                    className="absolute inset-0 h-full"
                    style={{
                        backgroundImage: `
                            repeating-linear-gradient(
                                45deg,
                                transparent,
                                transparent 10px,
                                rgba(255, 255, 255, 0.1) 10px,
                                rgba(255, 255, 255, 0.1) 20px
                            ),
                            linear-gradient(to right, #06b6d4, #a855f7)
                        `,
                    }}
                />
                <div 
                    className="absolute inset-0 h-full opacity-80"
                    style={{
                        backgroundImage: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.7), transparent)',
                        animation: 'shimmer-pan 3s linear infinite',
                    }}
                />
            </motion.div>
        </div>
      </div>
    </>
  );
};

const BaseStatsContent: FC = () => {
    return (
        <div className="bg-background/40 rounded-lg p-2 h-full flex flex-col">
            <p className="text-lg sm:text-xl font-bold text-foreground mb-4">Base Stats</p>
            <div
                className="grid grid-cols-1 lg:grid-cols-2 h-full overflow-y-auto 
                        scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-background/30 gap-8"
            >
                {characterData.baseStats.map((stat) => (
                    <Tooltip key={stat.id} content={
                        <>
                            <p className="font-bold text-primary">{stat.label}</p>
                            <p className="text-sm">{stat.value}</p>
                        </>
                    }>
                        <div
                            className="rounded-lg hover:bg-background/70"
                        >
                            <div className="flex justify-between items-center">
                                <p className="text-sm font-bold text-primary">{stat.label}</p>
                                <p className="text-foreground font-semibold text-base">{stat.barPercentage}%</p>
                            </div>
                            <div className="w-full bg-background/80 rounded-full h-2.5 overflow-hidden">
                                <motion.div
                                    className="bg-gradient-to-r from-blue-300 to-purple-300 h-full rounded-full shadow-[0_0_8px_hsl(var(--primary)_/_0.7)]"
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${stat.barPercentage}%` }}
                                    transition={{ duration: 1, ease: "circOut", delay: 0.3 }}
                                />
                            </div>
                        </div>
                    </Tooltip>
                ))}
            </div>
        </div>
    );
};

function CharacterSheet() {
    const isLgScreen = useMediaQuery('(min-width: 1024px)');
    const isMdScreen = useMediaQuery('(min-width: 768px)');
    const [logbookView, setLogbookView] = useState<LogbookViewType>('items');
    const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
    const [rarityFilter, setRarityFilter] = useState<Rarity | 'all'>('all');
    const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | 'all'>('all');

    const handleLogbookViewChange = (newView: LogbookViewType) => {
        setLogbookView(newView);
        setFilterStatus('all');
        setRarityFilter('all');
        setDifficultyFilter('all');
    };

    const filteredJourney = useMemo(() => {
        let results = journeySteps;
        if (filterStatus === 'achieved') results = results.filter(j => j.progress === 100);
        else if (filterStatus === 'in-progress') results = results.filter(j => j.progress > 0 && j.progress < 100);

        if (logbookView === 'items' && rarityFilter !== 'all') {
            results = results.filter(j => j.specialItemRarity === rarityFilter);
        }
        if (logbookView === 'encounters' && difficultyFilter !== 'all') {
            results = results.filter(j => j.difficulty === difficultyFilter);
        }
        return results;
    }, [filterStatus, logbookView, rarityFilter, difficultyFilter]);

    const logbookOptions: ResponsiveFilterOption<LogbookViewType>[] = [ { value: 'items', label: 'Items' }, { value: 'encounters', label: 'Encounters' } ];
    const itemStatusOptions: ResponsiveFilterOption<FilterStatus>[] = [ { value: 'all', label: 'All' }, { value: 'achieved', label: 'Obtained' }, { value: 'in-progress', label: 'In Progress' }];
    const encounterStatusOptions: ResponsiveFilterOption<FilterStatus>[] = [ { value: 'all', label: 'All' }, { value: 'achieved', label: 'Completed' }, { value: 'in-progress', label: 'In Progress' }];
    
    const rarityOptions: ResponsiveFilterOption<Rarity | 'all'>[] = [
        { value: 'all', label: 'All' },
        ...Object.keys(rarityColors).map((rarity) => ({
            value: rarity as Rarity,
            label: rarity,
            colorClass: rarityColors[rarity as Rarity].border.replace('border-', 'bg-'),
        }))
    ];
    const difficultyOptions: ResponsiveFilterOption<Difficulty | 'all'>[] = [
        { value: 'all', label: 'All' },
        ...Object.keys(difficultyColors).map((difficulty) => ({
            value: difficulty as Difficulty,
            label: difficulty,
            colorClass: difficultyColors[difficulty as Difficulty].border.replace('border-', 'bg-'),
        }))
    ];
    
    const currentStatusOptions = logbookView === 'items' ? itemStatusOptions : encounterStatusOptions;

    return (
        <motion.div
            className="relative flex flex-col w-full max-w-7xl mx-auto my-12 bg-gradient-to-br from-blue-200/40 to-purple-300/50 backdrop-blur-lg rounded-2xl shadow-md overflow-hidden p-4 sm:p-6 pb-20"
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
            <div className="pb-4 border-b border-foreground/10 mb-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                    <div className="text-center sm:text-left">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">{characterData.name}</h2>
                        <p className="text-primary font-semibold">{characterData.title}</p>
                    </div>
                    <div className="flex flex-wrap justify-center sm:justify-end gap-2 text-xl sm:text-2xl">
                        {characterData.types.map(type => <div key={type.name} className="px-3 py-2 sm:px-4 bg-primary/90 rounded-md text-background flex items-center justify-center" title={type.name}>{type.icon}</div>)}
                    </div>
                </div>
                <p className="text-foreground/90 text-center sm:text-left text-sm sm:text-base mt-4">{characterData.description}</p>
            </div>
            <AnimatedXpBar 
                currentXp={characterData.xp} 
                maxXp={characterData.xpToNextLevel} 
            />

            <div className="flex flex-col gap-8">
                <div className="flex flex-row gap-8">
                    <div className="w-full lg:w-1/3 self-start"><CharacterProfile /></div>
                    <div className="w-full lg:w-2/3 bg-background/40 rounded-lg p-4">
                        <p className="text-md sm:text-xl font-bold text-foreground mb-4">Logbook</p>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                            <ResponsiveFilterControls
                                options={logbookOptions}
                                currentValue={logbookView}
                                onValueChange={handleLogbookViewChange}
                                isMdScreen={isMdScreen}
                                groupLabel="View"
                                className="md:w-auto"
                            />
                             <ResponsiveFilterControls
                                options={currentStatusOptions}
                                currentValue={filterStatus}
                                onValueChange={setFilterStatus}
                                isMdScreen={isMdScreen}
                                groupLabel="Status"
                                className="md:w-auto"
                            />
                        </div>

                        <AnimatePresence mode="wait">
                            {logbookView === 'items' && (
                                <motion.div 
                                    key="items"
                                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                                >
                                    <div className="border-t border-foreground/10 pt-4 mt-2">
                                        <ResponsiveFilterControls 
                                            options={rarityOptions} 
                                            currentValue={rarityFilter} 
                                            onValueChange={setRarityFilter} 
                                            isMdScreen={isMdScreen} 
                                            groupLabel="Filter by Rarity"
                                        />
                                    </div>
                                    <LogbookView 
                                        items={filteredJourney} 
                                        emptyText="No items match filter." 
                                        renderItem={(j) => (
                                            <Tooltip key={j.title} content={<><p className={`font-bold text-sm ${rarityColors[j.specialItemRarity].text}`}>{j.specialItem}</p><p className="font-semibold">{j.specialItemRarity}</p></>}>
                                                <div tabIndex={0} className={`aspect-square p-2 rounded-lg border-2 ${rarityColors[j.specialItemRarity].border} ${rarityColors[j.specialItemRarity].bg}`}>
                                                    <SpriteSheetAnimator {...j.specialItemFrames} />
                                                </div>
                                            </Tooltip>
                                        )} 
                                    />
                                </motion.div>
                            )}
                            {logbookView === 'encounters' && (
                                <motion.div 
                                    key="encounters"
                                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                                >
                                    <div className="border-t border-foreground/10 pt-4 mt-2">
                                        <ResponsiveFilterControls 
                                            options={difficultyOptions} 
                                            currentValue={difficultyFilter} 
                                            onValueChange={setDifficultyFilter} 
                                            isMdScreen={isMdScreen} 
                                            groupLabel="Filter by Difficulty"
                                        />
                                    </div>
                                    <LogbookView 
                                        items={filteredJourney} 
                                        emptyText="No encounters match filter." 
                                        renderItem={(j) => (
                                            <Tooltip key={j.title} content={<><p className={`font-bold text-sm ${difficultyColors[j.difficulty].text}`}>{j.title}</p><p className="font-semibold">{j.difficulty}</p></>}>
                                                <div tabIndex={0} className={`aspect-square p-2 rounded-lg border-2 ${difficultyColors[j.difficulty].border} ${difficultyColors[j.difficulty].bg}`}>
                                                    <SpriteSheetAnimator {...j.animationFrames} />
                                                </div>
                                            </Tooltip>
                                        )} 
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                {isLgScreen ? (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                                <BaseStatsContent />
                            </div>
                            <Attributes />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <SkillRadar />
                            <ActivityFeed />
                        </div>
                    </>
                ) : (
                    <>
                        <InteractivePaneGroup
                            leftPane={{ title: 'Base Stats', content: <BaseStatsContent />, key: 'base-stats' }}
                            rightPane={{ title: 'Attributes', content: <Attributes />, key: 'attributes' }}
                        />
                        <InteractivePaneGroup
                            leftPane={{ title: 'Skill Radar', content: <SkillRadar />, key: 'skill-radar' }}
                            rightPane={{ title: 'Activity Feed', content: <ActivityFeed />, key: 'activity-feed' }}
                        />
                    </>
                )}
            </div>
        </motion.div>
    );
}

export default CharacterSheet;