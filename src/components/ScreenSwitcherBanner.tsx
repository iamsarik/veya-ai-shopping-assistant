import React from 'react';
import { ScreenType } from '../types';
import { Smartphone, Monitor, Sparkles } from 'lucide-react';

interface ScreenSwitcherBannerProps {
  currentScreen: ScreenType;
  onSelectScreen: (screen: ScreenType) => void;
  isMobileFrame: boolean;
  onToggleFrame: () => void;
}

export const ScreenSwitcherBanner: React.FC<ScreenSwitcherBannerProps> = ({
  currentScreen,
  onSelectScreen,
  isMobileFrame,
  onToggleFrame,
}) => {
  const screens: Array<{ id: ScreenType; label: string; number: number }> = [
    { id: 'home', label: '1. Home', number: 1 },
    { id: 'listening', label: '2. Listening', number: 2 },
    { id: 'confirmation', label: '3. Confirm', number: 3 },
    { id: 'success', label: '4. Success', number: 4 },
    { id: 'list', label: '5. List', number: 5 },
    { id: 'search', label: '6. Voice Search', number: 6 },
    { id: 'product_details', label: '7. Details', number: 7 },
  ];

  return (
    <aside aria-label="Screen preview controls" className="w-full bg-[#07080f] text-white py-2 px-3 flex flex-wrap items-center justify-between gap-2 text-xs border-b border-[#1b1e32] select-none z-50">
      <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
        <span className="text-[#8e93b0] text-[11px] font-bold uppercase tracking-wider pl-1 pr-1.5 flex items-center gap-1 shrink-0">
          <Sparkles className="w-3 h-3 text-[#06b6d4]" />
          <span>Screens:</span>
        </span>
        {screens.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelectScreen(s.id)}
            className={`px-2.5 py-1 rounded-lg text-[11.5px] font-semibold transition-all shrink-0 cursor-pointer ${
              currentScreen === s.id
                ? 'bg-[#7059fd] text-white shadow-[0_0_12px_rgba(112,89,253,0.4)]'
                : 'bg-[#151726] text-[#b0b4c8] hover:bg-[#1f2237] hover:text-white border border-[#232740]'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-1.5 shrink-0 ml-auto">
        <button
          onClick={onToggleFrame}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#151726] hover:bg-[#1f2237] text-[#b0b4c8] hover:text-white text-[11px] font-semibold transition-colors cursor-pointer border border-[#232740]"
        >
          {isMobileFrame ? (
            <>
              <Smartphone className="w-3 h-3 text-[#06b6d4]" />
              <span>390px Mobile View</span>
            </>
          ) : (
            <>
              <Monitor className="w-3 h-3 text-[#7059fd]" />
              <span>Fluid Responsive</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};
