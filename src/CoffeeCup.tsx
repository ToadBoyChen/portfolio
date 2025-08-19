import { useEffect, useState } from "react";

const coffeeImages = [
  "src/assets/background/coffee.png",
  "src/assets/background/croissant.png",
  "src/assets/background/sandwich.png",
];

interface Cup {
  id: number;
  x: number;
  y: number;
  vy: number;
  img: string;
  bounce: number; // unique per cup
}

const CoffeeCup: React.FC = () => {
  const [cups, setCups] = useState<Cup[]>([]);

  useEffect(() => {
    const maxCups = 10;

    const spawnCup = () => {
      setCups((prev) => {
        const newCup: Cup = {
          id: Date.now(),
          x: Math.random() * window.innerWidth,
          y: -50,
          vy: 0,
          img: coffeeImages[Math.floor(Math.random() * coffeeImages.length)],
          bounce: Math.random() * 0.5 + 0.3, // between 0.5 and 1.0
        };

        return [...prev, newCup].slice(-maxCups);
      });
    };

    const spawnInterval = setInterval(spawnCup, 2000 + Math.random() * 2000);

    const gravity = 0.5;

    const physicsInterval = setInterval(() => {
      setCups((prev) =>
        prev.map((cup) => {
          let newVy = cup.vy + gravity;
          let newY = cup.y + newVy;

          if (newY + 64 > window.innerHeight) {
            newY = window.innerHeight - 64;
            newVy = -1 * newVy * cup.bounce; // use the cup’s own bounce factor
            if (Math.abs(newVy) < 1) newVy = 0;
          }

          return { ...cup, y: newY, vy: newVy };
        })
      );
    }, 30);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(physicsInterval);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: -1,
      }}
    >
      {cups.map((cup) => (
        <img
          key={cup.id}
          src={cup.img}
          alt="coffee cup"
          style={{
            position: "absolute",
            left: cup.x,
            top: cup.y,
            width: "64px",
            height: "64px",
            userSelect: "none",
          }}
        />
      ))}
    </div>
  );
};

export default CoffeeCup;
