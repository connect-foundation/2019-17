import React, { useState } from 'react';
import SignUpPresenter from './SignUpPresenter';
import useInput from '../../hooks/useInput';

export interface IUseInput {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const validateName = (inputName: string): boolean => {
  // 숫자로 시작안됨, 영어한글숫자가능 공백불가능, 닉네임 최소 길이 4자
  const validateKey = /^[^0-9][가-힣a-zA-Z0-9_]{3,16}$/;
  const result = validateKey.test(inputName);
  return result;
};

function SignUpContainer() {
  const validateChanedName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const result = validateName(e.target.value);
    setNameValid(result);
  };

  const nickname: IUseInput = useInput('', validateChanedName);
  const [nameValid, setNameValid] = useState(true);
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
      nameValid={nameValid}
    />
  );
}

export default SignUpContainer;
