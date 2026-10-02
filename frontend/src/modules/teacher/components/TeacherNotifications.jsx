import React, { useState } from 'react';
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
  ShieldCheck,
  ChevronRight,
  Filter
} from 'lucide-react';

export default function TeacherNotifications({ 
  notifications = [], 
  onMarkAllAsRead, 
  onNotificationClick,
  onClearNotifications 
}) {
  const [filterType, setFilterType] = useState('all');

  const unreadCount = notifications.filter((n) => !n.read && n.unread !== false).length;

  const filteredNotifications = notifications.filter((item) => {
    if (filterType === 'all') return true;
    if (filterType === 'leave') return item.type === 'leave_approved' || item.type === 'leave-approved';
    if (filterType === 'substitute') return item.type === 'substitute_assigned' || item.type === 'substitute';
    if (filterType === 'schedule') return item.type === 'schedule_update' || item.type === 'schedule';
    return true;
  });

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'leave_approved':
      case 'leave-approved':
        return (
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-emerald-700" />
          </div>
        );
      case 'substitute_assigned':
      case 'substitute':
        return (
          <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest-900 border border-forest-800/20 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-gold-600" />
          </div>
        );
      case 'schedule_update':
      case 'schedule':
        return (
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 border border-blue-200 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5 text-blue-700" />
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 flex items-center justify-center shrink-0">
            <Info className="w-5 h-5 text-amber-700" />
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="font-serif text-2xl font-bold text-forest-900 flex items-center gap-2">
              <Bell className="w-6 h-6 text-gold-600" />
              <span>Faculty Notification Dispatch Center</span>
            </h2>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 animate-pulse">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Real-time updates regarding leave approvals, substitute assignments, and timetable adjustments.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={onMarkAllAsRead}
              className="px-3 py-1.5 rounded-xl bg-forest-50 hover:bg-forest-100 text-forest-900 text-xs font-bold flex items-center gap-1.5 transition-colors border border-forest-800/20 cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Mark all read</span>
            </button>
          )}
          {notifications.length > 0 && (
            <button
              type="button"
              onClick={onClearNotifications}
              className="p-2 rounded-xl bg-gray-100 hover:bg-rose-50 text-gray-500 hover:text-rose-600 text-xs transition-colors border border-gray-200 cursor-pointer"
              title="Clear all notifications"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'All Updates' },
          { id: 'leave', label: 'Leave Authorizations' },
          { id: 'substitute', label: 'Proxy Assignments' },
          { id: 'schedule', label: 'Schedule Changes' }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilterType(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              filterType === tab.id
                ? 'bg-[#0D3B2E] text-white shadow-xs'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
        {filteredNotifications.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredNotifications.map((item) => {
              const isUnread = !item.read && item.unread !== false;

              return (
                <div
                  key={item.id}
                  onClick={() => onNotificationClick && onNotificationClick(item)}
                  className={`p-5 flex items-start gap-4 transition-colors cursor-pointer hover:bg-gray-50/80 ${
                    isUnread ? 'bg-[#FAF8F3]' : ''
                  }`}
                >
                  {getNotificationIcon(item.type)}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className={`font-serif text-sm font-bold ${isUnread ? 'text-forest-900' : 'text-gray-700'}`}>
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[11px] text-gray-400 font-mono flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.time || 'Today'}
                        </span>
                        {isUnread && (
                          <span className="w-2 h-2 rounded-full bg-amber-500 ring-4 ring-amber-500/20"></span>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-charcoal-700 leading-relaxed">
                      {item.message}
                    </p>
                  </div>

                  <ChevronRight className="w-4 h-4 text-gray-300 self-center shrink-0" />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-16 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-forest-50 text-forest-800 flex items-center justify-center mx-auto">
              <Bell className="w-6 h-6 text-gold-600" />
            </div>
            <p className="font-serif text-base font-bold text-forest-900">All caught up!</p>
            <p className="text-xs text-gray-500 max-w-xs mx-auto">
              You have no pending notifications. Approved leave applications and substitute assignments will appear here automatically.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
