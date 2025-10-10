import ScrollDownButton from "./components/ScrollDownButton";
import AnimatedRoles from "./animation/AnimatedRoles";

function Introduction() {
  return (
    <>
      <div className="px-4 sm:px-12 lg:px-24 min-h-screen flex flex-col justify-center">
        <div className="min-h-20"></div>
        <div className="flex flex-col text-center sm:text-left gap-3">
          <p className="text-3xl sm:text-5xl font-bold">
            Welcome,
          </p>
          <p
            id="introduction"
            className="flex flex-col sm:flex-row items-center justify-center sm:justify-start text-3xl sm:text-5xl font-bold"
          >
            <span className="mr-0 sm:mr-2">I'm a</span> <AnimatedRoles />
          </p>
          <p className="text-lg sm:text-2xl lg:text-4xl font-semibold mt-6 sm:mt-8">
            Where an Athletics drive meets mathematical precision.
          </p>
          <p className="text-lg sm:text-2xl lg:text-4xl font-semibold">
            Always evolving. Always improving.
          </p>
          <div className="self-center mt-16 sm:mt-24 z-10">
            <ScrollDownButton />
          </div>
        </div>
      </div>
    </>
  );
}

export default Introduction;