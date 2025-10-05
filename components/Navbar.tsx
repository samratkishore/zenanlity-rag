import React from 'react';
import ZenanlityLogo from './ZenanlityLogo';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <ZenanlityLogo size="md" className="text-white" />
        
        <div className="flex items-center gap-4">
          <a 
            href="#features" 
            className="text-white hover:text-[#E1FF01] transition-colors duration-200 font-medium"
          >
            Features
          </a>
          <a 
            href="#about" 
            className="text-white hover:text-[#E1FF01] transition-colors duration-200 font-medium"
          >
            About
          </a>
          <a 
            href="#contact" 
            className="text-white hover:text-[#E1FF01] transition-colors duration-200 font-medium"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
