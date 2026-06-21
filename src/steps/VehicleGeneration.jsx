import SelectionCard from '../components/SelectionCard.jsx';
import { getGenerations, getCompatibility } from '../config.js';
import { useT, withChips } from '../i18n.jsx';

// Step 4 — code + year on the left, car photo on the right (~40%). Compatibility
// is resolved later at the verdict, so every generation is selectable here.
export default function VehicleGeneration({ data, advance }) {
  const t = useT();
  const model = data.vehicle_model;

  return (
    <>
      <h2 className="t-heading-lg">{withChips(t('generation.title'))}</h2>
      <p className="t-body-marketing">{t('generation.sub')}</p>

      <div className="stack">
        {getGenerations(model).map((code) => {
          const g = getCompatibility(model, code);
          return (
            <SelectionCard key={code} onClick={() => advance({ vehicle_generation: code })}>
              <div className="gen-card">
                <div className="gen-card__text">
                  <span className="t-heading-sm">{code}</span>
                  {g?.years && <span className="t-caption gen-card__years">{g.years}</span>}
                </div>
                <div className="gen-card__photo">
                  {g?.photo ? (
                    <img src={g.photo} alt={`${model} ${code}`} style={{ objectPosition: g.photoPosition || 'left center' }} />
                  ) : (
                    <CarThumb />
                  )}
                </div>
              </div>
            </SelectionCard>
          );
        })}
      </div>
    </>
  );
}

// Placeholder thumbnail — swapped for a real photo when config `photo` is set.
function CarThumb() {
  return (
    <svg viewBox="0 0 80 40" className="gen-card__glyph" aria-hidden="true">
      <path
        d="M5 30 q1 -11 13 -12 l7 -6 q4 -3 10 -3 h11 q6 0 10 5 l9 4 q7 1 7 8 v2 q0 2 -2 2 h-5 a6 6 0 0 0 -12 0 h-24 a6 6 0 0 0 -12 0 h-3 q-2 0 -2 -2 z"
        fill="var(--color-accent-violet-mid)"
      />
      <circle cx="24" cy="32" r="5" fill="var(--color-ink-deep)" />
      <circle cx="56" cy="32" r="5" fill="var(--color-ink-deep)" />
    </svg>
  );
}
