import { Button } from "./components/ui/button";
import { ChevronDown } from "lucide-react";

export default function ScrollDownButton() {
  const handleScroll = () => {
    window.scrollBy({
      top: window.innerHeight, // scroll down by 1 screen
      behavior: "smooth",
    });
  };

  return (
    <Button
      size="icon"
      className="rounded-full w-14 h-14 
                bg-background text-primary shadow-lg
                hover:scale-110 hover:bg-primary hover:text-background 
                active:scale-90 transition-all duration-300"
      onClick={handleScroll}
    >
      <ChevronDown className="w-6 h-6" />
    </Button>
  );
}
