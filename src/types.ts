export type ScreenType =
  | 'home'
  | 'listening'
  | 'confirmation'
  | 'success'
  | 'list'
  | 'search'
  | 'product_details'
  | 'categories';

export type NavTab = 'home' | 'search' | 'mic' | 'list' | 'profile';

export type ProductCategory =
  | 'Dairy'
  | 'Fruits'
  | 'Vegetables'
  | 'Bakery'
  | 'Snacks'
  | 'Beverages'
  | 'Ice Cream'
  | 'Stationary'
  | 'Audio'
  | 'Mobile Phones'
  | 'Mobile Accessories'
  | 'Laptops'
  | "Men's Clothing"
  | "Women's Clothing"
  | "Kids' Clothing"
  | 'Cosmetics'
  | 'Tiffins and Water Bottles'
  | 'Kitchen & Utensils'
  | 'Healthcare and Pharmacy'
  | 'Electrical';

export interface ProductNutrition {
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
  calcium?: string;
  vitaminD?: string;
}

export interface Product {
  id: string;
  name: string;
  brand?: string;
  category: ProductCategory;
  subcategory?: string;
  packageSize: string;
  price: number;
  currency?: string;
  image: string;
  description?: string;
  inStock?: boolean;
  isOrganic?: boolean;
  organic?: boolean;
  tags?: string[];
  unit?: string;
  size?: string;
  stockStatus?: 'in_stock' | 'out_of_stock' | 'low_stock';
  rating?: number;
  reviewsCount?: number;
  nutrition?: ProductNutrition;
}

export interface ShoppingListItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  addedAt: number;
  checked?: boolean;
}

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  icon: string;
  image: string;
  itemCount: number;
}

export interface VoiceRecognizedItem {
  id: string;
  rawText: string;
  product: Product | null;
  quantity: number;
  unit?: string;
}

// Structured intent returned by the Gemini NLP backend (/api/parse-voice-command)
export interface ParsedVoiceIntent {
  intent: 'ADD' | 'REMOVE' | 'SEARCH' | 'SHOW_LIST' | 'UNKNOWN';
  items: Array<{
    rawText: string;
    productHint: string; // Closest product name from catalog (or user's raw words if not found)
    quantity: number;
    unit?: string;
  }>;
  searchQuery?: string;    // Populated for SEARCH intent
  removeTarget?: string;   // Populated for REMOVE intent
}
