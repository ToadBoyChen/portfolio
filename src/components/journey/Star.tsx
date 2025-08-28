import type { FC } from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import type { Difficulty, JourneyStep } from './JourneyTypes';

const difficultyConfig: Record<Difficulty, { size: number; glowIntensity: string }> = {
  "Trivial": { size: 20, glowIntensity: "10px" },
  "Easy": { size: 24, glowIntensity: "15px" },
  "Normal": { size: 28, glowIntensity: "20px" },
  "Hard": { size: 32, glowIntensity: "25px" },
  "Heroic": { size: 36, glowIntensity: "30px" },
  "Deadly": { size: 40, glowIntensity: "35px" },
};

const progressGradient = {
  active: "from-cyan-400 to-blue-500",
  completed: "from-emerald-400 to-green-500",
};

interface StarProps {
  step: JourneyStep;
  onSelect: (step: JourneyStep) => void;
  isGhost?: boolean;
  onHover?: (title: string | null) => void;
}

export const Star: FC<StarProps> = ({ step, onSelect, isGhost = false, onHover }) => {
  const [isHovered, setIsHovered] = useState(false);
  const config = difficultyConfig[step.difficulty];
  const gradient = step.progress === 100 ? progressGradient.completed : progressGradient.active;

  const handleHover = (hovering: boolean) => {
    setIsHovered(hovering);
    onHover?.(hovering ? step.title : null);
  };

  return (
    <motion.div
      className={`relative group ${isGhost ? 'pointer-events-none' : 'cursor-pointer'}`}
      style={{ width: config.size, height: config.size }}
      onClick={() => !isGhost && onSelect(step)}
      onHoverStart={() => handleHover(true)}
      onHoverEnd={() => handleHover(false)}
      initial={{ rotate: 0 }}
      animate={isHovered ? { rotate: 180 } : { rotate: 0 }}
      transition={{ duration: 0.5 }}
    >
            {/* Outer glow effect */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-full blur-xl`}
        style={{
          transform: `scale(${isHovered ? 2.5 : 2})`,
          opacity: isGhost ? 0.2 : (isHovered ? 0.6 : 0.4)
        }}
        animate={{
          scale: isHovered ? 2.5 : 2,
          opacity: isGhost ? 0.2 : (isHovered ? 0.6 : 0.4)
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Middle glow layer */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-full blur-md`}
        style={{
          transform: `scale(${isHovered ? 1.8 : 1.5})`,
          opacity: isGhost ? 0.3 : (isHovered ? 0.8 : 0.6)
        }}
        animate={{
          scale: isHovered ? 1.8 : 1.5,
          opacity: isGhost ? 0.3 : (isHovered ? 0.8 : 0.6)
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Core star */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-full`}
        animate={{
          boxShadow: isHovered 
            ? `0 0 ${config.glowIntensity} rgba(255,255,255,0.8), inset 0 0 10px rgba(255,255,255,0.5)`
            : `0 0 ${config.glowIntensity} rgba(255,255,255,0.5), inset 0 0 5px rgba(255,255,255,0.3)`
        }}
      >
        {/* Inner shimmer effect */}
        <div className="absolute inset-[20%] bg-white/40 rounded-full blur-sm" />
        
        {/* Progress indicator ring */}
        {step.progress > 0 && step.progress < 100 && (
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="48%"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="2"
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="48%"
              fill="none"
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: step.progress / 100 }}
              transition={{ duration: 0.5 }}
            />
          </svg>
        )}
      </motion.div>
      
      {/* Pulse animation for active quests */}
      {step.progress > 0 && step.progress < 100 && (
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-full`}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      )}
      
      {/* Sparkle effects */}
      {isHovered && !isGhost && [...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            top: '50%',
            left: '50%',
          }}
          animate={{
            x: [0, Math.cos(i * Math.PI / 2) * 40],
            y: [0, Math.sin(i * Math.PI / 2) * 40],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.25,
          }}
        />
      ))}
      
      {/* Tooltip */}
      <motion.div
        className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 bg-gray-900/90 backdrop-blur-sm rounded-lg shadow-xl whitespace-nowrap z-50 ${
          isGhost ? 'hidden' : ''
        }`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 10
        }}
        transition={{ duration: 0.2 }}
        style={{ pointerEvents: 'none' }}
      >
        <div className="text-white font-medium text-sm mb-1">{step.title}</div>
        <div className="flex items-center gap-3 text-xs">
          <span className={`px-2 py-0.5 rounded-full bg-gradient-to-r ${gradient} text-white`}>
            {step.difficulty}
          </span>
          <span className="text-gray-300">
            {step.progress === 100 ? '✓ Complete' : `${step.progress}% Progress`}
          </span>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-gray-900/90 rotate-45" />
      </motion.div>
      
      {/* Completion checkmark */}
      {step.progress === 100 && (
        <motion.div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <div className="text-white text-xs font-bold drop-shadow-lg">✓</div>
        </motion.div>
      )}
    </motion.div>
  );
};