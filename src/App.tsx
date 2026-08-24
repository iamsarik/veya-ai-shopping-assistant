import React, { useState, useEffect, useRef } from 'react';
import { ScreenType, NavTab, Product, ShoppingListItem, VoiceRecognizedItem, ParsedVoiceIntent } from './types';
import { INITIAL_PRODUCTS, INITIAL_SHOPPING_LIST } from './data/products';
import { Header } from './components/Header';
import { BottomNavBar } from './components/BottomNavBar';
import { HomeScreen } from './components/screens/HomeScreen';
import { ListeningScreen } from './components/screens/ListeningScreen';
import { ConfirmationScreen } from './components/screens/ConfirmationScreen';
import { SuccessScreen } from './components/screens/SuccessScreen';
import { ShoppingListScreen } from './components/screens/ShoppingListScreen';
import { VoiceSearchResultsScreen } from './components/screens/VoiceSearchResultsScreen';
import { ProductDetailsScreen } from './components/screens/ProductDetailsScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { AllCategoriesScreen } from './components/screens/AllCategoriesScreen';
import { ScreenSwitcherBanner } from './components/ScreenSwitcherBanner';
import { Wifi, BatteryMedium, SignalHigh, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Navigation & Screen States
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [previousScreen, setPreviousScreen] = useState<ScreenType>('home');
  const [activeNavTab, setActiveNavTab] = useState<NavTab>('home');
  const [isMobileFrame, setIsMobileFrame] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState('English');

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  // Grocery Data States
  const [allProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>(INITIAL_SHOPPING_LIST);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    INITIAL_PRODUCTS.find((p) => p.id === 'whole-milk') || INITIAL_PRODUCTS[0]
  );
  const [lastAddedItem, setLastAddedItem] = useState<ShoppingListItem | null>(null);

  // Voice Interaction States
  const [voiceTranscript, setVoiceTranscript] = useState('Add 2 gallons of whole milk');
  const [voiceQuantity, setVoiceQuantity] = useState<number>(1);
  const [voiceRecognizedItems, setVoiceRecognizedItems] = useState<VoiceRecognizedItem[]>([]);
  const [isListeningMic, setIsListeningMic] = useState(false);
  const [isProcessingVoice, setIsProcessingVoice] = useState(false);
  const [voiceCommandError, setVoiceCommandError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('organic apples under $5');
  const [favoriteProductIds, setFavoriteProductIds] = useState<string[]>(['whole-milk']);
  const speechRecognitionRef = useRef<any>(null);

  // Initialize Speech Recognition if supported in browser
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          setIsListeningMic(true);
        };

        recognition.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0])
            .map((result: any) => result.transcript)
            .join('');
          setVoiceTranscript(transcript);
        };

        recognition.onerror = () => {
          setIsListeningMic(false);
        };

        recognition.onend = () => {
          setIsListeningMic(false);
        };

        speechRecognitionRef.current = recognition;
      } catch (err) {
        console.warn('SpeechRecognition setup error:', err);
      }
    }
  }, []);

  const startVoiceRecording = () => {
    setVoiceTranscript('');
    setVoiceCommandError(null);
    setIsListeningMic(true);
    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.start();
      } catch (e) {
        // Fallback simulation timer if speech api already active
      }
    }
  };

  const stopVoiceRecording = () => {
    setIsListeningMic(false);
    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
      } catch (e) {
        // Safe catch
      }
    }
  };

  // Screen Navigation Helper
  const navigateTo = (screen: ScreenType, navTab?: NavTab) => {
    setPreviousScreen(currentScreen);
    setCurrentScreen(screen);
    if (navTab) {
      setActiveNavTab(navTab);
    } else {
      if (screen === 'home') setActiveNavTab('home');
      else if (screen === 'list') setActiveNavTab('list');
      else if (screen === 'search') setActiveNavTab('search');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back Button Handler
  const handleBack = () => {
    if (currentScreen === 'product_details') {
      navigateTo(previousScreen === 'search' ? 'search' : 'home');
    } else if (currentScreen === 'search') {
      navigateTo('home', 'home');
    } else if (currentScreen === 'list') {
      navigateTo('home', 'home');
    } else if (currentScreen === 'success') {
      navigateTo('home', 'home');
    } else if (currentScreen === 'confirmation') {
      navigateTo('listening');
    } else if (currentScreen === 'listening') {
      stopVoiceRecording();
      setVoiceCommandError(null);
      navigateTo(previousScreen || 'home');
    } else if (currentScreen === 'categories') {
      navigateTo('home', 'home');
    } else {
      navigateTo('home', 'home');
    }
  };

  // Bottom Navigation Tab Change Handler
  const handleTabChange = (tab: NavTab) => {
    setActiveNavTab(tab);
    if (tab === 'home') {
      navigateTo('home', 'home');
    } else if (tab === 'search') {
      setSearchQuery('organic apples under $5');
      navigateTo('search', 'search');
    } else if (tab === 'list') {
      navigateTo('list', 'list');
    } else if (tab === 'profile') {
      navigateTo('home', 'profile');
    }
  };

  // Mic Button Click Handler (Single interactive control for starting & stopping voice recording)
  const handleMicClick = () => {
    if (isListeningMic) {
      stopVoiceRecording();
    } else {
      if (currentScreen !== 'listening') {
        navigateTo('listening');
      }
      startVoiceRecording();
    }
  };

  // Helper functions for Voice Command Processing
  const extractQuantityAndUnit = (segment: string): { quantity: number; unit?: string } => {
    const lower = segment.toLowerCase();

    const wordToNum: Record<string, number> = {
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
      ten: 10,
      eleven: 11,
      twelve: 12,
      thirteen: 13,
      fourteen: 14,
      fifteen: 15,
      sixteen: 16,
      seventeen: 17,
      eighteen: 18,
      nineteen: 19,
      twenty: 20,
    };

    const knownUnits = [
      'gallons', 'gallon',
      'bottles', 'bottle',
      'loaves', 'loaf',
      'packets', 'packet', 'packs', 'pack',
      'boxes', 'box',
      'pieces', 'piece',
      'pairs', 'pair',
      'sets', 'set',
      'units', 'unit',
      'kg', 'lbs', 'lb', 'oz', 'liters', 'liter'
    ];

    let quantity = 1;
    let detectedUnit: string | undefined = undefined;

    // 1. Check for digits first e.g. "10 apples", "2 gallons of milk"
    const digitMatch = lower.match(/\b(\d+)\b/);
    if (digitMatch) {
      const val = parseInt(digitMatch[1], 10);
      if (!isNaN(val) && val > 0 && val < 1000) {
        quantity = val;
      }
    } else {
      // 2. Check for written numbers e.g. "two gallons of milk", "twelve bananas"
      const words = lower.split(/\s+/);
      for (const word of words) {
        const clean = word.replace(/[^a-z]/g, '');
        if (wordToNum[clean] !== undefined) {
          quantity = wordToNum[clean];
          break;
        }
      }
    }

    // Check for unit
    const words = lower.split(/\s+/);
    for (const u of knownUnits) {
      if (words.includes(u)) {
        detectedUnit = u;
        break;
      }
    }

    return { quantity, unit: detectedUnit };
  };

  const extractQuantity = (command: string): number | null => {
    return extractQuantityAndUnit(command).quantity;
  };

  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const toSingular = (word: string): string => {
    const w = word.toLowerCase();
    if (w.endsWith('ies') && w.length > 4) return w.slice(0, -3) + 'y';
    if (w.endsWith('glasses')) return 'glass';
    if (w.endsWith('dresses')) return 'dress';
    if (w.endsWith('es') && w.length > 4 && (w.endsWith('shes') || w.endsWith('ches') || w.endsWith('boxes'))) {
      return w.slice(0, -2);
    }
    if (w.endsWith('s') && !w.endsWith('ss') && !w.endsWith('is') && w.length > 3) {
      return w.slice(0, -1);
    }
    return w;
  };

  const VOICE_STOP_WORDS = new Set([
    'add', 'buy', 'get', 'please', 'put', 'need', 'want',
    'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty',
    'a', 'an', 'some', 'gallons', 'gallon', 'bottle', 'bottles', 'pack', 'packs', 'loaves', 'loaf',
    'box', 'boxes', 'piece', 'pieces', 'set', 'sets', 'unit', 'units', 'pair', 'pairs',
    'of', 'to', 'the', 'my', 'list', 'shopping', 'can', 'cans', 'item', 'items', 'and', 'with', 'plus',
    ...Array.from({ length: 100 }, (_, i) => String(i + 1))
  ]);

  const isTokenMatch = (qTok: string, pTok: string): boolean => {
    const qSingular = toSingular(qTok);
    const pSingular = toSingular(pTok);
    return qSingular === pSingular;
  };

  const MIN_MATCH_CONFIDENCE = 25;

  const findBestProductMatch = (command: string, products: Product[]): Product | null => {
    const normCmd = normalizeText(command);
    const cmdWords = normCmd.split(' ').map(toSingular);
    const queryTokens = cmdWords.filter(
      (w) => w.length > 0 && !VOICE_STOP_WORDS.has(w) && !/^\d+$/.test(w)
    );

    const effectiveTokens = queryTokens.length > 0 ? queryTokens : cmdWords.filter((w) => w.length > 0 && !/^\d+$/.test(w));

    let bestProduct: Product | null = null;
    let maxScore = -1;

    for (const p of products) {
      const normName = normalizeText(p.name);
      const pNameTokens = normName.split(' ').map(toSingular);
      const tagTokens = (p.tags ?? []).flatMap((t) => normalizeText(t).split(' ').map(toSingular));
      const subcatTokens = normalizeText(p.subcategory ?? '').split(' ').map(toSingular);
      const brandTokens = normalizeText(p.brand ?? '').split(' ').map(toSingular);

      const allProductTokens = Array.from(new Set([...pNameTokens, ...tagTokens, ...subcatTokens, ...brandTokens]));

      let score = 0;
      const joinedQuery = effectiveTokens.join(' ');

      if (joinedQuery && normName.includes(joinedQuery)) {
        score += 100;
      }

      let matchedCount = 0;
      for (const qTok of effectiveTokens) {
        if (allProductTokens.some((pt) => isTokenMatch(qTok, pt))) {
          matchedCount++;
        }
      }

      if (effectiveTokens.length > 0) {
        const matchRatio = matchedCount / effectiveTokens.length;
        score += matchRatio * 50;
      }

      const pIdNormalized = p.id.toLowerCase().replace(/-/g, ' ');
      if (pIdNormalized.length > 3 && normCmd.includes(pIdNormalized)) {
        score += 150;
      }

      if (score > maxScore && matchedCount > 0) {
        maxScore = score;
        bestProduct = p;
      }
    }

    if (maxScore < MIN_MATCH_CONFIDENCE) {
      return null;
    }

    return bestProduct;
  };

  const splitVoiceCommand = (command: string): string[] => {
    let cleaned = command.toLowerCase().trim();

    // Strip initial action prefixes
    cleaned = cleaned.replace(/^(?:i\s+need|please\s+add|can\s+you\s+add|add|buy|get|put)\s+/i, '').trim();

    // Split by " and ", ", and ", ", ", " plus ", " & "
    const rawSegments = cleaned.split(/\s*(?:,\s*and\s+|\s+and\s+|,\s*|\s+&+\s+|\s+plus\s+)\s*/i);

    const segments = rawSegments
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    return segments.length > 0 ? segments : [command];
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // resolveProductFromHint
  // Maps a Gemini-produced product hint string to a Product in the catalog.
  // This is NOT the old fuzzy parser — it is a safe, deterministic resolver
  // intended for clean, catalog-anchored hint strings returned by Gemini.
  // ─────────────────────────────────────────────────────────────────────────────
  const resolveProductFromHint = (hint: string, products: Product[]): Product | null => {
    if (!hint || hint.trim().length < 2) return null;

    const norm = (s: string) =>
      s.toLowerCase().replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, ' ').trim();

    const normHint = norm(hint);
    if (normHint.length === 0) return null;

    // 1. Exact normalized name match
    const exact = products.find(p => norm(p.name) === normHint);
    if (exact) return exact;

    // 2. Exact product ID slug match
    const idMatch = products.find(p => p.id.replace(/-/g, ' ') === normHint);
    if (idMatch) return idMatch;

    // 3. Product name contains the hint (e.g. hint="white bread", name="Classic White Bread")
    const forwardContains = products.find(p => norm(p.name).includes(normHint));
    if (forwardContains) return forwardContains;

    // 4. Hint contains the product name (e.g. hint="classic white bread loaf", name="Classic White Bread")
    const reverseContains = products.find(p => normHint.includes(norm(p.name)));
    if (reverseContains) return reverseContains;

    // 5. Token overlap — requires >50% of product name tokens to appear in the hint.
    //    Safe threshold since Gemini is grounded in the real catalog.
    const hintTokens = new Set(normHint.split(' ').filter(t => t.length > 2));
    let bestProduct: Product | null = null;
    let bestScore = 0;

    for (const p of products) {
      const nameTokens = norm(p.name).split(' ').filter(t => t.length > 2);
      if (nameTokens.length === 0) continue;
      const matched = nameTokens.filter(t => hintTokens.has(t)).length;
      const score = matched / nameTokens.length;
      if (score > 0.5 && score > bestScore) {
        bestScore = score;
        bestProduct = p;
      }
    }

    return bestProduct;
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // handleProcessVoiceCommand — Phase 3 Gemini NLP pipeline
  //
  // Flow: transcript → POST /api/parse-voice-command → Gemini structured intent
  //       → resolveProductFromHint (deterministic catalog lookup)
  //       → VoiceRecognizedItem[] → existing ConfirmationScreen
  //
  // On failure: surfaces a clear error message in the ListeningScreen.
  // NO silent fallback to the old local fuzzy parser.
  // ─────────────────────────────────────────────────────────────────────────────
  const handleProcessVoiceCommand = async (command: string): Promise<void> => {
    stopVoiceRecording();
    setVoiceTranscript(command);
    setVoiceCommandError(null);
    setIsProcessingVoice(true);

    // Ensure user stays on the listening screen during processing
    if (currentScreen !== 'listening') {
      navigateTo('listening');
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 s timeout

      const response = await fetch('/api/parse-voice-command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: command }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errData = await response.json().catch(() => ({ error: `Server error ${response.status}` }));
        throw new Error(errData.error ?? `Server returned ${response.status}`);
      }

      const parsed: ParsedVoiceIntent = await response.json();

      // Route based on Gemini-extracted intent
      switch (parsed.intent) {
        case 'SEARCH': {
          setSearchQuery(parsed.searchQuery ?? command);
          navigateTo('search', 'search');
          break;
        }

        case 'SHOW_LIST': {
          navigateTo('list', 'list');
          break;
        }

        case 'REMOVE': {
          const target = (parsed.removeTarget ?? '').toLowerCase().trim();
          if (target) {
            setShoppingList(prev =>
              prev.filter(item => !item.product.name.toLowerCase().includes(target))
            );
            showToast(`Removed "${parsed.removeTarget}" from list`);
          } else {
            showToast('Removed last item from list');
            setShoppingList(prev => prev.slice(0, -1));
          }
          navigateTo('list', 'list');
          break;
        }

        case 'ADD': {
          if (parsed.items.length === 0) {
            setVoiceCommandError('No products were found in your command. Please try again.');
            break;
          }

          const recognizedItems: VoiceRecognizedItem[] = parsed.items.map((item, i) => ({
            id: `rec-item-${i}-${Date.now()}`,
            rawText: item.rawText || command,
            product: item.product,
            quantity: item.quantity,
            unit: item.unit,
          }));

          setVoiceRecognizedItems(recognizedItems);
          const firstFound = recognizedItems.find(i => i.product !== null);
          setSelectedProduct(firstFound?.product ?? null);
          setVoiceQuantity(firstFound?.quantity ?? 1);
          navigateTo('confirmation');
          break;
        }

        default: {
          // UNKNOWN intent
          setVoiceCommandError(
            'I didn\'t understand that command. Try saying something like "Add milk", "Find toothpaste", or "Show my list".'
          );
          break;
        }
      }
    } catch (err: any) {
      const isAbort = err?.name === 'AbortError';
      setVoiceCommandError(
        isAbort
          ? 'Request timed out. Please check your connection and try again.'
          : `Could not process your command: ${err?.message ?? 'Unknown error. Please try again.'}`
      );
    } finally {
      setIsProcessingVoice(false);
    }
  };


  const handleAddMultipleToList = (items: { product: Product; quantity: number }[]) => {
    if (items.length === 0) return;

    items.forEach(({ product, quantity }) => {
      handleAddToList(product, quantity);
    });
  };

  // Add Item to Shopping List
  const handleAddToList = (product: Product, quantity: number = 1) => {
    let newItem: ShoppingListItem;

    setShoppingList((prev) => {
      const existingIndex = prev.findIndex((item) => item.productId === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        newItem = updated[existingIndex];
        return updated;
      }
      newItem = {
        id: `item-${Date.now()}`,
        productId: product.id,
        product,
        quantity,
        addedAt: Date.now(),
        checked: false,
      };
      return [...prev, newItem];
    });

    setLastAddedItem({
      id: `item-${Date.now()}`,
      productId: product.id,
      product,
      quantity,
      addedAt: Date.now(),
      checked: false,
    });

    showToast(`Added ${quantity}x ${product.name} to list`);
    navigateTo('success');
  };

  // Quantity Stepper in List
  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    setShoppingList((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleToggleChecked = (itemId: string) => {
    setShoppingList((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setShoppingList((prev) => prev.filter((item) => item.id !== itemId));
    showToast('Item removed from list');
  };

  // Category filter
  const handleSelectCategory = (categoryName: string) => {
    setSearchQuery(categoryName);
    navigateTo('search', 'search');
  };

  // Product Selection (Opens Product Details)
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    navigateTo('product_details');
  };

  // Toggle favorite
  const handleToggleFavorite = (productId: string) => {
    setFavoriteProductIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
    showToast(
      favoriteProductIds.includes(productId)
        ? 'Removed from saved favorites'
        : 'Added to saved favorites'
    );
  };

  // Search Results products — covers all 21 categories
  const searchResultProducts = allProducts.filter((p) => {
    const q = searchQuery.toLowerCase();
    const nameL = p.name.toLowerCase();
    const catL = p.category.toLowerCase();
    const brandL = (p.brand ?? '').toLowerCase();
    const tagsL = (p.tags ?? []).map((t) => t.toLowerCase());
    const subcatL = (p.subcategory ?? '').toLowerCase();

    const matchesAny = (...terms: string[]) =>
      terms.some((t) => nameL.includes(t) || brandL.includes(t) || tagsL.some((tag) => tag.includes(t)) || subcatL.includes(t));

    // ── Grocery ──────────────────────────────────────────────────────
    if (q.includes('apple')) return matchesAny('apple');
    if (q.includes('milk') || q.includes('dairy')) return p.category === 'Dairy';
    if (q.includes('produce')) return p.category === 'Fruits' || p.category === 'Vegetables';
    if (q.includes('fruit')) return p.category === 'Fruits';
    if (q.includes('bread') || q.includes('bakery')) return p.category === 'Bakery';
    if (q.includes('snack')) return p.category === 'Snacks';
    if (q.includes('banana')) return matchesAny('banana');
    if (q.includes('orange')) return matchesAny('orange', 'oranges');
    if (q.includes('mango')) return matchesAny('mango', 'mangoes');
    if (q.includes('grape')) return matchesAny('grape', 'grapes');
    if (q.includes('watermelon')) return matchesAny('watermelon');
    if (q.includes('vegetable')) return p.category === 'Vegetables';
    if (q.includes('tomato')) return matchesAny('tomato', 'tomatoes');
    if (q.includes('potato')) return matchesAny('potato', 'potatoes');
    if (q.includes('onion')) return matchesAny('onion', 'onions');
    if (q.includes('carrot')) return matchesAny('carrot', 'carrots');
    if (q.includes('spinach')) return matchesAny('spinach');
    if (q.includes('broccoli')) return matchesAny('broccoli');
    if (q.includes('butter')) return matchesAny('butter');
    if (q.includes('cheese')) return matchesAny('cheese');
    if (q.includes('yogurt') || q.includes('yoghurt')) return matchesAny('yogurt', 'yoghurt');
    if (q.includes('cream')) return matchesAny('cream');
    if (q.includes('croissant')) return matchesAny('croissant');
    if (q.includes('muffin')) return matchesAny('muffin');
    if (q.includes('cookie')) return matchesAny('cookie', 'cookies');
    if (q.includes('biscuit')) return matchesAny('biscuit', 'biscuits');
    if (q.includes('cracker')) return matchesAny('cracker', 'crackers');
    if (q.includes('chip') || q.includes('chips') || q.includes('crisps')) return matchesAny('chip', 'chips', 'crisps', 'nacho');
    if (q.includes('popcorn')) return matchesAny('popcorn');
    if (q.includes('chocolate')) return matchesAny('chocolate');
    // ── Beverages ────────────────────────────────────────────────────
    if (q.includes('beverage') || q.includes('drink')) return p.category === 'Beverages';
    if (q.includes('cola') || q.includes('coca-cola') || q.includes('coke')) return matchesAny('coca-cola', 'coke', 'cola');
    if (q.includes('pepsi')) return matchesAny('pepsi');
    if (q.includes('sprite')) return matchesAny('sprite');
    if (q.includes('bottled water') || q.includes('water 12-pack') || q.includes('water pack')) return p.category === 'Beverages' && matchesAny('bottled water', 'water');
    if (q.includes('juice')) return matchesAny('juice');
    if (q.includes('iced tea') || q.includes('ice tea')) return matchesAny('iced tea');
    if (q.includes('energy drink') || q.includes('red bull')) return matchesAny('energy drink', 'red bull');
    // ── Ice Cream ────────────────────────────────────────────────────
    if (q.includes('ice cream') || q.includes('icecream')) return p.category === 'Ice Cream';
    if (q.includes('vanilla ice') || q.includes('vanilla')) return matchesAny('vanilla');
    if (q.includes('chocolate ice') || q.includes('choc ice')) return matchesAny('chocolate') && p.category === 'Ice Cream';
    if (q.includes('strawberry ice')) return matchesAny('strawberry') && p.category === 'Ice Cream';
    if (q.includes('butterscotch')) return matchesAny('butterscotch');
    // ── Stationary ───────────────────────────────────────────────────
    if (q.includes('stationery') || q.includes('stationary')) return p.category === 'Stationary';
    if (q.includes('pen') && !q.includes('pencil')) return matchesAny('pen', 'ball pen', 'gel pen', 'marker');
    if (q.includes('pencil')) return matchesAny('pencil');
    if (q.includes('notebook') || q.includes('note book')) return matchesAny('notebook', 'note', 'diary');
    if (q.includes('highlighter')) return matchesAny('highlighter');
    if (q.includes('marker')) return matchesAny('marker');
    if (q.includes('sticky note') || q.includes('post-it')) return matchesAny('sticky notes', 'post-it');
    if (q.includes('stapler')) return matchesAny('stapler');
    if (q.includes('eraser')) return matchesAny('eraser');
    if (q.includes('ruler')) return matchesAny('ruler');
    // ── Audio ────────────────────────────────────────────────────────
    if (q.includes('audio') || q.includes('headphone') || q.includes('earphone') || q.includes('speaker')) return p.category === 'Audio';
    if (q.includes('wireless earbud') || q.includes('tws') || q.includes('bluetooth earbud')) return matchesAny('wireless', 'tws', 'bluetooth') && p.category === 'Audio';
    if (q.includes('wired earbud') || q.includes('wired earphone')) return matchesAny('wired') && p.category === 'Audio';
    if (q.includes('gaming headset')) return matchesAny('gaming', 'headset');
    if (q.includes('bluetooth speaker') || q.includes('portable speaker')) return matchesAny('speaker', 'jbl');
    // ── Mobile Accessories ───────────────────────────────────────────
    if (q.includes('mobile accessor') || q.includes('phone accessor') || q.includes('mobile accessories')) return p.category === 'Mobile Accessories';
    if (q.includes('usb-c charger') || q.includes('usb c charger') || q.includes('fast charger')) return p.category === 'Mobile Accessories';
    if (q.includes('charging cable') || q.includes('charger cable') || q.includes('lightning cable') || q.includes('micro-usb')) return p.category === 'Mobile Accessories';
    if (q.includes('lightning-to-usb')) return p.category === 'Mobile Accessories';

    // ── Mobile Phones ────────────────────────────────────────────────
    if (q.includes('mobile phone') || q.includes('smartphone') || ((q.includes('mobile') || q.includes('phone')) && !q.includes('accessor') && !q.includes('charger') && !q.includes('case') && !q.includes('cable'))) return p.category === 'Mobile Phones';
    if (q.includes('iphone') || q.includes('apple phone')) return matchesAny('iphone', 'apple') && p.category === 'Mobile Phones';
    if (q.includes('samsung')) return matchesAny('samsung', 'galaxy') && p.category === 'Mobile Phones';
    if (q.includes('xiaomi') || q.includes('redmi')) return matchesAny('xiaomi', 'redmi') && p.category === 'Mobile Phones';
    if (q.includes('oneplus') || q.includes('one plus')) return matchesAny('oneplus') && p.category === 'Mobile Phones';
    if (q.includes('oppo')) return matchesAny('oppo') && p.category === 'Mobile Phones';
    // ── Laptops ──────────────────────────────────────────────────────
    if (q.includes('laptop') && !q.includes('charger') && !q.includes('adapter')) return p.category === 'Laptops' && p.subcategory !== 'Accessories';
    if (q.includes('laptop charger')) return matchesAny('laptop charger') || (p.category === 'Laptops' && p.subcategory === 'Accessories');
    if (q.includes('macbook') || q.includes('mac book')) return matchesAny('macbook');
    if (q.includes('dell')) return matchesAny('dell');
    if (q.includes('hp laptop') || q.includes('hp pavilion')) return matchesAny('hp', 'pavilion') && p.category === 'Laptops';
    if (q.includes('lenovo')) return matchesAny('lenovo', 'thinkpad');
    if (q.includes('asus laptop') || q.includes('asus vivobook')) return matchesAny('asus', 'vivobook') && p.category === 'Laptops';
    if (q.includes('usb-c adapter') || q.includes('usb c adapter') || q.includes('usb hub')) return matchesAny('adapter', 'hub');
    // (Grooming category removed)
    // ── Clothing ─────────────────────────────────────────────────────
    if (q.includes("women's clothing") || q.includes('womens clothing') || q.includes("women's wear")) return p.category === "Women's Clothing";
    if (q.includes("kids' clothing") || q.includes('kids clothing') || q.includes('children clothing')) return p.category === "Kids' Clothing";
    if (q.includes("men's clothing") || q.includes("mens clothing") || q.includes("men's wear")) return p.category === "Men's Clothing";
    if (q.includes("women's winter jacket") || q.includes('womens winter jacket') || (q.includes('women') && q.includes('jacket'))) {
      return (p.category === "Women's Clothing" && matchesAny('jacket', 'winter jacket'));
    }
    if (q.includes("men's winter jacket") || q.includes('mens winter jacket') || (q.includes('men') && !q.includes('women') && q.includes('jacket'))) {
      return (p.category === "Men's Clothing" && matchesAny('jacket', 'winter jacket', 'puffer'));
    }
    if (q.includes('hoodie') && (q.includes('women') || q.includes('female') || q.includes('girl'))) return p.category === "Women's Clothing" && matchesAny('hoodie');
    if (q.includes('hoodie') && ((q.includes('men') && !q.includes('women')) || q.includes('male'))) return p.category === "Men's Clothing" && matchesAny('hoodie');
    if (q.includes('hoodie')) return matchesAny('hoodie');
    if (q.includes('jacket')) return matchesAny('jacket');
    if (q.includes('sweater')) return matchesAny('sweater');
    if (q.includes('t-shirt') || q.includes('tshirt')) return matchesAny('t-shirt', 'tshirt');
    // ── Cosmetics ────────────────────────────────────────────────────
    if (q.includes('cosmetic') || q.includes('personal care') || q.includes('skin care') || q.includes('hair care')) return p.category === 'Cosmetics';
    if (q.includes('shampoo')) return matchesAny('shampoo');
    if (q.includes('conditioner')) return matchesAny('conditioner');
    if (q.includes('face wash') || q.includes('facewash')) return matchesAny('face wash');
    if (q.includes('moisturiser') || q.includes('moisturizer')) return matchesAny('moisturiser', 'moisturizer');
    if (q.includes('sunscreen') || q.includes('sun screen') || q.includes('spf')) return matchesAny('sunscreen', 'spf');
    if (q.includes('lip balm')) return matchesAny('lip balm');
    if (q.includes('body lotion') || q.includes('lotion')) return matchesAny('lotion');
    if (q.includes('soap')) return matchesAny('soap');
    if (q.includes('toothpaste')) return matchesAny('toothpaste');
    if (q.includes('deodorant')) return matchesAny('deodorant');
    // ── Tiffins and Water Bottles ────────────────────────────────────
    if (q.includes('tiffins and water bottles') || q.includes('tiffin and water bottle')) return p.category === 'Tiffins and Water Bottles';
    if (q.includes('tiffin') || q.includes('lunch box') || q.includes('lunchbox')) return p.category === 'Tiffins and Water Bottles';
    if (q.includes('water bottle') || q.includes('waterbottle') || q.includes('flask')) return p.category === 'Tiffins and Water Bottles';
    if (q.includes('insulated bottle') || q.includes('thermos')) return matchesAny('insulated', 'thermos');
    if (q.includes('transparent bottle') || q.includes('clear bottle')) return matchesAny('transparent bottle', 'clear bottle');
    if (q.includes('bottle set')) return matchesAny('bottle set');
    // ── Kitchen ──────────────────────────────────────────────────────
    if (q.includes('kitchen') || q.includes('utensil') || q.includes('cookware')) return p.category === 'Kitchen & Utensils';
    if (q.includes('frying pan') || q.includes('fry pan') || q.includes('skillet')) return matchesAny('frying pan', 'skillet', 'cast iron');
    if (q.includes('cooking pan') || q.includes('non-stick') || q.includes('nonstick')) return matchesAny('cooking pan', 'non-stick');
    if (q.includes('mug') || q.includes('coffee mug')) return matchesAny('mug');
    if (q.includes('plate')) return matchesAny('plate');
    if (q.includes('bowl')) return matchesAny('bowl');
    if (q.includes('container') || q.includes('storage')) return matchesAny('container', 'storage');
    // ── Electrical ───────────────────────────────────────────────────
    if (q.includes('electrical') || q.includes('electric appliance')) return p.category === 'Electrical';
    if (q.includes('kettle') || q.includes('electric kettle')) return matchesAny('kettle');
    if (q.includes('table lamp') || q.includes('desk lamp') || q.includes('lamp')) return matchesAny('lamp');
    if (q.includes('led bulb') || q.includes('bulb')) return matchesAny('bulb', 'led bulb');
    if (q.includes('extension') || q.includes('power strip')) return matchesAny('extension', 'power strip');
    if (q.includes('iron') && !q.includes('cast iron') && !q.includes('clothing iron')) return matchesAny('steam iron', 'iron') && p.category === 'Electrical';
    // (mini-fan removed from catalog)
    if (q.includes('heater') || q.includes('electric heater')) return matchesAny('heater', 'electric heater');
    // ── Healthcare and Pharmacy ──────────────────────────────────────
    if (q.includes('health') || q.includes('pharmacy') || q.includes('medicine') || q.includes('medical') || q.includes('healthcare')) return p.category === 'Healthcare and Pharmacy';
    if (q.includes('paracetamol') || q.includes('acetaminophen') || q.includes('panadol')) return matchesAny('paracetamol', 'panadol', 'acetaminophen');
    if (q.includes('antacid')) return matchesAny('antacid');
    if (q.includes('ors') || q.includes('oral rehydration')) return matchesAny('ors', 'rehydration');
    if (q.includes('bandage') || q.includes('band-aid')) return matchesAny('bandage', 'band-aid');
    if (q.includes('antiseptic')) return matchesAny('antiseptic');
    if (q.includes('thermometer')) return matchesAny('thermometer');
    if (q.includes('cotton ball') || q.includes('cotton')) return matchesAny('cotton');
    if (q.includes('hand sanitizer') || q.includes('sanitizer') || q.includes('sanitiser')) return matchesAny('hand sanitizer', 'sanitizer');
    if (q.includes('first aid kit') || q.includes('first-aid kit')) return matchesAny('first aid kit');
    // ── Generic fallback ─────────────────────────────────────────────
    return nameL.includes(q) || catL.includes(q) || brandL.includes(q) || tagsL.some((tag) => tag.includes(q));
  });

  const totalListCount = shoppingList.reduce((sum, item) => sum + item.quantity, 0);
  const totalListPrice = shoppingList.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#07080f] flex flex-col items-center justify-start text-[#f3f4f8] selection:bg-[#7059fd]/30 selection:text-white font-sans antialiased">
      {/* Top Preview Bar for reviewing all 7 screens */}
      <ScreenSwitcherBanner
        currentScreen={currentScreen}
        onSelectScreen={(screen) => {
          if (screen === 'search') {
            setSearchQuery('organic apples under $5');
          }
          navigateTo(screen);
        }}
        isMobileFrame={isMobileFrame}
        onToggleFrame={() => setIsMobileFrame(!isMobileFrame)}
      />

      {/* Main App Container */}
      <div
        className={`w-full bg-[#0c0d16] flex flex-col relative transition-all duration-300 ${isMobileFrame
            ? 'max-w-[390px] min-h-[844px] my-3 sm:my-6 rounded-[38px] shadow-[0_25px_60px_rgba(0,0,0,0.85)] border-[4px] border-[#22253d] overflow-hidden'
            : 'max-w-[540px] min-h-screen shadow-2xl border-x border-[#1e2136]'
          }`}
      >
        {/* iOS Mobile Status Bar in 390px Frame */}
        {isMobileFrame && (
          <div className="w-full h-8 bg-[#0c0d16] flex items-center justify-between px-6 pt-2 select-none z-30 border-b border-[#161828]">
            <span className="text-[12px] font-bold text-[#f3f4f8] tracking-tight">
              9:41
            </span>
            <div className="w-20 h-4 bg-[#05060a] rounded-full mx-auto -mt-1 border border-[#202338]"></div>
            <div className="flex items-center gap-1.5 text-[#b0b4c8]">
              <SignalHigh className="w-3.5 h-3.5 stroke-[2.2]" />
              <Wifi className="w-3.5 h-3.5 stroke-[2.2]" />
              <BatteryMedium className="w-4 h-4 stroke-[2.2]" />
            </div>
          </div>
        )}

        {/* Clean Minimal Header */}
        <Header
          onBack={handleBack}
          showBack={currentScreen !== 'home'}
          currentLanguage={currentLanguage}
          onHomeClick={() => navigateTo('home', 'home')}
          onLanguageChange={(lang) => setCurrentLanguage(lang)}
        />

        {/* Screen Content Router */}
        <div className="flex-1 flex flex-col relative">
          {/* Screen 1: Home */}
          {currentScreen === 'home' && activeNavTab !== 'profile' && (
            <HomeScreen
              onStartListening={() => {
                navigateTo('listening');
                startVoiceRecording();
              }}
              onSearchFocus={() => navigateTo('search', 'search')}
              onSelectPrompt={(prompt) => handleProcessVoiceCommand(prompt)}
              onSelectProduct={handleSelectProduct}
              onAddProduct={(p) => handleAddToList(p, 1)}
              onSelectCategory={handleSelectCategory}
              onSeeAllCategories={() => navigateTo('categories')}
              featuredProducts={allProducts}
              shoppingList={shoppingList}
            />
          )}

          {/* Screen: All Categories (See all) */}
          {currentScreen === 'categories' && (
            <AllCategoriesScreen
              onSelectCategory={handleSelectCategory}
            />
          )}

          {/* Profile Tab */}
          {activeNavTab === 'profile' && currentScreen === 'home' && (
            <ProfileScreen
              onStartVoice={() => {
                navigateTo('listening');
                startVoiceRecording();
              }}
            />
          )}

          {/* Screen 2: Voice Assistant / Listening */}
          {currentScreen === 'listening' && (
            <ListeningScreen
              transcript={voiceTranscript}
              isListening={isListeningMic}
              onStopListening={stopVoiceRecording}
              onSubmitCommand={handleProcessVoiceCommand}
              onCancel={() => {
                stopVoiceRecording();
                setVoiceCommandError(null);
                navigateTo(previousScreen || 'home');
              }}
              isProcessing={isProcessingVoice}
              errorMessage={voiceCommandError}
              onClearError={() => setVoiceCommandError(null)}
            />
          )}

          {/* Screen 3: Voice Command Confirmation */}
          {currentScreen === 'confirmation' && (
            <ConfirmationScreen
              transcript={voiceTranscript}
              matchedProduct={selectedProduct}
              initialQuantity={voiceQuantity}
              recognizedItems={voiceRecognizedItems}
              onConfirm={(prod, qty) => {
                handleAddToList(prod, qty);
              }}
              onConfirmMultiple={(items) => {
                handleAddMultipleToList(items);
              }}
              onCancel={() => navigateTo('listening')}
            />
          )}

          {/* Screen 4: Voice Command Success */}
          {currentScreen === 'success' && (
            <SuccessScreen
              lastAddedItem={lastAddedItem}
              totalListCount={totalListCount}
              totalListPrice={totalListPrice}
              onViewList={() => navigateTo('list', 'list')}
              onSpeakAgain={() => {
                navigateTo('listening');
                startVoiceRecording();
              }}
              onGoHome={() => navigateTo('home', 'home')}
            />
          )}

          {/* Screen 5: Shopping List */}
          {currentScreen === 'list' && (
            <ShoppingListScreen
              items={shoppingList}
              onUpdateQuantity={handleUpdateQuantity}
              onToggleChecked={handleToggleChecked}
              onRemoveItem={handleRemoveItem}
              onStartListening={() => {
                navigateTo('listening');
                startVoiceRecording();
              }}
              onBrowseProducts={() => navigateTo('home', 'home')}
              onCheckout={() => {
                showToast('Order submitted! Delivery arriving in 30 mins.');
              }}
            />
          )}

          {/* Screen 6: Voice Search Results */}
          {currentScreen === 'search' && (
            <VoiceSearchResultsScreen
              query={searchQuery}
              results={searchResultProducts}
              onSelectProduct={handleSelectProduct}
              onAddProduct={(p) => handleAddToList(p, 1)}
              onStartVoiceSearch={() => {
                navigateTo('listening');
                startVoiceRecording();
              }}
              onSearchChange={(newQuery) => setSearchQuery(newQuery)}
              addedProductIds={shoppingList.map((item) => item.productId)}
            />
          )}

          {/* Screen 7: Product Details */}
          {currentScreen === 'product_details' && (
            <ProductDetailsScreen
              product={selectedProduct}
              onAddToCart={(prod, qty) => handleAddToList(prod, qty)}
              onStartVoiceWithProduct={(name) => {
                setVoiceTranscript(`Tell me about ${name}`);
                navigateTo('listening');
              }}
              isFavorite={favoriteProductIds.includes(selectedProduct.id)}
              onToggleFavorite={() => handleToggleFavorite(selectedProduct.id)}
            />
          )}
        </div>

        {/* Global Toast Notification */}
        {toastMessage && (
          <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#16192b]/95 backdrop-blur-md border border-[#303554] text-[#f3f4f8] px-4 py-2.5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex items-center gap-2 text-[13px] font-semibold animate-in fade-in slide-in-from-top-3 duration-200">
            <CheckCircle2 className="w-4 h-4 text-[#05df72]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Fixed Bottom Navigation Bar */}
        {currentScreen !== 'success' && (
          <BottomNavBar
            activeTab={activeNavTab}
            onTabChange={handleTabChange}
            onMicClick={handleMicClick}
            isListening={isListeningMic || currentScreen === 'listening'}
            listCount={totalListCount}
          />
        )}
      </div>
    </div>
  );
}
