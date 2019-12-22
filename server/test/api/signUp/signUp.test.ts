import path from 'path';
import {
  checkResStatusCodeTobe,
  requestDB,
  requestQuery,
  requestQueryWithFile
} from '../../util/utils';
import {
  CREATE_USER,
  CREATE_USER_WITHOUT_THUMBNAIL,
  FIND_USER_BY_NICKNAME,
  DELETE_SIGNED_UP_USERS
} from './signUp.query';
import { userScheme } from './signUp.schema';

afterAll(async () => {
  await requestDB(DELETE_SIGNED_UP_USERS);
});

describe('회원가입 성공 확인', () => {
  test('서버 응답 결과가 적절한지 확인', async done => {
    const res = await requestQueryWithFile(CREATE_USER('signUp1'), {
      file: path.join(__dirname, '../../asset/', 'tmp.png')
    });

    checkResStatusCodeTobe(res, 200);

    const { error } = userScheme.validate(res.body.data.signUp);
    if (error) {
      throw error;
    }

    done();
  });

  test('유저 1명이 db에 입력되는지 확인', async done => {
    const queryRes = await requestQueryWithFile(CREATE_USER('signUp2'), {
      file: path.join(__dirname, '../../asset/', 'tmp.png')
    });

    checkResStatusCodeTobe(queryRes, 200);

    const res = await requestDB(
      FIND_USER_BY_NICKNAME(queryRes.body.data.signUp.nickname)
    );

    if (res.length !== 1) {
      fail('user is not created');
    }

    done();
  });

  test('썸네일 없이 유저 생성 후 확인', async done => {
    const res = await requestQuery(CREATE_USER_WITHOUT_THUMBNAIL('signUp3'));

    checkResStatusCodeTobe(res, 200);

    const { error } = userScheme.validate(res.body.data.signUp);
    if (error) {
      throw error;
    }

    done();
  });
});
