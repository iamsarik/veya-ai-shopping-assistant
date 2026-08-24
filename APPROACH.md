# Technical Approach

Veya implements a voice-first e-commerce shopping assistant using a decoupled architecture focused on natural language processing, deterministic safety, and personalized discovery.

### 1. Multilingual Speech & Gemini NLP Pipeline
Voice input in English (`en-US`) or Hindi (`hi-IN`) captured via Web Speech API is sent to an Express backend. Gemini 3.6 Flash parses transcripts into structured JSON intent (`ADD`, `REMOVE`, `SEARCH`, `SHOW_LIST`), extracting quantities, units, and product hints.

### 2. Deterministic Catalog Resolution
To eliminate AI hallucinations and unsafe fuzzy matching (e.g. preventing "socks" from matching "4-Socket Extension Board"), a server-side deterministic resolver maps Gemini hints strictly to validated catalog objects.

### 3. Precision Search & Multi-Filter Engine
Natural language search extracts price bounds (`under $5`), brand constraints (Samsung, Apple, Pepsi), and package size constraints (`1 gallon`, `500g`, `2kg`), matching them against structured product metadata.

### 4. Smart Recommendation Engine
Personalized recommendations use a category-balanced round-robin algorithm with candidate pool randomization based on shopping list history. Seasonal picks and same-category substitute recommendations drive contextual discovery..