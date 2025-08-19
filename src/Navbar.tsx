import { useState } from 'react';
import Socials from './Socials.tsx';
import Sections from './Sections.tsx';
import NavButtonLeft from './NavButtonLeft.tsx';
import NavButtonRight from './NavButtonRight.tsx';

function Navbar() {
  const [showSocials, setShowSocials] = useState(false);
  const [showSections, setShowSections] = useState(false);

  return (
    <nav className="top-0 bg-accent shadow-md z-50 px-0 py-2 mt-8 relative flex items-center justify-center w-full rounded-full h-16">
      {/* <CoffeeCup/> */}

      {/* large screens */}
      <div className="hidden lg:flex w-full justify-between px-4">
        <NavButtonLeft
          label="Socials"
          isOpen={showSocials}
          onClick={() => setShowSocials(prev => !prev)}
        />

        <p className="z-[101] absolute text-background font-semibold -translate-x-1/2 left-1/2 chango-regular knewave-shadow text-6xl tracking-widest -translate-y-9">
          {"Toby Chen".split("").map((char, i) => (
            <span key={i} className={`bounce-letter bounce-wave bounce-delay-${i}`}>
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </p>

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
          <p className="z-[101] text-background font-semibold chango-regular knewave-shadow md:text-7xl sm:text-6xl text-5xl tracking-widest md:-translate-y-10 sm:-translate-y-8 -translate-y-5">
            {"Toby Chen".split("").map((char, i) => (
              <span key={i} className={`bounce-letter bounce-wave bounce-delay-${i}`}>
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </p>
        </div>
      </>

        {/* Panels */}
      <Socials open={showSocials} onOpenChange={setShowSocials} />
      <Sections open={showSections} onOpenChange={setShowSections} />
    </nav>
  );
}

export default Navbar;
