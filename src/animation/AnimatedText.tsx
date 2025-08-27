// components/AnimatedText.tsx (Final Version with Direction/Order)

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  alwaysAnimate?: boolean;
  /** Defines the starting point of the animation for each letter. Defaults to 'down'. */
  direction?: "up" | "down" | "left" | "right";
  /** Defines the stagger order of the letters. Defaults to 'ltr' (left-to-right). */
  order?: "ltr" | "rtl";
}

// Container variants now accept an object to control stagger direction
const containerVariants = {
  hidden: {},
  visible: (props: { delay: number; order: string } = { delay: 0, order: 'ltr' }) => ({
    transition: {
      delayChildren: props.delay,
      staggerChildren: 0.04,
      // Use staggerDirection to control the order
      staggerDirection: props.order === 'rtl' ? -1 : 1,
    },
  }),
};

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className,
  delay = 0,
  alwaysAnimate = false,
  direction = "down",
  order = "ltr",
}) => {
  const letters = Array.from(text);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Define letter variants dynamically based on the 'direction' prop
  const letterVariants = {
    hidden: {
      opacity: 0,
      // Set initial position based on direction
      x: direction === "left" ? -20 : direction === "right" ? 20 : 0,
      y: direction === "up" ? -50 : direction === "down" ? 50 : 0,
      // Add a bit of rotation for more flair
      rotate: direction === "left" ? -10 : direction === "right" ? 10 : 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={`flex ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={inView || alwaysAnimate ? "visible" : "hidden"}
      // Pass both delay and order to the container's variants
      custom={{ delay, order }}
      aria-label={text}
    >
      {letters.map((char, index) =>
        char === " " ? (
          <span key={index}>&nbsp;</span>
        ) : (
          <motion.span
            key={index}
            variants={letterVariants} // Use the dynamically created variants
            style={{ display: "inline-block" }}
          >
            {char}
          </motion.span>
        )
      )}
    </motion.div>
  );
};

export default AnimatedText;