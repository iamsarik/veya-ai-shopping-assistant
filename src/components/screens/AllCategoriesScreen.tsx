import React from 'react';
import { CategoryInfo } from '../../types';
import { CATEGORIES } from '../../data/products';

interface AllCategoriesScreenProps {
  onSelectCategory: (categoryName: string) => void;
}

export const AllCategoriesScreen: React.FC<AllCategoriesScreenProps> = ({
  onSelectCategory,
}) => {
  return (
    <main className="flex-1 px-4 pt-3 pb-[100px] flex flex-col gap-4 relative z-10">
      {/* Section header */}
      <section className="pt-1">
        <h2 className="text-[18px] font-extrabold text-[#f3f4f8] tracking-tight leading-snug">
          All Categories
        </h2>
        <p className="text-[13px] text-[#9da3c2] mt-0.5">
          {CATEGORIES.length} categories available
        </p>
      </section>

      {/* Responsive grid — same icon style as the home carousel */}
      <section>
        <div className="grid grid-cols-4 gap-x-2 gap-y-5">
          {CATEGORIES.map((cat: CategoryInfo) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className="flex flex-col items-center gap-1.5 w-full group cursor-pointer active:scale-95 transition-transform"
            >
              {/* Circular image — identical style to home carousel */}
              <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-[#22253c] to-[#323758] border border-[#2b2f4c] shadow-sm group-hover:border-[#7059fd]/60 group-hover:shadow-[0_0_12px_rgba(112,89,253,0.25)] transition-all overflow-hidden flex items-center justify-center">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full rounded-full object-cover group-hover:scale-110 transition-transform duration-300 brightness-95"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Category name — wraps naturally, centered under icon */}
              <span className="text-[11.5px] font-semibold text-[#d4d7e8] group-hover:text-[#8e7aff] transition-colors text-center leading-tight break-words w-full">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
};
