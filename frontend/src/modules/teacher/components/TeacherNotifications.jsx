import React from 'react';
import { 
  Bell, 
  CheckCircle2, 
  Calendar, 
  Users, 
  Clock, 
  CheckCheck, 
  Trash2, 
  Sparkles,
  Info,
  ShieldCheck
} from 'lucide-react';

export default function TeacherNotifications({ 
  notifications = [], 
  onMarkAllAsRead, 
  onNotificationClick,
  onClearNotifications 
}) {
  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'leave_approved':
        return (
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        );
      case 'substitute_assigned':
        return (
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
        );
      case 'schedule_update':
        return (
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
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
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Bell className="w-6 h-6 text-emerald-400" />
              Teacher Notification Center
            </h2>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500 text-slate-950">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Real-time updates regarding leave approvals, substitute assignments, and timetable changes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllAsRead}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
            >
              <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
              Mark all read
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={onClearNotifications}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-rose-400 text-xs transition-colors border border-slate-700"
              title="Clear all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {notifications.length > 0 ? (
          <div className="divide-y divide-slate-800/60">
            {notifications.map((item) => (
              <div
                key={item.id}
                onClick={() => onNotificationClick && onNotificationClick(item)}
                className={`p-5 flex items-start gap-4 transition-colors cursor-pointer hover:bg-slate-800/40 ${
                  !item.read ? 'bg-emerald-500/5' : ''
                }`}
              >
                {getNotificationIcon(item.type)}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className={`text-sm font-bold ${!item.read ? 'text-white' : 'text-slate-300'}`}>
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.time || 'Today'}
                      </span>
                      {!item.read && (
                        <span className="w-2 h-2 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20"></span>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 mx-auto">
              <Bell className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-slate-300">All caught up!</p>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              You have no new notifications. Approved leaves and substitution notices will appear here automatically.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
