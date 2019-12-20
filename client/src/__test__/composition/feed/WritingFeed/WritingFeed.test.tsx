import React from 'react';
import { render, cleanup, fireEvent, wait } from '@testing-library/react';
import WritingFeed from 'composition/Feed/WritingFeed';
import MockForm from '__test__/MockForm';
import { PLACEHOEDER_TEXT } from 'composition/Feed/WritingFeed/constant';
import { mocks } from './mock.query';
import { content } from './mock.data';
import resolvers from 'apollo/resolvers';

afterEach(cleanup);

describe('<WritingFeed />', () => {
  test('<WritingFeed /> : 피드 쓰기 입력', async () => {
    const { getByTestId, getByPlaceholderText } = render(
      <MockForm mocks={mocks} resolvers={resolvers}>
        <WritingFeed />
      </MockForm>
    );
    window.alert = jest.fn();
    const textArea = getByPlaceholderText(
      PLACEHOEDER_TEXT
    ) as HTMLTextAreaElement;
    fireEvent.change(textArea, { target: { value: content } });
    const submitBtn = getByTestId('writingFeedSubmitBtn');
    fireEvent.click(submitBtn);
    await wait(() => expect(textArea.value).toBe(''));
  });
});
