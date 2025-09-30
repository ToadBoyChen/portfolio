// src/components/journey/QuestModal.tsx

import { type FC, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { motion, useMotionValue, useTransform, animate, AnimatePresence, type Variants } from "framer-motion";
import { X } from "lucide-react";
import SpriteSheetAnimator from "../../animation/SpriteSheetAnimator";
import type { JourneyStep, Difficulty, Rarity } from "./JourneyTypes";

// --- Type Derivation ---
type QuestReward = JourneyStep['rewards'][number];

// --- Constants ---
const difficultyColor: Record<Difficulty, string> = {
  Trivial: "text-slate-400", Easy: "text-green-400", Normal: "text-cyan-300",
  Hard: "text-yellow-400", Heroic: "text-red-500", Deadly: "text-fuchsia-500",
};
const rarityColor: Record<Rarity, string> = {
  Common: "text-slate-300", Uncommon: "text-green-400", Rare: "text-blue-400",
  Epic: "text-purple-400", Legendary: "text-orange-400",
};

// --- Framer Motion Variants ---
const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: {
      type: "spring", stiffness: 250, damping: 35,
      when: "beforeChildren", staggerChildren: 0.07,
    },
  },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200 } },
};

// --- Accessibility Hooks ---
const useEscapeKey = (callback: () => void) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") callback();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [callback]);
};

// --- Sub-components ---

const QuestHeader: FC<{ step: JourneyStep; onClose: () => void }> = ({ step, onClose }) => (
  <motion.div variants={itemVariants} className="p-4 sm:p-6 border-b border-white/10 flex-shrink-0">
    <div className="flex justify-between items-start gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <span className="px-3 py-1 text-xs font-bold text-cyan-200 bg-cyan-900/50 border border-cyan-700 rounded-full w-fit">
          {step.questType}
        </span>
        <p className="text-xs sm:text-sm text-slate-400">{step.date} - {step.location}</p>
      </div>
      <button
        onClick={onClose}
        aria-label="Close Quest Details"
        className="group w-9 h-9 flex-shrink-0 rounded-full text-slate-300 bg-white/5 flex items-center justify-center
                   hover:bg-red-500/80 hover:text-white hover:shadow-lg hover:shadow-red-500/30
                   active:scale-90 transition-all duration-200"
      >
        <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
      </button>
    </div>
    <h1
      id="quest-title"
      className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-100 mt-4 tracking-wider text-center sm:text-left"
      style={{ textShadow: "0 0 15px rgba(168, 85, 247, 0.6)" }}
    >
      {step.title}
    </h1>
  </motion.div>
);

const QuestDetails: FC<{ step: JourneyStep }> = ({ step }) => (
  <div className="w-full md:col-span-2 md:order-first flex flex-col gap-4 bg-black/20 p-4 rounded-lg border border-white/10">
    <div>
      <h4 className="font-bold text-cyan-300 uppercase tracking-widest text-sm">Description</h4>
      <p className="mt-2 text-slate-300 leading-relaxed text-sm">{step.description}</p>
    </div>
    <div className="border-t border-white/10 pt-4 space-y-2">
      <h4 className="font-bold text-cyan-300 uppercase tracking-widest text-sm mb-2">Requirements</h4>
      <div className="flex justify-between items-center text-sm">
        <span className="text-slate-400">Difficulty:</span>
        <span className={`font-bold text-base sm:text-lg ${difficultyColor[step.difficulty]}`}>{step.difficulty}</span>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-slate-400">Rec. Level:</span>
        <span className="font-bold text-base sm:text-lg text-slate-200">{step.recommendedLevel}</span>
      </div>
    </div>
    <div className="border-t border-white/10 pt-4">
      <h4 className="font-bold text-cyan-300 uppercase tracking-widest text-sm">Recommended Traits</h4>
      <div className="flex flex-wrap gap-2 mt-2">
        {step.recommendedSkills.map((skill) => (
          <span key={skill} className="text-xs bg-slate-700/80 text-slate-200 px-2.5 py-1 rounded-full">{skill}</span>
        ))}
      </div>
    </div>
  </div>
);

const QuestVisuals: FC<{ step: JourneyStep }> = ({ step }) => (
  <div className="w-full md:col-span-3 flex flex-col items-center gap-4 sm:gap-6">
    <div className="w-40 h-40 sm:w-48 sm:h-48 flex justify-center items-center bg-black/30 rounded-lg overflow-hidden relative border border-white/10">
      <SpriteSheetAnimator {...step.animationFrames} />
      <p className="absolute bottom-2 left-3 text-xs uppercase font-bold text-slate-400 tracking-widest">Encounter</p>
    </div>
    <div className="w-full bg-black/20 p-4 rounded-lg flex items-center justify-between border border-white/10 gap-4">
      <div className="flex-1 text-left">
        <h4 className="font-bold text-cyan-300 uppercase tracking-widest text-sm">Key Item</h4>
        <p
          className={`text-xl sm:text-2xl font-bold mt-1 line-clamp-2 break-words ${rarityColor[step.specialItemRarity]}`}
          style={{ textShadow: "0 0 10px currentColor" }}
        >
          {step.specialItem}
        </p>
      </div>
      <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 flex justify-center items-center bg-black/30 rounded-md">
        <SpriteSheetAnimator {...step.specialItemFrames} />
      </div>
    </div>
  </div>
);

