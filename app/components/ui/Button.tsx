import React from 'react';
import Link from 'next/link';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-[#0A0A0A] text-white border-[#0A0A0A] hover:bg-[#2A2A2A]',
  secondary: 'bg-[#B8976A] text-white border-[#B8976A] hover:bg-[#A68659]',
  outline: 'bg-transparent text-[#0A0A0A] border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white',
};

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
}: ButtonProps) {
  const baseStyles = 'text-sm font-normal rounded-full transition-all duration-300 border inline-block text-center';
  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;
  
  // Inline style for reliable padding
  const buttonStyle = {
    paddingLeft: '32px',
    paddingRight: '32px',
    paddingTop: '16px',
    paddingBottom: '16px',
  };

  if (href) {
    return (
      <Link href={href} className={combinedStyles} style={buttonStyle}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedStyles} style={buttonStyle}>
      {children}
    </button>
  );
}
