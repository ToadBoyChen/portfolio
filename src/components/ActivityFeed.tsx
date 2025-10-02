// ActivityFeed.tsx

import { motion } from "framer-motion";
import { useMemo, type FC } from "react";
import { journeySteps } from './journey/journeyData';
import { FiAward, FiGitMerge, FiPlusSquare } from 'react-icons/fi';

const getActivityIcon = (title: string) => {
    if (title.toLowerCase().includes('complete')) return <FiAward className="text-green-400" />;
    if (title.toLowerCase().includes('refactor')) return <FiGitMerge className="text-sky-400" />;
    return <FiPlusSquare className="text-amber-400" />;
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const ActivityFeed: FC = () => {
    const recentActivities = useMemo(() => {
        return [...journeySteps]
            .filter(j => j.progress > 0)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 6);
    }, []);

    return (
        <div
            className="w-full h-[400px] lg:h-full flex flex-col bg-background/40 p-2"
        >
            <h3 className="text-lg font-bold text-foreground mb-4 flex-shrink-0">Recent Activity</h3>
            <motion.ul
                className="flex-grow space-y-4 overflow-y-auto
                           scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-background/30"
            >
                {recentActivities.map((activity, index) => (
                    <motion.li
                        key={activity.title}
                        variants={itemVariants}
                        className="relative pl-12 transition-all duration-200 rounded-lg
                                   hover:bg-background/60 text-left"
                    >
                        <div className="absolute left-4 top-0 h-full flex flex-col items-center">
                            <div className="flex-shrink-0 text-lg sm:text-xl z-10 p-1.5 bg-background/50 rounded-full ring-2 ring-background/80">
                                {getActivityIcon(activity.title)}
                            </div>
                            {index < recentActivities.length - 1 && (
                                <div className="flex-grow w-px bg-foreground/20" />
                            )}
                        </div>
                        <div className="min-h-[4.5rem] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3">
                            <div className="flex-grow">
                                <p className="font-semibold text-foreground leading-tight text-sm sm:text-base">{activity.title}</p>
                                <p className="text-xs text-foreground/70 mt-1">
                                    {new Date(activity.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </p>
                            </div>
                            <div className="flex-shrink-0">
                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${activity.progress === 100 ? 'bg-green-500/20 text-green-400' : 'bg-sky-500/20 text-sky-400'}`}>
                                    {activity.progress === 100 ? 'Completed' : 'Uncompleted'}
                                </span>
                            </div>
                        </div>
                    </motion.li>
                ))}
            </motion.ul>
        </div>
    );
};

export default ActivityFeed;