import { StepLayout, Button, SelectionCard } from 'mazda-upgrader';

export const DarkWithContent = () => (
  <div style={{ width: '390px' }}>
    <StepLayout canvas="dark" progress={0.3} onBack={() => {}}>
      <h2 className="t-heading-md">Which Mazda do you drive?</h2>
      <p style={{ color: '#bdb8c0' }}>Tap your model.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <SelectionCard>Mazda 2</SelectionCard>
        <SelectionCard>Mazda 3</SelectionCard>
        <SelectionCard selected>CX-5</SelectionCard>
      </div>
      <Button variant="primary" full>Continue</Button>
    </StepLayout>
  </div>
);

export const LightWithContent = () => (
  <div style={{ width: '390px' }}>
    <StepLayout canvas="light" progress={0.6} onBack={() => {}}>
      <h2 className="t-heading-md" style={{ color: '#1f1633' }}>Where should we send your quote?</h2>
      <p style={{ color: '#79628c' }}>We'll check availability for your area and follow up on WhatsApp.</p>
      <Button variant="primary" full>Continue</Button>
    </StepLayout>
  </div>
);
