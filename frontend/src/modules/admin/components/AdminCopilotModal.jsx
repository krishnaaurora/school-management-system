import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, X, Send, Bot, User, Move, Minimize2, 
  Maximize2, ArrowRight, CheckCircle2, Clock, 
  RefreshCw, Shield, HelpCircle, Copy, Check 
} from 'lucide-react';
import GisEmblem from '../../../components/ui/GisEmblem';
import GisAiAssistantLogo from '../../../components/ui/GisAiAssistantLogo';
import { AI_SAMPLE_QUERIES } from '../../../data/adminData';

export default function AdminCopilotModal({ isOpen, onClose, onNavigateTab }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello Administrator! I am your GIS Operations Copilot. How can I assist you with faculty substitution, student rosters, timetable conflicts, or user provisioning today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);

  if (!isOpen) return null;

  const quickPrompts = [
    "Analyze tomorrow's substitution workload",
    "Which teachers are available in Period 3?",
    "Check Grade 10 board exam readiness",
    "Who is on leave tomorrow?",
    "How do I register a new teacher?",
  ];

  const handleSend = (textToSend) => {
    const q = textToSend || inputQuery;
    if (!q.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);

    setTimeout(() => {
      // Find matching query response
      const matched = AI_SAMPLE_QUERIES.find((item) =>
        item.query.toLowerCase().includes(q.toLowerCase().slice(0, 8)) ||
        q.toLowerCase().includes(item.query.toLowerCase().slice(0, 8))
      );

      let responseText = matched
        ? matched.answer
        : `Verified Institutional Record: Query '${q}' processed across 68 active faculty members and 1,248 enrolled students. Timetable, attendance, and institutional security records are in optimal status.`;

      if (q.toLowerCase().includes('register') || q.toLowerCase().includes('provision')) {
        responseText = "To register a new faculty member or student, navigate to the 'Registration' tab in the sidebar or click the '+ Registration' button in the top header. The system will automatically assign their @gisedu.in login and format their initial credentials.";
      } else if (q.toLowerCase().includes('leave') || q.toLowerCase().includes('who is on leave')) {
        responseText = "Tomorrow (October 3, 2026), 2 faculty members have pending leave requests: Ananya Sharma (Mathematics, 3 periods affected) and Vikram Sengupta (Science/Physics, 2 periods affected). AI substitute plans are ready with Rahul Verma, Priya Nair, and Suresh Menon recommended as optimal zero-conflict replacements.";
      }

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setLoading(false);
    }, 450);
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={{ left: -600, right: 300, top: -400, bottom: 200 }}
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 40 }}
      className={`fixed z-50 right-6 sm:right-10 bottom-6 bg-white rounded-3xl shadow-2xl border border-gold-400/40 flex flex-col overflow-hidden ${
        isMinimized ? 'w-80 h-16' : 'w-[92vw] sm:w-[460px] h-[580px]'
      }`}
    >
      {/* ── DRAGGABLE HEADER ── */}
      <div className="bg-gradient-to-r from-[#0B2E23] via-[#123E31] to-[#1A5340] px-4 py-3.5 text-white flex items-center justify-between cursor-grab active:cursor-grabbing select-none border-b border-gold-400/20 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="p-0.5 rounded-full bg-gold-400/20 border border-gold-400/40">
            <GisAiAssistantLogo size="xs" animated={true} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-bold text-sm text-gold-200">GIS Operations Copilot</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-[10px] text-emerald-100/70 font-mono">Institutional AI Intelligence</p>
          </div>
        </div>

        {/* Window Controls */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1.5 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
            title={isMinimized ? 'Expand' : 'Minimize'}
          >
            {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-red-500/20 hover:text-red-300 text-gray-300 transition-colors cursor-pointer"
            title="Close Copilot"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── COPILOT CONTENT (IF NOT MINIMIZED) ── */}
      {!isMinimized && (
        <div className="flex-1 flex flex-col overflow-hidden bg-[#FAF8F3]/50">
          
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            
            {/* AI Status Badge */}
            <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-900 text-[11px] flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-emerald-700" />
                <span>Live Telemetry &bull; 68 Faculty &bull; 1,248 Students</span>
              </div>
              <span className="font-bold text-emerald-700 uppercase tracking-wider text-[9px]">Active</span>
            </div>

            {/* Chat Messages */}
            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isBot ? 'justify-start' : 'justify-end'}`}
                >
                  {isBot && (
                    <div className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <GisAiAssistantLogo size="xs" animated={false} />
                    </div>
                  )}

                  <div className={`max-w-[82%] rounded-2xl p-3.5 text-xs shadow-2xs relative group ${
                    isBot 
                      ? 'bg-white border border-gray-200 text-gray-800' 
                      : 'bg-forest-900 text-white font-medium'
                  }`}>
                    <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
                    
                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-gray-100/50 text-[10px] text-gray-400">
                      <span>{msg.timestamp}</span>
                      {isBot && (
                        <button
                          onClick={() => handleCopy(msg.id, msg.text)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:text-forest-900 cursor-pointer"
                          title="Copy Answer"
                        >
                          {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        </button>
                      )}
                    </div>
                  </div>

                  {!isBot && (
                    <div className="w-7 h-7 rounded-xl bg-gold-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-2 text-forest-800 text-xs font-semibold py-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-gold-600" />
                <span>Copilot is analyzing operations data...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="px-4 py-2 border-t border-gray-200/80 bg-white flex overflow-x-auto gap-1.5 scrollbar-none">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="px-2.5 py-1 rounded-full bg-[#FAF8F3] hover:bg-[#F2EFE8] text-[#0B2E23] border border-[#C5A880]/30 text-[11px] font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-gray-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask Copilot about faculty, leaves, students, registration..."
              className="flex-1 px-3.5 py-2.5 bg-[#FAF8F3] border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-forest-800"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || loading}
              className="p-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-gold-400 transition-colors cursor-pointer disabled:opacity-40 shrink-0 shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </motion.div>
  );
}
