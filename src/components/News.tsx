import { useEffect, useState } from 'react';
import { Calendar, ArrowUpLeft, Newspaper } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { NewsArticle } from '@/lib/types';

const fallback: NewsArticle[] = [
  {
    id: '1',
    title: 'إطلاق كرسي اراك للتنمية بالجامعة الإسلامية العالمية في بنغلاديش',
    excerpt: 'إطلاق كرسي أكاديمي للتنمية بالتعاون مع الجامعة الإسلامية العالمية في بنغلاديش',
    content: null,
    image_url: 'https://www.araak.org/wp-content/uploads/2024/10/doctor-1080x675.png',
    category: 'اخبار اراك',
    published_at: '2024-10-23',
    created_at: '',
  },
  {
    id: '2',
    title: 'مذكرة تفاهم بين مجموعة اراك للتنمية و جامعة السلطان احمد شاه الإسلامية',
    excerpt: 'توقيع مذكرة تفاهم تعاونية مع جامعة السلطان احمد شاه الإسلامية',
    content: null,
    image_url: 'https://www.araak.org/wp-content/uploads/2024/05/bd452eb6-defb-4d5a-8e58-5e5776b68420-1080x675.jpg',
    category: 'اخبار اراك',
    published_at: '2024-05-07',
    created_at: '',
  },
  {
    id: '3',
    title: 'المؤتمر الدولي للتعليم المعاصر في العالم الإسلامي',
    excerpt: 'مشاركة مجموعة اراك في المؤتمر الدولي للتعليم المعاصر في العالم الإسلامي',
    content: null,
    image_url: 'https://www.araak.org/wp-content/uploads/2024/05/a7efb74e-a9f5-4c40-8c71-676518eadff4-1080x675.jpg',
    category: 'اخبار اراك',
    published_at: '2024-05-07',
    created_at: '',
  },
];

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ar', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return dateStr;
  }
}

export default function News() {
  const [articles, setArticles] = useState<NewsArticle[]>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('news')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(6)
      .then(({ data }) => {
        if (data && data.length > 0) setArticles(data as NewsArticle[]);
        setLoading(false);
      });
  }, []);

  return (
    <section id="news" className="relative py-24 md:py-32 bg-navy-900">
      <div className="absolute top-0 inset-x-0 h-px gold-line opacity-30" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-px bg-gold-400/50" />
            <span className="text-gold-400 text-sm font-bold tracking-widest">أخبارنا</span>
            <div className="w-8 h-px bg-gold-400/50" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-sand-50 mb-4">آخر الأخبار والمستجدات</h2>
          <p className="text-sand-300 max-w-2xl mx-auto text-lg">
            تابع آخر مبادراتنا وشراكاتنا ومشاركاتنا في المحافل الدولية
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass rounded-3xl overflow-hidden animate-pulse">
                <div className="h-52 bg-navy-700/30" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gold-400/10 rounded w-20" />
                  <div className="h-5 bg-navy-700/30 rounded w-full" />
                  <div className="h-5 bg-navy-700/30 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {articles.map((article) => (
              <article
                key={article.id}
                className="group glass rounded-3xl overflow-hidden hover:border-gold-400/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/30"
              >
                <div className="relative h-52 overflow-hidden bg-navy-800">
                  {article.image_url ? (
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Newspaper className="text-gold-400/30" size={48} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent" />
                  {article.category && (
                    <span className="absolute top-4 right-4 glass-gold text-gold-200 text-xs font-medium px-3 py-1.5 rounded-full">
                      {article.category}
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-gold-400/70 text-xs mb-3">
                    <Calendar size={14} />
                    <span>{formatDate(article.published_at)}</span>
                  </div>
                  <h3 className="text-sand-50 font-bold text-lg leading-snug mb-3 line-clamp-2 group-hover:text-gold-300 transition-colors">
                    {article.title}
                  </h3>
                  {article.excerpt && (
                    <p className="text-sand-300 text-sm leading-relaxed line-clamp-2 mb-4">
                      {article.excerpt}
                    </p>
                  )}
                  <span className="inline-flex items-center gap-1.5 text-gold-400 text-sm font-medium group-hover:gap-3 transition-all">
                    اقرأ المزيد
                    <ArrowUpLeft size={16} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
