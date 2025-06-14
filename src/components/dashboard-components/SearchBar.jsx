import React from 'react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative flex-1">
      <input
        type="text"
        name="search"
        placeholder=" "
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="peer input-styles"
      />
      <label
        htmlFor="search"
        className="label-styles !bg-[#c7c7c7] !text-[#111111]"
      >
        Поиск досок...
      </label>
    </div>
  );
}
