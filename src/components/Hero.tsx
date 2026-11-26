import { ArrowLeft, Sparkles } from 'lucide-react';

const stats = [
  { value: '+53', label: 'دولة حول العالم', suffix: '' },
  { value: '2008', label: 'سنة التأسيس', suffix: '' },
  { value: '+5', label: 'مؤسسات تابعة', suffix: '' },
];

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800" />
      <div className="absolute inset-0 hero-grid-bg opacity-60" />

      {/* Golden glow orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gold-400/10 rounded-full blur-[120px] animate-glow" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-navy-400/8 rounded-full blur-[120px] animate-glow" style={{ animationDelay: '2s' }} />

      {/* Decorative golden lines */}
      <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none">
        <defs>
          <linearGradient id="goldLine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C99E4C" stopOpacity="0" />
            <stop offset="50%" stopColor="#C99E4C" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#C99E4C" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="10%" y1="100%" x2="50%" y2="20%" stroke="url(#goldLine)" strokeWidth="1" />
        <line x1="90%" y1="100%" x2="50%" y2="20%" stroke="url(#goldLine)" strokeWidth="1" />
        <line x1="30%" y1="90%" x2="70%" y2="10%" stroke="url(#goldLine)" strokeWidth="0.5" />
      </svg>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-12 w-full">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 text-center lg:text-right">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-2 mb-8 animate-fade-in">
              <Sparkles size={16} className="text-gold-400" />
              <span className="text-gold-200 text-sm font-medium">مجموعة غير ربحية ذات مبادرات تنموية</span>
            </div>

            {/* Main heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 animate-fade-in-up">
              <span className="text-sand-50">نحو توطين القيم</span>
              <br />
              <span className="text-gradient-gold">لتمكين التنمية</span>
            </h1>

            {/* Description */}
            <p className="text-sand-200 text-lg md:text-xl max-w-2xl mx-auto lg:mr-0 leading-relaxed mb-10 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
              مجموعة متخصصة في التنمية البشرية تسهم في تطوير العنصر البشري وتعزيز قدراته
              في شتى مجالات الحياة من خلال فرق مؤهلة وبرامج مبتكرة
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <a
                href="#about"
                className="group bg-gradient-to-r from-gold-400 to-gold-600 text-navy-900 font-bold px-7 py-3.5 rounded-xl hover:shadow-2xl hover:shadow-gold-600/40 hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                تعرف على المجموعة
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              </a>
              <a
                href="#subsidiaries"
                className="glass text-sand-100 font-bold px-7 py-3.5 rounded-xl hover:border-gold-400/40 hover:text-gold-400 transition-all duration-300"
              >
                مؤسساتنا التابعة
              </a>
            </div>
          </div>

          {/* Stats card */}
          <div className="lg:col-span-4 animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
            <div className="glass rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/10 rounded-full blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1 h-6 bg-gold-400 rounded-full" />
                  <h3 className="text-gold-300 font-bold text-sm tracking-wide">إنجازاتنا</h3>
                </div>
                <div className="space-y-5">
                  {stats.map((stat, i) => (
                    <div key={i} className="flex items-baseline justify-between border-b border-gold-400/10 pb-4 last:border-0 last:pb-0">
                      <span className="text-4xl font-black text-gradient-gold">{stat.value}</span>
                      <span className="text-sand-300 text-sm font-medium">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
        <div className="w-6 h-10 rounded-full border-2 border-gold-400/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-gold-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
