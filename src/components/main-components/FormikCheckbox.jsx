import { useField } from 'formik';
import { IoMdCheckmark } from 'react-icons/io';

export function FormikCheckbox({ label, id, ...props }) {
  const [field, meta, helpers] = useField({ ...props, type: 'checkbox' });

  const checked = field.value;
  const setChecked = helpers.setValue;

  return (
    <div
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      id={id}
      onClick={() => setChecked(!checked)}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          setChecked(!checked);
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
      <label htmlFor={id} className="select-none cursor-pointer">
        {label}
      </label>
    </div>
  );
}
