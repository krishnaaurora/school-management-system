import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, X, Send, Bot, User, Minimize2, 
  Maximize2, CheckCircle2, Clock, BookOpen, FileText, 
  HelpCircle, Copy, Check, Zap, Lightbulb, MessageSquare
} from 'lucide-react';
import GisAiAssistantLogo from '../../../components/ui/GisAiAssistantLogo';

const FACULTY_AI_KNOWLEDGE = [
  {
    triggers: ['lesson', 'plan', 'trigonometry', 'quadratics', 'syllabus'],
    title: 'AI Lesson Plan Generator',
    response: `### 📚 45-Minute Lesson Plan: Trigonometric Identities (CBSE Class 10)

**1. Learning Objectives (10 mins):**
- Prove fundamental identity: $\\sin^2\\theta + \\cos^2\\theta = 1$.
- Apply Pythagorean trigonometric ratios to solve board exam application problems.

**2. Direct Instruction & Concept Demonstration (15 mins):**
- Draw unit circle on smartboard; relate right-angled triangle hypotenuse to Cartesian coordinates.
- Work through 2 standard CBSE 4-mark questions from NCERT Exemplar.

**3. Guided Class Practice (12 mins):**
- Pair students to solve: Simplify $\\frac{1 + \\tan^2\\theta}{1 + \\cot^2\\theta}$.
- Provide differentiated hints for struggling learners in Grade 10-A.

**4. Exit Assessment & Homework (8 mins):**
- Quick 2-question exit ticket on LMS.
- Assigned Homework: Exercise 8.4, Questions 5 (parts iii, v, vii).`
  },
  {
    triggers: ['quiz', 'questions', 'exam', 'test', 'worksheet'],
    title: 'Instant Quiz & Assessment Generator',
    response: `### 📝 Quick 5-Question Pop Quiz (Grade 10 Mathematics)

1. **Multiple Choice (1 Mark):** If $\\sin\\theta = \\frac{3}{5}$, find the value of $\\tan\\theta$. *(Answer: 3/4)*
2. **Short Answer (2 Marks):** Evaluate: $\\sin 30^\\circ \\cdot \\cos 60^\\circ + \\cos 30^\\circ \\cdot \\sin 60^\\circ$. *(Answer: 1)*
3. **Proof (3 Marks):** Prove that $(\\csc\\theta - \\cot\\theta)^2 = \\frac{1 - \\cos\\theta}{1 + \\cos\\theta}$.
4. **Application (3 Marks):** From the top of a 75m lighthouse, the angle of depression of a ship is $30^\\circ$. Find distance of ship from base. *(Answer: $75\\sqrt{3}$ m)*
5. **Bonus / High Order Thinking (4 Marks):** If $\\sec\\theta + \\tan\\theta = p$, express $\\sin\\theta$ in terms of $p$.`
  },
  {
    triggers: ['leave', 'substitute', 'handover', 'absence'],
    title: 'Substitute Handover & Syllabus Continuity',
    response: `### 📋 Substitute Lesson Handover Instructions

**For Substitute Teacher covering Grade 8-A (Period 2) & Grade 10-A (Period 3):**
- **Grade 8-A (Maths):** Students have completed Chapter 4 Worksheet. Distribute Practice Sheet #3 from the teacher's podium drawer. Homework submission is scheduled for tomorrow.
- **Grade 10-A (Maths):** Review NCERT Ex 8.4 Identities. Student representative *Aarav Kumar* will assist with distributing the smartboard assignment tablets.
- **Classroom Discipline Note:** Maintain standard classroom decorum. All attendance must be entered directly in the portal register by the end of the period.`
  },
  {
    triggers: ['parent', 'email', 'progress', 'guardian'],
    title: 'Guardian Progress Note Drafter',
    response: `### ✉️ Formal Parent Progress Note (Draft)

**Subject:** Academic Update & Commendation &bull; Greenfield International School

Dear Mr. & Mrs. Sharma,

I am pleased to share an update regarding **Diya's** academic progress in Mathematics for Term 1. Diya has demonstrated exemplary analytical consistency, achieving an **A+ (94%)** in our recent quadratic equation modular assessment.

Her classroom participation and collaborative problem-solving during our peer workshops have been commendable. We encourage her to continue this momentum as we transition into our Board Preparation Modules.

Warm regards,  
**Mrs. Ananya Sharma**  
Senior Faculty, Department of Mathematics  
Greenfield International School`
  }
];

