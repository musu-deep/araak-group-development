import { useEffect, useState } from 'react';
import {
  GraduationCap, Briefcase, Microscope, Globe, Lightbulb,
  Building2, ArrowUpLeft, type LucideIcon,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Subsidiary } from '@/lib/types';

const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  Briefcase,
  Microscope,
  Globe,
  Lightbulb,
  Building2,
};

// Fallback data matching seeded database content
const fallback: Subsidiary[] = [
  { id: '1', name: 'أكاديمية اراك للتدريب', description: 'مسار التعليم والتدريب وبناء المورد البشري وفق أحدث المعايير المهنية', icon_name: 'GraduationCap', color_theme: 'navy', display_order: 1, created_at: '' },
  { id: '2', name: 'اراك للاستشارات', description: 'مسار الاستشارات الاستراتيجية والتطوير المؤسسي للمنظمات والمؤسسات', icon_name: 'Briefcase', color_theme: 'gold', display_order: 2, created_at: '' },
  { id: '3', name: 'كرسي اراك للتنمية', description: 'مبادرات أكاديمية وكراسي بحثية في الجامعات الدولية', icon_name: 'Microscope', color_theme: 'navy', display_order: 3, created_at: '' },
  { id: '4', name: 'اراك للمشاريع التنموية', description: 'تنفيذ البرامج والمشاريع التنموية في التعاون والتمكين المجتمعي', icon_name: 'Globe', color_theme: 'gold', display_order: 4, created_at: '' },
  { id: '5', name: 'منصة قصاصات تنموية', description: 'محتوى تنموي رقمي ونصائح قصيرة لتمكين الأفراد وتحقيق الأهداف', icon_name: 'Lightbulb', color_theme: 'navy', display_order: 5, created_at: '' },
];

export default function Subsidiaries() {
  const [items, setItems] = useState<Subsidiary[]>(fallback);

  useEffect(() => {
    supabase
      .from('subsidiaries')
      .select('*')
      .order('display_order', { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) setItems(data as Subsidiary[]);
      });
  }, []);

  return (
    <section id="subsidiaries" className="relative py-24 md:py-32 bg-gradient-to-b from-navy-950 to-navy-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-px bg-gold-400/50" />
            <span className="text-gold-400 text-sm font-bold tracking-widest">مؤسساتنا</span>
            <div className="w-8 h-px bg-gold-400/50" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-sand-50 mb-4">مؤسسات المجموعة التابعة</h2>
          <p className="text-sand-300 max-w-2xl mx-auto text-lg">
            خمس مؤسسات تنموية متخصصة تعمل في مسارات التعليم والتدريب والاستشارات والمشاريع التنموية
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[200px]">
          {items.map((item, i) => {
            const Icon = iconMap[item.icon_name] ?? Building2;
            const isLarge = i === 0 || i === 3;
            const isGold = item.color_theme === 'gold';

            return (
              <div
                key={item.id}
                className={`group relative overflow-hidden rounded-3xl p-7 cursor-pointer transition-all duration-500 hover:scale-[1.02] ${
                  isLarge ? 'md:col-span-2 row-span-1' : ''
                } ${
                  isGold
                    ? 'bg-gradient-to-br from-gold-400/10 to-gold-600/5 border border-gold-400/20 hover:border-gold-400/40'
                    : 'bg-gradient-to-br from-navy-700/40 to-navy-800/20 border border-navy-400/15 hover:border-navy-400/30'
                }`}
              >
                {/* Glow on hover */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  isGold ? 'bg-gold-400/15' : 'bg-navy-400/15'
                }`} />

                <div className="relative h-full flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300 ${
                      isGold ? 'bg-gold-400/15' : 'bg-navy-400/15'
                    }`}>
                      <Icon className={isGold ? 'text-gold-400' : 'text-navy-300'} size={28} />
                    </div>
                    <ArrowUpLeft className={`opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 ${
                      isGold ? 'text-gold-400' : 'text-navy-300'
                    }`} size={22} />
                  </div>

                  <div>
                    <h3 className={`text-xl font-bold mb-2 transition-colors ${
                      isGold ? 'text-gold-100' : 'text-sand-50'
                    }`}>
                      {item.name}
                    </h3>
                    <p className="text-sand-300 text-sm leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
