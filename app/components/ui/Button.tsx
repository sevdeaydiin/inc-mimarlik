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
  primary: 'bg-[#0A0A0A] text-[#fff6eb] border-[#0A0A0A] hover:bg-[#2A2A2A]',
  secondary: 'bg-[#B8976A] text-[#fff6eb] border-[#B8976A] hover:bg-[#A68659]',
  outline: 'bg-[#fff6eb] text-[#0A0A0A] border-[#fff6eb] hover:bg-[#f0e8d7] hover:text-[#0A0A0A]',
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
