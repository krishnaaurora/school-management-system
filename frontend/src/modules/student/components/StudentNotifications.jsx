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
  MapPin, 
  UserCheck, 
  Info,
  ShieldCheck,
  Filter
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
    { id: 'all', label: 'All' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'exams', label: 'Exams' },
    { id: 'announcements', label: 'Announcements' },
  ];

  const filteredNotifications = activeCategory === 'all'
    ? notifications
    : notifications.filter(n => n.type === activeCategory);

  const getCategoryIcon = (type) => {
    switch (type) {
      case 'schedule':
        return (
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
        );
      case 'exams':
        return (
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
        );
      case 'attendance':
        return (
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center shrink-0">
            <Info className="w-5 h-5" />
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Bell className="w-6 h-6 text-emerald-400" />
              Notifications & Schedule Alerts
            </h2>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500 text-slate-950">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time proxy substitutions, classroom changes, and exam timetable adjustments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllAsRead}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700 cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
              Mark all read
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={onClearNotifications}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-rose-400 text-xs transition-colors border border-slate-700 cursor-pointer"
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
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                : 'bg-slate-900/70 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {filteredNotifications.length > 0 ? (
          <div className="divide-y divide-slate-800/60">
            {filteredNotifications.map((notif) => {
              const isHighlight = notif.highlight || notif.type === 'schedule';

              return (
                <div
                  key={notif.id}
                  onClick={() => onMarkAsRead?.(notif.id)}
                  className={`p-5 flex items-start gap-4 transition-colors cursor-pointer hover:bg-slate-800/40 ${
                    !notif.read ? (isHighlight ? 'bg-emerald-950/20' : 'bg-slate-800/30') : ''
                  }`}
                >
                  {getCategoryIcon(notif.type)}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className={`text-sm font-bold ${!notif.read ? 'text-white' : 'text-slate-300'}`}>
                          {notif.title}
                        </h3>
                        {isHighlight && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-amber-400" />
                            Substitute Update
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[11px] text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {notif.time}
                        </span>
                        {!notif.read && (
                          <span className="w-2 h-2 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20" />
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      {notif.message}
                    </p>

                    {notif.type === 'schedule' && (
                      <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center gap-3 text-xs">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigateTab?.('timetable');
                          }}
                          className="text-emerald-400 hover:text-emerald-300 font-semibold hover:underline"
                        >
                          Check updated timetable &rarr;
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
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 mx-auto">
              <Bell className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-slate-300">No alerts in this category</p>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              You are completely up to date with timetable revisions and administrative broadcasts.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
