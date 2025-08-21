import { useState, useEffect, useRef } from "react";

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

// [Your existing image imports remain the same]

const CoffeeCup = () => {
  const [state, setState] = useState<CoffeeState>("idle");
  const [frameIndex, setFrameIndex] = useState(0);
  const [posY, setPosY] = useState(0);
  const [posX, setPosX] = useState(25);
  const [scrollY, setScrollY] = useState(0);
  const actionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const physicsRef = useRef({
    gravity: 0.5,
    moveSpeed: 5,
    friction: 0.85,
    fallSpeed: 5,
    climbSpeed: 3,
  });

  useEffect(() => {
    let animationFrameId: number;

    const updatePhysics = () => {
      const groundY = window.scrollY + window.innerHeight - 64;

      // 🚨 Falling always has priority
      if (state === "falling") {
        setPosY(prev => {
          if (prev + physicsRef.current.fallSpeed >= groundY) {
            setState("idle");
            return groundY; // landed
          }
          return prev + physicsRef.current.fallSpeed;
        });

        animationFrameId = requestAnimationFrame(updatePhysics);
        return; 
      }

      // If NOT falling, handle "ground shifting up" case
      setPosY(prev => {
        if (Math.abs(prev - groundY) < 2) {
          return groundY; // already on floor
        }
        if (prev > groundY) {
          return groundY;
        }
        return prev;
      });

      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    animationFrameId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animationFrameId);
  }, [state]);

  // Character behavior
  useEffect(() => {
    const randomActionLength = Math.random() * 20000;

    const behaviorInterval = setInterval(() => {
      if (["falling", "climbing", "startClimb", "finishClimb"].includes(state)) return;

      const actions: CoffeeState[] = [
        "walking", "sitting", "reading", "sleeping", "climbing"
      ];

      const randomState = actions[Math.floor(Math.random() * actions.length)];
      
      if (randomState === "walking") {
        if (Math.random() >= 0.5) {
          setPosX(prev => prev + physicsRef.current.moveSpeed);
        } else {
          setPosX(prev => prev - physicsRef.current.moveSpeed);
        }
      }

      if (actionTimeoutRef.current) {
        clearTimeout(actionTimeoutRef.current);
      }

      setState("idle");

      actionTimeoutRef.current = setTimeout(() => {
        setState(randomState);
      }, randomActionLength * 0.25);
    }, randomActionLength);

    return () => {
      clearInterval(behaviorInterval);
      if (actionTimeoutRef.current) {
        clearTimeout(actionTimeoutRef.current);
      }
    };
  }, [state]);

  // Jump capability (space bar or touch)
  useEffect(() => {
    const handleClick = () => {
      if (isGrounded && state !== "climbing") {
        setVelocityY(physicsRef.current.jumpPower);
        setIsGrounded(false);
        setState("jumping");
      }
    };

    window.addEventListener("click", handleClick);
    
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [state]);

  // Scroll handler
  useEffect(() => {
    const onScroll = () => {
      const newScrollY = window.scrollY;
      const isScrollingDown = newScrollY > scrollY;

      // simulate "losing footing" -> lift him above ground before falling
      if (state !== "falling" && isScrollingDown) {
        if (actionTimeoutRef.current) {
          clearTimeout(actionTimeoutRef.current);
          actionTimeoutRef.current = null; // Clear the ref
        }

        setPosY(prev => prev - Math.min(150, Math.abs(window.scrollY - scrollY)));
        setState("falling");
      }

      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [state, scrollY]);

  // Animation frame updates
  useEffect(() => {
    if (spriteFrames[state].length > 1) {
      const interval = setInterval(() => {
        setFrameIndex((prev) => (prev + 1) % spriteFrames[state].length);
      }, 180);
      return () => clearInterval(interval);
    } else {
      setFrameIndex(0);
    }
  }, [state]);

  // Handle climbing animation and physics
  useEffect(() => {
    const climbHeight = Math.random() * 100 + 100;

    if (state === "startClimb") {
      let climbProgress = 0;
      const climbInterval = setInterval(() => {
        setState("climbing");
        climbProgress += 10;
        setPosY(prev => prev - physicsRef.current.climbSpeed);

        if (climbProgress > climbHeight) { 
          clearInterval(climbInterval);
          setState("finishClimb");
          setTimeout(() => setState("falling"), 500);
        }
      }, 300);
      return () => clearInterval(climbInterval);
    }
  }, [state]);

  return (
    <div
      className="absolute z-[100] transition-transform duration-100"
      style={{
        top: `${posY}px`,
        left: `${posX}px`,
        width: "64px",
        height: "auto",
      }}
    >
      <img
        src={spriteFrames[state][frameIndex]}
        alt={state}
        className="w-full h-full"
      />
    </div>
  );
};

export default CoffeeCup;