const QuestRewards: FC<{ rewards: QuestReward[] }> = ({ rewards }) => (
  <div className="mt-6">
    <h3 className="font-bold text-cyan-300 uppercase tracking-widest text-sm mb-4 text-center">Rewards</h3>
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
      {rewards.map((reward) => (
        <motion.div
          key={reward.name}
          className="group flex flex-col items-center gap-2 p-3 rounded-lg bg-slate-800/50 border border-white/10 w-24 sm:w-28 text-center
                     transition-all duration-300 hover:bg-slate-700/50 hover:border-amber-400/50 hover:-translate-y-1"
          variants={itemVariants}
        >
          <div className="text-amber-300 text-2xl drop-shadow-[0_0_5px_currentColor] group-hover:scale-110 transition-transform">{reward.icon}</div>
          <p className="text-slate-200 font-semibold text-xs leading-tight">
            {reward.name}
            {reward.amount && (
              <span className="block text-amber-300 font-bold text-sm">+{reward.amount.toLocaleString()}</span>
            )}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
);

const QuestProgress: FC<{ progress: number }> = ({ progress }) => {
  const count = useMotionValue(0);
  const progressText = useTransform(count, (v) => `${Math.round(v)}%`);

  useEffect(() => {
    const animation = animate(count, progress, { duration: 1.5, ease: "easeOut", delay: 1 });
    return animation.stop;
  }, [count, progress]);

  return (
    <div className="mt-8">
      <h3 className="font-bold text-cyan-300 uppercase tracking-widest text-sm mb-3">Quest Progress</h3>
      <div className="w-full bg-slate-700/50 rounded-full h-4 relative overflow-hidden border border-slate-600">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
          style={{ boxShadow: "inset 0 1px 1px rgba(0,0,0,0.2), 0 0 8px rgba(107, 227, 255, 0.7)" }}
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
        />
        <div className="absolute inset-0 flex justify-center items-center">
          <motion.span className="text-white text-xs font-bold drop-shadow-md">{progressText}</motion.span>
        </div>
      </div>
    </div>
  );
};


// --- The Main Modal Component ---
interface QuestModalProps {
  step: JourneyStep | null;
  onClose: () => void;
}

export const QuestModal: FC<QuestModalProps> = ({ step, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEscapeKey(onClose);

  useEffect(() => {
    document.body.style.overflow = step ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [step]);
  
  if (typeof document === "undefined") return null;
  const modalRoot = document.getElementById("modal-root");
  if (!step || !modalRoot) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {step && (
        <>
          <motion.div
            onClick={onClose}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
          />

          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quest-title"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-1/2 left-1/2 w-[95vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 z-[101] font-cinzel max-h-[90vh] flex flex-col"
          >
            <div className="relative bg-slate-900/70 backdrop-blur-xl rounded-xl shadow-2xl shadow-purple-900/40 overflow-hidden flex flex-col flex-1
                            border border-transparent 
                            [--aurora:radial-gradient(100%_100%_at_50%_0%,_rgba(168,85,247,0.15)_0%,_rgba(168,85,247,0)_100%)]
                            before:absolute before:inset-0 before:-z-10 before:bg-[var(--aurora)]
                            after:absolute after:inset-0 after:-z-10 after:rounded-[inherit] after:bg-gradient-to-br after:from-slate-800 after:to-slate-950">
              
              <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-[0.03] pointer-events-none" />

              <QuestHeader step={step} onClose={onClose} />

              <div
                className="flex-1 overflow-y-auto min-h-0 p-4 sm:p-6
                           [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-white/5
                           [&::-webkit-scrollbar-thumb]:bg-cyan-500 [&::-webkit-scrollbar-thumb]:rounded-full"
                style={{ scrollbarColor: "#06b6d4 #ffffff0d", scrollbarWidth: "thin" }}
              >
                {/* --- FIX 2: Added `items-center` for mobile and `md:items-start` for desktop --- */}
                <motion.div variants={itemVariants} className="flex flex-col items-center md:grid md:grid-cols-5 md:items-start gap-4 sm:gap-6">
                  <QuestVisuals step={step} />
                  <QuestDetails step={step} />
                </motion.div>

                <motion.div variants={itemVariants} className="mt-6 bg-black/20 p-4 sm:p-6 rounded-lg border border-white/10">
                  <QuestRewards rewards={step.rewards} />
                  <QuestProgress progress={step.progress} />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    modalRoot
  );
};