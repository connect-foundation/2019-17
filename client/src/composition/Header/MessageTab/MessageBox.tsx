import React from 'react';
import styled from 'styled-components';
import Profile from 'components/Profile';
import CommonBox from '../CommonBox';
import { useState } from 'react';

const Container = styled(CommonBox)<{ isRead: boolean; onClick: () => void }>`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  background-color: ${props => (props.isRead ? 'white' : '#edf2fa')};
  border-left: 1px solid
    ${props => (props.isRead ? 'inherit' : 'rgba(0,0,0,0.7)')};
`;

const Column = styled.div`
  display: flex;
  min-width: 10%;
  align-items: center;
  color: rgba(0, 0, 0, 0.5);
  &:last-child {
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
  }
`;

const TextContainer = styled.div`
  margin-left: 1rem;
`;

const Nickname = styled.span`
  display: block;
  color: rgba(0, 0, 0, 0.8);
  font-weight: 600;
  font-size: 0.875rem;
`;

const MessageText = styled.span`
  display: inline-block;
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: ${props => props.theme.colors.textColor};
`;

const DateText = styled.span`
  margin-bottom: 0.25rem;
`;

const Dot = styled.span<{ isRead: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: ${props => (props.isRead ? '2px' : '4px')} solid rgba(0, 0, 0, 0.3);
`;

interface IProps {
  isRead: boolean;
}

function MessageBox({ isRead }: IProps) {
  const [readState, setReadState] = useState(isRead);
  const onClick = () => setReadState(true);
  return (
    <Container isRead={readState} onClick={onClick}>
      <Column>
        <Profile size={'45px'} />
        <TextContainer>
          <Nickname>이규종</Nickname>
          <MessageText>안녕하세요</MessageText>
        </TextContainer>
      </Column>
      <Column>
        <DateText>4월 20일</DateText>
        <Dot isRead={readState} />
      </Column>
    </Container>
  );
}

MessageBox.defaultProps = {
  isRead: false
};

export default MessageBox;
