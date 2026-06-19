export default function TextInput({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  required = false,
  error,
  inputMode,
  autoComplete,
}) {
  return (
    <label className="field">
      {label && (
        <span className="field__label">
          {label}
          {required && ' *'}
        </span>
      )}
      <input
        className={`text-input${error ? ' text-input--error' : ''}`}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
      />
      {error && <span className="field__error">{error}</span>}
    </label>
  );
}
