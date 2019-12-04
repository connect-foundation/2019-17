import React, { useState } from 'react';
import ActionButton from 'components/ActionButton';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const REQUEST_FRIEND = gql`
  mutation sendRequest($email: String!, $relation: String!) {
    requestFriend(targetEmail: $email, relation: $relation)
  }
`;

interface IProps {
  email: string;
  initialRelation: string;
}

function getReleationText(relation: string) {
  if (relation === 'NONE') return '친구 요청';
  else if (relation === 'REQUEST') return '친구 요청 전송됨';
  else if (relation === 'REQUESTED_FROM') return '친구 승인';
  else return '친구';
}

function getNextRelation(relation: string) {
  if (relation === 'NONE') return 'REQUEST';
  else if (relation === 'REQUEST') return 'NONE';
  else if (relation === 'REQUESTED_FROM') return 'FRIEND';
  else return 'NONE';
}

function ButtonContainer({ email, initialRelation }: IProps) {
  const [relation, setRelation] = useState(initialRelation);
  const [requestFriend] = useMutation(REQUEST_FRIEND);

  async function clicked(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    requestFriend({ variables: { email, relation } });
    setRelation(getNextRelation(relation));
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
