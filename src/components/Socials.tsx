import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Hamburger from 'hamburger-react';
import { FaInstagram, FaGithub, FaYoutube, FaLinkedin } from 'react-icons/fa';
import AnimatedText from "../animation/AnimatedText";
import mePhoto from "../assets/me/me-beach.jpg";

interface SocialsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const socialItems = [
  { name: 'Instagram', href: 'https://www.instagram.com/tobychen1337/', icon: <FaInstagram /> },
  { name: 'GitHub', href: 'https://github.com/ToadBoyChen', icon: <FaGithub /> },
  { name: 'YouTube', href: 'https://www.youtube.com/@t_o_d_d', icon: <FaYoutube /> },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/toby-chen-167519298/', icon: <FaLinkedin /> },
];

const Socials: React.FC<SocialsProps> = ({ open, onOpenChange }) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="w-full sm:w-80 bg-accent text-background shadow-sm 
                   data-[state=open]:animate-in data-[state=closed]:animate-out p-4"
      >
        <SheetHeader className="flex flex-col items-center relative">
          <SheetClose
            className={`
              absolute sm:static top-2 left-2 sm:translate-x-40
              rounded-full text-primary bg-background shadow-md 
              hover:text-background hover:bg-primary hover:shadow-lg 
              active:scale-90 transition-all duration-300 ease-in-out 
              hover:rotate-12
            `}
          >
            <Hamburger toggled={open} size={18} color="currentColor"/>
          </SheetClose> 
          <SheetTitle className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter chango-regular knewave-shadow text-background">
            <AnimatedText 
              text="Socials" 
              direction="left"
            />
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col items-center mt-4 sm:mt-6">
          <img
            src={mePhoto}
            alt="A photo of Toby Chen"
            className="w-32 h-32 sm:w-48 sm:h-48 object-cover relative p-1 rounded-full bg-gradient-to-r from-rose-300 via-violet-300 to-purple-300 gradient-border"
          />
          <p className="pt-6 sm:pt-8 text-foreground font-semibold text-sm sm:text-base text-center">
            Check out all of my socials! I'm always looking to connect with new people and share my work.
          </p>
        </div>

        <div className="flex items-center mb-4 mt-6 w-full">
          <div className="flex-grow border-t border-foreground opacity-30"></div>
          <span className="px-4 text-foreground font-semibold opacity-60">Links</span>
          <div className="flex-grow border-t border-foreground opacity-30"></div>
        </div>

        <div className="flex flex-col gap-6 sm:gap-8">
          {socialItems.map((item) => (
            <Button
              key={item.name}
              variant="secondary"
              asChild
              className="rounded-full text-foreground bg-background shadow-md 
                         hover:text-background hover:bg-primary hover:shadow-lg 
                         active:scale-90 transition-all duration-300 tracking-wide 
                         font-semibold flex justify-center items-center gap-2 text-sm sm:text-base hover:rotate-3"
              onClick={() => onOpenChange(false)}
            >
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.icon && <span className="text-lg sm:text-xl">{item.icon}</span>}
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
