import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '../utils/constants'
import { DesignIcon, InstallIcon, MaintenanceIcon, ConsultingIcon, BatteryIcon, SupplyIcon, AnalysisIcon } from '../components/SolarIcons'

const SERVICE_DETAILS = {
  design: {
    Icon: DesignIcon,
    image: '/images/WhatsApp Image 2025-12-05 at 3.40.02 PM.jpeg',
    ar: {
      eyebrow: 'خدمة هندسية متكاملة', title: 'تصميم منظومات الطاقة الشمسية',
      intro: 'نحوّل بيانات استهلاك منشأتك إلى تصميم هندسي واضح يوازن بين الإنتاج والاعتمادية والعائد الاقتصادي.',
      outcomes: ['تحليل الاستهلاك والأحمال', 'تحديد قدرة الألواح والإنفيرترات', 'مخططات أحادية الخط وتوزيع المعدات', 'تقدير إنتاج الطاقة والعائد المتوقع'],
      steps: ['جمع بيانات الموقع والاستهلاك', 'زيارة فنية ودراسة المساحات', 'إعداد التصميم والحسابات', 'تسليم عرض فني ومالي واضح'],
      sectors: 'المزارع، المصانع، المستودعات، المباني والمنشآت التجارية', cta: 'اطلب دراسة تصميم لمشروعك',
    },
    en: {
      eyebrow: 'Integrated engineering service', title: 'Solar System Design',
      intro: 'We turn your facility consumption data into a clear engineering design that balances generation, reliability, and economic return.',
      outcomes: ['Consumption and load analysis', 'PV and inverter capacity selection', 'Single-line diagrams and equipment layouts', 'Expected generation and return estimate'],
      steps: ['Collect site and consumption data', 'Conduct a technical site survey', 'Prepare design and calculations', 'Deliver a clear technical and commercial proposal'],
      sectors: 'Farms, factories, warehouses, commercial buildings and facilities', cta: 'Request a design study',
    },
  },
  installation: {
    Icon: InstallIcon,
    image: '/images/WhatsApp Image 2025-12-05 at 3.40.05 PM4.jpeg',
    ar: {
      eyebrow: 'تنفيذ وفق المعايير', title: 'تركيب أنظمة شمسية للمنشآت',
      intro: 'ننّفذ منظومات شمسية آمنة وفعّالة للمشاريع الزراعية والصناعية والتجارية، من تجهيز الموقع حتى التشغيل والربط.',
      outcomes: ['توريد معدات موثوقة ومعتمدة', 'تركيب الهياكل والألواح والإنفيرترات', 'الحماية والتأريض واختبارات السلامة', 'تشغيل وتسليم مع شرح كامل للفريق'],
      steps: ['اعتماد المخططات وخطة التنفيذ', 'توريد المعدات وتجهيز الموقع', 'التركيب والفحوصات الكهربائية', 'التشغيل والتسليم النهائي'],
      sectors: 'المزارع ومضخات المياه، المصانع، المخازن، المتاجر والمنشآت التجارية', cta: 'اطلب معاينة وتركيباً احترافياً',
    },
    en: {
      eyebrow: 'Standards-led delivery', title: 'Solar Installation for Facilities',
      intro: 'We deliver safe, effective solar systems for agricultural, industrial, and commercial projects—from site preparation to commissioning and connection.',
      outcomes: ['Supply of reliable approved equipment', 'Mounting, PV and inverter installation', 'Protection, grounding, and safety testing', 'Commissioning and full team handover'],
      steps: ['Approve drawings and delivery plan', 'Supply equipment and prepare the site', 'Install and conduct electrical tests', 'Commission and hand over'],
      sectors: 'Farms and water pumps, factories, warehouses, retail and commercial facilities', cta: 'Request a site survey and installation',
    },
  },
  maintenance: {
    Icon: MaintenanceIcon,
    image: '/images/WhatsApp Image 2025-12-05 at 3.40.08 PM3.jpeg',
    ar: {
      eyebrow: 'استمرارية أداء منظومتك', title: 'الصيانة والدعم الفني',
      intro: 'نحافظ على أداء منظومتك بأعلى كفاءة من خلال زيارات مجدولة، مراقبة الأداء، واستجابة فنية مدروسة عند الحاجة.',
      outcomes: ['تنظيف وفحص الألواح والهياكل', 'قياس الأداء واكتشاف الانخفاضات', 'فحص الإنفيرترات والحمايات والتوصيلات', 'تقارير صيانة وتوصيات للتحسين'],
      steps: ['تقييم أولي لأداء المنظومة', 'وضع خطة صيانة مناسبة للموقع', 'تنفيذ الفحص والصيانة الوقائية', 'إصدار تقرير الأداء والإجراءات'],
      sectors: 'محطات المزارع، الأسطح الصناعية، المستودعات والمنشآت التجارية', cta: 'اطلب خطة صيانة لمنظومتك',
    },
    en: {
      eyebrow: 'Keep your system performing', title: 'Maintenance & Technical Support',
      intro: 'We maintain system performance through scheduled visits, performance monitoring, and considered technical response when needed.',
      outcomes: ['PV module and structure cleaning and inspection', 'Performance measurement and loss detection', 'Inverter, protection, and connection checks', 'Maintenance reports and improvement recommendations'],
      steps: ['Initial system performance review', 'Build a site-appropriate maintenance plan', 'Perform inspection and preventive maintenance', 'Issue a performance report and actions'],
      sectors: 'Farm plants, industrial rooftops, warehouses and commercial facilities', cta: 'Request a maintenance plan',
    },
  },
  consulting: {
    Icon: ConsultingIcon,
    image: '/images/WhatsApp Image 2025-12-05 at 3.40.07 PM7.jpeg',
    ar: {
      eyebrow: 'قرار استثماري أوضح', title: 'استشارات وحلول طاقة مخصصة',
      intro: 'نساعدك على اختيار المسار المناسب لمشروعك من خلال دراسة احتياجك الفني والتشغيلي والاقتصادي قبل اتخاذ القرار.',
      outcomes: ['مراجعة احتياجات المنشأة وأهدافها', 'مقارنة البدائل الفنية والمعدات', 'تقدير العائد وخطة التنفيذ', 'توصيات عملية قابلة للتنفيذ'],
      steps: ['جلسة استكشاف للاحتياج', 'تحليل بيانات الاستهلاك والموقع', 'إعداد توصية فنية وتجارية', 'مناقشة الخيارات وخطوات البدء'],
      sectors: 'الشركات والمصانع والمزارع والمنشآت التي تخطط للتحول للطاقة الشمسية', cta: 'احجز استشارة لمشروعك',
    },
    en: {
      eyebrow: 'A clearer investment decision', title: 'Consulting & Custom Energy Solutions',
      intro: 'We help you choose the right path through a review of technical, operational, and economic needs before you commit.',
      outcomes: ['Review facility requirements and objectives', 'Compare technical alternatives and equipment', 'Estimate return and delivery plan', 'Provide practical, implementable recommendations'],
      steps: ['Discovery session', 'Analyse consumption and site data', 'Prepare technical and commercial recommendation', 'Review options and next steps'],
      sectors: 'Businesses, factories, farms, and facilities planning their solar transition', cta: 'Book a project consultation',
    },
  },
  storage: {
    Icon: BatteryIcon,
    image: '/images/WhatsApp Image 2025-12-05 at 3.40.09 PM88.jpeg',
    ar: {
      eyebrow: 'طاقة متاحة عند الحاجة', title: 'أنظمة تخزين طاقة متقدمة',
      intro: 'نصمم حلول تخزين تساعد منشأتك على إدارة الطاقة والاستفادة من الإنتاج الشمسي وفق نمط التشغيل الفعلي.',
      outcomes: ['تحديد السعة المناسبة للاستخدام التشغيلي', 'اختيار تقنية البطاريات ووحدات الحماية', 'دمج التخزين مع منظومة الطاقة الشمسية', 'مراقبة الأداء وخطة تشغيل آمنة'],
      steps: ['تحليل الأحمال وأوقات الذروة', 'تصميم السعة وخطة التكامل', 'توريد وتركيب منظومة التخزين', 'اختبار التشغيل والتدريب'],
      sectors: 'المزارع والمصانع والمنشآت التجارية ذات الاحتياج للطاقة عند الطلب', cta: 'اطلب دراسة نظام تخزين',
    },
    en: {
      eyebrow: 'Energy available when needed', title: 'Advanced Energy Storage Systems',
      intro: 'We design storage solutions that help your facility manage energy and use solar generation around its real operating pattern.',
      outcomes: ['Right-size storage for operational use', 'Select battery technology and protection', 'Integrate storage with the solar system', 'Monitor performance and provide a safe operating plan'],
      steps: ['Analyse loads and peak periods', 'Design capacity and integration plan', 'Supply and install the storage system', 'Test, commission, and train'],
      sectors: 'Farms, factories, and commercial facilities with on-demand energy needs', cta: 'Request a storage study',
    },
  },
  supply: {
    Icon: SupplyIcon,
    image: '/images/ja-solar-720w.jpeg',
    ar: {
      eyebrow: 'مكونات موثوقة لمشروعك', title: 'توريد المعدات والأجهزة',
      intro: 'نوفر مكونات منظومات الطاقة الشمسية المناسبة لمتطلبات مشروعك مع التركيز على الجودة والتوافق والاعتمادية طويلة المدى.',
      outcomes: ['ألواح وإنفيرترات ومعدات حماية', 'هياكل وكابلات وملحقات معتمدة', 'مطابقة المعدات مع التصميم الفني', 'تنسيق التوريد والتسليم للمشروع'],
      steps: ['مراجعة قائمة الاحتياجات الفنية', 'اختيار العلامات والمواصفات المناسبة', 'إصدار العرض وخطة التوريد', 'التسليم والتأكد من المطابقة'],
      sectors: 'مشاريع المقاولات والطاقة الشمسية الزراعية والصناعية والتجارية', cta: 'اطلب قائمة معدات لمشروعك',
    },
    en: {
      eyebrow: 'Reliable components for your project', title: 'Equipment & Component Supply',
      intro: 'We supply solar system components suited to your project requirements, with a focus on quality, compatibility, and long-term reliability.',
      outcomes: ['Modules, inverters, and protection equipment', 'Approved structures, cables, and accessories', 'Match equipment to the technical design', 'Coordinate project supply and delivery'],
      steps: ['Review the technical requirements list', 'Select suitable brands and specifications', 'Issue proposal and supply plan', 'Deliver and verify compliance'],
      sectors: 'Agricultural, industrial, commercial, and EPC solar projects', cta: 'Request an equipment list',
    },
  },
  feasibility: {
    Icon: AnalysisIcon,
    image: '/images/WhatsApp Image 2025-12-05 at 3.40.10 PM56.jpeg',
    ar: {
      eyebrow: 'استثمار مدروس', title: 'دراسات الجدوى والتحليل الاقتصادي',
      intro: 'نوضح الصورة المالية لمشروعك من خلال تحليل الاستهلاك والإنتاج المتوقع والتكاليف والعائد قبل بدء التنفيذ.',
      outcomes: ['تحليل الاستهلاك ونمط التشغيل', 'تقدير الإنتاج السنوي المتوقع', 'حساب التوفير وفترة الاسترداد', 'سيناريوهات تنفيذ تساعد القرار'],
      steps: ['استلام الفواتير وبيانات التشغيل', 'تحليل الاستهلاك والموقع', 'إعداد النموذج الاقتصادي', 'عرض النتائج والتوصيات'],
      sectors: 'المشاريع الزراعية والصناعية والتجارية التي تحتاج قراراً استثمارياً مدروساً', cta: 'اطلب دراسة جدوى لمشروعك',
    },
    en: {
      eyebrow: 'An informed investment', title: 'Feasibility Studies & Economic Analysis',
      intro: 'We clarify the financial view of your project by analysing consumption, expected generation, cost, and return before delivery starts.',
      outcomes: ['Consumption and operating-pattern analysis', 'Expected annual generation estimate', 'Savings and payback calculation', 'Delivery scenarios to support decisions'],
      steps: ['Receive bills and operating data', 'Analyse consumption and site', 'Prepare the economic model', 'Present results and recommendations'],
      sectors: 'Agricultural, industrial, and commercial projects requiring an informed investment decision', cta: 'Request a feasibility study',
    },
  },
}

