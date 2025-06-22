import { Fragment } from 'react';
import Select from 'common/ui/Select';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react';
import { FaChevronDown } from 'react-icons/fa';

export const AttributeSelector = ({
  value,
  onChange,
  options,
  placeholder,
  optionsClassName,
  size = 'md',
  variant = 'default',
  icon,
  showCheckmark = true,
}) => {
  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <div className="relative w-full mt-4">
          <ListboxButton className="secondary-btn w-full">
            {options.find((opt) => opt.value === value)?.label || placeholder}
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <FaChevronDown
                className="h-4 w-4 text-gray-400"
                aria-hidden="true"
              />
            </span>
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
              className={`absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white top-10 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm ${optionsClassName}`}
            >
              {options.map((opt) => (
                <ListboxOption
                  key={opt.value}
                  value={opt.value}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-4 pr-4 ${active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'}`
                  }
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
