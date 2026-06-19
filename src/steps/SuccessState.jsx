import { leadStatus, buildWhatsappUrl } from '../config.js';
import { useT } from '../i18n.jsx';

const STATUS_KEY = {
  qualified_lead: 'qualified',
  expansion_lead: 'expansion',
  incompatible_lead: 'incompatible',
  future_interest_lead: 'future',
};

// Step 11 — the conversion screen. Lead is already persisted by App on arrival.
export default function SuccessState({ data, dispatch }) {
  const t = useT();
  const status = leadStatus(data);
  const key = STATUS_KEY[status];

  return (
    <>
      <h2 className="t-heading-lg">{t(`success.${key}.title`)}</h2>
      <p className="t-body-marketing">{t(`success.${key}.body`)}</p>

      {status === 'qualified_lead' && (
        <div className="card-light summary">
          <div className="summary__row summary__row--strong">
            <span>
              {data.vehicle_model} {data.vehicle_generation}
            </span>
            <span className="t-price">RM{data.final_price}</span>
          </div>
          <div className="summary__row t-caption">
            <span>{t(`package.${data.upgrade_type}`)}</span>
            <span>{data.usb_type}</span>
          </div>
        </div>
      )}

      <a
        className="btn btn--whatsapp btn--full"
        href={buildWhatsappUrl({ ...data, lead_status: status })}
        target="_blank"
        rel="noreferrer"
      >
        {t('common.whatsapp')}
      </a>
      <button className="link-btn" type="button" onClick={() => dispatch({ type: 'RESET' })}>
        {t('common.startOver')}
      </button>
    </>
  );
}
