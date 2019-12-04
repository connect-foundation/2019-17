import React from 'react';
import styled, { css } from 'styled-components';
import { FaBell, FaUserFriends } from 'react-icons/fa';
import { AiFillMessage } from 'react-icons/ai';

const Container = styled.div`
  width: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.25rem;
`;

const cusor = css`
  cursor: pointer;
`;

const FriendsIcon = styled(FaUserFriends)`
  ${cusor}
`;

const MessageIcon = styled(AiFillMessage)`
  ${cusor}
`;

const AlarmIcon = styled(FaBell)`
  ${cusor}
`;

function AlarmTab() {
  return (
    <Container>
      <FriendsIcon />
      <MessageIcon />
      <AlarmIcon />
    </Container>
  );
}

export default AlarmTab;
