import { useState, useEffect } from 'react'
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

/* ──────────────────────────────────────────────────────────────────────
   SOLAR DATA CONSTANTS — calibrated for Saudi Arabia
   Sources: NASA POWER / PVGIS (PSH), SEC tariffs & net-metering,
   IEC 62548 / IEC 60364-7-712 / IEC 62446 (system design), IEC 62619 (LFP)
   ────────────────────────────────────────────────────────────────────── */

// Peak Sun Hours (PSH) per Saudi city
const CITY_PSH = {
  riyadh: { ar: 'الرياض', en: 'Riyadh', psh: 6.0 },
  jeddah: { ar: 'جدة', en: 'Jeddah', psh: 5.5 },
  mecca: { ar: 'مكة المكرمة', en: 'Mecca', psh: 5.8 },
  medina: { ar: 'المدينة المنورة', en: 'Medina', psh: 5.7 },
  dammam: { ar: 'الدمام', en: 'Dammam', psh: 5.3 },
  abha: { ar: 'أبها', en: 'Abha', psh: 6.2 },
  tabuk: { ar: 'تبوك', en: 'Tabuk', psh: 6.5 },
  hail: { ar: 'حائل', en: 'Hail', psh: 6.3 },
  najran: { ar: 'نجران', en: 'Najran', psh: 6.4 },
  jizan: { ar: 'جازان', en: 'Jizan', psh: 5.4 },
}

// SEC electricity tariffs (SAR/kWh)
const TARIFF = {
  residential: {
    tier1Rate: 0.18, // <= 6000 kWh/month — effective rate (nominal 0.05 + VAT 15% + distribution/network fees)
    tier2Rate: 0.3, // > 6000 kWh/month
    threshold: 6000,
  },
  commercial: 0.32,
  industrial: 0.28,
  agricultural: 0.08,
}

// System constants (IEC 62548 / field data for Saudi conditions)
const SYSTEM_EFFICIENCY = 0.8 // inverter + wiring losses
const TEMP_DERATING = 0.85 // Saudi high-temp correction (~15% loss)
const PERFORMANCE_RATIO = 0.75 // PR (IEC 62446 recommended minimum)
const PANEL_WATTAGE_W = 550 // Standard modern monocrystalline panel
const PANEL_AREA_M2 = 2.2 // m2 per 550W panel
const CO2_KG_PER_KWH = 0.72 // Saudi national grid emission factor
const TREES_PER_TON_CO2 = 45 // ~45 trees absorb 1 ton CO2/year

// Installed cost per kW (SAR)
const COST_PER_KW = {
  residential: 4500,
  commercial: 4000,
  industrial: 3500,
  agricultural: 5000,
}

// Battery sizing for hybrid/off-grid (LFP — IEC 62619)
const BATTERY_DOD = 0.8 // Depth of Discharge for LFP
const BATTERY_COST_PER_KWH = 1800 // SAR/kWh (LFP, installed)

// WhatsApp business number — same value as the floating WhatsAppButton component
const WHATSAPP_PHONE = '966552277824'

/* ── Formulas ─────────────────────────────────────────────────────────── */

const billToKwh = (billSAR, type) => {
  if (type === 'residential') {
    const { tier1Rate, tier2Rate, threshold } = TARIFF.residential
    const tier1MaxBill = threshold * tier1Rate // bill (SAR) that fully consumes the tier-1 band
    if (billSAR <= tier1MaxBill) return billSAR / tier1Rate
    return threshold + (billSAR - tier1MaxBill) / tier2Rate
  }
  return billSAR / TARIFF[type]
}

const calcAnnualSavings = (annualKwh, type) => {
  if (type === 'residential') {
    const monthlyProd = annualKwh / 12
    if (monthlyProd <= TARIFF.residential.threshold) return annualKwh * TARIFF.residential.tier1Rate
    const tier1Annual = TARIFF.residential.threshold * 12 * TARIFF.residential.tier1Rate
    const tier2Annual =
      (annualKwh - TARIFF.residential.threshold * 12) * TARIFF.residential.tier2Rate
    return tier1Annual + tier2Annual
  }
  return annualKwh * TARIFF[type]
}

