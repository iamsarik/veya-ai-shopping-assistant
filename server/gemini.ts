import { GoogleGenAI } from '@google/genai';
import { INITIAL_PRODUCTS } from '../src/data/products';
import type { ParsedVoiceIntent } from '../src/types';

// ─────────────────────────────────────────────────────────────────────────────
// Build a compact catalog summary at module load time.
// Sent in every Gemini prompt to anchor it to the real product catalog
// and prevent hallucination of non-existent products.
// ─────────────────────────────────────────────────────────────────────────────
const buildCatalogSummary = (): string => {
  const byCategory = new Map<string, string[]>();
  for (const p of INITIAL_PRODUCTS) {
    if (!byCategory.has(p.category)) byCategory.set(p.category, []);
    byCategory.get(p.category)!.push(p.name);
  }
  return Array.from(byCategory.entries())
    .map(([cat, names]) => `${cat}: ${names.join(', ')}`)
    .join('\n');
};

const CATALOG_SUMMARY = buildCatalogSummary();

// ─────────────────────────────────────────────────────────────────────────────
// System prompt — instructs Gemini to produce structured JSON intents
// ─────────────────────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `
You are a voice command parser for Veya, an AI shopping assistant app.
Your only job is to extract structured shopping intents from spoken user commands and return valid JSON.

AVAILABLE PRODUCT CATALOG (use these exact names for productHint whenever a match exists):
${CATALOG_SUMMARY}

OUTPUT FORMAT — return ONLY a single valid JSON object with this exact schema (no markdown, no explanation):
{
  "intent": "ADD" | "REMOVE" | "SEARCH" | "SHOW_LIST" | "UNKNOWN",
  "items": [
    {
      "rawText": "<the segment of the original command referring to this item>",
      "productHint": "<closest product name from the catalog above, or the user's words if not in catalog>",
      "quantity": <integer >= 1, default 1>,
      "unit": "<unit string or null>"
    }
  ],
  "searchQuery": "<search terms string or null>",
  "removeTarget": "<product name to remove string or null>"
}

INTENT RULES:
- "ADD": user wants to add one or more products (add, buy, get, need, want, put, order).
- "REMOVE": user wants to remove/delete a product (remove, delete, take out, drop).
- "SEARCH": user wants to find/browse products (find, search, show me, look for, what's the price of).
- "SHOW_LIST": user wants to see their shopping list (show my list, my list, view list, open list).
- "UNKNOWN": anything that does not clearly match the above.

ITEM RULES:
- "items" is always an array. For ADD: include all products mentioned. For all other intents: items = [].
- "productHint" MUST use the closest exact product name from the catalog when a match exists.
- If a product is NOT in the catalog (e.g., "socks", "shoes", "football"), still include it in items with productHint set to the user's raw words — the downstream resolver will handle the mismatch.
- "quantity" must be an integer >= 1. Convert: "a dozen" = 12, "half a dozen" = 6, "a couple" = 2, "a few" = 3, "a pair" = 2. Default = 1.
- "unit" is the measurement unit spoken (gallon, bottle, loaf, pair, packet, box, kg, etc.), or null if none.
- Do NOT invent or assume products the user did not mention.
- Split compound commands: "add milk and bread" → two items.

EXAMPLES:
Input: "add two gallons of milk and one bread"
Output: {"intent":"ADD","items":[{"rawText":"two gallons of milk","productHint":"Whole Milk","quantity":2,"unit":"gallon"},{"rawText":"one bread","productHint":"Classic White Bread","quantity":1,"unit":null}],"searchQuery":null,"removeTarget":null}

Input: "find toothpaste under 200"
Output: {"intent":"SEARCH","items":[],"searchQuery":"toothpaste under 200","removeTarget":null}

Input: "remove bread from my list"
Output: {"intent":"REMOVE","items":[],"searchQuery":null,"removeTarget":"Classic White Bread"}

Input: "add one pair of socks"
Output: {"intent":"ADD","items":[{"rawText":"one pair of socks","productHint":"socks","quantity":1,"unit":"pair"}],"searchQuery":null,"removeTarget":null}
`.trim();

// ─────────────────────────────────────────────────────────────────────────────
// parseVoiceCommand
// Calls Gemini and returns a validated ParsedVoiceIntent.
// Throws on API error, missing key, or malformed JSON — callers must handle.
// ─────────────────────────────────────────────────────────────────────────────
export const parseVoiceCommand = async (transcript: string): Promise<ParsedVoiceIntent> => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is not set. Please configure it in your .env file.');
  }

  const genai = new GoogleGenAI({ apiKey });

  const response = await genai.models.generateContent({
    model: 'gemini-3.6-flash',
    contents: [
      {
        role: 'user',
        parts: [{ text: `Parse this voice command: "${transcript}"` }],
      },
    ],
    config: {
      systemInstruction: SYSTEM_PROMPT,
      responseMimeType: 'application/json',
      temperature: 0.1, // Low temperature for deterministic, structured output
    },
  });

  const raw = (response.text ?? '').trim();

  if (!raw) {
    throw new Error('Gemini returned an empty response.');
  }

  let parsed: any;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error(`Gemini returned invalid JSON: ${raw.slice(0, 300)}`);
  }

  // ── Validate and normalise intent ────────────────────────────────────────
  const VALID_INTENTS = ['ADD', 'REMOVE', 'SEARCH', 'SHOW_LIST', 'UNKNOWN'] as const;
  const intent = parsed.intent as ParsedVoiceIntent['intent'];
  if (!VALID_INTENTS.includes(intent)) {
    throw new Error(`Gemini returned unrecognised intent: "${intent}"`);
  }

  // ── Normalise items ──────────────────────────────────────────────────────
  const items: ParsedVoiceIntent['items'] = Array.isArray(parsed.items)
    ? parsed.items.map((item: any) => ({
        rawText: String(item.rawText ?? '').trim(),
        productHint: String(item.productHint ?? '').trim(),
        quantity: Math.max(1, Math.round(Number(item.quantity) || 1)),
        unit: item.unit && item.unit !== 'null' ? String(item.unit).trim() : undefined,
      }))
    : [];

  return {
    intent,
    items,
    searchQuery: parsed.searchQuery && parsed.searchQuery !== 'null'
      ? String(parsed.searchQuery).trim()
      : undefined,
    removeTarget: parsed.removeTarget && parsed.removeTarget !== 'null'
      ? String(parsed.removeTarget).trim()
      : undefined,
  };
};
