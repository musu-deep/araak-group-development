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
  requiresGate: boolean;
  imageUrl: string;
  imageAlt: string;
  branches: PillarBranch[];
}

export interface AraakCompany {
  id: string;
  code: string;
  name: string;
  sector: 'التدريب والأكاديمية' | 'التطوير والمشاريع' | 'التجارة والإمداد' | 'الصناعة والحديد' | 'اللوجستيك والتجزئة';
  headline: string;
  scope: string;
  imageUrl: string;
  routingKey: string;
}

export interface AraakNewsHighlight {
  id: string;
  title: string;
  tag: string;
  summary: string;
}

export type SceneId = 'sovereign' | 'developmental' | 'investment' | 'initiatives' | 'routing';

export const SCENE_META: {
  id: SceneId;
  shortTitle: string;
  eyebrow: string;
  bgImage: string;
}[] = [
  {
    id: 'sovereign',
    shortTitle: 'الرئيسية',
    eyebrow: '01 / الهوية السيادية',
    bgImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=90',
  },
  {
    id: 'developmental',
    shortTitle: 'التنمية والاستشارات',
    eyebrow: '02 / المسار التنموي والمعرفي',
    bgImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=90',
  },
  {
    id: 'investment',
    shortTitle: 'الشركات والاستثمار',
    eyebrow: '03 / المسار الاستثماري والتشغيلي',
    bgImage: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=2400&q=90',
  },
  {
    id: 'initiatives',
    shortTitle: 'المبادرات والإصدارات',
    eyebrow: '04 / الأثر المجتمعي والإصدارات',
    bgImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=90',
  },
  {
    id: 'routing',
    shortTitle: 'التواصل مع أراك',
    eyebrow: '05 / التواصل المباشر مع الجهات',
    bgImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=2400&q=90',
  },
];

export const ARAAK_IDENTITY = {
  groupName: 'مجموعة أراك للتنمية',
  tagline: 'نحو توطين القيم لتمكين التنمية',
  reachMetric: '+53 دولة',
  reachLabel: 'انتشار دولي وأثر ممتد',
  values: ['الابتكار', 'الاحترافية', 'التعاون'],
  aboutSummary:
    'منظومة تنموية واستثمارية تجمع بين الأصالة والمعاصرة عبر فرق مؤهلة وبرامج مبتكرة علمياً وعملياً لتنمية العنصر البشري وبناء مجتمع حضاري وإدارة شركات تشغيلية وصناعية وتجارية.',
  address: 'جدة - حي الروضة',
  phoneMain: '00966126440098',
  phoneSms: '00966598175754',
  email: 'info@araak.org',
};

export const ARAAK_NEWS_HIGHLIGHTS: AraakNewsHighlight[] = [
  {
    id: 'chair-bangladesh',
    title: 'إطلاق كرسي أراك للتنمية بالجامعة الإسلامية العالمية',
    tag: 'شراكة أكاديمية دولية',
    summary: 'تعزيز البحث العلمي والتنمية المستدامة وبناء القدرات المؤسسية والأكاديمية.',
  },
  {
    id: 'mou-universities',
    title: 'مذكرات تفاهم ومؤتمرات دولية للتعليم المعاصر',
    tag: 'تعاون مؤسسي',
    summary: 'توسيع الأطر التعليمية والتنموية وتبادل الخبرات مع الجامعات والمؤسسات الدولية.',
  },
  {
    id: 'strategic-workshops',
    title: 'ورش عمل البناء الاستراتيجي والتميز المؤسسي',
    tag: 'تمكين القيادات',
    summary: 'تأهيل الكوادر والمنشآت على التخطيط الاستراتيجي والحوكمة وجودة الأداء.',
  },
];

