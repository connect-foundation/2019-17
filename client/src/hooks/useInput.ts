import { useState } from 'react';

function useInput(
  initialState: string,
  customOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void = () => {}
) {
  const [value, setValue] = useState(initialState);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value: val }
    } = e;
    setValue(val);
    customOnChange(e);
  };
  return { value, onChange };
}

export default useInput;
