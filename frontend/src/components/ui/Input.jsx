import React from 'react';

export default function Input({
  label,
  error,
  icon: Icon,
  className = '',
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-[11px] font-semibold text-charcoal-800 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Icon className="w-3.5 h-3.5" />
          </div>
        )}
        <input
          className={`w-full ${
            Icon ? 'pl-9' : 'pl-3'
          } pr-3 py-2 text-xs sm:text-sm bg-gray-50/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-800 focus:bg-white transition-all text-charcoal-900 placeholder:text-gray-400 ${
            error ? 'border-rose-500 focus:ring-rose-500' : ''
          } ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-[10px] text-rose-600 mt-1">{error}</p>}
    </div>
  );
}
