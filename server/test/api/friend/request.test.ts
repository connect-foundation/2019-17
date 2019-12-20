import { checkResStatusCodeTobe, requestDB } from '../../util/utils';
import { CHECK_REQUEST_EXISTENCE } from './friend.query';
import { UserFactory } from '../../util/factory/UserFactory';
import { getFirstKeyValue } from '../../../src/utils/parseDB';
import { acceptFriendRequest, sendFriendRequest } from './common';

const userFactory = new UserFactory('request');

afterAll(async () => {
  await userFactory.deleteUsers();
});

describe('친구 요청', () => {
  test('친구 요청이 되는지 확인', async done => {
    const user1 = await userFactory.signUpAndGetUser();
    const user2 = await userFactory.signUpAndGetUser();

    const res = await sendFriendRequest(user1, user2);

    checkResStatusCodeTobe(res, 200);

    const dbRes = await requestDB(CHECK_REQUEST_EXISTENCE, {
      fromEmail: user1.email,
      toEmail: user2.email
    });

    const existence = getFirstKeyValue(dbRes);

    expect(existence).toBe('TRUE');

    done();
  });

  test('중복되는 친구 요청일 경우 실패', async done => {
    const user1 = await userFactory.signUpAndGetUser();
    const user2 = await userFactory.signUpAndGetUser();

    await sendFriendRequest(user1, user2);
    const res = await sendFriendRequest(user2, user1);

    checkResStatusCodeTobe(res, 400);

    done();
  });

  test('이미 친구일 경우 실패', async done => {
    const user1 = await userFactory.signUpAndGetUser();
    const user2 = await userFactory.signUpAndGetUser();

    await sendFriendRequest(user1, user2);
    await acceptFriendRequest(user2, user1);

    const res = await sendFriendRequest(user1, user2);

    checkResStatusCodeTobe(res, 400);

    done();
  });
});
