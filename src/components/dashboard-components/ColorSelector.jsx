import { HexColorPicker } from 'react-colorful';
import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const normalizeColor = (color) => (color.startsWith('#') ? color : `#${color}`);

export const ColorSelector = ({
  color,
  setColor,
  wrapperClassName = '',
  pickerClassName = '',
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const normalized = normalizeColor(color);
    if (buttonRef.current) {
      buttonRef.current.style.setProperty('background-color', normalized);
    }
  }, [color]);

  return (
    <div className={`inline-block relative ${wrapperClassName}`}>
      <button
        ref={buttonRef}
        className="w-10 h-10 !border-2 rounded-full !border-[#111111]"
        onClick={() => setShowPicker((prev) => !prev)}
        title="Выбрать цвет"
      />
      <AnimatePresence>
        {showPicker && (
          <motion.div
            ref={pickerRef}
            initial={{ opacity: 0, transform: 'translateX(50px)' }}
            animate={{ opacity: 1, transform: 'translateX(0px)' }}
            exit={{ opacity: 0, transform: 'translateX(50px)' }}
            className={`absolute z-50 p-4 bg-white rounded-md shadow-xl ${pickerClassName}`}
          >
            <p className="text-center text-xl select-none mb-2">
              Выберите цвет
            </p>
            <HexColorPicker color={color} onChange={setColor} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
