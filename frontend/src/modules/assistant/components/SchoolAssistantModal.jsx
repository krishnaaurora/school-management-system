import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, BookOpen, Clock, Bus, Trophy, HelpCircle, Bot, User } from 'lucide-react';
import GisEmblem from '../../../components/ui/GisEmblem';
import { ASSISTANT_KNOWLEDGE, SCHOOL_INFO } from '../../../data/schoolData';

export default function SchoolAssistantModal({ isOpen, onClose, onOpenAdmissions }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Greetings! I am the Greenfield International School Assistant. How may I assist you with our admissions, academic pathways, campus facilities, or daily schedules today?",
      timestamp: 'Just now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedQuestions = [
    { label: "Admissions Process", query: "How do admissions work for 2026-27?" },
    { label: "Curriculum Pathways", query: "What curriculum and boards does GIS offer?" },
    { label: "School Timings", query: "What are the daily school hours?" },
    { label: "Bus Transportation", query: "Does GIS have bus routes in Hyderabad?" },
    { label: "Sports & Labs", query: "What sports and STEM labs are available?" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = (textToSend) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Knowledge match logic
    setTimeout(() => {
      const lower = query.toLowerCase();
      let matchedEntry = ASSISTANT_KNOWLEDGE.find(item =>
        item.triggers.some(trigger => lower.includes(trigger))
      );

      let reply = "";
      if (matchedEntry) {
        reply = matchedEntry.answer;
      } else {
        reply = `Thank you for your question. For specialized inquiries regarding "${query}", please feel free to reach our admissions desk directly at ${SCHOOL_INFO.phone} or email ${SCHOOL_INFO.generalEmail}. You can also schedule an in-person campus meeting with our academic coordinators.`;
      }

      const botMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-forest-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-ivory rounded-2xl shadow-2xl border border-gold-500/30 overflow-hidden flex flex-col max-h-[90vh] h-[640px]"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-forest-900 text-ivory px-5 py-4 flex items-center justify-between border-b border-forest-950 flex-shrink-0">
          <div className="flex items-center gap-3">
            <GisEmblem size="sm" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-base text-ivory">GIS School Assistant</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <p className="text-[11px] text-gold-300/90 font-medium">Greenfield International School Institutional Desk</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-ivory/70 hover:text-ivory hover:bg-forest-800 rounded-md transition-colors"
            aria-label="Close Assistant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Suggested Quick Inquiries */}
        <div className="bg-ivory-dark px-4 py-2.5 border-b border-ivory-border flex items-center gap-2 overflow-x-auto scrollbar-none flex-shrink-0">
          <span className="text-[10px] uppercase tracking-wider font-bold text-charcoal-600 flex-shrink-0">
            Quick Topics:
          </span>
          {suggestedQuestions.map((sq, i) => (
            <button
              key={i}
              onClick={() => handleSend(sq.query)}
              className="px-2.5 py-1 text-xs bg-white hover:bg-forest-50 text-forest-900 border border-ivory-border rounded-full whitespace-nowrap transition-colors shadow-2xs font-medium"
            >
              {sq.label}
            </button>
          ))}
        </div>

        {/* Chat Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-ivory">
          {messages.map((msg) => {
            const isBot = msg.sender === 'assistant';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isBot ? 'items-start' : 'items-end justify-end'}`}
              >
                {isBot && (
                  <div className="w-7 h-7 rounded-full bg-forest-800 text-gold-300 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-serif font-bold">
                    GIS
                  </div>
                )}

                <div
                  className={`max-w-[82%] sm:max-w-[75%] rounded-xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-2xs ${
                    isBot
                      ? 'bg-white text-charcoal-800 border border-ivory-border'
                      : 'bg-forest-900 text-ivory font-normal'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className={`block text-[10px] mt-1.5 ${isBot ? 'text-charcoal-400' : 'text-gold-200/70'}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-charcoal-500 italic py-1">
              <span className="w-2 h-2 rounded-full bg-forest-700 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-forest-700 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-forest-700 animate-bounce [animation-delay:0.4s]" />
              <span className="text-[11px]">GIS Assistant is composing a response...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Footer / Input Field */}
        <div className="p-3 sm:p-4 bg-white border-t border-ivory-border flex-shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about admissions, fees, transport, curriculum..."
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-ivory/70 border border-ivory-border rounded-lg focus:bg-white focus:border-forest-700 transition-colors"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2.5 bg-forest-900 hover:bg-forest-800 disabled:bg-charcoal-300 text-ivory rounded-lg transition-colors"
              aria-label="Send message"
            >
              <Send className="w-4 h-4 text-gold-300" />
            </button>
          </form>

          <div className="flex items-center justify-between mt-2 pt-2 border-t border-ivory-border text-[11px] text-charcoal-500">
            <span>Direct helpline: {SCHOOL_INFO.phone}</span>
            <button
              onClick={() => {
                onClose();
                onOpenAdmissions();
              }}
              className="text-forest-900 font-bold hover:underline"
            >
              Open Admissions Form →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
