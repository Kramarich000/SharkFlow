import { useField } from 'formik';
import { IoMdCheckmark } from 'react-icons/io';

export function FormikCheckbox({
  label,
  className = '',
  disabled,
  id,
  ...props
}) {
  const [field, meta, helpers] = useField({ ...props, type: 'checkbox' });

  const checked = field.value;
  const setChecked = helpers.setValue;

  const handleToggle = () => {
    if (disabled) return;
    setChecked(!checked);
  };

  const handleKeyDown = (e) => {
    if (disabled) return;
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      setChecked(!checked);
    }
  };

  return (
    <div
      role="checkbox"
      aria-checked={checked}
      aria-disabled={disabled ? 'true' : 'false'}
      tabIndex={disabled ? -1 : 0}
      id={id}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      className={`flex items-center !w-fit mx-auto justify-center gap-2
        ${disabled ? 'opacity-60 cursor-not-allowed select-none' : 'cursor-pointer outline-none'}
      `}
    >
      <div
        className={`w-5 h-5 absolute sm:relative left-6 flex items-center justify-center rounded border transition
          ${className} 
          ${
            checked
              ? 'bg-[var(--main-button-bg)] border-transparent '
              : 'bg-[var(--main-surface)]'
          }
        `}
      >
        {checked && <IoMdCheckmark color="white" />}
      </div>
      <label
        htmlFor={id}
        className={`select-none text-[12px] sm:text-[14px] ml-8 sm:ml-6 text-left sm:text-center
          ${disabled ? 'cursor-not-allowed select-none' : 'cursor-pointer'}
        `}
      >
        {label}
      </label>
    </div>
  );
}
