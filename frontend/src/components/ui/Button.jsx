import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled = false,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-[#0D3B2E] hover:bg-[#07241B] text-white shadow-md hover:shadow-lg',
    secondary: 'bg-forest-50 hover:bg-forest-100 text-forest-900 border border-forest-800/20',
    outline: 'border border-gray-300 hover:bg-gray-50 text-charcoal-700',
    gold: 'bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-forest-950 font-bold shadow-md',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-xs sm:text-sm',
    lg: 'px-6 py-3 text-sm sm:text-base',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
      ) : null}
      {children}
    </button>
  );
}
