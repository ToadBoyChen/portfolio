// Radar.tsx

import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { FaReact, FaCode, FaMoneyBill } from 'react-icons/fa';
import { RiTeamFill } from "react-icons/ri";
import { TbMathFunction } from 'react-icons/tb';
import type { FC } from 'react';

const radarData = [
    { subject: 'WebDev', A: 75, icon: FaReact },
    { subject: 'Trading', A: 95, icon: FaMoneyBill },
    { subject: 'Programming', A: 98, icon: FaCode },
    { subject: 'Teamwork', A: 80, icon: RiTeamFill },
    { subject: 'Maths', A: 100, icon: TbMathFunction },
];

const CustomAngleTick = ({ payload, x, y }: any) => {
    const dataPoint = radarData[payload.index];
    if (!dataPoint) return null;
    
    const { icon: Icon, subject } = dataPoint;
    return (
        <g>
            <foreignObject x={x - 20} y={y - 20} width={40} height={40}>
                <div className="flex items-center justify-center w-full h-full text-foreground/80 hover:text-primary transition-colors cursor-pointer">
                    <Icon size={24} title={subject} />
                </div>
            </foreignObject>
        </g>
    );
};

const SkillRadar: FC = () => {
    return (
        <motion.div
            className="w-full h-96 bg-background/50 rounded-lg p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
        >
            <h3 className="text-xl font-bold text-foreground mb-4 text-center">Skill Proficiency</h3>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <defs>
                        <radialGradient id="radarGradient">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                        </radialGradient>
                    </defs>
                    <PolarGrid stroke="hsl(var(--foreground) / 0.2)" />
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={<CustomAngleTick />}
                    />
                    <Radar
                        name="Skills"
                        dataKey="A"
                        stroke="hsl(var(--primary))"
                        fill="url(#radarGradient)"
                        strokeWidth={2}
                        animationDuration={1500}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </motion.div>
    );
};

export default SkillRadar;