const ServiceDetail = () => {
  const { serviceId } = useParams()
  const { i18n } = useTranslation()
  const service = SERVICE_DETAILS[serviceId]

  if (!service) return <Navigate to={ROUTES.services} replace />

  const copy = i18n.language === 'ar' ? service.ar : service.en
  const Icon = service.Icon
  const isArabic = i18n.language === 'ar'

  return (
    <div className="w-full bg-[#f4f8f4]">
      <section className="relative overflow-hidden bg-[#0d321f] py-20 md:py-28">
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: `linear-gradient(90deg, rgba(6, 25, 14, .94), rgba(6, 25, 14, .52)), url("${service.image}")`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute -top-24 end-10 h-72 w-72 rounded-full bg-yellow-primary/15 blur-3xl" />
        <div className="container relative mx-auto px-4 md:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="max-w-3xl text-start">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-primary text-[#15321f] shadow-xl"><Icon size={38} /></div>
            <p className="mb-3 text-sm font-bold tracking-wide text-yellow-primary">{copy.eyebrow}</p>
            <h1 className="text-4xl font-extrabold leading-tight text-white md:text-6xl">{copy.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-green-50/80 md:text-xl">{copy.intro}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid gap-7 lg:grid-cols-2">
            <div className="rounded-[2rem] bg-white p-8 shadow-[0_20px_48px_-34px_rgba(15,56,31,.38)] md:p-10">
              <p className="text-sm font-bold text-green-primary">{isArabic ? 'ماذا تتضمن الخدمة؟' : 'What the service includes'}</p>
              <h2 className="mt-3 text-3xl font-extrabold text-gray-900">{isArabic ? 'مخرجات واضحة لمشروعك' : 'Clear deliverables for your project'}</h2>
              <ul className="mt-7 space-y-4">{copy.outcomes.map((item) => <li key={item} className="flex gap-3 text-gray-700"><span className="mt-1.5 h-2.5 w-2.5 flex-none rounded-full bg-yellow-primary" />{item}</li>)}</ul>
            </div>
            <div className="rounded-[2rem] bg-[#153c27] p-8 text-white shadow-[0_20px_48px_-34px_rgba(15,56,31,.38)] md:p-10">
              <p className="text-sm font-bold text-yellow-primary">{isArabic ? 'كيف نعمل؟' : 'How we work'}</p>
              <h2 className="mt-3 text-3xl font-extrabold">{isArabic ? 'من الفكرة إلى التشغيل' : 'From idea to delivery'}</h2>
              <ol className="mt-7 space-y-5">{copy.steps.map((step, index) => <li key={step} className="flex items-start gap-4"><span className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-yellow-primary/50 text-sm font-bold text-yellow-primary">0{index + 1}</span><span className="pt-1 text-green-50/85">{step}</span></li>)}</ol>
            </div>
          </div>

          <div className="mt-7 rounded-[2rem] border border-green-primary/10 bg-white p-8 text-center shadow-[0_20px_48px_-34px_rgba(15,56,31,.28)] md:p-10">
            <p className="text-sm font-bold text-green-primary">{isArabic ? 'القطاعات المستهدفة' : 'Sectors we serve'}</p>
            <p className="mx-auto mt-3 max-w-3xl text-xl leading-8 text-gray-700">{copy.sectors}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to={ROUTES.contact} className="rounded-full bg-green-primary px-8 py-4 font-bold text-white shadow-lg transition-transform hover:scale-105">{copy.cta}</Link>
              <Link to={ROUTES.services} className="rounded-full border border-green-primary/25 bg-white px-8 py-4 font-bold text-green-primary transition-colors hover:bg-green-primary/5">{isArabic ? 'العودة إلى الخدمات' : 'Back to services'}</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServiceDetail

