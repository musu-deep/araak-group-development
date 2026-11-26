/*
# Create Araak Development Group schema

1. New Tables
- `news` — news articles published by the group. Columns: id, title, excerpt, content, image_url, category, published_at, created_at.
- `team_members` — leadership team profiles. Columns: id, name, role, bio, photo_url, display_order, created_at.
- `contact_messages` — messages submitted via the website contact form. Columns: id, name, email, subject, message, created_at.
- `subsidiaries` — subsidiary institutions of the group. Columns: id, name, description, icon_name, color_theme, display_order, created_at.

2. Security
- Enable RLS on all tables.
- `news`, `team_members`, `subsidiaries`: grant SELECT to anon + authenticated (public display data).
- `contact_messages`: grant INSERT to anon + authenticated (form submissions); no SELECT/UPDATE/DELETE for anon (private messages).
- All policies documented below.
*/

-- News table
CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text,
  content text,
  image_url text,
  category text DEFAULT 'اخبار اراك',
  published_at date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE news ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON news TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_news" ON news;
CREATE POLICY "anon_select_news" ON news FOR SELECT
TO anon, authenticated USING (true);

-- Team members table
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  bio text,
  photo_url text,
  display_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON team_members TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_team" ON team_members;
CREATE POLICY "anon_select_team" ON team_members FOR SELECT
TO anon, authenticated USING (true);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON contact_messages TO anon, authenticated;

DROP POLICY IF EXISTS "anon_insert_messages" ON contact_messages;
CREATE POLICY "anon_insert_messages" ON contact_messages FOR INSERT
TO anon, authenticated WITH CHECK (true);

-- Subsidiaries table
CREATE TABLE IF NOT EXISTS subsidiaries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  icon_name text DEFAULT 'Building2',
  color_theme text DEFAULT 'emerald',
  display_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE subsidiaries ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON subsidiaries TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_subsidiaries" ON subsidiaries;
CREATE POLICY "anon_select_subsidiaries" ON subsidiaries FOR SELECT
TO anon, authenticated USING (true);

-- Seed news data
INSERT INTO news (title, excerpt, category, published_at, image_url) VALUES
('إطلاق كرسي اراك للتنمية بالجامعة الإسلامية العالمية في بنغلاديش', 'إطلاق كرسي أكاديمي للتنمية بالتعاون مع الجامعة الإسلامية العالمية في بنغلاديش', 'اخبار اراك', '2024-10-23', 'https://www.araak.org/wp-content/uploads/2024/10/doctor-1080x675.png'),
('مذكرة تفاهم بين مجموعة اراك للتنمية و جامعة السلطان احمد شاه الإسلامية', 'توقيع مذكرة تفاهم تعاونية مع جامعة السلطان احمد شاه الإسلامية', 'اخبار اراك', '2024-05-07', 'https://www.araak.org/wp-content/uploads/2024/05/bd452eb6-defb-4d5a-8e58-5e5776b68420-1080x675.jpg'),
('المؤتمر الدولي للتعليم المعاصر في العالم الإسلامي', 'مشاركة مجموعة اراك في المؤتمر الدولي للتعليم المعاصر في العالم الإسلامي', 'اخبار اراك', '2024-05-07', 'https://www.araak.org/wp-content/uploads/2024/05/a7efb74e-a9f5-4c40-8c71-676518eadff4-1080x675.jpg')
ON CONFLICT DO NOTHING;

-- Seed team members
INSERT INTO team_members (name, role, bio, photo_url, display_order) VALUES
('د. علي العتيبي', 'رئيس مجلس الإدارة والرئيس التنفيذي', 'خبير ومستشار في الفكر الاستراتيجي، حاصل على دكتوراه في استراتيجيات التعليم، وله مشاركات داخلية وعالمية في أكثر من 53 دولة', 'https://araak.org/wp-content/uploads/2020/07/Dr.Ali-Pic.jpg', 1),
('عبدالرحمن الملاحمة', 'نائب رئيس مجلس الإدارة', 'مهندس تطبيقي في الاتصالات، ناشط اجتماعي في التنمية ومشارك في عدة محافل داخلية وخارجية', 'https://araak.org/wp-content/uploads/2020/07/Untitled-1.jpg', 2),
('لؤي عبدالله', 'نائب الرئيس التنفيذي', 'مدير محتوى تنموي ومتخصص في تطوير الأعمال والجودة والتميز المؤسسي والبناء الاستراتيجي وصناعة المحتوى', 'https://araak.org/wp-content/uploads/2020/07/Untitled-10.jpg', 3),
('ياسين حسن ابنعوف', 'مدير فرع السودان', 'مدير فرع السودان لمجموعة اراك للتنمية', 'https://araak.org/wp-content/uploads/2020/07/Untitled-1-1.jpg', 4)
ON CONFLICT DO NOTHING;

-- Seed subsidiaries
INSERT INTO subsidiaries (name, description, icon_name, color_theme, display_order) VALUES
('أكاديمية اراك للتدريب', 'مسار التعليم والتدريب وبناء المورد البشري وفق أحدث المعايير المهنية', 'GraduationCap', 'emerald', 1),
('اراك للاستشارات', 'مسار الاستشارات الاستراتيجية والتطوير المؤسسي للمنظمات والمؤسسات', 'Briefcase', 'gold', 2),
('كرسي اراك للتنمية', 'مبادرات أكاديمية وكراسي بحثية في الجامعات الدولية', 'Microscope', 'emerald', 3),
('اراك للمشاريع التنموية', 'تنفيذ البرامج والمشاريع التنموية في التعاون والتمكين المجتمعي', 'Globe', 'gold', 4),
('منصة قصاصات تنموية', 'محتوى تنموي رقمي ونصائح قصيرة لتمكين الأفراد وتحقيق الأهداف', 'Lightbulb', 'emerald', 5)
ON CONFLICT DO NOTHING;
