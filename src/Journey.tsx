import { useState, useEffect, type FC } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "./components/ui/button";

import { journeySteps } from './components/journeyData';
import type { JourneyStep, Difficulty, Rarity } from './components/journey';
import Hamburger from "hamburger-react";
import SpriteSheetAnimator from "./animation/SpriteSheetAnimator";

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
              <SpriteSheetAnimator
                spriteSheet={step.animationFrames.spriteSheet}
                frameCount={step.animationFrames.frameCount}
                frameWidth={step.animationFrames.frameWidth}
                frameHeight={step.animationFrames.frameHeight}
                fps={step.animationFrames.fps}
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
                  <div className="w-24">
                    <SpriteSheetAnimator
                      spriteSheet={step.specialItemFrames.spriteSheet}
                      frameCount={step.specialItemFrames.frameCount}
                      frameWidth={step.specialItemFrames.frameWidth}
                      frameHeight={step.specialItemFrames.frameHeight}
                      fps={step.specialItemFrames.fps}
                    />
                  </div>
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
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
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
    <div
      ref={ref}
      className="bg-gradient-to-br from-blue-200/20 to-purple-400/40 p-4 rounded-xl backdrop-blur-lg shadow-md cursor-pointer transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1"
      onClick={() => onSelect(step)}
    >
      <div className="flex flex-row items-center gap-4">
        <div className="bg-background/80 border-primary/60">
          <div
            className="w-20 h-auto object-contain drop-shadow-lg border-2"
          >
            <SpriteSheetAnimator
              spriteSheet={step.animationFrames.spriteSheet}
              frameCount={step.animationFrames.frameCount}
              frameWidth={step.animationFrames.frameWidth}
              frameHeight={step.animationFrames.frameHeight}
              fps={step.animationFrames.fps}
            />
          </div>
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
        <p className="text-xs text-primary/80 font-semibold">
          <span className={`${difficultyColor[step.difficulty]}`}>
            {step.difficulty}
          </span>
        </p>
      </div>
      <div className="mt-4 w-full bg-black/20 rounded-full h-2 relative overflow-hidden">
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
  );
};

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
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {questTypes.map(type => (
          <Button
            key={type}
            onClick={() => setActiveTab(type)}
            variant={activeTab === type ? "default" : "outline"}
            className={`transition-all duration-200 border-0 ${activeTab === type ? 'shadow-lg shadow-primary/30' : ''}`}
          >
            {type}
          </Button>
        ))}
      </div>
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