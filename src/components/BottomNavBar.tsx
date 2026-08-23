import React from 'react';
import { NavTab } from '../types';
import { Home, Search, Mic, ShoppingBag, User } from 'lucide-react';

interface BottomNavBarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onMicClick: () => void;
  isListening?: boolean;
  listCount?: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onTabChange,
  onMicClick,
  isListening = false,
  listCount = 0,
}) => {
  return (
    <nav
      id="bottom-navigation-bar"
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] z-40 flex justify-around items-center px-3 h-[78px] bg-[#0c0d18]/92 backdrop-blur-xl border-t border-[#20233b] shadow-[0_-8px_32px_rgba(0,0,0,0.6)] rounded-t-[28px] select-none"
    >
      {/* Home Tab */}
      <button
        id="nav-tab-home"
        onClick={() => onTabChange('home')}
        className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-200 cursor-pointer ${
          activeTab === 'home'
            ? 'text-[#8e7aff] font-bold scale-105'
            : 'text-[#7c819b] hover:text-[#d4d7e8]'
        }`}
      >
        <div className={`p-1 rounded-xl ${activeTab === 'home' ? 'bg-[#7059fd]/15 text-[#9e8dff]' : ''}`}>
          <Home className={`w-[22px] h-[22px] ${activeTab === 'home' ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
        </div>
        <span className="text-[10.5px] font-semibold mt-0.5">
          Home
        </span>
      </button>

      {/* Search Tab */}
      <button
        id="nav-tab-search"
        onClick={() => onTabChange('search')}
        className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-200 cursor-pointer ${
          activeTab === 'search'
            ? 'text-[#8e7aff] font-bold scale-105'
            : 'text-[#7c819b] hover:text-[#d4d7e8]'
        }`}
      >
        <div className={`p-1 rounded-xl ${activeTab === 'search' ? 'bg-[#7059fd]/15 text-[#9e8dff]' : ''}`}>
          <Search className={`w-[22px] h-[22px] ${activeTab === 'search' ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
        </div>
        <span className="text-[10.5px] font-semibold mt-0.5">
          Search
        </span>
      </button>

      {/* Central Signature Veya Voice Orb */}
      <div className="relative -top-5 flex items-center justify-center">
        {/* Animated ripples if listening */}
        {isListening && (
          <>
            <div className="absolute inset-0 rounded-full bg-[#7059fd] opacity-40 animate-ping pointer-events-none scale-125"></div>
            <div className="absolute -inset-2 rounded-full border-2 border-[#06b6d4]/70 animate-pulse pointer-events-none"></div>
          </>
        )}

        <button
          id="central-voice-orb-button"
          onClick={onMicClick}
          aria-label="Voice shopping assistant"
          className="relative flex flex-col items-center justify-center w-[58px] h-[58px] rounded-full veya-voice-gradient veya-voice-glow transform hover:scale-105 active:scale-95 transition-all duration-200 border-[3.5px] border-[#0c0d18] cursor-pointer group focus:outline-none shadow-[0_8px_28px_rgba(112,89,253,0.45)]"
        >
          <Mic className="w-6 h-6 text-white stroke-[2.3] group-hover:scale-110 transition-transform drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
          <div className="absolute inset-0 rounded-full border border-white/25 pointer-events-none"></div>
        </button>
      </div>

      {/* List Tab */}
      <button
        id="nav-tab-list"
        onClick={() => onTabChange('list')}
        className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-200 cursor-pointer relative ${
          activeTab === 'list'
            ? 'text-[#8e7aff] font-bold scale-105'
            : 'text-[#7c819b] hover:text-[#d4d7e8]'
        }`}
      >
        <div className={`p-1 rounded-xl relative ${activeTab === 'list' ? 'bg-[#7059fd]/15 text-[#9e8dff]' : ''}`}>
          <ShoppingBag className={`w-[22px] h-[22px] ${activeTab === 'list' ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
          {listCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#7059fd] text-white text-[9.5px] font-extrabold flex items-center justify-center shadow-[0_0_8px_rgba(112,89,253,0.6)]">
              {listCount}
            </span>
          )}
        </div>
        <span className="text-[10.5px] font-semibold mt-0.5">
          List
        </span>
      </button>

      {/* Profile Tab */}
      <button
        id="nav-tab-profile"
        onClick={() => onTabChange('profile')}
        className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-200 cursor-pointer ${
          activeTab === 'profile'
            ? 'text-[#8e7aff] font-bold scale-105'
            : 'text-[#7c819b] hover:text-[#d4d7e8]'
        }`}
      >
        <div className={`p-1 rounded-xl ${activeTab === 'profile' ? 'bg-[#7059fd]/15 text-[#9e8dff]' : ''}`}>
          <User className={`w-[22px] h-[22px] ${activeTab === 'profile' ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
        </div>
        <span className="text-[10.5px] font-semibold mt-0.5">
          Profile
        </span>
      </button>
    </nav>
  );
};
