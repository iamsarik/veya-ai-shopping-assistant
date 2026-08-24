import React, { useEffect, useState } from 'react';
import { Mic, Sparkles, Volume2, AlertTriangle, Loader2 } from 'lucide-react';

interface ListeningScreenProps {
  transcript: string;
  isListening: boolean;
  onStopListening: () => void;
  onSubmitCommand: (command: string) => void;
  onCancel: () => void;
  /** True while the NLP backend is processing the command */
  isProcessing?: boolean;
  /** Error message to display when the backend/Gemini call fails */
  errorMessage?: string | null;
  /** Called when the user taps Try Again to dismiss the error */
  onClearError?: () => void;
}

export const ListeningScreen: React.FC<ListeningScreenProps> = ({
  transcript,
  isListening,
  onStopListening,
  onSubmitCommand,
  onCancel,
  isProcessing = false,
  errorMessage = null,
  onClearError,
}) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 450);
    return () => clearInterval(interval);
  }, []);

  const sampleCommands = [
    'Add 2 bottles of milk',
    'Find organic apples under $5',
    'Find wireless earbuds under $50',
    'Find Samsung phones',
    'Find men\'s winter jackets',
    'Add a notebook',
    'Find a USB-C charger',
    'Find bottled water',
    'Add chocolate ice cream',
    'Find an electric trimmer',
    'Find laptop chargers',
    'Show my shopping list',
  ];

  return (
    <main className="flex-1 px-4 pt-4 pb-[100px] flex flex-col justify-between items-center relative z-10 min-h-[580px]">
      {/* Top Status */}
      <div className="w-full flex flex-col items-center text-center pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#151829]/90 border border-[#2b2f4c] text-[#a899ff] text-[12px] font-bold shadow-sm mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#06b6d4]" />
          <span>Veya Voice Assistant</span>
        </div>
        <h2 className="text-[22px] font-extrabold text-[#f3f4f8] tracking-tight">
          {errorMessage
            ? 'Command Failed'
            : isProcessing
            ? 'Analyzing command…'
            : isListening
            ? `Listening${dots}`
            : 'Voice Assistant'}
        </h2>
        <p className="text-[13px] text-[#9da3c2] mt-1 max-w-[260px]">
          Speak naturally to add groceries, search products, or manage your list.
        </p>
      </div>

      {/* Central Visualizer & Glowing Voice Orb */}
      <div className="relative my-6 flex flex-col items-center justify-center">
        {/* Concentric subtle dark ripples */}
        <div className="absolute w-52 h-52 rounded-full border border-[#7059fd]/25 animate-voice-ripple-1 pointer-events-none"></div>
        <div className="absolute w-64 h-64 rounded-full border border-[#06b6d4]/25 animate-voice-ripple-2 pointer-events-none"></div>
        <div className="absolute w-76 h-76 rounded-full border border-[#7059fd]/15 animate-voice-ripple-3 pointer-events-none"></div>

        {/* Ambient Dark Glow */}
        <div className="absolute w-40 h-40 rounded-full bg-gradient-to-tr from-[#06b6d4]/20 to-[#7059fd]/35 blur-3xl pointer-events-none"></div>

        {/* Signature Glowing Voice Orb (Visual Only) */}
        <div
          className="relative w-28 h-28 rounded-full veya-voice-gradient veya-voice-glow flex items-center justify-center text-white border-4 border-[#121422] shadow-[0_12px_40px_rgba(112,89,253,0.5)] pointer-events-none select-none"
        >
          <Mic className="w-11 h-11 stroke-[2.2] drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]" />
        </div>

        {/* Audio frequency bars */}
        <div className="flex items-center gap-1.5 mt-6 h-6">
          {[12, 20, 16, 24, 14, 22, 10].map((h, i) => (
            <div
              key={i}
              className="w-1.5 rounded-full bg-gradient-to-t from-[#7059fd] to-[#06b6d4] transition-all duration-150 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.4)]"
              style={{
                height: `${isListening || isProcessing ? h : 4}px`,
                animationDelay: `${i * 0.15}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Live Transcript / Prompt card */}
      <div className="w-full flex flex-col gap-3">
        <div className="w-full dark-glass-surface rounded-2xl p-4 border border-[#2b2f4c] shadow-md">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-[#8a90b0] uppercase tracking-wider flex items-center gap-1">
              <Volume2 className="w-3.5 h-3.5 text-[#06b6d4]" />
              Heard Transcript
            </span>
            {transcript && (
              <span className="text-[11px] font-bold text-[#05df72] bg-[#05df72]/15 border border-[#05df72]/30 px-2 py-0.5 rounded-full">
                Active
              </span>
            )}
          </div>
          <p className="text-[15px] font-semibold text-[#f3f4f8] min-h-[24px]">
            {transcript ? (
              `“${transcript}”`
            ) : (
              <span className="text-[#6d728e] font-normal italic">
                Say something like &ldquo;Add 2 gallons of whole milk&rdquo;...
              </span>
            )}
          </p>
        </div>

        {/* Suggested Quick Voice Commands */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[11.5px] font-semibold text-[#9da3c2] px-1">
            Tap a quick command:
          </span>
          <div className="flex flex-wrap gap-2">
            {sampleCommands.map((cmd) => (
              <button
                key={cmd}
                onClick={() => onSubmitCommand(cmd)}
                className="px-3 py-1.5 rounded-full bg-[#151726]/90 hover:bg-[#1d2035] text-[#b0a4ff] border border-[#2c304e] text-[12px] font-semibold shadow-xs transition-all active:scale-95 cursor-pointer text-left hover:border-[#7059fd]/50"
              >
                &ldquo;{cmd}&rdquo;
              </button>
            ))}
          </div>
        </div>

        {/* Error Card — shown when the NLP backend/Gemini call fails */}
        {errorMessage && (
          <div className="w-full bg-[#24101a]/90 rounded-2xl border border-[#5c1f34] p-3.5 flex flex-col gap-2.5 shadow-md">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-[#ff4b72] shrink-0 mt-0.5" />
              <p className="text-[12.5px] font-semibold text-[#ffb3c4] leading-relaxed">
                {errorMessage}
              </p>
            </div>
            {onClearError && (
              <button
                onClick={onClearError}
                className="self-start px-3.5 py-1.5 rounded-full bg-[#7059fd] hover:bg-[#5d44fa] text-white text-[12px] font-bold transition-all active:scale-95 cursor-pointer"
              >
                Try Again
              </button>
            )}
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 pt-2">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-2xl bg-[#141624] hover:bg-[#1b1e32] text-[#b0b4c8] border border-[#272b47] text-[13.5px] font-bold transition-all active:scale-95 cursor-pointer"
          >
            Cancel
          </button>
          {transcript && !isProcessing && (
            <button
              onClick={() => onSubmitCommand(transcript)}
              className="flex-1 py-3 rounded-2xl bg-[#7059fd] hover:bg-[#5d44fa] text-white text-[13.5px] font-bold transition-all active:scale-95 cursor-pointer shadow-[0_4px_16px_rgba(112,89,253,0.35)]"
            >
              Confirm Command
            </button>
          )}
          {isProcessing && (
            <div className="flex-1 py-3 rounded-2xl bg-[#1e1b3a] border border-[#7059fd]/40 text-[#a899ff] text-[13.5px] font-bold flex items-center justify-center gap-2 select-none">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyzing…</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
