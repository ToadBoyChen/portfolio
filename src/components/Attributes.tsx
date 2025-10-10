// Attributes.tsx

import { motion } from "framer-motion";
import type { FC } from "react";

const attributesData = [
    { short: "INT", long: "Intelligence", value: 18, description: "Problem-solving, memory, and logical reasoning. Mastered Linux systems through hands-on troubleshooting and automation." },
    { short: "WIS", long: "Wisdom", value: 14, description: "Insight, intuition, and practical judgment. Making long and short trades on markets - even through a painful hold." },
    { short: "CHA", long: "Charisma", value: 15, description: "Confidence, eloquence, and leadership. Proven through successful group projects and presentations. Fight nationally - showing resilience and confidence." },
    { short: "CON", long: "Constitution", value: 12, description: "Endurance, stamina, and resilience. I'll work hard for what I seek, and I won't give up." },
    { short: "DEX", long: "Dexterity", value: 11, description: "Agility, reflexes, and physical precision. Even during tricky times can I maintain productive, high quality work." },
    { short: "STR", long: "Strength", value: 13, description: "Power and influence. I can be a driving force in workplaces. I strive to uplift others and create a positive impact." },
];

const Attributes: FC = () => {
    return (
        <div className="h-full flex flex-col bg-background/40 p-2">
            <p className="text-lg sm:text-xl font-bold text-foreground mb-4 flex-shrink-0">Core Attributes</p>
            <motion.ul
                className="flex-grow grid grid-cols-1 md:grid-cols-2 overflow-y-auto overflow-x-hidden gap-2
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
                            <h4 className="text-sm sm:text-xl font-bold text-primary">{attr.long}</h4>
                            <p className="text-sm">{attr.description}</p>
                        </div>
                    </motion.li>
                ))}
            </motion.ul>
        </div>
    );
};

export default Attributes;