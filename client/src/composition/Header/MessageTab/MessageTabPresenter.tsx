import React from 'react';
import styled from 'styled-components';
import CommonHeader from '../CommonHeader';
import CommonFooter from '../CommonFooter';
import CommonBody from '../CommonBody';
import MessageBox from './MessageBox';

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

const Text = styled.span`
  color: ${props => props.theme.colors.facebookBlue};
  cursor: pointer;
`;

const Footer = styled(CommonFooter)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0.25rem 0.5rem;
`;

const Body = styled(CommonBody)``;

interface IProps {
  onClickNewMessage: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

function MessageTabPresenter({ onClickNewMessage }: IProps) {
  return (
    <Container>
      <Header>
        <RecentText>최근 (12)</RecentText>
        <Text onClick={onClickNewMessage}>새 메세지</Text>
      </Header>
      <Body>
        <MessageBox isRead />
        <MessageBox />
        <MessageBox />
        <MessageBox />
        <MessageBox />
        <MessageBox />
        <MessageBox />
        <MessageBox />
        <MessageBox />
        <MessageBox />
        <MessageBox />
        <MessageBox />
      </Body>
      <Footer>
        <Text>모두 읽은 상태로 표시</Text>
      </Footer>
    </Container>
  );
}

export default MessageTabPresenter;
