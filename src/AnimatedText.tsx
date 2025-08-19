import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  direction?: "left" | "right";
  order?: "ltr" | "rtl";
  delay?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ 
  text, 
  className, 
  direction = "left", 
  order = "ltr", 
  delay = 0
}) => {
  const letters = Array.from(text);
  const [isVisible, setIsVisible] = useState(false);
  const [hasRendered, setHasRendered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setHasRendered(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  // Return hidden container until animation starts
  if (!hasRendered) {
    return (
      <div 
        className={className} 
        style={{ opacity: 0, visibility: 'hidden' }}
        aria-hidden="true"
      >
        {text}
      </div>
    );
  }

  return (
    <div className={`flex ${className}`}>
      {letters.map((char, index) => {
        const delayIndex = order === "ltr" ? index : letters.length - 1 - index;

        return (
          <motion.span
            key={index}
            initial={{ 
              x: direction === "left" ? -20 : 20, 
              opacity: 0,
              // Add scale for better effect
              scale: 0.8
            }}
            animate={{ 
              x: 0, 
              opacity: 1,
              scale: 1
            }}
            transition={{ 
              delay: delayIndex * 0.05, 
              type: "spring", 
              stiffness: 100,
              // Add mass and damping for smoother spring
              mass: 0.5,
              damping: 8
            }}
            style={{ display: 'inline-block' }}
          >
            {char}
          </motion.span>
        );
      })}
    </div>
  );
};

export default AnimatedText;