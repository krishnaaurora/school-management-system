import React, { useState } from 'react';
import { 
  Bell, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  CheckCheck, 
  Trash2, 
  FileText, 
  Info,
  ArrowRight
} from 'lucide-react';

export default function StudentNotifications({ 
  notifications = [], 
  onMarkAsRead, 
  onMarkAllAsRead, 
  onClearNotifications,
  onNavigateTab 
}) {
  const [activeCategory, setActiveCategory] = useState('all');

  const unreadCount = notifications.filter(n => !n.read).length;

  const categories = [
    { id: 'all', label: 'All Updates' },
    { id: 'schedule', label: 'Timetable & Proxies' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'exams', label: 'Examinations' },
    { id: 'announcements', label: 'Circulars' },
  ];

  const filteredNotifications = activeCategory === 'all'
    ? notifications
    : notifications.filter(n => n.type === activeCategory);

  const getCategoryIcon = (type) => {
    switch (type) {
      case 'schedule':
        return (
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center shrink-0 shadow-2xs">
            <Calendar className="w-5 h-5 text-amber-700" />
          </div>
        );
      case 'exams':
        return (
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center shrink-0 shadow-2xs">
            <FileText className="w-5 h-5 text-emerald-700" />
          </div>
        );
      case 'attendance':
        return (
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 border border-blue-200 flex items-center justify-center shrink-0 shadow-2xs">
            <CheckCircle2 className="w-5 h-5 text-blue-700" />
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-xl bg-[#0B2E23]/10 text-[#0B2E23] border border-[#0B2E23]/20 flex items-center justify-center shrink-0 shadow-2xs">
            <Info className="w-5 h-5" />
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-amber-900/10 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-[#0B2E23] flex items-center gap-2">
              <Bell className="w-6 h-6 text-[#D4AF37]" />
              Notifications & Daily Briefings
            </h2>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#0B2E23] text-[#D4AF37] border border-[#D4AF37]/30">
                {unreadCount} New
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Real-time proxy substitutions, classroom relocations, and exam notices for Class 10-A.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllAsRead}
              className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-stone-200 cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5 text-emerald-700" />
              Mark all as read
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={onClearNotifications}
              className="p-2 rounded-xl bg-stone-100 hover:bg-rose-50 text-stone-500 hover:text-rose-700 text-xs transition-colors border border-stone-200 cursor-pointer"
              title="Clear all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-[#0B2E23] text-[#D4AF37] font-bold shadow-2xs border border-[#0B2E23]'
                : 'bg-white text-stone-600 hover:text-[#0B2E23] hover:bg-stone-50 border border-stone-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-white border border-amber-900/10 rounded-2xl overflow-hidden shadow-2xs">
        {filteredNotifications.length > 0 ? (
          <div className="divide-y divide-stone-100">
            {filteredNotifications.map((notif) => {
              const isHighlight = notif.highlight || notif.type === 'schedule';

              return (
                <div
                  key={notif.id}
                  onClick={() => onMarkAsRead?.(notif.id)}
                  className={`p-5 flex items-start gap-4 transition-colors cursor-pointer hover:bg-stone-50/80 ${
                    !notif.read ? (isHighlight ? 'bg-amber-50/40' : 'bg-emerald-50/20') : ''
                  }`}
                >
                  {getCategoryIcon(notif.type)}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className={`text-sm font-bold ${!notif.read ? 'text-[#0B2E23]' : 'text-stone-700'}`}>
                          {notif.title}
                        </h3>
                        {isHighlight && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-amber-700" />
                            Proxy / Roster Update
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[11px] text-stone-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {notif.time}
                        </span>
                        {!notif.read && (
                          <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] ring-4 ring-[#D4AF37]/20" />
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed font-normal">
                      {notif.message}
                    </p>

                    {notif.type === 'schedule' && (
                      <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center gap-3 text-xs">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigateTab?.('timetable');
                          }}
                          className="text-[#0B2E23] hover:text-emerald-800 font-bold hover:underline flex items-center gap-1"
                        >
                          View Class 10-A Timetable Matrix <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-16 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto border border-stone-200">
              <Bell className="w-6 h-6 text-stone-400" />
            </div>
            <p className="text-sm font-semibold text-stone-700">No notifications in this category</p>
            <p className="text-xs text-stone-500 max-w-xs mx-auto">
              You are completely up to date with timetable revisions and administrative broadcasts.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
