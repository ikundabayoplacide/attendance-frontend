interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const Button = ({ 
  children, 
  onClick, 
  className = '',
  style = {}
}: ButtonProps) => {
  return (
    <button 
      className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 cursor-pointer ${className}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;