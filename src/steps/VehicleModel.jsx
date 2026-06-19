import SelectionCard from '../components/SelectionCard.jsx';
import { getModels } from '../config.js';
import { useT, withChips } from '../i18n.jsx';

// Step 3 — single-select, auto-advances on tap.
export default function VehicleModel({ advance }) {
  const t = useT();
  return (
    <>
      <h2 className="t-heading-lg">{withChips(t('model.title'))}</h2>
      <p className="t-body-marketing">{t('model.sub')}</p>

      <div className="stack">
        {getModels().map((m) => (
          <SelectionCard key={m} onClick={() => advance({ vehicle_model: m, vehicle_generation: undefined })}>
            <div className="select-row">
              <span className="t-heading-sm">{m}</span>
              <span className="select-row__chev" aria-hidden="true">
                ›
              </span>
            </div>
          </SelectionCard>
        ))}
      </div>
    </>
  );
}
