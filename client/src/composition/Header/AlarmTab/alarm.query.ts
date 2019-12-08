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
    }
  }
`;
