/**
 * SolarIcons — custom gradient SVG icon set for CESCO Solar.
 *
 * Each icon is a 64x64 viewBox component with a unique linear gradient,
 * a soft tinted rounded-square background (opacity 0.15) and brand-colored
 * line art. Every export accepts an optional `size` prop (default 64).
 *
 * Pure inline SVG — no external dependencies.
 */

/**
 * Shared frame: gradient defs + tinted background + a stroked icon group.
 * @param {{ id: string, c1: string, c2: string, size?: number, children: React.ReactNode }} props
 */
const IconFrame = ({ id, c1, c2, size = 64, children }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
  >
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor={c1} />
        <stop offset="100%" stopColor={c2} />
      </linearGradient>
    </defs>
    {/* Soft tinted rounded square background */}
    <rect width="64" height="64" rx="16" fill={`url(#${id})`} opacity="0.15" />
    <g stroke={c1} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
      {children}
    </g>
  </svg>
)

/* ── Services (Services.jsx + Home.jsx services snapshot) ─────────────── */

export const DesignIcon = ({ size = 64 }) => (
  <IconFrame id="designGrad" c1="#4F46E5" c2="#818CF8" size={size}>
    <path d="M32 15 L25 43" />
    <path d="M32 15 L39 43" />
    <circle cx="32" cy="15" r="2.5" fill="#4F46E5" stroke="none" />
    <path d="M20 47 H44" />
    <path d="M25 47 V43 M31 47 V44 M37 47 V44 M43 47 V43" />
  </IconFrame>
)

export const InstallIcon = ({ size = 64 }) => (
  <IconFrame id="installGrad" c1="#30a84b" c2="#86efac" size={size}>
    <rect x="14" y="20" width="36" height="24" rx="2" />
    <path d="M14 28 H50 M14 36 H50" />
    <path d="M35 22 L27 34 H32 L30 43 L39 30 H34 Z" fill="#30a84b" stroke="none" />
  </IconFrame>
)

export const MaintenanceIcon = ({ size = 64 }) => (
  <IconFrame id="maintenanceGrad" c1="#EA580C" c2="#FCA5A1" size={size}>
    <circle cx="29" cy="29" r="9" />
    <circle cx="29" cy="29" r="3.5" />
    <path d="M29 15 V19 M29 39 V43 M15 29 H19 M39 29 H43 M19.8 19.8 L22.6 22.6 M35.4 35.4 L38.2 38.2 M38.2 19.8 L35.4 22.6 M19.8 38.2 L22.6 35.4" />
    <path d="M37 37 L46 46" strokeWidth="3.5" />
  </IconFrame>
)

export const ConsultingIcon = ({ size = 64 }) => (
  <IconFrame id="consultingGrad" c1="#D9A406" c2="#FDE68A" size={size}>
    <path d="M32 14 a10 10 0 0 1 6 18 c-1 1-1.5 2-1.6 4 H27.6 c-0.1-2-0.6-3-1.6-4 a10 10 0 0 1 6-18 Z" />
    <path d="M28 40 H36 M29.5 44 H34.5" />
    <path d="M29.5 30 L32 26 L34.5 30" />
  </IconFrame>
)

export const BatteryIcon = ({ size = 64 }) => (
  <IconFrame id="batteryGrad" c1="#7C3AED" c2="#C4B5FD" size={size}>
    <rect x="16" y="22" width="28" height="20" rx="3" />
    <path d="M44 28 H48 V36 H44" />
    <path d="M30 26 L25 34 H30 L28 40 L35 31 H30 Z" fill="#7C3AED" stroke="none" />
  </IconFrame>
)

export const SupplyIcon = ({ size = 64 }) => (
  <IconFrame id="supplyGrad" c1="#0891B2" c2="#67E8F9" size={size}>
    <path d="M32 18 L46 25 L32 32 L18 25 Z" />
    <path d="M18 25 V41 L32 48 V32 Z" />
    <path d="M46 25 V41 L32 48" />
    <path d="M25 21.5 L39 28.5" />
  </IconFrame>
)

export const AnalysisIcon = ({ size = 64 }) => (
  <IconFrame id="analysisGrad" c1="#0284C7" c2="#7DD3FC" size={size}>
    <path d="M19 18 V46 H47" />
    <path d="M26 46 V38 M33 46 V32 M40 46 V35" strokeWidth="4" />
    <path d="M24 36 L31 30 L37 33 L45 25" />
    <path d="M45 25 H40 M45 25 V30" />
  </IconFrame>
)

/* ── Products (Home.jsx featured + Products.jsx) ──────────────────────── */

