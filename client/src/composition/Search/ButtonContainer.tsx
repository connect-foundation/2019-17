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
  switch (relation) {
    case 'NONE':
      return '친구 요청';
    case 'REQUEST':
      return '친구 요청 전송됨';
    case 'REQUESTED_FROM':
      return '친구 승인';
    default:
      return '친구';
  }
}

function getNextRelation(relation: string) {
  switch (relation) {
    case 'NONE':
      return 'REQUEST';
    case 'REQUEST':
      if (window.confirm('친구신청을 취소하시겠습니까?')) return 'NONE';
      return '';
    case 'REQUESTED_FROM':
      return 'FRIEND';
    default:
      if (window.confirm('친구관계를 끊겠습니까?')) return 'NONE';
      return '';
  }
}

function ButtonContainer({ email, initialRelation }: IProps) {
  const [relation, setRelation] = useState(initialRelation);
  const [requestFriend] = useMutation(REQUEST_FRIEND);

  async function sendRequest(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const changedRelation = getNextRelation(relation);
    if (changedRelation) {
      requestFriend({ variables: { email, relation } });
      setRelation(changedRelation);
    }
  }

  return (
    <>
      <ActionButton
        text={getReleationText(relation)}
        onClick={sendRequest}></ActionButton>
    </>
  );
}

export default ButtonContainer;