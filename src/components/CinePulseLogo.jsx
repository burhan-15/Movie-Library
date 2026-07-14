import React from 'react';

function CinePulseLogo({ width = 32, height = 32, className = '' }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 100 100" 
      width={width} 
      height={height} 
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logo-pulse-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ec4899" stopOpacity="1" />
          <stop offset="50%" stop-color="#a855f7" stopOpacity="1" />
          <stop offset="100%" stop-color="#6366f1" stopOpacity="1" />
        </linearGradient>
        <filter id="logo-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Outer decorative ring */}
      <circle cx="50" cy="50" r="45" fill="none" stroke="url(#logo-pulse-grad)" stroke-width="3" opacity="0.3" />
      <circle cx="50" cy="50" r="45" fill="none" stroke="url(#logo-pulse-grad)" stroke-width="1.5" stroke-dasharray="8 6" opacity="0.6" />
      
      {/* Play Button shape background */}
      <path d="M 40 32 L 68 50 L 40 68 Z" fill="url(#logo-pulse-grad)" opacity="0.15" />
      <path d="M 40 32 L 68 50 L 40 68 Z" fill="none" stroke="url(#logo-pulse-grad)" stroke-width="2" opacity="0.25" />
      
      {/* Heartbeat Pulse Path */}
      <path d="M 18 50 L 34 50 L 39 30 L 45 70 L 51 38 L 57 58 L 62 50 L 82 50" 
            fill="none" 
            stroke="url(#logo-pulse-grad)" 
            stroke-width="5" 
            stroke-linecap="round" 
            stroke-linejoin="round"
            filter="url(#logo-glow)" />
    </svg>
  );
}

export default CinePulseLogo;
