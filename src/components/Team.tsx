import { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { TeamMember } from '@/lib/types';

const fallback: TeamMember[] = [
  { id: '1', name: 'د. علي العتيبي', role: 'رئيس مجلس الإدارة والرئيس التنفيذي', bio: 'خبير ومستشار في الفكر الاستراتيجي، حاصل على دكتوراه في استراتيجيات التعليم، وله مشاركات داخلية وعالمية في أكثر من 53 دولة', photo_url: 'https://araak.org/wp-content/uploads/2020/07/Dr.Ali-Pic.jpg', display_order: 1, created_at: '' },
  { id: '2', name: 'عبدالرحمن الملاحمة', role: 'نائب رئيس مجلس الإدارة', bio: 'مهندس تطبيقي في الاتصالات، ناشط اجتماعي في التنمية ومشارك في عدة محافل داخلية وخارجية', photo_url: 'https://araak.org/wp-content/uploads/2020/07/Untitled-1.jpg', display_order: 2, created_at: '' },
  { id: '3', name: 'لؤي عبدالله', role: 'نائب الرئيس التنفيذي', bio: 'مدير محتوى تنموي ومتخصص في تطوير الأعمال والجودة والتميز المؤسسي والبناء الاستراتيجي وصناعة المحتوى', photo_url: 'https://araak.org/wp-content/uploads/2020/07/Untitled-10.jpg', display_order: 3, created_at: '' },
  { id: '4', name: 'ياسين حسن ابنعوف', role: 'مدير فرع السودان', bio: 'مدير فرع السودان لمجموعة اراك للتنمية', photo_url: 'https://araak.org/wp-content/uploads/2020/07/Untitled-1-1.jpg', display_order: 4, created_at: '' },
];

export default function Team() {
  const [members, setMembers] = useState<TeamMember[]>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('team_members')
      .select('*')
      .order('display_order', { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) setMembers(data as TeamMember[]);
        setLoading(false);
      });
  }, []);

  return (
    <section id="team" className="relative py-24 md:py-32 bg-gradient-to-b from-navy-900 to-navy-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-px bg-gold-400/50" />
            <span className="text-gold-400 text-sm font-bold tracking-widest">فريق العمل</span>
            <div className="w-8 h-px bg-gold-400/50" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-sand-50 mb-4">قيادة المجموعة</h2>
          <p className="text-sand-300 max-w-2xl mx-auto text-lg">
            فريق من الخبراء يجمع بين الأصالة والمعاصرة في قيادة مسيرة التنمية
          </p>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="glass rounded-3xl p-6 animate-pulse">
                <div className="w-24 h-24 rounded-full bg-gold-400/10 mx-auto mb-4" />
                <div className="h-4 bg-gold-400/10 rounded w-2/3 mx-auto mb-2" />
                <div className="h-3 bg-navy-700/30 rounded w-1/2 mx-auto" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {members.map((member) => (
              <div
                key={member.id}
                className="group glass rounded-3xl p-6 text-center hover:border-gold-400/30 transition-all duration-500 hover:scale-[1.03]"
              >
                <div className="relative w-28 h-28 mx-auto mb-5">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-400/30 to-gold-600/20 blur-md group-hover:blur-lg transition-all" />
                  {member.photo_url ? (
                    <img
                      src={member.photo_url}
                      alt={member.name}
                      className="relative w-full h-full rounded-full object-cover border-2 border-gold-400/30 group-hover:border-gold-400/60 transition-all"
                      loading="lazy"
                      onError={(e) => {
                        const img = e.currentTarget as HTMLImageElement;
                        img.style.display = 'none';
                        const sibling = img.nextElementSibling as HTMLElement | null;
                        if (sibling) sibling.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div className={`absolute inset-0 rounded-full bg-navy-700/50 flex items-center justify-center ${member.photo_url ? 'hidden' : ''}`}>
                    <Users className="text-gold-400/50" size={40} />
                  </div>
                </div>
                <h3 className="text-sand-50 font-bold text-lg mb-1">{member.name}</h3>
                <p className="text-gold-400 text-sm font-medium mb-3">{member.role}</p>
                <p className="text-sand-300 text-xs leading-relaxed line-clamp-3">{member.bio}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
