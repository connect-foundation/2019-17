import { useState } from 'react';

function useInput(initialState: string) {
  const [val, setVal] = useState(initialState);
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value }
    } = e;
    setVal(value);
  };
  return { val, onChange };
}

export default useInput;
