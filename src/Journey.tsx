import { motion } from "framer-motion";

// The JourneyStep interface and data array remain the same
interface JourneyStep {
  title: string;
  date: string;
  description: string;
}
const journeySteps: JourneyStep[] = [
  { title: "Started Coding", date: "2020", description: "Dived into the world of web development, starting with the fundamentals: HTML, CSS, and JavaScript." },
  { title: "First Internship", date: "2022", description: "Gained real-world experience building scalable applications and collaborating with a team of developers." },
  { title: "Launched Personal Project", date: "2023", description: "Designed, developed, and deployed a full-stack application, showcasing my passion for creating cool things." },
  { title: "Today", date: "Present", description: "Continuously learning new technologies and seeking exciting challenges to solve with code." },
];


// JourneyStepCard component remains EXACTLY the same as your last version.
function JourneyStepCard({ step, index }: { step: JourneyStep; index: number }) {
  const isRightSide = index % 2 === 0;

  const containerVariants = {
    hidden: { opacity: 0, x: isRightSide ? 100 : -100, },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 }
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="relative w-full flex my-20"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.5 }}
    >
      <div className={`w-1/2 ${isRightSide ? 'pl-8' : 'pr-8 ml-auto'}`}>
          <div 
            style={{ willChange: 'transform' }}
            className="w-full max-w-md text-center border border-white/20 bg-gradient-to-br from-white/10 to-red-300/20 p-4 sm:p-6 rounded-3xl backdrop-blur-lg shadow-xl"
          >
            <p className="absolute text-base md-text-lg font-bold text-primary tracking-wider -translate-y-10 md:-translate-y-12">{step.date}</p>
            <motion.p variants={itemVariants} className="text-3xl md:text-4xl font-bold my-4 md:my-6 text-background chango-regular knewave-shadow">
              {step.title}
            </motion.p>
            <motion.p variants={itemVariants} className="text-base md:text-lg text-foreground">
              {step.description}
            </motion.p>
          </div>
      </div>
    </motion.div>
  );
}


// The Journey component is now just a simple container
function Journey() {
  return (
    <div id="journey" className="relative sm:px-8">
      {journeySteps.map((step, index) => (
        <JourneyStepCard key={index} step={step} index={index} />
      ))}
    </div>
  );
}

export default Journey;