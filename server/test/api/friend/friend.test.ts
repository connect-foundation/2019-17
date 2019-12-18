import { requestDB, requestQueryWithToken } from '../../util/utils';
import { CHECK_REQUEST_EXISTENCE, SEND_FRIEND_REQUEST } from './friend.query';
import { userFactory } from '../../util/factory/userFactory';
import { getFirstKeyValue } from '../../../src/utils/parseDB';

afterAll(async () => {
  await userFactory.deleteUsers();
});

describe('친구 요청', () => {
  test('친구 요청이 되는지 확인', async done => {
    const user1 = await userFactory.signUpAndGetUser();
    const user2 = await userFactory.signUpAndGetUser();

    await requestQueryWithToken(
      user1.token,
      SEND_FRIEND_REQUEST(user2.email, 'NONE')
    );

    const res = await requestDB(CHECK_REQUEST_EXISTENCE, {
      fromEmail: user1.email,
      toEmail: user2.email
    });

    const existence = getFirstKeyValue(res);

    expect(existence).toBe('TRUE');

    done();
  });
});
