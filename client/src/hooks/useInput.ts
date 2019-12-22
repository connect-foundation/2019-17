import { useState, Dispatch, SetStateAction } from 'react';

export interface IUseInput {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setValue: Dispatch<SetStateAction<string>>;
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
  return { value, onChange, setValue };
}

export default useInput;
