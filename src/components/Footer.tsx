import { Twitter, Facebook, Instagram, Youtube, Send, Mail } from 'lucide-react';

const socials = [
  { icon: Twitter, href: 'https://twitter.com/araakorg', label: 'تويتر' },
  { icon: Facebook, href: 'https://facebook.com/araakdevelopment', label: 'فيسبوك' },
  { icon: Instagram, href: 'https://instagram.com/araakdevelopment', label: 'انستقرام' },
  { icon: Youtube, href: 'https://youtube.com/c/AraakDevelopment', label: 'يوتيوب' },
];

const links = [
  { href: '#about', label: 'من نحن' },
  { href: '#subsidiaries', label: 'مؤسساتنا' },
  { href: '#news', label: 'أخبارنا' },
  { href: '#team', label: 'فريق العمل' },
  { href: '#contact', label: 'تواصل معنا' },
];

export default function Footer() {
  return (
    <footer className="relative bg-navy-950 border-t border-gold-400/10 pt-16 pb-8">
      <div className="absolute top-0 inset-x-0 h-px gold-line opacity-40" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gold-300 to-gold-600 flex items-center justify-center shadow-lg shadow-gold-600/30">
                <span className="text-navy-900 font-black text-xl">أ</span>
              </div>
              <div>
                <span className="text-sand-50 font-bold text-lg block leading-tight">مجموعة اراك</span>
                <span className="text-gold-400 text-xs font-medium">للتنمية</span>
              </div>
            </div>
            <p className="text-sand-300 text-sm leading-relaxed mb-5 max-w-xs">
              مجموعة غير ربحية ذات مبادرات تنموية مع شراكات مجتمعية فعالة.
              نحو توطين القيم لتمكين التنمية.
            </p>
            <div className="flex gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-sand-200 hover:text-gold-400 hover:border-gold-400/40 transition-all hover:scale-110"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="md:text-center">
            <h4 className="text-sand-50 font-bold mb-4">روابط سريعة</h4>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sand-300 text-sm hover:text-gold-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sand-50 font-bold mb-4">تواصل معنا</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sand-300 text-sm">
                <Mail size={16} className="text-gold-400" />
                <a href="mailto:info@araak.org" className="hover:text-gold-400 transition-colors" dir="ltr">
                  info@araak.org
                </a>
              </li>
              <li className="flex items-center gap-2 text-sand-300 text-sm">
                <Send size={16} className="text-gold-400" />
                <span dir="ltr">+966 12 644 0098</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gold-400/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sand-400 text-xs">
            © {new Date().getFullYear()} مجموعة اراك للتنمية. جميع الحقوق محفوظة.
          </p>
          <p className="text-sand-400 text-xs">
            تأسست عام 2008 — جدة، المملكة العربية السعودية
          </p>
        </div>
      </div>
    </footer>
  );
}
