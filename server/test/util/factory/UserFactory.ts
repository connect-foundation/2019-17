import { checkResStatusCodeTobe, requestDB, requestQuery } from '../utils';
import {
  CREATE_USER_WITHOUT_THUMBNAIL,
  DELETE_ALL_USERS
} from '../../api/signUp/signUp.query';

interface IUser {
  token: string;
  email: string;
}

export class UserFactory {
  private userNum = 0;
  private userIdArr: Array<string> = [];
  private readonly alias = '';

  constructor(alias) {
    this.alias = alias;
  }

  async signUpAndGetUser(): Promise<IUser> {
    const userId: string = this.alias + this.userNum;
    const res = await requestQuery(CREATE_USER_WITHOUT_THUMBNAIL(userId));

    this.userIdArr.push(`"${userId}q2w3e@naver.com"`);
    this.userNum++;

    checkResStatusCodeTobe(res, 200);

    return {
      token: res.header['set-cookie'][0].split('token=')[1],
      email: res.body.data.signUp.email
    };
  }

  async deleteUsers() {
    try {
      await requestDB(DELETE_ALL_USERS(this.userIdArr));
    } catch (e) {
      throw e;
    }
  }
}
