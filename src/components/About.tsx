import { Eye, Target, Heart } from 'lucide-react';

const values = [
  { label: 'المنح', desc: 'العطاء بلا مقابل' },
  { label: 'الشفافية', desc: 'وضوح في كل ما نقوم به' },
  { label: 'التعاون', desc: 'شراكات مجتمعية فعالة' },
  { label: 'الاحترافية', desc: 'أحدث المعايير المهنية' },
  { label: 'الابتكار', desc: 'حلول مبتكرة للتنمية' },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 bg-navy-950 overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-0 left-0 w-full h-px gold-line opacity-50" />
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-gold-400/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-px bg-gold-400/50" />
            <span className="text-gold-400 text-sm font-bold tracking-widest">من نحن</span>
            <div className="w-8 h-px bg-gold-400/50" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-sand-50 mb-4">عن مجموعة اراك</h2>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="glass rounded-3xl p-8 md:p-10 hover:border-gold-400/30 transition-all duration-500 group">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-gold-400/10 flex items-center justify-center group-hover:bg-gold-400/20 transition-colors">
                <Eye className="text-gold-400" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-sand-50">الرؤية</h3>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gradient-gold leading-snug">
              نحو توطين القيم لتمكين التنمية
            </p>
          </div>

          <div className="glass rounded-3xl p-8 md:p-10 hover:border-gold-400/30 transition-all duration-500 group">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-gold-400/10 flex items-center justify-center group-hover:bg-gold-400/20 transition-colors">
                <Target className="text-gold-400" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-sand-50">الرسالة</h3>
            </div>
            <p className="text-sand-200 text-lg leading-relaxed">
              مجموعة غير ربحية ذات مبادرات تنموية مع شراكات مجتمعية فعالة في بيئة مهنية
              وفرق خبراء تجمع بين الأصالة والمعاصرة
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="glass-gold rounded-3xl p-8 md:p-12">
          <div className="flex items-center gap-3 mb-8">
            <Heart className="text-gold-400" size={24} />
            <h3 className="text-xl font-bold text-gold-200">قيمنا</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {values.map((val, i) => (
              <div
                key={i}
                className="text-center p-5 rounded-2xl hover:bg-gold-400/10 transition-all duration-300 group cursor-default"
              >
                <div className="w-10 h-10 rounded-full bg-gold-400/15 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <span className="text-gold-400 font-bold text-sm">{i + 1}</span>
                </div>
                <h4 className="text-sand-50 font-bold mb-1">{val.label}</h4>
                <p className="text-sand-300 text-xs leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
