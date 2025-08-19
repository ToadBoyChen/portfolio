import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Hamburger from 'hamburger-react';
import { FaInstagram, FaGithub, FaYoutube, FaLinkedin } from 'react-icons/fa';
import AnimatedText from "./AnimatedText";

interface SocialsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const socialItems = [
  { name: 'Instagram', href: '#instagram', icon: <FaInstagram /> },
  { name: 'GitHub', href: '#github', icon: <FaGithub /> },
  { name: 'YouTube', href: '#youtube', icon: <FaYoutube /> },
  { name: 'LinkedIn', href: '#linkedin', icon: <FaLinkedin /> },
];
const Socials: React.FC<SocialsProps> = ({ open, onOpenChange }) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="w-64 bg-accent text-background shadow-sm data-[state=open]:animate-in data-[state=closed]:animate-out p-4"
      >
        <SheetHeader className="flex flex-row items-center justify-between px-2 pt-14 pb-6">
          <SheetTitle className="text-5xl font-bold tracking-tighter absolute chango-regular knewave-shadow text-background">
            <AnimatedText text="Socials" direction="left" order="ltr"/>
          </SheetTitle>
          
          <SheetClose
            className={`flex items-center justify-center p-0 rounded-full text-primary bg-background shadow-md 
                        hover:text-background hover:bg-primary hover:shadow-lg active:scale-90 transition-all duration-300 ease-in-out translate-x-51 -translate-y-14 border-0 hover:rotate-12`}
          >
            <Hamburger toggled={open} size={18} color="currentColor"/>
          </SheetClose>
        </SheetHeader>
        <div className="flex flex-col items-center">
          <img
            src="src/assets/me.jpeg"
            alt="A photo of Toby Chen"
            className="w-50 h-50 rounded-full border-4 border-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1"
          />

          <p className="pt-8 text-foreground font-semibold">
            Check out all of my socials! I'm always looking to connect with new people and share my work.
          </p>
        </div>
        <div className="flex items-center mb-4 mt-4 w-full">
          <div className="flex-grow border-t border-foreground opacity-30"></div>
          <span className="px-4 text-foreground font-semibold opacity-60">Links</span>
          <div className="flex-grow border-t border-foreground opacity-30"></div>
        </div>

        <div className="flex flex-col gap-8">
          {socialItems.map((item) => (
            <Button
              key={item.name}
              variant="secondary"
              asChild
              className="rounded-full text-foreground bg-background shadow-md hover:text-background hover:bg-primary hover:shadow-lg active:scale-90 transition-all duration-300 tracking-wide font-semibold flex hover:rotate-3"
              onClick={() => onOpenChange(false)} // closes panel on click
            >
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className=""
              >
                {item.icon && <span className="">{item.icon}</span>}
                {item.name}
              </a>
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Socials;
