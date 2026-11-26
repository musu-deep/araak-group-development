import React from 'react';
import { ARAAK_IDENTITY, STRATEGIC_AXES } from '../data/araakPortalData';

interface HeroProps {
  onSelectRouting: (target: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectRouting }) => {
  return (
    <section
      id="top"
      dir="rtl"
      className="relative min-h-[92vh] w-full overflow-hidden bg-[#06161A] text-white flex items-end"
    >
      <img
        src={ARAAK_IDENTITY.heroImageUrl}
        alt={ARAAK_IDENTITY.heroImageAlt}
        className="absolute inset-0 h-full w-full object-cover object-center scale-105 opacity-70"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(6,22,26,0.55) 0%, rgba(6,22,26,0.78) 55%, rgba(6,22,26,0.96) 100%)',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#C99E4C]/40 bg-[#0B1C2C]/80 px-4 py-1.5 text-sm text-[#E8C882] backdrop-blur-md">
              <span>{ARAAK_IDENTITY.groupName}</span>
              <span className="opacity-50">•</span>
              <span>{ARAAK_IDENTITY.reachMetric}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-white">
              {ARAAK_IDENTITY.tagline}
            </h1>

            <p className="max-w-3xl text-lg sm:text-xl leading-relaxed text-slate-200/90">
              {ARAAK_IDENTITY.aboutSummary}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#pillars"
                className="rounded-xl bg-[#C99E4C] px-7 py-3.5 text-base font-semibold text-[#06161A] transition hover:bg-[#dcaf59]"
              >
                استعراض محاور المجموعة
              </a>
              <button
                type="button"
                onClick={() => onSelectRouting('أكاديمية أراك الإلكترونية (قسم القبول والتسجيل بالأكاديمية)')}
                className="rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-md transition hover:border-[#C99E4C] hover:bg-white/15"
              >
                التحويل إلى الجهة المختصة
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 rounded-2xl border border-white/15 bg-[#0B1C2C]/75 p-6 backdrop-blur-xl space-y-5">
            <div className="border-b border-white/10 pb-4">
              <div className="text-xs uppercase tracking-wider text-[#C99E4C]">الانتشار الجغرافي</div>
              <div className="mt-1 text-3xl font-bold text-white">{ARAAK_IDENTITY.reachMetric}</div>
            </div>

            <div>
              <div className="text-xs text-slate-300 mb-2">القيم المؤسسية</div>
              <div className="flex flex-wrap gap-2">
                {ARAAK_IDENTITY.values.map((val) => (
                  <span
                    key={val}
                    className="rounded-lg border border-[#C99E4C]/30 bg-[#C99E4C]/10 px-3 py-1 text-sm font-medium text-[#F3D89B]"
                  >
                    {val}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-1 text-xs text-slate-300/80">
              {STRATEGIC_AXES.length} محاور رئيسية + منظومة الشركات والكيانات التابعة
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
