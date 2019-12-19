import { SEND_LIKE, WRITE_COMMENT } from 'composition/Feed/feed.query';

export const mocks = [
  {
    request: {
      query: SEND_LIKE,
      variables: {}
    },
    result: {
      data: {
        updateLike: true
      }
    }
  },
  {
    request: {
      query: WRITE_COMMENT,
      variables: {
        content: 'COMMENT TEXT1',
        feedId: 1280
      }
    },
    result: {
      data: {
        writeComment: true
      }
    }
  }
];
