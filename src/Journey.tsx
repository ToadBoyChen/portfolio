import { useState, useEffect, useRef } from "react";
import { useJourneyStore } from './journeyStore'; // 1. Import the global store

// The data (JourneyStep interface and journeySteps array) remains the same...
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
  // 2. Use the global store instead of local useState
  const { progress, setProgress } = useJourneyStore();
  
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);

  // The rest of the component logic remains almost identical
  useEffect(() => {
    const handleScroll = (e: WheelEvent | TouchEvent) => {
      if (!isActive) return;

      let deltaY = 0;
      if (e instanceof WheelEvent) {
        deltaY = e.deltaY;
      } else if (e.type === 'touchmove') {
        deltaY = touchStartY.current - e.touches[0].clientY;
        touchStartY.current = e.touches[0].clientY;
      }

      if ((deltaY > 0 && progress < 100) || (deltaY < 0 && progress > 0)) {
        e.preventDefault();
        // 3. The setProgress call now updates the global store
        setProgress(prev => Math.min(100, Math.max(0, prev + deltaY * 0.05)));
      }
    };
    
    const handleTouchStart = (e: TouchEvent) => {
      if (!isActive) return;
      touchStartY.current = e.touches[0].clientY;
    };
    
    window.addEventListener("wheel", handleScroll, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleScroll, { passive: false });
    
    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleScroll);
    };
  }, [isActive, progress, setProgress]);

  // IntersectionObserver to activate/deactivate the scroll-jacking (no changes here)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting && entry.intersectionRatio >= 0.5),
      { threshold: 0.5 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);
  
  const timelineWidth = journeySteps.length * 100;
  const translateX = -((timelineWidth - 100) * (progress / 100));

  // The JSX remains identical
  return (
    <div
      ref={containerRef}
      className="h-screen bg-slate-900 text-white sticky top-0 overflow-hidden"
    >
      <div
        className="h-full flex items-center transition-transform duration-300 ease-out"
        style={{
          width: `${timelineWidth}vw`,
          transform: `translateX(${translateX}vw)`,
          willChange: 'transform',
        }}
      >
        {journeySteps.map((step, i) => (
          <div key={i} className="w-screen h-full flex flex-col items-center justify-center p-8 md:p-16">
            <div className="w-full max-w-md text-center bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 shadow-2xl">
              <p className="text-lg text-cyan-400 font-bold">{step.date}</p>
              <h3 className="text-3xl md:text-4xl font-bold my-2">{step.title}</h3>
              <p className="text-md md:text-lg text-slate-300">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-slate-700 rounded-full">
        <div
          className="h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default Journey;