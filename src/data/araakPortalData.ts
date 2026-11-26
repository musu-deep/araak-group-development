export interface SubBranchItem {
  title: string;
  description: string;
  targetRouting: string;
}

export interface PillarBranch {
  id: string;
  title: string;
  subtitle: string;
  items: SubBranchItem[];
}

export interface StrategicAxis {
  id: string;
  code: string;
  title: string;
  summary: string;
  routingLabel: string;
  contactEmail: string;
  requiresGate?: boolean;
  branches: PillarBranch[];
}

export interface AraakEntity {
  id: string;
  name: string;
  sector:
    | 'التنموي والاستشاري'
    | 'التدريب والأكاديمية'
    | 'التجارة واللوجستيك'
    | 'الصناعة والحديد'
    | 'العقار والمشاريع';
  role: string;
  scope: string;
  imageUrl: string;
  routingKey: string;
}

export type PortalSlide = 'hero' | 'pillars' | 'entities' | 'routing';

export const ARAAK_IDENTITY = {
  groupName: 'مجموعة أراك للتنمية',
  tagline: 'توطين القيم لتمكين التنمية',
  reachMetric: 'أكثر من 53 دولة',
  values: ['الابتكار', 'الاحترافية', 'التعاون'],
  aboutSummary:
    'منظومة تنموية ومؤسسية واستثمارية تعمل على توطين القيم وبناء القدرات البشرية والمؤسسية وإدارة المشاريع والكيانات التشغيلية عبر أكثر من 53 دولة.',
  heroImageUrl:
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=90',
  heroImageAlt: 'واجهة معمارية حديثة تعبر عن رسوخ مجموعة أراك للتنمية وتوسعها المؤسسي',
};

