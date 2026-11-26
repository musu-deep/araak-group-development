import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { SmartRoutingSection } from './components/SmartRoutingSection';
import { ARAAK_ENTITIES, ARAAK_IDENTITY, STRATEGIC_AXES } from './data/araakPortalData';

const SECTORS = ['الكل', 'التنموي والاستشاري', 'التدريب والأكاديمية', 'التجارة واللوجستيك', 'الصناعة والحديد', 'العقار والمشاريع'] as const;

export function App() {
  const [selectedTarget, setSelectedTarget] = useState('أكاديمية أراك الإلكترونية (قسم القبول والتسجيل بالأكاديمية)');
  const [activeSector, setActiveSector] = useState<(typeof SECTORS)[number]>('الكل');

  const routeToSection = (target: string) => {
    setSelectedTarget(target);
    document.getElementById('routing')?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredEntities =
    activeSector === 'الكل'
      ? ARAAK_ENTITIES
      : ARAAK_ENTITIES.filter((e) => e.sector === activeSector);

  return (
    <div dir="rtl" className="min-h-screen bg-[#06161A] text-white font-sans">
      <Hero onSelectRouting={routeToSection} />

      <section id="pillars" className="mx-auto max-w-7xl px-6 py-20 space-y-16">
        {STRATEGIC_AXES.map((axis) => (
          <div key={axis.id} className="space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="text-sm font-bold text-[#C99E4C]">محور {axis.code}</span>
                <h2 className="text-3xl font-bold mt-1">{axis.title}</h2>
                <p className="text-slate-300 mt-1">{axis.summary}</p>
              </div>
              <button
                type="button"
                onClick={() => routeToSection(`${axis.title} (${axis.routingLabel})`)}
                className="rounded-lg border border-[#C99E4C]/40 bg-[#C99E4C]/10 px-4 py-2 text-sm font-semibold text-[#F3D89B] hover:bg-[#C99E4C]/20"
              >
                تحويل إلى {axis.routingLabel}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {axis.branches.map((branch) => (
                <div
                  key={branch.id}
                  className="rounded-2xl border border-white/10 bg-[#0B1C2C]/80 p-6 space-y-4"
                >
                  <div>
                    <h3 className="text-xl font-bold text-white">{branch.title}</h3>
                    <p className="text-xs text-slate-400 mt-1">{branch.subtitle}</p>
                  </div>

                  <ul className="space-y-3">
                    {branch.items.map((item) => (
                      <li
                        key={item.title}
                        className="rounded-xl border border-white/5 bg-[#06161A]/70 p-3.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-sm text-[#E8C882]">{item.title}</span>
                          <button
                            type="button"
                            onClick={() => routeToSection(item.targetRouting)}
                            className="text-xs underline text-slate-300 hover:text-white"
                          >
                            تحويل
                          </button>
                        </div>
                        <p className="text-xs text-slate-300/85 mt-1 leading-relaxed">{item.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section id="entities" className="bg-[#08191E] py-20 px-6 border-t border-white/10">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-sm font-bold text-[#C99E4C]">منظومة العمل المؤسسي</span>
              <h2 className="text-3xl font-bold mt-1">الشركات والكيانات والمنصات التابعة</h2>
              <p className="text-slate-300 mt-1">
                تضم وحدات وشركات ومبادرات أراك والكيانات المرتبطة بها في مختلف القطاعات التشغيلية والاستشارية.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {SECTORS.map((sector) => (
                <button
                  key={sector}
                  type="button"
                  onClick={() => setActiveSector(sector)}
                  className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
                    activeSector === sector
                      ? 'bg-[#C99E4C] text-[#06161A]'
                      : 'border border-white/15 bg-[#0B1C2C] text-slate-200 hover:border-[#C99E4C]'
                  }`}
                >
                  {sector}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredEntities.map((entity) => (
              <div
                key={entity.id}
                className="rounded-2xl border border-white/10 bg-[#0B1C2C]/80 p-5 flex flex-col justify-between gap-4"
              >
                <div>
                  <span className="inline-block rounded-md bg-white/5 px-2.5 py-1 text-[11px] text-[#E8C882]">
                    {entity.sector}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-2">{entity.name}</h3>
                  <div className="text-xs font-medium text-[#C99E4C] mt-0.5">{entity.role}</div>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">{entity.scope}</p>
                </div>

                <button
                  type="button"
                  onClick={() => routeToSection(`${entity.name} — ${entity.role}`)}
                  className="self-start rounded-lg border border-white/15 px-3.5 py-1.5 text-xs font-semibold text-white hover:border-[#C99E4C]"
                >
                  تحويل إلى الجهة
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SmartRoutingSection selectedTarget={selectedTarget} onChangeTarget={setSelectedTarget} />

      <footer className="border-t border-white/10 bg-[#051216] py-8 px-6 text-center text-xs text-slate-400">
        {ARAAK_IDENTITY.groupName} — {ARAAK_IDENTITY.tagline} • الانتشار: {ARAAK_IDENTITY.reachMetric}
      </footer>
    </div>
  );
}

export default App;
