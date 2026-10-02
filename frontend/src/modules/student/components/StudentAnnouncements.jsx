import React, { useState } from 'react';
import { 
  Megaphone, 
  Calendar, 
  Tag, 
  AlertCircle, 
  Sparkles, 
  Clock, 
  Filter,
  CheckCircle2
} from 'lucide-react';

export default function StudentAnnouncements({ announcements = [] }) {
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', 'Academic', 'Campus Life', 'Examinations', 'Facilities'];

  const filtered = filterCategory === 'All'
    ? announcements
    : announcements.filter(a => a.category === filterCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Megaphone className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl font-bold text-white tracking-tight">School Announcements</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              Institutional notices, athletic meet registrations, and academic directives from Greenfield Administration.
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  filterCategory === cat
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <div 
            key={item.id}
            className="bg-slate-900/70 backdrop-blur-md border border-slate-800 hover:border-slate-700 rounded-2xl p-6 space-y-3 shadow-xl transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                  item.priority === 'Urgent'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : item.priority === 'High'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                }`}>
                  {item.priority} Priority
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                  {item.category}
                </span>
                <span className="text-xs text-slate-500">• {item.date}</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                <Calendar className="w-3.5 h-3.5" />
                <span>{item.eventDate}</span>
              </div>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white">{item.title}</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
