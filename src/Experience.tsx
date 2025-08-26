import AnimatedText from "./components/AnimatedText"
import SectionCard from "./components/SectionCard"
import { Button } from "./components/ui/button"
import Journey from "./components/Journey"


function Experience() {
  return (
    <div 
      id="experience" 
      className="mt-54 flex flex-col"
    >
      <AnimatedText 
        text="Quests" 
        className="text-5xl font-bold chango-regular text-background knewave-shadow self-center"
      />
      <div className="mt-6">
        <SectionCard>
          <p className="text-lg">
            I'm always doing stuff, whether that's personal projects, getting an education or work experience. Below is a timeline of my journey so far.
          </p>
        </SectionCard>
      </div>
      <Journey />
      <AnimatedText
      text="Want My CV?"
      className="text-4xl font-bold text-background chango-regular knewave-shadow mt-24 self-center"
      />
      <div className="mt-6">
        <SectionCard>
          <p>
            Let's create something amazing together! My journey in tech is driven by a curiosity to learn and a passion for building things
            that make a difference. Let's create something amazing together!
          </p>
          <Button
            className="hover:bg-primary text-primary hover:text-background shadow-md border-0 bg-background hover:shadow-lg active:scale-90 transition-all duration-300 ease-in-out font-bold p-8 px-16 text-xl rounded-full mt-6"
          >
            <a href="./src/assets/cv/mock-cv.pdf" download="Toby_Chen_CV.pdf">
              Download Here
            </a>
          </Button>
        </SectionCard>
      </div>
    </div>
  );
}

export default Experience;