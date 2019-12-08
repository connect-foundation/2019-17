import React from 'react';
import styled from 'styled-components';
import CommonHeader from '../CommonHeader';
import CommonFooter from '../CommonFooter';
import { GET_ALARMS } from './alarm.query';
import { useQuery } from '@apollo/react-hooks';
import Alam from './Alarm';

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
  // const alarms

  const { data } = useQuery(GET_ALARMS);

  if (data) {
    console.log(data);
  }
  return (
    <Container>
      <Header>
        <RecentText>알림</RecentText>
      </Header>
      <div>
        <Alam />
      </div>
      <Footer>
        <Text>모두 읽은 상태로 표시</Text>
      </Footer>
    </Container>
  );
}

export default AlarmTabPresenter;
