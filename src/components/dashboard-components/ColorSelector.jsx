import { SketchPicker } from 'react-color';
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
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
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
    <div className={`inline-block ${wrapperClassName}`}>
      <button
        ref={buttonRef}
        className="w-10 h-10 !border-2 rounded-full !border-black"
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
            className={`absolute shadow-xl ${pickerClassName}`}
          >
            <p className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xl select-none">
              Выберите цвет
            </p>
            <SketchPicker
              color={color}
              width="310px"
              className="!pt-10"
              onChangeComplete={(c) => setColor(c.hex)}
              presetColors={[
                '#F87171',
                '#FB923C',
                '#FBBF24',
                '#34D399',
                '#22D3EE',
                '#60A5FA',
                '#818CF8',
                '#A78BFA',
                '#F472B6',
                '#94A3B8',
              ]}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
