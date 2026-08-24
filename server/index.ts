import express from 'express';
import dotenv from 'dotenv';
import { parseVoiceCommand } from './gemini';
import { resolveProduct } from './catalogResolver';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = Number(process.env.SERVER_PORT) || 4000;

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/parse-voice-command
// Accepts { transcript: string }, returns ParsedVoiceIntent JSON.
// Returns 400 for invalid input, 500 for Gemini/server errors.
// NO silent fallback — failures are surfaced to the client.
// ─────────────────────────────────────────────────────────────────────────────
app.post('/api/parse-voice-command', async (req, res) => {
  const { transcript } = req.body as { transcript?: string };

  if (!transcript || typeof transcript !== 'string' || transcript.trim().length === 0) {
    res.status(400).json({ error: 'transcript is required and must be a non-empty string' });
    return;
  }

  try {
    const result = await parseVoiceCommand(transcript.trim());

    const resolvedItems = result.items.map((item) => ({
      ...item,
      product: resolveProduct(item.productHint),
    }));

    res.json({
      ...result,
      items: resolvedItems,
    });
  } catch (err: any) {
    console.error('[Veya NLP] Error parsing voice command:', err?.message ?? err);
    res.status(500).json({
      error: err?.message ?? 'Failed to parse voice command. Please try again.',
    });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/health
// ─────────────────────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'veya-nlp-server',
    geminiConfigured: !!process.env.GEMINI_API_KEY,
  });
});

app.listen(PORT, () => {
  console.log(`✅ Veya NLP server running on http://localhost:${PORT}`);
  if (!process.env.GEMINI_API_KEY) {
    console.warn('⚠️  GEMINI_API_KEY is not set — voice command parsing will fail.');
  }
});
