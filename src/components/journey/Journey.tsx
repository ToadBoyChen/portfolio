import { useState, useMemo, useEffect, type FC } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { Button } from "../ui/button";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

// --- Imports ---
import type { JourneyStep, Difficulty, Rarity } from './JourneyTypes';
import Hamburger from "hamburger-react";
import SpriteSheetAnimator from "../../animation/SpriteSheetAnimator";
import { FaBookOpen, FaProjectDiagram, FaRocket, FaStar } from "react-icons/fa";
import { GiCrystalBall, GiGoldBar, GiScrollQuill } from "react-icons/gi";
import { MdOutlineSportsKabaddi } from "react-icons/md";
import { ExitIcon } from "@radix-ui/react-icons";

import { GalaxyNebula } from './GalaxyNebula';
import { ConstellationView } from './ConstellationView';
import { journeySteps } from "./journeyData";

// --- Constants ---
const difficultyColor: Record<Difficulty, string> = { "Trivial": "text-gray-600", "Easy": "text-green-600", "Normal": "text-blue-500", "Hard": "text-orange-500", "Heroic": "text-red-600", "Deadly": "text-purple-600" };
const rarityColor: Record<Rarity, string> = { "Common": "text-gray-600", "Uncommon": "text-green-600", "Rare": "text-blue-500", "Epic": "text-purple-500", "Legendary": "text-orange-500" };
const questTypeIcons = { "": <FaStar />, "The Scholar's Path": <FaBookOpen />, "The Arcane Arts": <GiCrystalBall />, "Paths of Discovery": <FaProjectDiagram />, "The Way of the Warrior": <MdOutlineSportsKabaddi />, "The Gold-Spinner's Gambit": <GiGoldBar />, "The Chronicler's Task": <GiScrollQuill /> };
const GALAXY_POSITIONS = [{ name: "The Scholar's Path", pos: { top: '15%', left: '10%' } }, { name: "The Arcane Arts", pos: { top: '25%', left: '65%' } }, { name: "Paths of Discovery", pos: { top: '55%', left: '20%' } }, { name: "The Way of the Warrior", pos: { top: '65%', left: '75%' } }, { name: "The Gold-Spinner's Gambit", pos: { top: '5%', left: '43%' } }, { name: "The Chronicler's Task", pos: { top: '65%', left: '50%' } }];


