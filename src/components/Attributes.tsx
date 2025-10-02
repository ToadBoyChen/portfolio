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
    // Variants for the container to orchestrate the staggered animation of its children.
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.07,
                delayChildren: 0.2,
            },
        },
    };

    // Variants for each list item to animate in.
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    return (
        // THE FIX: Use a flex column layout to make the list scrollable within a fixed height.
        <div className="h-full flex flex-col">
            <h3 className="text-xl font-bold text-foreground mb-4 flex-shrink-0">Core Attributes</h3>
            <motion.ul
                className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-4 overflow-y-auto pr-2
                           scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-background/30"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {attributesData.map((attr) => (
                    <motion.li
                        key={attr.short}
                        variants={itemVariants}
                        className="flex items-center gap-4 p-3 bg-background/50 rounded-lg transition-all duration-200 
                                   hover:bg-background/70 hover:shadow-lg"
                    >
                        <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/30 
                                       border-2 border-primary/50 rounded-full flex flex-col items-center justify-center font-bold"
                        >
                            <span className="text-xs text-primary/80 -mb-1">{attr.short}</span>
                            <span className="text-3xl text-primary drop-shadow-sm">{attr.value}</span>
                        </div>
                        <div className="flex-grow">
                            <h4 className="font-bold text-foreground">{attr.long}</h4>
                            <p className="text-sm text-foreground/80">{attr.description}</p>
                        </div>
                    </motion.li>
                ))}
            </motion.ul>
        </div>
    );
};

export default Attributes;