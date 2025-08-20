import { useState, useEffect } from "react";

import walk1 from "/src/assets/coffeeMan/walk/walk1.png";
import walk2 from "/src/assets/coffeeMan/walk/walk2.png";
import walk3 from "/src/assets/coffeeMan/walk/walk3.png";
import walk4 from "/src/assets/coffeeMan/walk/walk4.png";

import idle1 from "/src/assets/coffeeMan/idle/idle1.png";
import idle2 from "/src/assets/coffeeMan/idle/idle2.png";
import idle3 from "/src/assets/coffeeMan/idle/idle3.png";
import idle4 from "/src/assets/coffeeMan/idle/idle4.png";

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
  | "sleeping"
  | "idle"
  | "sitting"
  | "reading";

const openFrames = [open1, open2, open3, open4];
const readFrames = [read1, read1, read1, read2, read2, read2];
const spawnConfusedFrames = [conf1, conf2, conf3, conf4, conf5, conf6, conf7, conf8, conf9, conf10, conf11, conf12, conf12, conf13, conf13];
const confusedFrames = [conf12, conf12, conf12, conf12, conf13, conf13, conf13]

const spriteFrames: Record<CoffeeState, string[]> = {
  walking: [walk1, walk2, walk3, walk4],
  climbing: [climb],
  falling: [fall],
  celebrating: [cheer],
  sleeping: [sleep],
  idle: [idle1, idle2, idle3, idle4],
  sitting: [sit],
  reading: [...openFrames, ...readFrames, ...spawnConfusedFrames, ...confusedFrames, ...confusedFrames, ...readFrames, ...readFrames],
};

const CoffeeCup = () => {
  const [state, setState] = useState<CoffeeState>("reading");
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    if (spriteFrames[state].length > 1) {
      const interval = setInterval(() => {
        setFrameIndex((prev) => (prev + 1) % spriteFrames[state].length);
      }, 180);
      return () => clearInterval(interval);
    }
  }, [state]);

  return (
    <div className="fixed bottom-0 lg:left-1/6 md:left-1/4 left-1/3 z-[100]">
      <img
        src={spriteFrames[state][frameIndex]}
        alt={state}
        className="w-full h-full"
      />
    </div>
  );
};

export default CoffeeCup;