// --- QuestModal Component (Unchanged) ---
const QuestModal: FC<{ step: JourneyStep; onClose: () => void }> = ({ step, onClose }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);

    useEffect(() => {
      const animation = animate(count, step.progress, { duration: 1.5, ease: "easeOut", delay: 0.5 });
      return () => animation.stop();
    }, [count, step.progress]);
    
    return (
        <>
            <motion.div onClick={onClose} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-3xl z-[101]" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
                 <div className="bg-gradient-to-br from-blue-100/90 to-purple-400/90 backdrop-blur-lg rounded-2xl overflow-hidden">
                    <div className="p-6 bg-black/10"><div className="flex justify-between items-start"><div className="flex flex-col items-start w-full"><div className="flex justify-between w-full"><span className="p-3 px-4 text-xs font-bold text-primary bg-primary/20 rounded-full self-start">{step.questType}</span><Button onClick={onClose} className={`self-end rounded-full text-primary bg-background shadow-md hover:text-background hover:bg-primary hover:shadow-lg active:scale-90 transition-all duration-300 ease-in-out hover:rotate-12`}><Hamburger toggled={true} size={18} color="currentColor"/></Button></div><p className="text-3xl font-bold text-background my-2 chango-regular knewave-shadow-small ">{step.title}</p><div className="text-primary font-semibold flex flex-row justify-between min-w-full"><div><p className="flex flex-row self-end">{step.location}</p></div><div className="flex flex-col gap-8"><p className="self-end">{step.date}</p></div></div></div></div></div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center"><div className="flex justify-center items-center row-start-2 md:row-start-1"><SpriteSheetAnimator spriteSheet={step.animationFrames.spriteSheet} frameCount={step.animationFrames.frameCount} frameWidth={step.animationFrames.frameWidth} frameHeight={step.animationFrames.frameHeight} fps={step.animationFrames.fps}/></div><div className="md:col-span-2 flex flex-col gap-4"><div><h3 className="font-bold text-foreground text-right">Story Line</h3><p className="mt-2 text-foreground/80 leading-relaxed text-right">{step.description}</p></div><div className="flex gap-4"><div className="w-1/2 bg-black/10 p-4 rounded-lg flex flex-col items-center justify-between gap-2"><p className="text-sm text-primary font-semibold">Special Item</p><p className={`text-lg font-bold text-center ${rarityColor[step.specialItemRarity]}`}>{step.specialItem}</p><div className="w-24"><SpriteSheetAnimator spriteSheet={step.specialItemFrames.spriteSheet} frameCount={step.specialItemFrames.frameCount} frameWidth={step.specialItemFrames.frameWidth} frameHeight={step.specialItemFrames.frameHeight} fps={step.specialItemFrames.fps}/></div></div><div className="w-1/2 bg-black/10 p-4 rounded-lg flex flex-col justify-between text-right gap-4"><div><h4 className="text-xs font-bold text-primary uppercase tracking-wider">Difficulty</h4><p className={`font-bold text-lg ${difficultyColor[step.difficulty]}`}>{step.difficulty}</p></div><div><h4 className="text-xs font-bold text-primary uppercase tracking-wider">Rec. Level</h4><p className="font-bold text-lg text-foreground">{step.recommendedLevel}</p></div><div><h4 className="text-xs font-bold text-primary uppercase tracking-wider">Rec. Traits</h4><div className="flex flex-wrap justify-end gap-1 mt-1">{step.recommendedSkills.map(skill => <span key={skill} className="text-xs bg-background/50 text-foreground px-2 py-0.5 rounded">{skill}</span>)}</div></div></div></div></div></div>
                    <div className="bg-black/10 p-4"><h3 className="font-bold text-foreground">Rewards</h3><div className="flex flex-wrap justify-evenly gap-4 mt-2">{step.rewards.map(reward => (<div key={reward.name} className="flex items-center gap-2 p-2 rounded-md bg-yellow-100/50"><div className="text-yellow-600 text-lg">{reward.icon}</div><p className="text-foreground font-semibold text-sm">{reward.name} {reward.amount && `+${reward.amount.toLocaleString()}`}</p></div>))}</div><div className="mt-4"><div className="flex justify-between items-center mb-1 text-xs"><span className={`font-bold ${step.progress === 100 ? 'text-green-600' : 'text-cyan-600'}`}>{step.progress === 100 ? "Completed" : "Active"}</span></div><div className="w-full bg-black/20 rounded-full h-2 relative overflow-hidden"><motion.div className={`h-full rounded-full ${step.progress === 100 ? 'bg-green-600' : 'bg-gradient-to-r from-cyan-400 to-purple-500'}`} initial={{ width: "0%" }} animate={{ width: `${step.progress}%` }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }} /><div className="absolute inset-0 flex justify-center items-center"><motion.span className="text-white text-[10px] font-bold drop-shadow-sm">{rounded}</motion.span><span className="text-white text-[10px] font-bold drop-shadow-sm">%</span></div></div></div></div>
                </div>
            </motion.div>
        </>
    );
};


// --- UniverseEntryButton Component ---
const UniverseEntryButton: FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <motion.button onClick={onClick} className="relative w-64 h-64 rounded-full flex items-center justify-center text-white font-bold text-xl tracking-wider uppercase" style={{ transformStyle: "preserve-3d" }} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1, transition: { duration: 0.5, delay: 0.2 } }} exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.3 } }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <motion.div className="absolute inset-0 bg-purple-500/50 rounded-full blur-2xl" animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
            <div className="absolute inset-4 bg-gradient-to-br from-gray-800 to-black rounded-full shadow-inner" />
            <div className="absolute inset-4 rounded-full opacity-30" style={{ backgroundImage: "url('/path-to-your/star-bg.svg')", backgroundSize: '300%' }}/>
            <motion.div className="absolute w-full h-full" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}><div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_8px_white]" /><div className="absolute bottom-10 left-10 -translate-x-1/2 w-1 h-1 bg-white rounded-full" /></motion.div>
            <motion.div className="absolute w-[80%] h-[80%]" animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}><div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-pink-400 rounded-full shadow-[0_0_6px_white]" /></motion.div>
            <div className="relative z-10 flex flex-col items-center" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)"}}><FaRocket className="mb-2 text-4xl" />Enter Quest Universe</div>
        </motion.button>
    );
};


