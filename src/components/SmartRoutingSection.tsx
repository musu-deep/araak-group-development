import React, { useEffect, useMemo, useState } from 'react';
import {
  ARAAK_COMPANIES,
  ARAAK_IDENTITY,
  DEVELOPMENTAL_AXES,
  INITIATIVES_AND_PUBLICATIONS,
} from '../data/araakPortalData';
import { VisitorAccessData } from './AccessGateModal';

interface SmartRoutingSectionProps {
  selectedTarget: string;
  onChangeTarget: (target: string) => void;
  visitorData: VisitorAccessData | null;
}

interface ContactOption {
  id: string;
  shortName: string;
  fullLabel: string;
  email: string;
}

const REQUESTER_TYPES = [
  'جهة مؤسسية / شركة',
  'جهة تعليمية أو تدريبية',
  'منظمة / مبادرة مجتمعية',
  'مستثمر / شريك استراتيجي',
  'مستفيد / باحث / متدرب',
] as const;

const SOCIAL_ACCOUNTS = [
  { platform: 'الموقع الإلكتروني', handle: 'araak.org', url: 'https://araak.org' },
  { platform: 'منصة X', handle: '@AraakGroup', url: 'https://x.com' },
  { platform: 'لينكدإن', handle: 'Araak Development Group', url: 'https://linkedin.com' },
  { platform: 'إنستغرام ويوتيوب', handle: '@AraakDev', url: 'https://instagram.com' },
];

// مولد مصفوفة QR حتمي ومستقر يعكس نص الرابط والرمز المرجعي
function buildQrMatrix(seedText: string, size = 21): boolean[][] {
  const matrix: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));

  const placeFinder = (rowStart: number, colStart: number) => {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const rr = rowStart + r;
        const cc = colStart + c;
        if (rr < 0 || rr >= size || cc < 0 || cc >= size) continue;
        const isBorder = r === 0 || r === 6 || c === 0 || c === 6;
        const isCenter = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        matrix[rr][cc] = isBorder || isCenter;
      }
    }
  };

  placeFinder(0, 0);
  placeFinder(0, size - 7);
  placeFinder(size - 7, 0);

  let hash = 2166136261;
  for (let i = 0; i < seedText.length; i++) {
    hash ^= seedText.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const inTopLeft = r >= 0 && r <= 7 && c >= 0 && c <= 7;
      const inTopRight = r >= 0 && r <= 7 && c >= size - 8 && c < size;
      const inBottomLeft = r >= size - 8 && r < size && c >= 0 && c <= 7;
      if (inTopLeft || inTopRight || inBottomLeft) continue;

      hash = Math.imul(hash ^ (r * 31 + c * 17 + 1), 1664525) + 1013904223;
      matrix[r][c] = ((hash >>> 16) & 1) === 1;
    }
  }

  return matrix;
}

