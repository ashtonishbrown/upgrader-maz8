import SelectionCard from '../components/SelectionCard.jsx';
import { PRICING, FUTURE_SERVICES } from '../config.js';
import { useT, withChips } from '../i18n.jsx';

// Step 6 — single-select, auto-advances. Future services shown grayed/inert.
export default function PackageSelect({ advance }) {
  const t = useT();
  const pkgs = [
    { id: 'wired', price: PRICING.wired_price },
    { id: 'wireless', price: PRICING.wireless_price },
  ];

  return (
    <>
      <h2 className="t-heading-lg">{withChips(t('package.title'))}</h2>
      <p className="t-body-marketing">{t('package.sub')}</p>

      <div className="stack">
        {pkgs.map((p) => (
          <SelectionCard key={p.id} onClick={() => advance({ upgrade_type: p.id })}>
            {p.id === 'wireless' && <div className="badge-popular">{t('package.popular')}</div>}
            <div className="pkg-card">
              <div>
                <div className="t-heading-sm">{t(`package.${p.id}`)}</div>
                <div className="t-caption gen-card__years">{t(`package.${p.id}.feat`)}</div>
              </div>
              <div className="t-price pkg-card__price">RM{p.price}</div>
            </div>
          </SelectionCard>
        ))}

        {FUTURE_SERVICES.map((s) => (
          <div key={s.id} className="selection-card selection-card--disabled">
            <div className="pkg-card">
              <div>
                <div className="t-heading-sm">{t(`service.${s.id}.label`)}</div>
                <div className="t-caption gen-card__years">{t(`service.${s.id}.desc`)}</div>
              </div>
              <span className="badge-soon">{t('common.comingSoon')}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
