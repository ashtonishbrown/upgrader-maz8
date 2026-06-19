import Button from '../components/Button.jsx';
import { PREFERRED_TIMES, PREFERRED_LOCATION_TYPES } from '../config.js';
import { useT, withChips } from '../i18n.jsx';

// Step 10 — optional. Only reached for a serviceable, compatible booking.
export default function AppointmentDetails({ data, set, advance }) {
  const t = useT();
  return (
    <>
      <h2 className="t-heading-lg">{withChips(t('appointment.title'))}</h2>
      <p className="t-body-marketing">{t('appointment.sub')}</p>

      <div className="field">
        <span className="field__label">{t('appointment.time')}</span>
        <div className="chip-group">
          {PREFERRED_TIMES.map((o) => (
            <ChipBtn key={o.id} selected={data.preferred_time === o.id} onClick={() => set({ preferred_time: o.id })}>
              {t(`time.${o.id}`)}
            </ChipBtn>
          ))}
        </div>
      </div>

      <div className="field">
        <span className="field__label">{t('appointment.place')}</span>
        <div className="chip-group">
          {PREFERRED_LOCATION_TYPES.map((o) => (
            <ChipBtn
              key={o.id}
              selected={data.preferred_location_type === o.id}
              onClick={() => set({ preferred_location_type: o.id })}
            >
              {t(`place.${o.id}`)}
            </ChipBtn>
          ))}
        </div>
      </div>

      <Button variant="primary" full onClick={() => advance()}>
        {t('common.continue')}
      </Button>
      <button className="link-btn" type="button" onClick={() => advance()}>
        {t('appointment.skip')}
      </button>
    </>
  );
}

function ChipBtn({ selected, onClick, children }) {
  return (
    <button type="button" className={`opt-chip${selected ? ' is-active' : ''}`} onClick={onClick} aria-pressed={selected}>
      {children}
    </button>
  );
}
