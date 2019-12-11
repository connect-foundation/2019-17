import React, { useState } from 'react';
import ActionButton from 'components/ActionButton';
import Button from 'components/Button';
import styled from 'styled-components';
import { useRequestFriendMutation } from 'react-components.d';

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
  const [requestFriend] = useRequestFriendMutation();

  async function sendRequest(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    requestFriend({ variables: { email, relation: 'REQUESTED_FROM' } });
    setIsFriend(true);
  }

  return (
    <>
      <OkButtonDiv isFriend={isFriend}>
        <Button text="확인" onClick={sendRequest} size="small"></Button>
      </OkButtonDiv>
      <ActionButton text={isFriend ? '친구' : '삭제'}></ActionButton>
    </>
  );
}

export default ButtonContainer;
