import React, { useEffect, useState } from 'react';
import { ARAAK_IDENTITY, PortalSlide } from '../data/araakPortalData';

interface FloatingNavbarProps {
  activeSlide: PortalSlide;
  onSelectSlide: (slide: PortalSlide) => void;
  onQuickRouting: () => void;
}

const NAV_ITEMS: { id: PortalSlide; label: string }[] = [
  { id: 'hero', label: 'الواجهة' },
  { id: 'pillars', label: 'التنمية والتدريب والاستشارات' },
  { id: 'entities', label: 'شركات المجموعة' },
  { id: 'routing', label: 'بوابة التحويل' },
];

export const FloatingNavbar: React.FC<FloatingNavbarProps> = ({
  activeSlide,
  onSelectSlide,
  onQuickRouting,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      dir="rtl"
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-6xl rounded-2xl transition-all duration-300 ${
        scrolled
          ? 'bg-[#08191E]/65 backdrop-blur-xl border border-white/15 shadow-2xl py-2.5 px-4'
          : 'bg-[#06161A]/40 backdrop-blur-md border border-white/10 py-3 px-5'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onSelectSlide('hero')}
          className="text-right flex items-center gap-2.5 shrink-0"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-[#C99E4C]" />
          <span className="text-sm sm:text-base font-bold text-white tracking-tight">
            {ARAAK_IDENTITY.groupName}
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-1.5">
          {NAV_ITEMS.map((item) => {
            const active = activeSlide === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectSlide(item.id)}
                className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
                  active
                    ? 'bg-[#C99E4C] text-[#06161A]'
                    : 'text-slate-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={onQuickRouting}
          className="rounded-xl border border-[#C99E4C]/50 bg-[#C99E4C]/15 px-3.5 py-2 text-xs font-semibold text-[#F3D89B] transition hover:bg-[#C99E4C] hover:text-[#06161A] shrink-0"
        >
          تحويل فوري
        </button>
      </div>

      {/* شريط تنقل الشرائح للهاتف */}
      <div className="flex md:hidden items-center gap-1.5 overflow-x-auto pt-2.5 mt-2.5 border-t border-white/10">
        {NAV_ITEMS.map((item) => {
          const active = activeSlide === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectSlide(item.id)}
              className={`rounded-lg px-3 py-1.5 text-[11px] font-semibold whitespace-nowrap ${
                active ? 'bg-[#C99E4C] text-[#06161A]' : 'bg-white/5 text-slate-200'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
