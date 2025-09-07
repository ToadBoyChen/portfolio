// src/components/Tooltip.tsx

import { useState, useRef, cloneElement, isValidElement } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  children: ReactElement;
  content: ReactNode;
}

function Tooltip({ children, content }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLElement>(null);

  const showTooltip = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top, // Position from the top of the viewport
        left: rect.left + rect.width / 2, // Center horizontally on the trigger
      });
      setIsVisible(true);
    }
  };

  const hideTooltip = () => {
    setIsVisible(false);
  };
  
  // Clone the child element to attach our own ref and event handlers
  const trigger = isValidElement(children) ? cloneElement(children, {
      ref: triggerRef,
      onMouseEnter: showTooltip,
      onMouseLeave: hideTooltip,
      onFocus: showTooltip,
      onBlur: hideTooltip,
  }) : children;

  return (
    <>
      {trigger}
      {createPortal(
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              style={{
                position: 'fixed', // Use 'fixed' to position relative to the viewport
                top: position.top,
                left: position.left,
                // Center the tooltip horizontally and place it above the trigger
                transform: 'translate(-50%, -100%)',
                marginTop: '-100px',
                marginLeft: '-200px',
              }}
              className="z-50 w-max max-w-xs p-3 rounded-lg bg-background/80 backdrop-blur-sm shadow-xl text-foreground text-xs pointer-events-none"
            >
              {content}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body // This renders the tooltip in the <body> tag, escaping the parent containers
      )}
    </>
  );
}

export default Tooltip;