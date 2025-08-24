import AnimatedText from "./components/AnimatedText"
import SectionCard from "./components/SectionCard"
import { Button } from "./components/ui/button"
import Journey from "./components/Journey"


function Experience() {
  return (
    <div id="experience" className="mt-54 flex flex-col">
      <AnimatedText text="Experience" className="text-5xl font-bold chango-regular text-background knewave-shadow self-center" />
      <div className="mt-6">
        <SectionCard>
          <p>
            Hi, I'm Toby Chen, a passionate software developer with a love for creating
            interactive and engaging web applications. I enjoy working with the latest
            technologies and constantly strive to improve my skills.
          </p>
        </SectionCard>
      </div>
      <Journey />
      {/* <div className="flex flex-row justify-around mt-8 text-lg gap-9 text-center">
          <div>
            <SectionCard>
              <AnimatedText
                text="Education"
                className="text-4xl font-bold text-background chango-regular knewave-shadow mb-4 absolute z-50 -translate-y-16 left-1/2 -translate-x-[50%]"
              />
              <p>
                Hi, I'm Toby Chen, a passionate software developer with a love for creating
                interactive and engaging web applications. I enjoy working with the latest
                technologies and constantly strive to improve my skills.
              </p>
            </SectionCard>
          </div>
        <div>
          <SectionCard>
            <AnimatedText
              text="Achievements"
              className="text-4xl font-bold text-background chango-regular knewave-shadow mb-4 absolute z-50 -translate-y-16 left-1/2 -translate-x-[50%]"
            />
            <p>
              Hi, I'm Toby Chen, a passionate software developer with a love for creating
              interactive and engaging web applications. I enjoy working with the latest
              technologies and constantly strive to improve my skills.
            </p>
          </SectionCard>
        </div>
      </div> */}
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
        </SectionCard>
      </div>
    </div>
  );
}

export default Experience;