export const SolarPanelIcon = ({ size = 64 }) => (
  <IconFrame id="solarPanelGrad" c1="#F59E0B" c2="#FB923C" size={size}>
    <circle cx="32" cy="21" r="6" />
    <path d="M32 10 V13 M32 29 V31 M21 21 H24 M40 21 H43 M24.2 13.2 L26.3 15.3 M37.7 26.7 L39.8 28.8 M39.8 13.2 L37.7 15.3 M24.2 28.8 L26.3 26.7" />
    <rect x="22" y="36" width="20" height="13" rx="1.5" />
    <path d="M28.6 36 V49 M35.3 36 V49 M22 42.5 H42" />
  </IconFrame>
)

export const InverterIcon = ({ size = 64 }) => (
  <IconFrame id="inverterGrad" c1="#30a84b" c2="#34D399" size={size}>
    <rect x="18" y="17" width="28" height="30" rx="3" />
    <path d="M23 24 H41" />
    <path d="M34 27 L28 37 H32 L30 44 L38 33 H33 Z" fill="#30a84b" stroke="none" />
  </IconFrame>
)

export const CableIcon = ({ size = 64 }) => (
  <IconFrame id="cableGrad" c1="#64748B" c2="#30a84b" size={size}>
    <path d="M18 46 C18 36 30 36 30 29 C30 23 41 23 41 30" />
    <rect x="37" y="20" width="9" height="7" rx="2" />
    <path d="M40 18 V20 M43 18 V20" />
  </IconFrame>
)

export const StructureIcon = ({ size = 64 }) => (
  <IconFrame id="structureGrad" c1="#92400E" c2="#FCD34D" size={size}>
    <path d="M16 28 L44 21 L47 27 L19 34 Z" />
    <path d="M23 32.5 V46 M44 25 V46 M19 46 H48" />
    <path d="M23 39 L43 33.5" />
  </IconFrame>
)

export const ExtrasIcon = ({ size = 64 }) => (
  <IconFrame id="extrasGrad" c1="#6D28D9" c2="#A78BFA" size={size}>
    <circle cx="25" cy="27" r="6" />
    <circle cx="25" cy="27" r="2" />
    <path d="M25 18 V21 M25 33 V36 M16 27 H19 M31 27 H34" />
    <path d="M38 38 H46 M42 34 V46 M42 40 H48" />
    <circle cx="46" cy="38" r="1.8" fill="#6D28D9" stroke="none" />
    <circle cx="48" cy="40" r="1.8" fill="#6D28D9" stroke="none" />
  </IconFrame>
)

/* ── About (values cards) ─────────────────────────────────────────────── */

export const VisionIcon = ({ size = 64 }) => (
  <IconFrame id="visionGrad" c1="#30a84b" c2="#86efac" size={size}>
    <circle cx="32" cy="32" r="13" />
    <circle cx="32" cy="32" r="7" />
    <circle cx="32" cy="32" r="2.5" fill="#30a84b" stroke="none" />
    <path d="M32 13 V18 M32 46 V51 M13 32 H18 M46 32 H51" />
  </IconFrame>
)

export const MissionIcon = ({ size = 64 }) => (
  <IconFrame id="missionGrad" c1="#D9A406" c2="#FDE68A" size={size}>
    <path d="M32 14 C38 19 39 29 35 38 H29 C25 29 26 19 32 14 Z" />
    <circle cx="32" cy="25" r="3" />
    <path d="M29 35 L23 41 L28.5 39 M35 35 L41 41 L35.5 39" />
    <path d="M30 40 L32 47 L34 40" fill="#D9A406" stroke="none" />
  </IconFrame>
)

export const ValuesIcon = ({ size = 64 }) => (
  <IconFrame id="valuesGrad" c1="#15803d" c2="#4ade80" size={size}>
    <path d="M22 27 L26 20 H38 L42 27 L32 46 Z" />
    <path d="M22 27 H42 M26 20 L32 27 L38 20 M32 27 L32 46" />
  </IconFrame>
)

/* ── Calculator CTA ───────────────────────────────────────────────────── */

export const CalculatorIcon = ({ size = 64 }) => (
  <IconFrame id="calculatorGrad" c1="#30a84b" c2="#fec819" size={size}>
    <rect x="18" y="13" width="28" height="38" rx="4" />
    <rect x="23" y="18" width="18" height="8" rx="1.5" />
    <circle cx="26" cy="33" r="1.8" fill="#30a84b" stroke="none" />
    <circle cx="32" cy="33" r="1.8" fill="#30a84b" stroke="none" />
    <circle cx="38" cy="33" r="1.8" fill="#30a84b" stroke="none" />
    <circle cx="26" cy="39" r="1.8" fill="#30a84b" stroke="none" />
    <circle cx="32" cy="39" r="1.8" fill="#30a84b" stroke="none" />
    <circle cx="38" cy="39" r="1.8" fill="#30a84b" stroke="none" />
    <circle cx="26" cy="45" r="1.8" fill="#30a84b" stroke="none" />
    <circle cx="32" cy="45" r="1.8" fill="#30a84b" stroke="none" />
    <path d="M36.5 43 H40 M38.25 41.25 V44.75" stroke="#D9A406" />
  </IconFrame>
)
