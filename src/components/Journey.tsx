import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

interface JourneyStep {
  title: string;
  date: string;
  description: string;
}

const journeySteps: JourneyStep[] = [
  { title: "Started Coding", date: "2020", description: "Dived into the world of web development, starting with the fundamentals: HTML, CSS, and JavaScript." },
  { title: "First Internship", date: "2022", description: "Gained real-world experience building scalable applications and collaborating with a team of developers." },
  { title: "Personal Project", date: "2023", description: "Designed, developed, and deployed a full-stack application, showcasing my passion for creating cool things." },
  { title: "Today", date: "Present", description: "Continuously learning new technologies and seeking exciting challenges to solve with code." },
];

function JourneyStepCard({ step, index }: { step: JourneyStep; index: number }) {
  const isRightSide = index % 2 === 0;
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3, // how much of the element must be visible
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, x: isRightSide ? 100 : -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="relative w-full flex my-20"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <div className={`w-1/2 ${isRightSide ? "pl-8" : "pr-8 ml-auto"}`}>
        <div
          style={{ willChange: "transform" }}
          className="relative w-full max-w-md text-center bg-gradient-to-br from-blue-200/40 to-purple-300/50 py-8 px-2 rounded-3xl backdrop-blur-lg shadow-md z-10 flex-col justify-center"
        >
          {/* Title */}
          <p className="text-4xl font-bold text-background chango-regular knewave-shadow -translate-y-14 absolute -translate-x-[50%] left-1/2 min-w-xl z-50">
            {step.title}
          </p>

          {/* Description */}
          <p className="text-foreground text-lg">{step.description}</p>

          {/* Date */}
          <p className="font-bold text-primary tracking-wider absolute translate-y-10 translate-x-4">
            {step.date}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function Journey() {
  return (
    <div id="journey" className="relative">
      {journeySteps.map((step, index) => (
        <JourneyStepCard key={index} step={step} index={index} />
      ))}
    </div>
  );
}

export default Journey;
