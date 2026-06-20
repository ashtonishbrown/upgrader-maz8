import { useReducer, useEffect, useRef, useState, useCallback } from 'react';
import CarStage from './components/CarStage.jsx';
import Button from './components/Button.jsx';
import LanguageToggle from './components/LanguageToggle.jsx';
import ProgressBar from './components/ProgressBar.jsx';
import ServiceInterest from './steps/ServiceInterest.jsx';
import VehicleModel from './steps/VehicleModel.jsx';
import VehicleGeneration from './steps/VehicleGeneration.jsx';
import ContactDetails from './steps/ContactDetails.jsx';
import PackageSelect from './steps/PackageSelect.jsx';
import UsbConfig from './steps/UsbConfig.jsx';
import PriceSummary from './steps/PriceSummary.jsx';
import AppointmentDetails from './steps/AppointmentDetails.jsx';
import SuccessState from './steps/SuccessState.jsx';
import { useT, useLang, withChips } from './i18n.jsx';
import firstFrames from './assets/first-frames.mp4';
import {
  SERVICES,
  getCompatibility,
  isLocationSupported,
  wantsCore,
  leadStatus,
  saveLead,
} from './config.js';

// Intro always uses EN; entry step cycles the user's chosen language.
const LOCALIZED_HEADLINES = {
  en: [
    "It's 2026. Your Mazda still doesn't have {CarPlay}.",
    'Make your Mazda great {again}.',
    'Your factory screen is stuck in the past.',
    '{CarPlay}, fitted today. We come to you.',
  ],
  bm: [
    'Sudah 2026. Mazda anda masih tiada {CarPlay}.',
    'Jadikan Mazda anda lebih {hebat}.',
    'Skrin kilang anda ketinggalan zaman.',
    '{CarPlay}, dipasang hari ini. Kami datang kepada anda.',
  ],
  zh: [
    '已是2026年，您的马自达仍没有 {CarPlay}。',
    '让您的马自达{焕然一新}。',
    '原厂屏幕已落后于时代。',
    '{CarPlay} 今日安装，我们上门服务。',
  ],
};

const REVIEWS = [
  { text: '"Installed on my CX-5 in 3 hours. Works flawlessly."', name: 'Faiz, Petaling Jaya' },
  { text: '"Wireless CarPlay feels like factory spec. Worth every ringgit."', name: 'Jennifer T., Ampang' },
  { text: '"My Mazda 3 finally has CarPlay. Process was dead easy."', name: '凯文, Shah Alam' },
];

// ─── Flow ─────────────────────────────────────────────────────────────────────
const CANVAS = {
  entry: 'dark',
  services: 'dark',
  model: 'dark',
  generation: 'dark',
  contact: 'light',
  verdict: 'dark',
  package: 'dark',
  usb: 'dark',
  summary: 'dark',
  appointment: 'light',
  success: 'light',
};

const STEP_COMPONENTS = {
  services: ServiceInterest,
  model: VehicleModel,
  generation: VehicleGeneration,
  package: PackageSelect,
  usb: UsbConfig,
  summary: PriceSummary,
  appointment: AppointmentDetails,
  contact: ContactDetails,
  success: SuccessState,
};

const PATH_CORE_WIRED    = ['entry', 'services', 'model', 'generation', 'verdict', 'package', 'usb', 'summary', 'contact', 'appointment', 'success'];
const PATH_CORE_WIRELESS = ['entry', 'services', 'model', 'generation', 'verdict', 'package', 'summary', 'contact', 'appointment', 'success'];
const PATH_FUTURE        = ['entry', 'services', 'contact', 'success'];
const PATH_INCOMPATIBLE  = ['entry', 'services', 'model', 'generation', 'verdict', 'contact', 'success'];

function isCompatible(d) {
  return getCompatibility(d.vehicle_model, d.vehicle_generation)?.supported === true;
}

function bookable(d) {
  return wantsCore(d.services) && isCompatible(d) && isLocationSupported(d.location);
}

function activePath(d) {
  if (d.services && !wantsCore(d.services)) return PATH_FUTURE;
  if (d.vehicle_generation && !isCompatible(d)) return PATH_INCOMPATIBLE;
  return d.upgrade_type === 'wireless' ? PATH_CORE_WIRELESS : PATH_CORE_WIRED;
}

function progressFor(step, d) {
  const path = activePath(d);
  const i = path.indexOf(step);
  return i < 0 ? 0 : i / (path.length - 1);
}

function canvasFor(step, d) {
  if (step === 'verdict') return isCompatible(d) ? 'dark' : 'light';
  return CANVAS[step];
}

function flowNext(step, d) {
  switch (step) {
    case 'entry':      return 'services';
    case 'services':   return wantsCore(d.services) ? 'model' : 'contact';
    case 'model':      return 'generation';
    case 'generation': return 'verdict';
    case 'verdict':    return isCompatible(d) ? 'package' : 'contact';
    case 'package':    return d.upgrade_type === 'wired' ? 'usb' : 'summary';
    case 'usb':        return 'summary';
    case 'summary':    return 'contact';
    case 'contact':    return bookable(d) ? 'appointment' : 'success';
    case 'appointment':return 'success';
    default:           return step;
  }
}

