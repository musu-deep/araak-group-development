import React, { useState } from 'react';

export interface VisitorAccessData {
  name: string;
  email: string;
}

interface AccessGateModalProps {
  isOpen: boolean;
  axisTitle: string;
  initialData: VisitorAccessData | null;
  onClose: () => void;
  onUnlock: (data: VisitorAccessData) => void;
}

export const AccessGateModal: React.FC<AccessGateModalProps> = ({
  isOpen,
  axisTitle,
  initialData,
  onClose,
  onUnlock,
}) => {
  const [name, setName] = useState(initialData?.name || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName || !trimmedEmail || !trimmedEmail.includes('@')) {
      setError('يرجى إدخال الاسم والبريد الإلكتروني بشكل صحيح لعرض التفاصيل.');
      return;
    }
    setError('');
    onUnlock({ name: trimmedName, email: trimmedEmail });
  };

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4"
    >
      <div className="w-full max-w-md rounded-2xl border border-[#C99E4C]/35 bg-[#0B1C2C]/95 p-6 sm:p-7 text-white shadow-2xl space-y-5">
        <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-semibold text-[#C99E4C]">بطاقة وصول سريعة للتفاصيل</span>
            <h3 className="text-xl font-bold mt-1">اطّلع على تفاصيل {axisTitle}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/15 px-2.5 py-1 text-xs text-slate-300 hover:text-white"
          >
            إغلاق
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          أدخل الاسم والبريد الإلكتروني لفتح البرامج والخدمات والمسارات التفصيلية وتوجيه طلبك للجهة المختصة.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-200 mb-1.5">الاسم الكامل</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: د. لؤي أحمد"
              className="w-full rounded-xl border border-white/15 bg-[#06161A] px-4 py-2.5 text-sm text-white focus:border-[#C99E4C] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-200 mb-1.5">البريد الإلكتروني</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@organization.com"
              className="w-full rounded-xl border border-white/15 bg-[#06161A] px-4 py-2.5 text-sm text-white focus:border-[#C99E4C] focus:outline-none"
            />
          </div>

          {error && <p className="text-xs text-rose-400">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-xl bg-[#C99E4C] py-3 text-sm font-bold text-[#06161A] transition hover:bg-[#dcaf59]"
          >
            فتح التفاصيل الآن
          </button>
        </form>
      </div>
    </div>
  );
};
