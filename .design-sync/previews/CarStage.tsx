import { CarStage } from 'mazda-upgrader';

export const Start = () => (
  <div style={{ background: '#150f23', padding: '8px' }}>
    <CarStage progress={0} model="Mazda 2" />
  </div>
);

export const Halfway = () => (
  <div style={{ background: '#150f23', padding: '8px' }}>
    <CarStage progress={0.5} model="CX-5" />
  </div>
);

export const Complete = () => (
  <div style={{ background: '#150f23', padding: '8px' }}>
    <CarStage progress={1} model="CX-5" />
  </div>
);
