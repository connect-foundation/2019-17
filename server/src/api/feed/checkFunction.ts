import { GET_FRIENDS } from '../../schema/feed/query';
import { parseResultRecords } from '../../utils/parseDB';
import { requestDB } from '../../utils/requestDB';

export const checkIsFriend = async (friendEmail, myEmail): Promise<boolean> => {
  const result = await requestDB(GET_FRIENDS, {
    userEmail: myEmail,
    friendEmail
  });
  const [parsedResult] = parseResultRecords(result);
  return parsedResult.isFriend > 0;
};