export const DEVELOPMENTAL_AXES: StrategicAxis[] = [
  {
    id: 'academy',
    code: '01',
    title: 'أكاديمية أراك الإلكترونية',
    summary: 'منصة إلكترونية تقدم خدمات أراك بطريقة تقنية وسهلة الاستخدام للدبلومات والدورات والبرامج التنموية.',
    routingLabel: 'قسم القبول والتسجيل بالأكاديمية',
    contactEmail: 'academy@araak.org',
    requiresGate: true,
    imageUrl: 'https://www.araak.org/wp-content/uploads/2024/05/a7efb74e-a9f5-4c40-8c71-676518eadff4-1080x675.jpg',
    imageAlt: 'بيئة التدريب والتأهيل في أكاديمية أراك الإلكترونية',
    branches: [
      {
        id: 'diplomas',
        title: 'الدبلومات التدريبية',
        subtitle: 'مسارات تأهيل مهني وتخصصي',
        items: [
          { title: 'دبلومات إدارية', description: 'إعداد القيادات الإدارية وتطوير الكفاءات التشغيلية.', targetRouting: 'الدبلومات التدريبية — دبلومات إدارية' },
          { title: 'دبلومات تعليمية', description: 'تأهيل الكوادر التربوية والمنهجية التعليمية.', targetRouting: 'الدبلومات التدريبية — دبلومات تعليمية' },
          { title: 'دبلومات تقنية', description: 'بناء القدرات الرقمية والتطبيقات التقنية الحديثة.', targetRouting: 'الدبلومات التدريبية — دبلومات تقنية' },
        ],
      },
      {
        id: 'courses',
        title: 'الدورات التدريبية',
        subtitle: 'حقائب تطبيقية في خمسة قطاعات',
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
        subtitle: 'مسارات تأهيلية ومفتوحة',
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
    title: 'الخدمات الرئيسية والاستشارات',
    summary: 'الاستشارات المتخصصة، الاعتمادات المهنية والأكاديمية، وحلول التطوير المؤسسي.',
    routingLabel: 'مكتب الخدمات الاستشارية والاعتمادات',
    contactEmail: 'services@araak.org',
    requiresGate: true,
    imageUrl: 'https://www.araak.org/wp-content/uploads/2019/02/%D9%88%D8%B1%D8%B4%D8%A9-%D8%B9%D9%85%D9%84-%D8%A7%D9%84%D8%A8%D9%86%D8%A7%D8%A1-%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%B1%D8%A7%D8%AA%D9%8A%D8%AC%D9%8A-%D8%AC%D8%AF%D9%87-%D9%86%D9%88%D9%81%D9%85%D8%A8.jpg',
    imageAlt: 'الاستشارات الاستراتيجية وبناء أنظمة الجودة والتطوير المؤسسي',
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
        subtitle: 'معايير مهنية وأكاديمية معتمدة',
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
];

export const INITIATIVES_AND_PUBLICATIONS: StrategicAxis[] = [
  {
    id: 'initiatives',
    code: '03',
    title: 'المشاريع والمبادرات',
    summary: 'برامج قيادية وتأهيلية ومجتمعية لصناعة الأثر المستدام.',
    routingLabel: 'إدارة المشاريع والمبادرات التنموية',
    contactEmail: 'initiatives@araak.org',
    requiresGate: true,
    imageUrl: 'https://www.araak.org/wp-content/uploads/2024/05/bd452eb6-defb-4d5a-8e58-5e5776b68420-1080x675.jpg',
    imageAlt: 'المشاريع القيادية والتأهيلية والمبادرات المجتمعية في مجموعة أراك',
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
    imageUrl: 'https://www.araak.org/wp-content/uploads/2024/10/doctor-1080x675.png',
    imageAlt: 'الإصدارات التنموية والنشرات الدورية والمقالات العلمية',
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

export const ARAAK_COMPANIES: AraakCompany[] = [
  {
    id: 'araak-academy',
    code: '01',
    name: 'أكاديمية أراك',
    sector: 'التدريب والأكاديمية',
    headline: 'الذراع التدريبي والأكاديمي للمجموعة',
    scope: 'منصة إلكترونية تقدم خدمات أراك بطريقة تقنية وسهلة الاستخدام للدبلومات والدورات والبرامج التدريبية.',
    imageUrl: 'https://www.araak.org/wp-content/uploads/2023/09/academy-logo.png',
    routingKey: 'أكاديمية أراك',
  },
  {
    id: 'araak-national',
    code: '02',
    name: 'أراك الوطنية',
    sector: 'التطوير والمشاريع',
    headline: 'التطوير العقاري والمشاريع الوطنية',
    scope: 'قيادة المشاريع العمرانية والتطويرية وبناء الشراكات الاستثمارية ذات الأثر المستدام.',
    imageUrl: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=1400&q=85',
    routingKey: 'أراك الوطنية',
  },
  {
    id: 'araak-projects',
    code: '03',
    name: 'أراك المشاريع',
    sector: 'التطوير والمشاريع',
    headline: 'إدارة وتنفيذ المشاريع الهندسية والإنشائية',
    scope: 'التخطيط الهندسي، إدارة المقاولات، وتنفيذ المشاريع وفق أعلى معايير الجودة والانضباط.',
    imageUrl: 'https://www.araak.org/wp-content/uploads/2019/02/%D9%88%D8%B1%D8%B4%D8%A9-%D8%B9%D9%85%D9%84-%D8%A7%D9%84%D8%A8%D9%86%D8%A7%D8%A1-%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%B1%D8%A7%D8%AA%D9%8A%D8%AC%D9%8A-%D8%AC%D8%AF%D9%87-%D9%86%D9%88%D9%81%D9%85%D8%A8.jpg',
    routingKey: 'أراك المشاريع',
  },
  {
    id: 'araak-commercial',
    code: '04',
    name: 'أراك التجارية',
    sector: 'التجارة والإمداد',
    headline: 'توريد مواد البناء والتعاقد من الباطن المتخصص',
    scope: 'توريد مواد بناء عالية الجودة وتنفيذ خدمات التعاقد من الباطن المتخصصة للمقاولين وتجار الجملة والتجزئة وأصحاب المشاريع.',
    imageUrl: 'https://www.araak.org/wp-content/uploads/2023/08/%D8%A7%D8%B1%D8%A7%D9%83_%D8%A7%D9%84%D8%AA%D8%AC%D8%A7%D8%B1%D9%8A%D8%A9-removebg-preview-2.png',
    routingKey: 'أراك التجارية',
  },
  {
    id: 'araak-development',
    code: '05',
    name: 'أراك التنمية',
    sector: 'التدريب والأكاديمية',
    headline: 'الاستشارات وتطوير الأعمال والتدريب والحلول التعليمية',
    scope: 'تنمية العنصر البشري وتعزيز قدراته عبر فرق مؤهلة وبرامج مبتكرة علمياً وعملياً لبناء مجتمع حضاري، مع الاستشارات وتطوير الأعمال والحلول التعليمية.',
    imageUrl: 'https://www.araak.org/wp-content/uploads/2024/10/doctor-1080x675.png',
    routingKey: 'أراك التنمية',
  },
  {
    id: 'araak-industrial',
    code: '06',
    name: 'أراك الصناعية',
    sector: 'الصناعة والحديد',
    headline: 'التصنيع والإنتاج الصناعي المتكامل',
    scope: 'تطوير خطوط الإنتاج الصناعي ودعم المحتوى المحلي في الصناعات التحويلية.',
    imageUrl: 'https://www.araak.org/wp-content/uploads/2023/09/Layer-11.png',
    routingKey: 'أراك الصناعية',
  },
  {
    id: 'araak-iron',
    code: '07',
    name: 'أراك الحديد',
    sector: 'الصناعة والحديد',
    headline: 'الصلب المجلفن والمدرفل وقواطع الحوائط والأسقف الفولاذية',
    scope: 'تصنيع الصفائح عالية الجودة من الصلب المجلفن ولفائف الصلب المدرفلة على الساخن والبارد، وقواطع الحوائط الجافة وإكسسوارات الأسقف الفولاذية.',
    imageUrl: 'https://www.araak.org/wp-content/uploads/2023/09/Layer-4.png',
    routingKey: 'أراك الحديد',
  },
  {
    id: 'araak-stores',
    code: '08',
    name: 'أراك ستورز',
    sector: 'اللوجستيك والتجزئة',
    headline: 'المنتجات المنزلية ومستلزمات الديكور',
    scope: 'متجر حديث يضم أحدث المنتجات المنزلية ومستلزمات الديكور بتجربة تسوق متكاملة.',
    imageUrl: 'https://www.araak.org/wp-content/uploads/2023/09/STORES-LOGO.png',
    routingKey: 'أراك ستورز',
  },
  {
    id: 'araak-logistics',
    code: '09',
    name: 'أراك لوجستيك',
    sector: 'اللوجستيك والتجزئة',
    headline: 'الخدمات اللوجستية والنقل والتخزين',
    scope: 'حلول النقل، المستودعات، وإدارة حركة البضائع وسلاسل التوريد.',
    imageUrl: 'https://www.araak.org/wp-content/uploads/2024/05/bd452eb6-defb-4d5a-8e58-5e5776b68420-1080x675.jpg',
    routingKey: 'أراك لوجستيك',
  },
  {
    id: 'araak-home',
    code: '10',
    name: 'أراك هوم',
    sector: 'التطوير والمشاريع',
    headline: 'الحلول السكنية والتأثيث المتكامل',
    scope: 'تجهيز وتأثيث الوحدات السكنية وتقديم حلول المعيشة العصرية.',
    imageUrl: 'https://www.araak.org/wp-content/uploads/2023/09/decore.png',
    routingKey: 'أراك هوم',
  },
];

