import React from 'react';

interface PhoneMockupProps {
  children: React.ReactNode;
  dark?: boolean;
}

export default function PhoneMockup({ children, dark = false }: PhoneMockupProps) {
  return (
    <div className="relative w-full max-w-[340px] h-[670px] rounded-[44px] bg-[#050A08] p-[10px] shadow-[0_0_0_1px_#2A3F37,0_30px_70px_-25px_rgba(0,0,0,0.85)] border border-[#1A2A24] flex flex-col mx-auto select-none overflow-hidden">
      {/* Notch / Dynamic Island */}
      <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-[92px] h-[24px] rounded-full bg-[#050A08] z-30 flex items-center justify-center pointer-events-none">
        <div className="w-3 h-3 rounded-full bg-[#111] mr-2" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#1a2e26]/60" />
      </div>

      {/* Screen container */}
      <div
        className={`relative w-full h-full rounded-[36px] overflow-hidden flex flex-col ${
          dark ? 'bg-[#0E1714] text-[#E2ECE7]' : 'bg-[#F3F5EF] text-[#10201B]'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

