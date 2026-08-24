import { Product } from '../types';

export type SupportedLanguage = 'English' | 'हिन्दी' | 'Hindi';

export const isHindi = (lang?: string): boolean => {
  return lang === 'हिन्दी' || lang === 'Hindi';
};

export const CATEGORY_TRANSLATIONS: Record<string, { en: string; hi: string }> = {
  Dairy: { en: 'Dairy', hi: 'डेयरी' },
  Fruits: { en: 'Fruits', hi: 'फल' },
  Vegetables: { en: 'Vegetables', hi: 'सब्जियां' },
  Bakery: { en: 'Bakery', hi: 'बेकरी' },
  Snacks: { en: 'Snacks', hi: 'स्नैक्स' },
  Beverages: { en: 'Beverages', hi: 'पेय पदार्थ' },
  'Ice Cream': { en: 'Ice Cream', hi: 'आइसक्रीम' },
  Stationary: { en: 'Stationary', hi: 'स्टेशनरी' },
  Audio: { en: 'Audio', hi: 'ऑडियो' },
  'Mobile Phones': { en: 'Mobile Phones', hi: 'मोबाइल फोन' },
  'Mobile Accessories': { en: 'Mobile Accessories', hi: 'मोबाइल एक्सेसरीज' },
  Laptops: { en: 'Laptops', hi: 'लैपटॉप' },
  "Men's Clothing": { en: "Men's Clothing", hi: 'पुरुषों के कपड़े' },
  "Women's Clothing": { en: "Women's Clothing", hi: 'महिलाओं के कपड़े' },
  "Kids' Clothing": { en: "Kids' Clothing", hi: 'बच्चों के कपड़े' },
  Cosmetics: { en: 'Cosmetics', hi: 'सौंदर्य प्रसाधन' },
  'Tiffins and Water Bottles': { en: 'Tiffins and Water Bottles', hi: 'टिफिन और पानी की बोतलें' },
  'Kitchen & Utensils': { en: 'Kitchen & Utensils', hi: 'रसोई और बर्तन' },
  'Healthcare and Pharmacy': { en: 'Healthcare and Pharmacy', hi: 'स्वास्थ्य और दवाएं' },
  Electrical: { en: 'Electrical', hi: 'इलेक्ट्रिकल सामान' },
};

