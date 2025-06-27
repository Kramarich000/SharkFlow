export function SearchBar({ value, onChange }) {
  return (
    <div className="relative flex-1">
      <input
        type="text"
        name="search"
        placeholder=" "
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="peer input-styles input-primary"
      />
      <label
        htmlFor="search"
        className="label-styles"
      >
        Поиск досок...
      </label>
    </div>
  );
}
