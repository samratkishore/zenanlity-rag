import React from 'react';

interface ZenanlityLogoProps {
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function ZenanlityLogo({ 
  showText = true, 
  size = 'md',
  className = '' 
}: ZenanlityLogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6 text-sm',
    md: 'w-8 h-8 text-base',
    lg: 'w-12 h-12 text-xl'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl'
  };

  return (
    <div className={`zenanlity-logo ${className}`}>
      <div className={`zenanlity-logo-symbol ${sizeClasses[size]}`}>
        Z
      </div>
             {showText && (
         <span className={`font-bold ${textSizeClasses[size]} text-white`}>
           ZenAnlity
         </span>
       )}
    </div>
  );
}
