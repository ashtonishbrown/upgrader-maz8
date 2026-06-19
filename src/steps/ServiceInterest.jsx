import SelectionCard from '../components/SelectionCard.jsx';
import Button from '../components/Button.jsx';
import { SERVICES } from '../config.js';
import { useT, withChips } from '../i18n.jsx';

// Step 2 in the flow — the funnel's real entry decision. Multi-select; the
// coming-soon services register interest only.
export default function ServiceInterest({ data, set, advance }) {
  const t = useT();
  const selected = data.services || [];
  const toggle = (id) =>
    set({ services: selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id] });

  return (
    <>
      <h2 className="t-heading-lg">{withChips(t('services.title'))}</h2>
      <p className="t-body-marketing">{t('services.sub')}</p>

      <div className="stack">
        {SERVICES.map((s) => (
          <SelectionCard key={s.id} selected={selected.includes(s.id)} onClick={() => toggle(s.id)}>
            <div className="service-card__head">
              <span className="t-heading-sm">{t(`service.${s.id}.label`)}</span>
              {s.comingSoon && <span className="badge-soon">{t('common.comingSoon')}</span>}
            </div>
            <p className="t-caption service-card__desc">{t(`service.${s.id}.desc`)}</p>
          </SelectionCard>
        ))}
      </div>

      <Button variant="inverted" full disabled={selected.length === 0} onClick={() => advance({ services: selected })}>
        {t('common.continue')}
      </Button>
    </>
  );
}
