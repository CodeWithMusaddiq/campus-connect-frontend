const Button = ({ children, onClick, variant = "primary", className = "", disabled = false, type = "button" }) => {
  const base = "px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 focus:outline-none";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 shadow-md hover:shadow-lg",
    secondary: "bg-white text-indigo-600 border border-indigo-300 hover:bg-indigo-50 hover:scale-105",
    danger: "bg-red-500 text-white hover:bg-red-600 hover:scale-105 shadow-md",
    success: "bg-green-500 text-white hover:bg-green-600 hover:scale-105 shadow-md",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100",
    disabled: "bg-gray-300 text-gray-500 cursor-not-allowed",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${disabled ? variants.disabled : variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;