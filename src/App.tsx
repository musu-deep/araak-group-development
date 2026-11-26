import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AccessGateModal, VisitorAccessData } from './components/AccessGateModal';
import { FloatingNavbar } from './components/FloatingNavbar';
import { SmartRoutingSection } from './components/SmartRoutingSection';
import {
  ARAAK_COMPANIES,
  ARAAK_IDENTITY,
  DEVELOPMENTAL_AXES,
  INITIATIVES_AND_PUBLICATIONS,
  SCENE_META,
  SceneId,
  StrategicAxis,
} from './data/araakPortalData';

const STORAGE_KEY = 'araak_portal_visitor_access_v2';

export function App() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [selectedTarget, setSelectedTarget] = useState(
    'أكاديمية أراك الإلكترونية (قسم القبول والتسجيل بالأكاديمية)'
  );
  const [featuredCompanyId, setFeaturedCompanyId] = useState(ARAAK_COMPANIES[0].id);
  const [marqueePaused, setMarqueePaused] = useState(false);

  const [visitorData, setVisitorData] = useState<VisitorAccessData | null>(null);
  const [unlockedAxisIds, setUnlockedAxisIds] = useState<string[]>([]);
  const [pendingGateAxis, setPendingGateAxis] = useState<StrategicAxis | null>(null);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const lockRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);
  const sceneScrollRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { visitor?: VisitorAccessData; unlocked?: string[] };
        if (parsed.visitor?.name && parsed.visitor?.email) setVisitorData(parsed.visitor);
        if (Array.isArray(parsed.unlocked)) setUnlockedAxisIds(parsed.unlocked);
      }
    } catch {
      // تجاهل
    }
  }, []);

  const persistAccess = (visitor: VisitorAccessData, unlocked: string[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ visitor, unlocked }));
    } catch {
      // تجاهل
    }
  };

  const goToSceneIndex = useCallback((nextIndex: number, target?: string) => {
    const bounded = Math.max(0, Math.min(SCENE_META.length - 1, nextIndex));
    if (target) setSelectedTarget(target);
    setSceneIndex(bounded);
    const el = sceneScrollRefs.current[bounded];
    if (el) el.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goToSceneId = useCallback(
    (id: SceneId, target?: string) => {
      const idx = SCENE_META.findIndex((s) => s.id === id);
      if (idx !== -1) goToSceneIndex(idx, target);
    },
    [goToSceneIndex]
  );

  const triggerStep = useCallback(
    (delta: -1 | 1) => {
      if (lockRef.current || pendingGateAxis) return;
      const next = sceneIndex + delta;
      if (next < 0 || next >= SCENE_META.length) return;
      lockRef.current = true;
      goToSceneIndex(next);
      setTimeout(() => {
        lockRef.current = false;
      }, 780);
    },
    [sceneIndex, goToSceneIndex, pendingGateAxis]
  );

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (pendingGateAxis) return;
      const activeContainer = sceneScrollRefs.current[sceneIndex];
      if (activeContainer) {
        const { scrollTop, scrollHeight, clientHeight } = activeContainer;
        const canScrollDown = scrollTop + clientHeight < scrollHeight - 6;
        const canScrollUp = scrollTop > 6;
        if (e.deltaY > 25 && canScrollDown) return;
        if (e.deltaY < -25 && canScrollUp) return;
      }
      if (Math.abs(e.deltaY) < 28) return;
      triggerStep(e.deltaY > 0 ? 1 : -1);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (pendingGateAxis) return;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        triggerStep(1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        triggerStep(-1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [sceneIndex, triggerStep, pendingGateAxis]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartYRef.current === null || pendingGateAxis) return;
    const diff = touchStartYRef.current - e.changedTouches[0].clientY;
    touchStartYRef.current = null;
    if (Math.abs(diff) < 55) return;

    const activeContainer = sceneScrollRefs.current[sceneIndex];
    if (activeContainer) {
      const { scrollTop, scrollHeight, clientHeight } = activeContainer;
      if (diff > 0 && scrollTop + clientHeight < scrollHeight - 6) return;
      if (diff < 0 && scrollTop > 6) return;
    }
    triggerStep(diff > 0 ? 1 : -1);
  };

  const requestAxisAccess = (axis: StrategicAxis, afterUnlock?: () => void) => {
    if (!axis.requiresGate || unlockedAxisIds.includes(axis.id)) {
      afterUnlock?.();
      return;
    }
    setPendingGateAxis(axis);
    setPendingAction(() => afterUnlock || null);
  };

  const handleUnlockGate = (data: VisitorAccessData) => {
    setVisitorData(data);
    const nextUnlocked = pendingGateAxis
      ? unlockedAxisIds.includes(pendingGateAxis.id)
        ? unlockedAxisIds
        : [...unlockedAxisIds, pendingGateAxis.id]
      : unlockedAxisIds;
    setUnlockedAxisIds(nextUnlocked);
    persistAccess(data, nextUnlocked);
    const cb = pendingAction;
    setPendingGateAxis(null);
    setPendingAction(null);
    cb?.();
  };

  const featuredCompany =
    ARAAK_COMPANIES.find((c) => c.id === featuredCompanyId) || ARAAK_COMPANIES[0];

  const renderAxisGrid = (axes: StrategicAxis[]) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {axes.map((axis) => {
        const isUnlocked = !axis.requiresGate || unlockedAxisIds.includes(axis.id);
        return (
          <div
            key={axis.id}
            className="rounded-3xl border border-white/15 bg-[#08191E]/75 backdrop-blur-2xl overflow-hidden flex flex-col justify-between shadow-2xl"
          >
            <div className="p-6 space-y-5">
              {/* بطاقة صورة عالية الدقة داخل حاوية المحور */}
              <div className="relative h-44 w-full overflow-hidden rounded-2xl border border-white/10">
                <img
                  src={axis.imageUrl}
                  alt={axis.imageAlt}
                  className="h-full w-full object-cover object-center transition duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08191E] via-[#08191E]/35 to-transparent" />
                <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between gap-2">
                  <span className="rounded-lg border border-[#C99E4C]/40 bg-[#06161A]/85 px-3 py-1 text-xs font-bold text-[#F3D89B] backdrop-blur-md">
                    محور {axis.code} — {axis.title}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">{axis.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">{axis.summary}</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    requestAxisAccess(axis, () =>
                      goToSceneId('routing', `${axis.title} (${axis.routingLabel})`)
                    )
                  }
                  className="rounded-xl border border-[#C99E4C]/45 bg-[#C99E4C]/15 px-3.5 py-2 text-xs font-bold text-[#F3D89B] hover:bg-[#C99E4C] hover:text-[#06161A] transition"
                >
                  تحويل للجهة
                </button>
              </div>

              {isUnlocked ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  {axis.branches.map((branch) => (
                    <div
                      key={branch.id}
                      className="rounded-2xl border border-white/10 bg-[#06161A]/85 p-4 space-y-2.5"
                    >
                      <div className="text-sm font-bold text-[#E8C882]">{branch.title}</div>
                      <ul className="space-y-2">
                        {branch.items.map((item) => (
                          <li
                            key={item.title}
                            className="rounded-xl border border-white/5 bg-[#0B1C2C]/80 p-2.5"
                          >
                            <div className="flex items-center justify-between gap-1.5">
                              <span className="text-xs font-semibold text-white">{item.title}</span>
                              <button
                                type="button"
                                onClick={() => goToSceneId('routing', item.targetRouting)}
                                className="text-[11px] text-[#C99E4C] hover:underline shrink-0"
                              >
                                تحويل
                              </button>
                            </div>
                            <p className="text-[11px] text-slate-300/85 mt-1 leading-relaxed">
                              {item.description}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-[#C99E4C]/40 bg-[#06161A]/80 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-[#E8C882]">
                      افتح المسارات التفصيلية لـ ({axis.title})
                    </div>
                    <p className="text-xs text-slate-300">
                      سجّل الاسم والبريد الإلكتروني لمرة واحدة لاستعراض التفاصيل الكاملة ومسارات التحويل.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => requestAxisAccess(axis)}
                    className="rounded-xl bg-[#C99E4C] px-5 py-2.5 text-xs font-bold text-[#06161A] hover:bg-[#dcaf59] shrink-0"
                  >
                    دخول بالاسم والإيميل
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div
      dir="rtl"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative h-screen w-screen overflow-hidden bg-[#06161A] text-white font-sans select-none"
    >
      <style>{`
        @keyframes araakLtrMarquee {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .araak-ltr-marquee {
          display: flex;
          width: max-content;
          animation: araakLtrMarquee 34s linear infinite;
        }
        .araak-ltr-marquee.paused,
        .araak-ltr-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <FloatingNavbar
        activeScene={SCENE_META[sceneIndex].id}
        isElevated={sceneIndex > 0}
        onSelectScene={goToSceneId}
        onQuickRouting={() => goToSceneId('routing', 'تحويل عام — مجموعة أراك للتنمية')}
      />

      <aside
        aria-label="التنقل بين المشاهد"
        className="fixed left-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-[#06161A]/55 backdrop-blur-xl py-4 px-2.5"
      >
        {SCENE_META.map((scene, idx) => {
          const active = idx === sceneIndex;
          return (
            <button
              key={scene.id}
              type="button"
              onClick={() => goToSceneIndex(idx)}
              title={scene.shortTitle}
              className="group relative flex items-center justify-center p-1"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  active ? 'h-8 w-2 bg-[#C99E4C]' : 'h-2.5 w-2.5 bg-white/30 group-hover:bg-white/70'
                }`}
              />
            </button>
          );
        })}
      </aside>

      <div
        className="h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: `translateY(-${sceneIndex * 100}vh)` }}
      >
        {/* المشهد 1: الهوية السيادية */}
        <section className="relative h-screen w-screen overflow-hidden flex items-end">
          <img
            src={SCENE_META[0].bgImage}
            alt={ARAAK_IDENTITY.groupName}
            className="absolute inset-0 h-full w-full object-cover object-center scale-105 opacity-75"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(6,22,26,0.45) 0%, rgba(6,22,26,0.75) 55%, rgba(6,22,26,0.97) 100%)',
            }}
          />

          <div
            ref={(el) => (sceneScrollRefs.current[0] = el)}
            className="relative z-10 h-full w-full overflow-y-auto flex items-end"
          >
            <div className="mx-auto w-full max-w-7xl px-6 pt-28 pb-20">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
                <div className="lg:col-span-8 space-y-6">
                  <div className="inline-flex items-center gap-3 rounded-full border border-[#C99E4C]/40 bg-[#0B1C2C]/80 px-4 py-1.5 text-xs sm:text-sm text-[#E8C882] backdrop-blur-md">
                    <span>{SCENE_META[0].eyebrow}</span>
                    <span className="opacity-50">•</span>
                    <span>{ARAAK_IDENTITY.reachMetric}</span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white">
                    {ARAAK_IDENTITY.tagline}
                  </h1>

                  <p className="max-w-3xl text-base sm:text-xl leading-relaxed text-slate-200/90">
                    {ARAAK_IDENTITY.aboutSummary}
                  </p>

                  <div className="flex flex-wrap items-center gap-3.5 pt-2">
                    <button
                      type="button"
                      onClick={() => goToSceneId('developmental')}
                      className="rounded-xl bg-[#C99E4C] px-6 py-3.5 text-sm font-bold text-[#06161A] transition hover:bg-[#dcaf59]"
                    >
                      المسار التنموي والاستشارات
                    </button>
                    <button
                      type="button"
                      onClick={() => goToSceneId('investment')}
                      className="rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:border-[#C99E4C] hover:bg-white/15"
                    >
                      المسار الاستثماري وشركات المجموعة
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-4 rounded-3xl border border-white/15 bg-[#091B22]/80 p-6 backdrop-blur-2xl space-y-5 shadow-2xl">
                  <div className="border-b border-white/10 pb-4">
                    <div className="text-xs text-[#C99E4C]">{ARAAK_IDENTITY.reachLabel}</div>
                    <div className="mt-1 text-4xl font-bold text-white">{ARAAK_IDENTITY.reachMetric}</div>
                  </div>

                  <div>
                    <div className="text-xs text-slate-300 mb-2">القيم المؤسسية الحاكمة</div>
                    <div className="flex flex-wrap gap-2">
                      {ARAAK_IDENTITY.values.map((val) => (
                        <span
                          key={val}
                          className="rounded-xl border border-[#C99E4C]/35 bg-[#C99E4C]/10 px-3.5 py-1.5 text-xs font-bold text-[#F3D89B]"
                        >
                          {val}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-1 flex items-center justify-between text-xs text-slate-300">
                    <span>10 شركات متخصصة + 4 محاور تنموية</span>
                    <button
                      type="button"
                      onClick={() => triggerStep(1)}
                      className="text-[#C99E4C] font-bold hover:underline"
                    >
                      اسحب للأسفل ↓
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* المشهد 2: المسار التنموي والتدريب والاستشارات */}
        <section className="relative h-screen w-screen overflow-hidden">
          <img
            src={SCENE_META[1].bgImage}
            alt={SCENE_META[1].shortTitle}
            className="absolute inset-0 h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#06161A]/85 via-[#06161A]/90 to-[#06161A]/98" />

          <div
            ref={(el) => (sceneScrollRefs.current[1] = el)}
            className="relative z-10 h-full w-full overflow-y-auto"
          >
            <div className="mx-auto max-w-7xl px-6 pt-28 pb-24 space-y-8">
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs font-bold text-[#C99E4C]">{SCENE_META[1].eyebrow}</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mt-1">
                    التنمية والتدريب والاستشارات والاعتمادات
                  </h2>
                </div>
                {visitorData && (
                  <span className="rounded-xl border border-[#C99E4C]/35 bg-[#C99E4C]/10 px-4 py-2 text-xs text-[#F3D89B]">
                    مرحباً {visitorData.name} — التفاصيل مفتوحة
                  </span>
                )}
              </div>

              {renderAxisGrid(DEVELOPMENTAL_AXES)}
            </div>
          </div>
        </section>

        {/* المشهد 3: المسار الاستثماري وشركات المجموعة الـ 10 + شريط متحرك LTR */}
        <section className="relative h-screen w-screen overflow-hidden">
          <img
            src={featuredCompany.imageUrl}
            alt={featuredCompany.name}
            className="absolute inset-0 h-full w-full object-cover opacity-30 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#06161A]/85 via-[#06161A]/88 to-[#06161A]/98" />

          <div
            ref={(el) => (sceneScrollRefs.current[2] = el)}
            className="relative z-10 h-full w-full overflow-y-auto"
          >
            <div className="mx-auto max-w-7xl px-6 pt-28 pb-24 space-y-7">
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs font-bold text-[#C99E4C]">{SCENE_META[2].eyebrow}</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mt-1">
                    منظومة شركات مجموعة أراك
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setMarqueePaused((p) => !p)}
                  className="rounded-xl border border-white/15 bg-[#0B1C2C]/80 px-3.5 py-2 text-xs text-slate-200 hover:border-[#C99E4C]"
                >
                  {marqueePaused ? 'تشغيل الشريط المتحرك' : 'إيقاف الشريط مؤقتاً'}
                </button>
              </div>

              <div
                dir="ltr"
                className="w-full overflow-hidden rounded-2xl border border-[#C99E4C]/30 bg-[#091B22]/75 backdrop-blur-xl py-2.5"
              >
                <div className={`araak-ltr-marquee gap-3.5 px-2 ${marqueePaused ? 'paused' : ''}`}>
                  {[...ARAAK_COMPANIES, ...ARAAK_COMPANIES].map((comp, idx) => (
                    <button
                      key={`${comp.id}-bar-${idx}`}
                      type="button"
                      onClick={() => setFeaturedCompanyId(comp.id)}
                      className={`flex items-center gap-2.5 rounded-xl border px-4 py-2 text-xs whitespace-nowrap transition ${
                        featuredCompany.id === comp.id
                          ? 'border-[#C99E4C] bg-[#C99E4C]/20 text-white'
                          : 'border-white/10 bg-[#06161A]/80 text-slate-200 hover:border-[#C99E4C]/50'
                      }`}
                    >
                      <span className="font-mono text-[#C99E4C]">{comp.code}</span>
                      <span className="font-bold text-[#E8C882]">{comp.name}</span>
                      <span className="text-slate-400">•</span>
                      <span>{comp.headline}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                <div className="lg:col-span-5 rounded-3xl border border-[#C99E4C]/35 bg-[#091B22]/85 backdrop-blur-2xl overflow-hidden flex flex-col justify-between shadow-2xl">
                  <div>
                    <div className="relative h-52 w-full overflow-hidden">
                      <img
                        src={featuredCompany.imageUrl}
                        alt={featuredCompany.name}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#091B22] via-transparent to-transparent" />
                      <span className="absolute top-4 right-4 rounded-full border border-white/20 bg-[#06161A]/80 px-3.5 py-1 text-xs font-bold text-[#E8C882] backdrop-blur-md">
                        {featuredCompany.sector}
                      </span>
                    </div>
                    <div className="p-6 space-y-2.5">
                      <div className="text-xs font-mono text-[#C99E4C]">كيان رقم {featuredCompany.code}</div>
                      <h3 className="text-2xl font-bold text-white">{featuredCompany.name}</h3>
                      <div className="text-sm font-semibold text-[#E8C882]">{featuredCompany.headline}</div>
                      <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed pt-1">
                        {featuredCompany.scope}
                      </p>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <button
                      type="button"
                      onClick={() => goToSceneId('routing', featuredCompany.routingKey)}
                      className="w-full rounded-xl bg-[#C99E4C] py-3 text-xs sm:text-sm font-bold text-[#06161A] hover:bg-[#dcaf59] transition"
                    >
                      تحويل طلب مباشر إلى {featuredCompany.name}
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-2 gap-3.5">
                  {ARAAK_COMPANIES.map((comp) => {
                    const selected = comp.id === featuredCompany.id;
                    return (
                      <div
                        key={comp.id}
                        onMouseEnter={() => setFeaturedCompanyId(comp.id)}
                        onClick={() => setFeaturedCompanyId(comp.id)}
                        className={`cursor-pointer rounded-2xl border p-4 backdrop-blur-xl transition-all flex flex-col justify-between gap-2 ${
                          selected
                            ? 'border-[#C99E4C] bg-[#C99E4C]/15 shadow-lg'
                            : 'border-white/10 bg-[#091B22]/65 hover:border-white/30'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-[#C99E4C] font-mono">{comp.code}</span>
                            <span className="text-slate-400">{comp.sector}</span>
                          </div>
                          <h4 className="text-base font-bold text-white mt-1">{comp.name}</h4>
                          <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-2">{comp.headline}</p>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px]">
                          <span className="text-[#E8C882]">معاينة التفاصيل</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              goToSceneId('routing', comp.routingKey);
                            }}
                            className="underline text-slate-200 hover:text-white"
                          >
                            تحويل
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* المشهد 4: المشاريع والمبادرات والإصدارات التنموية */}
        <section className="relative h-screen w-screen overflow-hidden">
          <img
            src={SCENE_META[3].bgImage}
            alt={SCENE_META[3].shortTitle}
            className="absolute inset-0 h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#06161A]/85 via-[#06161A]/90 to-[#06161A]/98" />

          <div
            ref={(el) => (sceneScrollRefs.current[3] = el)}
            className="relative z-10 h-full w-full overflow-y-auto"
          >
            <div className="mx-auto max-w-7xl px-6 pt-28 pb-24 space-y-8">
              <div className="border-b border-white/10 pb-4">
                <span className="text-xs font-bold text-[#C99E4C]">{SCENE_META[3].eyebrow}</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mt-1">
                  المشاريع والمبادرات والإصدارات التنموية
                </h2>
              </div>

              {renderAxisGrid(INITIATIVES_AND_PUBLICATIONS)}
            </div>
          </div>
        </section>

        {/* المشهد 5: بوابة التحويل للجهات المختصة */}
        <section className="relative h-screen w-screen overflow-hidden">
          <img
            src={SCENE_META[4].bgImage}
            alt={SCENE_META[4].shortTitle}
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#06161A]/85 via-[#06161A]/92 to-[#06161A]/98" />

          <div
            ref={(el) => (sceneScrollRefs.current[4] = el)}
            className="relative z-10 h-full w-full overflow-y-auto"
          >
            <SmartRoutingSection
              selectedTarget={selectedTarget}
              onChangeTarget={setSelectedTarget}
              visitorData={visitorData}
            />
          </div>
        </section>
      </div>

      <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-7xl rounded-2xl border border-white/10 bg-[#06161A]/70 backdrop-blur-xl px-5 py-2.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={sceneIndex === 0}
            onClick={() => triggerStep(-1)}
            className="rounded-xl border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white disabled:opacity-35 hover:border-[#C99E4C]"
          >
            ↑ المشهد السابق
          </button>
          <button
            type="button"
            disabled={sceneIndex === SCENE_META.length - 1}
            onClick={() => triggerStep(1)}
            className="rounded-xl bg-[#C99E4C] px-3.5 py-1.5 text-xs font-bold text-[#06161A] disabled:opacity-35 hover:bg-[#dcaf59]"
          >
            ↓ المشهد التالي
          </button>
        </div>

        <div className="text-[11px] sm:text-xs text-slate-300">
          {SCENE_META[sceneIndex].eyebrow} — {SCENE_META[sceneIndex].shortTitle}
        </div>
      </footer>

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
