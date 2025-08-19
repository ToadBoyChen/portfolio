import { Button } from './components/ui/button';
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
      className={`fixed z-auto flex items-center gap-2 p-6 rounded-full text-primary shadow-md hover:text-background border-0 bg-background hover:shadow-lg
        active:scale-90
        transition-all duration-300 ease-in-out
        lg:relative
        bottom-4 left-4 lg:bottom-auto lg:left-auto
        ${isOpen ? '-translate-x-26' : 'translate-x-0'}`}
    >
      <Hamburger toggled={isOpen} size={18} color="currentColor" />
      {!isOpen ? <span className="font-semibold tracking text-lg mr-2">{label}</span> : null}
    </Button>
  );
};

export default NavButtonLeft;