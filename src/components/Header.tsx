import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ChevronDown, Check } from 'lucide-react';

interface HeaderProps {
  onBack?: () => void;
  showBack?: boolean;
  onLanguageClick?: () => void;
  currentLanguage?: string;
  onHomeClick?: () => void;
  onLanguageChange?: (lang: string) => void;
}

// Supported languages — English (en-US) and हिन्दी (hi-IN)
const LANGUAGES: string[] = ['English', 'हिन्दी'];

export const Header: React.FC<HeaderProps> = ({
  onBack,
  showBack = true,
  currentLanguage = 'English',
  onHomeClick,
  onLanguageChange,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const handleSelectLanguage = (lang: string) => {
    setDropdownOpen(false);
    if (onLanguageChange) onLanguageChange(lang);
  };

  // Abbreviate long language names in the button label to keep the header compact
  const getShortLabel = (lang: string): string => {
    if (lang === 'Bahasa Indonesia') return 'Bahasa';
    if (lang.length > 9) return lang.slice(0, 8) + '…';
    return lang;
  };

  return (
    <header className="w-full flex items-center justify-between px-5 py-3.5 relative bg-[#0c0d16]/90 backdrop-blur-md sticky top-0 z-30 select-none border-b border-[#1f2237]">
      {/* Leading Back button */}
      <div className="w-10 flex items-center">
        {showBack ? (
          <button
            id="header-back-button"
            onClick={onBack}
            aria-label="Go back"
            className="w-9 h-9 flex items-center justify-center text-[#7059fd] hover:text-white hover:bg-[#1a1d30] rounded-full transition-all active:scale-95 cursor-pointer border border-[#272b47]/80"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>
        ) : null}
      </div>

      {/* Mathematically Centered Brand Title */}
      <button
        id="header-brand-title"
        onClick={onHomeClick}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform active:scale-95 flex items-center gap-1.5 focus:outline-none z-10"
      >
        <span className="text-[23px] font-extrabold tracking-tight text-[#f3f4f8] hover:text-white">
          Veya
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] shadow-[0_0_8px_#06b6d4]"></span>
      </button>

      {/* Trailing Language dropdown */}
      <div className="relative w-20 flex justify-end" ref={dropdownRef}>
        <button
          id="header-language-button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-1 text-[#b0b4c8] text-[13px] font-semibold px-2.5 py-1 rounded-full bg-[#151726]/90 hover:bg-[#1c1f33] border border-[#272b47] transition-all active:scale-95 cursor-pointer"
        >
          <span className="truncate max-w-[60px]">{getShortLabel(currentLanguage)}</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#7c819b] stroke-[2] shrink-0" />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 top-full mt-1.5 w-44 bg-[#141624] rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.6)] border border-[#2c3050] py-1 z-50 animate-in fade-in zoom-in-95 duration-150">
            {/* Scrollable list — max-height keeps it inside the viewport */}
            <div className="max-h-[260px] overflow-y-auto overscroll-contain">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleSelectLanguage(lang)}
                  className={`w-full text-left px-3.5 py-2 text-[13px] transition-colors flex items-center justify-between cursor-pointer ${
                    currentLanguage === lang
                      ? 'text-[#7059fd] font-bold bg-[#1f1d3b]'
                      : 'text-[#d4d7e8] hover:bg-[#1b1e32]'
                  }`}
                >
                  <span>{lang}</span>
                  {currentLanguage === lang && (
                    <Check className="w-3.5 h-3.5 text-[#7059fd] stroke-[2.5] shrink-0 ml-2" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
