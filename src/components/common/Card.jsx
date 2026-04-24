const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-white shadow-xl rounded-2xl p-5 transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
};

export default Card;