import { useState, useEffect, useRef } from "react";
import SpriteSheetAnimator from "../animation/SpriteSheetAnimator";


import walkSpriteSheet from "/src/animation/coffee/coffee-walk-4frame.png";
import idleSpriteSheet from "/src/animation/coffee/coffee-idle-6frame.png";
import sitSpriteSheet from "/src/animation/coffee/coffee-sit-4frame.png";
import readSpriteSheet from "/src/animation/coffee/coffee-read-3frame.png";
import sleepSpriteSheet from "/src/animation/coffee/coffee-walk-4frame.png";
import climbSpriteSheet from "/src/animation/coffee/coffee-climb-2frame.png";
import fallSpriteSheet from "/src/animation/coffee/coffee-fall-2frame.png";

type CoffeeState =
  | "walking"
  | "climbing"
  | "falling"
  | "sleeping"
  | "idle"
  | "sitting"
  | "reading";

const FRAME_WIDTH = 64;
const FRAME_HEIGHT = 64;
const DEFAULT_FPS = 4;

type AnimationData = {
  spriteSheet: string;
  frameCount: number;
  frameWidth: number;
  frameHeight: number;
  fps?: number;
};

const animations: Record<CoffeeState, AnimationData> = {
  walking: { spriteSheet: walkSpriteSheet, frameCount: 4, frameWidth: FRAME_WIDTH, frameHeight: FRAME_HEIGHT, fps: DEFAULT_FPS },
  climbing: { spriteSheet: climbSpriteSheet, frameCount: 2, frameWidth: FRAME_WIDTH, frameHeight: FRAME_HEIGHT, fps: DEFAULT_FPS },
  falling: { spriteSheet: fallSpriteSheet, frameCount: 2, frameWidth: FRAME_WIDTH, frameHeight: FRAME_HEIGHT, fps: DEFAULT_FPS },
  sleeping: { spriteSheet: sleepSpriteSheet, frameCount: 4, frameWidth: FRAME_WIDTH, frameHeight: FRAME_HEIGHT, fps: 2 },
  idle: { spriteSheet: idleSpriteSheet, frameCount: 6, frameWidth: FRAME_WIDTH, frameHeight: FRAME_HEIGHT, fps: DEFAULT_FPS },
  sitting: { spriteSheet: sitSpriteSheet, frameCount: 4, frameWidth: FRAME_WIDTH, frameHeight: FRAME_HEIGHT, fps: DEFAULT_FPS },
  reading: { spriteSheet: readSpriteSheet, frameCount: 3, frameWidth: FRAME_WIDTH, frameHeight: FRAME_HEIGHT, fps: 2 },
};


const CoffeeCup = () => {
  const [state, setState] = useState<CoffeeState>("idle");

  const [posY, setPosY] = useState(0);
  const [posX, setPosX] = useState(25);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [scrollY, setScrollY] = useState(0);

  const actionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const climbIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const climbDataRef = useRef({ progress: 0, height: 0 });

  const physicsRef = useRef({ moveSpeed: 4, fallSpeed: 3, climbSpeed: 3 });

  useEffect(() => {
    let animationFrameId: number;
    const updatePhysics = () => {
      const groundY = window.scrollY + window.innerHeight - FRAME_HEIGHT;
      if (state === "falling") {
        setPosY(prev => {
          if (prev + physicsRef.current.fallSpeed >= groundY) {
            setState("idle");
            return groundY;
          }
          return prev + physicsRef.current.fallSpeed;
        });
      } else if (state === "climbing") {
      } else {
        setPosY(groundY);
      }
      animationFrameId = requestAnimationFrame(updatePhysics);
    };
    animationFrameId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animationFrameId);
  }, [state]);

  useEffect(() => {
    if (state !== 'idle') return;

    const thinkingTimeout = setTimeout(() => {
      const actions: CoffeeState[] = ["walking", "sitting", "reading", "climbing"];
      const randomState = actions[Math.floor(Math.random() * actions.length)];
      
      if (actionTimeoutRef.current) clearTimeout(actionTimeoutRef.current);
      
      if (["walking", "sitting", "reading"].includes(randomState)) {
        if (randomState === 'walking') {
          setDirection(Math.random() < 0.5 ? 'left' : 'right');
        }
        setState(randomState);
        const duration = randomState === 'walking' 
            ? Math.random() * 4000 + 5000 
            : Math.random() * 5000 + 14000;
        actionTimeoutRef.current = setTimeout(() => setState("idle"), duration);
      } else {
        setState(randomState);
      }
    }, Math.random() * 3000 + 1000);

    return () => clearTimeout(thinkingTimeout);
  }, [state]);

  useEffect(() => {
    if (state !== "walking") return;
    const moveInterval = setInterval(() => {
      setPosX(prevX => {
        const { moveSpeed } = physicsRef.current;
        const nextX = direction === 'right' ? prevX + moveSpeed : prevX - moveSpeed;
        const screenWidth = window.innerWidth;
        const characterWidth = FRAME_WIDTH;
        
        if (nextX <= 0 || nextX >= screenWidth - characterWidth) {
          if (actionTimeoutRef.current) clearTimeout(actionTimeoutRef.current);
          setState("idle");
          return nextX <= 0 ? 0 : screenWidth - characterWidth;
        }
        return nextX;
      });
    }, 50);
    return () => clearInterval(moveInterval);
  }, [state, direction]);

  useEffect(() => {
    const onScroll = () => {
      const newScrollY = window.scrollY;
      const isScrollingDown = newScrollY > scrollY;
      if (state !== "falling" && isScrollingDown && Math.abs(newScrollY - scrollY) > 10) {
        if (actionTimeoutRef.current) {
          clearTimeout(actionTimeoutRef.current);
          actionTimeoutRef.current = null;
        }
        setState("falling");
        setPosY(prev => prev - 50);
      }
      setScrollY(newScrollY);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [state, scrollY]);

  useEffect(() => {
    if (state === "climbing") {
      climbDataRef.current = {
        progress: 0,
        height: Math.random() * 500 + 100,
      };

      climbIntervalRef.current = setInterval(() => {
        climbDataRef.current.progress += 30;
        
        setPosY(prev => prev - physicsRef.current.climbSpeed);

        if (climbDataRef.current.progress >= climbDataRef.current.height) {
          if (climbIntervalRef.current) clearInterval(climbIntervalRef.current);
          setState("falling");
        }
      }, 100);
    }

    return () => {
      if (climbIntervalRef.current) {
        clearInterval(climbIntervalRef.current);
      }
    };
  }, [state]);

  const currentAnimation = animations[state] ?? animations.idle;

  return (
    <div
      className="absolute z-[100]"
      style={{
        top: `${posY}px`,
        left: `${posX}px`,
        width: `${64}px`,
        height: `${64}px`,
        transform: direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)',
        transition: "transform 0.1s linear"
      }}
    >
      <SpriteSheetAnimator
        key={state}
        spriteSheet={currentAnimation.spriteSheet}
        frameCount={currentAnimation.frameCount}
        frameWidth={64}
        frameHeight={64}
        fps={4}
        className="w-full h-full"
      />
    </div>
  );
};

export default CoffeeCup;