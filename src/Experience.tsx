// src/pages/Experience.tsx
 
import AnimatedText from "./animation/AnimatedText";
import SectionCard from "./components/SectionCard";
import { Button } from "./components/ui/button";
import Journey from "./components/journey/Journey";
import cvFile from "./assets/cv/cv.pdf";
import LinkCard from "./components/LinkCard";
import { SiSubstack, SiGithub, SiLinkedin } from "react-icons/si";
import type { JSX } from "react";

function Experience(): JSX.Element {
  return (
    <div 
      id="experience" 
      className="mt-54 flex flex-col px-4"
    >
      <AnimatedText 
        text="Experience" 
        className="text-3xl sm:text-5xl font-bold chango-regular text-background knewave-shadow self-center text-center"
      />
      <div className="mt-6">
        <SectionCard>
          <p className="text-base sm:text-lg text-center sm:text-left">
            I'm always doing stuff, whether that's personal projects, studying or work experience. Maybe you want to see what I've been up to. Enter the Quest Universe Below.
          </p>
        </SectionCard>
      </div>
      <Journey />
      <AnimatedText
        text="Check me out elsewhere"
        className="text-2xl sm:text-4xl font-bold text-background chango-regular knewave-shadow mt-16 sm:mt-24 self-center text-center"
      />
      <div className="mt-8 max-w-4xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <LinkCard 
            href="https://tobychenfinance.substack.com/"
            icon={<SiSubstack />}
            title="My Substack"
            description="My financial takes and market analysis. Weekly pieces."
          />
          <LinkCard 
            href="https://github.com/ToadBoyChen"
            icon={<SiGithub />}
            title="My GitHub"
            description="All my open-source projects, code snippets, and contributions."
          />
          <LinkCard 
            href="https://www.linkedin.com/in/toby-chen-167519298/"
            icon={<SiLinkedin />}
            title="My LinkedIn"
            description="My professional network, career history, and education details."
          />
        </div>
      </div>
      <AnimatedText
        text="Want My CV?"
        className="text-2xl sm:text-4xl font-bold text-background chango-regular knewave-shadow mt-16 sm:mt-24 self-center text-center"
      />
      <div className="mt-6">
        <SectionCard>
          <p className="text-center sm:text-left text-lg">
            I'm currently looking for work! if you think I would be a good fit for your team, feel free to download my CV below and reach out to me.
          </p>
          <div className="flex justify-center">
            <Button
              className="hover:bg-primary text-primary hover:text-background shadow-md border-0 bg-background hover:shadow-lg active:scale-90 transition-all duration-300 ease-in-out font-bold py-4 px-8 sm:p-8 sm:px-16 text-lg sm:text-xl rounded-full mt-6"
            >
              <a href={cvFile} download="Toby_Chen_CV.pdf">
                Download Here
              </a>
            </Button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

export default Experience;