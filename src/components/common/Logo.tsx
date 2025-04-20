
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'default' | 'small';
}

const Logo = ({ variant = 'default' }: LogoProps) => {
  return (
    <Link to="/" className="flex items-center">
      <span className={`font-bold text-invoice-purple ${variant === 'small' ? 'text-xl' : 'text-2xl'}`}>
        InvoiceGenie
      </span>
    </Link>
  );
};

export default Logo;
