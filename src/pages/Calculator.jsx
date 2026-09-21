import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
} from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { ROUTES } from '../utils/constants'
import ModernSelect from '../components/ModernSelect'
import { CalculatorIcon } from '../components/SolarIcons'
import ThoughtLine from '../components/ThoughtLine'
import PageCinematicHero from '../components/PageCinematicHero'

/* ──────────────────────────────────────────────────────────────────────
   SOLAR DATA CONSTANTS — client official simplified sizing model
   Core sizing/savings use the client formula (implemented literally).
   Secondary constants (cost, CO2, area, battery) drive the downstream
   metrics, recomputed from the resulting system size.
   ────────────────────────────────────────────────────────────────────── */

// Saudi cities — used for lead capture. The engineer's Excel model uses fixed
// design assumptions, so city selection does not alter its formulas.
const CITIES = {
  riyadh: { ar: 'الرياض', en: 'Riyadh' }, diriyah: { ar: 'الدرعية', en: 'Diriyah' },
  kharj: { ar: 'الخرج', en: 'Al Kharj' }, majmaah: { ar: 'المجمعة', en: 'Al Majmaah' },
  zulfi: { ar: 'الزلفي', en: 'Az Zulfi' }, shaqra: { ar: 'شقراء', en: 'Shaqra' },
  dawadmi: { ar: 'الدوادمي', en: 'Ad Dawadmi' }, afif: { ar: 'عفيف', en: 'Afif' },
  quwayiyah: { ar: 'القويعية', en: 'Al Quwayiyah' }, wadi_dawasir: { ar: 'وادي الدواسر', en: 'Wadi ad Dawasir' },
  jeddah: { ar: 'جدة', en: 'Jeddah' }, mecca: { ar: 'مكة المكرمة', en: 'Makkah' },
  taif: { ar: 'الطائف', en: 'Taif' }, rabigh: { ar: 'رابغ', en: 'Rabigh' }, lith: { ar: 'الليث', en: 'Al Lith' },
  qunfudhah: { ar: 'القنفذة', en: 'Al Qunfudhah' }, bahrah: { ar: 'بحرة', en: 'Bahrah' },
  medina: { ar: 'المدينة المنورة', en: 'Madinah' }, yanbu: { ar: 'ينبع', en: 'Yanbu' },
  ula: { ar: 'العلا', en: 'Al Ula' }, badr: { ar: 'بدر', en: 'Badr' }, khaybar: { ar: 'خيبر', en: 'Khaybar' },
  dammam: { ar: 'الدمام', en: 'Dammam' }, khobar: { ar: 'الخبر', en: 'Al Khobar' },
  dhahran: { ar: 'الظهران', en: 'Dhahran' }, qatf: { ar: 'القطيف', en: 'Al Qatif' },
  jubail: { ar: 'الجبيل', en: 'Al Jubail' }, ras_tanura: { ar: 'رأس تنورة', en: 'Ras Tanura' },
  hofuf: { ar: 'الهفوف', en: 'Al Hofuf' }, mubarrazz: { ar: 'المبرز', en: 'Al Mubarraz' },
  hafr_batin: { ar: 'حفر الباطن', en: 'Hafr Al Batin' }, khafji: { ar: 'الخفجي', en: 'Al Khafji' },
  buraidah: { ar: 'بريدة', en: 'Buraidah' }, unaizah: { ar: 'عنيزة', en: 'Unaizah' },
  rass: { ar: 'الرس', en: 'Ar Rass' }, bukayriyah: { ar: 'البكيرية', en: 'Al Bukayriyah' },
  abha: { ar: 'أبها', en: 'Abha' }, khamis_mushait: { ar: 'خميس مشيط', en: 'Khamis Mushait' },
  bisha: { ar: 'بيشة', en: 'Bisha' }, muhayil: { ar: 'محايل عسير', en: 'Muhayil' },
  rjal_almaa: { ar: 'رجال ألمع', en: 'Rijal Almaa' }, namas: { ar: 'النماص', en: 'An Namas' },
  tabuk: { ar: 'تبوك', en: 'Tabuk' }, duba: { ar: 'ضباء', en: 'Duba' }, umluj: { ar: 'أملج', en: 'Umluj' },
  wajh: { ar: 'الوجه', en: 'Al Wajh' }, tayma: { ar: 'تيماء', en: 'Tayma' }, haql: { ar: 'حقل', en: 'Haql' },
  hail: { ar: 'حائل', en: 'Hail' }, baqaa: { ar: 'بقعاء', en: 'Baqaa' }, ghazalah: { ar: 'الغزالة', en: 'Al Ghazalah' },
  sakaka: { ar: 'سكاكا', en: 'Sakaka' }, qurayyat: { ar: 'القريات', en: 'Al Qurayyat' },
  dumat_jandal: { ar: 'دومة الجندل', en: 'Dumat Al Jandal' }, tabarjal: { ar: 'طبرجل', en: 'Tabarjal' },
  arar: { ar: 'عرعر', en: 'Arar' }, rafha: { ar: 'رفحاء', en: 'Rafha' }, turaif: { ar: 'طريف', en: 'Turaif' },
  najran: { ar: 'نجران', en: 'Najran' }, sharurah: { ar: 'شرورة', en: 'Sharurah' }, habuna: { ar: 'حبونا', en: 'Hubuna' },
  jizan: { ar: 'جازان', en: 'Jazan' }, sabya: { ar: 'صبيا', en: 'Sabya' },
  abu_arish: { ar: 'أبو عريش', en: 'Abu Arish' }, samtah: { ar: 'صامطة', en: 'Samtah' },
  bish: { ar: 'بيش', en: 'Bish' }, farasan: { ar: 'فرسان', en: 'Farasan' },
  bahah: { ar: 'الباحة', en: 'Al Bahah' }, baljurashi: { ar: 'بلجرشي', en: 'Baljurashi' },
  mandaq: { ar: 'المندق', en: 'Al Mandaq' }, mikhwah: { ar: 'المخواة', en: 'Al Mikhwah' },
}

