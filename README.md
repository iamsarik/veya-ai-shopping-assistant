# Veya AI Shopping Assistant

Veya is an intelligent, voice-first e-commerce shopping assistant built with React, TypeScript, and Google Gemini. It enables seamless natural language voice shopping, intelligent product search with price/brand/size filters, multi-product voice additions, and personalized recommendations.

---

## 🎯 Problem Statement

Traditional e-commerce interfaces require manual typing, category browsing, and tedious item-by-item selection. Veya resolves this by providing an intuitive, multimodal voice shopping experience that understands complex intent, multi-item spoken commands, multi-language speech, and contextual preferences.

---

## ✨ Key Implemented Features

- **Multilingual Voice Input**: Full Web Speech API support for **English (`en-US`)** and **Hindi (`hi-IN`)**.
- **Gemini 3.6 Flash NLP Engine**: Backend Express server (`POST /api/parse-voice-command`) parses natural language into structured JSON intent (`ADD`, `REMOVE`, `SEARCH`, `SHOW_LIST`).
- **Deterministic Catalog Resolver**: Resolves AI product hints to exact, validated catalog items without unsafe fuzzy matching.
- **Multi-Product & Quantity Processing**: Parses single and multi-item spoken requests with explicit quantities and measurement units (e.g., *"Add two gallons of milk and one white bread"*).
- **Voice & Text Search with Filters**:
  - **Voice Search**: Spoken search queries navigate directly to filtered search results.
  - **Price Filtering**: Parses numeric constraints like *"products under $5"* or *"items under 200"*.
  - **Brand Filtering**: Interactive and query-based filtering by brand (e.g., Samsung, Apple, Pepsi, Lay's).
  - **Size Filtering**: Matches explicit package sizes (e.g., *"1 gallon"*, *"500g"*, *"1 liter"*, *"2kg"*).
  - **Automatic Categorization**: Full coverage across 20 distinct catalog categories.
- **Smart Suggestions**:
  - **Personalized Recommendations**: Category-balanced round-robin allocation with candidate pool randomization based on shopping list history.
  - **Seasonal Recommendations**: Dynamic picks based on current season/month.
  - **Smart Substitutes**: Same-category alternatives on product details pages.
- **Confirmation & UI Controls**: Interactive confirmation workflow and sticky bottom action controls for small viewports.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons
- **Backend**: Express.js, Node.js (`tsx`)
- **AI / NLP**: `@google/genai` (Gemini 3.6 Flash)
- **Speech**: Web Speech API (`SpeechRecognition`)

---

## 🏗️ Architecture & Data Flow

```text
[ User Voice / Input ]
         ↓
Web Speech API (en-US / hi-IN)
         ↓
Express Backend (http://localhost:4000/api/parse-voice-command)
         ↓
Gemini 3.6 Flash NLP (JSON Intent Extraction)
         ↓
Deterministic Catalog Resolver (server/catalogResolver.ts)
         ↓
App Orchestrator (src/App.tsx)
         ↓
ConfirmationScreen / SearchScreen / Smart Suggestions Engine
```

---

## 📁 Project Structure

```text
veya/
├── server/
│   ├── index.ts              # Express API server
│   ├── gemini.ts             # Gemini 3.6 Flash NLP client
│   └── catalogResolver.ts    # Deterministic product resolver
├── src/
│   ├── components/
│   │   ├── Header.tsx        # Header with English/Hindi selector
│   │   ├── BottomNavBar.tsx  # Navigation bar
│   │   └── screens/          # Application screens
│   ├── data/
│   │   └── products.ts       # 20-category catalog & items
│   ├── utils/
│   │   └── recommendations.ts # Smart suggestions algorithms
│   ├── types.ts              # TypeScript interface definitions
│   └── App.tsx               # Main orchestrator & router
├── README.md                 # Project documentation
├── APPROACH.md               # Technical approach (<= 200 words)
├── vite.config.ts            # Vite & API proxy config
└── package.json              # Scripts & dependencies
```

---

## 🚀 Local Setup Instructions

### 1. Prerequisites
- **Node.js** (v18+)
- **Gemini API Key** from [Google AI Studio](https://aistudio.google.com/)

### 2. Environment Configuration
Create a `.env` file in the project root:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### 3. Running the App locally

Open **two terminal windows**:

**Terminal 1 — Frontend (Vite Dev Server):**
```bash
npm run dev
```

**Terminal 2 — Backend NLP Server:**
```bash
npm run server
```

The frontend will run on `http://localhost:5174` (or `http://localhost:3000`) and proxy `/api/*` requests to the Express server on `http://localhost:4000`.

### 4. Build & Type Checking

Run TypeScript type check:
```bash
npx tsc --noEmit
```

Build production bundle:
```bash
npm run build
```
