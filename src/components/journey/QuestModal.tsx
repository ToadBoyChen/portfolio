import { type FC, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { X } from "lucide-react";
// --- CHANGE 1: ScrollArea is no longer needed ---
// import { ScrollArea } from "@/components/ui/scroll-area";
import SpriteSheetAnimator from "../../animation/SpriteSheetAnimator";
import type { JourneyStep, Difficulty, Rarity } from "./JourneyTypes";

/* 
  For the best aesthetic, add these Google Fonts to your project's CSS:
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Lato:wght@400;700&display=swap');
*/

// --- Color Maps & Variants (No changes needed) ---
const difficultyColor: Record<Difficulty, string> = { Trivial: "text-slate-400", Easy: "text-green-400", Normal: "text-cyan-300", Hard: "text-yellow-400", Heroic: "text-red-500", Deadly: "text-fuchsia-500", };
const rarityColor: Record<Rarity, string> = { Common: "text-slate-300", Uncommon: "text-green-400", Rare: "text-blue-400", Epic: "text-purple-400", Legendary: "text-orange-400", };
const modalVariants = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 30, when: "beforeChildren", staggerChildren: 0.1, }, }, exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }, };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200 } }, };


interface QuestModalProps {
  step: JourneyStep;
  onClose: () => void;
}

