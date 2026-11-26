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
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=90',
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
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=90',
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
    imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=90',
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
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1600&q=90',
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
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1400&q=85',
    routingKey: 'أكاديمية أراك',
  },
  {
    id: 'araak-national',
    code: '02',
    name: 'أراك الوطنية',
    sector: 'التطوير والمشاريع',
    headline: 'التطوير العقاري والمشاريع الوطنية',
    scope: 'قيادة المشاريع العمرانية والتطويرية وبناء الشراكات الاستثمارية ذات الأثر المستدام.',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=85',
    routingKey: 'أراك الوطنية',
  },
  {
    id: 'araak-projects',
    code: '03',
    name: 'أراك المشاريع',
    sector: 'التطوير والمشاريع',
    headline: 'إدارة وتنفيذ المشاريع الهندسية والإنشائية',
    scope: 'التخطيط الهندسي، إدارة المقاولات، وتنفيذ المشاريع وفق أعلى معايير الجودة والانضباط.',
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=85',
    routingKey: 'أراك المشاريع',
  },
  {
    id: 'araak-commercial',
    code: '04',
    name: 'أراك التجارية',
    sector: 'التجارة والإمداد',
    headline: 'توريد مواد البناء والتعاقد من الباطن المتخصص',
    scope: 'توريد مواد بناء عالية الجودة وتنفيذ خدمات التعاقد من الباطن المتخصصة للمقاولين وتجار الجملة والتجزئة وأصحاب المشاريع.',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=85',
    routingKey: 'أراك التجارية',
  },
  {
    id: 'araak-development',
    code: '05',
    name: 'أراك التنمية',
    sector: 'التدريب والأكاديمية',
    headline: 'الاستشارات وتطوير الأعمال والتدريب والحلول التعليمية',
    scope: 'تنمية العنصر البشري وتعزيز قدراته عبر فرق مؤهلة وبرامج مبتكرة علمياً وعملياً لبناء مجتمع حضاري، مع الاستشارات وتطوير الأعمال والحلول التعليمية.',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=85',
    routingKey: 'أراك التنمية',
  },
  {
    id: 'araak-industrial',
    code: '06',
    name: 'أراك الصناعية',
    sector: 'الصناعة والحديد',
    headline: 'التصنيع والإنتاج الصناعي المتكامل',
    scope: 'تطوير خطوط الإنتاج الصناعي ودعم المحتوى المحلي في الصناعات التحويلية.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1400&q=85',
    routingKey: 'أراك الصناعية',
  },
  {
    id: 'araak-iron',
    code: '07',
    name: 'أراك الحديد',
    sector: 'الصناعة والحديد',
    headline: 'الصلب المجلفن والمدرفل وقواطع الحوائط والأسقف الفولاذية',
    scope: 'تصنيع الصفائح عالية الجودة من الصلب المجلفن ولفائف الصلب المدرفلة على الساخن والبارد، وقواطع الحوائط الجافة وإكسسوارات الأسقف الفولاذية.',
    imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1400&q=85',
    routingKey: 'أراك الحديد',
  },
  {
    id: 'araak-stores',
    code: '08',
    name: 'أراك ستورز',
    sector: 'اللوجستيك والتجزئة',
    headline: 'المنتجات المنزلية ومستلزمات الديكور',
    scope: 'متجر حديث يضم أحدث المنتجات المنزلية ومستلزمات الديكور بتجربة تسوق متكاملة.',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=85',
    routingKey: 'أراك ستورز',
  },
  {
    id: 'araak-logistics',
    code: '09',
    name: 'أراك لوجستيك',
    sector: 'اللوجستيك والتجزئة',
    headline: 'الخدمات اللوجستية والنقل والتخزين',
    scope: 'حلول النقل، المستودعات، وإدارة حركة البضائع وسلاسل التوريد.',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=85',
    routingKey: 'أراك لوجستيك',
  },
  {
    id: 'araak-home',
    code: '10',
    name: 'أراك هوم',
    sector: 'التطوير والمشاريع',
    headline: 'الحلول السكنية والتأثيث المتكامل',
    scope: 'تجهيز وتأثيث الوحدات السكنية وتقديم حلول المعيشة العصرية.',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
    routingKey: 'أراك هوم',
  },
];