const initialState = { revealed: ['entry'], data: {} };

function reducer(state, action) {
  switch (action.type) {
    case 'SET':
      return { ...state, data: { ...state.data, ...action.payload } };
    case 'ADVANCE': {
      const cur  = state.revealed[state.revealed.length - 1];
      const data = { ...state.data, ...(action.payload || {}) };
      const next = flowNext(cur, data);
      const revealed = next === cur ? state.revealed : [...state.revealed, next];
      return { revealed, data };
    }
    case 'BACK':
      return state.revealed.length > 1
        ? { ...state, revealed: state.revealed.slice(0, -1) }
        : state;
    case 'EDIT': {
      const idx = state.revealed.indexOf(action.step);
      return idx < 0 ? state : { ...state, revealed: state.revealed.slice(0, idx + 1) };
    }
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { revealed, data } = state;
  const active     = revealed[revealed.length - 1];
  const savedRef   = useRef(false);
  const touchRef   = useRef(null);
  const { lang }   = useLang();

  // ponytail: sessionStorage so intro only plays once per browser session
  const [introState, setIntroState] = useState(
    () => sessionStorage.getItem('intro-seen') ? 'done' : 'playing'
  );

  const headlines  = LOCALIZED_HEADLINES[lang] || LOCALIZED_HEADLINES.en;
  const canGoBack  = revealed.length > 1 && active !== 'success';

  const set     = (payload) => dispatch({ type: 'SET', payload });
  const advance = (payload) => dispatch({ type: 'ADVANCE', payload });

  const handleIntroComplete = useCallback(() => {
    sessionStorage.setItem('intro-seen', '1');
    setIntroState('exiting');
    setTimeout(() => setIntroState('done'), 1400);
  }, []);

  // Swipe left to go back.
  useEffect(() => {
    const onStart = e => { touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };
    const onEnd   = e => {
      if (!touchRef.current) return;
      const dx = e.changedTouches[0].clientX - touchRef.current.x;
      const dy = Math.abs(e.changedTouches[0].clientY - touchRef.current.y);
      touchRef.current = null;
      if (dx < -60 && dy < 80) dispatch({ type: 'BACK' });
    };
    document.addEventListener('touchstart', onStart, { passive: true });
    document.addEventListener('touchend',   onEnd,   { passive: true });
    return () => {
      document.removeEventListener('touchstart', onStart);
      document.removeEventListener('touchend',   onEnd);
    };
  }, []);

  // Auto-scroll new sections below the full sticky header stack.
  useEffect(() => {
    if (revealed.length <= 1) return;
    const el = document.querySelector('.reveal-section:last-child');
    if (!el) return;
    const stickyHeight =
      (document.querySelector('.top-bar')?.offsetHeight   || 0) +
      (document.querySelector('.progress')?.offsetHeight  || 0) +
      (document.querySelector('.car-stage')?.offsetHeight || 0) +
      8;
    const top = el.getBoundingClientRect().top + window.scrollY - stickyHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  }, [revealed.length]);

  // Persist lead once when funnel terminates.
  useEffect(() => {
    if (active === 'success' && !savedRef.current) {
      savedRef.current = true;
      saveLead({ ...data, lead_status: leadStatus(data), created_at: new Date().toISOString() });
    }
    if (active !== 'success') savedRef.current = false;
  }, [active, data]);

  return (
    <div className="reveal-app">
      {introState !== 'done' && (
        <div className={`intro-overlay${introState === 'exiting' ? ' intro-overlay--exit' : ''}`}>
          <video
            className="intro-overlay__video"
            autoPlay
            muted
            playsInline
            loop
            src={firstFrames}
          />
          <div className="intro-overlay__scrim" />
          <div className="intro-overlay__headline">
            <RotatingHeadline
              headlines={[LOCALIZED_HEADLINES.en[0]]}
              onComplete={handleIntroComplete}
            />
          </div>
        </div>
      )}
      <TopBar canGoBack={canGoBack} onBack={() => dispatch({ type: 'BACK' })} />
      <ProgressBar value={progressFor(active, data)} />
      <CarStage />
      <div className="reveal">
        {revealed.map((step, i) => {
          const isActive = i === revealed.length - 1;
          return (
            <Section key={step} step={step} canvas={canvasFor(step, data)} done={!isActive}>
              <Placeholder
                step={step}
                data={data}
                active={isActive}
                set={set}
                advance={advance}
                dispatch={dispatch}
                headlines={headlines}
                introState={introState}
              />
            </Section>
          );
        })}
      </div>
    </div>
  );
}

function TopBar({ canGoBack, onBack }) {
  const t = useT();
  return (
    <div className="top-bar">
      <div className="top-bar__left">
        {canGoBack && (
          <button type="button" className="top-bar__back" onClick={onBack}>
            ← {t('common.back')}
          </button>
        )}
      </div>
      <div className="top-bar__center">
        <span className="top-bar__logo">AutoKraft</span>
      </div>
      <div className="top-bar__right">
        <LanguageToggle />
      </div>
    </div>
  );
}

function Section({ step, canvas, done, children }) {
  return (
    <section className={`reveal-section reveal-section--${canvas}${done ? ' reveal-section--done' : ''}`}>
      <div className="reveal-section__inner">{children}</div>
    </section>
  );
}

function Placeholder({ step, data, active, set, advance, dispatch, headlines, introState }) {
  const t = useT();
  if (!active && step !== 'success') {
    return <p className="t-caption">{summaryFor(step, data)}</p>;
  }

  const Real = STEP_COMPONENTS[step];
  if (Real) return <Real data={data} set={set} advance={advance} dispatch={dispatch} />;

  switch (step) {
    case 'entry':
      return (
        <div className={`entry-content${introState === 'done' ? ' entry-content--visible' : ''}`}>
          <RotatingHeadline headlines={headlines} />
          <p className="t-body-ui">{t('entry.sub')}</p>
          <Button variant="inverted" full onClick={() => advance()}>
            {t('common.checkMazda')}
          </Button>
          <div className="trust-bar">
            <span className="trust-bar__pill">200+ installs</span>
            <span className="trust-bar__pill">12-month warranty</span>
            <span className="trust-bar__pill">KL · Selangor · NS</span>
          </div>
          <div className="review-strip">
            {REVIEWS.map((r, i) => (
              <div key={i} className="review-card">
                <div className="review-card__stars">★★★★★</div>
                <p className="review-card__text">{r.text}</p>
                <p className="review-card__name">{r.name}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case 'verdict': {
      const compat = getCompatibility(data.vehicle_model, data.vehicle_generation);
      const ok     = compat?.supported;
      const okSub  = compat?.note || `Great news. Most ${data.vehicle_model} owners are booked within the week.`;
      return (
        <Block
          title={ok ? `Your ${data.vehicle_model} is supported` : "We'll keep you posted"}
          sub={ok ? okSub : compat?.reason}
        >
          <Button variant={ok ? 'inverted' : 'primary'} full onClick={() => advance()}>
            {ok ? 'See upgrade options' : 'Leave my details'}
          </Button>
        </Block>
      );
    }

    default:
      return <Block title={step} />;
  }
}

function summaryFor(step, d) {
  switch (step) {
    case 'entry':      return 'Started';
    case 'services':   return `Interested: ${(d.services || []).map((id) => SERVICES.find((s) => s.id === id)?.label).join(', ')}`;
    case 'model':      return `Model: ${d.vehicle_model}`;
    case 'generation': return `Generation: ${d.vehicle_generation}`;
    case 'contact':    return `${d.name || ''} · ${d.location || ''}`;
    case 'verdict':    return isCompatible(d) ? 'Compatible' : 'Not compatible';
    default:           return `[${step}]`;
  }
}

function Block({ title, sub, children }) {
  return (
    <>
      <h2 className="t-heading-lg">{title}</h2>
      {sub && <p className="t-body-ui">{sub}</p>}
      {children}
    </>
  );
}

// Parse "{word}" markers into chip segments for the typewriter.
function parseSegments(str) {
  const out = [];
  const re  = /\{([^}]+)\}/g;
  let last = 0, m;
  while ((m = re.exec(str)) !== null) {
    if (m.index > last) out.push({ text: str.slice(last, m.index), chip: false });
    out.push({ text: m[1], chip: true });
    last = m.index + m[0].length;
  }
  if (last < str.length) out.push({ text: str.slice(last), chip: false });
  return out;
}

function RotatingHeadline({ headlines, onComplete }) {
  const [idx, setIdx]         = useState(0);
  const [chars, setChars]     = useState(0);
  const [deleting, setDeleting] = useState(false);
  const segments = parseSegments(headlines[idx]);
  const total    = segments.reduce((n, s) => n + s.text.length, 0);

  useEffect(() => {
    let t;
    if (!deleting && chars < total) {
      t = setTimeout(() => setChars(c => c + 1), 55);
    } else if (!deleting && chars === total) {
      if (idx === headlines.length - 1 && onComplete) {
        // Last headline fully typed: hold then signal done (don't delete)
        t = setTimeout(onComplete, 2200);
      } else {
        t = setTimeout(() => setDeleting(true), 2200);
      }
    } else if (deleting && chars > 0) {
      t = setTimeout(() => setChars(c => c - 1), 28);
    } else if (deleting && chars === 0) {
      setIdx(i => (i + 1) % headlines.length);
      setDeleting(false);
    }
    return () => clearTimeout(t);
  }, [chars, deleting, total, headlines.length, idx, onComplete]);

  useEffect(() => { setChars(0); }, [idx]);

  let remaining = chars;
  const nodes = segments.map((seg, i) => {
    if (remaining <= 0) return null;
    const visible = seg.text.slice(0, remaining);
    remaining -= seg.text.length;
    if (!visible) return null;
    return seg.chip
      ? <span key={i} className="chip-lime">{visible}</span>
      : <span key={i}>{visible}</span>;
  });

  return (
    <h2 className="t-heading-lg rotating-headline rotating-headline--in">
      {nodes}
      <span className="typing-cursor">|</span>
    </h2>
  );
}
