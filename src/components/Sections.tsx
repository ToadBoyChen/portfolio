import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Hamburger from "hamburger-react";
import AnimatedText from "../animation/AnimatedText";
import { FaHome } from "react-icons/fa";
import { BsPersonArmsUp } from "react-icons/bs";
import { MdOutlineWork } from "react-icons/md";
import { RiContactsBook2Fill } from "react-icons/ri";

interface SectionItem {
  name: string;
  href: string;
  description: string;
  icon?: React.ReactNode;
}

interface SectionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const sectionItems: SectionItem[] = [
  { name: "Introduction", href: "#introduction", description: "Get to know the purpose of this site.", icon: <FaHome /> },
  // { name: "Journey", href: "#journey", description: "Explore my journey and milestones.", icon: <GiJourney /> },
  { name: "About", href: "#about", description: "Learn more about me and my background.", icon: <BsPersonArmsUp /> },
  { name: "Experience", href: "#experience", description: "See the work I’ve done and my skills.", icon: <MdOutlineWork /> },
  { name: "Contact", href: "#contact", description: "Let’s get in touch — reach me here.", icon: <RiContactsBook2Fill /> },
];

const Section: React.FC<SectionProps> = ({ open, onOpenChange }) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-80 bg-accent text-background shadow-sm data-[state=open]:animate-in data-[state=closed]:animate-out p-4"
      >
        <SheetHeader className="flex flex-col items-center">
          <SheetClose
            className={`rounded-full text-primary bg-background shadow-md 
                        hover:text-background hover:bg-primary hover:shadow-lg active:scale-90 transition-all duration-300 ease-in-out hover:rotate-12 -translate-x-40`}
          >
            <Hamburger toggled={open} size={18} color="currentColor"/>
          </SheetClose>
          <SheetTitle className="text-5xl font-bold tracking-tighter  chango-regular knewave-shadow text-background">
            <AnimatedText 
              text="Sections" 
              direction="left"
            />
          </SheetTitle>
        </SheetHeader>
        <div>
          <p className="text-foreground font-semibold">
            Ever get lost? Come here for navigation 😊!
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          {sectionItems.map((item) => (
            <div key={item.name} className="flex flex-col hover:-rotate-3 transition-all duration-300 gap-1">
              <Button
                variant="secondary"
                asChild
                className="rounded-full text-foreground bg-background shadow-md hover:text-background hover:bg-primary hover:shadow-lg active:scale-90 transition-all duration-300 tracking-wide font-semibold flex"
                onClick={() => onOpenChange(false)} // clicking closes panel
              >
                <a href={item.href}>
                  {item.icon ? <span className="mr-2">{item.icon}</span> : null}
                  {item.name}
                </a>
              </Button>
              <span className="text-sm text-muted-foreground mt-2">
                {item.description}
              </span>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Section;
