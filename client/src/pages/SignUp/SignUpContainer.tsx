import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import queryString from 'querystring';
import gql from 'graphql-tag';
import _ from 'lodash';
import SignUpPresenter from './SignUpPresenter';
import useInput, { IUseInput } from 'hooks/useInput';
import { Scalars, Maybe, useSignUpMutation } from 'react-components.d';
import { PAGE_PATHS } from 'Constants';

const validateName = (inputName: string): boolean => {
  // 숫자로 시작안됨, 영어한글숫자가능 공백불가능, 닉네임 최소 길이 4자
  const validateKey = /^[^0-9][가-힣a-zA-Z0-9_]{1,16}$/;
  const result = validateKey.test(inputName);
  return result;
};

export const SIGN_UP_MUTATION = gql`
  mutation signUp(
    $nickname: String!
    $hometown: String!
    $residence: String!
    $email: String!
    $file: Upload
  ) {
    signUp(
      nickname: $nickname
      hometown: $hometown
      residence: $residence
      email: $email
      file: $file
    ) {
      email
    }
  }
`;

function SignUpContainer({ history, location }: RouteComponentProps) {
  const validateChangedName = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const result = validateName(e.target.value);
    setNameValid(result);
  };

  const nickname: IUseInput = useInput('', validateChangedName);
  const [nameValid, setNameValid] = useState(true);
  const residence: IUseInput = useInput('');
  const hometown: IUseInput = useInput('');
  const [file, setFile] = useState<Maybe<Scalars['Upload']>>(null);
  const [src, setSrc] = useState('');

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { target } = e;
    if (target.files && target.files[0]) {
      setSrc(URL.createObjectURL(target.files[0]));
      setFile(target.files[0]);
    }
  };

  const [signUpMutation] = useSignUpMutation();

  const onSubmit = _.debounce(
    async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      const email = queryString.parse(location.search.substring(1))
        .email as string;
      if (!email) history.push(PAGE_PATHS.SIGNIN);
      if (nameValid) {
        await signUpMutation({
          variables: {
            email,
            residence: residence.value,
            hometown: hometown.value,
            nickname: nickname.value,
            file
          }
        });
        window.location.href = PAGE_PATHS.SIGNIN;
      }
    },
    500
  );

  const handleSubmitDebounce = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <SignUpPresenter
      nickname={nickname}
      residence={residence}
      hometown={hometown}
      onFileChange={onFileChange}
      onSubmit={handleSubmitDebounce}
      src={src}
      nameValid={nameValid}
    />
  );
}

export default withRouter(SignUpContainer);
