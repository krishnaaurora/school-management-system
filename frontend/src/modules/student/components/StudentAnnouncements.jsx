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

  const defaultAnnouncements = [
    { id: 'ann-1', title: 'CBSE Pre-Board 1 Timetable & Hall Ticket Release', description: 'Pre-Board Examination 1 schedules for Class 10 have been finalized. Tests begin on October 08, 2026. Hall tickets and seating plans are available from Class Teachers.', category: 'Examinations', priority: 'High', date: 'Oct 02, 2026', eventDate: 'Exam Commences Oct 08' },
    { id: 'ann-2', title: 'Annual Inter-School STEM & Robotics Exposition 2026', description: 'Greenfield IS will host the Regional STEM Olympiad and Robotics Hackathon on October 24. Registrations are open for Class 10 projects in the Innovation Wing.', category: 'Campus Life', priority: 'Normal', date: 'Oct 01, 2026', eventDate: 'Exposition: Oct 24' },
    { id: 'ann-3', title: 'CBSE Secondary Mathematics Pedagogy Workshop Series', description: 'Special Saturday masterclasses for Class 10 mathematics board preparations will take place in Auditorium Hall B with visiting CBSE resource mentors.', category: 'Academic', priority: 'Normal', date: 'Sep 28, 2026', eventDate: 'Saturdays: 9:00 AM' },
    { id: 'ann-4', title: 'Inter-House Sports Tournament & Athletic Meet', description: 'Annual sports day trials for track and field events (100m, 400m, Relay, Football) start next week on the main turf.', category: 'Campus Life', priority: 'Normal', date: 'Sep 25, 2026', eventDate: 'Trials: Oct 12–14' }
  ];

  const displayList = announcements.length > 0 ? announcements : defaultAnnouncements;
  const categories = ['All', 'Examinations', 'Academic', 'Campus Life'];

  const filtered = filterCategory === 'All'
    ? displayList
    : displayList.filter(a => a.category === filterCategory);

  return (
    <div className="space-y-6">
      
      {/* ── TOP BANNER ── */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold mb-2">
            <Megaphone className="w-3.5 h-3.5 text-amber-700" />
            <span>Greenfield Institutional Bulletins</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-forest-900">
            School Announcements & Circulars
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Official examination schedules, athletic meet notifications, and academic directives.
          </p>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                filterCategory === cat
                  ? 'bg-[#0D3B2E] text-white shadow-xs'
                  : 'bg-[#FAF8F3] text-charcoal-700 hover:bg-[#F2EFE8] border border-[#C5A880]/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── ANNOUNCEMENTS LIST ── */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <div 
            key={item.id}
            className="bg-white border border-gray-200 hover:border-forest-800/30 rounded-2xl p-6 space-y-3 shadow-2xs transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                  item.priority === 'High'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}>
                  {item.priority} Priority
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-forest-50 text-forest-900 border border-forest-800/20">
                  {item.category}
                </span>
                <span className="text-xs text-gray-400 font-mono">&bull; {item.date}</span>
              </div>

              {item.eventDate && (
                <div className="flex items-center gap-1.5 text-xs text-[#8C6218] font-bold">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.eventDate}</span>
                </div>
              )}
            </div>

            <h3 className="font-serif text-base sm:text-lg font-bold text-forest-900 leading-snug">
              {item.title}
            </h3>
            
            <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
