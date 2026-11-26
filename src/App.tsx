import React, { useState } from 'react';
import { AccessGateModal, VisitorAccessData } from './components/AccessGateModal';
import { FloatingNavbar } from './components/FloatingNavbar';
import { Hero } from './components/Hero';
import { SmartRoutingSection } from './components/SmartRoutingSection';
import {
  ARAAK_ENTITIES,
  ARAAK_IDENTITY,
  PortalSlide,
  STRATEGIC_AXES,
  StrategicAxis,
} from './data/araakPortalData';

const SECTORS = [
  'الكل',
  'التنموي والاستشاري',
  'التدريب والأكاديمية',
  'التجارة واللوجستيك',
  'الصناعة والحديد',
  'العقار والمشاريع',
] as const;

const SLIDE_ORDER: PortalSlide[] = ['hero', 'pillars', 'entities', 'routing'];

export function App() {
  const [activeSlide, setActiveSlide] = useState<PortalSlide>('hero');
  const [selectedTarget, setSelectedTarget] = useState(
    'أكاديمية أراك الإلكترونية (قسم القبول والتسجيل بالأكاديمية)'
  );
  const [activeSector, setActiveSector] = useState<(typeof SECTORS)[number]>('الكل');
  const [visitorData, setVisitorData] = useState<VisitorAccessData | null>(null);
  const [unlockedAxisIds, setUnlockedAxisIds] = useState<string[]>([]);
  const [pendingGateAxis, setPendingGateAxis] = useState<StrategicAxis | null>(null);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const goToSlide = (slide: PortalSlide, target?: string) => {
    if (target) setSelectedTarget(target);
    setActiveSlide(slide);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stepSlide = (direction: -1 | 1) => {
    const idx = SLIDE_ORDER.indexOf(activeSlide);
    const nextIdx = (idx + direction + SLIDE_ORDER.length) % SLIDE_ORDER.length;
    goToSlide(SLIDE_ORDER[nextIdx]);
  };

  const requestAxisDetailsAccess = (axis: StrategicAxis, actionAfterUnlock?: () => void) => {
    if (!axis.requiresGate || unlockedAxisIds.includes(axis.id)) {
      actionAfterUnlock?.();
      return;
    }
    setPendingGateAxis(axis);
    setPendingAction(() => actionAfterUnlock || null);
  };

  const handleUnlockGate = (data: VisitorAccessData) => {
    setVisitorData(data);
    if (pendingGateAxis) {
      setUnlockedAxisIds((prev) =>
        prev.includes(pendingGateAxis.id) ? prev : [...prev, pendingGateAxis.id]
      );
    }
    const cb = pendingAction;
    setPendingGateAxis(null);
    setPendingAction(null);
    cb?.();
  };

  const filteredEntities =
    activeSector === 'الكل'
      ? ARAAK_ENTITIES
      : ARAAK_ENTITIES.filter((e) => e.sector === activeSector);

  return (
    <div dir="rtl" className="min-h-screen bg-[#06161A] text-white font-sans flex flex-col justify-between">
      <style>{`
        @keyframes araakLtrMarquee {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .araak-ltr-marquee {
          display: flex;
          width: max-content;
          animation: araakLtrMarquee 36s linear infinite;
        }
        .araak-ltr-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <FloatingNavbar
        activeSlide={activeSlide}
        onSelectSlide={(slide) => goToSlide(slide)}
        onQuickRouting={() => goToSlide('routing', 'تحويل عام — مجموعة أراك للتنمية')}
      />

      <main className="flex-1">
        {activeSlide === 'hero' && <Hero onNavigateSlide={goToSlide} />}

        {/* شريحة التنمية والتدريب والاستشارات والمبادرات والإصدارات */}
        {activeSlide === 'pillars' && (
          <section className="mx-auto max-w-7xl px-6 pt-28 pb-16 space-y-12">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <span className="text-xs font-bold text-[#C99E4C]">الشريحة الثانية — المسارات والخدمات</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-1">
                  التنمية والتدريب والاستشارات والمبادرات
                </h2>
                <p className="text-sm text-slate-300 mt-1">
                  {visitorData
                    ? `مرحباً ${visitorData.name} — التفاصيل الكاملة مفتوحة لك وللتحويل المباشر.`
                    : 'أدخل الاسم والإيميل لفتح التفاصيل الكاملة لمحاور التدريب والاستشارات والتنمية والمبادرات.'}
                </p>
              </div>
              {visitorData && (
                <span className="rounded-xl border border-[#C99E4C]/35 bg-[#C99E4C]/10 px-4 py-2 text-xs text-[#F3D89B]">
                  تم فتح التفاصيل باسم: {visitorData.name}
                </span>
              )}
            </div>

            <div className="space-y-10">
              {STRATEGIC_AXES.map((axis) => {
                const isUnlocked = !axis.requiresGate || unlockedAxisIds.includes(axis.id);
                return (
                  <div
                    key={axis.id}
                    className="rounded-3xl border border-white/10 bg-[#0B1C2C]/70 backdrop-blur-xl p-6 md:p-8 space-y-6"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                      <div>
                        <span className="text-xs font-bold text-[#C99E4C]">محور {axis.code}</span>
                        <h3 className="text-2xl font-bold mt-0.5">{axis.title}</h3>
                        <p className="text-sm text-slate-300 mt-1">{axis.summary}</p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2.5">
                        {!isUnlocked && (
                          <button
                            type="button"
                            onClick={() => requestAxisDetailsAccess(axis)}
                            className="rounded-xl bg-[#C99E4C] px-4 py-2.5 text-xs font-bold text-[#06161A] hover:bg-[#dcaf59]"
                          >
                            دخول بالاسم والإيميل لعرض التفاصيل
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() =>
                            requestAxisDetailsAccess(axis, () =>
                              goToSlide('routing', `${axis.title} (${axis.routingLabel})`)
                            )
                          }
                          className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white hover:border-[#C99E4C]"
                        >
                          تحويل إلى {axis.routingLabel}
                        </button>
                      </div>
                    </div>

                    {isUnlocked ? (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {axis.branches.map((branch) => (
                          <div
                            key={branch.id}
                            className="rounded-2xl border border-white/10 bg-[#06161A]/80 p-5 space-y-3.5"
                          >
                            <div>
                              <h4 className="text-lg font-bold text-white">{branch.title}</h4>
                              <p className="text-xs text-slate-400 mt-0.5">{branch.subtitle}</p>
                            </div>

                            <ul className="space-y-2.5">
                              {branch.items.map((item) => (
                                <li
                                  key={item.title}
                                  className="rounded-xl border border-white/5 bg-[#0B1C2C]/75 p-3"
                                >
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="font-semibold text-xs sm:text-sm text-[#E8C882]">
                                      {item.title}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => goToSlide('routing', item.targetRouting)}
                                      className="text-xs underline text-slate-300 hover:text-white"
                                    >
                                      تحويل
                                    </button>
                                  </div>
                                  <p className="text-xs text-slate-300/85 mt-1 leading-relaxed">
                                    {item.description}
                                  </p>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-dashed border-[#C99E4C]/35 bg-[#06161A]/75 p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="text-sm font-bold text-[#E8C882]">
                            التفاصيل الكاملة لـ ({axis.title}) تتطلب تسجيل الاسم والإيميل
                          </div>
                          <p className="text-xs text-slate-300">
                            تضم {axis.branches.length} أقسام فرعية وبرامج تفصيلية ومسارات تحويل مباشرة للجهة المختصة.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => requestAxisDetailsAccess(axis)}
                          className="rounded-xl bg-[#C99E4C] px-5 py-2.5 text-xs font-bold text-[#06161A] hover:bg-[#dcaf59] shrink-0"
                        >
                          إدخال الاسم والإيميل للعرض
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* شريحة معرض شركات المجموعة والبطاقات الزجاجية + شريط متحرك LTR */}
        {activeSlide === 'entities' && (
          <section className="pt-28 pb-16 space-y-10 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 space-y-6">
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <span className="text-xs font-bold text-[#C99E4C]">الشريحة الثالثة — معرض الشركات والكيانات</span>
                  <h2 className="text-3xl md:text-4xl font-bold mt-1">
                    شركات ومؤسسات وكيانات مجموعة أراك
                  </h2>
                  <p className="text-sm text-slate-300 mt-1">
                    بطاقات زجاجية مصورة لكل كيان وشريط بيانات متحرك من اليسار إلى اليمين.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {SECTORS.map((sector) => (
                    <button
                      key={sector}
                      type="button"
                      onClick={() => setActiveSector(sector)}
                      className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
                        activeSector === sector
                          ? 'bg-[#C99E4C] text-[#06161A]'
                          : 'border border-white/15 bg-[#0B1C2C]/80 text-slate-200 hover:border-[#C99E4C]'
                      }`}
                    >
                      {sector}
                    </button>
                  ))}
                </div>
              </div>

              {/* شريط متحرك من اليسار إلى اليمين ببيانات الكيانات */}
              <div
                dir="ltr"
                className="w-full overflow-hidden rounded-2xl border border-[#C99E4C]/25 bg-[#0B1C2C]/70 backdrop-blur-xl py-3"
              >
                <div className="araak-ltr-marquee gap-4 px-2">
                  {[...filteredEntities, ...filteredEntities].map((entity, idx) => (
                    <div
                      key={`${entity.id}-ltr-${idx}`}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#06161A]/80 px-4 py-2 text-xs text-slate-200 whitespace-nowrap"
                    >
                      <span className="h-2 w-2 rounded-full bg-[#C99E4C]" />
                      <span className="font-bold text-[#E8C882]">{entity.name}</span>
                      <span className="text-slate-400">|</span>
                      <span>{entity.role}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-300">{entity.scope}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* بطاقات زجاجية مصورة لمعرض الشركات والكيانات */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEntities.map((entity) => (
                  <div
                    key={entity.id}
                    className="group relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl shadow-xl flex flex-col justify-between transition duration-300 hover:border-[#C99E4C]/60"
                  >
                    <div>
                      <div className="relative h-44 w-full overflow-hidden">
                        <img
                          src={entity.imageUrl}
                          alt={entity.name}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#06161A] via-[#06161A]/35 to-transparent" />
                        <span className="absolute top-3 right-3 rounded-full border border-white/20 bg-[#08191E]/75 px-3 py-1 text-[11px] font-semibold text-[#E8C882] backdrop-blur-md">
                          {entity.sector}
                        </span>
                      </div>

                      <div className="p-5 space-y-2">
                        <h3 className="text-xl font-bold text-white">{entity.name}</h3>
                        <div className="text-xs font-semibold text-[#C99E4C]">{entity.role}</div>
                        <p className="text-xs text-slate-200/90 leading-relaxed pt-1">{entity.scope}</p>
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-white/10">
                      <span className="text-[11px] text-slate-400">{entity.routingKey}</span>
                      <button
                        type="button"
                        onClick={() => goToSlide('routing', `${entity.name} — ${entity.role}`)}
                        className="rounded-xl bg-[#C99E4C]/15 border border-[#C99E4C]/40 px-3.5 py-1.5 text-xs font-bold text-[#F3D89B] transition hover:bg-[#C99E4C] hover:text-[#06161A]"
                      >
                        تحويل للجهة
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* شريحة بوابة التحويل للجهة المختصة */}
        {activeSlide === 'routing' && (
          <SmartRoutingSection
            selectedTarget={selectedTarget}
            onChangeTarget={setSelectedTarget}
            visitorData={visitorData}
          />
        )}
      </main>

      {/* شريط تنقل الشرائح السفلي والتذييل */}
      <div className="border-t border-white/10 bg-[#051216] px-6 py-6">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => stepSlide(-1)}
              className="rounded-xl border border-white/15 bg-[#0B1C2C] px-4 py-2 text-xs font-semibold text-white hover:border-[#C99E4C]"
            >
              الشريحة السابقة
            </button>
            <button
              type="button"
              onClick={() => stepSlide(1)}
              className="rounded-xl bg-[#C99E4C] px-4 py-2 text-xs font-bold text-[#06161A] hover:bg-[#dcaf59]"
            >
              الشريحة التالية
            </button>
          </div>

          <div className="text-xs text-slate-400 text-center sm:text-left">
            {ARAAK_IDENTITY.groupName} — {ARAAK_IDENTITY.tagline} • الانتشار: {ARAAK_IDENTITY.reachMetric}
          </div>
        </div>
      </div>

      <AccessGateModal
        isOpen={Boolean(pendingGateAxis)}
        axisTitle={pendingGateAxis?.title || ''}
        initialData={visitorData}
        onClose={() => {
          setPendingGateAxis(null);
          setPendingAction(null);
        }}
        onUnlock={handleUnlockGate}
      />
    </div>
  );
}

export default App;
