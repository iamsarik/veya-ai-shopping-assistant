import React, { useState, useEffect } from 'react';
import { Product, VoiceRecognizedItem } from '../../types';
import { Check, X, Minus, Plus, Sparkles, Volume2, SearchX, Mic, AlertCircle } from 'lucide-react';

interface ConfirmationScreenProps {
  transcript: string;
  matchedProduct?: Product | null;
  initialQuantity?: number;
  recognizedItems?: VoiceRecognizedItem[];
  onConfirm: (product: Product, quantity: number) => void;
  onConfirmMultiple?: (items: { product: Product; quantity: number }[]) => void;
  onCancel: () => void;
}

export const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  transcript,
  matchedProduct,
  initialQuantity = 1,
  recognizedItems,
  onConfirm,
  onConfirmMultiple,
  onCancel,
}) => {
  const [itemsState, setItemsState] = useState<VoiceRecognizedItem[]>(() => {
    if (recognizedItems && recognizedItems.length > 0) {
      return recognizedItems;
    }
    if (matchedProduct !== undefined) {
      return [
        {
          id: 'item-0',
          rawText: matchedProduct ? matchedProduct.name : 'Unknown Item',
          product: matchedProduct,
          quantity: initialQuantity,
        },
      ];
    }
    return [];
  });

  useEffect(() => {
    if (recognizedItems && recognizedItems.length > 0) {
      setItemsState(recognizedItems);
    } else if (matchedProduct !== undefined) {
      setItemsState([
        {
          id: 'item-0',
          rawText: matchedProduct ? matchedProduct.name : 'Unknown Item',
          product: matchedProduct,
          quantity: initialQuantity,
        },
      ]);
    }
  }, [recognizedItems, matchedProduct, initialQuantity]);

  const handleIncrement = (itemId: string) => {
    setItemsState((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };

  const handleDecrement = (itemId: string) => {
    setItemsState((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
      )
    );
  };

  const foundItems = itemsState.filter(
    (item): item is VoiceRecognizedItem & { product: Product } => item.product !== null
  );
  const notFoundItems = itemsState.filter((item) => item.product === null);

  const handleConfirmAction = () => {
    if (onConfirmMultiple && foundItems.length > 0) {
      onConfirmMultiple(foundItems.map((i) => ({ product: i.product, quantity: i.quantity })));
    } else if (foundItems.length > 0) {
      foundItems.forEach((i) => onConfirm(i.product, i.quantity));
    }
  };

  // 1. All Items Not Found View
  if (foundItems.length === 0) {
    return (
      <main className="flex-1 px-4 pt-3 pb-[100px] flex flex-col justify-between relative z-10">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <section className="text-center pt-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2a1725]/90 border border-[#4d253b] text-[#ff7fa1] text-[12px] font-bold shadow-sm mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#ff4b72]" />
              <span>Product Not Found</span>
            </div>
            <h2 className="text-[20px] font-extrabold text-[#f3f4f8] tracking-tight">
              Sorry, I couldn&apos;t find that product.
            </h2>
            <p className="text-[13px] text-[#9da3c2] mt-0.5">
              That item isn&apos;t currently available in Veya&apos;s catalog.
            </p>
          </section>

          {/* Voice Transcript Card */}
          <section className="dark-glass-surface rounded-2xl p-3.5 border border-[#2b2f4c] shadow-sm">
            <div className="flex items-center gap-2 text-[11px] font-bold text-[#8a90b0] uppercase tracking-wider mb-1">
              <Volume2 className="w-3.5 h-3.5 text-[#06b6d4]" />
              <span>Veya Heard</span>
            </div>
            <p className="text-[14.5px] font-bold text-[#f3f4f8] italic">
              &ldquo;{transcript}&rdquo;
            </p>
          </section>

          {/* Not Found Details Card */}
          <section className="bg-[#141626]/90 rounded-3xl p-6 border border-[#272b47] shadow-md flex flex-col items-center text-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-[#1e172a] border border-[#3b244d] flex items-center justify-center text-[#ff7fa1] shadow-sm">
              <SearchX className="w-8 h-8 stroke-[1.8]" />
            </div>
            <div>
              <h3 className="text-[16px] font-extrabold text-[#f3f4f8]">
                Item Not Available
              </h3>
              <p className="text-[12.5px] text-[#9da3c2] mt-1 max-w-[240px] leading-relaxed">
                Try searching for another product, or say items like milk, bread, or non stick pan.
              </p>
            </div>
          </section>
        </div>

        {/* Action Button */}
        <div className="flex flex-col gap-2.5 pt-4">
          <button
            id="confirm-cancel-button"
            onClick={onCancel}
            className="w-full py-3.5 rounded-2xl veya-voice-gradient text-white text-[14.5px] font-extrabold flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(112,89,253,0.4)] active:scale-95 transition-all cursor-pointer"
          >
            <Mic className="w-4 h-4 stroke-[2.2]" />
            <span>Try Another Command</span>
          </button>
        </div>
      </main>
    );
  }

  const grandTotal = foundItems
    .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    .toFixed(2);

  const isMultiItem = foundItems.length > 1;

  return (
    <main className="flex-1 px-4 pt-3 pb-[100px] flex flex-col justify-between relative z-10">
      <div className="flex flex-col gap-4">
        {/* Title Header */}
        <section className="text-center pt-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#151829]/90 border border-[#2b2f4c] text-[#a899ff] text-[12px] font-bold shadow-sm mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#06b6d4]" />
            <span>Voice Command Confirmation</span>
          </div>
          <h2 className="text-[20px] font-extrabold text-[#f3f4f8] tracking-tight">
            {isMultiItem ? 'Did you mean to add these?' : 'Did you mean to add this?'}
          </h2>
          <p className="text-[13px] text-[#9da3c2] mt-0.5">
            {isMultiItem
              ? 'Review the items recognized by Veya before adding to your list.'
              : 'Review the item recognized by Veya before adding to your list.'}
          </p>
        </section>

        {/* Voice Transcript Card */}
        <section className="dark-glass-surface rounded-2xl p-3.5 border border-[#2b2f4c] shadow-sm">
          <div className="flex items-center gap-2 text-[11px] font-bold text-[#8a90b0] uppercase tracking-wider mb-1">
            <Volume2 className="w-3.5 h-3.5 text-[#06b6d4]" />
            <span>Veya Heard</span>
          </div>
          <p className="text-[14.5px] font-bold text-[#f3f4f8] italic">
            &ldquo;{transcript || 'Add milk and bread'}&rdquo;
          </p>
        </section>

        {/* Recognized Item Cards (In original sequence) */}
        <div className="flex flex-col gap-3">
          {itemsState.map((item) => {
            if (item.product) {
              const itemTotal = (item.product.price * item.quantity).toFixed(2);

              return (
                <section
                  key={item.id}
                  className="bg-[#141626]/90 rounded-3xl p-4 border border-[#272b47] shadow-md flex flex-col gap-3.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#05df72]/15 text-[#05df72] border border-[#05df72]/30 inline-flex items-center gap-1">
                      <Check className="w-3 h-3 stroke-[3]" /> Available
                    </span>
                    <span className="text-[11px] font-bold text-[#8e7aff] uppercase tracking-wider">
                      {item.product.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="w-16 h-16 rounded-2xl bg-[#0e101c] overflow-hidden shrink-0 border border-[#23273e] p-1 flex items-center justify-center">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded-xl brightness-95"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-[15.5px] font-extrabold text-[#f3f4f8] leading-tight truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-[12px] text-[#9da3c2]">
                        {item.unit ? `${item.unit} • ${item.product.packageSize}` : item.product.packageSize}
                      </p>
                      <p className="text-[13.5px] font-semibold text-[#c5c9de] mt-0.5">
                        ${item.product.price.toFixed(2)} / unit
                      </p>
                    </div>
                  </div>

                  <div className="h-px bg-[#22263d] w-full" />

                  {/* Quantity Controls & Subtotal */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11.5px] font-semibold text-[#8a90b0] block">
                        Quantity
                      </span>
                      <div className="flex items-center gap-2.5 mt-1 bg-[#0e101c] px-2.5 py-1 rounded-full border border-[#252942]">
                        <button
                          onClick={() => handleDecrement(item.id)}
                          aria-label="Decrease quantity"
                          className="w-5 h-5 rounded-full bg-[#181a2c] hover:bg-[#252942] text-[#d4d7e8] flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-[14px] font-extrabold text-[#ffffff] min-w-[18px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleIncrement(item.id)}
                          aria-label="Increase quantity"
                          className="w-5 h-5 rounded-full bg-[#7059fd] hover:bg-[#5d44fa] text-white flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[11.5px] font-semibold text-[#8a90b0] block">
                        Subtotal
                      </span>
                      <span className="text-[18px] font-black text-[#ffffff] tracking-tight">
                        ${itemTotal}
                      </span>
                    </div>
                  </div>
                </section>
              );
            } else {
              return (
                <section
                  key={item.id}
                  className="bg-[#24151e]/80 rounded-2xl p-3.5 border border-[#482433] shadow-sm flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <AlertCircle className="w-4 h-4 text-[#ff4b72] shrink-0" />
                    <div>
                      <span className="font-bold text-[#f3f4f8] text-[13.5px] capitalize">
                        &ldquo;{item.rawText}&rdquo;
                      </span>
                      <p className="text-[11px] text-[#ff7fa1]">
                        {item.unit ? `${item.quantity} ${item.unit} • Not available` : item.quantity > 1 ? `Qty: ${item.quantity} • Not available` : 'Not available in Veya catalog'}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[#ff7fa1] px-2.5 py-0.5 rounded-full bg-[#3b1c28] border border-[#522336] shrink-0">
                    Unavailable
                  </span>
                </section>
              );
            }
          })}
        </div>
      </div>

      {/* Primary & Secondary Action Buttons */}
      <div className="flex flex-col gap-2.5 pt-4">
        <button
          id="confirm-add-button"
          onClick={handleConfirmAction}
          className="w-full py-3.5 rounded-2xl bg-[#7059fd] hover:bg-[#5d44fa] text-white text-[15px] font-extrabold flex items-center justify-between px-5 shadow-[0_6px_20px_rgba(112,89,253,0.4)] active:scale-95 transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 stroke-[2.5]" />
            <span>
              {isMultiItem
                ? `Confirm & Add ${foundItems.length} Items to List`
                : 'Confirm & Add to List'}
            </span>
          </div>
          <span className="text-[16px] font-black bg-black/25 px-2.5 py-0.5 rounded-lg border border-white/10">
            ${grandTotal}
          </span>
        </button>

        <button
          id="confirm-cancel-button"
          onClick={onCancel}
          className="w-full py-3 rounded-2xl bg-[#141624] hover:bg-[#1b1e32] text-[#b0b4c8] hover:text-white border border-[#272b47] text-[13.5px] font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
        >
          <X className="w-4 h-4 stroke-[2]" />
          <span>Cancel & Try Again</span>
        </button>
      </div>
    </main>
  );
};
