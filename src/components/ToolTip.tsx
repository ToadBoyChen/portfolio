// src/components/Tooltip.tsx

import { useState, useRef, type ReactNode } from 'react';
// No longer need cloneElement or isValidElement, or ReactElement type
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  children: ReactNode; // Can now be any valid React child
  content: ReactNode;
}

function Tooltip({ children, content }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  // This ref will now be attached to our wrapper span
  const triggerRef = useRef<HTMLSpanElement>(null); 

  const showTooltip = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        // Position tooltip above the trigger
        top: rect.top, 
        // Center the tooltip horizontally with the trigger
        left: rect.left + rect.width / 2, 
      });
      setIsVisible(true);
    }
  };

  const hideTooltip = () => {
    setIsVisible(false);
  };

  // --- THE FIX IS HERE ---
  // Instead of cloning the child, we wrap it in a span.
  // We apply the ref and event listeners to this span.
  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        // Add this style to make the span behave like a block-level element
        // for more accurate positioning, while still flowing inline.
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
                // These transforms center the tooltip and move it above the trigger
                transform: 'translate(-50%, -100%)',
                // Add a small gap between the tooltip and the trigger
                marginTop: '-100px',
                marginLeft: '-110px', 
              }}
              className="z-50 w-max max-w-xs p-3 rounded-lg bg-slate-900/80 backdrop-blur-sm shadow-xl text-slate-200 text-xs pointer-events-none"
              // Added some better default styles
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