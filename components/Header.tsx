
import React from 'react';

const Logo = () => (
    <svg aria-label="Butter AI Logo" role="img" viewBox="0 0 241 48" xmlns="http://www.w3.org/2000/svg" className="h-9 w-auto">
        <text
            fill="#0f172a"
            style={{fontFamily: 'Inter, sans-serif', whiteSpace: 'pre'}}
            fontSize="36"
            fontWeight="bold">
                <tspan x="0" y="35.5">Butter AI</tspan>
        </text>
        <g stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M208.5 39.5H236.5L239 30.5H206L208.5 39.5Z"/>
            <path d="M214 22.5H231V30.5H214V22.5Z"/>
            <path d="M211 22.5V15.5C211 12.4624 213.462 10 216.5 10H220.5C223.538 10 226 12.4624 226 15.5V22.5"/>
        </g>
    </svg>
);


const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-slate-50/80 backdrop-blur-lg border-b border-slate-200">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <a href="#home" className="flex items-center">
          <Logo />
        </a>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#about" className="text-slate-600 hover:text-yellow-500 transition-colors duration-300">About</a>
          <a href="#product" className="text-slate-600 hover:text-yellow-500 transition-colors duration-300">Product</a>
          <a href="#contact" className="text-slate-600 hover:text-yellow-500 transition-colors duration-300">Contact</a>
        </nav>
        <a 
          href="#contact"
          className="hidden md:inline-block bg-slate-900 text-white font-semibold px-5 py-2 rounded-lg hover:bg-slate-700 transition-colors duration-300"
        >
          Get Early Access
        </a>
      </div>
    </header>
  );
};

export default Header;