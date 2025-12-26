import { useState } from 'react';

export default function useSwitch(initValue = false) {
  const [value, setValue] = useState(initValue);
  const on = () => setValue(true);
  const off = () => setValue(false);
  const toggle = () => setValue((c) => !c);
  return { value, true: on, false: off, toggle };
}