// Engineering workbook assumptions (Sheet1, C33:G36 / G10:G13).
const ENGINEERING_TARIFF_SAR_PER_KWH = 0.22
const DAYS_PER_MONTH = 30
const GRID_LOSS_MARGIN = 1.15
const GRID_PEAK_SUN_HOURS = 6
const OFF_GRID_LOSS_MARGIN = 1.3
const OFF_GRID_PEAK_SUN_HOURS = 4
const PANEL_WATTAGE_W = 550

// Engineer-approved preliminary price for agricultural, industrial, and commercial projects.
// Storage and site-specific civil works are quoted separately.
const ENGINEER_ESTIMATED_PRICE_PER_KW = 1500

// Production constants
const SYSTEM_EFFICIENCY = 0.8
const DAYS_PER_YEAR = 365

// Secondary metrics. Pricing is intentionally not calculated: the approved
// engineering workbook contains no price formula.
const PANEL_AREA_M2 = 2.2
const CO2_KG_PER_KWH = 0.72
const TREES_PER_TON_CO2 = 45
const BATTERY_DOD = 0.8
// WhatsApp business number — same value as the floating WhatsAppButton component
const WHATSAPP_PHONE = '966552277824'

/* ── Formulas ─────────────────────────────────────────────────────────── */

const computeResults = ({ systemType, backupHours, inputMode, value, pumpHorsepower, loads = [] }) => {
  if (systemType === 'pumpSystem') {
    const horsepower = Number(pumpHorsepower) || 0
    const pumpWatts = horsepower * 1000 * 1.15
    const stationWatts = (pumpWatts * 0.7) >= (horsepower * 746) ? pumpWatts : pumpWatts + (16 * 720)
    const stationKw = stationWatts / 1000
    const inverterKw = (horsepower * 746 * 1.4) / 1000
    const numPanels = Math.ceil((stationKw * 1000) / PANEL_WATTAGE_W)
    const annualKwh = stationKw * SYSTEM_EFFICIENCY * GRID_PEAK_SUN_HOURS * DAYS_PER_YEAR
    const annualSavings = annualKwh * ENGINEERING_TARIFF_SAR_PER_KWH
    const estimatedSystemCostSAR = stationKw * ENGINEER_ESTIMATED_PRICE_PER_KW
    const co2TonYear = (annualKwh * CO2_KG_PER_KWH) / 1000
    return { monthlyKwh: annualKwh / 12, actualKw: stationKw, numPanels, inverterKw, annualKwh, annualSavings, estimatedSystemCostSAR, co2TonYear, treesEquiv: Math.round(co2TonYear * TREES_PER_TON_CO2), areaM2: numPanels * PANEL_AREA_M2, needsBattery: false, batteryKwh: 0, isPump: true, pumpHorsepower: horsepower }
  }

  if (systemType === 'offGrid' && loads.some((load) => Number(load.power) > 0 && Number(load.quantity) > 0)) {
    const dayWh = loads.reduce((sum, load) => sum + (Number(load.power) || 0) * (Number(load.quantity) || 0) * (Number(load.dayHours) || 0), 0)
    const nightWh = loads.reduce((sum, load) => sum + (Number(load.power) || 0) * (Number(load.quantity) || 0) * (Number(load.nightHours) || 0), 0)
    const totalWh = dayWh + nightWh
    const totalLoadKw = loads.reduce((sum, load) => sum + (Number(load.power) || 0) * (Number(load.quantity) || 0), 0) / 1000
    const stationKw = (totalWh * OFF_GRID_LOSS_MARGIN / OFF_GRID_PEAK_SUN_HOURS) / 1000
    const inverterKw = totalLoadKw * OFF_GRID_LOSS_MARGIN
    const batteryKwh = (nightWh * OFF_GRID_LOSS_MARGIN / BATTERY_DOD) / 1000
    const numPanels = Math.ceil((stationKw * 1000) / PANEL_WATTAGE_W)
    const annualKwh = stationKw * SYSTEM_EFFICIENCY * GRID_PEAK_SUN_HOURS * DAYS_PER_YEAR
    const annualSavings = annualKwh * ENGINEERING_TARIFF_SAR_PER_KWH
    const estimatedSystemCostSAR = stationKw * ENGINEER_ESTIMATED_PRICE_PER_KW
    const co2TonYear = (annualKwh * CO2_KG_PER_KWH) / 1000
    return { monthlyKwh: totalWh * DAYS_PER_MONTH / 1000, actualKw: stationKw, numPanels, inverterKw, annualKwh, annualSavings, estimatedSystemCostSAR, co2TonYear, treesEquiv: Math.round(co2TonYear * TREES_PER_TON_CO2), areaM2: numPanels * PANEL_AREA_M2, needsBattery: true, batteryKwh, dayEnergyKwh: dayWh / 1000, nightEnergyKwh: nightWh / 1000, totalLoadKw, isOffGridTable: true }
  }

  // Workbook bill model: monthly bill ÷ 0.22 = monthly consumption in kWh.
  const monthlyKwh = inputMode === 'bill' ? value / ENGINEERING_TARIFF_SAR_PER_KWH : value
  const dailyKwh = monthlyKwh / DAYS_PER_MONTH
  const needsBattery = systemType === 'offGrid'
  const lossMargin = needsBattery ? OFF_GRID_LOSS_MARGIN : GRID_LOSS_MARGIN
  const peakSunHours = needsBattery ? OFF_GRID_PEAK_SUN_HOURS : GRID_PEAK_SUN_HOURS
  const stationKw = (dailyKwh * lossMargin) / peakSunHours
  const inverterKw = needsBattery ? stationKw * OFF_GRID_LOSS_MARGIN : stationKw * GRID_LOSS_MARGIN
  const numPanels = Math.ceil((stationKw * 1000) / PANEL_WATTAGE_W)
  const annualKwh = stationKw * SYSTEM_EFFICIENCY * GRID_PEAK_SUN_HOURS * DAYS_PER_YEAR
  const annualSavings = annualKwh * ENGINEERING_TARIFF_SAR_PER_KWH
  const estimatedSystemCostSAR = stationKw * ENGINEER_ESTIMATED_PRICE_PER_KW
  const co2TonYear = (annualKwh * CO2_KG_PER_KWH) / 1000
  const treesEquiv = Math.round(co2TonYear * TREES_PER_TON_CO2)
  const areaM2 = numPanels * PANEL_AREA_M2

  // For off-grid only: workbook's 1.3 allowance and 80% usable battery depth.
  const batteryKwh = needsBattery
    ? ((dailyKwh * backupHours) / 24) * OFF_GRID_LOSS_MARGIN / BATTERY_DOD
    : 0

  return {
    monthlyKwh,
    actualKw: stationKw,
    numPanels,
    inverterKw,
    annualKwh,
    annualSavings,
    estimatedSystemCostSAR,
    co2TonYear,
    treesEquiv,
    areaM2,
    needsBattery,
    batteryKwh,
  }
}
/* ── Animated number (0 → value) — remounts per calculation via key ────── */

