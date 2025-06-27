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
  color = 'transparent',
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
    <div className={`relative !w-full ${wrapperClassName}`}>
      <motion.button
        ref={buttonRef}
        className="w-full flex items-center justify-center  !text-[var(--main-text)] relative h-10 !border-2 rounded-full !border-[var(--main-primary)] !p-0"
        onClick={() => setShowPicker(true)}
        title="Выбрать цвет"
        disabled={disabled}
      >
        {color === 'transparent' ? (
          <>
            <p className="hidden lg:block">Нажмите, чтобы выбрать цвет</p>
            <p className="block lg:hidden">Выберите цвет</p>
          </>
        ) : null}
      </motion.button>
      <AnimatePresence>
        {showPicker && (
          <motion.div
            initial={{ opacity: 0, transform: 'translateY(-10px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            exit={{ opacity: 0, transform: 'translateY(-10px)' }}
            ref={pickerRef}
            className={`absolute hidden lg:flex items-center justify-center p-4 z-50 left-[0px] bg-[var(--main-bg)] rounded-md shadow-xl gap-2 ${pickerClassName}`}
          >
            {presetColors.map((preset) => (
              <button
                key={preset}
                style={{ backgroundColor: preset }}
                className={`sm:!w-[41px] sm:!h-[41px] !rounded-full border-2 ${
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
      <div
        ref={pickerRef}
        className={`absolute flex lg:hidden items-center justify-center p-4 z-50 left-[0px] rounded-xl shadow-xl gap-2 ${pickerClassName}`}
      >
        {presetColors.map((preset) => (
          <button
            key={preset}
            style={{ backgroundColor: preset }}
            className={`!w-[41px] !h-[41px] !rounded-full ${
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
      </div>
    </div>
  );
};
