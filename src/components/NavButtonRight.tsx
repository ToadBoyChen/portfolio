import { Button } from './ui/button';
import Hamburger from 'hamburger-react';

interface NavButtonProps {
  label: string;
  isOpen: boolean;
  onClick: () => void;
}

const NavButtonRight: React.FC<NavButtonProps> = ({
  label,
  isOpen,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      className={`flex items-center gap-2 p-4 sm:p-5 md:p-6 rounded-full text-primary shadow-md hover:text-background border-0 bg-background hover:bg-primary hover:shadow-lg active:scale-90 transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-200' : 'translate-x-0'} fixed lg:relative bottom-4 right-4 lg:bottom-auto lg:right-auto z-50 hover:rotate-3`}
    >
      {!isOpen ? (
        <span className="font-semibold tracking text-base sm:text-lg md:text-xl mr-2">
          {label}
        </span>
      ) : null}
      {!isOpen ? (
        <Hamburger toggled={isOpen} size={20} color="currentColor" />
      ) : (
        <Hamburger toggled={isOpen} size={20} color="currentColor" />
      )}
    </Button>
  );
};

export default NavButtonRight;
