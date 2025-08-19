import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Hamburger from 'hamburger-react';

interface SectionItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
}

interface SectionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const sectionItems: SectionItem[] = [
  { name: "Instagram", href: "#instagram" },
  { name: "GitHub", href: "#github" },
  { name: "YouTube", href: "#youtube" },
  { name: "LinkedIn", href: "#linkedin" },
];

const Section: React.FC<SectionProps> = ({ open, onOpenChange }) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-64 bg-accent text-background shadow-sm data-[state=open]:animate-in data-[state=closed]:animate-out p-4"
      >
        <SheetHeader className="flex flex-row items-center justify-between px-2 py-14">
          <SheetTitle className="text-5xl font-bold tracking-tighter absolute chango-regular knewave-shadow text-background -translate-x-10">
            Sections
          </SheetTitle>
          
          <SheetClose
            className={`flex items-center justify-center p-0 rounded-full text-primary bg-background shadow-md 
                        hover:text-background hover:bg-primary hover:shadow-lg active:scale-90 transition-all duration-300 ease-in-out -translate-x-14 -translate-y-14 border-0`}
          >
            <Hamburger toggled={open} size={18} color="currentColor" />
          </SheetClose>
        </SheetHeader>
        <div className="mt-6 flex flex-col gap-4">
          {sectionItems.map((item) => (
            <Button
              key={item.name}
              variant="secondary"
              asChild
              className="justify-start rounded-full"
              onClick={() => onOpenChange(false)} // clicking a link also closes the panel
            >
              <a href={item.href} target="_blank" rel="noopener noreferrer">
                {item.icon ? <span className="mr-2">{item.icon}</span> : null}
                {item.name}
              </a>
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Section;
