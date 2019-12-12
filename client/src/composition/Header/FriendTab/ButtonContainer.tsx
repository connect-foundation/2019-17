import React, { useState } from 'react';
import ActionButton from 'components/ActionButton';
import Button from 'components/Button';
import styled from 'styled-components';
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
  const [acceptFriend] = useRequestFriendMutation();
  const [rejectFriend] = useRejectFriendRequestMutation();

  function sendRequest(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    acceptFriend({ variables: { email, relation: 'REQUESTED_FROM' } });
    setIsFriend(true);
  }

  function rejectRequest(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    rejectFriend({ variables: { email } });
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
