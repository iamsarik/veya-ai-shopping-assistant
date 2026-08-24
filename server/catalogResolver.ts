import { INITIAL_PRODUCTS } from '../src/data/products';
import type { Product } from '../src/types';

/**
 * Normalizes a product name for safe comparison.
 * Preserves letters (including Devanagari/Hindi) and numbers.
 */
const normalize = (value: string): string =>
    value
        .toLowerCase()
        .trim()
        .replace(/[^\p{L}\p{N}]+/gu, ' ')
        .replace(/\s+/g, ' ');

/**
 * Explicit aliases only.
 *
 * Includes English and Hindi common product names.
 */
const PRODUCT_ALIASES: Record<string, string> = {
    milk: 'Whole Milk',
    'दूध': 'Whole Milk',
    doodh: 'Whole Milk',
    bread: 'Classic White Bread',
    'ब्रेड': 'Classic White Bread',
    highlighters: 'Neon Highlighter Set',
    highlighter: 'Neon Highlighter Set',
    'टमाटर': 'Fresh Organic Tomatoes',
    'सेब': 'Organic Apples 1kg',
    'केले': 'Fresh Organic Bananas',
    'अंडे': 'Farm Fresh Eggs (12 pcs)',
    'दही': 'Low-Fat Greek Yogurt',
    'चॉकलेट': 'Dark Chocolate Bar 100g',
    'चाय': 'Assam Black Tea Bag Box',
    'पानी': 'Mineral Water 1L',
    'चावल': 'Basmati Rice 5kg',
    'आटा': 'Whole Wheat Atta 5kg',
    'मक्खन': 'Salted Butter 500g',
    'जुराब': 'Cotton Ankle Socks',
    'टूथपेस्ट': 'Sensodyne Toothpaste',
};

/**
 * Resolve a Gemini productHint to an actual catalog Product.
 *
 * Matching strategy:
 * 1. Exact normalized product-name match.
 * 2. Explicit, manually defined alias match.
 * 3. Otherwise return null.
 *
 * There is intentionally NO fuzzy matching.
 */
export const resolveProduct = (productHint: string): Product | null => {
    const normalizedHint = normalize(productHint);

    if (!normalizedHint) {
        return null;
    }

    // 1. Exact normalized product-name match.
    const exactMatch = INITIAL_PRODUCTS.find(
        (product) => normalize(product.name) === normalizedHint
    );

    if (exactMatch) {
        return exactMatch;
    }

    // 2. Explicit alias match.
    const aliasTarget = PRODUCT_ALIASES[normalizedHint];

    if (aliasTarget) {
        const aliasedProduct = INITIAL_PRODUCTS.find(
            (product) => normalize(product.name) === normalize(aliasTarget)
        );

        if (aliasedProduct) {
            return aliasedProduct;
        }
    }

    // 3. Unknown / unsafe match.
    return null;
};