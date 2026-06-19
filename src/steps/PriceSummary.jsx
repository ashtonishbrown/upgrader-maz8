import Button from '../components/Button.jsx';
import { PRICING, FUTURE_SERVICES, getBasePrice, calcFinalPrice } from '../config.js';
import { useT, withChips } from '../i18n.jsx';

// Step 8 — computes the quote (base + USB-C add-on) and stores final_price for
// the lead + WhatsApp message. Future interests are listed but excluded.
export default function PriceSummary({ data, advance }) {
  const t = useT();
  const base = getBasePrice(data.upgrade_type);
  const addon = data.usb_c_selected ? PRICING.usb_c_upgrade_price : 0;
  const total = calcFinalPrice(data.upgrade_type, data.usb_c_selected);
  const futures = FUTURE_SERVICES.filter((s) => (data.services || []).includes(s.id));

  return (
    <>
      <h2 className="t-heading-lg">{withChips(t('summary.title'))}</h2>

      <div className="card-dark summary">
        <Row label={t(`package.${data.upgrade_type}`)} value={`RM${base}`} />
        {addon > 0 && <Row label={t('summary.usbAddon')} value={`+RM${addon}`} />}
        <hr className="summary__rule" />
        <Row label={t('summary.total')} value={`RM${total}`} strong />
      </div>

      {futures.length > 0 && (
        <p className="t-caption">
          {t('summary.future')} {futures.map((f) => t(`service.${f.id}.label`)).join(', ')}
        </p>
      )}

      <Button variant="inverted" full onClick={() => advance({ final_price: total })}>
        {t('common.continue')}
      </Button>
    </>
  );
}

function Row({ label, value, strong }) {
  return (
    <div className={`summary__row${strong ? ' summary__row--strong' : ''}`}>
      <span>{label}</span>
      <span className="t-price">{value}</span>
    </div>
  );
}
