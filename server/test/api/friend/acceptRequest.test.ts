import { checkResTobe, requestDB } from '../../util/utils';
import { CHECK_FRIEND_EXISTENCE } from './friend.query';
import {UserFactory} from '../../util/factory/UserFactory';
import { getFirstKeyValue } from '../../../src/utils/parseDB';
import { acceptFriendRequest, sendFriendRequest } from './common';

const userFactory = new UserFactory('acceptRequest');

afterAll(async () => {
  await userFactory.deleteUsers();
});

describe('친구 요청 수락', () => {
  test('친구 요청 수락이 되어 친구 관계가 생성되는지 확인', async done => {
    const user1 = await userFactory.signUpAndGetUser();
    const user2 = await userFactory.signUpAndGetUser();

    await sendFriendRequest(user1, user2);

    const res = await acceptFriendRequest(user2, user1);

    checkResTobe(res, 200);

    const dbRes = await requestDB(CHECK_FRIEND_EXISTENCE, {
      fromEmail: user1.email,
      toEmail: user2.email
    });

    const existence = getFirstKeyValue(dbRes);

    expect(existence).toBe('TRUE');

    done();
  });

  test('요청이 존재하지 않을 경우 실패', async done => {
    const user1 = await userFactory.signUpAndGetUser();
    const user2 = await userFactory.signUpAndGetUser();

    const res = await acceptFriendRequest(user2, user1);

    checkResTobe(res, 400);

    done();
  });
});
