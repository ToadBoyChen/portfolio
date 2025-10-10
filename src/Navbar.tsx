import { useState } from 'react';
import Socials from './components/Socials.tsx';
import Sections from './components/Sections.tsx';
import NavButtonLeft from './components/NavButtonLeft.tsx';
import NavButtonRight from './components/NavButtonRight.tsx';
import AnimatedText from './animation/AnimatedText.tsx';

function Navbar() {
  const [showSocials, setShowSocials] = useState(false);
  const [showSections, setShowSections] = useState(false);

  return (
    <nav className="top-0 left-0 right-0 fixed bg-accent shadow-md z-50 mx-8 lg:mt-12 md:mt-8 mt-4 flex items-center justify-center rounded-full h-16">
      <div className="hidden lg:flex w-full justify-between px-4">
        <NavButtonLeft
          label="Socials"
          isOpen={showSocials}
          onClick={() => setShowSocials(prev => !prev)}
        />

        <AnimatedText
          className="z-[101] absolute text-background font-semibold -translate-x-1/2 left-1/2 chango-regular knewave-shadow text-7xl tracking-wide -translate-y-9"
          text="Toby Chen"
          delay={0.5}
          alwaysAnimate={true}
        />

        <NavButtonRight
          label="Navigation"
          isOpen={showSections}
          onClick={() => setShowSections(prev => !prev)}
        />
      </div>
      <>
        <div className="lg:hidden fixed bottom-4 left-4 z-50">
          <NavButtonLeft
            label="Socials"
            isOpen={showSocials}
            onClick={() => setShowSocials(prev => !prev)}
          />
        </div>
        <div className="lg:hidden fixed bottom-4 right-4 z-50">
          <NavButtonRight
            label="Navigation"
            isOpen={showSections}
            onClick={() => setShowSections(prev => !prev)}
          />
        </div>
        <div className="lg:hidden w-full flex justify-center items-center absolute top-2 left-0 select-none">
          <AnimatedText
            className="z-[101] text-background font-semibold chango-regular knewave-shadow text-5xl sm:text-6xl md:text-7xl tracking-wide -translate-y-5 sm:-translate-y-8 md:-translate-y-10"
            text="Toby Chen"
            delay={0.5}
            alwaysAnimate={true}
          />
        </div>
      </>
      <Socials open={showSocials} onOpenChange={setShowSocials} />
      <Sections open={showSections} onOpenChange={setShowSections} />
    </nav>
  );
}

export default Navbar;
