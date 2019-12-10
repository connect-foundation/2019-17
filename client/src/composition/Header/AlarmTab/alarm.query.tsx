import gql from 'graphql-tag';

export const GET_ALARMS = gql`
  query getAlarms {
    alarms {
      writer
      createdAt {
        year
        month
        day
        hour
        minute
        second
        nanosecond
      }
      thumbnail
      email
      content
      isRead
      isChecked
      feedId
      type
    }
  }
`;

export const SUBSCRIBE_ALARMS = gql`
  subscription subscribeAlarms($userEmail: String!) {
    alarms(userEmail: $userEmail) {
      writer
      createdAt {
        year
        month
        day
        hour
        minute
        second
        nanosecond
      }
      thumbnail
      email
      content
      isRead
      isChecked
      feedId
      type
    }
  }
`;

export const CHANGE_READ_STATE = gql`
  mutation changeFeedAlarmReadState($feedId: Int!) {
    changeFeedAlarmReadState(feedId: $feedId)
  }
`;
