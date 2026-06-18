import { TextInput } from 'mazda-upgrader';

export const Filled = () => (
  <div style={{ width: '320px', padding: '16px' }}>
    <TextInput label="Name" value="Faiz Ahmad" onChange={() => {}} />
  </div>
);

export const Placeholder = () => (
  <div style={{ width: '320px', padding: '16px' }}>
    <TextInput
      label="WhatsApp number"
      value=""
      onChange={() => {}}
      placeholder="+60 12-345 6789"
      inputMode="tel"
    />
  </div>
);

export const Required = () => (
  <div style={{ width: '320px', padding: '16px' }}>
    <TextInput
      label="Email"
      value=""
      onChange={() => {}}
      placeholder="you@example.com"
      required
      type="email"
    />
  </div>
);

export const Error = () => (
  <div style={{ width: '320px', padding: '16px' }}>
    <TextInput
      label="Email"
      value="not-an-email"
      onChange={() => {}}
      error="Enter a valid email."
    />
  </div>
);
