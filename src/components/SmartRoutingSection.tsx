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

  const targetLabel = activeOption?.label || selectedTarget;
  const targetEmail = activeOption?.email || 'info@araak.org';
  const orgDisplay = organizationName.trim() || 'غير محدد';
  const requesterDisplay = contactName.trim() || 'غير محدد';
  const contactDisplay = contactInfo.trim() || 'غير محدد';
  const detailsDisplay = details.trim() || 'طلب تواصل مباشر مع الجهة المختصة';

  const builtSummary = [
    `الرقم المرجعي: ${referenceCode}`,
    `جهة التواصل: ${targetLabel}`,
    `تصنيف مقدم الطلب: ${requesterType}`,
    `الجهة / المؤسسة الطالبة: ${orgDisplay}`,
    `مقدم الطلب: ${requesterDisplay}`,
    `وسيلة التواصل: ${contactDisplay}`,
    `ملخص الرسالة: ${detailsDisplay}`,
  ].join('\n');

  const handleCopySummary = async () => {
    await navigator.clipboard.writeText(builtSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const mailtoHref = `mailto:${encodeURIComponent(targetEmail)}?subject=${encodeURIComponent(
    `[${referenceCode}] التواصل مع أراك — ${targetLabel}`
  )}&body=${encodeURIComponent(builtSummary)}`;

  return (
    <div dir="rtl" className="mx-auto w-full max-w-6xl px-6 pt-28 pb-14 font-arabic">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold tracking-wider text-[#C99E4C]">التواصل المباشر</span>
          <h2 className="mt-1 text-3xl md:text-4xl font-extrabold text-white">التواصل مع أراك</h2>
          <p className="mt-1.5 text-sm text-slate-300">
            اختر جهة التواصل من المسارات التنموية أو شركات المجموعة لإرسال رسالتك مباشرة برقم مرجعي فوري.
          </p>
        </div>
        <span className="rounded-xl border border-[#C99E4C]/35 bg-[#0B1C2C]/85 px-4 py-2 text-xs font-semibold text-[#E8C882] backdrop-blur-md">
          الرقم المرجعي: {referenceCode}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 rounded-3xl border border-white/15 bg-[#091B22]/85 backdrop-blur-2xl p-6 md:p-8 shadow-2xl">
        {/* بطاقات فرعية نظيفة ومرتبة لمعاينة بطاقة التواصل */}
        <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#06161A]/90 p-5 flex flex-col justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-bold text-[#C99E4C]">بطاقة التواصل المباشر</span>
              <span className="rounded-lg bg-[#C99E4C]/15 border border-[#C99E4C]/30 px-2.5 py-1 text-[11px] font-semibold text-[#F3D89B]">
                {referenceCode}
              </span>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0B1C2C]/75 p-3">
              <div className="text-[11px] text-[#C99E4C] font-semibold">جهة التواصل المختارة</div>
              <div className="mt-1 text-xs sm:text-sm font-bold text-white leading-relaxed">
                {targetLabel}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="rounded-xl border border-white/10 bg-[#0B1C2C]/65 p-3">
                <div className="text-[11px] text-slate-400">تصنيف مقدم الطلب</div>
                <div className="mt-1 text-xs font-semibold text-[#E8C882]">{requesterType}</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#0B1C2C]/65 p-3">
                <div className="text-[11px] text-slate-400">الجهة / المنشأة</div>
                <div className="mt-1 text-xs font-semibold text-white truncate">{orgDisplay}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="rounded-xl border border-white/10 bg-[#0B1C2C]/65 p-3">
                <div className="text-[11px] text-slate-400">اسم المسؤول</div>
                <div className="mt-1 text-xs font-semibold text-white truncate">{requesterDisplay}</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#0B1C2C]/65 p-3">
                <div className="text-[11px] text-slate-400">وسيلة التواصل</div>
                <div className="mt-1 text-xs font-semibold text-white truncate">{contactDisplay}</div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0B1C2C]/65 p-3">
              <div className="text-[11px] text-slate-400">ملخص الرسالة</div>
              <p className="mt-1 text-xs text-slate-200 leading-relaxed line-clamp-3">
                {detailsDisplay}
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-3 text-[11px] text-slate-400">
            تواصل مباشر مع الجهة المختصة في مجموعة أراك للتنمية دون تخزين بيانات في قواعد بيانات خارجية.
          </div>
        </div>

        {/* نموذج إدخال بيانات التواصل */}
        <div className="lg:col-span-7 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1.5">
              اختر جهة التواصل
            </label>
            <select
              value={selectedTarget}
              onChange={(e) => onChangeTarget(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-[#06161A]/90 px-4 py-3 text-sm font-medium text-white focus:border-[#C99E4C] focus:outline-none"
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
              {copied ? 'تم نسخ بطاقة التواصل' : 'نسخ بطاقة التواصل'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
