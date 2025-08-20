import ScrollDownButton from "./ScrollDownButton";
import AnimatedRoles from "./AnimatedRoles";
import IntroScreen from "./IntroScreen";
import IntroTraining from "./IntroTraining";

function Introduction() {
  return (
    <>
      <div className="p-24 min-h-screen flex flex-col justify-center">
        <div className="min-h-20"></div>
        <div className="flex flex-col text-left gap-3">
          <p className="text-5xl font-bold">
            Welcome,
          </p>
          <p id="introduction" className="flex items-center text-5xl font-bold">
            <span className="mr-2">I'm a</span> <AnimatedRoles />
          </p>
          <p className="text-4xl font-semibold mt-8">
            I spend most of my time behind a <IntroScreen/> or <IntroTraining/>, but I promise this website is safe to visit. Dive in and enjoy!
          </p>
          <div className="self-center mt-12 z-10">
            <ScrollDownButton />
          </div>
        </div>
      </div>
    </>
  );
}

export default Introduction;
