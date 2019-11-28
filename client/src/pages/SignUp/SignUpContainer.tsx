import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import queryString from 'querystring';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import SignUpPresenter from './SignUpPresenter';
import useInput, { IUseInput } from '../../hooks/useInput';
import {
  Scalars,
  Maybe,
  SignUpMutation,
  SignUpMutationVariables
} from '../../react-components.d';

const validateName = (inputName: string): boolean => {
  // 숫자로 시작안됨, 영어한글숫자가능 공백불가능, 닉네임 최소 길이 4자
  const validateKey = /^[^0-9][가-힣a-zA-Z0-9_]{3,16}$/;
  const result = validateKey.test(inputName);
  return result;
};

const SIGN_UP_MUTATION = gql`
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

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    if (target.files && target.files[0]) {
      setSrc(URL.createObjectURL(target.files[0]));
      setFile(target.files[0]);
    }
  };

  const [signUpMutation] = useMutation<SignUpMutation, SignUpMutationVariables>(
    SIGN_UP_MUTATION
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = queryString.parse(location.search.substring(1))
      .email as string;
    if (!email) history.push('/signin');
    if (nameValid) {
      console.log(file);
      await signUpMutation({
        variables: {
          email,
          residence: residence.value,
          hometown: hometown.value,
          nickname: nickname.value,
          file
        }
      });
      history.push('/');
    }
  };

  return (
    <SignUpPresenter
      nickname={nickname}
      residence={residence}
      hometown={hometown}
      onFileChange={onFileChange}
      onSubmit={onSubmit}
      src={src}
      nameValid={nameValid}
    />
  );
}

export default withRouter(SignUpContainer);