export const QuestModal: FC<QuestModalProps> = ({ step, onClose }) => {
  const count = useMotionValue(0);
  const progressText = useTransform(count, (v) => `${Math.round(v)}%`);

  useEffect(() => {
    const animation = animate(count, step.progress, {
      duration: 1.5,
      ease: "easeOut",
      delay: 0.8,
    });
    return animation.stop;
  }, [count, step.progress]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <>
      <motion.div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-md z-[100]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed top-1/2 left-1/2 w-11/12 max-w-4xl -translate-x-1/2 -translate-y-1/2 z-[101] font-lato max-h-[90vh] flex flex-col"
      >
        <div className="relative bg-slate-900/80 border border-slate-700/80 rounded-xl shadow-2xl shadow-purple-900/30 overflow-hidden flex flex-col flex-1">
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-[url('/path-to-your/noise-texture.png')] opacity-5 pointer-events-none" />
          <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-cyan-400/30 rounded-tl-lg" />
          <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-cyan-400/30 rounded-tr-lg" />
          <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-cyan-400/30 rounded-bl-lg" />
          <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-cyan-400/30 rounded-br-lg" />

          {/* Header (Stays fixed) */}
          <motion.div variants={itemVariants} className="p-6 border-b border-slate-700/50 flex-shrink-0">
            <div className="flex justify-between items-center">
                <span className="px-3 py-1 text-xs font-bold text-cyan-200 bg-cyan-900/50 border border-cyan-700 rounded-full">
                    {step.questType}
                </span>
                <p className="text-sm text-slate-400">{step.date} - {step.location}</p>
                <button
                    onClick={onClose}
                    className="p-1.5 text-slate-400 rounded-full hover:bg-slate-700 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>
            </div>
            <p className="text-4xl font-bold text-slate-100 mt-3 font-cinzel tracking-wider" style={{textShadow: '0 0 15px rgba(168, 85, 247, 0.5)'}}>
                {step.title}
            </p>
          </motion.div>

          {/* --- CHANGE 2: A new unified scrolling container --- */}
          {/* This div takes up the remaining space (flex-1) and will scroll if its content overflows (overflow-y-auto) */}
          <div
            className="flex-1 overflow-y-auto min-h-0
                       [&::-webkit-scrollbar]:w-2
                       [&::-webkit-scrollbar-track]:bg-slate-800
                       [&::-webkit-scrollbar-thumb]:bg-cyan-600
                       [&::-webkit-scrollbar-thumb]:rounded-full"
            style={{ scrollbarColor: "#0891b2 #1e293b", scrollbarWidth: "thin" }}
          >
            {/* Body */}
            <motion.div variants={itemVariants} className="p-6 grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
              {/* Left Panel: Details */}
              <div className="md:col-span-2 flex flex-col gap-4 bg-slate-800/30 p-4 rounded-lg border border-slate-700/50">
                  <div>
                      <h4 className="font-bold text-cyan-300 uppercase tracking-widest text-sm">Description</h4>
                      <p className="mt-2 text-slate-300 leading-relaxed text-sm">
                          {step.description}
                      </p>
                  </div>
                  <div className="border-t border-slate-700/50 pt-4">
                      <h4 className="font-bold text-cyan-300 uppercase tracking-widest text-sm">Requirements</h4>
                      <div className="flex justify-between items-center mt-2">
                          <p className="text-slate-400">Difficulty:</p>
                          <p className={`font-bold text-lg ${difficultyColor[step.difficulty]}`}>{step.difficulty}</p>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                          <p className="text-slate-400">Rec. Level:</p>
                          <p className="font-bold text-lg text-slate-200">{step.recommendedLevel}</p>
                      </div>
                  </div>
                  <div className="border-t border-slate-700/50 pt-4">
                      <h4 className="font-bold text-cyan-300 uppercase tracking-widest text-sm">Recommended Traits</h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                          {step.recommendedSkills.map((skill) => (
                              <span key={skill} className="text-xs bg-slate-700 text-slate-200 px-2 py-1 rounded">
                                  {skill}
                              </span>
                          ))}
                      </div>
                  </div>
              </div>

              {/* Right Panel: Visuals */}
              <div className="md:col-span-3 flex flex-col items-center gap-4">
                <div className="w-48 h-48 flex justify-center items-center bg-black/30 rounded-lg overflow-hidden relative border border-slate-700/50">
                  <SpriteSheetAnimator {...step.animationFrames} />
                  <p className="absolute bottom-2 left-3 text-xs uppercase font-bold text-slate-400 tracking-widest">Encounter</p>
                </div>
                
                <div className="w-full bg-slate-800/30 p-4 rounded-lg flex items-center justify-between border border-slate-700/50">
                    <div className="flex-1 text-center pr-4">
                      <h4 className="font-bold text-cyan-300 uppercase tracking-widest text-sm">Key Item</h4>
                      <p className={`text-2xl font-bold mt-1 font-cinzel truncate ${rarityColor[step.specialItemRarity]}`} style={{textShadow: '0 0 10px currentColor'}}>
                        {step.specialItem}
                      </p>
                    </div>
                    <div className="w-24 h-24 flex-shrink-0 flex justify-center items-center bg-black/30 rounded-md">
                      <SpriteSheetAnimator {...step.specialItemFrames} />
                    </div>
                </div>
              </div>
            </motion.div>

            {/* Footer (with Quest Progress) */}
            <motion.div 
              variants={itemVariants} 
              className="bg-slate-950/50 p-6 border-t border-slate-700/50"
            >
              <h3 className="font-bold text-cyan-300 uppercase tracking-widest text-sm mb-3">Rewards</h3>
              <div className="flex flex-wrap justify-center gap-4">
                  {step.rewards.map((reward) => (
                    <div key={reward.name} className="flex flex-col items-center gap-2 p-3 rounded-lg bg-slate-800/50 border border-slate-700 w-28 text-center transition-all hover:bg-slate-700/50 hover:border-amber-400/50">
                      <div className="text-amber-300 text-2xl drop-shadow-[0_0_5px_currentColor]">{reward.icon}</div>
                      <p className="text-slate-200 font-semibold text-xs leading-tight">
                        {reward.name}
                        {reward.amount && <span className="block text-amber-300 font-bold text-sm">+{reward.amount.toLocaleString()}</span>}
                      </p>
                    </div>
                  ))}
              </div>
              <div className="mt-6">
                <h3 className="font-bold text-cyan-300 uppercase tracking-widest text-sm mb-3">Quest Progress</h3>
                  <div className="w-full bg-slate-700/50 rounded-full h-4 relative overflow-hidden border border-slate-600">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
                      style={{boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.5), 0 0 8px rgba(107, 227, 255, 0.7)'}}
                      initial={{ width: "0%" }}
                      animate={{ width: `${step.progress}%` }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
                    />
                    <div className="absolute inset-0 flex justify-center items-center">
                      <motion.span className="text-white text-xs font-bold drop-shadow-md">
                        {progressText}
                      </motion.span>
                    </div>
                  </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};