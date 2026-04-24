const Input = ({ label, type = "text", value, onChange, placeholder, required = false, className = "" }) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-semibold text-gray-700">{label}</label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white/80 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 text-sm"
      />
    </div>
  );
};

export default Input;