import { useState, useEffect } from "react";
import AnimatedText from "./AnimatedText";

const roles = [
  "Mathematician",
  "Programmer",
  "Kickboxer",
  "MMA Fighter",
  "Investor",
];

export default function AnimatedRoles() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center">
      <AnimatedText
        key={index} // <-- important so it re-triggers animation each time
        text={roles[index]}
        className="text-5xl chango-regular knewave-shadow text-background"
        direction="left"
        order="ltr"
        delay={50}
      />
    </div>
  );
}
