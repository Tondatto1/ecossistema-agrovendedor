import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-[#071120]/85 backdrop-blur-md border-b border-slate-800/70 px-6 py-3 md:py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        {/* Official Brand Logo - Enlarged & Centered */}
        <div className="flex items-center justify-center">
          <img
            src="/logo.png"
            alt="Agrovendedor"
            className="h-10 md:h-12 lg:h-14 w-auto object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
    </header>
  );
};
