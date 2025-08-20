import walk from "/src/assets/coffeeMan/walk.png";
import climb from "/src/assets/coffeeMan/climb.png";
import fall from "/src/assets/coffeeMan/fall.png";
import cheer from "/src/assets/coffeeMan/cheer.png";
import sit from "/src/assets/coffeeMan/sit.png";
import sleep from "/src/assets/coffeeMan/sleep.png";
import idle from "/src/assets/coffeeMan/idle.png";

type CoffeeState =
  | "walking"
  | "climbing"
  | "falling"
  | "celebrating"
  | "sleeping"
  | "idle"
  | "sitting";


const spriteFrames: Record<CoffeeState, string[]> = {
  walking: [walk],
  climbing: [climb],
  falling: [fall],
  celebrating: [cheer],
  sleeping: [sleep],
  idle: [idle],
  sitting: [sit],
};

const CoffeeCup = () => {
  return (
    <>
    </>
  );
};

export default CoffeeCup;