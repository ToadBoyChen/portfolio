import React from 'react';
import { motion } from 'framer-motion';
import { GiBrain, GiStrong } from 'react-icons/gi';
import { FaShieldAlt, FaUsers, FaLightbulb } from 'react-icons/fa';

const attributesData = [
  { icon: <GiBrain />, label: 'Creativity', value: 9 },
  { icon: <GiStrong />, label: 'Resilience', value: 8 },
  { icon: <FaShieldAlt />, label: 'Discipline', value: 7 },
  { icon: <FaUsers />, label: 'Teamwork', value: 9 },
  { icon: <FaLightbulb />, label: 'Adaptability', value: 10 },
];

const AttributeItem = ({ icon, label, value, index }: { icon: React.ReactNode; label: string; value: number; index: number }) => {
  return (
    <motion.div
      className="flex flex-col gap-2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <div className="flex items-center gap-3">
        {/* THEME UPDATE */}
        <span className="text-xl text-primary">{icon}</span>
        <p className="font-semibold text-foreground">{label}</p>
      </div>
      <div className="flex gap-1.5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            // THEME UPDATE
            className={`h-2.5 w-full rounded-sm ${i < value ? 'bg-primary' : 'bg-background'}`}
          />
        ))}
      </div>
    </motion.div>
  );
};

function Attributes() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 p-4">
      {attributesData.map((attr, index) => (
        <AttributeItem
          key={attr.label}
          icon={attr.icon}
          label={attr.label}
          value={attr.value}
          index={index}
        />
      ))}
    </div>
  );
}

export default Attributes;