import { useState } from 'react';

export interface IUseInput {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function useInput(
  initialState: string,
  customOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void = () => {}
): IUseInput {
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
