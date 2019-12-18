import { requestDB, requestQuery } from '../utils';
import {
  CREATE_USER_WITHOUT_THUMBNAIL,
  DELETE_ALL_USERS
} from '../../api/signUp/signUp.query';

interface IUser {
  token: string;
  email: string;
}

class UserFactory {
  private userNum = 0;

  async signUpAndGetUser(): Promise<IUser> {
    const res = await requestQuery(
      CREATE_USER_WITHOUT_THUMBNAIL(this.userNum++)
    );

    return {
      token: res.header['set-cookie'][0].split('token=')[1],
      email: res.body.data.signUp.email
    };
  }

  async deleteUsers() {
    try {
      await requestDB(DELETE_ALL_USERS);
    } catch (e) {
      throw e;
    }
  }
}

export const userFactory = new UserFactory();
