import { SelectionCard } from 'mazda-upgrader';

const Dark = ({ children }: { children: React.ReactNode }) => (
  <div style={{ width: '320px', padding: '16px', background: '#150f23', borderRadius: '12px' }}>
    {children}
  </div>
);

export const Default = () => (
  <Dark>
    <SelectionCard>
      <div style={{ fontWeight: 600 }}>Wireless CarPlay</div>
      <div style={{ color: '#bdb8c0', fontSize: '14px', marginTop: '4px' }}>Connects automatically, no cable</div>
    </SelectionCard>
  </Dark>
);

export const Selected = () => (
  <Dark>
    <SelectionCard selected>
      <div style={{ fontWeight: 600 }}>Wireless CarPlay</div>
      <div style={{ color: '#bdb8c0', fontSize: '14px', marginTop: '4px' }}>Connects automatically, no cable</div>
    </SelectionCard>
  </Dark>
);

export const Disabled = () => (
  <Dark>
    <SelectionCard disabled>
      <div style={{ fontWeight: 600 }}>Starlight Roof</div>
      <div style={{ color: '#bdb8c0', fontSize: '14px', marginTop: '4px' }}>Coming soon</div>
    </SelectionCard>
  </Dark>
);
