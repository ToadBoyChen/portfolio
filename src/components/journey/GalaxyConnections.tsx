// src/components/journey/GalaxyConnections.tsx
import type { FC } from 'react';
import { motion } from 'framer-motion';

// Add the new 'galaxy' type to our Connection interface
export interface Connection {
  from: { x: number; y: number };
  to: { x: number; y: number };
  id: string;
  type: 'galaxy' | 'intra' | 'inter-met' | 'inter-unmet';
}

interface GalaxyConnectionsProps {
  connections: Connection[];
  width: number;
  height: number;
}

export const GalaxyConnections: FC<GalaxyConnectionsProps> = ({ connections, width, height }) => {
  if (!width || !height || connections.length === 0) {
    return null;
  }

  const getStyle = (type: Connection['type']) => {
    switch (type) {
      // Add a style case specifically for the galaxy connections
      case 'galaxy':
        return {
          stroke: "url(#gradient-line-galaxy)",
          strokeWidth: "1.5", // Thicker than star lines
          strokeDasharray: "none",
        };
      case 'inter-met':
        return {
          stroke: "rgba(34, 197, 94, 0.7)",
          strokeWidth: "0.2",
          strokeDasharray: "none",
        };
      case 'inter-unmet':
        return {
          stroke: "rgba(239, 68, 68, 0.6)",
          strokeWidth: "0.2",
          strokeDasharray: "1 2",
        };
      case 'intra':
      default:
        return {
          stroke: "url(#gradient-line-constellation)",
          strokeWidth: "0.2",
          strokeDasharray: "none",
        };
    }
  };
  
  return (
    <svg 
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox={`0 0 ${width} ${height}`}
    >
      {connections.map((connection) => {
        const pathDefinition = `M ${connection.from.x} ${connection.from.y} L ${connection.to.x} ${connection.to.y}`;
        const style = getStyle(connection.type);
        
        return (
          <g key={connection.id}>
            <motion.path
              d={pathDefinition}
              fill="none"
              stroke={style.stroke}
              strokeWidth={style.strokeWidth}
              strokeDasharray={style.strokeDasharray}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 2, delay: Math.random() * 0.3, ease: "easeOut" }}
            />
            
            {/* Particle for intra-constellation paths */}
            {connection.type === 'intra' && (
              <motion.circle r="0.5" fill="rgba(255, 255, 255, 0.9)" initial={{ opacity: 0 }} animate={{ opacity: [0, 0.5, 0], cx: [connection.from.x, connection.to.x], cy: [connection.from.y, connection.to.y] }} transition={{ duration: 4.5, repeat: Infinity, delay: Math.random() * 5, times: [0, 0.5, 1], ease: "linear" }}/>
            )}
            
            {/* Bigger, more prominent particle for galaxy paths */}
            {connection.type === 'galaxy' && (
              <motion.circle r="1.5" fill="rgba(199, 210, 254, 0.9)" initial={{ opacity: 0 }} animate={{ opacity: [0, 0.8, 0], cx: [connection.from.x, connection.to.x], cy: [connection.from.y, connection.to.y] }} transition={{ duration: 3.5, repeat: Infinity, delay: Math.random() * 4, times: [0, 0.5, 1], ease: "linear" }}/>
            )}
          </g>
        );
      })}
      
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
    </svg>
  );
};