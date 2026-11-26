import React, { useEffect, useMemo, useState } from 'react';
import { ARAAK_ENTITIES, STRATEGIC_AXES } from '../data/araakPortalData';
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
    ...STRATEGIC_AXES.map((axis) => ({
      label: `${axis.title} (${axis.routingLabel})`,
      email: axis.contactEmail,
    })),
    ...ARAAK_ENTITIES.map((entity) => ({
      label: `${entity.name} — ${entity.role}`,
      email: 'info@araak.org',
    })),
  ];

  const activeOption =
    routingOptions.find((opt) => opt.label === selectedTarget) || routingOptions[0];

  const builtSummary = [
    `الرقم المرجعي: ${referenceCode}`,
    `الجهة المختصة: ${activeOption?.label || selectedTarget}`,
    `تصنيف مقدم الطلب: ${requesterType}`,
    `الجهة / المؤسسة الطالبة: ${organizationName || 'غير محدد'}`,
    `مقدم الطلب: ${contactName || 'غير محدد'}`,
    `وسيلة التواصل: ${contactInfo || 'غير محدد'}`,
    `تفاصيل الطلب: ${details || 'طلب تواصل وتحويل إلى الجهة المختصة'}`,
  ].join('\n');

  const handleCopySummary = async () => {
    await navigator.clipboard.writeText(builtSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const mailtoHref = `mailto:${encodeURIComponent(
    activeOption?.email || 'info@araak.org'
  )}?subject=${encodeURIComponent(
    `[${referenceCode}] طلب تحويل — ${activeOption?.label || selectedTarget}`
  )}&body=${encodeURIComponent(builtSummary)}`;

  return (
    <section id="routing" dir="rtl" className="min-h-[82vh] bg-[#08191E] pt-28 pb-20 px-6 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-sm font-semibold text-[#C99E4C]">بوابة التحويل الفوري</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold">التوجيه المباشر للجهة المختصة</h2>
            <p className="mt-2 text-slate-300">
              اختر المحور أو الكيان أو البرنامج المطلوب لتوجيه طلبك مباشرة إلى الجهة المعنية مع رقم مرجعي فوري.
            </p>
          </div>
          <span className="rounded-xl border border-[#C99E4C]/30 bg-[#0B1C2C] px-4 py-2 text-xs font-mono text-[#E8C882]">
            {referenceCode}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 rounded-2xl border border-white/10 bg-[#0B1C2C]/80 p-6 md:p-8">
          <div className="lg:col-span-7 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1.5">
                الجهة / المحور / الكيان المختص
              </label>
              <select
                value={selectedTarget}
                onChange={(e) => onChangeTarget(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-[#06161A] px-4 py-3 text-white focus:border-[#C99E4C] focus:outline-none"
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
                <label className="block text-sm font-medium text-slate-200 mb-1.5">تصنيف مقدم الطلب</label>
                <select
                  value={requesterType}
                  onChange={(e) => setRequesterType(e.target.value as (typeof REQUESTER_TYPES)[number])}
                  className="w-full rounded-xl border border-white/15 bg-[#06161A] px-4 py-3 text-white focus:border-[#C99E4C] focus:outline-none"
                >
                  {REQUESTER_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1.5">اسم الجهة أو المنشأة</label>
                <input
                  type="text"
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  placeholder="مثال: مؤسسة / شركة / جهة تعليمية"
                  className="w-full rounded-xl border border-white/15 bg-[#06161A] px-4 py-3 text-white focus:border-[#C99E4C] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1.5">اسم المسؤول / مقدم الطلب</label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="الاسم الكامل"
                  className="w-full rounded-xl border border-white/15 bg-[#06161A] px-4 py-3 text-white focus:border-[#C99E4C] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1.5">البريد الإلكتروني أو رقم التواصل</label>
                <input
                  type="text"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  placeholder="example@domain.com أو رقم الهاتف"
                  className="w-full rounded-xl border border-white/15 bg-[#06161A] px-4 py-3 text-white focus:border-[#C99E4C] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1.5">ملخص الطلب أو الاستفسار</label>
              <textarea
                rows={4}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="اكتب نبذة مختصرة عن البرنامج أو الخدمة أو الشراكة المطلوبة..."
                className="w-full rounded-xl border border-white/15 bg-[#06161A] px-4 py-3 text-white focus:border-[#C99E4C] focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={mailtoHref}
                className="rounded-xl bg-[#C99E4C] px-6 py-3 font-semibold text-[#06161A] transition hover:bg-[#dcaf59]"
              >
                فتح رسالة التحويل ({activeOption?.email})
              </a>
              <button
                type="button"
                onClick={handleCopySummary}
                className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition hover:border-[#C99E4C]"
              >
                {copied ? 'تم نسخ ملخص التحويل' : 'نسخ ملخص التحويل'}
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-xl border border-white/10 bg-[#06161A] p-5 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-[#C99E4C] mb-2">معاينة بطاقة التحويل</div>
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-slate-200">
                {builtSummary}
              </pre>
            </div>
            <div className="mt-6 border-t border-white/10 pt-3 text-xs text-slate-400">
              يتم تجهيز الطلب مباشرة للتوجيه إلى الجهة المعنية مع رقم مرجعي فوري دون تخزين بيانات خارجية.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
