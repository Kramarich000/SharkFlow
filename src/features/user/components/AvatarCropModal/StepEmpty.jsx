export function StepEmpty({ getRootProps, getInputProps, isDragActive }) {
  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-20 text-center cursor-pointer transition-colors
      ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center space-y-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <p className="text-sm text-[var(--main-text)]">
          Перетащите фото сюда или просто нажмите
        </p>
        <p className="text-xs text-gray-400">JPG, PNG, WEBP, GIF</p>
      </div>
    </div>
  );
} 