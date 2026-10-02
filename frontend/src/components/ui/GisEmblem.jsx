import React from 'react';

export default function GisEmblem({ size = "md", className = "" }) {
  const sizeClasses = {
    sm: "w-9 h-9",
    md: "w-11 h-11 sm:w-12 sm:h-12",
    lg: "w-14 h-14 sm:w-16 sm:h-16",
    xl: "w-20 h-20",
  };

  return (
    <div
      className={`relative rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 select-none bg-white ring-2 ring-[#C5A880] shadow-sm p-0.5 ${
        sizeClasses[size] || sizeClasses.md
      } ${className}`}
    >
      <img
        src="/gis-crest.jpg"
        alt="Greenfield International School Crest"
        className="w-full h-full object-contain select-none pointer-events-none"
        draggable={false}
      />
    </div>
  );
}
