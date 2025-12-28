function Button({
  children,
  onClick,
  disabled,
  className,
  withTransition = true,
  withHover = true,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${className} bg-[var(--main-color)] text-white font-bold rounded-[var(--main-radius)] ${
        withTransition
          ? "transition-colors duration-500 cursor-pointer"
          : "bg-gray-400 cursor-not-allowed"
      } ${withHover ? "hover:scale-110 hover:bg-[var(--main-lite-color)]" : ""} `}
    >
      {children}
    </button>
  );
}

export default Button;
