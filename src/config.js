// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for ALL business logic: pricing, compatibility,
// locations, USB rules, future services, WhatsApp. Components import from here —
// they must never embed these values or rules inline.
// ─────────────────────────────────────────────────────────────────────────────

// TODO: replace with the real Malaysian WhatsApp number before launch.
// Format: country code + number, digits only, no "+". e.g. '60123456789'
export const WHATSAPP_NUMBER = '60XXXXXXXXX';

// ── Service areas ────────────────────────────────────────────────────────────
// Business area "Klang Valley, Selangor, Negeri Sembilan" mapped onto official
// states/territories: Klang Valley → Kuala Lumpur + Putrajaya + Selangor.
// Any state with supported:false is captured as an expansion_lead.
export const MALAYSIAN_STATES = [
  { name: 'Johor', supported: false },
  { name: 'Kedah', supported: false },
  { name: 'Kelantan', supported: false },
  { name: 'Kuala Lumpur', supported: true },
  { name: 'Labuan', supported: false },
  { name: 'Melaka', supported: false },
  { name: 'Negeri Sembilan', supported: true },
  { name: 'Pahang', supported: false },
  { name: 'Penang', supported: false },
  { name: 'Perak', supported: false },
  { name: 'Perlis', supported: false },
  { name: 'Putrajaya', supported: true },
  { name: 'Sabah', supported: false },
  { name: 'Sarawak', supported: false },
  { name: 'Selangor', supported: true },
  { name: 'Terengganu', supported: false },
];

// ── Vehicle compatibility matrix ─────────────────────────────────────────────
// `photo` is a placeholder slot (null = show placeholder); drop real per-
// generation images in later without touching the card layout.
export const VEHICLES = {
  'Mazda 2': {
    DE: { supported: false, reason: 'This generation does not support Mazda Connect infotainment.', years: '2007–2014', photo: null },
    DJ: { supported: true, years: '2014–present', photo: null },
  },
  'Mazda 3': {
    'BM/BN': { supported: true, years: '2013–2018', photo: null },
    BP: { supported: true, years: '2019–present', photo: null },
  },
  'Mazda 6': {
    GJ: { supported: true, years: '2012–2018', photo: null },
    GL: { supported: true, years: '2018–present', photo: null },
  },
  'Mazda CX-3': {
    DK: { supported: true, years: '2015–present', photo: null },
  },
  'Mazda CX-5': {
    KE: { supported: true, note: 'Configurable — confirm head unit variant', years: '2012–2017', photo: null },
    KF: { supported: true, years: '2017–present', photo: null },
  },
  'Mazda MX-5': {
    ND: { supported: true, years: '2015–present', photo: null },
  },
};

// ── Pricing (MYR) ────────────────────────────────────────────────────────────
export const PRICING = {
  wired_price: 899,
  wireless_price: 1199,
  usb_c_upgrade_price: 120,
};

// ── USB rules ────────────────────────────────────────────────────────────────
// Wired: user chooses. Wireless: auto-assigned, no choice offered.
export const USB_OPTIONS = {
  wired: [
    { id: 'usb_a', label: 'USB-A + USB-A (included)', usb_c: false, photo: null },
    { id: 'usb_c', label: 'USB-A + USB-C (+RM120)', usb_c: true, photo: null },
  ],
  wireless: { id: 'usb_c', label: 'USB-A + USB-C', usb_c: true },
};

// ── Services (selected up front at step 2) ───────────────────────────────────
// `core: true` is the only purchasable service and the one that drives the
// pricing/package/compatibility path. `comingSoon` services are interest-only
// (excluded from pricing) and shown grayed-out at package select.
export const SERVICES = [
  {
    id: 'carplay',
    label: 'CarPlay / Android Auto',
    description: 'Wireless or wired smartphone mirroring on your Mazda Connect screen.',
    lead_key: 'interest_carplay',
    core: true,
    comingSoon: false,
  },
  {
    id: 'ambient_lighting',
    label: 'Ambient Lighting',
    description: 'Customisable interior accent lighting.',
    lead_key: 'interest_ambient_lighting',
    core: false,
    comingSoon: true,
  },
  {
    id: 'starlight_roof',
    label: 'Starlight Roof',
    description: 'Fibre-optic starlit headliner.',
    lead_key: 'interest_starlight_roof',
    core: false,
    comingSoon: true,
  },
];

