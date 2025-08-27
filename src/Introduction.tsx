import ScrollDownButton from "./components/ScrollDownButton";
import AnimatedRoles from "./animation/AnimatedRoles";

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
            I spend most of my time behind a screen or training, but I promise this website is safe to visit. Dive in and enjoy!
          </p>
          <div className="self-center mt-24 z-10">
            <ScrollDownButton />
          </div>
        </div>
      </div>
    </>
  );
}

export default Introduction;
