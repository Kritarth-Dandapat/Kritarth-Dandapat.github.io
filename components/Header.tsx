import React, { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { NAV_LINKS, CONTACT_INFO } from '../constants';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3 text-2xl font-bold text-slate-800 font-serif tracking-tight">
          <img 
            src="/data/My%20Studio%20Photo.JPG" 
            alt="Profile" 
            className="w-10 h-10 rounded-full object-cover border-2 border-sky-600 shadow-sm"
          />
          <span>K<span className="text-sky-600">.</span> Dandapat</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors uppercase tracking-wider"
            >
              {link.label}
            </a>
          ))}
          <a 
            href="/data/CV.pdf" 
            target="_blank"
            download
            className="flex items-center gap-2 bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition-colors text-sm font-medium shadow-lg shadow-sky-600/20"
          >
            <Download size={16} /> CV
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-slate-800 p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100">
          <nav className="flex flex-col p-6 gap-4">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.label} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-slate-700 hover:text-sky-600"
              >
                {link.label}
              </a>
            ))}
            <a 
               href="/data/CV.pdf" 
               target="_blank"
               download
               className="flex justify-center items-center gap-2 bg-sky-600 text-white px-4 py-3 rounded-md hover:bg-sky-700 transition-colors"
            >
              <Download size={18} /> Download CV
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};