export const CORE_SERVICE = SERVICES.find((s) => s.core);
// Future services (lead capture only, excluded from pricing).
export const FUTURE_SERVICES = SERVICES.filter((s) => s.comingSoon);

// True when the user selected the purchasable CarPlay/Android Auto upgrade.
export function wantsCore(selectedServiceIds = []) {
  return selectedServiceIds.includes(CORE_SERVICE.id);
}

// ── Appointment options ──────────────────────────────────────────────────────
export const PREFERRED_TIMES = [
  { id: 'weekday', label: 'Weekday' },
  { id: 'evening', label: 'Evening' },
  { id: 'weekend', label: 'Weekend' },
  { id: 'flexible', label: 'Flexible' },
];

export const PREFERRED_LOCATION_TYPES = [
  { id: 'home', label: 'Home' },
  { id: 'office', label: 'Office' },
  { id: 'condo', label: 'Condo' },
  { id: 'other', label: 'Other' },
];

// ── Derived helpers (keep logic out of components) ───────────────────────────

export function isLocationSupported(location) {
  return MALAYSIAN_STATES.find((s) => s.name === location)?.supported === true;
}

export function normalizePhone(v) {
  return (v || '').replace(/\D/g, '');
}

// Accepts Malaysian mobile numbers: 01X-XXXXXXX, with or without the 60 prefix.
export function isValidMyPhone(v) {
  return /^(0|60)1\d{7,9}$/.test(normalizePhone(v));
}

export function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || '');
}

export function getModels() {
  return Object.keys(VEHICLES);
}

export function getGenerations(model) {
  return VEHICLES[model] ? Object.keys(VEHICLES[model]) : [];
}

export function getCompatibility(model, generation) {
  return VEHICLES[model]?.[generation] ?? null;
}

export function getBasePrice(upgradeType) {
  return upgradeType === 'wireless' ? PRICING.wireless_price : PRICING.wired_price;
}

// usb_c_selected is true when the wired USB-C add-on is chosen (wireless includes it
// in the base price, so it is never an extra charge there).
export function calcFinalPrice(upgradeType, usbCSelected) {
  return getBasePrice(upgradeType) + (usbCSelected ? PRICING.usb_c_upgrade_price : 0);
}

export function leadStatus(d) {
  if (!wantsCore(d.services)) return 'future_interest_lead';
  if (getCompatibility(d.vehicle_model, d.vehicle_generation)?.supported !== true) return 'incompatible_lead';
  if (!isLocationSupported(d.location)) return 'expansion_lead';
  return 'qualified_lead';
}

// Prefilled message adapts to whatever the lead has (dead-end branches lack a quote).
export function buildWhatsappUrl(lead) {
  const parts = ["Hi, I'm interested in the Mazda Upgrader service."];
  if (lead.vehicle_model) parts.push(`Car: ${lead.vehicle_model} ${lead.vehicle_generation || ''}`.trim() + '.');
  if (lead.location) parts.push(`Area: ${lead.location}.`);
  if (lead.final_price != null) parts.push(`Quote: RM${lead.final_price}.`);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(parts.join(' '))}`;
}

// Append-only persistence of leads.
export const LEADS_STORAGE_KEY = 'mazda_leads';

export function saveLead(lead) {
  let leads = [];
  try {
    leads = JSON.parse(localStorage.getItem(LEADS_STORAGE_KEY)) || [];
  } catch {
    leads = [];
  }
  leads.push(lead);
  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
  return lead;
}
