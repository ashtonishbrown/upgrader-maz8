// variant: 'primary' | 'inverted' | 'ghost' | 'whatsapp'
export default function Button({
  variant = 'primary',
  full = false,
  loading = false,
  loadingLabel = 'Submitting…',
  disabled = false,
  type = 'button',
  onClick,
  children,
}) {
  const cls = ['btn', `btn--${variant}`, full && 'btn--full'].filter(Boolean).join(' ');
  return (
    <button className={cls} type={type} onClick={onClick} disabled={disabled || loading}>
      {loading ? (
        <>
          <span className="spinner" aria-hidden="true" />
          {loadingLabel}
        </>
      ) : (
        children
      )}
    </button>
  );
}
