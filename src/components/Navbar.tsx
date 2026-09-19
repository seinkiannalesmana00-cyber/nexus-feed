"use client";

import { Search, Bell, Menu } from 'lucide-react';

interface NavbarProps {
  onSearch: (query: string) => void;
  onMobileMenuToggle?: () => void;
}

export default function Navbar({ onSearch, onMobileMenuToggle }: NavbarProps) {
  return (
    <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-4 lg:px-8 z-10 shrink-0">
      
      {/* Mobile Menu Toggle */}
      <button 
        className="md:hidden p-2 -ml-2 text-slate-500 hover:text-slate-700"
        onClick={onMobileMenuToggle}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Search Bar */}
      <div className="flex-1 flex items-center max-w-2xl mx-auto md:ml-0 md:mr-8">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            id="global-search"
            name="global-search"
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-md leading-5 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
            placeholder="Cari artikel, topik, atau pembuat..."
            onChange={(e) => onSearch(e.target.value)}
            aria-label="Cari artikel"
          />
        </div>
      </div>

    </header>
  );
}
