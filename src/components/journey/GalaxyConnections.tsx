// src/components/journey/GalaxyConnections.tsx
import type { FC } from 'react';
import { memo } from 'react';
import { motion, type Variants } from 'framer-motion';

// Interface remains the same
export interface Connection {
  from: { x: number; y: number };
  to: { x: number; y: number };
  id: string;
  type: 'galaxy' | 'intra' | 'inter-met' | 'inter-unmet';
}

// --- Optimization 1: Move styles to a constant object outside the component ---
// This prevents the object from being recreated on every render and is more declarative.
const CONNECTION_STYLES = {
  galaxy: {
    stroke: "url(#gradient-line-galaxy)",
    strokeWidth: "1.5",
    strokeDasharray: "none",
  },
  'inter-met': {
    stroke: "rgba(34, 197, 94, 0.7)",
    strokeWidth: "0.2",
    strokeDasharray: "none",
  },
  'inter-unmet': {
    stroke: "rgba(239, 68, 68, 0.6)",
    strokeWidth: "0.2",
    strokeDasharray: "1 2",
  },
  intra: {
    stroke: "url(#gradient-line-constellation)",
    strokeWidth: "0.2",
    strokeDasharray: "none",
  },
};

// --- Optimization 2: Define animation variants for cleaner JSX ---
const pathVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 0.7,
    transition: { duration: 2, ease: "easeOut" },
  },
};

// A function to create particle variants dynamically to include delays
const createParticleVariants = (from: Connection['from'], to: Connection['to'], type: Connection['type']): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: [0, type === 'galaxy' ? 0.8 : 0.5, 0],
    cx: [from.x, to.x],
    cy: [from.y, to.y],
    transition: {
      duration: type === 'galaxy' ? 3.5 : 4.5,
      repeat: Infinity,
      delay: Math.random() * (type === 'galaxy' ? 4 : 5),
      times: [0, 0.5, 1],
      ease: "linear",
    },
  },
});

// --- Optimization 3: Create a memoized child component for a single connection ---
// This prevents re-rendering all connections if only one changes and improves separation of concerns.
interface ConnectionLineProps {
  connection: Connection;
}

const ConnectionLine: FC<ConnectionLineProps> = memo(({ connection }) => {
  const { from, to, type, id } = connection;
  const pathDefinition = `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
  const style = CONNECTION_STYLES[type];
  
  // Conditionally create variants only if needed
  const particleVariants = (type === 'intra' || type === 'galaxy') 
    ? createParticleVariants(from, to, type)
    : null;

  return (
    <g>
      <motion.path
        d={pathDefinition}
        fill="none"
        stroke={style.stroke}
        strokeWidth={style.strokeWidth}
        strokeDasharray={style.strokeDasharray}
        strokeLinecap="round"
        variants={pathVariants}
        initial="hidden"
        animate="visible"
        custom={id} 
      />
      
      {(type === 'intra' || type === 'galaxy') && (
        <motion.circle
          r={type === 'galaxy' ? "1.5" : "0.5"}
          fill={type === 'galaxy' ? "rgba(199, 210, 254, 0.9)" : "rgba(255, 255, 255, 0.9)"}
          variants={particleVariants!} // Non-null assertion is safe due to the check above
          initial="hidden"
          animate="visible"
        />
      )}
    </g>
  );
});

// --- Main Component ---
interface GalaxyConnectionsProps {
  connections: Connection[];
  width: number;
  height: number;
}

export const GalaxyConnections: FC<GalaxyConnectionsProps> = memo(({ connections, width, height }) => {
  if (!width || !height || connections.length === 0) {
    return null;
  }
  
  return (
    <svg 
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox={`0 0 ${width} ${height}`}
    >
      <defs>
        {/* Gradient for Constellation lines */}
        <linearGradient id="gradient-line-constellation" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="50%" stopColor="#C7D2FE" />
          <stop offset="100%" stopColor="#A5B4FC" />
        </linearGradient>

        {/* New, more vibrant gradient for Galaxy lines */}
        <linearGradient id="gradient-line-galaxy" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>

      {connections.map((connection) => (
        <ConnectionLine key={connection.id} connection={connection} />
      ))}
    </svg>
  );
});

// Setting displayName for better debugging with React DevTools
ConnectionLine.displayName = 'ConnectionLine';
GalaxyConnections.displayName = 'GalaxyConnections';