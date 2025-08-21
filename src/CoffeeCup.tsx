import { useState, useEffect, useRef } from "react";

// [Your existing image imports remain the same]
import walk1 from "/src/assets/coffeeMan/walk/walk1.png";
import walk2 from "/src/assets/coffeeMan/walk/walk2.png";
import walk3 from "/src/assets/coffeeMan/walk/walk3.png";
import walk4 from "/src/assets/coffeeMan/walk/walk4.png";

import idle1 from "/src/assets/coffeeMan/idle/idle1.png";
import idle2 from "/src/assets/coffeeMan/idle/idle2.png";
import idle3 from "/src/assets/coffeeMan/idle/idle3.png";
import idle4 from "/src/assets/coffeeMan/idle/idle4.png";

import sit1 from "/src/assets/coffeeMan/sit/sit1.png";
import sit2 from "/src/assets/coffeeMan/sit/sit2.png";
import sit3 from "/src/assets/coffeeMan/sit/sit3.png";
import sit4 from "/src/assets/coffeeMan/sit/sit4.png";

import open1 from "/src/assets/coffeeMan/study/open/open1.png";
import open2 from "/src/assets/coffeeMan/study/open/open2.png";
import open3 from "/src/assets/coffeeMan/study/open/open3.png";
import open4 from "/src/assets/coffeeMan/study/open/open4.png";

import read1 from "/src/assets/coffeeMan/study/read/read1.png";
import read2 from "/src/assets/coffeeMan/study/read/read2.png";

import conf1 from "/src/assets/coffeeMan/study/read/confuse/conf1.png";
import conf2 from "/src/assets/coffeeMan/study/read/confuse/conf2.png";
import conf3 from "/src/assets/coffeeMan/study/read/confuse/conf3.png";
import conf4 from "/src/assets/coffeeMan/study/read/confuse/conf4.png";
import conf5 from "/src/assets/coffeeMan/study/read/confuse/conf5.png";
import conf6 from "/src/assets/coffeeMan/study/read/confuse/conf6.png";
import conf7 from "/src/assets/coffeeMan/study/read/confuse/conf7.png";
import conf8 from "/src/assets/coffeeMan/study/read/confuse/conf8.png";
import conf9 from "/src/assets/coffeeMan/study/read/confuse/conf9.png";
import conf10 from "/src/assets/coffeeMan/study/read/confuse/conf10.png";
import conf11 from "/src/assets/coffeeMan/study/read/confuse/conf11.png";
import conf12 from "/src/assets/coffeeMan/study/read/confuse/conf12.png";
import conf13 from "/src/assets/coffeeMan/study/read/confuse/conf13.png";

import sleep1 from "/src/assets/coffeeMan/sleep/sleep1.png";
import sleep2 from "/src/assets/coffeeMan/sleep/sleep2.png";
import sleep3 from "/src/assets/coffeeMan/sleep/sleep3.png";
import sleep4 from "/src/assets/coffeeMan/sleep/sleep4.png";
import sleep5 from "/src/assets/coffeeMan/sleep/sleep5.png";

import climb1 from "/src/assets/coffeeMan/climb/climb1.png";
import climb2 from "/src/assets/coffeeMan/climb/climb2.png";
import climb3 from "/src/assets/coffeeMan/climb/climb3.png";
import climb4 from "/src/assets/coffeeMan/climb/climb4.png";
import climb5 from "/src/assets/coffeeMan/climb/climb5.png";
import climb6 from "/src/assets/coffeeMan/climb/climb6.png";

import fall1 from "/src/assets/coffeeMan/fall/fall1.png";
import fall2 from "/src/assets/coffeeMan/fall/fall2.png";
import fall3 from "/src/assets/coffeeMan/fall/fall3.png";
import fall4 from "/src/assets/coffeeMan/fall/fall4.png";


type CoffeeState =
  | "walking"
  | "climbing"
  | "falling"
  | "sleeping"
  | "idle"
  | "sitting"
  | "gettingConfused"
  | "understanding"
  | "confused"
  | "openingBook"
  | "closingBook"
  | "reading"
  | "fallingAsleep"
  | "wakingUp"
  | "startClimb"
  | "finishClimb";

// [Your spriteFrames object remains the same]
const openFrames = [open1, open2, open3, open4];
const readFrames = [read1, read1, read1, read2, read2, read2];
const spawnConfusedFrames = [conf1, conf2, conf3, conf4, conf5, conf6, conf7, conf8, conf9, conf10, conf11, conf12, conf12, conf13, conf13];
const confusedFrames = [conf12, conf12, conf12, conf12, conf13, conf13, conf13];
const sitFrames = [sit1, sit2, sit3, sit4];

const fallAsleepFrames = [sleep1, sleep2, sleep3, sleep4, sleep5];
const sleepFrames = [sleep4, sleep5]

