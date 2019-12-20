import React, { useRef } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { render, cleanup, fireEvent, wait } from '@testing-library/react';
import ChatFooter from 'composition/ChatRooms/ChatFooter';
import { PLACEHOLDER_TEXT } from 'composition/ChatRooms/constant';
import MockForm from '__test__/MockForm';
import { mocks } from './mock.query';
import { chatRoomId, content } from './mock.data';

afterEach(cleanup);

describe('<ChatFooter />', () => {
  test('<ChatFooter /> : 메세지 입력 테스트', async () => {
    const { result } = renderHook(() => useRef(null));
    let chatBody: any = result.current;
    chatBody = Object.assign(
      {},
      { ...chatBody },
      { ...chatBody, current: { scrollTop: 100, scrollHeight: 120 } }
    );

    const { getByPlaceholderText, getByTestId } = render(
      <MockForm mocks={mocks}>
        <ChatFooter chatRoomId={chatRoomId} chatBody={chatBody} />
      </MockForm>
    );

    const input = getByPlaceholderText(PLACEHOLDER_TEXT);

    fireEvent.change(input, { target: { value: content } });
    expect(input).toHaveAttribute('value', content);

    fireEvent.submit(getByTestId('chatFooterForm'));
    await wait(() => expect(input).toHaveAttribute('value', ''));
  });
});
