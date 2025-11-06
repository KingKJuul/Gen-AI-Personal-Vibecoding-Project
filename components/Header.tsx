
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-slate-50/80 backdrop-blur-lg border-b border-slate-200">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#home" className="text-2xl font-bold text-slate-900">
          Butter <span className="text-yellow-500">AI</span>
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
