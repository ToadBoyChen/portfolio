import { useState, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
}

function Tooltip({ children, content }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLSpanElement>(null); 

  const showTooltip = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top,
        left: rect.left + rect.width / 2, 
      });
      setIsVisible(true);
    }
  };

  const hideTooltip = () => {
    setIsVisible(false);
  };

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        style={{ display: 'inline-block', cursor: 'pointer' }}
      >
        {children}
      </span>

      {createPortal(
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              style={{
                position: 'fixed',
                top: position.top,
                left: position.left,
                transform: 'translate(-50%, -100%)',
                marginTop: '-100px',
                marginLeft: '-110px', 
              }}
              className="z-50 w-max max-w-xs p-3 rounded-lg backdrop-blur-sm shadow-xl text-sm bg-gradient-to-br from-blue-200/60 to-purple-300/80 pointer-events-none"
            >
              {content}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body 
      )}
    </>
  );
}

export default Tooltip;