const idleFrames = [idle1, idle2, idle3, idle4];

const startClimbFrames = [climb1, climb2, climb3, climb4, climb5, climb6];
const climbFrames = [climb3, climb4];

const fallFrames = [fall1, fall2, fall3, fall4];

const finishClimb = [...startClimbFrames].reverse();
const wakeUpFrames = [...fallAsleepFrames].reverse();
const closeFrames = [...openFrames].reverse();
const unconfusedFrames = [...spawnConfusedFrames].reverse();

const spriteFrames: Record<CoffeeState, string[]> = {
  walking: [walk1, walk2, walk3, walk4],
  climbing: [...climbFrames],
  falling: [...fallFrames],
  sleeping: [...sleepFrames],
  idle: [...idleFrames],
  sitting: [...sitFrames],
  gettingConfused: [...spawnConfusedFrames],
  understanding: [...unconfusedFrames],
  confused: [...confusedFrames],
  openingBook: [...openFrames],
  closingBook: [...closeFrames],
  reading: [...readFrames],
  fallingAsleep: [...fallAsleepFrames],
  wakingUp: [...wakeUpFrames],
  startClimb: [...startClimbFrames],
  finishClimb: [...finishClimb],
};


const CoffeeCup = () => {
  const [state, setState] = useState<CoffeeState>("idle");
  const [frameIndex, setFrameIndex] = useState(0);
  const [posY, setPosY] = useState(0);
  const [posX, setPosX] = useState(25);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [scrollY, setScrollY] = useState(0);

  const actionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const climbIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const climbDataRef = useRef({ progress: 0, height: 0 });
  
  const physicsRef = useRef({ moveSpeed: 2, fallSpeed: 5, climbSpeed: 3 });

  // Main physics loop for gravity and ground detection
  useEffect(() => {
    let animationFrameId: number;
    const updatePhysics = () => {
      const groundY = window.scrollY + window.innerHeight - 64;
      if (state === "falling") {
        setPosY(prev => {
          if (prev + physicsRef.current.fallSpeed >= groundY) {
            setState("idle");
            return groundY;
          }
          return prev + physicsRef.current.fallSpeed;
        });
      } else if (["climbing", "startClimb"].includes(state)) {
        setPosY(prev => prev - physicsRef.current.climbSpeed / 6);
      } else if (!["finishClimb"].includes(state)) {
        setPosY(groundY);
      }
      animationFrameId = requestAnimationFrame(updatePhysics);
    };
    animationFrameId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animationFrameId);
  }, [state]);

  // The "Brain": Decides what to do next ONLY when idle
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
            ? Math.random() * 4000 + 2000 
            : Math.random() * 5000 + 4000;
        actionTimeoutRef.current = setTimeout(() => setState("idle"), duration);
      } else {
        setState(randomState);
      }
    }, Math.random() * 3000 + 1000);

    return () => clearTimeout(thinkingTimeout);
  }, [state]);

  // Handle walking movement and wall collision
  useEffect(() => {
    if (state !== "walking") return;
    const moveInterval = setInterval(() => {
      setPosX(prevX => {
        const { moveSpeed } = physicsRef.current;
        const nextX = direction === 'right' ? prevX + moveSpeed : prevX - moveSpeed;
        const screenWidth = window.innerWidth;
        const characterWidth = 64;
        
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

  // Scroll handler to initiate falling
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
  
  // Animation frame updates
  useEffect(() => {
    const frameCount = spriteFrames[state].length;
    if (frameCount > 1) {
      const interval = setInterval(() => {
        setFrameIndex(prev => (prev + 1) % frameCount);
      }, 180);
      return () => clearInterval(interval);
    } else {
      setFrameIndex(0);
    }
  }, [state]);

  // Handle the complete climbing sequence
  useEffect(() => {
    if (state === "climbing") {
      climbDataRef.current = {
        progress: 0,
        height: Math.random() * 150 + 100,
      };

      climbIntervalRef.current = setInterval(() => {
        climbDataRef.current.progress += 30;

        if (climbDataRef.current.progress >= climbDataRef.current.height) {
          setState("falling");
        }
      }, 300);
    }

    return () => {
      if (state === "startClimb" || state === "climbing") {
        if (climbIntervalRef.current) {
          clearInterval(climbIntervalRef.current);
        }
      }
    };
  }, [state]);

  return (
    <div
      className="absolute z-[100]"
      style={{
        top: `${posY}px`,
        left: `${posX}px`,
        width: "64px",
        height: "auto",
        transform: direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)',
        transition: "transform 0.1s linear"
      }}
    >
      <img src={spriteFrames[state][frameIndex]} alt={state} className="w-full h-full" />
    </div>
  );
};

export default CoffeeCup;