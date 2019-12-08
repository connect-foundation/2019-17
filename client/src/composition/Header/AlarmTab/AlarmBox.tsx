import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Profile from 'components/Profile';
import { Alarm } from 'react-components.d';
import CommonBox from '../CommonBox';

const cursor = css`
  cursor: pointer;
`;
const BoldText = styled.span`
  ${cursor}
  font-weight: 600;
`;

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

AlamBox.defaultProps = {
  isRead: false
};

//
function AlamBox({ alarm, isRead }: { alarm: Alarm; isRead: boolean }) {
  // const alarms
  const [readState, setReadState] = useState(isRead);
  console.log(readState);
  const onClick = () => setReadState(true);

  return (
    <Container isRead={readState} onClick={onClick}>
      <Column>
        <Profile
          size={'45px'}
          imageUrl={
            alarm.thumbnail || process.env.PUBLIC_URL + '/images/profile.jpg'
          }
        />
        <TextContainer>
          <MessageText>
            <BoldText>{alarm.writer}</BoldText> 님이 새로운 게시글을 올렸습니다.
          </MessageText>
          <MessageText>
            <span> 새 게시글 </span> <DateText> 2019.11.12 </DateText>
          </MessageText>
        </TextContainer>
      </Column>

      <Column>
        <Dot isRead={readState} />
      </Column>
    </Container>
  );
}

export default AlamBox;
