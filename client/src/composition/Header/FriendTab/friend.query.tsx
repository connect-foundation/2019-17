import gql from 'graphql-tag';

export const REQUEST_FRIEND = gql`
  mutation requestFriend($email: String!, $relation: String!) {
    requestFriend(targetEmail: $email, relation: $relation)
  }
`;

export const GET_REC_ALARM = gql`
  query recommendAlarm {
    recommendAlarm {
      nickname
      email
      thumbnail
    }
  }
`;

export const GET_REQ_ALARM = gql`
  query requestAlarm {
    requestAlarm {
      nickname
      email
      thumbnail
    }
  }
`;

export const ALARM_SUBSCRIPTION = gql`
  subscription requestAlarmAdded {
    requestAlarmAdded {
      nickname
      email
      thumbnail
    }
  }
`;

export const GET_ALARM_NUM = gql`
  query friendUnreadAlarmNum {
    friendUnreadAlarmNum
  }
`;

export const CHANGE_READ_STATE = gql`
  mutation changeAllRequestReadState {
    changeAllRequestReadState
  }
`;
