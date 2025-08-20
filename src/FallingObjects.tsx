import { useEffect, useRef } from "react";
import Matter, { Engine, Render, Runner, Bodies, World, Body } from "matter-js";

// Array of images to choose from
const coffeeImages = [
  "src/assets/fallingObjects/coffee.png",
  "src/assets/fallingObjects/croissant.png",
  "src/assets/fallingObjects/sandwich.png",
  "src/assets/fallingObjects/coffee0.png",
  "src/assets/fallingObjects/glove.png",
];

const maxWidth = 800;

const FallingObjects = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const cupsRef = useRef<Body[]>([]);

  useEffect(() => {
    if (!sceneRef.current) return;

    const engine = Engine.create();

    const pageHeight = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
                   document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );

    const render = Render.create({
      element: sceneRef.current,
      engine,
      options: {
        width: Math.min(window.innerWidth, maxWidth),
        height: pageHeight,
        wireframes: false,
        background: "transparent",
      },
    });

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    const groundHeight = 20;
    const ground = Bodies.rectangle(
      window.innerWidth / 2,
      pageHeight - groundHeight / 2,
      window.innerWidth * 1.5,
      groundHeight,
      { isStatic: true, render: { visible: false } }
    );
    World.add(engine.world, ground);

    engine.world.gravity.y = 0.6;

    const spawnCup = () => {
      const img = coffeeImages[Math.floor(Math.random() * coffeeImages.length)];
      const scale = Math.random() + 0.8;
      const bounce = Math.random() + 0.3;
      const dense = Math.random() * 0.01 + 0.002;
      const cup = Bodies.polygon(
        Math.random() * Math.min(window.innerWidth, maxWidth),
        -100,
        8,
        16,
        {
          restitution: bounce,
          friction: 0.3,
          density: dense,
          render: { sprite: { texture: img, xScale: scale, yScale: scale } },
        }
      );
      Body.setAngularVelocity(cup, (Math.random() - 0.5) * 0.2);
      
      // If we already have 80 cups, remove the oldest one
      if (cupsRef.current.length >= 60) {
        const oldest = cupsRef.current.shift(); // remove first
        if (oldest) World.remove(engine.world, oldest);
      }

      // Add the new cup
      World.add(engine.world, cup);
      cupsRef.current.push(cup);
    };


    const firstSpawnTimeout = setTimeout(() => {
      spawnCup();
      const interval = setInterval(spawnCup, 1000);
      render.canvas.setAttribute("data-interval-id", String(interval));
    }, 1500);

    return () => {
      clearTimeout(firstSpawnTimeout);
      const id = render.canvas.getAttribute("data-interval-id");
      if (id) clearInterval(Number(id));
      Render.stop(render);
      Runner.stop(runner);
      World.clear(engine.world, false);
      Engine.clear(engine);
      render.canvas.remove();
    };
  }, []);

  return <div ref={sceneRef} style={{ position: "absolute", top: 0, left: "50%", zIndex: -1, width: Math.min(window.innerWidth, maxWidth), transform: "translateX(-50%)" }} />;
};

export default FallingObjects;