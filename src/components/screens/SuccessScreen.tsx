import React from 'react';
import { ShoppingListItem } from '../../types';
import { Check, Mic, ShoppingBag, ArrowRight } from 'lucide-react';

interface SuccessScreenProps {
  lastAddedItem: ShoppingListItem | null;
  totalListCount: number;
  totalListPrice: number;
  onViewList: () => void;
  onSpeakAgain: () => void;
  onGoHome: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({
  lastAddedItem,
  totalListCount,
  totalListPrice,
  onViewList,
  onSpeakAgain,
  onGoHome,
}) => {
  const item = lastAddedItem?.product;
  const quantity = lastAddedItem?.quantity || 1;

  return (
    <main className="flex-1 px-4 pt-4 pb-[100px] flex flex-col justify-between items-center relative z-10">
      <div className="w-full flex flex-col items-center text-center">
        {/* Animated Green Checkmark Pill */}
        <div className="relative my-3">
          <div className="w-20 h-20 rounded-full bg-[#05df72]/15 border border-[#05df72]/35 flex items-center justify-center text-[#05df72] shadow-[0_0_30px_rgba(5,223,114,0.25)] animate-bounce duration-1000">
            <Check className="w-10 h-10 stroke-[3]" />
          </div>
          <div className="absolute inset-0 rounded-full bg-[#05df72]/20 animate-ping pointer-events-none scale-110"></div>
        </div>

        <h2 className="text-[22px] font-extrabold text-[#f3f4f8] tracking-tight mt-2">
          Added to your list!
        </h2>
        <p className="text-[13.5px] text-[#9da3c2] mt-1 max-w-[260px]">
          Veya successfully recognized and added your groceries.
        </p>

        {/* Added Item Summary Card */}
        {item && (
          <div className="w-full bg-[#141626]/90 rounded-3xl p-4 border border-[#272b47] shadow-md mt-5 text-left flex items-center gap-3.5">
            <div className="w-16 h-16 rounded-2xl bg-[#0e101c] overflow-hidden shrink-0 border border-[#23273e] p-1 flex items-center justify-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover rounded-xl brightness-95"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-[#8e7aff] uppercase tracking-wider">
                  {item.category}
                </span>
                <span className="text-[10px] bg-[#7059fd]/20 text-[#a899ff] px-2 py-0.2 rounded-full font-bold border border-[#7059fd]/30">
                  Qty: {quantity}
                </span>
              </div>
              <h4 className="text-[15px] font-bold text-[#f3f4f8] truncate">
                {item.name}
              </h4>
              <p className="text-[14px] font-extrabold text-[#ffffff] mt-0.5">
                ${(item.price * quantity).toFixed(2)}
              </p>
            </div>
          </div>
        )}

        {/* Quick Cart / List Status pill */}
        <div className="w-full mt-3 px-4 py-2.5 rounded-2xl dark-card-subtle flex items-center justify-between border border-[#272b47]">
          <div className="flex items-center gap-2 text-[12.5px] font-bold text-[#b0b4c8]">
            <ShoppingBag className="w-4 h-4 text-[#8e7aff]" />
            <span>List Total ({totalListCount} {totalListCount === 1 ? 'item' : 'items'})</span>
          </div>
          <span className="text-[14px] font-extrabold text-[#ffffff]">
            ${totalListPrice.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full flex flex-col gap-2.5 pt-4">
        {/* Speak again button with gradient */}
        <button
          onClick={onSpeakAgain}
          className="w-full py-3.5 rounded-2xl veya-voice-gradient text-white text-[14.5px] font-extrabold flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(112,89,253,0.4)] active:scale-95 transition-all cursor-pointer group"
        >
          <Mic className="w-5 h-5 group-hover:scale-110 transition-transform stroke-[2.3]" />
          <span>Speak Again (Add More)</span>
        </button>

        {/* View Shopping List */}
        <button
          onClick={onViewList}
          className="w-full py-3 rounded-2xl bg-[#141624] hover:bg-[#1b1e32] text-[#8e7aff] hover:text-[#a899ff] border border-[#2c304e] text-[14px] font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>View Shopping List</span>
          <ArrowRight className="w-4 h-4 stroke-[2.2]" />
        </button>

        {/* Home */}
        <button
          onClick={onGoHome}
          className="text-[12.5px] font-semibold text-[#7c819b] hover:text-[#b0b4c8] py-1 cursor-pointer transition-colors"
        >
          Back to Home
        </button>
      </div>
    </main>
  );
};
