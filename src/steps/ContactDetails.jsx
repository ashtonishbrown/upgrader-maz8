import { useState } from 'react';
import TextInput from '../components/TextInput.jsx';
import Button from '../components/Button.jsx';
import { MALAYSIAN_STATES, isLocationSupported, isValidMyPhone, isValidEmail } from '../config.js';
import { useT, withChips } from '../i18n.jsx';

// Step 5 — captured before the verdict so the lead is secured regardless of the
// availability/compatibility outcome. Name + WhatsApp + area required; email optional.
export default function ContactDetails({ data, set, advance }) {
  const t = useT();
  const [errors, setErrors] = useState({});

  const submit = () => {
    const e = {};
    if (!data.name?.trim()) e.name = t('contact.err.name');
    if (!isValidMyPhone(data.whatsapp)) e.whatsapp = t('contact.err.whatsapp');
    if (data.email && !isValidEmail(data.email)) e.email = t('contact.err.email');
    if (!data.location) e.area = t('contact.err.area');
    setErrors(e);
    if (Object.keys(e).length === 0) {
      advance({ service_available: isLocationSupported(data.location) });
    }
  };

  return (
    <>
      <h2 className="t-heading-lg">{withChips(t('contact.title'))}</h2>
      <p className="t-body-marketing">{t('contact.sub')}</p>

      <div className="stack">
        <TextInput
          label={t('contact.name')}
          required
          value={data.name || ''}
          onChange={(v) => set({ name: v })}
          error={errors.name}
          autoComplete="name"
        />
        <TextInput
          label={t('contact.whatsapp')}
          required
          type="tel"
          inputMode="tel"
          value={data.whatsapp || ''}
          onChange={(v) => set({ whatsapp: v })}
          error={errors.whatsapp}
          autoComplete="tel"
          placeholder="012-345 6789"
        />
        <TextInput
          label={`${t('contact.email')} ${t('common.optional')}`}
          type="email"
          inputMode="email"
          value={data.email || ''}
          onChange={(v) => set({ email: v })}
          error={errors.email}
          autoComplete="email"
        />
        <label className="field">
          <span className="field__label">{t('contact.area')} *</span>
          <select
            className={`select${errors.area ? ' text-input--error' : ''}`}
            value={data.location || ''}
            onChange={(e) => set({ location: e.target.value, service_available: isLocationSupported(e.target.value) })}
            aria-invalid={Boolean(errors.area)}
          >
            <option value="" disabled>
              {t('contact.selectArea')}
            </option>
            {MALAYSIAN_STATES.map((s) => (
              <option key={s.name} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
          {errors.area && <span className="field__error">{errors.area}</span>}
        </label>
      </div>

      <Button variant="primary" full onClick={submit}>
        {t('common.continue')}
      </Button>
      <p className="t-caption consent-text">{t('contact.consent')}</p>
    </>
  );
}
