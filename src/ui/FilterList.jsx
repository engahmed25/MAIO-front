function FilterList({ options = [], selected, onSelect }) {
  return (
    <div className="w-[40%] md:w-[20%] lg:w-[15%] ">
      <div className="flex flex-col space-y-2 p-4">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={`px-3 py-2 rounded-md text-left transition-colors duration-200 hover:bg-[var(--main-color)] hover:text-white cursor-pointer font-bold
            ${
              selected === option
                ? "bg-[var(--main-color)] text-white"
                : "bg-gray-100"
            }
          `}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterList;
