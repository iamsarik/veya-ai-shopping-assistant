import React from 'react';
import { ShoppingListItem } from '../../types';
import { Trash2, Plus, Minus, Check, ShoppingBag, Mic, Sparkles, ArrowRight } from 'lucide-react';

interface ShoppingListScreenProps {
  items: ShoppingListItem[];
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onToggleChecked: (id: string) => void;
  onRemoveItem: (id: string) => void;
  onStartListening: () => void;
  onBrowseProducts: () => void;
  onCheckout: () => void;
}

export const ShoppingListScreen: React.FC<ShoppingListScreenProps> = ({
  items,
  onUpdateQuantity,
  onToggleChecked,
  onRemoveItem,
  onStartListening,
  onBrowseProducts,
  onCheckout,
}) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const tax = subtotal * 0.0825;
  const total = subtotal + tax;
  const activeCount = items.filter((i) => !i.checked).length;

  return (
    <main className="flex-1 px-4 pt-3 pb-[140px] flex flex-col gap-4 relative z-10">
      {/* Header section with Voice quick add button */}
      <section className="flex items-center justify-between pt-1">
        <div>
          <h2 className="text-[21px] font-extrabold text-[#f3f4f8] tracking-tight flex items-center gap-2">
            <span>Shopping List</span>
            <span className="text-[12px] font-extrabold bg-[#7059fd]/20 text-[#a899ff] border border-[#7059fd]/35 px-2 py-0.5 rounded-full">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </span>
          </h2>
          <p className="text-[12.5px] text-[#9da3c2]">
            {activeCount} items to pick up
          </p>
        </div>

        <button
          onClick={onStartListening}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full veya-voice-gradient text-white text-[12px] font-bold shadow-[0_3px_12px_rgba(112,89,253,0.35)] active:scale-95 transition-all cursor-pointer"
        >
          <Mic className="w-3.5 h-3.5" />
          <span>Voice Add</span>
        </button>
      </section>

      {/* List items or Empty state */}
      {items.length === 0 ? (
        <section className="flex-1 flex flex-col items-center justify-center text-center py-12 px-4 dark-glass-surface rounded-3xl border border-[#272b47]">
          <div className="w-16 h-16 rounded-full bg-[#151829] border border-[#2b2f4c] flex items-center justify-center text-[#7059fd] mb-3 shadow-inner">
            <ShoppingBag className="w-8 h-8 stroke-[1.8]" />
          </div>
          <h3 className="text-[17px] font-bold text-[#f3f4f8]">
            Your shopping list is empty
          </h3>
          <p className="text-[13px] text-[#9da3c2] max-w-[220px] mt-1 mb-5">
            Tap the microphone to quickly add groceries with your voice.
          </p>

          <button
            onClick={onStartListening}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl veya-voice-gradient text-white text-[13.5px] font-extrabold shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <Mic className="w-4 h-4" />
            <span>Say &ldquo;Add milk, eggs, bread&rdquo;</span>
          </button>
        </section>
      ) : (
        <section className="flex flex-col gap-2.5">
          {items.map((item) => {
            const isChecked = item.checked;
            const itemTotal = (item.product.price * item.quantity).toFixed(2);

            return (
              <div
                key={item.id}
                className={`w-full rounded-2xl p-3 border transition-all duration-200 flex items-center gap-3 relative ${
                  isChecked
                    ? 'bg-[#101220]/60 border-[#1f2237] opacity-60'
                    : 'bg-[#141626]/90 border-[#252942] shadow-sm hover:border-[#7059fd]/50'
                }`}
              >
                {/* Custom Checkbox */}
                <button
                  onClick={() => onToggleChecked(item.id)}
                  aria-label={isChecked ? 'Mark item uncompleted' : 'Mark item completed'}
                  className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                    isChecked
                      ? 'bg-[#05df72] text-black shadow-[0_0_8px_rgba(5,223,114,0.4)]'
                      : 'border-2 border-[#363a5a] hover:border-[#7059fd] bg-[#0c0d16]'
                  }`}
                >
                  {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                </button>

                {/* Product Thumbnail */}
                <div className="w-13 h-13 rounded-xl bg-[#0d0f1b] overflow-hidden shrink-0 border border-[#21243a] p-1 flex items-center justify-center">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover rounded-lg brightness-95"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0 pr-1">
                  <h4
                    className={`text-[14px] font-bold truncate leading-tight ${
                      isChecked
                        ? 'line-through text-[#6e7390]'
                        : 'text-[#f3f4f8]'
                    }`}
                  >
                    {item.product.name}
                  </h4>
                  <p className="text-[11.5px] text-[#9da3c2] truncate">
                    {item.product.packageSize} • ${item.product.price.toFixed(2)}/ea
                  </p>
                  <p className="text-[13.5px] font-extrabold text-[#ffffff] mt-0.5">
                    ${itemTotal}
                  </p>
                </div>

                {/* Quantity Stepper */}
                <div className="flex items-center gap-1.5 bg-[#0e101c] px-2 py-1 rounded-xl border border-[#252942] shrink-0">
                  <button
                    onClick={() =>
                      onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    disabled={item.quantity <= 1}
                    className="w-5 h-5 rounded-md bg-[#181a2c] hover:bg-[#252942] disabled:opacity-30 text-[#d4d7e8] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-[13px] font-bold text-[#ffffff] min-w-[16px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="w-5 h-5 rounded-md bg-[#7059fd] hover:bg-[#5d44fa] text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => onRemoveItem(item.id)}
                  aria-label="Remove item"
                  className="text-[#6d728e] hover:text-[#ff5c5c] p-1 transition-colors cursor-pointer shrink-0"
                >
                  <Trash2 className="w-4 h-4 stroke-[1.8]" />
                </button>
              </div>
            );
          })}
        </section>
      )}

      {/* Suggested Quick Add prompt */}
      {items.length > 0 && (
        <section className="dark-card-subtle rounded-2xl p-3 border border-[#272b47] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#06b6d4]" />
            <span className="text-[12.5px] font-semibold text-[#b0b4c8]">
              Need more items?
            </span>
          </div>
          <button
            onClick={onBrowseProducts}
            className="text-[12px] font-bold text-[#8e7aff] hover:text-[#a899ff] cursor-pointer"
          >
            Browse Products &rarr;
          </button>
        </section>
      )}

      {/* Sticky Order Summary & Checkout Footer */}
      {items.length > 0 && (
        <div className="fixed bottom-[78px] left-1/2 -translate-x-1/2 w-full max-w-[500px] px-4 py-3 bg-[#0c0d18]/95 backdrop-blur-xl border-t border-[#20233b] z-30 shadow-[0_-6px_24px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col gap-1 mb-2.5">
            <div className="flex justify-between text-[12px] text-[#9da3c2]">
              <span>Subtotal</span>
              <span className="font-semibold text-[#d4d7e8]">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[12px] text-[#9da3c2]">
              <span>Estimated Tax</span>
              <span className="font-semibold text-[#d4d7e8]">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[15px] font-black text-[#ffffff] pt-1 border-t border-[#1f2237]">
              <span>Total (USD)</span>
              <span className="text-[17px] text-[#ffffff]">${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={onCheckout}
            className="w-full py-3 rounded-2xl bg-[#7059fd] hover:bg-[#5d44fa] text-white text-[14.5px] font-extrabold flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(112,89,253,0.35)] active:scale-95 transition-all cursor-pointer"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      )}
    </main>
  );
};
