import { type FC } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaCode, FaCheckCircle } from 'react-icons/fa';
import type { JourneyStep } from './Star';
import { Button } from '../ui/button';

const difficultyColorMap: { [key: string]: string } = {
    Trivial: "text-gray-400 border-gray-600",
    Easy: "text-green-400 border-green-600",
    Normal: "text-blue-400 border-blue-600",
    Hard: "text-yellow-400 border-yellow-600",
    Heroic: "text-purple-400 border-purple-600",
    Deadly: "text-red-400 border-red-600",
};

interface QuestListItemProps {
    step: JourneyStep;
    onSelect: (step: JourneyStep) => void;
}

export const QuestListItem: FC<QuestListItemProps> = ({ step, onSelect }) => {
    const { title, difficulty, date, recommendedSkills, progress } = step;
    const isCompleted = progress === 100;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
        >
            <Button
                variant="ghost"
                onClick={() => onSelect(step)}
                className="w-full h-auto bg-slate-900/50 border border-purple-400/20 rounded-lg p-3 text-left flex flex-col items-start"
            >
                <div className="w-full flex justify-between items-start">
                    <h3 className="text-base font-bold text-white pr-2 flex-1">{title}</h3>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${difficultyColorMap[difficulty]}`}>
                        {difficulty}
                    </span>
                </div>

                <div className="w-full flex items-center justify-between mt-2 text-xs text-slate-400">
                    <div className="flex items-center">
                        <FaCalendarAlt className="mr-1.5" />
                        <span>{new Date(date).toLocaleDateString()}</span>
                    </div>
                    {isCompleted && (
                        <div className="flex items-center text-green-400">
                            <FaCheckCircle className="mr-1.5" />
                            <span>Completed</span>
                        </div>
                    )}
                </div>

                {recommendedSkills && recommendedSkills.length > 0 && (
                    <div className="flex items-center mt-2 text-xs text-slate-400">
                        <FaCode className="mr-1.5" />
                        <span>{recommendedSkills.join(', ')}</span>
                    </div>
                )}
            </Button>
        </motion.div>
    );
};
