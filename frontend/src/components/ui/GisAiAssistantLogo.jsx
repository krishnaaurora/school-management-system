import React from 'react';

/**
 * GisAiAssistantLogo
 * Renders the official GIS AI Operations Copilot insignia (AI Robot reading Book on Medallion)
 */
export default function GisAiAssistantLogo({ size = "md", className = "", animated = true }) {
  const sizeMap = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-11 h-11",
    lg: "w-14 h-14",
    xl: "w-20 h-20",
  };

  const chosenSize = sizeMap[size] || size;

  return (
    <div
      className={`relative rounded-full flex items-center justify-center flex-shrink-0 select-none overflow-hidden ${chosenSize} ${className}`}
    >
      <img
        src="/ai-copilot-icon.png"
        alt="GIS AI Assistant Copilot"
        className={`w-full h-full object-contain rounded-full select-none pointer-events-none drop-shadow-md ${
          animated ? "hover:scale-105 transition-transform duration-300" : ""
        }`}
        draggable={false}
      />
    </div>
  );
}
