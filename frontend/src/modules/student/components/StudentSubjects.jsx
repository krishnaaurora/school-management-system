import React from 'react';
import { 
  BookOpen, 
  User, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  FileText, 
  Sparkles,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export default function StudentSubjects({ subjects = [], onSelectSubject }) {
  const defaultSubjects = [
    { id: 'sub-1', code: '041', name: 'Mathematics', teacher: 'Mrs. Ananya Sharma', room: '301', attendance: '98%', syllabusProgress: '78%', recentAnnouncement: 'Chapter 4 Quadratic Equations assignment submissions due this Friday.' },
    { id: 'sub-2', code: '086', name: 'Science (Chemistry & STEM)', teacher: 'Dr. Rajesh Gupta', room: 'Chem Lab 1', attendance: '96%', syllabusProgress: '82%', recentAnnouncement: 'Prepare lab journals for Redox Titrations experiment next Monday.' },
    { id: 'sub-3', code: '087', name: 'Physics & Mechanics', teacher: 'Mr. Amitav Sen', room: 'Physics Lab', attendance: '95%', syllabusProgress: '75%', recentAnnouncement: 'Ray diagrams problem sheet distributed. Complete questions 1–15.' },
    { id: 'sub-4', code: '184', name: 'English Language & Literature', teacher: 'Mrs. Sunita Rao', room: '301', attendance: '95%', syllabusProgress: '80%', recentAnnouncement: 'Draft a 150-word analytical paragraph on literary symbolism in Unit 3.' },
    { id: 'sub-5', code: '087', name: 'Social Science', teacher: 'Mr. Vikram Singh', room: '301', attendance: '96%', syllabusProgress: '76%', recentAnnouncement: 'Indian National Movement map plotting test scheduled for next Wednesday.' },
    { id: 'sub-6', code: '417', name: 'Computer Science & AI', teacher: 'Mr. Tanmay Joshi', room: 'STEM Lab B', attendance: '100%', syllabusProgress: '88%', recentAnnouncement: 'Python Machine Learning model training scripts committed to GitHub classroom.' },
  ];

  const displaySubjects = subjects.length > 0 ? subjects : defaultSubjects;

  return (
    <div className="space-y-6">
      
      {/* ── TOP BANNER ── */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-50 text-forest-900 border border-forest-800/15 text-xs font-bold mb-2">
            <BookOpen className="w-3.5 h-3.5 text-gold-600" />
            <span>CBSE Senior Secondary Curriculum &bull; Class 10-A</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-forest-900">
            Enrolled Academic Subjects & Curricula
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Prescribed syllabi milestones, faculty mentors, classroom venues, and attendance rates.
          </p>
        </div>

        <div className="p-3 bg-[#FAF8F3] rounded-xl border border-[#C5A880]/30 text-right shrink-0">
          <p className="text-[10px] uppercase font-bold text-gray-400">Total Disciplines</p>
          <p className="font-serif text-xl font-bold text-forest-900">{displaySubjects.length} Courses</p>
        </div>
      </div>

      {/* ── SUBJECT CARDS GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {displaySubjects.map((sub) => (
          <div 
            key={sub.id}
            className="bg-white rounded-2xl border border-gray-200 hover:border-forest-800/30 p-6 space-y-4 shadow-2xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10.5px] font-bold px-2.5 py-0.5 rounded-md bg-forest-50 text-forest-900 border border-forest-800/20 font-mono">
                    Code {sub.code}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-forest-900 mt-1.5">{sub.name}</h3>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300">
                  {sub.attendance} Att.
                </span>
              </div>

              {/* Faculty & Venue */}
              <div className="grid grid-cols-2 gap-2.5 text-xs pt-1">
                <div className="p-3 rounded-xl bg-[#FAF8F3] border border-[#C5A880]/30">
                  <span className="text-[10px] text-gray-400 uppercase font-bold flex items-center gap-1">
                    <User className="w-3 h-3 text-gold-600" /> Instructor
                  </span>
                  <p className="font-bold text-forest-900 mt-0.5">{sub.teacher}</p>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF8F3] border border-[#C5A880]/30">
                  <span className="text-[10px] text-gray-400 uppercase font-bold flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-gold-600" /> Classroom Venue
                  </span>
                  <p className="font-bold text-forest-900 mt-0.5">Room {sub.room}</p>
                </div>
              </div>

              {/* Syllabus Progress */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 font-medium">Term-1 Syllabus Completion</span>
                  <span className="font-bold text-emerald-800">{sub.syllabusProgress}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-emerald-600 h-full rounded-full transition-all"
                    style={{ width: sub.syllabusProgress.split('%')[0] + '%' }}
                  />
                </div>
              </div>
            </div>

            {/* Recent Teacher Announcement */}
            {sub.recentAnnouncement && (
              <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs space-y-1">
                <span className="text-[10px] font-bold text-amber-950 uppercase flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-700" /> Faculty Notice
                </span>
                <p className="text-charcoal-800 text-[11.5px] leading-relaxed">{sub.recentAnnouncement}</p>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
