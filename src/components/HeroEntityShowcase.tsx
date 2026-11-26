import React, { useEffect, useState } from 'react';
import { SceneId } from '../data/araakPortalData';

export interface HeroEntitySlide {
  id: string;
  code: string;
  enBadge: string;
  arabicTitle: string;
  subtitle: string;
  description: string;
  highlights: string[];
  imageUrl: string;
  targetScene: SceneId;
  routingTarget: string;
}

const HERO_ENTITY_SLIDES: HeroEntitySlide[] = [
  {
    id: 'araak-development',
    code: '01',
    enBadge: 'ARAAK DEVELOPMENT',
    arabicTitle: 'أراك التنمية',
    subtitle: 'التنمية البشرية والاستشارات وتطوير الأعمال',
    description:
      'تطوير العنصر البشري وتعزيز قدراته في شتى مجالات الحياة عبر فرق مؤهلة وبرامج مبتكرة علمياً وعملياً لبناء مجتمع حضاري.',
    highlights: ['الاستشارات الاستراتيجية', 'تطوير الأعمال', 'الحلول التعليمية'],
    imageUrl:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=85',
    targetScene: 'developmental',
    routingTarget: 'أراك التنمية',
  },
  {
    id: 'araak-trading',
    code: '02',
    enBadge: 'ARAAK TRADING CO.',
    arabicTitle: 'أراك التجارية',
    subtitle: 'توريد مواد البناء والتعاقد من الباطن المتخصص',
    description:
      'توريد مواد بناء عالية الجودة وتنفيذ خدمات التعاقد من الباطن المتخصصة المهنية للمقاولين وتجار الجملة والتجزئة وأصحاب المشاريع.',
    highlights: ['مواد بناء معتمدة', 'تعاقدات متخصصة', 'سلاسل إمداد للمشاريع'],
    imageUrl:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=85',
    targetScene: 'investment',
    routingTarget: 'أراك التجارية',
  },
  {
    id: 'araak-stores',
    code: '03',
    enBadge: 'ARAAK STORES',
    arabicTitle: 'أراك ستورز',
    subtitle: 'المنتجات المنزلية ومستلزمات الديكور العصرية',
    description:
      'متجر سعودي غير تقليدي يضم أحدث المنتجات المنزلية ومستلزمات الديكور بتجربة اقتناء وتجهيز متكاملة للمنازل والمساحات الحديثة.',
    highlights: ['تصاميم منزلية حديثة', 'مستلزمات الديكور', 'تجربة تسوق متكاملة'],
    imageUrl:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=85',
    targetScene: 'investment',
    routingTarget: 'أراك ستورز',
  },
  {
    id: 'araak-profile',
    code: '04',
    enBadge: 'ARAAK PROFILE',
    arabicTitle: 'مصنع أراك للحديد',
    subtitle: 'الصلب المجلفن والمدرفل وأنظمة الأسقف والقواطع',
    description:
      'تصنيع الصفائح عالية الجودة من الصلب المجلفن ولفائف الصلب المدرفلة على الساخن والبارد، وقواطع الحوائط الجافة وإكسسوارات الأسقف الفولاذية.',
    highlights: ['صلب مجلفن ومدرفل', 'قواطع حوائط جافة', 'إكسسوارات أسقف فولاذية'],
    imageUrl:
      'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1400&q=85',
    targetScene: 'investment',
    routingTarget: 'أراك الحديد',
  },
  {
    id: 'araak-academy',
    code: '05',
    enBadge: 'ARAAK ACADEMY',
    arabicTitle: 'أكاديمية أراك',
    subtitle: 'المنصة الرقمية للتدريب والتأهيل والاعتمادات',
    description:
      'منصة إلكترونية متكاملة تقدم خدمات وبرامج أراك التدريبية والتعليمية بطريقة تقنية حديثة وسهلة الاستخدام للأفراد والمؤسسات.',
    highlights: ['دبلومات مهنية', 'دورات تخصصية', 'برامج تنموية معتمدة'],
    imageUrl:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=85',
    targetScene: 'developmental',
    routingTarget: 'أكاديمية أراك',
  },
];