const computeResults = ({ establishment, city, systemType, backupHours, inputMode, value }) => {
  const psh = CITY_PSH[city].psh
  const monthlyKwh = inputMode === 'bill' ? billToKwh(value, establishment) : value
  const dailyKwh = monthlyKwh / 30

  const systemKw = dailyKwh / (psh * SYSTEM_EFFICIENCY * TEMP_DERATING)
  const numPanels = Math.max(1, Math.ceil((systemKw * 1000) / PANEL_WATTAGE_W))
  const actualKw = (numPanels * PANEL_WATTAGE_W) / 1000
  const inverterKw = Math.ceil(actualKw * 1.1 * 2) / 2

  const annualKwh = actualKw * psh * 365 * PERFORMANCE_RATIO
  const annualSavings = calcAnnualSavings(annualKwh, establishment)
  const systemCostSAR = actualKw * COST_PER_KW[establishment]
  const paybackYears = annualSavings > 0 ? systemCostSAR / annualSavings : 0
  const roi25 = systemCostSAR > 0 ? ((annualSavings * 25 - systemCostSAR) / systemCostSAR) * 100 : 0

  const co2TonYear = (annualKwh * CO2_KG_PER_KWH) / 1000
  const treesEquiv = Math.round(co2TonYear * TREES_PER_TON_CO2)
  const areaM2 = numPanels * PANEL_AREA_M2

  const needsBattery = systemType === 'hybrid' || systemType === 'offGrid'
  const batteryKwh = needsBattery ? ((dailyKwh * backupHours) / 24) / BATTERY_DOD : 0
  const batteryCostSAR = batteryKwh * BATTERY_COST_PER_KWH

  return {
    monthlyKwh,
    actualKw,
    numPanels,
    inverterKw,
    annualKwh,
    annualSavings,
    systemCostSAR,
    paybackYears,
    roi25,
    co2TonYear,
    treesEquiv,
    areaM2,
    needsBattery,
    batteryKwh,
    batteryCostSAR,
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
    className="bg-white rounded-2xl shadow-lg border-s-4 border-green-primary p-6 text-center"
  >
    <div className="w-12 h-12 rounded-xl bg-green-primary/10 text-green-primary flex items-center justify-center mb-4 mx-auto">
      <MetricIcon name={icon} />
    </div>
    <div className="text-3xl md:text-4xl font-bold text-gray-900">
      <AnimatedNumber value={value} decimals={decimals} locale={locale} />
    </div>
    <div className="text-sm text-gray-500 mt-1">{unit}</div>
    <p className="text-gray-700 font-medium mt-3 leading-snug">{label}</p>
  </motion.div>
)

const SecondaryCard = ({ icon, label, value, decimals, unit, locale, extra, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="bg-green-primary/10 rounded-2xl p-6 text-center"
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
    establishment: 'agricultural',
    city: 'riyadh',
    inputMode: 'bill',
    bill: '',
    kwh: '',
    systemType: 'gridTied',
    backupHours: 8,
  })
  const [results, setResults] = useState(null)
  const [calcId, setCalcId] = useState(0)
  const [error, setError] = useState('')
  const [showBreakdown, setShowBreakdown] = useState(false)

  const needsBattery = form.systemType === 'hybrid' || form.systemType === 'offGrid'

  const handleSelect = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const establishmentOptions = [
    { value: 'agricultural', label: t('calculator.inputs.establishmentOptions.agricultural'), icon: '🌱' },
    { value: 'industrial', label: t('calculator.inputs.establishmentOptions.industrial'), icon: '🏭' },
    { value: 'commercial', label: t('calculator.inputs.establishmentOptions.commercial'), icon: '🏪' },
    { value: 'residential', label: t('calculator.inputs.establishmentOptions.residential'), icon: '🏠' },
  ]

  const cityOptions = Object.entries(CITY_PSH).map(([key, c]) => ({
    value: key,
    label: i18n.language === 'ar' ? c.ar : c.en,
    icon: '📍',
  }))

  const systemTypes = ['gridTied', 'hybrid', 'offGrid']

  const handleCalculate = () => {
    const raw = form.inputMode === 'bill' ? form.bill : form.kwh
    const num = parseFloat(raw)
    if (!raw || Number.isNaN(num) || num <= 0) {
      setError(t('calculator.inputs.required'))
      setResults(null)
      return
    }
    setError('')
    setResults(computeResults({ ...form, value: num }))
    setCalcId((id) => id + 1)
  }

  const handleWhatsAppShare = () => {
    if (!results) return
    const establishmentLabel = t(`calculator.inputs.establishmentOptions.${form.establishment}`)
    const cityLabel = i18n.language === 'ar' ? CITY_PSH[form.city].ar : CITY_PSH[form.city].en
    const message = t('calculator.results.whatsappMessage')
      .replace('{establishment}', establishmentLabel)
      .replace('{city}', cityLabel)
      .replace('{size}', results.actualKw.toFixed(1))
      .replace('{panels}', String(results.numPanels))
      .replace('{savings}', Math.round(results.annualSavings).toLocaleString(locale))
      .replace('{payback}', results.paybackYears.toFixed(1))
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
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-primary/20 via-white to-yellow-primary/20 py-20">
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
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          {/* Input Card */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 30 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-10 max-w-2xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {t('calculator.inputs.title')}
            </h2>

            <div className="space-y-6">
              {/* Establishment type */}
              <div className="form-group">
                <label className="form-label block text-gray-700 font-semibold mb-2">
                  {t('calculator.inputs.establishment')}
                </label>
                <ModernSelect
                  name="establishment"
                  label={t('calculator.inputs.establishment')}
                  value={form.establishment}
                  onChange={handleSelect}
                  options={establishmentOptions}
                />
              </div>

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

              {/* Input mode toggle */}
              <div className="form-group">
                <label className="form-label block text-gray-700 font-semibold mb-2">
                  {t('calculator.inputs.inputMode')}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { mode: 'bill', label: t('calculator.inputs.byBill') },
                    { mode: 'kwh', label: t('calculator.inputs.byKwh') },
                  ].map(({ mode, label }) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, inputMode: mode }))}
                      className={`${toggleBase} ${
                        form.inputMode === mode
                          ? 'bg-green-primary text-white border-green-primary'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-green-primary/50'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Numeric input */}
              <div className="form-group">
                <input
                  type="number"
                  min="0"
                  inputMode="numeric"
                  value={form.inputMode === 'bill' ? form.bill : form.kwh}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, [p.inputMode]: e.target.value }))
                  }
                  placeholder={
                    form.inputMode === 'bill'
                      ? t('calculator.inputs.billPlaceholder')
                      : t('calculator.inputs.kwhPlaceholder')
                  }
                  className="form-input w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-primary"
                />
              </div>

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
                      {t(`calculator.inputs.${st}`)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Backup hours (hybrid / off-grid only) */}
              <AnimatePresence>
                {needsBattery && (
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
                className="w-full px-8 py-4 bg-green-primary text-white rounded-lg font-semibold text-lg hover:bg-green-primary/90 hover:shadow-xl transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                {t('calculator.inputs.calculate')}
              </button>
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

                {/* Primary metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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
                  <PrimaryCard
                    icon="payback"
                    label={t('calculator.results.payback')}
                    value={results.paybackYears}
                    decimals={1}
                    unit={t('calculator.results.years')}
                    locale={locale}
                    delay={0.2}
                  />
                </div>

                {/* Secondary metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                  <SecondaryCard
                    icon="chart"
                    label={t('calculator.results.roi25')}
                    value={results.roi25}
                    decimals={0}
                    unit="%"
                    locale={locale}
                    delay={0.35}
                  />
                </div>

                {/* Cost breakdown (collapsible) */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
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
                        <ul className="px-6 pb-6 divide-y divide-gray-100">
                          <li className="flex items-center justify-between py-3">
                            <span className="text-gray-600">
                              {t('calculator.results.systemCost')}
                            </span>
                            <span className="font-semibold text-gray-900">
                              {fmt(results.systemCostSAR)} {t('calculator.results.sar')}
                            </span>
                          </li>
                          {results.needsBattery && (
                            <li className="flex items-center justify-between py-3">
                              <span className="text-gray-600">
                                {t('calculator.results.batteryCost')}
                              </span>
                              <span className="font-semibold text-gray-900">
                                {fmt(results.batteryCostSAR)} {t('calculator.results.sar')}
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
                <div className="bg-gradient-to-br from-green-primary to-yellow-primary rounded-2xl p-8 md:p-10 text-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                    {t('calculator.results.ctaTitle')}
                  </h3>
                  <Link
                    to={ROUTES.contact}
                    className="inline-block px-8 py-4 bg-white text-green-primary rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
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
