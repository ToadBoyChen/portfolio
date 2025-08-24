import { useState } from 'react';
import Socials from './Socials.tsx';
import Sections from './Sections.tsx';
import NavButtonLeft from './components/NavButtonLeft.tsx';
import NavButtonRight from './components/NavButtonRight.tsx';
import AnimatedText from './components/AnimatedText.tsx';

function Navbar() {
  const [showSocials, setShowSocials] = useState(false);
  const [showSections, setShowSections] = useState(false);

  return (
    <nav className="top-0 left-0 right-0 fixed bg-accent shadow-md z-50 mx-8 mt-18 flex items-center justify-center rounded-full h-16">
      {/* large screens */}
      <div className="hidden lg:flex w-full justify-between px-4">
        <NavButtonLeft
          label="Socials"
          isOpen={showSocials}
          onClick={() => setShowSocials(prev => !prev)}
        />

        <AnimatedText className="z-[101] absolute text-background font-semibold -translate-x-1/2 left-1/2 chango-regular knewave-shadow text-6xl tracking-wide -translate-y-9"
        text="Toby Chen"
        delay={200}
        />

        <NavButtonRight
          label="Navigation"
          isOpen={showSections}
          onClick={() => setShowSections(prev => !prev)}
        />
      </div>


      {/* medium and small screens: place buttons bottom left and right */}
      <>
        {/* Socials button bottom left */}
        <div className="lg:hidden fixed bottom-4 left-4 z-50">
          <NavButtonLeft
            label="Socials"
            isOpen={showSocials}
            onClick={() => setShowSocials(prev => !prev)}
          />
        </div>
        {/* Navigation button bottom right */}
        <div className="lg:hidden fixed bottom-4 right-4 z-50">
          <NavButtonRight
            label="Navigation"
            isOpen={showSections}
            onClick={() => setShowSections(prev => !prev)}
          />
        </div>
        {/* Centered name for small screens */}
        <div className="lg:hidden w-full flex justify-center items-center absolute top-2 left-0 select-none">
          <AnimatedText className="z-[101] text-background font-semibold chango-regular knewave-shadow md:text-7xl sm:text-6xl text-5xl tracking-wide md:-translate-y-10 sm:-translate-y-8 -translate-y-5"
          text="Toby Chen"
          delay={200}
          />
        </div>
      </>

        {/* Panels */}
      <Socials open={showSocials} onOpenChange={setShowSocials} />
      <Sections open={showSections} onOpenChange={setShowSections} />
    </nav>
  );
}

export default Navbar;
