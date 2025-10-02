// Attributes.tsx

import { motion } from "framer-motion";
import type { FC } from "react";

const attributesData = [
    { short: "INT", long: "Intelligence", value: 18, description: "Problem-solving, memory, and logical reasoning." },
    { short: "WIS", long: "Wisdom", value: 14, description: "Insight, intuition, and practical judgment." },
    { short: "CHA", long: "Charisma", value: 15, description: "Confidence, eloquence, and leadership." },
    { short: "CON", long: "Constitution", value: 12, description: "Endurance, stamina, and resilience." },
    { short: "DEX", long: "Dexterity", value: 11, description: "Agility, reflexes, and physical precision." },
    { short: "STR", long: "Strength", value: 13, description: "Physical power and athletic capability." },
];

const Attributes: FC = () => {
    return (
        <div className="h-full flex flex-col bg-background/40 p-2">
            <p className="text-lg sm:text-xl font-bold text-foreground mb-4 flex-shrink-0">Core Attributes</p>
            <motion.ul
                className="flex-grow grid grid-cols-1 lg:grid-cols-2 overflow-y-auto overflow-x-hidden gap-2
                           scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-background/30"
            >
                {attributesData.map((attr) => (
                    <motion.li
                        key={attr.short}
                        className="flex items-center gap-4 py-3 rounded-lg"
                    >
                        <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary/20 to-primary/30 border-2 border-primary/50 rounded-full flex flex-col items-center justify-center font-bold"
                        >
                            <span className="text-xs text-primary/80 -mb-1">{attr.short}</span>
                            <span className="text-md sm:text-3xl text-primary drop-shadow-sm">{attr.value}</span>
                        </div>
                        <div className="flex-grow">
                            <h4 className="text-sm sm:text-xl font-bold text-foreground">{attr.long}</h4>
                            <p className="text-xs sm:text-sm text-foreground/80">{attr.description}</p>
                        </div>
                    </motion.li>
                ))}
            </motion.ul>
        </div>
    );
};

export default Attributes;