import ProgressBar from './ProgressBar.jsx';
import Button from './Button.jsx';

// Wraps every step with the correct canvas polarity, the progress bar, and an
// optional back button. canvas: 'dark' | 'light'.
export default function StepLayout({ canvas = 'dark', progress = 0, onBack, children }) {
  return (
    <section className={`step step--${canvas}`}>
      <ProgressBar value={progress} />
      <div className="step__body">
        {onBack && (
          <div className="step__back">
            <Button variant="ghost" onClick={onBack}>
              ← Back
            </Button>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
