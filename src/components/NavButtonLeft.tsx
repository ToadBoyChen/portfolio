import { Button } from './ui/button';
import Hamburger from 'hamburger-react';

interface NavButtonProps {
  label: string;
  isOpen: boolean;
  onClick: () => void;
}

const NavButtonLeft: React.FC<NavButtonProps> = ({
  label,
  isOpen,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      className={`fixed z-auto flex items-center gap-2 p-4 sm:p-5 md:p-6 rounded-full text-primary shadow-md hover:text-background border-0 bg-background hover:shadow-lg transition-all duration-300 ease-in-out lg:relative bottom-4 left-4 lg:bottom-auto lg:left-auto hover:bg-primary ${isOpen ? '-translate-x-200' : 'translate-x-0'} hover:-rotate-3`}
    >
      <div className='hidden sm:block'>
        <Hamburger 
          toggled={isOpen} 
          size={20} 
          color="currentColor" 
        />
      </div>
      {!isOpen ? (
        <span className="font-semibold tracking text-base sm:text-lg md:text-xl mr-2">
          {label}
        </span>
      ) : null}
    </Button>
  );
};

export default NavButtonLeft;
