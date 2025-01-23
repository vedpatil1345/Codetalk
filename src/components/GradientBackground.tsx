import React from 'react';

interface GradientBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({ children, className }) => {
  return (
    <div 
      className={`relative min-h-screen w-full overflow-hidden
        bg-gradient-to-br from-slate-100 via-slate-200 to-blue-100
        dark:from-slate-950 dark:via-slate-900 dark:to-blue-950
        transition-colors duration-300
        ${className || ''}`}
    >
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 transform-gpu"
        style={{
          backgroundImage: `
            linear-gradient(var(--grid-color, rgba(0, 0, 0, 1)) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-color, rgba(0, 0, 0, 1)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          transform: 'perspective(1000px) rotateX(60deg)',
          transformOrigin: 'top'
        }}
      />
      
      {/* Glow effect */}
      <div className="absolute top-1/3 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full 
        bg-blue-500/10 dark:bg-blue-300/10 
        blur-2xl transition-colors duration-300" 
      />
      
      {/* Content container */}
      <div className="relative z-10">
        {children}
      </div>

      {/* CSS Variables for theme-specific colors */}
      <style>{`
        :root {
          --grid-color: rgba(0, 0, 0, 0.05);
        }
        :root[class~="dark"] {
          --grid-color: rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </div>
  );
};