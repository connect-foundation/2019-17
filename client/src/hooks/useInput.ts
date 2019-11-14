import { useState } from 'react';

function useInput(initialState: string) {
  const [value, setValue] = useState(initialState);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value: val }
    } = e;
    setValue(val);
  };
  return { value, onChange };
}

export default useInput;
