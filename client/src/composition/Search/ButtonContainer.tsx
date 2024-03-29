import React, { useState } from 'react';
import ActionButton from 'components/ActionButton';
import { useMutation } from '@apollo/react-hooks';
import { REQUEST_FRIEND } from './search.query';
import { NO_RELATION, FRIEND } from './constants';

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
      try {
        await requestFriend({
          variables: { email, relation }
        });
      } catch (e) {
        return window.location.reload();
      }

      if (
        (relation === FRIEND && changedRelation === NO_RELATION) ||
        changedRelation === FRIEND
      )
        return window.location.reload();

      setRelation(changedRelation);
    }
  }

  return (
    <ActionButton
      text={getReleationText(relation)}
      onClick={sendRequest}></ActionButton>
  );
}

export default ButtonContainer;
