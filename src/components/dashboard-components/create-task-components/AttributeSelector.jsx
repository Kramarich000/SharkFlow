import React from 'react';
import Select from '@components/main-components/Select';

const AttributeSelector = ({
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
    <div className="relative w-full mt-4">
      <Select
        value={value}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        size={size}
        variant={variant}
        icon={icon}
        optionsClassName={optionsClassName}
        showCheckmark={showCheckmark}
      />
    </div>
  );
};

export default AttributeSelector;
