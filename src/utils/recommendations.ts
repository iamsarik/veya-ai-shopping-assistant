import { Product, ShoppingListItem } from '../types';

/**
 * Lightweight inline Fisher-Yates shuffle helper
 */
const shuffleArray = <T>(array: T[]): T[] => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

/**
 * 1. PERSONALIZED PRODUCT RECOMMENDATIONS
 *
 * Generates suggestions based on current shopping list activity/history.
 * If user has items in list, finds complementary products from represented
 * categories (randomized within each category for variety).
 */
export const getPersonalizedRecommendations = (
  shoppingList: ShoppingListItem[],
  allProducts: Product[],
  limit = 4
): Product[] => {
  const listProductIds = new Set(shoppingList.map((i) => i.product.id));

  if (shoppingList.length > 0) {
    // 1. Collect distinct categories represented in shoppingList in order of recency/addition
    const distinctCategories: string[] = [];
    for (let i = shoppingList.length - 1; i >= 0; i--) {
      const cat = shoppingList[i].product.category;
      if (!distinctCategories.includes(cat)) {
        distinctCategories.push(cat);
      }
    }

    // 2. Build candidate pools per represented category, randomized within each category pool
    const categoryPools: Record<string, Product[]> = {};
    for (const cat of distinctCategories) {
      const unselected = allProducts.filter(
        (p) => p.category === cat && !listProductIds.has(p.id)
      );
      categoryPools[cat] = shuffleArray(unselected);
    }

    // 3. Interleave/Round-Robin pick 1 product from each category pool in turn
    const selected: Product[] = [];
    const selectedIds = new Set<string>();

    let addedInPass = true;
    while (selected.length < limit && addedInPass) {
      addedInPass = false;
      for (const cat of distinctCategories) {
        if (selected.length >= limit) break;
        const pool = categoryPools[cat];
        const nextProd = pool.find((p) => !selectedIds.has(p.id));
        if (nextProd) {
          selected.push(nextProd);
          selectedIds.add(nextProd.id);
          addedInPass = true;
        }
      }
    }

    if (selected.length >= limit) {
      return selected.slice(0, limit);
    }

    // 4. Fallback: fill remaining slots with top unselected catalog products
    const remaining = allProducts.filter(
      (p) => !listProductIds.has(p.id) && !selectedIds.has(p.id)
    );
    return [...selected, ...remaining].slice(0, limit);
  }

  // Default staples when shopping list is empty
  const defaultStapleIds = [
    'whole-milk',
    'cheddar-cheese',
    'greek-yogurt',
    'classic-white-bread',
    'fresh-organic-bananas',
    'crisp-apples',
  ];

  const staples = allProducts.filter((p) => defaultStapleIds.includes(p.id));
  return staples.slice(0, limit);
};

/**
 * 2. SEASONAL RECOMMENDATIONS
 *
 * Recommends seasonal picks based on the current month/season using
 * ONLY actual categories and products that exist in INITIAL_PRODUCTS catalog:
 * - Summer (May-Aug): Fruits, Beverages, Ice Cream, Tiffins and Water Bottles
 * - Autumn/Monsoon (Sep-Nov): Healthcare and Pharmacy, Snacks, Bakery
 * - Winter (Dec-Feb): Men's Clothing, Women's Clothing, Electrical (Heater/Kettle)
 * - Spring (Mar-Apr): Fruits, Vegetables, Cosmetics
 */
export const getSeasonalRecommendations = (
  allProducts: Product[],
  limit = 4
): { title: string; subtitle: string; products: Product[] } => {
  const month = new Date().getMonth(); // 0-indexed (0 = Jan, 11 = Dec)

  let seasonTitle = 'Summer Coolers & Fresh Produce';
  let seasonSubtitle = 'Stay refreshed with seasonal picks';
  let targetCategories: string[] = ['Fruits', 'Beverages', 'Ice Cream', 'Tiffins and Water Bottles'];

  if (month >= 11 || month <= 1) {
    // Winter (Dec, Jan, Feb)
    seasonTitle = 'Winter Comfort & Cozy Essentials';
    seasonSubtitle = 'Warm clothing, electric heaters & pharmacy staples';
    targetCategories = ["Men's Clothing", "Women's Clothing", 'Electrical', 'Healthcare and Pharmacy'];
  } else if (month >= 2 && month <= 3) {
    // Spring (March, April)
    seasonTitle = 'Spring Freshness & Care';
    seasonSubtitle = 'Fresh organic produce & skincare essentials';
    targetCategories = ['Fruits', 'Vegetables', 'Cosmetics', 'Dairy'];
  } else if (month >= 8 && month <= 10) {
    // Autumn / Monsoon (Sep, Oct, Nov)
    seasonTitle = 'Autumn Staples & Quick Snacks';
    seasonSubtitle = 'Bakery goods, warm beverages & healthcare';
    targetCategories = ['Bakery', 'Snacks', 'Healthcare and Pharmacy', 'Beverages'];
  }

  const products = allProducts.filter((p) => targetCategories.includes(p.category));

  return {
    title: seasonTitle,
    subtitle: seasonSubtitle,
    products: products.slice(0, limit),
  };
};

/**
 * 3. SUBSTITUTE RECOMMENDATIONS
 *
 * Finds alternative/substitute products from the REAL catalog:
 * - Must belong to the SAME category as the target product.
 * - Excludes the target product itself.
 * - Prefers products with overlapping tags or subcategories.
 * - Always returns valid Product objects.
 */
export const getSubstituteRecommendations = (
  targetProduct: Product,
  allProducts: Product[],
  limit = 3
): Product[] => {
  if (!targetProduct) return [];

  // Filter products in the same category excluding target
  const sameCategoryProducts = allProducts.filter(
    (p) => p.category === targetProduct.category && p.id !== targetProduct.id
  );

  if (sameCategoryProducts.length === 0) {
    // Cross-category fallback if category has only 1 item
    return allProducts
      .filter((p) => p.id !== targetProduct.id)
      .slice(0, limit);
  }

  const targetTags = new Set(targetProduct.tags || []);

  // Score candidates by tag overlap and subcategory match
  const scored = sameCategoryProducts.map((p) => {
    let score = 0;
    if (p.subcategory && p.subcategory === targetProduct.subcategory) {
      score += 10;
    }
    const tags = p.tags || [];
    for (const tag of tags) {
      if (targetTags.has(tag)) score += 2;
    }
    return { product: p, score };
  });

  scored.sort((a, b) => b.score - a.score);

  return scored.map((s) => s.product).slice(0, limit);
};
