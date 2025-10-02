// Radar.tsx

import { ResponsiveRadar } from '@nivo/radar';
import { FaReact, FaCode, FaMoneyBill } from 'react-icons/fa';
import { RiTeamFill } from "react-icons/ri";
import { TbMathFunction } from 'react-icons/tb';
import type { FC } from 'react';

// Data remains the same
const radarData = [
    { subject: 'WebDev', A: 75, icon: FaReact },
    { subject: 'Trading', A: 95, icon: FaMoneyBill },
    { subject: 'Programming', A: 98, icon: FaCode },
    { subject: 'Teamwork', A: 80, icon: RiTeamFill },
    { subject: 'Maths', A: 100, icon: TbMathFunction },
];

const nivoData = radarData.map(item => ({
  skill: item.subject,
  Proficiency: item.A,
}));

// The CustomGridLabel component is correct and does not need changes.
const CustomGridLabel: FC<any> = ({ id, x, y }) => {
  const dataPoint = radarData.find(d => d.subject === id);
  if (!dataPoint) return null;
  const { icon: Icon, subject } = dataPoint;

  return (
    <g transform={`translate(${x}, ${y})`}>
      <foreignObject x={-12} y={-12} width={24} height={24}>
          <div className="text-foreground/80 hover:text-purple-400 transition-colors cursor-pointer" title={subject}>
              <Icon size={24} />
          </div>
      </foreignObject>
    </g>
  );
};


const SkillRadar: FC = () => {
  // --- FIX #1: Define the gradient as a Nivo-native object ---
  // This is a cleaner, more declarative way than writing raw SVG in JSX.
  const gradientDef = {
    id: 'gradient', // The ID we will reference later
    type: 'linearGradient',
    colors: [
      { offset: 0, color: '#5A67D8', opacity: 0.5 },
      { offset: 100, color: '#9F7AEA', opacity: 0.3 },
    ],
  };

  return (
    <div className="w-full h-auto rounded-lg bg-background/40 p-2">
      {/* Header and Legend */}
      <div>
        <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 text-center">
          Skill Proficiency
        </h3>
        <div className="flex justify-center flex-wrap gap-4 mt-4 text-sm text-foreground/70">
          {radarData.map((item) => (
            <div key={item.subject} className="flex items-center gap-2">
              <item.icon size={14} className="text-purple-400" />
              <span>{item.subject}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full max-h-[35vh] aspect-square">
        <ResponsiveRadar
            data={nivoData}
            keys={['Proficiency']}
            indexBy="skill"
            maxValue={100}
            margin={{ top: 70, right: 50, bottom: 60, left: 50 }}
            curve="linearClosed"
            borderColor="#9F7AEA"
            borderWidth={2}
            gridLevels={6}
            gridShape="circular"
            gridLabelOffset={36}
            gridLabel={CustomGridLabel}
            enableDots={true}
            dotSize={8}
            dotColor="#9F7AEA"
            dotBorderWidth={1}
            dotBorderColor={{ from: 'color' }}
            defs={[gradientDef]}
            fill={[
              {
                match: { id: 'Proficiency' }, // Match the key from `keys` prop
                id: 'gradient', // Apply the gradient with this ID
              },
            ]}

            blendMode="multiply"
            motionConfig="wobbly"
        />
      </div>
    </div>
  );
};

export default SkillRadar;