export const PRODUCT_NAME_TRANSLATIONS: Record<string, { name: string; packageSize?: string }> = {
  'whole-milk': { name: 'दूध (Whole Milk)', packageSize: '1 गैलन' },
  'cheddar-cheese': { name: 'चेडर चीज़ (Cheddar Cheese)', packageSize: '200 ग्राम ब्लॉक' },
  'greek-yogurt': { name: 'लो-फैट ग्रीक दही (Greek Yogurt)', packageSize: '32 औंस टब' },
  'fuji-apples': { name: 'जैविक फ़ूजी सेब (Organic Fuji Apples)', packageSize: '1 पाउंड बैग' },
  'gala-apples': { name: 'जैविक गाला सेब (Organic Gala Apples)', packageSize: '1 पाउंड बैग' },
  'red-apples': { name: 'जैविक रेड डिलीशियस सेब (Organic Red Delicious Apples)', packageSize: '1 पाउंड बैग' },
  'apples-bag': { name: 'क्रिस्प ऑर्चर्ड सेब (Crisp Orchard Apples)', packageSize: '5 सेब का बैग' },
  'bananas': { name: 'ताज़े जैविक केले (Organic Bananas)', packageSize: '1 बंच (लगभग 6 केले)' },
  'organic-bananas': { name: 'ताज़े जैविक केले (Organic Bananas)', packageSize: '1 बंच (लगभग 6 केले)' },
  'oranges': { name: 'नेवल संतरे (Navel Oranges)', packageSize: '6 संतरे का बैग' },
  'mangoes': { name: 'अल्फांसो आम (Alphonso Mangoes)', packageSize: '3 आम का पैक' },
  'grapes-red': { name: 'रेड सीडलेस अंगूर (Red Grapes)', packageSize: '500 ग्राम' },
  'watermelon': { name: 'सीडलेस तरबूज (Seedless Watermelon)', packageSize: '4-5 किग्रा' },
  'fresh-avocados': { name: 'हास् एवकाडो (Hass Avocados)', packageSize: '3 का पैक' },
  'tomatoes': { name: 'वाइन-राइपंड टमाटर (Vine Tomatoes)', packageSize: '500 ग्राम' },
  'organic-tomatoes': { name: 'ताज़े जैविक टमाटर (Organic Tomatoes)', packageSize: '1 किग्रा' },
  'potatoes': { name: 'रसेट आलू (Russet Potatoes)', packageSize: '2 किग्रा बैग' },
  'onions': { name: 'ब्राउन प्याज (Brown Onions)', packageSize: '1 किग्रा बैग' },
  'carrots': { name: 'जैविक गाजर (Organic Carrots)', packageSize: '1 पाउंड बैग' },
  'spinach': { name: 'पालक के पत्ते (Baby Spinach)', packageSize: '150 ग्राम बैग' },
  'broccoli': { name: 'ताज़ा ब्रोकोली (Fresh Broccoli)', packageSize: '1 पीस' },
  'artisan-sourdough': { name: 'आर्टिसन सॉर्डो ब्रेड (Sourdough Loaf)', packageSize: '500 ग्राम पाव' },
  'sourdough-bread': { name: 'सॉर्डो ब्रेड (Sourdough Bread)', packageSize: '1 पाव' },
  'white-bread': { name: 'क्लासिक व्हाइट ब्रेड (White Bread)', packageSize: '600 ग्राम पाव' },
  'burger-buns': { name: 'तिल वाले बर्गर बन्स (Burger Buns)', packageSize: '6 का पैक' },
  'dark-chocolate': { name: 'डार्क चॉकलेट बार (Dark Chocolate Bar)', packageSize: '100 ग्राम' },
  'assam-tea': { name: 'असम ब्लैक टी (Assam Black Tea)', packageSize: '100 टी बैग्स' },
  'mineral-water': { name: 'मिनरल वाटर (Mineral Water 1L)', packageSize: '1 लीटर बोतल' },
  'basmati-rice': { name: 'प्रीमियम बासमती चावल (Basmati Rice)', packageSize: '5 किग्रा बैग' },
  'wheat-atta': { name: 'होल व्हीट आटा (Whole Wheat Atta)', packageSize: '5 किग्रा बैग' },
  'white-eggs': { name: 'फार्म फ्रेश सफेद अंडे (Farm Fresh Eggs)', packageSize: '12 पीस' },
  'salted-butter': { name: 'साल्टेड बटर (Salted Butter)', packageSize: '500 ग्राम' },
  'green-apples': { name: 'ताज़े हरे सेब (Fresh Green Apples)', packageSize: '1 किग्रा' },
  'cotton-socks': { name: 'कॉटन सॉक्स (Cotton Ankle Socks)', packageSize: '3 जोड़े' },
  'sensodyne-toothpaste': { name: 'टूथपेस्ट (Sensodyne Toothpaste)', packageSize: '150 ग्राम' },
};

