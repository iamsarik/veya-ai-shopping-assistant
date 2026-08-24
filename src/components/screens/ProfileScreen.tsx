import React from 'react';
import { User, Mic, Heart, Shield, Bell, ChevronRight, Sparkles } from 'lucide-react';

interface ProfileScreenProps {
  onStartVoice: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onStartVoice }) => {
  return (
    <main className="flex-1 px-4 pt-2 pb-[100px] flex flex-col gap-4 relative z-10">
      {/* User Header */}
      <div className="w-full bg-[#141626]/90 rounded-3xl p-4 border border-[#272b47] shadow-md flex items-center gap-3.5">
        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#06b6d4] to-[#7059fd] p-0.5 flex items-center justify-center text-white shadow-xs">
          <div className="w-full h-full rounded-full bg-[#0e101c] flex items-center justify-center text-[#8e7aff]">
            <User className="w-7 h-7 stroke-[2]" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-[17px] font-extrabold text-[#f3f4f8] tracking-tight">
            Alex Morgan
          </h2>
          <p className="text-[12.5px] text-[#9da3c2]">
            alex.morgan@example.com
          </p>
          <span className="inline-flex items-center gap-1 mt-1 text-[10.5px] font-bold text-[#a899ff] bg-[#7059fd]/20 border border-[#7059fd]/35 px-2 py-0.5 rounded-full">
            <Sparkles className="w-3 h-3 text-[#06b6d4]" />
            <span>Veya Premium Member</span>
          </span>
        </div>
      </div>

      {/* Voice Assistant Settings */}
      <div className="flex flex-col gap-2">
        <h3 className="text-[12.5px] font-bold text-[#8e7aff] uppercase tracking-wider px-1">
          Voice Preferences
        </h3>

        <div className="bg-[#141626]/90 rounded-2xl border border-[#272b47] overflow-hidden shadow-sm">
          <div
            onClick={onStartVoice}
            className="p-3.5 flex items-center justify-between border-b border-[#21243a] hover:bg-[#1c1f33] cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#1c1f33] text-[#06b6d4] flex items-center justify-center border border-[#2c304e]">
                <Mic className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[13.5px] font-bold text-[#f3f4f8]">
                  Voice Command Sensitivity
                </p>
                <p className="text-[11.5px] text-[#9da3c2]">
                  High accuracy mode enabled
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#7c819b]" />
          </div>

          <div className="p-3.5 flex items-center justify-between hover:bg-[#1c1f33] cursor-pointer transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#1c1f33] text-[#ff4d8b] flex items-center justify-center border border-[#2c304e]">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[13.5px] font-bold text-[#f3f4f8]">
                  Dietary Preferences
                </p>
                <p className="text-[11.5px] text-[#9da3c2]">
                  Organic, Whole Milk, Fresh Produce
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#7c819b]" />
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="flex flex-col gap-2">
        <h3 className="text-[12.5px] font-bold text-[#8e7aff] uppercase tracking-wider px-1">
          General
        </h3>

        <div className="bg-[#141626]/90 rounded-2xl border border-[#272b47] overflow-hidden shadow-sm">
          <div className="p-3.5 flex items-center justify-between border-b border-[#21243a] hover:bg-[#1c1f33] cursor-pointer transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#1c1f33] text-[#8e7aff] flex items-center justify-center border border-[#2c304e]">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[13.5px] font-bold text-[#f3f4f8]">
                  Order Notifications
                </p>
                <p className="text-[11.5px] text-[#9da3c2]">
                  Restock reminders & delivery alerts
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#7c819b]" />
          </div>

          <div className="p-3.5 flex items-center justify-between hover:bg-[#1c1f33] cursor-pointer transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#1c1f33] text-[#05df72] flex items-center justify-center border border-[#2c304e]">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[13.5px] font-bold text-[#f3f4f8]">
                  Privacy & Voice History
                </p>
                <p className="text-[11.5px] text-[#9da3c2]">
                  Encrypted on-device recognition
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#7c819b]" />
          </div>
        </div>
      </div>
    </main>
  );
};
