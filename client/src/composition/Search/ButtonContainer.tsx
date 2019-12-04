import React, { useState } from 'react';
import ActionButton from 'components/ActionButton';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const REQUEST_FRIEND = gql`
  mutation sendRequest($email: String!) {
    requestFriend(targetEmail: $email)
  }
`;

interface IProps {
  email: string;
  initialRelation: string;
}

function getReleationText(relationText: string) {
  if (relationText === 'REQUEST') return '친구 요청 전송됨';
  else if (relationText === 'REQUESTED_FROM') return '친구 승인';
  else if (relationText === 'NONE') return '친구 요청';
  else return '친구';
}

function ButtonContainer({ email, initialRelation }: IProps) {
  const [relation, setRelation] = useState(initialRelation);
  const [requestFriend] = useMutation(REQUEST_FRIEND);

  async function clicked(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    requestFriend({ variables: { email } });
    setRelation('REQUEST');
  }
  return (
    <>
      <ActionButton
        text={getReleationText(relation)}
        onClick={clicked}></ActionButton>
    </>
  );
}

export default ButtonContainer;
