import React, { useEffect, useMemo, useState } from 'react';
import {
  ARAAK_COMPANIES,
  DEVELOPMENTAL_AXES,
  INITIATIVES_AND_PUBLICATIONS,
} from '../data/araakPortalData';
import { VisitorAccessData } from './AccessGateModal';

interface SmartRoutingSectionProps {
  selectedTarget: string;
  onChangeTarget: (target: string) => void;
  visitorData: VisitorAccessData | null;
}

const REQUESTER_TYPES = [
  'جهة مؤسسية / شركة',
  'جهة تعليمية أو تدريبية',
  'منظمة / مبادرة مجتمعية',
  'مستثمر / شريك استراتيجي',
  'مستفيد / باحث / متدرب',
] as const;

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

  const routingOptions: { label: string; email: string }[] = [
    ...DEVELOPMENTAL_AXES.map((axis) => ({
      label: `${axis.title} (${axis.routingLabel})`,
      email: axis.contactEmail,
    })),
    ...INITIATIVES_AND_PUBLICATIONS.map((axis) => ({
      label: `${axis.title} (${axis.routingLabel})`,
      email: axis.contactEmail,
    })),
    ...ARAAK_COMPANIES.map((company) => ({
      label: `${company.name} — ${company.headline}`,
      email: 'info@araak.org',
    })),
  ];

  const activeOption =
    routingOptions.find((opt) => opt.label === selectedTarget) || routingOptions[0];

  const builtSummary = [
    `الرقم المرجعي: ${referenceCode}`,
    `جهة التواصل: ${activeOption?.label || selectedTarget}`,
    `تصنيف مقدم الطلب: ${requesterType}`,
    `الجهة / المؤسسة الطالبة: ${organizationName || 'غير محدد'}`,
    `مقدم الطلب: ${contactName || 'غير محدد'}`,
    `وسيلة التواصل: ${contactInfo || 'غير محدد'}`,
    `تفاصيل الرسالة: ${details || 'طلب تواصل مباشر مع الجهة المختصة'}`,
  ].join('\n');

  const handleCopySummary = async () => {
    await navigator.clipboard.writeText(builtSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const mailtoHref = `mailto:${encodeURIComponent(
    activeOption?.email || 'info@araak.org'
  )}?subject=${encodeURIComponent(
    `[${referenceCode}] التواصل مع أراك — ${activeOption?.label || selectedTarget}`
  )}&body=${encodeURIComponent(builtSummary)}`;

  return (
    <div dir="rtl" className="mx-auto w-full max-w-6xl px-6 pt-28 pb-20">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold tracking-wider text-[#C99E4C]">التواصل المباشر</span>
          <h2 className="mt-1 text-3xl md:text-4xl font-bold text-white">التواصل مع أراك</h2>
          <p className="mt-1.5 text-sm text-slate-300">
            اختر جهة التواصل من المسارات التنموية أو شركات المجموعة لإرسال رسالتك مباشرة برقم مرجعي فوري.
          </p>
        </div>
        <span className="rounded-xl border border-[#C99E4C]/35 bg-[#0B1C2C]/85 px-4 py-2 text-xs font-mono text-[#E8C882] backdrop-blur-md">
          {referenceCode}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 rounded-3xl border border-white/15 bg-[#091B22]/80 backdrop-blur-2xl p-6 md:p-8 shadow-2xl">
        <div className="lg:col-span-7 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-1.5">
              اختر جهة التواصل
            </label>
            <select
              value={selectedTarget}
              onChange={(e) => onChangeTarget(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-[#06161A]/90 px-4 py-3 text-sm text-white focus:border-[#C99E4C] focus:outline-none"
            >
              {routingOptions.map((opt) => (
                <option key={opt.label} value={opt.label}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">تصنيف مقدم الطلب</label>
              <select
                value={requesterType}
                onChange={(e) => setRequesterType(e.target.value as (typeof REQUESTER_TYPES)[number])}
                className="w-full rounded-xl border border-white/15 bg-[#06161A]/90 px-4 py-3 text-sm text-white focus:border-[#C99E4C] focus:outline-none"
              >
                {REQUESTER_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">اسم الجهة أو المنشأة</label>
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
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">اسم المسؤول / مقدم الطلب</label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="الاسم الكامل"
                className="w-full rounded-xl border border-white/15 bg-[#06161A]/90 px-4 py-3 text-sm text-white focus:border-[#C99E4C] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">البريد الإلكتروني أو رقم التواصل</label>
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
            <label className="block text-xs font-semibold text-slate-200 mb-1.5">ملخص الرسالة أو الاستفسار</label>
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
              إرسال الرسالة ({activeOption?.email})
            </a>
            <button
              type="button"
              onClick={handleCopySummary}
              className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-xs sm:text-sm font-semibold text-white transition hover:border-[#C99E4C]"
            >
              {copied ? 'تم نسخ بطاقة التواصل' : 'نسخ بطاقة التواصل'}
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#06161A]/90 p-5 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-[#C99E4C] mb-2">معاينة بطاقة التواصل المباشر</div>
            <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm leading-relaxed text-slate-200">
              {builtSummary}
            </pre>
          </div>
          <div className="mt-5 border-t border-white/10 pt-3 text-[11px] text-slate-400">
            تواصل مباشر مع الجهة المختصة في مجموعة أراك للتنمية دون تخزين بيانات في قواعد بيانات خارجية.
          </div>
        </div>
      </div>
    </div>
  );
};
