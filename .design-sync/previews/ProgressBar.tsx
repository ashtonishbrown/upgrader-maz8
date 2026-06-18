import { ProgressBar } from 'mazda-upgrader';

const Track = ({ children }: { children: React.ReactNode }) => (
  <div style={{ width: '280px', background: '#1f1633', padding: '16px 0', borderRadius: '4px' }}>
    {children}
  </div>
);

export const Empty = () => <Track><ProgressBar value={0} /></Track>;
export const Quarter = () => <Track><ProgressBar value={0.25} /></Track>;
export const Half = () => <Track><ProgressBar value={0.5} /></Track>;
export const ThreeQuarters = () => <Track><ProgressBar value={0.75} /></Track>;
export const Complete = () => <Track><ProgressBar value={1} /></Track>;
