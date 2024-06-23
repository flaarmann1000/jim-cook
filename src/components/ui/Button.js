import React from 'react';

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = 'px-4 py-2 rounded font-medium focus:outline-none transition-all duration-200';

  const variantStyles = {
    primary: 'bg-[#2b2bce] text-white hover:bg-[#2424a6] active:bg-[#1d1d84]',
    secondary: 'bg-[#1f1f2b] text-white hover:bg-[#1a1a24] active:bg-[#14141e]',
    outline: 'border border-[#1f1f2b] text-[#1f1f2b] hover:bg-[#e0e0e0] active:bg-[#c0c0c0]',
  };

  const variantStyle = variantStyles[variant] || variantStyles.primary;

  return (
    <button className={`${baseStyle} ${variantStyle} ${className}`} {...props}>
      {children}
    </button>
  );
};
