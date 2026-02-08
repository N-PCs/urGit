
import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  toggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, toggle }) => {
  return (
    <button
      onClick={toggle}
      className="p-2 rounded-xl transition-all duration-300 hover:bg-slate-200 dark:hover:bg-slate-800 focus:outline-none"
      aria-label="Toggle Theme"
    >
      {isDark ? (
        <Sun className="text-amber-400 transition-transform duration-500 rotate-0 scale-100" size={22} />
      ) : (
        <Moon className="text-slate-600 transition-transform duration-500 rotate-0 scale-100" size={22} />
      )}
    </button>
  );
};

export default ThemeToggle;