const TERM_REPLACEMENTS: [RegExp, string][] = [
  [/Organic Red Delicious Apples/gi, 'जैविक रेड डिलीशियस सेब (Organic Red Delicious Apples)'],
  [/Organic Fuji Apples/gi, 'जैविक फ़ूजी सेब (Organic Fuji Apples)'],
  [/Organic Gala Apples/gi, 'जैविक गाला सेब (Organic Gala Apples)'],
  [/Crisp Orchard Apples/gi, 'क्रिस्प ऑर्चर्ड सेब (Crisp Orchard Apples)'],
  [/Fresh Organic Bananas/gi, 'ताज़े जैविक केले (Organic Bananas)'],
  [/Ripe Hass Avocados/gi, 'पके हास एवकाडो (Hass Avocados)'],
  [/Vine-Ripened Tomatoes/gi, 'वाइन-राइपंड टमाटर (Vine Tomatoes)'],
  [/Russet Potatoes/gi, 'रसेट आलू (Russet Potatoes)'],
  [/Brown Onions/gi, 'ब्राउन प्याज (Brown Onions)'],
  [/Organic Carrots/gi, 'जैविक गाजर (Organic Carrots)'],
  [/Baby Spinach Leaves/gi, 'पालक के पत्ते (Baby Spinach)'],
  [/Fresh Broccoli/gi, 'ताज़ा ब्रोकोली (Fresh Broccoli)'],
  [/Navel Oranges/gi, 'नेवल संतरे (Navel Oranges)'],
  [/Alphonso Mangoes/gi, 'अल्फांसो आम (Alphonso Mangoes)'],
  [/Red Seedless Grapes/gi, 'रेड सीडलेस अंगूर (Red Grapes)'],
  [/Seedless Watermelon/gi, 'सीडलेस तरबूज (Seedless Watermelon)'],
  [/\bOrganic\b/gi, 'जैविक'],
  [/\bFresh\b/gi, 'ताज़ा'],
  [/\bCrisp\b/gi, 'क्रिस्प'],
  [/\bOrchard\b/gi, 'ऑर्चर्ड'],
  [/\bApples\b/gi, 'सेब'],
  [/\bApple\b/gi, 'सेब'],
  [/\bBananas\b/gi, 'केले'],
  [/\bBanana\b/gi, 'केला'],
  [/\bTomatoes\b/gi, 'टमाटर'],
  [/\bTomato\b/gi, 'टमाटर'],
  [/\bPotatoes\b/gi, 'आलू'],
  [/\bOnions\b/gi, 'प्याज'],
  [/\bCarrots\b/gi, 'गाजर'],
  [/\bSpinach\b/gi, 'पालक'],
  [/\bMangoes\b/gi, 'आम'],
  [/\bOranges\b/gi, 'संतरे'],
  [/\bGrapes\b/gi, 'अंगूर'],
  [/\bWatermelon\b/gi, 'तरबूज'],
  [/\bAvocados\b/gi, 'एवकाडो'],
  [/\bMilk\b/gi, 'दूध'],
  [/\bBread\b/gi, 'ब्रेड'],
  [/\bCheese\b/gi, 'चीज़'],
  [/\bYogurt\b/gi, 'दही'],
  [/\bButter\b/gi, 'मक्खन'],
  [/\bEggs\b/gi, 'अंडे'],
  [/\bJuice\b/gi, 'जूस'],
  [/\bWater\b/gi, 'पानी'],
  [/\bTea\b/gi, 'चाय'],
  [/\bCoffee\b/gi, 'कॉफी'],
  [/\bChocolate\b/gi, 'चॉकलेट'],
  [/\bIce Cream\b/gi, 'आइसक्रीम'],
  [/\bChips\b/gi, 'चिप्स'],
  [/\bSocks\b/gi, 'जुराब'],
  [/\bToothpaste\b/gi, 'टूथपेस्ट'],
];

export const getTranslatedCategory = (category: string, lang?: string): string => {
  if (!isHindi(lang)) return category;
  return CATEGORY_TRANSLATIONS[category]?.hi || category;
};

export const getTranslatedProductName = (product: Product, lang?: string): string => {
  if (!isHindi(lang)) return product.name;
  if (PRODUCT_NAME_TRANSLATIONS[product.id]?.name) {
    return PRODUCT_NAME_TRANSLATIONS[product.id].name;
  }
  let translated = product.name;
  for (const [pattern, replacement] of TERM_REPLACEMENTS) {
    translated = translated.replace(pattern, replacement);
  }
  return translated;
};

export const getTranslatedPackageSize = (product: Product, lang?: string): string => {
  if (!isHindi(lang)) return product.packageSize;
  if (PRODUCT_NAME_TRANSLATIONS[product.id]?.packageSize) {
    return PRODUCT_NAME_TRANSLATIONS[product.id].packageSize;
  }
  let pkg = product.packageSize;
  pkg = pkg
    .replace(/\b1 lb bag\b/gi, '1 पाउंड बैग')
    .replace(/\bBag of 5\b/gi, '5 का बैग')
    .replace(/\bBag of 6\b/gi, '6 का बैग')
    .replace(/\bPack of (\d+)\b/gi, '$1 का पैक')
    .replace(/\bBunch \(approx (\d+)\)\b/gi, '1 बंच (लगभग $1)');
  return pkg;
};

