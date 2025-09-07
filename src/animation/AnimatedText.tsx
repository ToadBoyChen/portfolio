import { motion, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  alwaysAnimate?: boolean;
  direction?: "up" | "down" | "left" | "right";
  order?: "ltr" | "rtl";
}

const containerVariants: Variants = {
  hidden: {},
  visible: (props: { delay: number; order: string } = { delay: 0, order: 'ltr' }) => ({
    transition: {
      delayChildren: props.delay,
      staggerChildren: 0.04,
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

  const letterVariants: Variants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -20 : direction === "right" ? 20 : 0,
      y: direction === "up" ? -50 : direction === "down" ? 50 : 0,
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
      custom={{ delay, order }}
      aria-label={text}
    >
      {letters.map((char, index) =>
        char === " " ? (
          <span key={index}>&nbsp;</span>
        ) : (
          <motion.span
            key={index}
            variants={letterVariants}
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