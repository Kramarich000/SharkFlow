import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { FaChevronDown, FaCheck } from 'react-icons/fa';
import {
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';

export const Select = ({
  value,
  onChange,
  options = [],
  placeholder = 'Выберите опцию',
  disabled = false,
  size = 'md', // sm, md, lg
  variant = 'default', // default, outlined, filled
  icon,
  className = '',
  optionsClassName = '',
  showCheckmark = true,
  maxHeight = 'max-h-60',
}) => {
  const selectedOption = options.find((opt) => opt.value === value);

  const sizeClasses = {
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2.5 px-4 text-base',
    lg: 'py-3 px-5 text-lg',
  };

  const variantClasses = {
    default:
      'bg-white border border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
    outlined:
      'bg-transparent border-2 border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
    filled:
      'bg-gray-50 border border-gray-300 hover:bg-gray-100 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
  };

  const buttonClasses = `
    relative w-full cursor-pointer rounded-lg text-left transition-all duration-200
    focus:outline-none disabled:cursor-not-allowed disabled:opacity-50
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `;

  const optionsContainerClasses = `
    absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200
    overflow-hidden ${maxHeight} overflow-y-auto
    ${optionsClassName}
  `;

  const optionClasses = (active, selected) => `
    relative cursor-pointer select-none py-2.5 px-4 transition-colors duration-150
    ${active ? 'bg-blue-50 text-blue-900' : 'text-gray-900'}
    ${selected ? 'bg-blue-100 text-blue-900 font-medium' : ''}
    hover:bg-blue-50 hover:text-blue-900
  `;

  return (
    <Listbox value={value} onChange={onChange} disabled={disabled}>
      <div className="relative">
        <Listbox.Button className={buttonClasses}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              {icon && (
                <span className="flex-shrink-0 text-gray-500">{icon}</span>
              )}
              <span
                className={`truncate ${selectedOption ? 'text-gray-900' : 'text-gray-500'}`}
              >
                {selectedOption ? selectedOption.label : placeholder}
              </span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {showCheckmark && selectedOption && (
                <FaCheck className="h-4 w-4 text-blue-600" />
              )}
              <FaChevronDown
                className="h-4 w-4 text-gray-400 transition-transform duration-200 ui-open:rotate-180"
                aria-hidden="true"
              />
            </div>
          </div>
        </Listbox.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Listbox.Options className={optionsContainerClasses}>
            {options.map((option) => (
              <Listbox.Option
                key={option.value}
                value={option.value}
                className={({ active, selected }) =>
                  optionClasses(active, selected)
                }
              >
                {({ selected }) => (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      {option.icon && (
                        <span className="flex-shrink-0 text-gray-500">
                          {option.icon}
                        </span>
                      )}
                      <span className="truncate">{option.label}</span>
                    </div>
                    {selected && showCheckmark && (
                      <FaCheck className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    )}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
