import { INITIAL_PRODUCTS } from '../src/data/products';
import type { Product } from '../src/types';

/**
 * Normalizes a product name for safe exact comparison.
 * No fuzzy/token-overlap matching is used here.
 */
const normalize = (value: string): string =>
    value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, ' ')
        .replace(/\s+/g, ' ');

/**
 * Explicit aliases only.
 *
 * These are intentionally limited to unambiguous mappings.
 * Do NOT add broad aliases such as "socks" -> "socket".
 */
const PRODUCT_ALIASES: Record<string, string> = {
    milk: 'Whole Milk',
    bread: 'Classic White Bread',
    highlighters: 'Neon Highlighter Set',
    highlighter: 'Neon Highlighter Set',
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