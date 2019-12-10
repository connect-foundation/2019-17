import React from 'react';
import styled from 'styled-components';
import CommonHeader from '../CommonHeader';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.75rem;
`;

const Header = styled(CommonHeader)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0.5rem;
`;

const RecentText = styled.span`
  color: rgba(0, 0, 0, 0.8);
  font-weight: 600;
`;

interface IProps {
  text: string;
}

function FriendTabPresenter({ text }: IProps) {
  return (
    <Container>
      <Header>
        <RecentText>{text}</RecentText>
      </Header>
    </Container>
  );
}

export default FriendTabPresenter;
