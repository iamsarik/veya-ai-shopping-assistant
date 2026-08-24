import React from 'react';
import { Product, ShoppingListItem, CategoryInfo } from '../../types';
import { CATEGORIES } from '../../data/products';
import { Search, Mic, Plus, Sparkles, RefreshCw, Sun, ThumbsUp } from 'lucide-react';
import { getPersonalizedRecommendations, getSeasonalRecommendations } from '../../utils/recommendations';

interface HomeScreenProps {
  onStartListening: () => void;
  onSearchFocus: () => void;
  onSelectPrompt: (prompt: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddProduct: (product: Product) => void;
  onSelectCategory: (categoryName: string) => void;
  onSeeAllCategories: () => void;
  featuredProducts: Product[];
  shoppingList: ShoppingListItem[];
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStartListening,
  onSearchFocus,
  onSelectPrompt,
  onSelectProduct,
  onAddProduct,
  onSelectCategory,
  onSeeAllCategories,
  featuredProducts,
  shoppingList,
}) => {
  // Running low item: Whole Milk
  const runningLowItem = featuredProducts.find((p) => p.id === 'whole-milk') || featuredProducts[0];
  
  // Smart Suggestions — Personalized based on user's active list
  const personalizedItems = getPersonalizedRecommendations(shoppingList, featuredProducts, 4);
  
  // Smart Suggestions — Seasonal based on real catalog items & current month
  const seasonalData = getSeasonalRecommendations(featuredProducts, 4);

  return (
    <main className="flex-1 px-4 pt-2.5 pb-[100px] flex flex-col gap-4 relative z-10">
      {/* Greetings section */}
      <section className="pt-1">
        <p className="text-[13.5px] font-medium text-[#9da3c2] flex items-center gap-1.5">
          Good morning <span className="text-base">👋</span>
        </p>
        <h2 className="text-[21px] font-extrabold text-[#f3f4f8] tracking-tight leading-[26px] mt-0.5">
          What do you need today?
        </h2>
      </section>

      {/* Compact Dark Translucent Search Bar */}
      <section>
        <div
          id="home-search-bar"
          onClick={onSearchFocus}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-[#141626]/85 backdrop-blur-md border border-[#272a44] shadow-sm hover:border-[#7059fd]/50 transition-all cursor-pointer group"
        >
          <Search className="w-4 h-4 text-[#8a90b0] group-hover:text-[#06b6d4] transition-colors stroke-[2.2]" />
          <span className="text-[14px] text-[#8a90b0] font-normal">
            Search products...
          </span>
        </div>
      </section>

      {/* Primary Veya Voice Card */}
      <section>
        <div
          id="veya-primary-voice-card"
          onClick={onStartListening}
          className="relative overflow-hidden rounded-3xl dark-card-subtle p-4 shadow-lg border border-[#2e3352] hover:border-[#7059fd]/60 transition-all cursor-pointer group veya-card-hover"
        >
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#7059fd]/20 blur-2xl pointer-events-none"></div>
          <div className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full bg-[#06b6d4]/15 blur-2xl pointer-events-none"></div>

          <div className="relative z-10 flex items-center justify-between gap-3">
            <div className="flex-1 pr-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#7059fd]/20 text-[#a899ff] text-[10.5px] font-extrabold tracking-wider uppercase mb-1.5 border border-[#7059fd]/35 shadow-[0_0_10px_rgba(112,89,253,0.15)]">
                <Sparkles className="w-3 h-3 text-[#06b6d4]" />
                <span>VOICE AI</span>
              </div>

              <h3 className="text-[17.5px] font-extrabold text-[#f3f4f8] tracking-tight leading-tight">
                Speak to Veya
              </h3>
              <p className="text-[13px] text-[#b0b4c8] mt-0.5 font-medium leading-[18px]">
                &ldquo;Your shopping, just say it.&rdquo;
              </p>

              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectPrompt('Add 2 gallons of whole milk');
                }}
                className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#111322]/90 text-[#a899ff] text-[11.5px] font-semibold border border-[#2b2f4c] shadow-xs hover:border-[#7059fd]/50 active:scale-95 transition-all"
              >
                <span className="text-[#06b6d4] font-bold">Try:</span>
                <span className="text-[#d8dbec] font-normal italic">&ldquo;Add 2 gallons of whole milk&rdquo;</span>
              </div>
            </div>

            <div className="relative shrink-0">
              <div className="w-[52px] h-[52px] rounded-full veya-voice-gradient veya-voice-glow flex items-center justify-center text-white border-2 border-[#161828] shadow-[0_6px_24px_rgba(112,89,253,0.45)] group-hover:scale-105 transition-transform">
                <Mic className="w-6 h-6 stroke-[2.4] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal Category Carousel */}
      <section className="flex flex-col gap-2 pt-1">
        <div className="flex items-center justify-between">
          <h3 className="text-[15px] font-bold text-[#f3f4f8] tracking-tight">
            Categories
          </h3>
          <button
            onClick={onSeeAllCategories}
            className="text-[12px] font-semibold text-[#8e7aff] hover:text-[#a899ff] cursor-pointer transition-colors bg-transparent border-none p-0"
          >
            See all
          </button>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-1 pt-0.5 -mx-4 px-4 select-none">
          {CATEGORIES.map((cat: CategoryInfo) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className="flex flex-col items-center gap-1.5 shrink-0 w-[72px] group cursor-pointer active:scale-95 transition-transform"
            >
              <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-[#22253c] to-[#323758] border border-[#2b2f4c] shadow-sm group-hover:border-[#7059fd]/60 group-hover:shadow-[0_0_12px_rgba(112,89,253,0.25)] transition-all overflow-hidden flex items-center justify-center">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full rounded-full object-cover group-hover:scale-110 transition-transform duration-300 brightness-95"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-[12px] font-semibold text-[#d4d7e8] group-hover:text-[#8e7aff] transition-colors text-center leading-tight break-words w-full">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* "You may be running low" Card */}
      {runningLowItem && (
        <section className="flex flex-col gap-2 pt-1">
          <div className="flex items-center justify-between">
            <h3 className="text-[15px] font-bold text-[#f3f4f8] tracking-tight flex items-center gap-1.5">
              <RefreshCw className="w-4 h-4 text-[#06b6d4] stroke-[2.2]" />
              <span>You may be running low</span>
            </h3>
            <span className="text-[11.5px] font-medium text-[#7c819b]">
              Based on history
            </span>
          </div>

          <div
            onClick={() => onSelectProduct(runningLowItem)}
            className="w-full bg-[#141626]/90 rounded-2xl p-3 border border-[#252942] shadow-sm flex items-center gap-3.5 hover:border-[#7059fd]/50 transition-all cursor-pointer veya-card-hover relative group"
          >
            <div className="w-16 h-16 rounded-xl bg-[#0e101c] overflow-hidden shrink-0 border border-[#23273e] p-1 flex items-center justify-center">
              <img
                src={runningLowItem.image}
                alt={runningLowItem.name}
                className="w-full h-full object-cover rounded-lg brightness-95"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex-1 min-w-0 pr-2">
              <span className="text-[11px] font-bold text-[#8e7aff] uppercase tracking-wider">
                {runningLowItem.category}
              </span>
              <h4 className="text-[14.5px] font-bold text-[#f3f4f8] truncate">
                {runningLowItem.name}
              </h4>
              <p className="text-[12px] text-[#9da3c2]">
                {runningLowItem.packageSize}
              </p>
              <p className="text-[15.5px] font-extrabold text-[#ffffff] mt-0.5">
                ${runningLowItem.price.toFixed(2)}
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddProduct(runningLowItem);
              }}
              aria-label={`Add ${runningLowItem.name}`}
              className="px-3.5 py-2 rounded-xl bg-[#7059fd] hover:bg-[#5d44fa] text-white text-[12.5px] font-bold flex items-center gap-1 shadow-[0_4px_14px_rgba(112,89,253,0.35)] active:scale-95 transition-all cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add</span>
            </button>
          </div>
        </section>
      )}

      {/* 1. PERSONALIZED RECOMMENDATIONS SECTION */}
      <section className="flex flex-col gap-2 pt-1">
        <div className="flex items-center justify-between">
          <h3 className="text-[15px] font-bold text-[#f3f4f8] tracking-tight flex items-center gap-1.5">
            <ThumbsUp className="w-4 h-4 text-[#8e7aff] stroke-[2.2]" />
            <span>Smart Suggestions for You</span>
          </h3>
          <span className="text-[11.5px] font-medium text-[#7c819b]">
            Personalized
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {personalizedItems.map((product) => (
            <div
              key={`pers-${product.id}`}
              onClick={() => onSelectProduct(product)}
              className="bg-[#141626]/90 rounded-2xl p-2.5 border border-[#252942] shadow-sm flex flex-col justify-between relative group cursor-pointer hover:border-[#7059fd]/50 transition-all veya-card-hover"
            >
              <div className="w-full h-24 bg-[#0d0f1b] rounded-xl overflow-hidden mb-2 p-1.5 flex items-center justify-center border border-[#21243a]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300 brightness-95"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex flex-col pr-8">
                <span className="text-[10px] font-bold text-[#8e7aff] uppercase tracking-wider">
                  {product.category}
                </span>
                <h4 className="text-[13px] font-bold text-[#f3f4f8] leading-[16px] truncate mt-0.5">
                  {product.name}
                </h4>
                <p className="text-[14.5px] font-extrabold text-[#ffffff] mt-1">
                  ${product.price.toFixed(2)}
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddProduct(product);
                }}
                aria-label={`Add ${product.name}`}
                className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-full bg-[#7059fd] text-white hover:bg-[#5d44fa] flex items-center justify-center shadow-[0_3px_10px_rgba(112,89,253,0.4)] transition-transform active:scale-90 cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 2. SEASONAL RECOMMENDATIONS SECTION */}
      <section className="flex flex-col gap-2 pt-1">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[15px] font-bold text-[#f3f4f8] tracking-tight flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-[#06b6d4] stroke-[2.2]" />
              <span>{seasonalData.title}</span>
            </h3>
            <p className="text-[11.5px] text-[#7c819b] mt-0.5">
              {seasonalData.subtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {seasonalData.products.map((product) => (
            <div
              key={`season-${product.id}`}
              onClick={() => onSelectProduct(product)}
              className="bg-[#141626]/90 rounded-2xl p-2.5 border border-[#252942] shadow-sm flex flex-col justify-between relative group cursor-pointer hover:border-[#06b6d4]/50 transition-all veya-card-hover"
            >
              <div className="w-full h-24 bg-[#0d0f1b] rounded-xl overflow-hidden mb-2 p-1.5 flex items-center justify-center border border-[#21243a]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300 brightness-95"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex flex-col pr-8">
                <span className="text-[10px] font-bold text-[#06b6d4] uppercase tracking-wider">
                  {product.category}
                </span>
                <h4 className="text-[13px] font-bold text-[#f3f4f8] leading-[16px] truncate mt-0.5">
                  {product.name}
                </h4>
                <p className="text-[14.5px] font-extrabold text-[#ffffff] mt-1">
                  ${product.price.toFixed(2)}
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddProduct(product);
                }}
                aria-label={`Add ${product.name}`}
                className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-full bg-[#06b6d4] text-white hover:bg-[#0891b2] flex items-center justify-center shadow-[0_3px_10px_rgba(6,182,212,0.4)] transition-transform active:scale-90 cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