export const TRANSLATIONS = {
  en: {
    // Nav Bar
    navHome: 'Home',
    navSearch: 'Search',
    navVoice: 'Voice',
    navList: 'List',
    navProfile: 'Profile',

    // Header
    headerTitle: 'Veya',
    back: 'Go back',

    // Home Screen
    goodMorning: 'Good morning',
    whatDoYouNeed: 'What do you need today?',
    searchPlaceholder: 'Search products...',
    voiceAi: 'VOICE AI',
    speakToVeya: 'Speak to Veya',
    voiceSubtext: '“Your shopping, just say it.”',
    tryPromptLabel: 'Try:',
    tryPromptText: '“Add 2 gallons of whole milk”',
    categories: 'Categories',
    seeAll: 'See all',
    runningLow: 'You may be running low',
    basedOnHistory: 'Based on history',
    add: 'Add',
    smartSuggestions: 'Smart Suggestions for You',
    personalized: 'Personalized',
    seasonalTitle: 'Summer Refreshers',
    seasonalSubtitle: 'Handpicked seasonal picks for warm days',

    // Listening Screen
    veyaVoiceAssistant: 'Veya Voice Assistant',
    listeningStatus: 'Listening...',
    analyzingStatus: 'Analyzing command…',
    commandFailed: 'Command Failed',
    voiceAssistantTitle: 'Voice Assistant',
    listeningHelpText: 'Speak naturally to add groceries, search products, or manage your list.',
    heardTranscript: 'Heard Transcript',
    activeStatus: 'Active',
    saySomethingLike: 'Say something like "Add 2 gallons of whole milk"...',
    tapQuickCommand: 'Tap a quick command:',
    tryAgain: 'Try Again',
    cancel: 'Cancel',
    confirmCommand: 'Confirm Command',
    analyzing: 'Analyzing…',

    // Confirmation Screen
    itemsRecognized: 'Items Recognized',
    reviewVoiceItems: 'Review and confirm items extracted from your voice command',
    productNotFound: 'Product Not Found',
    couldNotFindProduct: "Sorry, I couldn't find that product.",
    itemNotAvailable: "That item isn't currently available in Veya's catalog.",
    confirmAndAdd: 'Confirm & Add to List',

    // Success Screen
    addedToListTitle: 'Added to your list!',
    addedToListSubtitle: 'Veya successfully recognized and added your groceries.',
    listTotal: 'List Total',
    item: 'item',
    items: 'items',
    speakAgain: 'Speak Again (Add More)',
    viewShoppingList: 'View Shopping List',
    backToHome: 'Back to Home',

    // Shopping List Screen
    shoppingListTitle: 'Shopping List',
    itemsToPickUp: 'items to pick up',
    voiceAdd: 'Voice Add',
    listEmptyTitle: 'Your shopping list is empty',
    listEmptySubtitle: 'Tap the microphone to quickly add groceries with your voice.',
    sayAddMilk: 'Say “Add milk, eggs, bread”',
    subtotal: 'Subtotal',
    estimatedTax: 'Estimated Tax',
    total: 'Total',
    proceedToCheckout: 'Proceed to Checkout',
    clearAll: 'Clear All',

    // Search Screen
    searchResultsTitle: 'Search Results',
    searchGroceriesPlaceholder: 'Search groceries...',
    voiceSearchQuery: 'Voice Search Query',
    typeOrSpeakToSearch: 'Type or speak to search',
    found: 'found',
    noProductsFound: 'No products found',
    noProductsFoundSubtitle: 'Try searching for milk, bread, bananas, eggs, or say another prompt.',
    tryVoiceSearch: 'Try Voice Search',
    lookingForSomethingElse: 'Looking for something else?',
    speakAnytime: 'Just speak to Veya anytime.',
    speak: 'Speak',
    filterAll: 'All',
    filterDairy: 'Dairy',
    filterProduce: 'Produce',
    filterBakery: 'Bakery',
    filterOrganic: 'Organic',
    filterUnder5: 'Under $5',
    filterUnder10: 'Under $10',

    // Product Details Screen
    organicBadge: '100% ORGANIC',
    inStockDelivery: 'In stock • Delivery in 30 mins',
    outOfStock: 'Out of stock',
    nutritionFacts: 'Nutrition Facts',
    perServing: 'per serving',
    calories: 'Calories',
    protein: 'Protein',
    carbs: 'Carbs',
    fat: 'Fat',
    quantity: 'Quantity',
    addToList: 'Add to List',
    addedToListToast: 'Added to List',
    similarAlternatives: 'Similar Alternatives',

    // Profile Screen
    profileTitle: 'Alex Morgan',
    premiumMember: 'Veya Premium Member',
    voicePreferences: 'Voice Preferences',
    voiceSensitivityTitle: 'Voice Command Sensitivity',
    voiceSensitivityDesc: 'High accuracy mode enabled',
    dietaryPreferencesTitle: 'Dietary Preferences',
    dietaryPreferencesDesc: 'Organic, Whole Milk, Fresh Produce',
    generalSettings: 'General',
    orderNotificationsTitle: 'Order Notifications',
    orderNotificationsDesc: 'Restock reminders & delivery alerts',
    privacyHistoryTitle: 'Privacy & Voice History',
    privacyHistoryDesc: 'Encrypted on-device recognition',

    // All Categories Screen
    allCategoriesTitle: 'All Categories',
    categoriesAvailable: 'categories available',

    // Toasts
    addedToast: 'Added to shopping list',
    removedToast: 'Item removed',
    clearedToast: 'Shopping list cleared',
  },
  hi: {
    // Nav Bar
    navHome: 'होम',
    navSearch: 'खोजें',
    navVoice: 'आवाज़',
    navList: 'सूची',
    navProfile: 'प्रोफ़ाइल',

    // Header
    headerTitle: 'वेया',
    back: 'पीछे जाएं',

    // Home Screen
    goodMorning: 'शुभ प्रभात',
    whatDoYouNeed: 'आज आपको क्या चाहिए?',
    searchPlaceholder: 'उत्पाद खोजें...',
    voiceAi: 'वॉइस एआई',
    speakToVeya: 'वेया से बात करें',
    voiceSubtext: '“आपकी खरीदारी, बस बोलें।”',
    tryPromptLabel: 'प्रयास करें:',
    tryPromptText: '“दो लीटर दूध जोड़ें”',
    categories: 'श्रेणियां',
    seeAll: 'सभी देखें',
    runningLow: 'आपके पास यह कम हो सकता है',
    basedOnHistory: 'इतिहास के आधार पर',
    add: 'जोड़ें',
    smartSuggestions: 'आपके लिए स्मार्ट सुझाव',
    personalized: 'व्यक्तिगत',
    seasonalTitle: 'समर रिफ्रेशर्स',
    seasonalSubtitle: 'गर्मी के दिनों के लिए चुनिंदा उत्पाद',

    // Listening Screen
    veyaVoiceAssistant: 'वेया वॉइस असिस्टेंट',
    listeningStatus: 'सुन रहा हूँ...',
    analyzingStatus: 'कमांड विश्लेषण जारी है…',
    commandFailed: 'कमांड विफल रही',
    voiceAssistantTitle: 'वॉइस असिस्टेंट',
    listeningHelpText: 'किराना सामान जोड़ने, उत्पाद खोजने या अपनी सूची प्रबंधित करने के लिए स्वाभाविक रूप से बोलें।',
    heardTranscript: 'सुनी गई बात',
    activeStatus: 'सक्रिय',
    saySomethingLike: 'कहें जैसे "दो लीटर दूध जोड़ें"...',
    tapQuickCommand: 'त्वरित कमांड पर टैप करें:',
    tryAgain: 'पुनः प्रयास करें',
    cancel: 'रद्द करें',
    confirmCommand: 'कमांड की पुष्टि करें',
    analyzing: 'विश्लेषण जारी है…',

    // Confirmation Screen
    itemsRecognized: 'पहचाने गए सामान',
    reviewVoiceItems: 'आपकी आवाज़ से निकाले गए सामान की समीक्षा करें और पुष्टि करें',
    productNotFound: 'उत्पाद नहीं मिला',
    couldNotFindProduct: 'क्षमा करें, मुझे वह उत्पाद नहीं मिला।',
    itemNotAvailable: 'वह सामान वर्तमान में वेया के कैटलॉग में उपलब्ध नहीं है।',
    confirmAndAdd: 'पुष्टि करें और सूची में जोड़ें',

    // Success Screen
    addedToListTitle: 'आपकी सूची में जोड़ा गया!',
    addedToListSubtitle: 'वेया ने सफलतापूर्वक आपके सामान को पहचाना और जोड़ा।',
    listTotal: 'कुल सूची योग',
    item: 'सामान',
    items: 'सामान',
    speakAgain: 'फिर से बोलें (और जोड़ें)',
    viewShoppingList: 'खरीदारी सूची देखें',
    backToHome: 'मुख्य पृष्ठ पर लौटें',

    // Shopping List Screen
    shoppingListTitle: 'खरीदारी सूची',
    itemsToPickUp: 'सामान लेने हैं',
    voiceAdd: 'आवाज़ से जोड़ें',
    listEmptyTitle: 'आपकी खरीदारी सूची खाली है',
    listEmptySubtitle: 'अपनी आवाज़ से तुरंत किराना सामान जोड़ने के लिए माइक्रोफ़ोन पर टैप करें।',
    sayAddMilk: 'कहें “दूध, अंडे, ब्रेड जोड़ें”',
    subtotal: 'उप-योग (Subtotal)',
    estimatedTax: 'अनुमानित कर (Tax)',
    total: 'कुल योग (Total)',
    proceedToCheckout: 'चेकआउट करें',
    clearAll: 'सभी हटाएं',

    // Search Screen
    searchResultsTitle: 'खोज परिणाम',
    searchGroceriesPlaceholder: 'किराना सामान खोजें...',
    voiceSearchQuery: 'वॉइस खोज प्रश्न',
    typeOrSpeakToSearch: 'खोजने के लिए टाइप करें या बोलें',
    found: 'मिले',
    noProductsFound: 'कोई उत्पाद नहीं मिला',
    noProductsFoundSubtitle: 'दूध, ब्रेड, केले, अंडे खोजने का प्रयास करें या कोई अन्य वाक्य बोलें।',
    tryVoiceSearch: 'वॉइस खोज का उपयोग करें',
    lookingForSomethingElse: 'कुछ और खोज रहे हैं?',
    speakAnytime: 'किसी भी समय वेया से बात करें।',
    speak: 'बोलें',
    filterAll: 'सभी',
    filterDairy: 'डेयरी',
    filterProduce: 'सब्जियां/फल',
    filterBakery: 'बेकरी',
    filterOrganic: 'जैविक (Organic)',
    filterUnder5: '$5 से कम',
    filterUnder10: '$10 से कम',

    // Product Details Screen
    organicBadge: '100% जैविक (ORGANIC)',
    inStockDelivery: 'स्टॉक में उपलब्ध • 30 मिनट में डिलीवरी',
    outOfStock: 'स्टॉक में नहीं है',
    nutritionFacts: 'पोषण संबंधी जानकारी (Nutrition Facts)',
    perServing: 'प्रति सर्विंग',
    calories: 'कैलोरी',
    protein: 'प्रोटीन',
    carbs: 'कार्बोहाइड्रेट',
    fat: 'वसा',
    quantity: 'मात्रा',
    addToList: 'सूची में जोड़ें',
    addedToListToast: 'सूची में जोड़ा गया',
    similarAlternatives: 'समान विकल्प',

    // Profile Screen
    profileTitle: 'अलेक्स मॉर्गन (Alex Morgan)',
    premiumMember: 'वेया प्रीमियम सदस्य',
    voicePreferences: 'वॉइस प्राथमिकताएं',
    voiceSensitivityTitle: 'वॉइस कमांड संवेदनशीलता',
    voiceSensitivityDesc: 'उच्च सटीकता मोड सक्षम',
    dietaryPreferencesTitle: 'आहार प्राथमिकताएं',
    dietaryPreferencesDesc: 'जैविक, दूध, ताज़े उत्पाद',
    generalSettings: 'सामान्य सेटिंग्स',
    orderNotificationsTitle: 'ऑर्डर सूचनाएं',
    orderNotificationsDesc: 'स्टॉक रिमाइंडर्स और डिलीवरी अलर्ट',
    privacyHistoryTitle: 'गोपनीयता और वॉइस इतिहास',
    privacyHistoryDesc: 'एन्क्रिप्टेड ऑन-डिवाइस पहचान',

    // All Categories Screen
    allCategoriesTitle: 'सभी श्रेणियां',
    categoriesAvailable: 'श्रेणियां उपलब्ध हैं',

    // Toasts
    addedToast: 'खरीदारी सूची में जोड़ा गया',
    removedToast: 'सामान हटा दिया गया',
    clearedToast: 'खरीदारी सूची खाली कर दी गई',
  },
};

export const t = (key: keyof typeof TRANSLATIONS.en, lang?: string): string => {
  const currentLang = isHindi(lang) ? 'hi' : 'en';
  return TRANSLATIONS[currentLang][key] || TRANSLATIONS.en[key] || key;
};
