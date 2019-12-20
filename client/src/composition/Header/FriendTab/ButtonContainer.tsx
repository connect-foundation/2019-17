import React, { useState } from 'react';
import styled from 'styled-components';
import ActionButton from 'components/ActionButton';
import Button from 'components/Button';
import {
  useRequestFriendMutation,
  useRejectFriendRequestMutation
} from 'react-components.d';

const OkButtonDiv = styled.div<IDiv>`
  display: ${props => (props.isFriend ? 'none' : 'block')};
  margin-right: 10px;
`;

interface IProps {
  email: string;
}

interface IDiv {
  isFriend: boolean;
}

function ButtonContainer({ email }: IProps) {
  const [isFriend, setIsFriend] = useState(false);
  const [acceptFriend, { error: acceptError }] = useRequestFriendMutation();
  const [rejectFriend] = useRejectFriendRequestMutation();

  async function sendRequest(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    await acceptFriend({ variables: { email, relation: 'REQUESTED_FROM' } });
    if (acceptError) alert('상대방의 친구 요청이 취소되었습니다.');
    setIsFriend(true);
  }

  function rejectRequest(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!isFriend) {
      rejectFriend({ variables: { email } });
    }
  }

  return (
    <>
      <OkButtonDiv isFriend={isFriend}>
        <Button text="확인" onClick={sendRequest} size="small"></Button>
      </OkButtonDiv>
      <ActionButton
        text={isFriend ? '친구' : '삭제'}
        onClick={rejectRequest}></ActionButton>
    </>
  );
}

export default ButtonContainer;
