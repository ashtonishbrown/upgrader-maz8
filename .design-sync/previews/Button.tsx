import { Button } from 'mazda-upgrader';

export const Primary = () => <Button variant="primary">Continue</Button>;

export const Inverted = () => (
  <div style={{ background: '#150f23', padding: '24px', borderRadius: '8px', display: 'inline-block' }}>
    <Button variant="inverted">Continue</Button>
  </div>
);

export const Ghost = () => (
  <div style={{ background: '#150f23', padding: '24px', borderRadius: '8px', display: 'inline-block' }}>
    <Button variant="ghost">← Back</Button>
  </div>
);

export const WhatsApp = () => <Button variant="whatsapp">Chat on WhatsApp</Button>;

export const FullWidth = () => (
  <div style={{ width: '280px' }}>
    <Button variant="primary" full>Continue</Button>
  </div>
);

export const Loading = () => (
  <Button variant="primary" loading loadingLabel="Submitting…">Continue</Button>
);

export const Disabled = () => <Button variant="primary" disabled>Submit</Button>;
