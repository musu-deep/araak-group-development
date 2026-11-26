import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';

const navLinks = [
  { href: '#home', label: 'الرئيسية' },
  { href: '#about', label: 'من نحن' },
  { href: '#subsidiaries', label: 'مؤسساتنا' },
  { href: '#news', label: 'أخبارنا' },
  { href: '#team', label: 'فريق العمل' },
  { href: '#contact', label: 'تواصل معنا' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-navy-900/95 backdrop-blur-xl shadow-lg shadow-black/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gold-300 to-gold-600 flex items-center justify-center shadow-lg shadow-gold-600/30 group-hover:scale-105 transition-transform duration-300">
              <span className="text-navy-900 font-black text-xl">أ</span>
            </div>
            <div className="absolute -inset-1 bg-gold-400/20 rounded-xl blur-md -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="flex flex-col">
            <span className="text-sand-50 font-bold text-lg leading-tight">مجموعة اراك</span>
            <span className="text-gold-400 text-xs font-medium tracking-wide">للتنمية</span>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sand-100 hover:text-gold-400 font-medium text-sm transition-colors duration-300 rounded-lg hover:bg-gold-400/5"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <button className="flex items-center gap-2 text-sand-200 hover:text-gold-400 transition-colors text-sm font-medium px-3 py-2 rounded-lg border border-gold-400/20 hover:border-gold-400/40">
            <Globe size={16} />
            <span>EN</span>
          </button>
          <a
            href="#contact"
            className="bg-gradient-to-r from-gold-400 to-gold-600 text-navy-900 font-bold text-sm px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-gold-600/40 hover:scale-105 transition-all duration-300"
          >
            كن شريكاً
          </a>
        </div>

        <button
          className="lg:hidden text-sand-50 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="القائمة"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-400 ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pt-4 pb-6 bg-navy-900/98 backdrop-blur-xl mt-3 rounded-b-2xl border-b border-gold-400/10 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 text-sand-100 hover:text-gold-400 hover:bg-gold-400/5 rounded-xl font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="mt-3 bg-gradient-to-r from-gold-400 to-gold-600 text-navy-900 font-bold px-5 py-3 rounded-xl text-center"
          >
            كن شريكاً
          </a>
        </div>
      </div>
    </header>
  );
}
