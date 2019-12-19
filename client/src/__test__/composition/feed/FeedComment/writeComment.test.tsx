import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, fireEvent, wait } from '@testing-library/react';
import MockForm from '__test__/MockForm';
import { getDate, fullDateFormat } from 'utils/dateUtil';
import { mocks } from '__test__/composition/Feed/FeedComment/mock.query';
import { mockFeedData } from '__test__/composition/Feed/FeedComment/mock.data';
import Feed from 'composition/Feed/Feed';
import { COMMENT_INPUT_PLACE_HOLDER } from 'composition/Feed/constant';
afterEach(cleanup);

describe('<Feed /> ', () => {
  test('Feed Render', () => {
    const feed = render(
      <MockForm mocks={mocks}>
        <Feed
          content={'FEED CONTENT '}
          feedinfo={mockFeedData}
          createdAt={fullDateFormat(getDate(mockFeedData.feed.createdAt))}
        />
      </MockForm>
    );

    feed.getByPlaceholderText(COMMENT_INPUT_PLACE_HOLDER);
  });

  test('<Feed /> 에 add Comment Mutaion 쿼리 동작 확인', async () => {
    const feed = render(
      <MockForm mocks={mocks}>
        <Feed
          content={'FEED CONTENT '}
          feedinfo={mockFeedData}
          createdAt={fullDateFormat(getDate(mockFeedData.feed.createdAt))}
        />
      </MockForm>
    );

    const label = feed.getByPlaceholderText(COMMENT_INPUT_PLACE_HOLDER);

    fireEvent.change(label, {
      target: {
        value: 'COMMENT TEXT1'
      }
    });
    const btn = feed.getByText('등록');

    fireEvent.click(btn);

    await wait(() => {
      expect(label.textContent).toBe('');
    });
  });
});
