import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_FRIEND_ALARM = gql`
  query getFriendAlarm {
    getFriendAlarm {
      requestedUser {
        nickname
        email
        thumbnail
      }
      friendRecommendation {
        nickname
        email
        thumbnail
      }
    }
  }
`;

const Header = styled.div`
  color: black;
`;

function FriendsTab() {
  const { subscribeToMore, data, loading, error } = useQuery(GET_FRIEND_ALARM);

  if (loading) return <p>loading</p>;
  if (error) return <p>{JSON.stringify(error)}</p>;

  return <Header>{JSON.stringify(data)}</Header>;
}

export default FriendsTab;
