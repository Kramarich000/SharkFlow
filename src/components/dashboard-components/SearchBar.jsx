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
        className="peer w-full p-2 placeholder:!text-gray-900 outline-0
                   border border-transparent border-b-[#111111]
                   focus:border-[#111111] rounded-[0px]
                   focus:rounded-[8px] transition-all"
      />
      <label
        htmlFor="search"
        className="absolute pointer-events-none left-4 top-1/2 -translate-y-1/2
                   transition-all duration-200
                   peer-placeholder-shown:top-5 peer-placeholder-shown:text-base
                   peer-focus:top-0 peer-focus:text-sm !text-[#111111] bg-[#c7c7c7] px-1
                   peer-valid:top-0 peer-valid:text-sm"
      >
        Поиск досок...
      </label>
    </div>
  );
}
