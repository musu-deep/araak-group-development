import { useState } from 'react';
import { Phone, Mail, MessageSquare, Send, CheckCircle, MapPin } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');

    try {
      const { error } = await supabase.from('contact_messages').insert({
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
      });

      if (error) throw error;

      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const inputClass =
    'w-full bg-navy-950/50 border border-gold-400/15 rounded-xl px-4 py-3 text-sand-50 placeholder-sand-300/40 focus:border-gold-400/50 focus:outline-none focus:ring-1 focus:ring-gold-400/30 transition-all text-sm';

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-navy-950 overflow-hidden">
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-px bg-gold-400/50" />
            <span className="text-gold-400 text-sm font-bold tracking-widest">تواصل معنا</span>
            <div className="w-8 h-px bg-gold-400/50" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-sand-50 mb-4">كن دائماً مع أراك</h2>
          <p className="text-sand-300 max-w-2xl mx-auto text-lg">
            تواصل معنا لشراكات تنموية واستفسارات ومبادرات مشتركة
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="glass rounded-2xl p-6 flex items-center gap-4 hover:border-gold-400/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gold-400/10 flex items-center justify-center shrink-0">
                <Phone className="text-gold-400" size={22} />
              </div>
              <div>
                <h4 className="text-sand-100 font-bold text-sm mb-1">رقم الاتصال</h4>
                <a href="tel:00966126440098" className="text-sand-300 text-sm hover:text-gold-400 transition-colors" dir="ltr">
                  +966 12 644 0098
                </a>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 flex items-center gap-4 hover:border-gold-400/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gold-400/10 flex items-center justify-center shrink-0">
                <MessageSquare className="text-gold-400" size={22} />
              </div>
              <div>
                <h4 className="text-sand-100 font-bold text-sm mb-1">رسالة نصية</h4>
                <a href="tel:00966598175754" className="text-sand-300 text-sm hover:text-gold-400 transition-colors" dir="ltr">
                  +966 59 817 5754
                </a>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 flex items-center gap-4 hover:border-gold-400/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gold-400/10 flex items-center justify-center shrink-0">
                <Mail className="text-gold-400" size={22} />
              </div>
              <div>
                <h4 className="text-sand-100 font-bold text-sm mb-1">البريد الإلكتروني</h4>
                <a href="mailto:info@araak.org" className="text-sand-300 text-sm hover:text-gold-400 transition-colors" dir="ltr">
                  info@araak.org
                </a>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 flex items-center gap-4 hover:border-gold-400/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gold-400/10 flex items-center justify-center shrink-0">
                <MapPin className="text-gold-400" size={22} />
              </div>
              <div>
                <h4 className="text-sand-100 font-bold text-sm mb-1">المقر</h4>
                <p className="text-sand-300 text-sm">جدة، المملكة العربية السعودية</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sand-200 text-sm font-medium mb-2">اسمك الكريم</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClass}
                    placeholder="أدخل اسمك"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sand-200 text-sm font-medium mb-2">بريدك الإلكتروني</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputClass}
                    placeholder="example@email.com"
                    required
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sand-200 text-sm font-medium mb-2">الموضوع</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className={inputClass}
                  placeholder="موضوع الرسالة"
                />
              </div>

              <div>
                <label className="block text-sand-200 text-sm font-medium mb-2">رسالتك</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputClass} resize-none h-32`}
                  placeholder="اكتب رسالتك هنا..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-gradient-to-r from-gold-400 to-gold-600 text-navy-900 font-bold py-3.5 rounded-xl hover:shadow-2xl hover:shadow-gold-600/40 hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? (
                  'جاري الإرسال...'
                ) : status === 'success' ? (
                  <>
                    <CheckCircle size={20} />
                    تم الإرسال بنجاح
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    إرسال الرسالة
                  </>
                )}
              </button>

              {status === 'error' && (
                <p className="text-red-400 text-sm text-center">
                  حدث خطأ أثناء الإرسال، يرجى المحاولة مرة أخرى
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