function Journey() {
  const [selectedStep, setSelectedStep] = useState<JourneyStep | null>(null);
  const [zoomedConstellation, setZoomedConstellation] = useState<string | null>(null);
  const [isUniverseMode, setIsUniverseMode] = useState(false);

  const cosmicWebData = useMemo(() => {
    const allQuestsByTitle = new Map(journeySteps.map(q => [q.title, q]));
    const starPositions = new Map<string, { quest: JourneyStep; pos: { x: number; y: number } }>();
    const storylines = Array.from(new Set(journeySteps.map(step => step.questType)));

    storylines.forEach(storyline => {
      const quests = journeySteps.filter(step => step.questType === storyline).sort((a, b) => parseInt(a.date) - parseInt(b.date) || a.title.localeCompare(b.title));
      const baseRadius = 5, spread = 2.5;
      quests.forEach((step, i) => {
        const angle = i * 2.5;
        const radius = baseRadius + i * spread;
        const x = 50 + radius * Math.cos(angle);
        const y = 50 + radius * Math.sin(angle);
        starPositions.set(step.title, { quest: step, pos: { x, y } });
      });
    });

    const interGalaxyConnections = new Set<string>();
    journeySteps.forEach(quest => {
      quest.prerequisites?.forEach(prereqTitle => {
        const prereqQuest = allQuestsByTitle.get(prereqTitle);
        if (prereqQuest && prereqQuest.questType !== quest.questType) {
          const connectionKey = [quest.questType, prereqQuest.questType].sort().join('-');
          interGalaxyConnections.add(connectionKey);
        }
      });
    });
    return { starPositions, interGalaxyConnections };
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallaxX = useTransform(mouseX, [0, 1000], [-15, 15]);
  const parallaxY = useTransform(mouseY, [0, 1000], [-15, 15]);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isUniverseMode) return;
    const { clientX, clientY, currentTarget } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <div id="journey" className="w-full min-h-[50vh] flex flex-col items-center justify-center py-10">
      <motion.main
        layout
        transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
        className={
          isUniverseMode
            ? "fixed inset-0 z-50 w-screen h-screen rounded-none bg-gray-900"
            : "relative w-full max-w-7xl aspect-video flex items-center justify-center bg-transparent"
        }
        onMouseMove={handleMouseMove}
      >
        <AnimatePresence mode="wait">
          {!isUniverseMode ? (
            <motion.div key="entry-button">
              <UniverseEntryButton onClick={() => setIsUniverseMode(true)} />
            </motion.div>
          ) : (
            <motion.div 
                key="universe-view" 
                className="w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.5 } }}
                exit={{ opacity: 0 }}
            >
              <TransformWrapper
                initialScale={1} minScale={0.5} maxScale={5} limitToBounds={false} doubleClick={{ disabled: true }}
              >
                <TransformComponent wrapperClass="!w-full !h-full" contentClass="relative w-full h-full">
                  <motion.div
                      className="absolute inset-[-30px] bg-[url('/path-to-your/star-bg.svg')] bg-cover opacity-30"
                      style={{ x: parallaxX, y: parallaxY }}
                  />
                  <AnimatePresence>
                    {zoomedConstellation ? (
                      <ConstellationView
                        key={zoomedConstellation}
                        constellationName={zoomedConstellation}
                        onClose={() => setZoomedConstellation(null)}
                        onSelectStep={setSelectedStep}
                        layoutId={`constellation-${zoomedConstellation}`}
                        allStarPositions={cosmicWebData.starPositions}
                      />
                    ) : (
                      <div className="w-full h-full">
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                          {Array.from(cosmicWebData.interGalaxyConnections).map(key => {
                            const [from, to] = key.split('-');
                            const fromPos = GALAXY_POSITIONS.find(p => p.name === from)?.pos;
                            const toPos = GALAXY_POSITIONS.find(p => p.name === to)?.pos;
                            if (!fromPos || !toPos) return null;
                            return (
                              <motion.line
                                key={key} x1={`${parseFloat(fromPos.left) + 7}%`} y1={`${parseFloat(fromPos.top) + 7}%`} x2={`${parseFloat(toPos.left) + 7}%`} y2={`${parseFloat(toPos.top) + 7}%`}
                                stroke="rgba(167, 139, 250, 0.4)" strokeWidth="0.2%" strokeDasharray="1 2"
                                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: 'easeInOut' }}
                              />
                            );
                          })}
                        </svg>
                        {GALAXY_POSITIONS.map(({ name, pos }) => (
                          <div key={name} className="absolute" style={pos}>
                            <GalaxyNebula
                              name={name}
                              icon={questTypeIcons[name as keyof typeof questTypeIcons]}
                              onSelect={() => setZoomedConstellation(name)}
                              layoutId={`constellation-${name}`}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </AnimatePresence>
                </TransformComponent>
              </TransformWrapper>
              
              <motion.div
                  className="absolute top-4 right-4 z-10"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1, transition: { delay: 0.7 } }}
                  exit={{ opacity: 0, scale: 0.5 }}
              >
                  <Button variant="destructive" onClick={() => setIsUniverseMode(false)}>
                      <ExitIcon className="mr-2 h-5 w-5" />
                      Exit Universe
                  </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>

      <AnimatePresence>
        {selectedStep && (
          <QuestModal step={selectedStep} onClose={() => setSelectedStep(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Journey;