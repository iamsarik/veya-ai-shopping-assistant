import React, { useState } from 'react';
import { Product } from '../../types';
import { Minus, Plus, ShoppingBag, Mic, Check, Heart, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { getSubstituteRecommendations } from '../../utils/recommendations';

interface ProductDetailsScreenProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onStartVoiceWithProduct: (productName: string) => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  allProducts?: Product[];
  onSelectProduct?: (product: Product) => void;
}

export const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({
  product,
  onAddToCart,
  onStartVoiceWithProduct,
  isFavorite = false,
  onToggleFavorite,
  allProducts = [],
  onSelectProduct,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const totalPrice = (product.price * quantity).toFixed(2);

  // Substitute / Alternative Recommendations from same category
  const substitutes = getSubstituteRecommendations(product, allProducts, 3);

  return (
    <main className="flex-1 px-4 pt-2 pb-[150px] flex flex-col gap-4 relative z-10">
      {/* Product Image Stage */}
      <section className="relative w-full h-64 bg-[#0d0f1b] rounded-3xl overflow-hidden border border-[#21243a] p-3 flex items-center justify-center shadow-md">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-2xl brightness-95"
          referrerPolicy="no-referrer"
        />

        {/* Floating Organic & Category Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
          <span className="bg-[#7059fd]/85 backdrop-blur-md text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm">
            {product.category.toUpperCase()}
          </span>
          {product.isOrganic && (
            <span className="bg-[#05df72]/20 backdrop-blur-md text-[#05df72] border border-[#05df72]/40 text-[10.5px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm">
              100% ORGANIC
            </span>
          )}
        </div>

        {/* Favorite button */}
        <button
          onClick={onToggleFavorite}
          aria-label="Add to favorites"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#141626]/85 backdrop-blur-md border border-[#2c304e] flex items-center justify-center text-[#d4d7e8] hover:text-[#ff4d4d] shadow-sm transition-colors cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 ${isFavorite ? 'fill-[#ff4d4d] text-[#ff4d4d]' : ''}`}
          />
        </button>
      </section>

      {/* Product Title & USD Price Section */}
      <section className="flex flex-col gap-1">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="text-[20px] font-extrabold text-[#f3f4f8] tracking-tight leading-tight">
            {product.name}
          </h2>
          <span className="text-[22px] font-black text-[#ffffff] shrink-0">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <p className="text-[13px] font-semibold text-[#8e7aff]">
          {product.packageSize}
        </p>

        {/* Rating and Delivery notes */}
        <div className="flex items-center gap-3 mt-1.5 text-[12px] text-[#9da3c2]">
          <span className="flex items-center gap-1 text-[#fbbf24] font-bold">
            ★ {product.rating} <span className="text-[#7c819b] font-normal">({product.reviewsCount})</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 text-[#05df72] font-semibold">
            <Truck className="w-3.5 h-3.5" /> In stock • Delivery in 30 mins
          </span>
        </div>
      </section>

      {/* Ask Veya Voice Assistant Card */}
      <section>
        <div
          onClick={() => onStartVoiceWithProduct(product.name)}
          className="dark-card-subtle rounded-2xl p-3 border border-[#272b47] flex items-center justify-between cursor-pointer hover:border-[#7059fd]/50 transition-all"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full veya-voice-gradient flex items-center justify-center text-white shrink-0 shadow-[0_2px_8px_rgba(112,89,253,0.35)]">
              <Mic className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[12.5px] font-bold text-[#f3f4f8] truncate">
                Ask Veya about this item
              </p>
              <p className="text-[11px] text-[#9da3c2] truncate">
                &ldquo;Is this gluten free?&rdquo; or &ldquo;Add to weekly staples&rdquo;
              </p>
            </div>
          </div>

          <span className="text-[11px] font-extrabold text-[#8e7aff] px-2 py-1 rounded-lg bg-[#7059fd]/15 shrink-0 border border-[#7059fd]/30">
            Ask
          </span>
        </div>
      </section>

      {/* Description */}
      <section className="bg-[#141626]/90 rounded-2xl p-3.5 border border-[#252942] shadow-sm flex flex-col gap-1.5">
        <h3 className="text-[13.5px] font-bold text-[#f3f4f8]">
          Description
        </h3>
        <p className="text-[12.5px] text-[#b0b4c8] leading-[19px]">
          {product.description}
        </p>
      </section>

      {/* Nutritional Highlights Grid */}
      {product.nutrition && (
        <section className="flex flex-col gap-2">
          <h3 className="text-[13.5px] font-bold text-[#f3f4f8]">
            Nutritional Highlights
          </h3>
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-[#101222] rounded-xl p-2 text-center border border-[#21243a]">
              <span className="text-[10px] text-[#7c819b] font-semibold uppercase block">
                Calories
              </span>
              <span className="text-[13px] font-extrabold text-[#f3f4f8] mt-0.5 block">
                {product.nutrition.calories}
              </span>
            </div>
            <div className="bg-[#101222] rounded-xl p-2 text-center border border-[#21243a]">
              <span className="text-[10px] text-[#7c819b] font-semibold uppercase block">
                Protein
              </span>
              <span className="text-[13px] font-extrabold text-[#f3f4f8] mt-0.5 block">
                {product.nutrition.protein}
              </span>
            </div>
            <div className="bg-[#101222] rounded-xl p-2 text-center border border-[#21243a]">
              <span className="text-[10px] text-[#7c819b] font-semibold uppercase block">
                Carbs
              </span>
              <span className="text-[13px] font-extrabold text-[#f3f4f8] mt-0.5 block">
                {product.nutrition.carbs}
              </span>
            </div>
            <div className="bg-[#101222] rounded-xl p-2 text-center border border-[#21243a]">
              <span className="text-[10px] text-[#7c819b] font-semibold uppercase block">
                Fat
              </span>
              <span className="text-[13px] font-extrabold text-[#f3f4f8] mt-0.5 block">
                {product.nutrition.fat}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* 3. SUBSTITUTE RECOMMENDATIONS SECTION */}
      {substitutes.length > 0 && (
        <section className="flex flex-col gap-2 pt-2 border-t border-[#21243a]">
          <div className="flex items-center justify-between">
            <h3 className="text-[13.5px] font-bold text-[#f3f4f8] flex items-center gap-1.5">
              <RefreshCw className="w-4 h-4 text-[#06b6d4]" />
              <span>Smart Substitutes & Alternatives</span>
            </h3>
            <span className="text-[11px] font-medium text-[#8e7aff]">
              Same Category
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {substitutes.map((sub) => (
              <div
                key={`sub-${sub.id}`}
                onClick={() => onSelectProduct && onSelectProduct(sub)}
                className="bg-[#101222] rounded-2xl p-2.5 border border-[#21243a] flex items-center justify-between gap-3 hover:border-[#7059fd]/50 transition-all cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0a0c16] overflow-hidden shrink-0 border border-[#1e2136] p-1 flex items-center justify-center">
                  <img
                    src={sub.image}
                    alt={sub.name}
                    className="w-full h-full object-cover rounded-lg brightness-95"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[13px] font-bold text-[#f3f4f8] truncate">
                    {sub.name}
                  </h4>
                  <p className="text-[11.5px] text-[#9da3c2]">
                    {sub.packageSize} • ${sub.price.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(sub, 1);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#7059fd] hover:bg-[#5d44fa] text-white text-[11.5px] font-bold flex items-center gap-1 active:scale-95 transition-all cursor-pointer shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Quality Guarantees */}
      <section className="flex items-center justify-between text-[11.5px] text-[#9da3c2] px-1 py-1">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#05df72]" /> 100% Freshness guarantee
        </span>
        <span>•</span>
        <span>Local Farm Sourced</span>
      </section>

      {/* Bottom Sticky Add to Cart Control */}
      <div className="fixed bottom-[78px] left-1/2 -translate-x-1/2 w-full max-w-[390px] px-4 py-3 bg-[#0c0d18]/95 backdrop-blur-xl border-t border-[#20233b] z-30 shadow-[0_-6px_24px_rgba(0,0,0,0.5)] flex items-center gap-3">
        {/* Quantity Stepper */}
        <div className="flex items-center gap-2 bg-[#121424] px-3 py-2 rounded-2xl border border-[#252942] shrink-0">
          <button
            onClick={handleDecrement}
            className="w-6 h-6 rounded-lg bg-[#1a1d30] hover:bg-[#252942] text-[#d4d7e8] flex items-center justify-center transition-colors cursor-pointer"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="text-[15px] font-extrabold text-[#ffffff] min-w-[20px] text-center">
            {quantity}
          </span>
          <button
            onClick={handleIncrement}
            className="w-6 h-6 rounded-lg bg-[#7059fd] hover:bg-[#5d44fa] text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Add to List / Cart Button */}
        <button
          onClick={handleAdd}
          className={`flex-1 py-3.5 rounded-2xl text-[14px] font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_4px_16px_rgba(112,89,253,0.35)] active:scale-95 ${
            justAdded
              ? 'bg-[#05df72] text-black shadow-[0_0_15px_rgba(5,223,114,0.4)]'
              : 'bg-[#7059fd] hover:bg-[#5d44fa] text-white'
          }`}
        >
          {justAdded ? (
            <>
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Added to List!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>Add to List • ${totalPrice}</span>
            </>
          )}
        </button>
      </div>
    </main>
  );
};

