import { ENROLL_FEED_MUTATION } from 'composition/Feed/WritingFeed/WritingFeed.query';
import { content } from './mock.data';
import { ENROLL_WRITING_FEED } from 'cache/writingFeed.query';

export const mocks = [
  {
    request: {
      query: ENROLL_FEED_MUTATION,
      variables: {
        content,
        files: []
      }
    },
    result: {
      data: {
        enrollFeed: true
      }
    }
  },
  {
    request: {
      query: ENROLL_FEED_MUTATION,
      variables: {
        content: '',
        files: []
      }
    },
    result: {
      data: {
        enrollFeed: false
      }
    }
  },
  {
    request: {
      query: ENROLL_WRITING_FEED,
      variables: {
        content: ''
      }
    },
    result: {
      data: {
        enrollWritingFeed: null
      }
    }
  },
  {
    request: {
      query: ENROLL_WRITING_FEED,
      variables: {
        content
      }
    },
    result: {
      data: {
        enrollWritingFeed: null
      }
    }
  }
];
