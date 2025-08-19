import { useEffect, useRef } from "react";
import Matter, { Engine, Render, Runner, Bodies, World, Body } from "matter-js";

// Array of images to choose from
const coffeeImages = [
  "src/assets/background/coffee.png",
  "src/assets/background/croissant.png",
  "src/assets/background/sandwich.png",
  "src/assets/background/coffee0.png",
  "src/assets/background/glove.png",
  // "src/assets/background/book.png",
];

const CoffeeCup = () => {
  const sceneRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (!sceneRef.current) return;

    const engine = Engine.create();
    const render = Render.create({
      element: sceneRef.current,
      engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: "transparent",
      },
    });

      const runner = Runner.create();
      Runner.run(runner, engine);
      Render.run(render);

      // Ground
      const groundHeight = 20;
      const ground = Bodies.rectangle(
        window.innerWidth / 2,
        window.innerHeight,
        window.innerWidth,
        groundHeight,
        {
          isStatic: true,
          render: { visible: false },
        }
      );
      World.add(engine.world, ground);

      // Store cups in a rolling buffer
      const cups: Body[] = [];
      const MAX_CUPS = 40;

      const spawnCup = () => {
        const img = coffeeImages[Math.floor(Math.random() * coffeeImages.length)];

        const cup = Bodies.polygon(
          Math.random() * window.innerWidth,
          -100,
          8,
          32,
          {
            restitution: 0.8,
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

        Body.setAngularVelocity(cup, (Math.random() - 0.5) * 0.2);
        World.add(engine.world, cup);

        cups.push(cup);

        if (cups.length > MAX_CUPS) {
          const old = cups.shift()!;
          World.remove(engine.world, old);
        }
      };

      const firstSpawnTimeout = setTimeout(() => {
        spawnCup(); // first drop
        // then continue normally
        var interval = setInterval(spawnCup, 2000);
        // cleanup interval
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

  return <div ref={sceneRef} style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }} />;
};

export default CoffeeCup;
