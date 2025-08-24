import AnimatedText from "./components/AnimatedText.tsx";
import CharacterSheet from "./components/CharacterSheet.tsx";

function About() {
  return (
    <div id="about" className="flex flex-col items-center text-center text-lg">
      <AnimatedText 
        text="About me" 
        className="text-5xl font-bold chango-regular text-background knewave-shadow mb-12" 
      />
      <CharacterSheet/>
    </div>
  );
}

export default About;