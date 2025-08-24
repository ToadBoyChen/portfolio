import Stats from "./components/Stats.tsx";
import Skills from "./components/Skills.tsx";
import { FaCoffee, FaMountain } from 'react-icons/fa';
import { MdOutlineSportsKabaddi } from "react-icons/md";
import SectionCard from "./components/SectionCard.tsx";
import AnimatedText from "./components/AnimatedText.tsx";


function About() {
  return (
    <div id="about" className="flex flex-col items-center text-center text-lg">
      <AnimatedText text="About me" className="text-5xl font-bold chango-regular text-background knewave-shadow mb-12" />
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
      <div className="mt-8">
        <SectionCard>
        <p>
          Hi, I'm Toby Chen, a passionate software developer with a love for creating
          interactive and engaging web applications. I enjoy working with the latest
          technologies and constantly strive to improve my skills.
        </p>
      </SectionCard>
    </div>
    <div className="flex mt-6">
      <Skills />
      <SectionCard>
        <p>
          Hi, I'm Toby Chen, a passionate software developer with a love for creating
          interactive and engaging web applications. I enjoy working with the latest
          technologies and constantly strive to improve my skills.
        </p>
      </SectionCard>
    </div>
  </div>
);}

export default About;