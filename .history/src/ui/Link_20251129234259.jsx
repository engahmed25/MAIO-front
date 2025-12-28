function Link({
  children,
  href = "#",
  className = "",
  withHover = true,
  withTransition = true,
  disabled = false,
}) {
  return (
    <a
      href={disabled ? undefined : href}
      className={`
        ${className}
        text-[var(--main-color)] font-bold
        ${withTransition ? "transition-all duration-300" : ""}
        ${withHover ? "hover:scale-110 hover:text-[var(--main-lite-color)]" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}
        inline-block
      `}
    >
      {children}
    </a>
  );
}

export default LinkText;
