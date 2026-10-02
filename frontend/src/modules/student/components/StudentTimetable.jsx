import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  UserCheck, 
  Sparkles, 
  CheckCircle2, 
  Info, 
  ChevronRight, 
  User, 
  ShieldCheck, 
  Printer, 
  BookOpen, 
  Layers,
  X
} from 'lucide-react';

export default function StudentTimetable({ 
  timetable = {}, 
  selectedDay = 'Mon', 
  onSelectDay 
}) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const [activeDay, setActiveDay] = useState(selectedDay || 'Mon');
  const [viewMode, setViewMode] = useState('weekly'); // 'weekly' | 'daily'
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Official Class 10-A Master Weekly Timetable Grid
  const MASTER_PERIODS = [
    { period: 0, time: '8:00 – 8:30 AM', label: 'Morning Assembly & Homeroom', type: 'break' },
    { period: 1, time: '8:30 – 9:15 AM', label: 'Period 1', type: 'class' },
    { period: 2, time: '9:15 – 10:00 AM', label: 'Period 2', type: 'class' },
    { period: 'recess', time: '10:00 – 10:15 AM', label: 'Fruit Break & Recess', type: 'break' },
    { period: 3, time: '10:15 – 11:00 AM', label: 'Period 3', type: 'class' },
    { period: 4, time: '11:00 – 11:45 AM', label: 'Period 4', type: 'class' },
    { period: 'lunch', time: '11:45 AM – 12:30 PM', label: 'Dining Hall Lunch Interval', type: 'break' },
    { period: 5, time: '12:30 – 1:15 PM', label: 'Period 5', type: 'class' },
    { period: 6, time: '1:15 – 2:00 PM', label: 'Period 6', type: 'class' },
    { period: 7, time: '2:00 – 2:45 PM', label: 'Period 7 / Co-Curricular', type: 'class' },
  ];

  const WEEKLY_SCHEDULE_GRID = {
    Mon: [
      { period: 1, subject: 'Mathematics', teacher: 'Mrs. Ananya Sharma', room: 'Room 301', topic: 'Quadratic Equations & Parabolic Roots', color: 'emerald' },
      { period: 2, subject: 'Physics', teacher: 'Mr. Amitav Sen', room: 'Physics Lab', topic: 'Light Reflection & Spherical Mirrors', color: 'blue' },
      { period: 3, subject: 'Science (Chemistry)', teacher: 'Dr. Rajesh Gupta', room: 'Chem Lab 1', topic: 'Redox Titrations & Chemical Reactions', color: 'teal', isSubstitute: false },
      { period: 4, subject: 'English Core', teacher: 'Mrs. Sunita Rao', room: 'Room 301', topic: 'Analytical Paragraph Drafting & Prose', color: 'amber' },
      { period: 5, subject: 'Social Science (History)', teacher: 'Mr. Vikram Singh', room: 'Room 301', topic: 'The Rise of Nationalism in Europe', color: 'purple' },
      { period: 6, subject: 'Computer Science & AI', teacher: 'Mr. Tanmay Joshi', room: 'STEM Lab B', topic: 'Python Loops & Data Structures', color: 'indigo' },
      { period: 7, subject: 'Physical Education / Sports', teacher: 'Coach Sandeep', room: 'Main Field', topic: 'Athletics & Team Football Drills', color: 'orange' },
    ],
    Tue: [
      { period: 1, subject: 'Science (Chemistry)', teacher: 'Dr. Rajesh Gupta', room: 'Chem Lab 1', topic: 'Periodic Classification & Valency Trends', color: 'teal' },
      { period: 2, subject: 'Mathematics', teacher: 'Mrs. Ananya Sharma', room: 'Room 301', topic: 'Trigonometric Ratios & Identities', color: 'emerald' },
      { period: 3, subject: 'English Core', teacher: 'Mrs. Sunita Rao', room: 'Room 301', topic: 'Poetry Appreciation & Literary Devices', color: 'amber' },
      { period: 4, subject: 'Physics', teacher: 'Mr. Amitav Sen', room: 'Physics Lab', topic: 'Ohm’s Law & Resistance in Circuits', color: 'blue' },
      { period: 5, subject: 'Social Science (Geography)', teacher: 'Mr. Vikram Singh', room: 'Room 301', topic: 'Water Resources & Multipurpose Projects', color: 'purple' },
      { period: 6, subject: 'Mathematics Lab', teacher: 'Mrs. Ananya Sharma', room: 'STEM Lab B', topic: 'GeoGebra Coordinate Geometry', color: 'emerald' },
      { period: 7, subject: 'Library & Guided Reading', teacher: 'Mrs. Meenakshi', room: 'Central Library', topic: 'Scholastic Book Reviews & Research', color: 'stone' },
    ],
    Wed: [
      { period: 1, subject: 'Social Science (Civics)', teacher: 'Mr. Vikram Singh', room: 'Room 301', topic: 'Federalism & Decentralization in India', color: 'purple' },
      { period: 2, subject: 'Mathematics', teacher: 'Mrs. Ananya Sharma', room: 'Room 301', topic: 'Arithmetic Progressions & Sum of N Terms', color: 'emerald' },
      { period: 3, subject: 'Biology & Life Processes', teacher: 'Dr. Rajesh Gupta', room: 'Bio Lab', topic: 'Human Circulatory System & Respiration', color: 'teal' },
      { period: 4, subject: 'English Core', teacher: 'Mrs. Sunita Rao', room: 'Room 301', topic: 'Letter to Editor & Debate Preparation', color: 'amber' },
      { period: 5, subject: 'Computer Science & AI', teacher: 'Mr. Tanmay Joshi', room: 'STEM Lab B', topic: 'Machine Learning Classification Models', color: 'indigo' },
      { period: 6, subject: 'Physics Lab', teacher: 'Mr. Amitav Sen', room: 'Physics Lab', topic: 'Focal Length of Concave Mirror Verification', color: 'blue' },
      { period: 7, subject: 'Music / Visual Arts', teacher: 'Mrs. Kavita Verma', room: 'Arts Studio', topic: 'Hindustani Classical & Acrylic Painting', color: 'rose' },
    ],
    Thu: [
      { period: 1, subject: 'Mathematics', teacher: 'Mrs. Ananya Sharma', room: 'Room 301', topic: 'Triangles: Similarity & Pythagoras Proof', color: 'emerald' },
      { period: 2, subject: 'Science (Chemistry)', teacher: 'Dr. Rajesh Gupta', room: 'Chem Lab 1', topic: 'Acids, Bases & Salts: pH Indicator Lab', color: 'teal' },
      { period: 3, subject: 'English Core', teacher: 'Mrs. Sunita Rao', room: 'Room 301', topic: 'Grammar: Modals & Reported Speech', color: 'amber' },
      { period: 4, subject: 'Social Science (Economics)', teacher: 'Mr. Vikram Singh', room: 'Room 301', topic: 'Sectors of the Indian Economy', color: 'purple' },
      { period: 5, subject: 'Physics', teacher: 'Mr. Amitav Sen', room: 'Room 301', topic: 'Magnetic Effects of Electric Current', color: 'blue' },
      { period: 6, subject: 'Robotics & STEM Lab', teacher: 'Mr. Tanmay Joshi', room: 'Robotics Wing', topic: 'Arduino Microcontroller Sensor Interfacing', color: 'indigo' },
      { period: 7, subject: 'Physical Education', teacher: 'Coach Sandeep', room: 'Indoor Court', topic: 'Badminton & Table Tennis League', color: 'orange' },
    ],
    Fri: [
      { period: 1, subject: 'Physics & STEM', teacher: 'Mr. Amitav Sen', room: 'Physics Lab', topic: 'Electromagnetism & DC Motors', color: 'blue' },
      { period: 2, subject: 'Science (Chemistry)', teacher: 'Dr. Rajesh Gupta', room: 'Chem Lab 1', topic: 'Metals & Non-Metals: Reactivity Series', color: 'teal' },
      { period: 3, subject: 'Mathematics', teacher: 'Mrs. Ananya Sharma', room: 'Room 301', topic: 'Coordinate Geometry: Distance & Section Formula', color: 'emerald' },
      { period: 4, subject: 'Social Science', teacher: 'Mr. Vikram Singh', room: 'Room 301', topic: 'Globalization & World Economy', color: 'purple' },
      { period: 5, subject: 'English Core', teacher: 'Mrs. Sunita Rao', room: 'Room 301', topic: 'Reading Comprehension & Case-Based Passages', color: 'amber' },
      { period: 6, subject: 'Computer Science & AI', teacher: 'Mr. Tanmay Joshi', room: 'STEM Lab B', topic: 'AI Ethics & Neural Networks Overview', color: 'indigo' },
      { period: 7, subject: 'Clubs & Leadership Forum', teacher: 'Mrs. Ananya Sharma', room: 'Auditorium', topic: 'Model UN & Youth Parliament Session', color: 'amber' },
    ],
  };

  const getDayFullName = (d) => {
    switch (d) {
      case 'Mon': return 'Monday';
      case 'Tue': return 'Tuesday';
      case 'Wed': return 'Wednesday';
      case 'Thu': return 'Thursday';
      case 'Fri': return 'Friday';
      default: return d;
    }
  };

  const getColorStyles = (color) => {
    switch (color) {
      case 'emerald':
        return 'bg-emerald-50 text-emerald-950 border-emerald-200 hover:border-emerald-400';
      case 'teal':
        return 'bg-teal-50 text-teal-950 border-teal-200 hover:border-teal-400';
      case 'blue':
        return 'bg-blue-50 text-blue-950 border-blue-200 hover:border-blue-400';
      case 'amber':
        return 'bg-amber-50 text-amber-950 border-amber-200 hover:border-amber-400';
      case 'purple':
        return 'bg-purple-50 text-purple-950 border-purple-200 hover:border-purple-400';
      case 'indigo':
        return 'bg-indigo-50 text-indigo-950 border-indigo-200 hover:border-indigo-400';
      case 'rose':
        return 'bg-rose-50 text-rose-950 border-rose-200 hover:border-rose-400';
      case 'orange':
        return 'bg-orange-50 text-orange-950 border-orange-200 hover:border-orange-400';
      default:
        return 'bg-gray-50 text-gray-900 border-gray-200 hover:border-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* ── TOP BANNER & METADATA ── */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-50 text-forest-900 border border-forest-800/15 text-xs font-bold mb-2">
            <Calendar className="w-3.5 h-3.5 text-gold-600" />
            <span>Class 10-A Academic Schedule &bull; Term 1 (AY 2026–27)</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-forest-900">
            Class 10-A Master Timetable
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Classroom 301 &bull; Class Mentor: <strong className="text-forest-900 font-semibold">Mrs. Ananya Sharma</strong> &bull; 7 Periods Daily
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="bg-[#FAF8F3] p-1 rounded-xl border border-[#C5A880]/30 flex items-center">
            <button
              type="button"
              onClick={() => setViewMode('weekly')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'weekly'
                  ? 'bg-forest-900 text-white shadow-2xs'
                  : 'text-gray-600 hover:text-forest-900'
              }`}
            >
              Weekly Matrix
            </button>
            <button
              type="button"
              onClick={() => setViewMode('daily')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'daily'
                  ? 'bg-forest-900 text-white shadow-2xs'
                  : 'text-gray-600 hover:text-forest-900'
              }`}
            >
              Day View
            </button>
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl bg-[#FAF8F3] hover:bg-[#F2EFE8] border border-[#C5A880]/40 text-forest-900 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Print Official Timetable"
          >
            <Printer className="w-3.5 h-3.5 text-gold-600" />
            <span className="hidden sm:inline">Print Matrix</span>
          </button>
        </div>
      </div>

      {/* ── DAY SELECTOR TABS ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {days.map((d) => {
          const isSelected = activeDay === d;
          return (
            <button
              key={d}
              type="button"
              onClick={() => {
                setActiveDay(d);
                onSelectDay?.(d);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                isSelected
                  ? 'bg-[#0D3B2E] text-white shadow-xs'
                  : 'bg-white text-charcoal-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {getDayFullName(d)} {d === 'Mon' && '• Today'}
            </button>
          );
        })}
      </div>

      {/* ── VIEW MODE 1: COMPLETE WEEKLY MATRIX TABLE ── */}
      {viewMode === 'weekly' && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
          
          <div className="p-4 bg-gray-50/80 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold-600" />
              <h3 className="font-serif text-sm font-bold text-forest-900">
                Weekly Timetable Matrix &mdash; Grade 10-A
              </h3>
            </div>
            <span className="text-[11px] text-gray-500 font-mono">
              8:00 AM &ndash; 2:45 PM
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-forest-900 text-white uppercase text-[10.5px] tracking-wider">
                  <th className="py-3 px-3.5 font-bold border-r border-forest-800 w-32">
                    Period & Time
                  </th>
                  {days.map((d) => (
                    <th 
                      key={d} 
                      className={`py-3 px-3.5 font-bold border-r border-forest-800 last:border-none text-center ${
                        activeDay === d ? 'bg-forest-800 text-gold-300' : ''
                      }`}
                    >
                      {getDayFullName(d)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 font-sans">
                
                {/* Morning Assembly */}
                <tr className="bg-amber-50/40 text-amber-950 font-medium">
                  <td className="py-2.5 px-3.5 font-mono text-[11px] font-bold text-gray-700 border-r border-gray-200">
                    8:00 – 8:30 AM
                  </td>
                  <td colSpan={5} className="py-2.5 px-3.5 text-center text-xs font-semibold text-amber-900">
                    ✨ Morning Assembly & Homeroom Attendance (Classroom 301)
                  </td>
                </tr>

                {/* Periods 1 & 2 */}
                {[1, 2].map((pNum) => {
                  const pMeta = MASTER_PERIODS.find((m) => m.period === pNum);
                  return (
                    <tr key={pNum} className="hover:bg-gray-50/40 transition-colors">
                      <td className="py-3 px-3.5 font-bold text-forest-900 border-r border-gray-200 bg-[#FAF8F3]/60">
                        <span className="block font-serif text-xs">Period {pNum}</span>
                        <span className="font-mono text-[10.5px] font-normal text-gray-500">{pMeta?.time}</span>
                      </td>
                      {days.map((d) => {
                        const slot = WEEKLY_SCHEDULE_GRID[d]?.find((s) => s.period === pNum);
                        return (
                          <td 
                            key={d} 
                            onClick={() => slot && setSelectedSlot({ ...slot, day: d, time: pMeta?.time })}
                            className={`py-2 px-2.5 border-r border-gray-200 last:border-none align-top cursor-pointer transition-colors ${
                              activeDay === d ? 'bg-forest-50/30' : ''
                            }`}
                          >
                            {slot ? (
                              <div className={`p-2.5 rounded-xl border transition-all hover:shadow-2xs ${getColorStyles(slot.color)}`}>
                                <p className="font-bold text-[11.5px] leading-tight">{slot.subject}</p>
                                <p className="text-[10.5px] text-gray-600 mt-0.5">{slot.teacher}</p>
                                <p className="text-[9.5px] font-mono text-gray-500 mt-1 flex items-center gap-1">
                                  <MapPin className="w-3 h-3 text-gold-600" />
                                  {slot.room}
                                </p>
                              </div>
                            ) : (
                              <span className="text-gray-300 text-center block">—</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}

                {/* Recess Break */}
                <tr className="bg-emerald-50/40 text-emerald-950 font-medium">
                  <td className="py-2.5 px-3.5 font-mono text-[11px] font-bold text-gray-700 border-r border-gray-200">
                    10:00 – 10:15 AM
                  </td>
                  <td colSpan={5} className="py-2.5 px-3.5 text-center text-xs font-semibold text-emerald-900">
                    🍎 Fruit & Recess Interval
                  </td>
                </tr>

                {/* Periods 3 & 4 */}
                {[3, 4].map((pNum) => {
                  const pMeta = MASTER_PERIODS.find((m) => m.period === pNum);
                  return (
                    <tr key={pNum} className="hover:bg-gray-50/40 transition-colors">
                      <td className="py-3 px-3.5 font-bold text-forest-900 border-r border-gray-200 bg-[#FAF8F3]/60">
                        <span className="block font-serif text-xs">Period {pNum}</span>
                        <span className="font-mono text-[10.5px] font-normal text-gray-500">{pMeta?.time}</span>
                      </td>
                      {days.map((d) => {
                        const slot = WEEKLY_SCHEDULE_GRID[d]?.find((s) => s.period === pNum);
                        return (
                          <td 
                            key={d} 
                            onClick={() => slot && setSelectedSlot({ ...slot, day: d, time: pMeta?.time })}
                            className={`py-2 px-2.5 border-r border-gray-200 last:border-none align-top cursor-pointer transition-colors ${
                              activeDay === d ? 'bg-forest-50/30' : ''
                            }`}
                          >
                            {slot ? (
                              <div className={`p-2.5 rounded-xl border transition-all hover:shadow-2xs ${getColorStyles(slot.color)}`}>
                                <p className="font-bold text-[11.5px] leading-tight">{slot.subject}</p>
                                <p className="text-[10.5px] text-gray-600 mt-0.5">{slot.teacher}</p>
                                <p className="text-[9.5px] font-mono text-gray-500 mt-1 flex items-center gap-1">
                                  <MapPin className="w-3 h-3 text-gold-600" />
                                  {slot.room}
                                </p>
                              </div>
                            ) : (
                              <span className="text-gray-300 text-center block">—</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}

                {/* Lunch Interval */}
                <tr className="bg-amber-50/50 text-amber-950 font-medium">
                  <td className="py-2.5 px-3.5 font-mono text-[11px] font-bold text-gray-700 border-r border-gray-200">
                    11:45 AM – 12:30 PM
                  </td>
                  <td colSpan={5} className="py-2.5 px-3.5 text-center text-xs font-semibold text-amber-900">
                    🍽️ Dining Hall Lunch Break
                  </td>
                </tr>

                {/* Periods 5, 6, 7 */}
                {[5, 6, 7].map((pNum) => {
                  const pMeta = MASTER_PERIODS.find((m) => m.period === pNum);
                  return (
                    <tr key={pNum} className="hover:bg-gray-50/40 transition-colors">
                      <td className="py-3 px-3.5 font-bold text-forest-900 border-r border-gray-200 bg-[#FAF8F3]/60">
                        <span className="block font-serif text-xs">Period {pNum}</span>
                        <span className="font-mono text-[10.5px] font-normal text-gray-500">{pMeta?.time}</span>
                      </td>
                      {days.map((d) => {
                        const slot = WEEKLY_SCHEDULE_GRID[d]?.find((s) => s.period === pNum);
                        return (
                          <td 
                            key={d} 
                            onClick={() => slot && setSelectedSlot({ ...slot, day: d, time: pMeta?.time })}
                            className={`py-2 px-2.5 border-r border-gray-200 last:border-none align-top cursor-pointer transition-colors ${
                              activeDay === d ? 'bg-forest-50/30' : ''
                            }`}
                          >
                            {slot ? (
                              <div className={`p-2.5 rounded-xl border transition-all hover:shadow-2xs ${getColorStyles(slot.color)}`}>
                                <p className="font-bold text-[11.5px] leading-tight">{slot.subject}</p>
                                <p className="text-[10.5px] text-gray-600 mt-0.5">{slot.teacher}</p>
                                <p className="text-[9.5px] font-mono text-gray-500 mt-1 flex items-center gap-1">
                                  <MapPin className="w-3 h-3 text-gold-600" />
                                  {slot.room}
                                </p>
                              </div>
                            ) : (
                              <span className="text-gray-300 text-center block">—</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}

              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* ── VIEW MODE 2: FOCUSED DAILY LIST VIEW ── */}
      {viewMode === 'daily' && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
          <div className="p-4 sm:p-5 bg-gray-50/80 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-serif text-sm font-bold text-forest-900">
              {getDayFullName(activeDay)}'s Daily Routine & Class Schedule
            </h3>
            <span className="text-xs text-gray-500 font-semibold">
              7 Scheduled Periods &bull; 2 Breaks
            </span>
          </div>

          <div className="divide-y divide-gray-100">
            {(WEEKLY_SCHEDULE_GRID[activeDay] || []).map((item, idx) => {
              const pMeta = MASTER_PERIODS.find((m) => m.period === item.period);
              return (
                <div 
                  key={idx}
                  onClick={() => setSelectedSlot({ ...item, day: activeDay, time: pMeta?.time })}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-gray-50/80 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-forest-50 text-forest-900 border border-forest-800/15 flex flex-col items-center justify-center font-bold shrink-0">
                      <span className="text-[10px] uppercase text-gray-400">P{item.period}</span>
                      <span className="font-serif text-sm">{item.period}</span>
                    </div>

                    <div>
                      <h4 className="font-serif text-base font-bold text-forest-900">
                        {item.subject}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-gray-700">{item.teacher}</span>
                        <span>&bull;</span>
                        <span className="flex items-center gap-1 font-mono text-gray-600">
                          <MapPin className="w-3 h-3 text-gold-600" />
                          {item.room}
                        </span>
                        <span>&bull;</span>
                        <span className="font-mono text-gray-500">{pMeta?.time}</span>
                      </p>
                      {item.topic && (
                        <p className="text-[11.5px] text-[#8C6218] mt-1 font-medium">
                          Today's Focus: <em>{item.topic}</em>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Regular Session
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── SLOT DETAIL POPUP MODAL ── */}
      {selectedSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 space-y-4 relative">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-gold-600" />
                <h3 className="font-serif text-lg font-bold text-forest-900">
                  {selectedSlot.subject}
                </h3>
              </div>
              <button 
                type="button"
                onClick={() => setSelectedSlot(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-gray-600">
              <div className="flex items-center justify-between p-2.5 bg-[#FAF8F3] rounded-xl border border-[#C5A880]/30">
                <span>Period & Timing:</span>
                <strong className="text-forest-900 font-mono">Period {selectedSlot.period} ({selectedSlot.time})</strong>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-[#FAF8F3] rounded-xl border border-[#C5A880]/30">
                <span>Instructor Faculty:</span>
                <strong className="text-forest-900">{selectedSlot.teacher}</strong>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-[#FAF8F3] rounded-xl border border-[#C5A880]/30">
                <span>Classroom / Lab:</span>
                <strong className="text-forest-900">{selectedSlot.room}</strong>
              </div>

              {selectedSlot.topic && (
                <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 text-amber-950 space-y-1">
                  <p className="font-bold text-[11px]">Curricular Syllabus & Exercise Notes:</p>
                  <p className="italic text-[11.5px]">{selectedSlot.topic}</p>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setSelectedSlot(null)}
              className="w-full py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