export const STRATEGIC_AXES: StrategicAxis[] = [
  {
    id: 'academy',
    code: '01',
    title: 'أكاديمية أراك الإلكترونية',
    summary: 'منظومة تعليمية وتدريبية متكاملة للدبلومات والدورات التخصصية والبرامج التنموية.',
    routingLabel: 'قسم القبول والتسجيل بالأكاديمية',
    contactEmail: 'academy@araak.org',
    requiresGate: true,
    branches: [
      {
        id: 'diplomas',
        title: 'الدبلومات التدريبية',
        subtitle: 'مسارات تأهيل مهني وتخصصي متكامل',
        items: [
          { title: 'دبلومات إدارية', description: 'إعداد القيادات الإدارية وتطوير الكفاءات التشغيلية.', targetRouting: 'الدبلومات التدريبية — دبلومات إدارية' },
          { title: 'دبلومات تعليمية', description: 'تأهيل الكوادر التربوية والمنهجية التعليمية.', targetRouting: 'الدبلومات التدريبية — دبلومات تعليمية' },
          { title: 'دبلومات تقنية', description: 'بناء القدرات الرقمية والتطبيقات التقنية الحديثة.', targetRouting: 'الدبلومات التدريبية — دبلومات تقنية' },
        ],
      },
      {
        id: 'courses',
        title: 'الدورات التدريبية',
        subtitle: 'حقائب تطبيقية في خمسة قطاعات حيوية',
        items: [
          { title: 'الإدارة والأعمال', description: 'العمليات، القيادة، وإدارة الأداء المؤسسي.', targetRouting: 'الدورات التدريبية — الإدارة والأعمال' },
          { title: 'التسويق والمبيعات', description: 'النمو التجاري، إدارة العملاء، وبناء العلامات.', targetRouting: 'الدورات التدريبية — التسويق والمبيعات' },
          { title: 'التقنية والتكنولوجيا', description: 'التحول الرقمي، الذكاء الاصطناعي، والأنظمة.', targetRouting: 'الدورات التدريبية — التقنية والتكنولوجيا' },
          { title: 'التعليم واللغات', description: 'أساليب التدريس الحديث والمهارات اللغوية.', targetRouting: 'الدورات التدريبية — التعليم واللغات' },
          { title: 'القانون والأنظمة', description: 'الحوكمة، الامتثال، والأطر التنظيمية.', targetRouting: 'الدورات التدريبية — القانون والأنظمة' },
        ],
      },
      {
        id: 'dev-programs',
        title: 'برامج أراك التنموية',
        subtitle: 'مسارات مجتمعية وتأهيلية متنوعة',
        items: [
          { title: 'برامج التدريب', description: 'برامج تطبيقية لرفع الجاهزية المهنية.', targetRouting: 'برامج أراك التنموية — برامج التدريب' },
          { title: 'برامج التعليم', description: 'مبادرات تعليمية لتوسيع أثر المعرفة.', targetRouting: 'برامج أراك التنموية — برامج التعليم' },
          { title: 'برامج مجانية', description: 'مسارات مفتوحة لتمكين أوسع شريحة من المستفيدين.', targetRouting: 'برامج أراك التنموية — برامج مجانية' },
        ],
      },
    ],
  },
  {
    id: 'services',
    code: '02',
    title: 'الخدمات الرئيسية',
    summary: 'الاستشارات المتخصصة، الاعتمادات المهنية والأكاديمية، وحلول التطوير المؤسسي.',
    routingLabel: 'مكتب الخدمات الاستشارية والاعتمادات',
    contactEmail: 'services@araak.org',
    requiresGate: true,
    branches: [
      {
        id: 'consulting',
        title: 'الاستشارات',
        subtitle: 'حلول خبرة لدعم القرار وبناء المنظومات',
        items: [
          { title: 'بيت الخبرة', description: 'دراسات متخصصة واستشارات نوعية للجهات والمنشآت.', targetRouting: 'الاستشارات — بيت الخبرة' },
          { title: 'بناء أنظمة الجودة', description: 'تأسيس وتوثيق ومراجعة أنظمة الجودة والتميز.', targetRouting: 'الاستشارات — بناء أنظمة الجودة' },
          { title: 'التخطيط الاستراتيجي', description: 'صياغة الرؤى، الخطط التشغيلية، ومؤشرات الأداء.', targetRouting: 'الاستشارات — التخطيط الاستراتيجي' },
        ],
      },
      {
        id: 'accreditations',
        title: 'الاعتمادات',
        subtitle: 'أطر اعتماد ومعايير مهنية وأكاديمية',
        items: [
          { title: 'الاعتماد الدولي للمدربين', description: 'تقييم واعتماد المدربين وفق معايير مهنية معتمدة.', targetRouting: 'الاعتمادات — الاعتماد الدولي للمدربين' },
          { title: 'اعتماد البرامج الأكاديمية', description: 'مراجعة واعتماد المناهج والبرامج التدريبية والأكاديمية.', targetRouting: 'الاعتمادات — اعتماد البرامج الأكاديمية' },
        ],
      },
      {
        id: 'institutional-dev',
        title: 'التطوير المؤسسي',
        subtitle: 'رفع الكفاءة التشغيلية وتنظيم الموارد',
        items: [
          { title: 'أتمتة الأعمال', description: 'رقمنة الإجراءات وتسريع تدفقات العمل المؤسسي.', targetRouting: 'التطوير المؤسسي — أتمتة الأعمال' },
          { title: 'هيكلة الموارد', description: 'إعادة ترتيب الهياكل التنظيمية وتوزيع الموارد بفاعلية.', targetRouting: 'التطوير المؤسسي — هيكلة الموارد' },
        ],
      },
    ],
  },
  {
    id: 'initiatives',
    code: '03',
    title: 'المشاريع والمبادرات',
    summary: 'برامج قيادية وتأهيلية ومجتمعية لصناعة الأثر المستدام.',
    routingLabel: 'إدارة المشاريع والمبادرات التنموية',
    contactEmail: 'initiatives@araak.org',
    requiresGate: true,
    branches: [
      {
        id: 'leadership-programs',
        title: 'برامج القيادة',
        subtitle: 'تأهيل الصف القيادي والتربوي',
        items: [
          { title: 'برنامج رشد (صناعة القادة)', description: 'إعداد وتأهيل القيادات القادرة على قيادة التحول.', targetRouting: 'برامج القيادة — برنامج رشد (صناعة القادة)' },
          { title: 'برنامج معين (القيادات التربوية)', description: 'تمكين القيادات التعليمية والتربوية في الميدان.', targetRouting: 'برامج القيادة — برنامج معين (القيادات التربوية)' },
        ],
      },
      {
        id: 'qualification-programs',
        title: 'برامج تأهيلية',
        subtitle: 'بناء الكفاءات المتخصصة والخدمية',
        items: [
          { title: 'برنامج مرقي (تدريب المدربين)', description: 'تأهيل المدربين وتطوير مهارات الإلقاء والتصميم.', targetRouting: 'برامج تأهيلية — برنامج مرقي (تدريب المدربين)' },
          { title: 'برنامج عطاء (القطاع الثالث)', description: 'دعم وتمكين منظمات ومبادرات القطاع غير الربحي.', targetRouting: 'برامج تأهيلية — برنامج عطاء (القطاع الثالث)' },
          { title: 'برنامج وفود (تأهيل الحجاج)', description: 'برامج إرشادية وتأهيلية لخدمة ضيوف الرحمن.', targetRouting: 'برامج تأهيلية — برنامج وفود (تأهيل الحجاج)' },
        ],
      },
      {
        id: 'community-initiatives',
        title: 'مبادرات مجتمعية',
        subtitle: 'مبادرات نوعية لتمكين المجتمع وتوجيه الطاقات',
        items: [
          { title: 'مبادرة ظافرة (تمكين المرأة)', description: 'تعزيز حضور المرأة وتمكينها مهنياً وتنموياً.', targetRouting: 'مبادرات مجتمعية — مبادرة ظافرة (تمكين المرأة)' },
          { title: 'برنامج إدراك (صناعة الداعية)', description: 'تأهيل الكوادر الدعوية بأساليب معاصرة ومنهجية.', targetRouting: 'مبادرات مجتمعية — برنامج إدراك (صناعة الداعية)' },
          { title: 'برنامج غراس (الميول المهنية)', description: 'اكتشاف الميول والقدرات وتوجيه المسارات المهنية.', targetRouting: 'مبادرات مجتمعية — برنامج غراس (الميول المهنية)' },
        ],
      },
    ],
  },
  {
    id: 'publications',
    code: '04',
    title: 'الإصدارات التنموية',
    summary: 'محتوى معرفي وبحثي يوثق التجارب والرؤى التنموية.',
    routingLabel: 'مركز الإصدارات والدراسات',
    contactEmail: 'publications@araak.org',
    requiresGate: false,
    branches: [
      {
        id: 'publications-list',
        title: 'المخرجات المعرفية',
        subtitle: 'منشورات دورية وبحثية وتنموية',
        items: [
          { title: 'النشرات الدورية', description: 'تقارير ومتابعات دورية لأبرز المستجدات التنموية.', targetRouting: 'الإصدارات التنموية — النشرات الدورية' },
          { title: 'المقالات العلمية', description: 'أوراق وطروحات تحليلية متخصصة في التنمية والإدارة.', targetRouting: 'الإصدارات التنموية — المقالات العلمية' },
          { title: 'القصاصات التنموية', description: 'خلاصات مركزة وإضاءات سريعة قابلة للمشاركة والتطبيق.', targetRouting: 'الإصدارات التنموية — القصاصات التنموية' },
        ],
      },
    ],
  },
];

