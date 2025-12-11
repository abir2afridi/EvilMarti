import React, { useState } from 'react';
import { Menu, X, Linkedin, Github, Youtube, Moon, Sun, User } from 'lucide-react';
import { NavItem } from '../types';
import { useTheme } from './ThemeProvider';

const navItems: NavItem[] = [
  { label: 'SERVICES', href: '#' },
  { label: 'CLIENTS', href: '#' },
  { label: 'PRODUCTS', href: '#' },
  { label: 'OPEN SOURCE', href: '#' },
  { label: 'BLOG', href: '#' },
  { label: 'EVENTS', href: '#' },
  { label: 'PODCAST', href: '#' },
  { label: 'CAREERS', href: '#' },
];

interface NavigationProps {
  onLoginClick: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onLoginClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      {/* Desktop Side Nav */}
      <nav className="hidden lg:flex fixed left-8 top-1/3 z-50 flex-col gap-4">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="text-xs font-bold tracking-widest text-white/70 hover:text-white transition-colors uppercase font-sans mix-blend-difference"
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Top Right Action & Socials */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-4">
        <button 
          onClick={onLoginClick}
          className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors mix-blend-difference mr-4"
        >
          <User size={16} />
          Login
        </button>

        <button 
          onClick={toggleTheme}
          className="bg-white/10 backdrop-blur-md text-white border border-white/10 p-2.5 rounded-sm hover:bg-white/20 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button className="bg-white text-black font-bold px-6 py-2 rounded-sm hover:bg-gray-200 transition-colors text-sm uppercase">
          Hire Martians
        </button>
        
        <div className="hidden md:flex flex-col gap-4 text-white/80 mix-blend-difference">
          <a href="#" className="hover:text-white transition-colors"><X size={20} /></a>
          <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
          <a href="#" className="hover:text-white transition-colors"><Github size={20} /></a>
          <a href="#" className="hover:text-white transition-colors"><Youtube size={20} /></a>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="lg:hidden fixed top-6 left-6 z-50 text-white mix-blend-difference"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 bg-black z-40 flex items-center justify-center lg:hidden">
          <nav className="flex flex-col gap-8 text-center">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-2xl font-bold text-white hover:text-martian-red transition-colors uppercase font-display"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <button 
                onClick={() => {
                    setIsOpen(false);
                    onLoginClick();
                }}
                className="text-xl font-bold text-martian-green hover:text-white transition-colors uppercase font-mono tracking-widest mt-8"
            >
                [ Access Login ]
            </button>
          </nav>
        </div>
      )}
    </>
  );
};
