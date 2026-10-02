import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  PhoneOff, 
  Sparkles, 
  Volume2, 
  Loader2, 
  AlertCircle, 
  X, 
  ChevronDown,
  RefreshCw,
  Headphones
} from 'lucide-react';
import { SarvamSession } from '../../services/sarvamSession';

export default function SarvamVoiceAssistantButton({
  orgId = "019e90ca-b3c9-79f3-9722-9b051c1e9794",
  workspaceId = "019e90ca-b3fb-7068-87b1-86581ef98843",
  appId = "GIS-Voice-A-13665fa2-61ad"
}) {
  // Session States: 'idle' | 'connecting' | 'listening' | 'speaking' | 'ending' | 'error'
  const [sessionState, setSessionState] = useState('idle');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [transcriptHistory, setTranscriptHistory] = useState([]);
  const [latestTranscript, setLatestTranscript] = useState('');
  const [showActiveCard, setShowActiveCard] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);

  const sessionRef = useRef(null);
  const transcriptEndRef = useRef(null);

  // Auto scroll transcript card
  useEffect(() => {
    if (transcriptEndRef.current) {
      transcriptEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [transcriptHistory, latestTranscript]);

  // Clean up session on unmount
  useEffect(() => {
    return () => {
      if (sessionRef.current) {
        sessionRef.current.stop();
        sessionRef.current = null;
      }
    };
  }, []);

  const handleStartSession = async () => {
    setErrorMessage(null);
    setTranscriptHistory([]);
    setLatestTranscript('');

    try {
      const apiKey = import.meta.env.VITE_SARVAM_EMBED_KEY;
      
      const session = new SarvamSession({
        apiKey: apiKey,
        orgId: orgId,
        workspaceId: workspaceId,
        appId: appId,
        userId: "demo_user",
        userIdentifierType: "custom",
        interactionType: 'call',
        agentVariables: {
          call_summary: "Prospective parent & student inquiry about Greenfield International School admissions, campus facilities, and academic curriculum",
          user_name: "Parent / Student"
        }
      });

      sessionRef.current = session;

      // Listen for state changes
      session.on('statechange', ({ state, error, message }) => {
        setSessionState(state);
        if (state === 'listening' || state === 'speaking') {
          setShowActiveCard(true);
        }
        if (state === 'error' && error) {
          setErrorMessage(error);
        }
        if (state === 'idle' || state === 'disconnected') {
          setShowActiveCard(false);
        }
      });

      // Listen for transcripts
      session.on('transcript', (msg) => {
        if (msg) {
          const text = msg.text || (typeof msg === 'string' ? msg : '');
          if (text) {
            setLatestTranscript(text);
            setTranscriptHistory((prev) => [
              ...prev.slice(-8), 
              { 
                text, 
                role: msg.role || 'assistant', 
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
              }
            ]);
          }
        }
      });

      // Listen for audio output levels (for subtle visualizer)
      session.on('level', (level) => {
        if (level && typeof level.peak === 'number') {
          setAudioLevel(Math.min(1, Math.max(0, level.peak)));
        }
      });

      // Start the voice session (requests mic on user click)
      await session.start();

    } catch (err) {
      console.warn('[SarvamVoiceAssistant] Start error:', err);
      setSessionState('error');
      let msg = err.message || 'Unable to connect to the voice assistant.';
      if (msg.includes('Invalid API key format') || msg.includes('401')) {
        msg = 'Invalid Embed Key format: Please make sure you are using the Embed-Scoped Key from your Sarvam Dashboard (Agent > Embed tab).';
      } else if (msg.includes('WebSocket connection error') || msg.includes('403')) {
        msg = 'Agent Connection Refused (403): Please ensure your agent "GIS-Voice-A-13665fa2-61ad" is Published / Deployed in your Sarvam Dashboard, has active ConvAI credits, and allows localhost connections in Embed Security settings.';
      }
      setErrorMessage(msg);
    }
  };

  const handleStopSession = async () => {
    if (sessionRef.current) {
      await sessionRef.current.stop();
      sessionRef.current = null;
    }
    setSessionState('idle');
    setShowActiveCard(false);
    setAudioLevel(0);
  };

  const handleToggleMute = () => {
    if (sessionRef.current && sessionRef.current.agent) {
      if (isMuted) {
        sessionRef.current.agent.unmute();
        setIsMuted(false);
      } else {
        sessionRef.current.agent.mute();
        setIsMuted(true);
      }
    }
  };

  const isSessionActive = sessionState === 'connecting' || sessionState === 'listening' || sessionState === 'speaking';

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-auto select-none">
      
      {/* ── EXPANDED ACTIVE CALL / TRANSCRIPTION CARD ── */}
      {showActiveCard && isSessionActive && (
        <div className="mb-3 w-84 sm:w-96 bg-white border border-amber-900/20 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200">
          
          {/* Header */}
          <div className="bg-[#0B2E23] text-white px-4 py-3.5 flex items-center justify-between border-b border-[#D4AF37]/30">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#07241B] border border-gold-400/40 flex items-center justify-center text-gold-300 shadow-inner">
                <Sparkles className="w-4 h-4 text-gold-300" />
              </div>
              <div>
                <h4 className="font-serif text-xs font-bold tracking-wide text-gold-200">
                  GIS Admissions Voice Desk
                </h4>
                <div className="flex items-center gap-1.5 text-[10.5px] text-emerald-200 font-medium">
                  <span className={`w-2 h-2 rounded-full ${
                    sessionState === 'speaking' ? 'bg-amber-400 animate-ping' : 'bg-emerald-400 animate-pulse'
                  }`} />
                  <span className="capitalize">
                    {sessionState === 'speaking' ? 'Assistant Speaking...' : isMuted ? 'Microphone Muted' : 'Listening... Speak freely'}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowActiveCard(false)}
              className="p-1.5 text-emerald-200/80 hover:text-white rounded-lg hover:bg-emerald-900/60 transition-colors cursor-pointer"
              title="Minimize panel"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Body: Live Conversation Subtitles */}
          <div className="p-4 bg-[#FAF8F3]/80 max-h-52 overflow-y-auto space-y-2 text-xs">
            {transcriptHistory.length === 0 && !latestTranscript ? (
              <div className="py-6 text-center text-stone-600 space-y-1.5">
                <p className="font-semibold text-[#0B2E23]">Voice channel live and ready</p>
                <p className="text-[11px] text-stone-500">
                  Ask about admissions 2026-27, curriculum, fee structure, campus visits, and school timings.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {transcriptHistory.map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`p-3 rounded-xl text-xs leading-relaxed ${
                      item.role === 'user' 
                        ? 'bg-[#0B2E23] text-ivory ml-6 rounded-tr-xs shadow-sm' 
                        : 'bg-white border border-stone-200 text-stone-800 mr-6 rounded-tl-xs shadow-sm'
                    }`}
                  >
                    <p className="font-medium">{item.text}</p>
                    <span className="text-[9.5px] opacity-60 block text-right mt-1 font-sans">{item.time}</span>
                  </div>
                ))}
                <div ref={transcriptEndRef} />
              </div>
            )}
          </div>

          {/* Active Call Controls Bar */}
          <div className="p-3 bg-white border-t border-stone-100 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={handleToggleMute}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
                isMuted 
                  ? 'bg-amber-50 text-amber-900 border-amber-300 font-bold' 
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border-stone-200'
              }`}
              title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
            >
              {isMuted ? <MicOff className="w-3.5 h-3.5 text-amber-700" /> : <Mic className="w-3.5 h-3.5 text-stone-600" />}
              <span>{isMuted ? 'Muted' : 'Mute Mic'}</span>
            </button>

            <button
              type="button"
              onClick={handleStopSession}
              className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <PhoneOff className="w-3.5 h-3.5" />
              <span>End Call</span>
            </button>
          </div>

        </div>
      )}

      {/* ── ERROR POPUP BANNER ── */}
      {sessionState === 'error' && errorMessage && (
        <div className="mb-3 max-w-xs sm:max-w-sm bg-white border border-rose-200 rounded-2xl p-4 shadow-xl text-xs animate-in fade-in duration-200">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <h5 className="font-bold text-rose-900">Voice Assistant Notice</h5>
              <p className="text-stone-600 mt-0.5 leading-relaxed text-[11px]">
                {errorMessage}
              </p>
              
              <div className="mt-2.5 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleStartSession}
                  className="px-3 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-[10.5px] border border-rose-200 flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  Try Again
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSessionState('idle');
                    setErrorMessage(null);
                  }}
                  className="text-stone-400 hover:text-stone-600 text-[10.5px] font-semibold cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setSessionState('idle');
                setErrorMessage(null);
              }}
              className="p-1 text-stone-400 hover:text-stone-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ── REDESIGNED BESPOKE FLOATING PILL BUTTON ── */}
      <div className="relative group">
        
        {/* Animated Ripple Glow during Active Call */}
        {isSessionActive && (
          <div className="absolute -inset-1 rounded-full bg-emerald-600/30 animate-pulse pointer-events-none" />
        )}

        <button
          type="button"
          onClick={isSessionActive ? (showActiveCard ? handleStopSession : () => setShowActiveCard(true)) : handleStartSession}
          className={`relative flex items-center gap-3 px-4 sm:px-5 py-3 rounded-full transition-all duration-300 shadow-2xl cursor-pointer border ${
            sessionState === 'connecting'
              ? 'bg-[#0B2E23] text-gold-200 border-gold-400/80 ring-2 ring-[#D4AF37]/30 scale-[1.02]'
              : sessionState === 'speaking'
              ? 'bg-gradient-to-r from-[#0B2E23] via-[#0D3B2E] to-[#07241B] text-gold-200 border-amber-400 ring-2 ring-amber-400/40 scale-[1.02]'
              : sessionState === 'listening'
              ? 'bg-[#0B2E23] text-emerald-100 border-emerald-400 ring-2 ring-emerald-400/40 scale-[1.02]'
              : sessionState === 'error'
              ? 'bg-[#0B2E23] text-rose-200 border-rose-400 hover:bg-[#07241B]'
              : 'bg-[#0B2E23] hover:bg-[#07241B] text-amber-100 border-[#D4AF37] hover:border-gold-300 hover:scale-[1.03] hover:shadow-gold-500/10'
          }`}
          title={isSessionActive ? 'Voice Assistant Active (Click to manage call)' : 'Speak to Greenfield International School 24/7, 365 days'}
          aria-label="Speak to us 24/7, 365 days"
        >
          {/* Left Icon with live beacon */}
          <div className="relative flex items-center justify-center shrink-0">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform ${
              sessionState === 'speaking'
                ? 'bg-amber-400/20 text-amber-300'
                : sessionState === 'listening'
                ? 'bg-emerald-500/20 text-emerald-300'
                : 'bg-[#07241B] text-gold-300 border border-[#D4AF37]/40 group-hover:scale-105'
            }`}>
              {sessionState === 'connecting' ? (
                <Loader2 className="w-4 h-4 animate-spin text-gold-400" />
              ) : sessionState === 'speaking' ? (
                <Volume2 className="w-4 h-4 text-amber-300 animate-bounce" />
              ) : sessionState === 'listening' ? (
                <Mic className="w-4 h-4 text-emerald-300 animate-pulse" />
              ) : sessionState === 'error' ? (
                <AlertCircle className="w-4 h-4 text-rose-300" />
              ) : (
                <Mic className="w-4 h-4 text-gold-300" />
              )}
            </div>

            {/* Live Indicator Dot */}
            <span className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full ring-2 ring-[#0B2E23] ${
              sessionState === 'speaking' 
                ? 'bg-amber-400 animate-ping' 
                : sessionState === 'listening' 
                ? 'bg-emerald-400 animate-pulse' 
                : 'bg-emerald-400'
            }`} />
          </div>

          {/* Button Text Area: Speak to us 24/7, 365 days */}
          <div className="flex flex-col items-start text-left">
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-bold text-xs sm:text-sm tracking-wide text-amber-100 whitespace-nowrap">
                {sessionState === 'connecting'
                  ? 'Connecting Voice...'
                  : sessionState === 'speaking'
                  ? 'Assistant Speaking...'
                  : sessionState === 'listening'
                  ? 'Listening to you...'
                  : isSessionActive
                  ? 'Active Call'
                  : 'Speak to us 24/7, 365 days'}
              </span>
            </div>
            {sessionState === 'idle' && (
              <span className="text-[9.5px] uppercase tracking-widest text-gold-400 font-semibold opacity-90 hidden sm:inline">
                Instant Voice Assistant
              </span>
            )}
            {isSessionActive && (
              <span className="text-[9.5px] text-emerald-300 font-semibold">
                Click to manage or end call
              </span>
            )}
          </div>

          {/* Subtle Audio Waveform Visualizer on Active Call */}
          {isSessionActive && (
            <div className="flex items-center gap-0.5 pl-1">
              <span className="w-1 h-3 rounded-full bg-emerald-400 animate-pulse" style={{ animationDelay: '0ms' }} />
              <span className="w-1 h-4 rounded-full bg-emerald-300 animate-pulse" style={{ animationDelay: '150ms' }} />
              <span className="w-1 h-2 rounded-full bg-emerald-400 animate-pulse" style={{ animationDelay: '300ms' }} />
            </div>
          )}
        </button>

      </div>

    </div>
  );
}