interface HeroEntityShowcaseProps {
  onNavigateScene: (scene: SceneId) => void;
  onDirectContact: (targetName: string) => void;
}

export const HeroEntityShowcase: React.FC<HeroEntityShowcaseProps> = ({
  onNavigateScene,
  onDirectContact,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (window.location.hash === '#sites') {
      setActiveIndex(0);
    }
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_ENTITY_SLIDES.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  const current = HERO_ENTITY_SLIDES[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + HERO_ENTITY_SLIDES.length) % HERO_ENTITY_SLIDES.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % HERO_ENTITY_SLIDES.length);
  };

  return (
    <div
      id="sites"
      dir="rtl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="mt-8 rounded-3xl border border-[#C99E4C]/30 bg-[#06161A]/85 backdrop-blur-2xl shadow-2xl overflow-hidden"
    >
      {/* شريط التبويب العلوي للكيانات */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-[#041013]/80 px-4 py-3 md:px-6">
        <div className="flex flex-wrap items-center gap-1.5">
          {HERO_ENTITY_SLIDES.map((slide, idx) => {
            const active = idx === activeIndex;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all duration-300 ${
                  active
                    ? 'bg-[#C99E4C] text-[#06161A] shadow-md'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="ml-1.5 opacity-75">{slide.code}</span>
                {slide.arabicTitle}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-[11px] font-semibold text-slate-400">
            {activeIndex + 1} / {HERO_ENTITY_SLIDES.length}
          </span>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="الكيان السابق"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-slate-200 transition hover:border-[#C99E4C] hover:text-[#F3D89B]"
          >
            &#8594;
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="الكيان التالي"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-slate-200 transition hover:border-[#C99E4C] hover:text-[#F3D89B]"
          >
            &#8592;
          </button>
        </div>
      </div>

      {/* محتوى الشريحة النشطة */}
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-full border border-[#C99E4C]/40 bg-[#C99E4C]/15 px-3 py-0.5 text-[11px] font-extrabold tracking-widest text-[#F3D89B]" dir="ltr">
                {current.enBadge}
              </span>
              <span className="text-xs font-semibold text-slate-300">{current.subtitle}</span>
            </div>

            <h3 className="text-2xl md:text-3xl font-extrabold text-white">
              {current.arabicTitle}
            </h3>

            <p className="text-sm md:text-base text-slate-200 leading-relaxed">
              {current.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {current.highlights.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigateScene(current.targetScene)}
                className="rounded-xl bg-[#C99E4C] px-5 py-2.5 text-xs sm:text-sm font-extrabold text-[#06161A] transition hover:bg-[#dcaf59]"
              >
                استعراض {current.arabicTitle}
              </button>
              <button
                type="button"
                onClick={() => onDirectContact(current.routingTarget)}
                className="rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-xs sm:text-sm font-bold text-white transition hover:border-[#C99E4C] hover:text-[#F3D89B]"
              >
                تواصل مباشر مع الجهة
              </button>
            </div>

            {/* مؤشرات النقاط */}
            <div className="flex items-center gap-1.5">
              {HERO_ENTITY_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={slide.arabicTitle}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === activeIndex ? 'w-7 bg-[#C99E4C]' : 'w-2 bg-white/25 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* الصورة البصرية للكيان مع تدرج متناغم */}
        <div className="lg:col-span-5 relative min-h-[220px] lg:min-h-[290px] overflow-hidden">
          <img
            key={current.imageUrl}
            src={current.imageUrl}
            alt={current.arabicTitle}
            className="h-full w-full object-cover transition-transform duration-700 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-[#06161A] via-[#06161A]/35 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-200">
            <span className="rounded-lg bg-[#06161A]/80 backdrop-blur-md border border-white/10 px-3 py-1 font-bold text-[#F3D89B]">
              منظومة مجموعة أراك
            </span>
            <span className="rounded-lg bg-[#06161A]/80 backdrop-blur-md border border-white/10 px-2.5 py-1 font-mono text-[11px] text-slate-300" dir="ltr">
              {current.enBadge}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
