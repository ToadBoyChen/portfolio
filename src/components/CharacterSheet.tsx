// CharacterSheet.tsx

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, type FC, type ReactNode, Fragment } from "react";
import { FaReact, FaPython } from "react-icons/fa";
import { SiCplusplus, SiTypescript } from "react-icons/si";
import { FiCheck, FiChevronDown } from "react-icons/fi";
import { Listbox, Transition } from '@headlessui/react';
import RadarChart from "./Radar.tsx";
import Attributes from "./Attributes.tsx";
import SpriteSheetAnimator from "../animation/SpriteSheetAnimator.tsx";
import Tooltip from "./ToolTip.tsx";
import { journeySteps } from './journey/journeyData';
import type { Rarity, Difficulty, JourneyStep } from './journey/JourneyTypes';
import spriteSheet from '/src/animation/quests/me-5frame.png';

// --- SECTION 1: Types & Constants ---
type CharacterSheetView = 'base' | 'attributes' | 'radar' | 'special-items' | 'rare-encounters';
type FilterStatus = 'all' | 'achieved' | 'in-progress' | 'pending';

const TABS: { key: CharacterSheetView; label: string }[] = [
    { key: 'special-items', label: 'Items' },
    { key: 'rare-encounters', label: 'Encounters' },
    { key: 'base', label: 'Base Stats' },
    { key: 'attributes', label: 'Attributes' },
    { key: 'radar', label: 'Skill Radar' },
];

// --- SECTION 2: Data & Configuration ---
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
    baseStats: [{ id: "head", label: "Intelligence", value: "Pure Mathematics Fanatic", barPercentage: "90%" }, { id: "arm-right", label: "Power", value: "Athlete", barPercentage: "60%" }, { id: "chest", label: "Core", value: "Programmer", barPercentage: "70%" }, { id: "legs", label: "Foundation", value: "Mathematician", barPercentage: "80%" }, { id: "projects", label: "Stamina", value: "Growing portfolio", barPercentage: "50%" },],
    xp: 2316,
    xpToNextLevel: 10000,
};


// --- SECTION 3: Sub-components ---

interface FilterOption { key: FilterStatus; label: string; }
interface FilterControlsProps { filters: FilterOption[]; currentFilter: FilterStatus; onFilterChange: (filter: FilterStatus) => void; }

const FilterControls: FC<FilterControlsProps> = ({ filters, currentFilter, onFilterChange }) => (
    <div className="flex items-center flex-wrap gap-2 mb-4">
        {filters.map(filter => (
            <button key={filter.key} onClick={() => onFilterChange(filter.key)} className={`py-1 px-3 text-xs font-semibold rounded-full transition-colors duration-200 ${currentFilter === filter.key ? 'bg-primary/80 text-background' : 'bg-background/50 text-foreground/70 hover:bg-primary/20'}`}>
                {filter.label}
            </button>
        ))}
    </div>
);

interface LogbookViewProps { title: string; items: JourneyStep[]; filters: FilterOption[]; currentFilter: FilterStatus; onFilterChange: (filter: FilterStatus) => void; renderItem: (item: JourneyStep) => ReactNode; emptyText: string; }

