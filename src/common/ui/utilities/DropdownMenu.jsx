import React, { useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

export const DropdownMenu = ({
  isOpen,
  onToggle,
  trigger,
  children,
  className = '',
  position = 'bottom-right',
}) => {
  const menuRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        onToggle(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onToggle]);

  const positionClasses = {
    'bottom-right': 'top-full right-0 mt-2',
    'bottom-left': 'top-full left-0 mt-2',
    'top-right': 'bottom-full right-0 mb-2',
    'top-left': 'bottom-full left-0 mb-2',
  };

  return (
    <div className="relative">
      <div ref={triggerRef} onClick={() => onToggle(!isOpen)}>
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <div
            ref={menuRef}
            className={`absolute z-50 w-52 bg-white rounded-lg shadow-lg border border-gray-100 p-2 ${positionClasses[position]} ${className}`}
          >
            {children}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
