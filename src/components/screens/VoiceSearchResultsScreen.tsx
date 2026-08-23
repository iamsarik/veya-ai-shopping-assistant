import React, { useState } from 'react';
import { Product } from '../../types';
import { Search, Mic, Plus, Check, SlidersHorizontal, Sparkles } from 'lucide-react';

interface VoiceSearchResultsScreenProps {
  query: string;
  results: Product[];
  onSelectProduct: (product: Product) => void;
  onAddProduct: (product: Product) => void;
  onStartVoiceSearch: () => void;
  onSearchChange: (newQuery: string) => void;
  addedProductIds?: string[];
}

export const VoiceSearchResultsScreen: React.FC<VoiceSearchResultsScreenProps> = ({
  query,
  results,
  onSelectProduct,
  onAddProduct,
  onStartVoiceSearch,
  onSearchChange,
  addedProductIds = [],
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const filters = ['All', 'Dairy', 'Produce', 'Bakery', 'Organic', 'Under $4'];

  const filteredResults = results.filter((product) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Dairy') return product.category.toLowerCase() === 'dairy';
    if (selectedFilter === 'Produce') return product.category === 'Fruits' || product.category === 'Vegetables';
    if (selectedFilter === 'Bakery') return product.category.toLowerCase() === 'bakery';
    if (selectedFilter === 'Organic') return product.isOrganic;
    if (selectedFilter === 'Under $4') return product.price < 4.0;
    return true;
  });

  return (
    <main className="flex-1 px-4 pt-3 pb-[100px] flex flex-col gap-3.5 relative z-10">
      {/* Search Input Bar */}
      <section className="flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-[#141626]/90 border border-[#272b47] shadow-sm">
          <Search className="w-4 h-4 text-[#8a90b0] stroke-[2.2]" />
          <input
            type="text"
            value={query}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search groceries..."
            className="w-full bg-transparent text-[14px] text-[#f3f4f8] placeholder-[#717694] focus:outline-none"
          />
        </div>

        <button
          onClick={onStartVoiceSearch}
          aria-label="Search with voice"
          className="w-10 h-10 rounded-2xl veya-voice-gradient text-white flex items-center justify-center shadow-[0_3px_12px_rgba(112,89,253,0.35)] active:scale-95 transition-all cursor-pointer shrink-0"
        >
          <Mic className="w-5 h-5 stroke-[2.2]" />
        </button>
      </section>

      {/* Voice Recognition Query Banner */}
      <section className="dark-card-subtle rounded-2xl p-3 border border-[#272b47] flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-[#7059fd]/20 border border-[#7059fd]/35 flex items-center justify-center text-[#06b6d4] shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.25)]">
            <Mic className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-[#8a90b0] uppercase tracking-wider">
              Voice Search Query
            </p>
            <p className="text-[13.5px] font-bold text-[#f3f4f8] truncate">
              &ldquo;{query || 'organic milk & fresh produce'}&rdquo;
            </p>
          </div>
        </div>

        <span className="text-[11.5px] font-extrabold bg-[#7059fd]/20 text-[#a899ff] px-2 py-0.5 rounded-full shrink-0 border border-[#7059fd]/35">
          {filteredResults.length} found
        </span>
      </section>

      {/* Filter Chips */}
      <section className="flex items-center gap-2 overflow-x-auto pb-1 -mx-4 px-4 select-none">
        <div className="flex items-center gap-1 text-[#8a90b0] text-[12px] font-semibold pl-1 pr-1 shrink-0">
          <SlidersHorizontal className="w-3.5 h-3.5" />
        </div>
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-3 py-1.5 rounded-full text-[12px] font-semibold shrink-0 transition-all cursor-pointer ${
              selectedFilter === filter
                ? 'bg-[#7059fd] text-white shadow-[0_2px_10px_rgba(112,89,253,0.35)]'
                : 'bg-[#151726]/90 text-[#b0b4c8] hover:bg-[#1f2237] border border-[#272b47]'
            }`}
          >
            {filter}
          </button>
        ))}
      </section>

      {/* Results Grid - 2 columns */}
      {filteredResults.length === 0 ? (
        <section className="flex flex-col items-center justify-center text-center py-12 px-4 dark-glass-surface rounded-3xl border border-[#272b47]">
          <Search className="w-10 h-10 text-[#6d728e] mb-2 stroke-[1.5]" />
          <h3 className="text-[16px] font-bold text-[#f3f4f8]">
            No products found
          </h3>
          <p className="text-[12.5px] text-[#9da3c2] mt-1 max-w-[220px]">
            Try searching for milk, bread, bananas, eggs, or say another prompt.
          </p>
          <button
            onClick={onStartVoiceSearch}
            className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl veya-voice-gradient text-white text-[13px] font-bold shadow-md cursor-pointer"
          >
            <Mic className="w-4 h-4" />
            <span>Try Voice Search</span>
          </button>
        </section>
      ) : (
        <section className="grid grid-cols-2 gap-2.5">
          {filteredResults.map((product) => {
            const isAdded = addedProductIds.includes(product.id);

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="bg-[#141626]/90 rounded-2xl p-2.5 border border-[#252942] shadow-sm flex flex-col justify-between relative group cursor-pointer hover:border-[#7059fd]/50 transition-all veya-card-hover"
              >
                {/* Organic badge */}
                {product.isOrganic && (
                  <span className="absolute top-2 left-2 z-10 bg-[#05df72]/20 text-[#05df72] border border-[#05df72]/35 text-[9.5px] font-extrabold px-1.5 py-0.2 rounded-md shadow-xs">
                    ORGANIC
                  </span>
                )}

                {/* Product Image */}
                <div className="w-full h-28 bg-[#0d0f1b] rounded-xl overflow-hidden mb-2 p-1.5 flex items-center justify-center border border-[#21243a]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300 brightness-95"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Product Info */}
                <div className="flex flex-col pr-8">
                  <p className="text-[15.5px] font-extrabold text-[#ffffff]">
                    ${product.price.toFixed(2)}
                  </p>
                  <h4 className="text-[13px] font-bold text-[#f3f4f8] leading-[17px] truncate mt-0.5">
                    {product.name}
                  </h4>
                  <p className="text-[11px] text-[#9da3c2] truncate">
                    {product.packageSize}
                  </p>
                </div>

                {/* Add button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddProduct(product);
                  }}
                  aria-label={`Add ${product.name}`}
                  className={`absolute bottom-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer active:scale-90 ${
                    isAdded
                      ? 'bg-[#05df72] text-black shadow-[0_2px_8px_rgba(5,223,114,0.4)]'
                      : 'bg-[#7059fd] text-white hover:bg-[#5d44fa] shadow-[0_2px_8px_rgba(112,89,253,0.35)]'
                  }`}
                >
                  {isAdded ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : (
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                  )}
                </button>
              </div>
            );
          })}
        </section>
      )}

      {/* Voice Assistant Floating Help Prompt Card */}
      <section className="mt-2 dark-card-subtle rounded-2xl p-3.5 border border-[#272b47] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#06b6d4]" />
          <div>
            <p className="text-[12.5px] font-bold text-[#f3f4f8]">
              Looking for something else?
            </p>
            <p className="text-[11.5px] text-[#9da3c2]">
              Just speak to Veya anytime.
            </p>
          </div>
        </div>

        <button
          onClick={onStartVoiceSearch}
          className="px-3 py-1.5 rounded-xl bg-[#7059fd] hover:bg-[#5d44fa] text-white text-[12px] font-bold shadow-sm active:scale-95 transition-all cursor-pointer"
        >
          Speak
        </button>
      </section>
    </main>
  );
};
