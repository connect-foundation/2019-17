import React from 'react';
import styled from 'styled-components';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import FriendRequestContainer from './FriendRequestContainer';

const GET_REQ_ALARM = gql`
  query getReqAlarm {
    getReqAlarm {
      nickname
      email
      thumbnail
    }
  }
`;

const ALARM_SUBSCRIPTION = gql`
  subscription friendAlarmAdded {
    friendAlarmAdded {
      nickname
      email
      thumbnail
    }
  }
`;

const Header = styled.div`
  color: black;
`;

function FriendsTab() {
  // const { data: data1, loading, error }: any = useQuery(GET_REQ_ALARM);
  // const {
  //   data: data2,
  //   loading: loading2,
  //   error: error2
  // }: any = useSubscription(ALARM_SUBSCRIPTION);

  // if (loading) return <p>loading</p>;
  // if (error) return <p>{JSON.stringify(error)}</p>;

  // if (loading2) return <p>loading</p>;
  // if (error2) return <p>{JSON.stringify(error2)}</p>;

  return (
    <Header>
      <FriendRequestContainer />
    </Header>
  );
}

export default FriendsTab;
