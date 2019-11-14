import React, { useState } from 'react';
import SignUpPresenter from './SignUpPresenter';
import useInput from '../../hooks/useInput';

export interface IUseInput {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function SignUpContainer() {
  const nickname: IUseInput = useInput('');
  const location: IUseInput = useInput('');
  const hometown: IUseInput = useInput('');
  const [src, setSrc] = useState('');
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    if (target.files && target.files[0]) {
      setSrc(URL.createObjectURL(target.files[0]));
    }
  };

  return (
    <SignUpPresenter
      nickname={nickname}
      location={location}
      hometown={hometown}
      onFileChange={onFileChange}
      src={src}
    />
  );
}

export default SignUpContainer;
