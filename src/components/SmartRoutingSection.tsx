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

const SOCIAL_LINKS = [
  { name: 'الموقع', url: 'https://araak.org', icon: 'globe' },
  { name: 'X', url: 'https://x.com', icon: 'x' },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'in' },
  { name: 'Instagram', url: 'https://instagram.com', icon: 'ig' },
  { name: 'YouTube', url: 'https://youtube.com', icon: 'yt' },
] as const;

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

const renderSocialIcon = (icon: (typeof SOCIAL_LINKS)[number]['icon']) => {
  switch (icon) {
    case 'globe':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.9">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
        </svg>
      );
    case 'x':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'in':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
          <path d="M6.94 8.5H3.56V19.5h3.38V8.5zM5.25 3.5a1.97 1.97 0 1 0 0 3.94 1.97 1.97 0 0 0 0-3.94zM20.44 13.02c0-2.74-1.46-4.01-3.41-4.01-1.57 0-2.28.86-2.67 1.47V8.5h-3.38c.04.96 0 11 0 11h3.38v-6.14c0-.33.02-.66.12-.89.27-.66.88-1.35 1.9-1.35 1.34 0 1.87 1.02 1.87 2.51V19.5h3.38v-6.48z" />
        </svg>
      );
    case 'ig':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.9">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" className="fill-current" />
        </svg>
      );
    case 'yt':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
        </svg>
      );
  }
};

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
      fullLabel: axis.title,
      email: axis.contactEmail,
    }));

    const companies = ARAAK_COMPANIES.map((company) => ({
      id: `company-${company.id}`,
      shortName: company.name,
      fullLabel: company.name,
      email: 'info@araak.org',
    }));

    return [...axes, ...companies];
  }, []);

  const activeOption =
    contactOptions.find(
      (opt) => opt.fullLabel === selectedTarget || opt.shortName === selectedTarget
    ) || contactOptions[0];

  const targetName = activeOption?.shortName || selectedTarget;
  const targetEmail = activeOption?.email || 'info@araak.org';

  const qrPayload = `https://araak.org/contact?ref=${referenceCode}&entity=${encodeURIComponent(
    targetName
  )}`;
  const qrMatrix = useMemo(() => buildQrMatrix(qrPayload, 21), [qrPayload]);

  const builtSummary = [
    `الرقم المرجعي: ${referenceCode}`,
    `جهة التواصل: ${targetName}`,
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
    `[${referenceCode}] التواصل مع أراك — ${targetName}`
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
            اختر جهة التواصل من القائمة المنسدلة وأرسل رسالتك مباشرة إلى الجهة المعنية.
          </p>
        </div>
        <span className="rounded-xl border border-[#C99E4C]/35 bg-[#0B1C2C]/85 px-4 py-2 text-xs font-semibold text-[#E8C882] backdrop-blur-md">
          الرقم المرجعي: {referenceCode}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 rounded-3xl border border-white/15 bg-[#091B22]/85 backdrop-blur-2xl p-6 md:p-8 shadow-2xl items-center">
        {/* الجزء الأيمن: بيانات المجموعة بدون إطارات + رموز السوشال ميديا مباشرة + QR كبير الحجم */}
        <div className="lg:col-span-5 rounded-2xl border border-[#C99E4C]/25 bg-[#06161A]/90 p-6 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#C99E4C]/45 bg-[#C99E4C]/15 text-[#F3D89B]">
                <svg viewBox="0 0 48 48" className="h-6 w-6 fill-none stroke-current" strokeWidth="2.2">
                  <path d="M24 6L39 15V33L24 42L9 33V15L24 6Z" />
                  <path d="M24 14L31 32H17L24 14Z" className="fill-[#C99E4C]/30" />
                  <circle cx="24" cy="26" r="2.2" className="fill-[#F3D89B]" />
                </svg>
              </div>
              <div>
                <div className="text-base font-extrabold text-white">{ARAAK_IDENTITY.groupName}</div>
                <div className="text-xs text-[#C99E4C]">{ARAAK_IDENTITY.tagline}</div>
              </div>
            </div>

            <div className="space-y-1.5 text-sm text-slate-200 leading-relaxed pt-1">
              <p className="font-bold text-white">{ARAAK_IDENTITY.groupName} — {ARAAK_IDENTITY.tagline}</p>
              <p className="text-slate-300">{ARAAK_IDENTITY.address} • {ARAAK_IDENTITY.email}</p>
              <p className="text-slate-200">
                تلفون: <span dir="ltr" className="font-bold text-[#E8C882]">{ARAAK_IDENTITY.phoneMain}</span> • رسالة: <span dir="ltr" className="font-semibold text-slate-200">{ARAAK_IDENTITY.phoneSms}</span>
              </p>
            </div>

            {/* رموز حسابات السوشال ميديا مباشرة بدون إطارات */}
            <div className="pt-1">
              <div className="text-xs font-bold text-[#C99E4C] mb-2.5">سوشال</div>
              <div className="flex items-center gap-4 text-slate-200">
                {SOCIAL_LINKS.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    title={item.name}
                    aria-label={item.name}
                    className="text-slate-200 transition hover:text-[#F3D89B] hover:scale-110"
                  >
                    {renderSocialIcon(item.icon)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* رمز QR كبير الحجم داخل البطاقة */}
          <div className="pt-2 flex flex-col items-center justify-center border-t border-white/10">
            <div className="rounded-2xl bg-white p-3.5 shadow-xl">
              <div
                className="grid gap-[1.5px]"
                style={{
                  gridTemplateColumns: `repeat(${qrMatrix.length}, minmax(0, 1fr))`,
                  width: '156px',
                  height: '156px',
                }}
                aria-label={`رمز QR لجهة ${targetName}`}
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
            <div className="mt-2.5 text-xs font-semibold text-[#E8C882]">{targetName}</div>
          </div>
        </div>

        {/* الجزء الأيسر: قائمة منسدلة لجهة التواصل + حقول الإدخال */}
        <div className="lg:col-span-7 space-y-4">
          <div>
            <label htmlFor="araak-contact-target" className="block text-xs font-bold text-slate-200 mb-1.5">
              اختر جهة التواصل
            </label>
            <select
              id="araak-contact-target"
              value={targetName}
              onChange={(e) => onChangeTarget(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-[#06161A]/90 px-4 py-3 text-sm font-bold text-white focus:border-[#C99E4C] focus:outline-none"
            >
              {contactOptions.map((opt) => (
                <option key={opt.id} value={opt.shortName}>
                  {opt.shortName}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5">تصنيف مقدم الطلب</label>
              <select
                value={requesterType}
                onChange={(e) => setRequesterType(e.target.value as (typeof REQUESTER_TYPES)[number])}
                className="w-full rounded-xl border border-white/15 bg-[#06161A]/90 px-4 py-3 text-sm font-medium text-white focus:border-[#C99E4C] focus:outline-none"
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
                className="w-full rounded-xl border border-white/15 bg-[#06161A]/90 px-4 py-3 text-sm text-white focus:border-[#C99E4C] focus:outline-none"
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
                className="w-full rounded-xl border border-white/15 bg-[#06161A]/90 px-4 py-3 text-sm text-white focus:border-[#C99E4C] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5">البريد الإلكتروني أو رقم التواصل</label>
              <input
                type="text"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                placeholder="example@domain.com أو رقم الهاتف"
                className="w-full rounded-xl border border-white/15 bg-[#06161A]/90 px-4 py-3 text-sm text-white focus:border-[#C99E4C] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1.5">ملخص الرسالة أو الاستفسار</label>
            <textarea
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="اكتب نبذة مختصرة عن البرنامج أو المشروع أو الشراكة المطلوبة..."
              className="w-full rounded-xl border border-white/15 bg-[#06161A]/90 px-4 py-3 text-sm text-white focus:border-[#C99E4C] focus:outline-none"
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

