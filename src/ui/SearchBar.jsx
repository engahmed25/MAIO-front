function SearchBar({ value, onChange }) {
  return (
    <input
      type="search"
      value={value}
      onChange={onChange}
      placeholder="Search doctors..."
      className="w-full p-2 border border-gray-300 rounded-md mb-4 outline-[var(--main-color)]"
    />
  );
}

export default SearchBar;
