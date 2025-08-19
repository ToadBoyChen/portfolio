import { useEffect, useRef } from "react";
import Matter, { Engine, Render, Runner, Bodies, World, Body } from "matter-js";

// Array of images to choose from
const coffeeImages = [
  "src/assets/background/coffee.png",
  "src/assets/background/croissant.png",
  "src/assets/background/sandwich.png",
];

const CoffeeCup = () => {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const engine = Engine.create();
    const world = engine.world;

    // Renderer
    const render = Render.create({
      element: sceneRef.current!,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: "transparent",
      },
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Ground
    const groundHeight = 20;
    const ground = Bodies.rectangle(
      window.innerWidth / 2,
      window.innerHeight,
      window.innerWidth,
      groundHeight,
      { 
        isStatic: true,
        render: { visible: false } 
      }
    );
    World.add(world, ground);

    // Store cups in a rolling buffer
    const cups: Body[] = [];
    const MAX_CUPS = 40;

    const spawnCup = () => {
      // Pick a random image
      const img = coffeeImages[Math.floor(Math.random() * coffeeImages.length)];

      const cup = Bodies.rectangle(
        Math.random() * window.innerWidth,
        -100,
        32,
        32,
        {
          restitution: 0.6,
          friction: 0.3,
          render: {
            sprite: {
              texture: img,
              xScale: 1,
              yScale: 1,
            },
          },
        }
      );

      // Add cup to world & buffer
      World.add(world, cup);
      cups.push(cup);

      // Remove oldest if exceeding max
      if (cups.length > MAX_CUPS) {
        const old = cups.shift()!;
        World.remove(world, old);
      }
    };

    const interval = setInterval(spawnCup, 2000);

    return () => {
      clearInterval(interval);
      Render.stop(render);
      World.clear(world, false);
      Engine.clear(engine);
      render.canvas.remove();
    };
  }, []);

  return <div ref={sceneRef} style={{ position: "fixed", top: 0, left: 0 }} />;
};

export default CoffeeCup;
