// src/components/LinkCard.tsx

import React from 'react';
import SectionCard from './SectionCard'; // Make sure this path is correct

// The props interface remains the same
interface LinkCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const LinkCard: React.FC<LinkCardProps> = ({ href, icon, title, description }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full transition-all duration-300 ease-in-out hover:-translate-y-2 active:scale-95"
    >
      <SectionCard 
        className="h-full border-2 border-transparent "
      >
        <div className="flex flex-col items-center justify-start text-center">
          <div className="text-primary text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <h3 className="text-xl font-bold mb-2 text-primary">{title}</h3>
          <p className="text-base">{description}</p>
        </div>
      </SectionCard>
    </a>
  );
};

export default LinkCard;