export const ARAAK_ENTITIES: AraakEntity[] = [
  {
    id: 'araak-academy',
    name: 'أكاديمية أراك',
    sector: 'التدريب والأكاديمية',
    role: 'الذراع التدريبي والأكاديمي',
    scope: 'الدبلومات والدورات والبرامج التدريبية الإلكترونية',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=85',
    routingKey: 'كيان أكاديمية أراك',
  },
  {
    id: 'araak-national',
    name: 'أراك الوطنية',
    sector: 'العقار والمشاريع',
    role: 'التطوير والمشاريع الوطنية',
    scope: 'المشاريع التنموية والعمرانية والتشغيلية',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85',
    routingKey: 'كيان أراك الوطنية',
  },
  {
    id: 'araak-commercial',
    name: 'أراك التجارية',
    sector: 'التجارة واللوجستيك',
    role: 'الأنشطة التجارية والتوريد',
    scope: 'التجارة العامة وتوفير المستلزمات والحلول التجارية',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=85',
    routingKey: 'كيان أراك التجارية',
  },
  {
    id: 'araak-projects',
    name: 'أراك المشاريع',
    sector: 'العقار والمشاريع',
    role: 'إدارة وتنفيذ المشاريع',
    scope: 'تخطيط وتنفيذ وإدارة المشاريع الكبرى',
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85',
    routingKey: 'كيان أراك المشاريع',
  },
  {
    id: 'araak-food',
    name: 'أراك الغذائية',
    sector: 'التجارة واللوجستيك',
    role: 'القطاع الغذائي والإمداد',
    scope: 'المنتجات والخدمات الغذائية وسلاسل الإمداد',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=85',
    routingKey: 'كيان أراك الغذائية',
  },
  {
    id: 'araak-industrial',
    name: 'أراك الصناعية',
    sector: 'الصناعة والحديد',
    role: 'التصنيع والإنتاج الصناعي',
    scope: 'العمليات الصناعية والمنتجات التصنيعية',
    imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=85',
    routingKey: 'كيان أراك الصناعية',
  },
  {
    id: 'araak-iron',
    name: 'أراك الحديد',
    sector: 'الصناعة والحديد',
    role: 'الحديد والمواد الإنشائية',
    scope: 'إمدادات وتطبيقات الحديد والصلب الإنشائي',
    imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=85',
    routingKey: 'كيان أراك الحديد',
  },
  {
    id: 'araak-stores',
    name: 'أراك ستورز',
    sector: 'التجارة واللوجستيك',
    role: 'التجارة الإلكترونية والمتاجر',
    scope: 'منصات البيع والمتاجر الرقمية والتجارية',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85',
    routingKey: 'كيان أراك ستورز',
  },
  {
    id: 'araak-logistics',
    name: 'أراك لوجستيك',
    sector: 'التجارة واللوجستيك',
    role: 'الخدمات اللوجستية والنقل',
    scope: 'التخزين، التوزيع، والربط اللوجستي',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85',
    routingKey: 'كيان أراك لوجستيك',
  },
  {
    id: 'araak-home',
    name: 'أراك هوم',
    sector: 'العقار والمشاريع',
    role: 'الحلول السكنية والتجهيز',
    scope: 'تجهيزات المنازل والحلول السكنية المتكاملة',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    routingKey: 'كيان أراك هوم',
  },
  {
    id: 'araak-egypt',
    name: 'مكتب أراك مصر',
    sector: 'التنموي والاستشاري',
    role: 'التمثيل والتشغيل الإقليمي',
    scope: 'المتابعة والتنسيق والخدمات في جمهورية مصر العربية',
    imageUrl: 'https://images.unsplash.com/photo-1572252009286-268f99a7af06?auto=format&fit=crop&w=1200&q=85',
    routingKey: 'مكتب أراك مصر',
  },
  {
    id: 'reyada',
    name: 'ريادة للتطوير والاستشارات',
    sector: 'التنموي والاستشاري',
    role: 'التطوير، الاستشارات، والتدريب القيادي',
    scope: 'بناء القدرات، الاستشارات الإدارية، والتحول الرقمي والذكاء الاصطناعي',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=85',
    routingKey: 'ريادة للتطوير والاستشارات',
  },
  {
    id: 'fas-dev',
    name: 'فاس التنموية',
    sector: 'التنموي والاستشاري',
    role: 'التحول الرقمي والذكاء الاصطناعي والمشاريع التنموية',
    scope: 'تطوير الحلول الرقمية والذكاء الاصطناعي والمشاريع التنموية',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85',
    routingKey: 'فاس التنموية',
  },
  {
    id: 'tanmeyat',
    name: 'مجتمع تنميات',
    sector: 'التنموي والاستشاري',
    role: 'المنصة والمجتمع التنموي',
    scope: 'ربط المبادرات والخبرات والشراكات التنموية',
    imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=85',
    routingKey: 'مجتمع تنميات',
  },
];