export const SmartRoutingSection: React.FC<SmartRoutingSectionProps> = ({
  selectedTarget,
  onChangeTarget,
  visitorData,
}) => {
  const [requesterType, setRequesterType] = useState<(typeof REQUESTER_TYPES)[number]>('جهة مؤسسية / شركة');
  const [organizationName, setOrganizationName] = useState('');
  const [contactName, setContactName] = useState(visitorData?.name || '');
  const [contactInfo, setContactInfo] = useState(visitorData?.email || '');
  const [details, setDetails] = useState('');
  const [copied, setCopied] = useState(false);

  const referenceCode = useMemo(() => {
    const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    return `ARK-${stamp}-01`;
  }, []);

  useEffect(() => {
    if (visitorData?.name && !contactName) setContactName(visitorData.name);
    if (visitorData?.email && !contactInfo) setContactInfo(visitorData.email);
  }, [visitorData, contactName, contactInfo]);

  const contactOptions: ContactOption[] = useMemo(() => {
    const axes = [...DEVELOPMENTAL_AXES, ...INITIATIVES_AND_PUBLICATIONS].map((axis) => ({
      id: `axis-${axis.id}`,
      shortName: axis.title,
      fullLabel: `${axis.title} (${axis.routingLabel})`,
      email: axis.contactEmail,
    }));

    const companies = ARAAK_COMPANIES.map((company) => ({
      id: `company-${company.id}`,
      shortName: company.name,
      fullLabel: `${company.name} — ${company.headline}`,
      email: 'info@araak.org',
    }));

    return [...axes, ...companies];
  }, []);

  const activeOption =
    contactOptions.find(
      (opt) => opt.fullLabel === selectedTarget || opt.shortName === selectedTarget
    ) || contactOptions[0];

  const targetLabel = activeOption?.fullLabel || selectedTarget;
  const targetEmail = activeOption?.email || 'info@araak.org';

  const qrPayload = `https://araak.org/contact?ref=${referenceCode}&entity=${encodeURIComponent(
    activeOption?.shortName || 'araak'
  )}`;
  const qrMatrix = useMemo(() => buildQrMatrix(qrPayload, 21), [qrPayload]);

  const builtSummary = [
    `الرقم المرجعي: ${referenceCode}`,
    `جهة التواصل: ${activeOption?.shortName || targetLabel}`,
    `تصنيف مقدم الطلب: ${requesterType}`,
    `الجهة / المؤسسة الطالبة: ${organizationName.trim() || 'غير محدد'}`,
    `مقدم الطلب: ${contactName.trim() || 'غير محدد'}`,
    `وسيلة التواصل: ${contactInfo.trim() || 'غير محدد'}`,
    `ملخص الرسالة: ${details.trim() || 'طلب تواصل مباشر مع الجهة المختصة'}`,
  ].join('\n');

  const handleCopySummary = async () => {
    await navigator.clipboard.writeText(builtSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const mailtoHref = `mailto:${encodeURIComponent(targetEmail)}?subject=${encodeURIComponent(
    `[${referenceCode}] التواصل مع أراك — ${activeOption?.shortName || targetLabel}`
  )}&body=${encodeURIComponent(builtSummary)}`;

  return (
    <div
      dir="rtl"
      className="mx-auto w-full max-w-6xl px-6 pt-28 pb-14"
      style={{ fontFamily: `"Cairo", "Noto Sans Arabic", "IBM Plex Arabic", sans-serif` }}
    >
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold tracking-wider text-[#C99E4C]">التواصل المباشر</span>
          <h2 className="mt-1 text-3xl md:text-4xl font-extrabold text-white">التواصل مع أراك</h2>
          <p className="mt-1 text-sm text-slate-300">
            اختر جهة التواصل من البطاقات أدناه وأرسل رسالتك مباشرة إلى الجهة المعنية.
          </p>
        </div>
        <span className="rounded-xl border border-[#C99E4C]/35 bg-[#0B1C2C]/85 px-4 py-2 text-xs font-semibold text-[#E8C882] backdrop-blur-md">
          الرقم المرجعي: {referenceCode}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 rounded-3xl border border-white/15 bg-[#091B22]/85 backdrop-blur-2xl p-6 md:p-8 shadow-2xl">
        {/* الجزء الأيمن: شعار المجموعة، العناوين، أرقام التواصل، السوشال ميديا، ورمز QR */}
        <div className="lg:col-span-5 rounded-2xl border border-[#C99E4C]/25 bg-[#06161A]/90 p-5 flex flex-col justify-between gap-5">
          <div className="space-y-4">
            {/* شعار المجموعة وهويتها */}
            <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#C99E4C]/50 bg-gradient-to-br from-[#C99E4C]/25 to-[#0B1C2C] text-[#F3D89B] shadow-inner">
                  <svg viewBox="0 0 48 48" className="h-7 w-7 fill-none stroke-current" strokeWidth="2.2">
                    <path d="M24 6L39 15V33L24 42L9 33V15L24 6Z" />
                    <path d="M24 14L31 32H17L24 14Z" className="fill-[#C99E4C]/30" />
                    <circle cx="24" cy="26" r="2.2" className="fill-[#F3D89B]" />
                  </svg>
                </div>
                <div>
                  <div className="text-base font-extrabold text-white">{ARAAK_IDENTITY.groupName}</div>
                  <div className="text-[11px] font-semibold text-[#C99E4C]">{ARAAK_IDENTITY.tagline}</div>
                </div>
              </div>
              <span className="rounded-lg border border-[#C99E4C]/30 bg-[#C99E4C]/10 px-2.5 py-1 text-[11px] font-bold text-[#F3D89B]">
                {ARAAK_IDENTITY.reachMetric}
              </span>
            </div>

            {/* العناوين وأرقام التواصل */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="rounded-xl border border-white/10 bg-[#0B1C2C]/75 p-3">
                <div className="text-[11px] font-bold text-[#C99E4C]">العناوين والمقرات</div>
                <p className="mt-1 text-xs text-slate-200 leading-relaxed">
                  المملكة العربية السعودية — جدة • الرياض • مكة المكرمة
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#0B1C2C]/75 p-3">
                <div className="text-[11px] font-bold text-[#C99E4C]">أرقام التواصل</div>
                <div className="mt-1 space-y-1 text-xs font-semibold text-white" dir="ltr">
                  <div className="text-right">+966 12 000 0000</div>
                  <div className="text-right text-slate-300">info@araak.org</div>
                </div>
              </div>
            </div>

            {/* حسابات التواصل الاجتماعي */}
            <div className="rounded-xl border border-white/10 bg-[#0B1C2C]/65 p-3 space-y-2">
              <div className="text-[11px] font-bold text-[#C99E4C]">حسابات التواصل الاجتماعي</div>
              <div className="grid grid-cols-2 gap-2">
                {SOCIAL_ACCOUNTS.map((acc) => (
                  <a
                    key={acc.platform}
                    href={acc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border border-white/10 bg-[#06161A]/80 px-2.5 py-2 transition hover:border-[#C99E4C]/60"
                  >
                    <div className="text-[10px] text-slate-400">{acc.platform}</div>
                    <div className="text-xs font-bold text-[#E8C882] truncate mt-0.5">{acc.handle}</div>
                  </a>
                ))}
              </div>
            </div>

            {/* رمز QR Code بحجم مناسب داخل البطاقة */}
            <div className="rounded-xl border border-[#C99E4C]/30 bg-[#0B1C2C]/80 p-3.5 flex items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="text-xs font-extrabold text-[#F3D89B]">رمز الوصول السريع (QR)</div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  امسح الرمز للوصول السريع إلى قناة التواصل الخاصة بـ{' '}
                  <span className="font-bold text-white">{activeOption?.shortName}</span>.
                </p>
                <div className="text-[10px] font-semibold text-[#C99E4C]">المرجع: {referenceCode}</div>
              </div>

              <div className="shrink-0 rounded-xl bg-white p-2 shadow-md">
                <div
                  className="grid gap-[1px]"
                  style={{
                    gridTemplateColumns: `repeat(${qrMatrix.length}, minmax(0, 1fr))`,
                    width: '84px',
                    height: '84px',
                  }}
                  aria-label={`رمز QR لجهة ${activeOption?.shortName || 'أراك'}`}
                >
                  {qrMatrix.flatMap((row, rIdx) =>
                    row.map((cell, cIdx) => (
                      <span
                        key={`${rIdx}-${cIdx}`}
                        className={cell ? 'bg-[#06161A]' : 'bg-white'}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* الجزء الأيسر: بطاقات عمودين لاسم الجهة فقط + حقول التواصل */}
        <div className="lg:col-span-7 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-200">اختر جهة التواصل</span>
              <span className="text-[11px] text-[#E8C882] font-semibold">
                المحددة: {activeOption?.shortName}
              </span>
            </div>

            {/* قائمة بطاقات على عمودين تعرض اسم المؤسسة أو الشركة فقط بدون شرح أنشطتها */}
            <div
              role="radiogroup"
              aria-label="اختر جهة التواصل"
              className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-52 overflow-y-auto pl-1"
            >
              {contactOptions.map((opt) => {
                const isSelected = opt.id === activeOption?.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => onChangeTarget(opt.fullLabel)}
                    className={`flex items-center justify-between rounded-xl border px-3.5 py-2.5 text-right text-xs sm:text-sm font-bold transition ${
                      isSelected
                        ? 'border-[#C99E4C] bg-[#C99E4C]/20 text-[#F3D89B] shadow-md'
                        : 'border-white/10 bg-[#06161A]/85 text-slate-200 hover:border-[#C99E4C]/50 hover:bg-[#0B1C2C]'
                    }`}
                  >
                    <span className="truncate">{opt.shortName}</span>
                    <span
                      className={`h-2.5 w-2.5 rounded-full shrink-0 ${
                        isSelected ? 'bg-[#C99E4C]' : 'border border-white/30'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5">تصنيف مقدم الطلب</label>
              <select
                value={requesterType}
                onChange={(e) => setRequesterType(e.target.value as (typeof REQUESTER_TYPES)[number])}
                className="w-full rounded-xl border border-white/15 bg-[#06161A]/90 px-4 py-2.5 text-sm font-medium text-white focus:border-[#C99E4C] focus:outline-none"
              >
                {REQUESTER_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5">اسم الجهة أو المنشأة</label>
              <input
                type="text"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                placeholder="مثال: شركة / مؤسسة / جهة تعليمية"
                className="w-full rounded-xl border border-white/15 bg-[#06161A]/90 px-4 py-2.5 text-sm text-white focus:border-[#C99E4C] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5">اسم المسؤول / مقدم الطلب</label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="الاسم الكامل"
                className="w-full rounded-xl border border-white/15 bg-[#06161A]/90 px-4 py-2.5 text-sm text-white focus:border-[#C99E4C] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5">البريد الإلكتروني أو رقم التواصل</label>
              <input
                type="text"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                placeholder="example@domain.com أو رقم الهاتف"
                className="w-full rounded-xl border border-white/15 bg-[#06161A]/90 px-4 py-2.5 text-sm text-white focus:border-[#C99E4C] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1.5">ملخص الرسالة أو الاستفسار</label>
            <textarea
              rows={2}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="اكتب نبذة مختصرة عن البرنامج أو المشروع أو الشراكة المطلوبة..."
              className="w-full rounded-xl border border-white/15 bg-[#06161A]/90 px-4 py-2.5 text-sm text-white focus:border-[#C99E4C] focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href={mailtoHref}
              className="rounded-xl bg-[#C99E4C] px-6 py-3 text-xs sm:text-sm font-bold text-[#06161A] transition hover:bg-[#dcaf59]"
            >
              إرسال الرسالة ({targetEmail})
            </a>
            <button
              type="button"
              onClick={handleCopySummary}
              className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-xs sm:text-sm font-semibold text-white transition hover:border-[#C99E4C]"
            >
              {copied ? 'تم نسخ ملخص التواصل' : 'نسخ ملخص التواصل'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