const LogbookView: FC<LogbookViewProps> = ({ title, items, filters, currentFilter, onFilterChange, renderItem, emptyText }) => (
    <motion.div key={title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
        <h3 className="text-xl font-bold text-foreground mb-4">{title}</h3>
        <FilterControls filters={filters} currentFilter={currentFilter} onFilterChange={onFilterChange} />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-background/30">
            {items.length > 0 ? (
                items.map(item => renderItem(item))
            ) : (
                <p className="col-span-full text-center text-foreground/70 py-8">{emptyText}</p>
            )}
        </div>
    </motion.div>
);

const CharacterProfile: FC = () => (
    <div className="w-2/5 lg:w-1/3 p-2 sm:p-4 flex-shrink-0 flex items-center justify-center">
        <div className="flex flex-col gap-4 sm:gap-8 w-full max-w-xs mx-auto">
            <div className="pt-8 bg-gradient-to-r from-rose-300 via-violet-300 to-purple-300 gradient-border border-4 border-foreground rounded-lg flex justify-center items-center">
                <SpriteSheetAnimator spriteSheet={spriteSheet} frameCount={5} frameWidth={96} frameHeight={96} fps={3} />
            </div>
            <div className="bg-background/60 backdrop-blur-sm p-2 sm:p-4 rounded-lg text-center">
                <p className="text-lg sm:text-2xl font-bold text-foreground drop-shadow-sm mb-2 sm:mb-4">{characterData.name}</p>
                <div className="text-[10px] sm:text-xs font-semibold">
                    <div className="gap-2 flex flex-col">
                        <span className="bg-primary/20 text-foreground px-2 py-1 border-2 border-foreground rounded-xl flex justify-center">Lv. {characterData.level} Arch Linux Loyalist</span>
                        <span className="bg-green-500/20 border-2 border-green-800/50 text-green-800 px-2 py-1 rounded-xl flex justify-center">{characterData.alignment}</span>
                    </div>
                    <p className="bg-primary/20 border-2 border-primary/50 text-primary px-2 py-1 rounded-xl mt-2">Member of Thinkpad Guild</p>
                </div>
            </div>
        </div>
    </div>
);

interface TabNavigationProps { currentView: CharacterSheetView; onViewChange: (view: CharacterSheetView) => void; }

const TabNavigation: FC<TabNavigationProps> = ({ currentView, onViewChange }) => {
    const selectedTab = TABS.find(tab => tab.key === currentView);
    return (
        <div className="mb-4">
            <div role="tablist" className="hidden sm:flex flex-wrap gap-2">
                {TABS.map(tab => (
                    <button key={tab.key} onClick={() => onViewChange(tab.key)} role="tab" aria-selected={currentView === tab.key} className={`py-2 px-4 text-sm font-semibold rounded-md transition-all duration-200 ease-in-out ${currentView === tab.key ? 'bg-background text-foreground shadow-md' : 'text-primary hover:bg-primary/90 hover:text-background bg-background/50'}`}>
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="w-full sm:hidden">
                <Listbox value={currentView} onChange={onViewChange}>
                    <div className="relative">
                        <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-background/60 py-3 pl-4 pr-10 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-75">
                            <span className="block truncate font-semibold text-foreground">
                                {selectedTab?.label}
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                <FiChevronDown className="h-5 w-5 text-foreground/70" aria-hidden="true" />
                            </span>
                        </Listbox.Button>
                        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-background/80 backdrop-blur-sm py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {TABS.map((tab) => (
                                    <Listbox.Option key={tab.key} className={({ active }) => `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-primary/30 text-primary-foreground' : 'text-foreground'}`} value={tab.key}>
                                        {({ selected }) => (
                                            <>
                                                <span className={`block truncate ${selected ? 'font-bold' : 'font-normal'}`}>
                                                    {tab.label}
                                                </span>
                                                {selected ? (
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                                                        <FiCheck className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </Listbox>
            </div>
        </div>
    );
};


// --- SECTION 4: Main Component ---
function CharacterSheet() {
    const [view, setView] = useState<CharacterSheetView>('special-items');
    const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

    const handleViewChange = (newView: CharacterSheetView) => {
        setView(newView);
        setFilterStatus('all');
    };

    const filteredQuests = useMemo(() => {
        switch (filterStatus) {
            case 'achieved': return journeySteps.filter(j => j.progress === 100);
            case 'in-progress': return journeySteps.filter(j => j.progress > 0 && j.progress < 100);
            case 'pending': return journeySteps.filter(j => j.progress === 0);
            case 'all': default: return journeySteps;
        }
    }, [filterStatus]);

    const itemFilters: FilterOption[] = [{ key: 'all', label: 'Items' }, { key: 'achieved', label: 'Obtained' }, { key: 'in-progress', label: 'In Progress' }];
    const encounterFilters: FilterOption[] = [{ key: 'all', label: 'Quests' }, { key: 'achieved', label: 'Completed' }, { key: 'in-progress', label: 'In Progress' }];

    return (
        <motion.div
            className="relative flex flex-col w-full max-w-6xl mx-auto gap-0 my-12 bg-gradient-to-br from-blue-200/40 to-purple-300/50 backdrop-blur-lg rounded-2xl shadow-md overflow-hidden pb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
            <div className="p-4 sm:p-6 pb-2 md:pb-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-4">
                    <div className="text-center sm:text-left">
                        <h2 className="text-2xl sm:text-4xl font-bold text-foreground">{characterData.name}</h2>
                        <p className="text-primary font-semibold">{characterData.title}</p>
                    </div>
                    <div className="flex flex-wrap justify-center sm:justify-end gap-2 text-xl sm:text-2xl">
                        {characterData.types.map(type => <div key={type.name} className="px-3 py-2 sm:px-4 bg-primary/90 rounded-md text-background flex items-center justify-center" title={type.name}>{type.icon}</div>)}
                    </div>
                </div>
                <p className="text-foreground/90 text-center sm:text-left text-sm sm:text-base">{characterData.description}</p>
            </div>
            <div className="flex flex-row w-full">
                <CharacterProfile />
                <div className="w-3/5 lg:w-2/3 p-2 sm:p-6 pt-0 md:pt-4 flex flex-col flex-grow min-w-0">
                    <TabNavigation currentView={view} onViewChange={handleViewChange} />
                    <div className="min-h-[350px] flex-grow flex flex-col justify-start bg-background/40 rounded-lg p-2 sm:p-6">
                        <AnimatePresence mode="wait">
                            {view === 'base' && (<motion.div key="base" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="space-y-4"> {characterData.baseStats.map((stat) => (<div key={stat.id} className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center text-left"> <p className="font-bold text-foreground/90">{stat.label}</p> <div className="sm:col-span-2"> <p className="text-foreground font-semibold text-xs sm:text-sm mb-1">{stat.value}</p> <div className="w-full bg-background/50 rounded-full h-2.5"> <motion.div className="bg-primary h-2.5 rounded-full" initial={{ width: "0%" }} animate={{ width: stat.barPercentage }} transition={{ duration: 1, ease: "circOut", delay: 0.5 }} /> </div> </div> </div>))} </motion.div>)}
                            {view === 'attributes' && <motion.div key="attributes" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}><Attributes /></motion.div>}
                            {view === 'radar' && <motion.div key="radar" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}><RadarChart /></motion.div>}
                            {view === 'special-items' && (<LogbookView title="Special Items" items={filteredQuests} filters={itemFilters} currentFilter={filterStatus} onFilterChange={setFilterStatus} emptyText="No items match this filter." renderItem={(journey) => (<Tooltip key={journey.title} content={<> <p className={`font-bold text-sm ${rarityColors[journey.specialItemRarity].text}`}>{journey.specialItem}</p> <p className="font-semibold">{journey.specialItemRarity}</p> <hr className="my-1 border-foreground/20" /> <p><span className="font-semibold">Source:</span> {journey.title}</p> </>}> <div tabIndex={0} className={`aspect-square p-2 rounded-lg border-2 transition-all duration-300 ${rarityColors[journey.specialItemRarity].border} ${rarityColors[journey.specialItemRarity].bg} hover:scale-105 hover:shadow-lg focus:scale-105 focus:shadow-lg outline-none cursor-pointer`}> <SpriteSheetAnimator {...journey.specialItemFrames} /> </div> </Tooltip>)} />)}
                            {view === 'rare-encounters' && (<LogbookView title="Encounter Logbook" items={filteredQuests} filters={encounterFilters} currentFilter={filterStatus} onFilterChange={setFilterStatus} emptyText="No encounters match this filter." renderItem={(journey) => (<Tooltip key={journey.title} content={<> <p className={`font-bold text-sm ${difficultyColors[journey.difficulty].text}`}>{journey.title}</p> <p className="font-semibold">{journey.difficulty}</p> <hr className="my-1 border-foreground/20" /> <p><span className="font-semibold">Location:</span> {journey.location}</p> </>}> <div tabIndex={0} className={`aspect-square p-2 rounded-lg border-2 transition-all duration-300 ${difficultyColors[journey.difficulty].border} ${difficultyColors[journey.difficulty].bg} hover:scale-105 hover:shadow-lg focus:scale-105 focus:shadow-lg outline-none cursor-pointer`}> <SpriteSheetAnimator {...journey.animationFrames} /> </div> </Tooltip>)} />)}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full p-4 sm:px-6 sm:py-4">
                <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm font-semibold text-foreground/80 mb-1 px-1 gap-1">
                    <span>Experience</span>
                    <span>{characterData.xp.toLocaleString()} / {characterData.xpToNextLevel.toLocaleString()}</span>
                </div>
                <div className="w-full bg-background/50 rounded-full h-3">
                    <motion.div className="bg-gradient-to-r from-cyan-400 to-purple-500 h-3 rounded-full" initial={{ width: "0%" }} animate={{ width: `${(characterData.xp / characterData.xpToNextLevel) * 100}%` }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }} />
                </div>
            </div>
        </motion.div>
    );
}

export default CharacterSheet;