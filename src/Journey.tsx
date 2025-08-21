import { useState, useEffect, useRef } from "react";
import { useJourneyStore } from './journeyStore';

// --- JourneyStep interface and journeySteps data remain the same ---
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

function Journey() {
  const { progress, setProgress } = useJourneyStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // The useEffect for handling scroll remains the same...
  useEffect(() => {
    const handleScroll = () => {
      const el = scrollContainerRef.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollDistance = height - viewportHeight;
      const currentProgress = Math.min(1, Math.max(0, (-top) / scrollDistance));
      setProgress(currentProgress * 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setProgress]);

  const timelineWidth = journeySteps.length * 100;
  const translateX = -((timelineWidth - 100) * (progress / 100));

  return (
    // IMPROVEMENT #4: Reduced height for a better feel on mobile
    <div id="journey" ref={scrollContainerRef} className="relative" style={{ height: '250vh' }}>
      
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div 
          // IMPROVEMENT #2: Reduced padding on mobile (p-6), larger on desktop (md:p-10)
          className="h-auto w-full rounded-2xl shadow-xl p-6 md:p-10 
                     mx-4 sm:mx-auto max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 
                     backdrop-blur-lg border border-white/20 bg-gradient-to-br from-white/10 to-rose-300"
        >
          <div
            className="h-full flex items-center transition-transform duration-100 ease-linear"
            style={{
              width: `${timelineWidth}vw`,
              transform: `translateX(${translateX}vw)`,
              willChange: 'transform',
            }}
          >
            {journeySteps.map((step, i) => (
              <div key={i} className="w-screen h-full flex flex-col items-center justify-center p-4">
                {/* IMPROVEMENT #2: Reduced padding on mobile */}
                <div className="w-full max-w-md text-center border border-white/20 bg-gradient-to-br from-white/10 to-red-300 p-4 sm:p-6 rounded-3xl">
                  {/* IMPROVEMENT #3: Responsive positioning for the date */}
                  <p className="absolute text-base md:text-lg font-bold text-primary tracking-wider -translate-y-10 md:-translate-y-14">{step.date}</p>
                  {/* IMPROVEMENT #1: Responsive font sizes for the title and description */}
                  <p className="text-3xl md:text-4xl font-bold my-4 md:my-6 text-background chango-regular knewave-shadow">{step.title}</p>
                  <p className="text-base md:text-lg text-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-1/2 md:w-1/3 h-1 bg-yellow-950 rounded-full">
          <div
            className="h-1 bg-gradient-to-r from-red-300 to-violet-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default Journey;