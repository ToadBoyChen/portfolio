import Stats from "./Stats.tsx";
import Skills from "./Skills.tsx";
import { ValueCard } from "./components/ValueCard.tsx";
import { FiDownload, FiUsers } from 'react-icons/fi';
import { VscCode } from 'react-icons/vsc';
import { IoBulbOutline } from 'react-icons/io5';
import { motion } from "framer-motion";
import { FaCoffee, FaMountain } from 'react-icons/fa';
import { MdOutlineSportsKabaddi } from "react-icons/md";
import { Button } from "./components/ui/button.tsx";

const MyValues = () => (
  <motion.div 
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    transition={{ staggerChildren: 0.2 }}
    className="my-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl"
  >
    <ValueCard 
      icon={FiUsers}
      title="User-Focused"
      description="I believe the best products are built with the end-user in mind, creating intuitive and enjoyable experiences."
    />
    <ValueCard 
      icon={VscCode}
      title="Clean Code"
      description="I write readable, scalable, and maintainable code that my team (and my future self) will thank me for."
    />
    <ValueCard 
      icon={IoBulbOutline}
      title="Creative Solutions"
      description="I love tackling complex challenges and finding unique, effective solutions that push the boundaries."
    />
  </motion.div>
);


function About() {
  return (
    <div className="flex flex-col items-center text-center text-lg">
      <p id="about" className="text-5xl font-bold chango-regular text-background knewave-shadow mb-12">
        About me
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 w-full">
        <div>
          <img
          src="src/assets/me.jpeg"
          alt="A photo of Toby Chen"
          className="w-48 h-48 md:w-56 md:h-56 object-cover relative p-1 rounded-full bg-gradient-to-r from-rose-300 via-violet-300 to-purple-300 gradient-border flex-shrink-0"
        />
          <div className="mt-4">
            <div className="w-full">  
              <div className="flex justify-center items-center gap-8 md:gap-12">
                <div className="flex flex-col items-center gap-2">
                  <FaCoffee className="text-4xl text-foreground" />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <MdOutlineSportsKabaddi className="text-4xl text-foreground" />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <FaMountain className="text-4xl text-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Stats />
        </div>
      </div>
      <p className="mt-6">
          Hi, I'm Toby Chen, a passionate software developer with a love for creating
          interactive and engaging web applications. I enjoy working with the latest
          technologies and constantly strive to improve my skills.
      </p>
      <Skills />
      <p className="mt-6">
          My journey in tech is driven by a curiosity to learn and a passion for building things
          that make a difference. Let's create something amazing together!
      </p>
      <p className="text-3xl font-bold chango-regular knewave-shadow text-background mt-12">
        Want my CV?
      </p>
      <p className="mt-6">
        Let's create something amazing together! My journey in tech is driven by a curiosity to learn and a passion for building things
        that make a difference. Let's create something amazing together!
      </p>
      <Button
        className="hover:bg-primary text-primary hover:text-background shadow-md border-0 bg-background hover:shadow-lg
          active:scale-90
          transition-all duration-300 ease-in-out
          lg:relative
          bottom-4 left-4 lg:bottom-auto lg:left-auto font-bold p-8 px-16 text-xl rounded-full mt-6"
      >
        <a href="./src/assets/cv/mock-cv.pdf" download="Toby_Chen_CV.pdf">
          Download Here
        </a>
      </Button>
    </div>
  );
}

export default About;