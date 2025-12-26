import { useState } from 'react';

export default function useInput(initValue = '') {
  const [value, setValue] = useState(initValue);
  const set = (e) => setValue(e.target.value);
  const reset = () => setValue('');
  return { value, set, reset };
}
