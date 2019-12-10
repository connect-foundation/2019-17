import React, { useEffect } from 'react';
import styled from 'styled-components';
import CommonHeader from '../CommonHeader';
import CommonFooter from '../CommonFooter';
import CommonBody from '../CommonBody';

import AlamBox from './AlarmBox';
import { useGetAlarmsQuery, Alarm, useMeQuery } from 'react-components.d';
import { SUBSCRIBE_ALARMS } from './alarm.query';

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

function AlarmTabPresenter() {
  const { data, subscribeToMore } = useGetAlarmsQuery();
  const { data: myInfo } = useMeQuery();

  useEffect(() => {
    return subscribeToNewFeeds();
  }, []);

  const subscribeToNewFeeds = () => {
    return subscribeToMore({
      document: SUBSCRIBE_ALARMS,
      variables: {
        userEmail: myInfo && myInfo.me && myInfo.me.email ? myInfo.me.email : ''
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const { data: subscribedAlarms } = subscriptionData;

        if (
          !subscribedAlarms ||
          !subscribedAlarms.alarms ||
          !subscribedAlarms.alarms.length ||
          !prev.alarms
        ) {
          return prev;
        }

        return Object.assign({}, prev, {
          alarms: [...subscribedAlarms.alarms, ...prev.alarms]
        });
      }
    });
  };

  return (
    <Container>
      <Header>
        <RecentText>알림</RecentText>
      </Header>
      <CommonBody>
        {data &&
          data.alarms &&
          data.alarms.map((alarm: Alarm, idx) => {
            return <AlamBox alarm={alarm} key={'alarm_' + idx} />;
          })}
      </CommonBody>
      <Footer>
        <Text>모두 읽은 상태로 표시</Text>
      </Footer>
    </Container>
  );
}

export default AlarmTabPresenter;
