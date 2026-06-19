import SelectionCard from '../components/SelectionCard.jsx';
import { USB_OPTIONS } from '../config.js';
import { useT, withChips } from '../i18n.jsx';

// Step 7 — wired only (wireless skips this). Connector names are universal; only
// the heading is localized.
export default function UsbConfig({ advance }) {
  const t = useT();
  return (
    <>
      <h2 className="t-heading-lg">{withChips(t('usb.title'))}</h2>
      <p className="t-body-marketing">{t('usb.sub')}</p>

      <div className="stack">
        {USB_OPTIONS.wired.map((o) => (
          <SelectionCard key={o.id} onClick={() => advance({ usb_type: o.label, usb_c_selected: o.usb_c })}>
            <div className="gen-card">
              <div className="gen-card__text">
                <span className="t-heading-sm">{o.label}</span>
              </div>
              <div className="gen-card__photo">
                {o.photo ? <img src={o.photo} alt={o.label} /> : <UsbThumb />}
              </div>
            </div>
          </SelectionCard>
        ))}
      </div>
    </>
  );
}

// Placeholder thumbnail — swapped for a real photo when config `photo` is set.
function UsbThumb() {
  return (
    <svg viewBox="0 0 80 40" className="gen-card__glyph" aria-hidden="true">
      <rect x="8" y="16" width="34" height="8" rx="2" fill="var(--color-accent-violet-mid)" />
      <rect x="42" y="14" width="30" height="12" rx="3" fill="none" stroke="var(--color-accent-violet-mid)" strokeWidth="3" />
      <rect x="14" y="18" width="6" height="4" fill="var(--color-ink-deep)" />
    </svg>
  );
}
