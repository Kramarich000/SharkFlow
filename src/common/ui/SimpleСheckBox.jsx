import { IoMdCheckmark } from 'react-icons/io';

export function SimpleCheckbox({ label, checked, onChange, id }) {
  return (
    <div
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      id={id}
      onClick={() => onChange(!checked)}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          onChange(!checked);
        }
      }}
      className={`flex items-center gap-2 cursor-pointer outline-none`}
    >
      <div
        className={`w-5 h-5 flex items-center justify-center rounded border transition ${
          checked ? 'bg-[#111111]' : 'bg-white'
        }`}
      >
        {checked && <IoMdCheckmark color="white" />}
      </div>
      <label htmlFor={id} className="select-none">
        {label}
      </label>
    </div>
  );
}
