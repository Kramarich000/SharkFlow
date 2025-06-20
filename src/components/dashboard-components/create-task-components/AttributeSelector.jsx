import { Fragment } from 'react';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react';

const AttributeSelector = ({
  value,
  onChange,
  options,
  placeholder,
  optionsClassName,
}) => {
  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <div className="relative w-full mt-4">
          <ListboxButton className="secondary-btn w-full">
            {options.find((opt) => opt.value === value)?.label || placeholder}
          </ListboxButton>
          <Transition
            as={Fragment}
            show={open}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 scale-50"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-50"
          >
            <ListboxOptions
              className={`options-styles !text-center ${optionsClassName}`}
            >
              {options.map((opt) => (
                <ListboxOption
                  key={opt.value}
                  value={opt.value}
                  className="option-styles"
                >
                  {opt.label}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      )}
    </Listbox>
  );
};

export default AttributeSelector; 