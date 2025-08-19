import { useEffect, useState } from "react";

const CoffeeCup: React.FC = () => {
  const [position, setPosition] = useState(0);
  const [action, setAction] = useState<"walking" | "sitting" | "reading">("walking");

  useEffect(() => {
    // Randomly change action every 3-6 seconds
    const interval = setInterval(() => {
      const actions: ("walking" | "sitting" | "reading")[] = ["walking", "sitting", "reading"];
      setAction(actions[Math.floor(Math.random() * actions.length)]);
    }, 3000 + Math.random() * 3000);

    // Move cup along the navbar
    const moveInterval = setInterval(() => {
      setPosition((prev) => (prev + 1) % 100); // position as percentage
    }, 50);

    return () => {
      clearInterval(interval);
      clearInterval(moveInterval);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",           // <- fixed instead of absolute
        top: "3rem",                    // sit at the top of the viewport
        left: `${position}%`,
        transform: "translate(-50%, -50%)",
        transition: "left 0.05s linear",
        zIndex: 100,                // above everything else
      }}
    >
      <span style={{ fontSize: "2rem" }}>
        {action === "walking" && "☕🚶"}
        {action === "sitting" && "☕🪑"}
        {action === "reading" && "☕📖"}
      </span>
    </div>
  );
};

export default CoffeeCup;
