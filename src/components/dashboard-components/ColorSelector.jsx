import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const presetColors = [
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#FF00FF',
  '#00FFFF',
  '#000000',
  '#808080',
  '#FFA500',
  '#800080',
  '#FFFF00',
  '#008000',
];

export const ColorSelector = ({
  color,
  setColor,
  wrapperClassName = '',
  pickerClassName = '',
  disabled = false,
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
    if (buttonRef.current) {
      buttonRef.current.style.setProperty(
        'background-color',
        color.startsWith('#') ? color : `#${color}`,
      );
    }
  }, [color]);

  return (
    <div className={`relative ${wrapperClassName}`}>
      <motion.button
        ref={buttonRef}
        className="w-10 relative h-10 border-2 rounded-full border-[#111111]"
        onHoverStart={() => setShowPicker(true)}
        // onHoverEnd={() => setShowPicker(false)}
        title="Выбрать цвет"
        disabled={disabled}
      />
      <AnimatePresence>
        {showPicker && (
          <motion.div
            initial={{ opacity: 0, transform: 'translateY(-10px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            exit={{ opacity: 0, transform: 'translateY(-10px)' }}
            ref={pickerRef}
            className={`absolute flex p-4 z-50 bg-white left-[0px] rounded-md shadow-xl gap-2 ${pickerClassName}`}
          >
            {presetColors.map((preset) => (
              <button
                key={preset}
                style={{ backgroundColor: preset }}
                className={`w-8 h-8 rounded-full border-2 ${
                  preset.toLowerCase() === color.toLowerCase()
                    ? 'border-black'
                    : 'border-transparent'
                }`}
                onClick={() => {
                  setColor(preset);
                  setShowPicker(false);
                }}
                title={preset}
                disabled={disabled}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
