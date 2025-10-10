import { motion, AnimatePresence } from 'framer-motion';
import { useState, type FC, type ReactNode } from 'react';

interface PaneProps {
    title: string;
    content: ReactNode;
    key: string;
}

interface InteractivePaneGroupProps {
    leftPane: PaneProps;
    rightPane: PaneProps;
    defaultActive?: 'left' | 'right';
}

interface InternalPaneComponentProps {
    paneData: PaneProps;
    isActive: boolean;
    onClick: () => void;
    side: 'left' | 'right';
}

const Pane: FC<InternalPaneComponentProps> = ({ paneData, isActive, onClick, side }) => {
    
    const contentVariants = {
        hidden: { opacity: 0, y: 15, transition: { duration: 0.2 } },
        visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.3 } },
    };
    
    const titleVariants = {
        hidden: { opacity: 0, x: -10, transition: { duration: 0.2 } },
        visible: { opacity: 1, x: 0, transition: { delay: 0.3, duration: 0.3 } },
    };

    return (
        <motion.div
            layout
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`group relative rounded-lg h-full transition-colors duration-200
                ${isActive 
                    ? 'flex-[1_1_100%] cursor-default' 
                    : 'cursor-pointer bg-background/40 basis-12 sm:basis-16 md:basis-20 lg:basis-24'
                }
            `}
            onClick={onClick}
        >
            <div className="w-full h-full overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                    {isActive ? (
                        <motion.div
                            key={`${paneData.key}-content`}
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="h-full"
                        >
                            {paneData.content}
                        </motion.div>
                    ) : (
                        <motion.div
                            key={`${paneData.key}-title`}
                            variants={titleVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <p
                                className={`text-xl sm:text-2xl font-bold text-foreground/60 transition-colors duration-200 
                                group-hover:text-foreground/90 tracking-wider select-none
                                ${side === 'left'
                                    ? '[writing-mode:vertical-rl] rotate-180'
                                    : '[writing-mode:vertical-lr]'
                                }`}
                            >
                                {paneData.title}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

const InteractivePaneGroup: FC<InteractivePaneGroupProps> = ({ leftPane, rightPane, defaultActive = 'left' }) => {
    const [activePane, setActivePane] = useState<'left' | 'right'>(defaultActive);

    return (
        <div className="flex w-full gap-2 h-100">
            <Pane 
                paneData={leftPane} 
                isActive={activePane === 'left'}
                onClick={() => setActivePane('left')}
                side="left"
            />
            <Pane 
                paneData={rightPane} 
                isActive={activePane === 'right'}
                onClick={() => setActivePane('right')}
                side="right"
            />
        </div>
    );
};

export default InteractivePaneGroup;