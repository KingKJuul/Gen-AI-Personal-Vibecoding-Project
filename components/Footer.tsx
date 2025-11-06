
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 border-t border-slate-200">
      <div className="container mx-auto px-6 py-6 text-center text-slate-500">
        <p>&copy; {new Date().getFullYear()} Butter AI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
