import { useEffect, useRef, useState } from "react";
import Matter, { Engine, Render, Runner, Bodies, World, Body, Events } from "matter-js";

// Sprite images (replace with your actual imports)
import walk from "/src/assets/coffeeMan/walk.png";
import climb from "/src/assets/coffeeMan/climb.png";
import fall from "/src/assets/coffeeMan/fall.png";
import cheer from "/src/assets/coffeeMan/cheer.png";
import sit from "/src/assets/coffeeMan/sit.png";
import sleep from "/src/assets/coffeeMan/sleep.png";

type CoffeeState =
  | "walking"
  | "climbing"
  | "falling"
  | "celebrating"
  | "navbarIdle";

const spriteFrames: Record<CoffeeState, string[]> = {
  walking: [walk],
  climbing: [climb],
  falling: [fall],
  celebrating: [cheer],
  navbarIdle: [sit, sleep],
};

const CoffeeCup = ({ engineRef, fallingObjects }: { engineRef?: Matter.Engine; fallingObjects?: Matter.Body[] }) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineInternalRef = useRef(Engine.create());
  const engine = engineRef || engineInternalRef.current;
  const characterRef = useRef<Matter.Body | null>(null);

  const [state, setState] = useState<CoffeeState>("walking");
  const [frameIndex, setFrameIndex] = useState(0);
  const [facingRight, setFacingRight] = useState(true);

  useEffect(() => {
    if (!sceneRef.current) return;

    const world = engine.world;

    const pageHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );

    const render = Render.create({
      element: sceneRef.current,
      engine,
      options: {
        width: Math.min(window.innerWidth, 800),
        height: pageHeight,
        wireframes: false,
        background: "transparent",
      },
    });

    // Character body
    const startX = window.innerWidth / 2;
    const startY = pageHeight - 100;
    const character = Bodies.rectangle(startX, startY, 64, 64, {
      restitution: 0.2,
      friction: 0.3,
      render: { sprite: { texture: walk, xScale: 1, yScale: 1 } },
    });
    characterRef.current = character;

    // Navbar ledge
    const navbarY = 100;
    const navbar = Bodies.rectangle(window.innerWidth / 2, navbarY, window.innerWidth / 2, 20, { isStatic: true });
    World.add(world, [character, navbar]);

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Collision detection
    Events.on(engine, "collisionStart", (event) => {
      event.pairs.forEach((pair) => {
        const bodies = [pair.bodyA, pair.bodyB];
        // Collision with falling objects
        if (
          fallingObjects &&
          bodies.includes(character) &&
          bodies.some((b) => fallingObjects.includes(b))
        ) {
          setState("falling");
        }
        // Collision with navbar
        if (bodies.includes(character) && bodies.includes(navbar)) {
          setState("celebrating");
        }
      });
    });

    // Cleanup
    return () => {
      Render.stop(render);
      Runner.stop(runner);
      World.clear(world, false);
      Engine.clear(engine);
      render.canvas.remove();
    };
  }, []);

  // Animation frame loop
  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % spriteFrames[state].length);
    }, 200);
    return () => clearInterval(interval);
  }, [state]);

  // Physics movement loop
  useEffect(() => {
    const interval = setInterval(() => {
      const body = characterRef.current;
      if (!body) return;

      switch (state) {
        case "walking":
          // small horizontal walk
          const direction = facingRight ? 1 : -1;
          Body.applyForce(body, body.position, { x: 0.0005 * direction, y: 0 });
          // flip at edges
          if (body.position.x > window.innerWidth - 50) setFacingRight(false);
          if (body.position.x < 50) setFacingRight(true);
          break;

        case "climbing":
          Body.applyForce(body, body.position, { x: 0, y: -0.003 });
          break;

        case "falling":
          // no extra force, physics handles fall
          break;

        case "celebrating":
          // small bounce
          Body.applyForce(body, body.position, { x: 0, y: -0.002 });
          // After a while, move to navbarIdle
          setTimeout(() => setState("navbarIdle"), 2000);
          break;

        case "navbarIdle":
          // walk left/right along navbar randomly
          const navbarLeft = 50;
          const navbarRight = window.innerWidth - 50;
          if (body.position.x > navbarRight) setFacingRight(false);
          if (body.position.x < navbarLeft) setFacingRight(true);
          const hForce = facingRight ? 0.0003 : -0.0003;
          Body.applyForce(body, body.position, { x: hForce, y: 0 });
          break;
      }
    }, 50);

    return () => clearInterval(interval);
  }, [state, facingRight]);

  const currentSprite = spriteFrames[state][frameIndex];

  return (
    <div
      ref={sceneRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 20,
      }}
    >
      {characterRef.current && (
        <img
          src={currentSprite}
          alt="coffee character"
          style={{
            position: "absolute",
            width: "64px",
            height: "64px",
            left: characterRef.current.position.x - 32,
            top: characterRef.current.position.y - 32,
            transform: facingRight ? "scaleX(1)" : "scaleX(-1)",
            imageRendering: "pixelated",
          }}
        />
      )}
    </div>
  );
};

export default CoffeeCup;