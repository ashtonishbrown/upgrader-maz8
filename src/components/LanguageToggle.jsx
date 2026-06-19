import { LANGUAGES, useLang } from '../i18n.jsx';

// Fixed top-right segmented language switcher with a globe mark.
export default function LanguageToggle() {
  const { lang, setLang } = useLang();
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
      <div className="lang-toggle__seg" role="group" aria-label="Language">
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