const AnimatedNumber = ({ value, decimals = 0, locale }) => {
  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { damping: 50, stiffness: 100 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    motionVal.set(value)
  }, [value, motionVal])

  useMotionValueEvent(spring, 'change', (latest) => setDisplay(latest))

  const formatted =
    decimals > 0
      ? Number(display).toLocaleString(locale, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      : Math.round(display).toLocaleString(locale)

  return <span>{formatted}</span>
}

/* ── Small outline metric icons (stroke style, no emoji) ───────────────── */

const METRIC_PATHS = {
  bolt: 'M13 10V3L4 14h7v7l9-11h-7z',
  sun: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
  savings:
    'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  payback:
    'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
  eco: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
  area: 'M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4',
  chart:
    'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
}

const MetricIcon = ({ name }) => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d={METRIC_PATHS[name]} />
  </svg>
)

/* ── Reusable card shells ──────────────────────────────────────────────── */

const PrimaryCard = ({ icon, label, value, decimals, unit, locale, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="calculator-primary-card rounded-[1.75rem] p-6 text-center"
  >
    <div className="w-12 h-12 rounded-2xl bg-yellow-primary text-[#15321f] flex items-center justify-center mb-4 mx-auto">
      <MetricIcon name={icon} />
    </div>
    <div className="text-3xl md:text-4xl font-extrabold text-white">
      <AnimatedNumber value={value} decimals={decimals} locale={locale} />
    </div>
    <div className="text-sm text-green-50/55 mt-1">{unit}</div>
    <p className="text-green-50/85 font-semibold mt-3 leading-snug">{label}</p>
  </motion.div>
)

const SecondaryCard = ({ icon, label, value, decimals, unit, locale, extra, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="rounded-[1.75rem] border border-green-primary/10 bg-white p-6 text-center shadow-[0_18px_36px_-28px_rgba(15,56,31,0.35)]"
  >
    <div className="w-12 h-12 rounded-xl bg-white text-green-primary flex items-center justify-center mb-4 mx-auto shadow-sm">
      <MetricIcon name={icon} />
    </div>
    <div className="text-3xl font-bold text-gray-900">
      <AnimatedNumber value={value} decimals={decimals} locale={locale} />
      {unit === '%' ? '%' : ''}
    </div>
    {unit !== '%' && <div className="text-sm text-gray-500 mt-1">{unit}</div>}
    <p className="text-gray-700 font-medium mt-3 leading-snug">{label}</p>
    {extra && <p className="text-sm text-green-primary font-semibold mt-2">{extra}</p>}
  </motion.div>
)

/* ── Page ──────────────────────────────────────────────────────────────── */

const Calculator = () => {
  const { t, i18n } = useTranslation()
  const locale = i18n.language === 'ar' ? 'ar-SA' : 'en-US'
  const { ref: formRef, isInView: formInView } = useScrollAnimation()

  const [form, setForm] = useState({
    city: 'riyadh',
    inputMode: 'bill',
    bill: '',
    kwh: '',
    systemType: 'gridTied',
    backupHours: 8,
    pumpHorsepower: '',
    loads: Array.from({ length: 7 }, (_, index) => ({ id: index + 1, name: '', power: index === 0 ? '1700' : '', quantity: index === 0 ? '1' : '', dayHours: '', nightHours: '' })),
  })
  const [results, setResults] = useState(null)
  const [calcId, setCalcId] = useState(0)
  const [error, setError] = useState('')
  const [showBreakdown, setShowBreakdown] = useState(true)
  const [calculationStage, setCalculationStage] = useState('idle')
  const calculationTimers = useRef([])

  const needsBattery = form.systemType === 'offGrid'
  const isPumpSystem = form.systemType === 'pumpSystem'
  const isCalculating = calculationStage === 'working'
  const thoughtSteps = i18n.language === 'ar'
    ? ['تحليل استهلاك الطاقة', 'تحديد حجم الألواح والمحولات', 'تقدير الإنتاج والتوفير السنوي']
    : ['Analyzing energy consumption', 'Sizing panels and inverter', 'Estimating production and annual savings']

  useEffect(() => () => calculationTimers.current.forEach(window.clearTimeout), [])

  const handleSelect = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const cityOptions = Object.entries(CITIES).map(([key, c]) => ({
    value: key,
    label: i18n.language === 'ar' ? c.ar : c.en,
    icon: '📍',
  }))

  const systemTypes = ['gridTied', 'offGrid', 'pumpSystem']

  const handleCalculate = () => {
    const raw = form.inputMode === 'bill' ? form.bill : form.kwh
    const num = parseFloat(raw)
    const invalidStandard = !raw || Number.isNaN(num) || num <= 0
    const invalidPump = isPumpSystem && (!form.pumpHorsepower || Number(form.pumpHorsepower) <= 0)
    const invalidLoads = needsBattery && form.loads.every((load) => !(Number(load.power) > 0 && Number(load.quantity) > 0))
    if ((!isPumpSystem && !needsBattery && invalidStandard) || invalidPump || invalidLoads) {
      setError(i18n.language === 'ar' ? 'أدخل بيانات الأحمال أو قدرة المضخة المطلوبة.' : 'Enter the required load or pump data.')
      setResults(null)
      setCalculationStage('idle')
      return
    }

    calculationTimers.current.forEach(window.clearTimeout)
    calculationTimers.current = []
    const nextResults = computeResults({ ...form, value: num })
    setError('')
    setResults(null)
    setCalculationStage('working')
    setShowBreakdown(true)

    calculationTimers.current.push(window.setTimeout(() => {
      setCalculationStage('settled')
      setResults(nextResults)
      setCalcId((id) => id + 1)

    }, 3200))
  }

  const handleWhatsAppShare = () => {
    if (!results) return
    const cityLabel = i18n.language === 'ar' ? CITIES[form.city].ar : CITIES[form.city].en
    const message = t('calculator.results.whatsappMessage')
      .replace('{city}', cityLabel)
      .replace('{size}', results.actualKw.toFixed(1))
      .replace('{panels}', String(results.numPanels))
      .replace('{savings}', Math.round(results.annualSavings).toLocaleString(locale))
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`, '_blank')
  }

  const fmt = (n, decimals = 0) =>
    decimals > 0
      ? Number(n).toLocaleString(locale, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      : Math.round(n).toLocaleString(locale)

  const toggleBase =
    'px-4 py-3 rounded-lg border-2 font-semibold transition-colors duration-200'
  const cardBase =
    'px-4 py-4 rounded-xl border-2 font-semibold transition-all duration-200 text-center'

  return (
    <div className="w-full">
      <PageCinematicHero eyebrow={i18n.language === 'ar' ? 'خطوتك الأولى نحو التوفير' : 'Your first step toward savings'} title={t('calculator.title')} subtitle={t('calculator.subtitle')} primaryLabel={i18n.language === 'ar' ? 'ابدأ الحساب' : 'Start calculating'} primaryTo={ROUTES.calculator} secondaryLabel={i18n.language === 'ar' ? 'استشر فريقنا' : 'Talk to our team'} secondaryTo={ROUTES.contact} />
      {/* Hero Section */}
      <section className="page-hero py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-4"
          >
            <div className="flex justify-center mb-6">
              <CalculatorIcon size={88} />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              {t('calculator.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('calculator.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Input + Results */}
      <section className="py-24 bg-[#f3f7f3]">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          {/* Input Card */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 30 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className={`modern-surface bg-white rounded-[2rem] p-8 md:p-10 mx-auto ${needsBattery ? 'max-w-6xl' : 'max-w-2xl'}`}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {t('calculator.inputs.title')}
            </h2>

            <div className="space-y-6">
              {/* Region */}
              <div className="form-group">
                <label className="form-label block text-gray-700 font-semibold mb-2">
                  {t('calculator.inputs.city')}
                </label>
                <ModernSelect
                  name="city"
                  label={t('calculator.inputs.city')}
                  value={form.city}
                  onChange={handleSelect}
                  options={cityOptions}
                />
              </div>
              {!needsBattery && !isPumpSystem && (<>
                <div className="form-group">
                  <label className="form-label block text-gray-700 font-semibold mb-2">{t('calculator.inputs.inputMode')}</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[{ mode: 'bill', label: t('calculator.inputs.byBill') }, { mode: 'kwh', label: t('calculator.inputs.byKwh') }].map(({ mode, label }) => (
                      <button key={mode} type="button" onClick={() => setForm((p) => ({ ...p, inputMode: mode }))} className={`${toggleBase} ${form.inputMode === mode ? 'bg-green-primary text-white border-green-primary' : 'bg-white text-gray-700 border-gray-300 hover:border-green-primary/50'}`}>{label}</button>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <input type="number" min="0" inputMode="numeric" value={form.inputMode === 'bill' ? form.bill : form.kwh} onChange={(e) => setForm((p) => ({ ...p, [p.inputMode]: e.target.value }))} placeholder={form.inputMode === 'bill' ? t('calculator.inputs.billPlaceholder') : t('calculator.inputs.kwhPlaceholder')} className="form-input w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-primary" />
                </div>
              </>)}

              {/* System type */}
              <div className="form-group">
                <label className="form-label block text-gray-700 font-semibold mb-2">
                  {t('calculator.inputs.systemType')}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {systemTypes.map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, systemType: st }))}
                      className={`${cardBase} ${
                        form.systemType === st
                          ? 'border-green-primary bg-green-primary/5 text-green-primary'
                          : 'border-gray-200 text-gray-700 hover:border-green-primary/40'
                      }`}
                    >
                      {st === 'pumpSystem' ? (i18n.language === 'ar' ? 'نظام المضخة' : 'Pump system') : t(`calculator.inputs.${st}`)}
                    </button>
                  ))}
                </div>
              </div>

              {needsBattery && (
                <div className="rounded-2xl border border-green-primary/15 bg-green-50/40 p-4 space-y-3">
                  <div>
                    <h3 className="font-bold text-gray-900">{i18n.language === 'ar' ? 'جدول الأحمال' : 'Load table'}</h3>
                    <p className="text-sm text-gray-600 mt-1">{i18n.language === 'ar' ? 'أدخل القدرة والعدد وعدد ساعات التشغيل نهارًا وليلاً.' : 'Enter power, quantity, and operating hours for day and night.'}</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-[760px] md:min-w-0 w-full text-xs md:text-sm text-start">
                      <thead><tr className="border-b border-green-primary/15 text-gray-600"><th className="p-1 md:p-2">{i18n.language === 'ar' ? 'الحمل' : 'Load'}</th><th className="p-1 md:p-2">W</th><th className="p-1 md:p-2">{i18n.language === 'ar' ? 'العدد' : 'Qty'}</th><th className="p-1 md:p-2">{i18n.language === 'ar' ? 'ساعات النهار' : 'Day h'}</th><th className="p-1 md:p-2">{i18n.language === 'ar' ? 'ساعات الليل' : 'Night h'}</th><th className="p-1 md:p-2">{i18n.language === 'ar' ? 'طاقة النهار' : 'Day Wh'}</th><th className="p-1 md:p-2">{i18n.language === 'ar' ? 'طاقة الليل' : 'Night Wh'}</th><th className="p-1 md:p-2">kW</th></tr></thead>
                      <tbody>{form.loads.map((load, index) => { const power = Number(load.power) || 0; const qty = Number(load.quantity) || 0; const day = Number(load.dayHours) || 0; const night = Number(load.nightHours) || 0; return (
                        <tr key={load.id} className="border-b border-gray-100"><td className="p-1"><input type="text" value={load.name} onChange={(e) => setForm((prev) => ({ ...prev, loads: prev.loads.map((row, rowIndex) => rowIndex === index ? { ...row, name: e.target.value } : row) }))} placeholder={i18n.language === 'ar' ? `حمل ${index + 1}` : `Load ${index + 1}`} className="w-16 md:w-28 rounded-lg border border-gray-200 px-1 md:px-2 py-2 text-center focus:outline-none focus:ring-2 focus:ring-green-primary" /></td>
                          {['power','quantity','dayHours','nightHours'].map((field) => <td key={field} className="p-1"><input type="number" min="0" step="any" value={load[field]} onChange={(e) => setForm((prev) => ({ ...prev, loads: prev.loads.map((row, rowIndex) => rowIndex === index ? { ...row, [field]: e.target.value } : row) }))} className="w-12 md:w-20 rounded-lg border border-gray-200 px-1 md:px-2 py-2 text-center focus:outline-none focus:ring-2 focus:ring-green-primary" /></td>)}
                          <td className="p-1 md:p-2 text-gray-600">{power * qty * day}</td><td className="p-1 md:p-2 text-gray-600">{power * qty * night}</td><td className="p-1 md:p-2 font-semibold text-gray-800">{((power * qty) / 1000).toFixed(2)}</td></tr>
                      )})}</tbody>
                      <tfoot><tr className="font-bold text-green-primary"><td className="p-1 md:p-2">{i18n.language === 'ar' ? 'الإجمالي' : 'Total'}</td><td colSpan="4"></td><td className="p-2">{form.loads.reduce((sum, load) => sum + (Number(load.power) || 0) * (Number(load.quantity) || 0) * (Number(load.dayHours) || 0), 0)}</td><td className="p-2">{form.loads.reduce((sum, load) => sum + (Number(load.power) || 0) * (Number(load.quantity) || 0) * (Number(load.nightHours) || 0), 0)}</td><td className="p-2">{(form.loads.reduce((sum, load) => sum + (Number(load.power) || 0) * (Number(load.quantity) || 0), 0) / 1000).toFixed(2)}</td></tr></tfoot>
                    </table>
                  </div>
                </div>
              )}

              {isPumpSystem && (
                <div className="form-group">
                  <label className="form-label block text-gray-700 font-semibold mb-2">{i18n.language === 'ar' ? 'قدرة المضخة بالحصان' : 'Pump horsepower'}</label>
                  <input type="number" min="0" step="any" value={form.pumpHorsepower} onChange={(e) => setForm((p) => ({ ...p, pumpHorsepower: e.target.value }))} placeholder={i18n.language === 'ar' ? 'مثال: 10' : 'Example: 10'} className="form-input w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-primary" />
                </div>
              )}

              {/* Backup hours (off-grid only) */}
              <AnimatePresence>
                {needsBattery && false && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="form-group overflow-hidden"
                  >
                    <label className="form-label block text-gray-700 font-semibold mb-2">
                      {t('calculator.inputs.backupHours')}: {form.backupHours}
                    </label>
                    <input
                      type="range"
                      min="2"
                      max="24"
                      value={form.backupHours}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, backupHours: Number(e.target.value) }))
                      }
                      className="w-full accent-green-primary"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {error && <p className="form-error text-red-500 text-sm">{error}</p>}

              <button
                type="button"
                onClick={handleCalculate}
                disabled={isCalculating}
                aria-busy={isCalculating}
                className="w-full px-8 py-4 bg-green-primary text-white rounded-lg font-semibold text-lg hover:bg-green-primary/90 hover:shadow-xl transform hover:scale-105 transition-all duration-200 shadow-lg disabled:cursor-wait disabled:opacity-75 disabled:hover:scale-100"
              >
                {isCalculating
                  ? (i18n.language === 'ar' ? 'جاري الحساب…' : 'Calculating…')
                  : t('calculator.inputs.calculate')}
              </button>

              <AnimatePresence initial={false}>
                {calculationStage !== 'idle' && (
                  <motion.div
                    key="calculator-thought-line"
                    initial={{ opacity: 0, height: 0, y: -8 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -6 }}
                    transition={{ duration: 0.35 }}
                    className="overflow-hidden"
                  >
                    <ThoughtLine
                      working={isCalculating}
                      steps={thoughtSteps}
                      label={i18n.language === 'ar' ? 'جاري إعداد تقدير نظامك…' : 'Preparing your system estimate…'}
                      doneLabel={i18n.language === 'ar' ? 'اكتمل الحساب خلال' : 'Calculated in'}
                      collapseOnSettle
                      showTimer
                      className="calculator-thought-line"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Results */}
          <AnimatePresence mode="wait">
            {results && (
              <motion.div
                key={calcId}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.6 }}
                className="max-w-5xl mx-auto mt-16"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  {t('calculator.results.title')}
                </h2>

                {results.isOffGridTable && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {[{ label: i18n.language === 'ar' ? 'طاقة النهار' : 'Daytime energy', value: results.dayEnergyKwh, unit: 'kWh' }, { label: i18n.language === 'ar' ? 'طاقة الليل' : 'Nighttime energy', value: results.nightEnergyKwh, unit: 'kWh' }, { label: i18n.language === 'ar' ? 'إجمالي الأحمال' : 'Total load', value: results.totalLoadKw, unit: 'kW' }].map((item) => (
                      <div key={item.label} className="rounded-2xl border border-green-primary/15 bg-white p-5 text-center shadow-sm"><div className="text-2xl font-bold text-green-primary">{fmt(item.value, 1)} <span className="text-sm">{item.unit}</span></div><div className="mt-2 text-sm text-gray-600">{item.label}</div></div>
                    ))}
                  </div>
                )}

                {results.isPump && (
                  <div className="mb-8 rounded-2xl border border-yellow-primary/30 bg-yellow-50 p-4 text-center text-gray-800">{i18n.language === 'ar' ? `حساب نظام مضخة بقدرة ${fmt(results.pumpHorsepower, 1)} حصان` : `Pump system calculation for ${fmt(results.pumpHorsepower, 1)} HP`}</div>
                )}

                {/* Primary metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                  <PrimaryCard
                    icon="bolt"
                    label={t('calculator.results.systemSize')}
                    value={results.actualKw}
                    decimals={1}
                    unit={t('calculator.results.kw')}
                    locale={locale}
                    delay={0.05}
                  />
                  <PrimaryCard
                    icon="sun"
                    label={t('calculator.results.panels')}
                    value={results.numPanels}
                    decimals={0}
                    unit={t('calculator.results.panel')}
                    locale={locale}
                    delay={0.1}
                  />
                  <PrimaryCard
                    icon="savings"
                    label={t('calculator.results.annualSavings')}
                    value={results.annualSavings}
                    decimals={0}
                    unit={t('calculator.results.sar')}
                    locale={locale}
                    delay={0.15}
                  />
                </div>

                {/* Secondary metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <SecondaryCard
                    icon="eco"
                    label={t('calculator.results.co2')}
                    value={results.co2TonYear}
                    decimals={1}
                    unit={t('calculator.results.tonYear')}
                    locale={locale}
                    extra={`${t('calculator.results.treesEquiv')} ${fmt(
                      results.treesEquiv
                    )} ${t('calculator.results.treesUnit')}`}
                    delay={0.25}
                  />
                  <SecondaryCard
                    icon="area"
                    label={t('calculator.results.area')}
                    value={results.areaM2}
                    decimals={0}
                    unit={t('calculator.results.m2')}
                    locale={locale}
                    delay={0.3}
                  />
                </div>

                {/* Engineering details (collapsible) */}
                <div className="modern-surface bg-white rounded-[1.75rem] overflow-hidden mb-6">
                  <button
                    type="button"
                    onClick={() => setShowBreakdown((s) => !s)}
                    className="w-full flex items-center justify-between px-6 py-4 text-start font-bold text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    <span>{t('calculator.results.breakdown')}</span>
                    <motion.svg
                      animate={{ rotate: showBreakdown ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </motion.svg>
                  </button>
                  <AnimatePresence>
                    {showBreakdown && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className="px-6 pb-4 divide-y divide-gray-100">
                          <li className="flex items-center justify-between py-3 gap-4">
                            <span className="text-gray-600">{t('calculator.results.engineerEstimate')}</span>
                            <span className="font-semibold text-gray-900 whitespace-nowrap">{fmt(results.estimatedSystemCostSAR)} {t('calculator.results.sar')}</span>
                          </li>
                          {results.needsBattery && (
                            <li className="flex items-center justify-between py-3">
                              <span className="text-gray-600">
                                {t('calculator.results.batteryCapacity')}
                              </span>
                              <span className="font-semibold text-gray-900">
                                {fmt(results.batteryKwh, 1)} {t('calculator.results.kwh')}
                              </span>
                            </li>
                          )}
                          <li className="flex items-center justify-between py-3">
                            <span className="text-gray-600">
                              {t('calculator.results.inverterSize')}
                            </span>
                            <span className="font-semibold text-gray-900">
                              {fmt(results.inverterKw, 1)} {t('calculator.results.kw')}
                            </span>
                          </li>
                          <li className="flex items-center justify-between py-3">
                            <span className="text-gray-600">
                              {t('calculator.results.monthlyConsumption')}
                            </span>
                            <span className="font-semibold text-gray-900">
                              {fmt(results.monthlyKwh)} {t('calculator.results.kwh')}
                            </span>
                          </li>
                          <li className="flex items-center justify-between py-3">
                            <span className="text-gray-600">
                              {t('calculator.results.annualProduction')}
                            </span>
                            <span className="font-semibold text-gray-900">
                              {fmt(results.annualKwh)} {t('calculator.results.kwh')}
                            </span>
                          </li>
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Standards disclaimer */}
                <p className="text-sm text-gray-500 text-center leading-relaxed mb-10 max-w-3xl mx-auto">
                  {t('calculator.results.disclaimer')}
                </p>

                {/* WhatsApp share */}
                <button
                  type="button"
                  onClick={handleWhatsAppShare}
                  className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-lg py-4 rounded-2xl shadow-lg transition-colors duration-200 mb-6"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967c-.273-.099-.471-.148-.67.15c-.197.297-.767.966-.94 1.164c-.173.199-.347.223-.644.075c-.297-.15-1.255-.463-2.39-1.475c-.883-.788-1.48-1.761-1.653-2.059c-.173-.297-.018-.458.13-.606c.134-.133.298-.347.446-.52c.149-.174.198-.298.298-.497c.099-.198.05-.371-.025-.52c-.075-.149-.669-1.612-.916-2.207c-.242-.579-.487-.5-.669-.51c-.173-.008-.371-.01-.57-.01c-.198 0-.52.074-.792.372c-.272.297-1.04 1.016-1.04 2.479c0 1.462 1.065 2.875 1.213 3.074c.149.198 2.096 3.2 5.077 4.487c.709.306 1.262.489 1.694.625c.712.227 1.36.195 1.871.118c.571-.085 1.758-.719 2.006-1.413c.248-.694.248-1.289.173-1.413c-.074-.124-.272-.198-.57-.347zM11.999 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.878-1.42A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.522 2 11.999 2z" />
                  </svg>
                  {t('calculator.results.whatsappShare')}
                </button>

                {/* CTA banner */}
                <div className="bg-white border-t-4 border-green-primary rounded-2xl shadow-lg p-8 md:p-10 text-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                    {t('calculator.results.ctaTitle')}
                  </h3>
                  <Link
                    to={ROUTES.contact}
                    className="inline-block px-8 py-4 bg-green-primary text-white rounded-lg font-semibold text-lg hover:bg-green-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    {t('calculator.results.ctaButton')}
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}

export default Calculator






