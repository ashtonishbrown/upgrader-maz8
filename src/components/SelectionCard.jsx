// Full-card tappable choice (replaces dropdowns). Dark-canvas spec.
export default function SelectionCard({ selected = false, disabled = false, onClick, children }) {
  const cls = [
    'selection-card',
    'tappable',
    selected && 'selection-card--selected',
    disabled && 'selection-card--disabled',
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <button
      className={cls}
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
    >
      {children}
    </button>
  );
}
