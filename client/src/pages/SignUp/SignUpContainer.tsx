import React from 'react';
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

  return (
    <SignUpPresenter
      nickname={nickname}
      location={location}
      hometown={hometown}
    />
  );
}

export default SignUpContainer;
