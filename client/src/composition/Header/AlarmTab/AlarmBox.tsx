import React, { useState, Dispatch, SetStateAction } from 'react';
import styled, { css } from 'styled-components';
import Profile from 'components/Profile';
import { Alarm, useChangeFeedAlarmReadStateMutation } from 'react-components.d';
import CommonBox from '../CommonBox';
import { GET_ALARMS } from './alarm.query';
import DetailFeed from '../../DetailFeed';

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

const MessageText = styled.p`
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

const ALARM_TYPE: { [key: string]: string } = {
  Comment: '댓글',
  Feed: '게시글'
};

const getAppliedReadAlarms = (alarms: Alarm[], data: any) => {
  return alarms.map((alarm: any) => {
    if (data && alarm.feedId === data.changeFeedAlarmReadState) {
      alarm.isRead = true;
      return alarm;
    }
    return alarm;
  });
};

interface Iprops {
  alarm: Alarm;
  setModalState: Dispatch<SetStateAction<IModalState>>;
}
interface IModalState {
  isOpen: boolean;
  feedId: number;
}
function AlamBox({ alarm, setModalState }: Iprops) {
  const [readState, setReadState] = useState(
    alarm && alarm.isRead ? alarm.isRead : false
  );

  const [changeRedState] = useChangeFeedAlarmReadStateMutation({
    update(cache, { data }) {
      const { alarms }: any = cache.readQuery({
        query: GET_ALARMS
      });

      const test = getAppliedReadAlarms(alarms, data);

      cache.writeQuery({
        query: GET_ALARMS,
        data: { alarms: test }
      });
    }
  });

  const onClickFold = () => {
    setReadState(true);
    changeRedState({ variables: { feedId: Number(alarm.feedId) } });
    ModalOn();
  };

  const ModalOn = () => {
    setModalState({ isOpen: true, feedId: Number(alarm.feedId) });
  };
  return (
    <Container isRead={readState} onClick={onClickFold}>
      <Column>
        <Profile
          size={'45px'}
          imageUrl={
            alarm.thumbnail || process.env.PUBLIC_URL + '/images/profile.jpg'
          }
        />
        <TextContainer>
          <MessageText>
            <BoldText>{alarm.writer}</BoldText> 님이 새로운{' '}
            {ALARM_TYPE[alarm.type]}을 올렸습니다.
          </MessageText>
          <MessageText>
            <span>{ALARM_TYPE[alarm.type]} </span>
            <DateText>
              {alarm.createdAt.year}.{alarm.createdAt.month}.
              {alarm.createdAt.day}
            </DateText>
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
