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

export const GET_CHECK_STATE_COUNT = gql`
  query alarmCount {
    alarmCount
  }
`;

export const CHANGE_ALL_CHECK_STATE_COUNT = gql`
  mutation changeAllFeedAlarmCheckState {
    changeAllFeedAlarmCheckState
  }
`;