export default function TeacherCopilotModal({ isOpen, onClose, onNavigateTab }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello Professor! I am your GIS Faculty AI Copilot. How can I assist you with lesson planning, quiz generation, substitute handover notes, or student grading today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isOpen) return null;

  const quickPrompts = [
    "Generate 45-min lesson plan for Trigonometry",
    "Create 5-question pop quiz for Grade 10-A",
    "Draft parent progress email for top student",
    "Write substitute handover notes for my leave",
    "Suggest homework problems for Quadratic Equations"
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
      const lowerQ = q.toLowerCase();
      const matched = FACULTY_AI_KNOWLEDGE.find((item) =>
        item.triggers.some(trigger => lowerQ.includes(trigger))
      );

      let responseText = matched
        ? matched.response
        : `### 💡 AI Faculty Assistant Response\n\nI have analyzed your request regarding *"**${q}**"*. \n\n- **Curriculum Alignment:** Fully aligned with CBSE Senior Secondary Syllabus.\n- **Pedagogical Recommendation:** Integrate 10 minutes of active retrieval practice at the start of the period to maximize long-term retention.\n- **Next Steps:** You can copy this formatted plan or click below to view your timetable schedule.`;

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setLoading(false);
    }, 600);
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed bottom-24 right-6 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className={`bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col transition-all duration-200 ${
            isMinimized ? 'w-80 h-16' : 'w-[92vw] sm:w-[460px] h-[580px] max-h-[82vh]'
          }`}
        >
          {/* Header Bar */}
          <div className="bg-gradient-to-r from-[#0B2E23] to-[#164e3f] p-3.5 px-4 text-white flex items-center justify-between flex-shrink-0 shadow-sm select-none">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/10 p-0.5 border border-gold-400/30 flex items-center justify-center">
                <GisAiAssistantLogo size="sm" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif font-bold text-sm text-gold-300">
                    GIS Faculty Copilot
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[10px] text-emerald-100/70 -mt-0.5 font-sans">
                  AI Teaching & Lesson Intelligence
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-gray-300">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                title={isMinimized ? "Expand" : "Minimize"}
              >
                {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                title="Close Copilot"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body when not minimized */}
          {!isMinimized && (
            <>
              {/* Messages Container */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#FAF8F3]/50 text-xs">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${
                      msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                        msg.sender === 'user'
                          ? 'bg-[#0B2E23] text-gold-300'
                          : 'bg-gold-400/20 text-[#0B2E23] border border-gold-400/40'
                      }`}
                    >
                      {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5 text-forest-900" />}
                    </div>

                    <div
                      className={`max-w-[82%] rounded-2xl p-3.5 leading-relaxed shadow-2xs relative group ${
                        msg.sender === 'user'
                          ? 'bg-[#0B2E23] text-white rounded-tr-xs font-medium'
                          : 'bg-white text-gray-800 border border-gray-200/80 rounded-tl-xs'
                      }`}
                    >
                      <div className="whitespace-pre-line text-xs">
                        {msg.text}
                      </div>

                      <div
                        className={`flex items-center justify-between gap-2 mt-2 pt-1 border-t text-[10px] ${
                          msg.sender === 'user'
                            ? 'border-white/10 text-emerald-200/60'
                            : 'border-gray-100 text-gray-400'
                        }`}
                      >
                        <span>{msg.timestamp}</span>
                        {msg.sender === 'bot' && (
                          <button
                            onClick={() => handleCopy(msg.text, msg.id)}
                            className="hover:text-forest-900 flex items-center gap-1 font-semibold transition-colors"
                            title="Copy Response"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span className="text-emerald-600">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex items-center gap-2 text-gray-400 text-xs italic bg-white p-3 rounded-2xl border border-gray-100 w-fit">
                    <Sparkles className="w-3.5 h-3.5 text-gold-500 animate-spin" />
                    <span>AI Faculty Copilot is preparing lesson resource...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompts Bar */}
              <div className="px-3 py-2 bg-white border-t border-gray-100 overflow-x-auto scrollbar-none flex gap-1.5 flex-shrink-0">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-[#FAF8F3] hover:bg-forest-50 border border-gray-200/80 hover:border-forest-300 text-[11px] font-semibold text-gray-700 hover:text-forest-900 transition-colors flex items-center gap-1 flex-shrink-0"
                  >
                    <Zap className="w-2.5 h-2.5 text-gold-600" />
                    <span>{prompt}</span>
                  </button>
                ))}
              </div>

              {/* Input Form Bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="p-3 bg-white border-t border-gray-100 flex items-center gap-2 flex-shrink-0"
              >
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="Ask for lesson plans, quiz questions, parent emails..."
                  className="flex-1 bg-[#FAF8F3] border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-forest-800 font-medium"
                />
                <button
                  type="submit"
                  disabled={!inputQuery.trim() || loading}
                  className="p-2.5 rounded-xl bg-[#0B2E23] hover:bg-[#164e3f] text-gold-300 transition-colors disabled:opacity-50 flex items-center justify-center flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
