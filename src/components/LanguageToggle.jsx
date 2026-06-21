import { useRef } from 'react';
import { LANGUAGES, useLang } from '../i18n.jsx';

export default function LanguageToggle() {
  const { lang, setLang } = useLang();
  const segRef = useRef(null);

  function langFromTouch(e) {
    const touch = e.touches[0];
    const rect = segRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(0, touch.clientX - rect.left);
    const idx = Math.min(LANGUAGES.length - 1, Math.floor(x / (rect.width / LANGUAGES.length)));
    setLang(LANGUAGES[idx].code);
  }

  return (
    <div className="lang-toggle">
      <svg className="lang-toggle__icon" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M3 12h18M12 3c2.8 2.4 2.8 15.6 0 18M12 3c-2.8 2.4-2.8 15.6 0 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
      <div className="lang-toggle__seg" ref={segRef} role="group" aria-label="Language" onTouchMove={langFromTouch}>
        {LANGUAGES.map((l) => (
          <button
            key={l.code}
            className={`lang-toggle__btn${lang === l.code ? ' is-active' : ''}`}
            onClick={() => setLang(l.code)}
            aria-pressed={lang === l.code}
          >
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
}
