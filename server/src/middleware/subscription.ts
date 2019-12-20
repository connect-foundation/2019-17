import { decodeJWT } from '../utils/jwt';
import { emailWithSocket, socketCountWithEmail } from '../utils/socketManager';
import { getUserWithStatus } from '../utils/requestDB';
import { logoutPublish } from '../api/auth/auth.pubsub';
import HaveNoTokenError from '../errors/HaveNoToken';

export const onConnect = (_, webSocket, context) => {
  const {
    request: {
      headers: { cookie }
    }
  } = context;
  try {
    if (!cookie || cookie.indexOf('token=') === -1) {
      throw new HaveNoTokenError();
    }
    const token = cookie
      .split(';')
      .filter(e => e.startsWith('token='))[0]
      .split('token=')[1];
    const { email } = decodeJWT(token);
    emailWithSocket.set(webSocket, email);
    const currentCount = socketCountWithEmail.get(email);
    currentCount
      ? socketCountWithEmail.set(email, currentCount + 1)
      : socketCountWithEmail.set(email, 1);
    return { email };
  } catch (e) {
    return webSocket.close();
  }
};

export const onDisconnect = async (webSocket, _) => {
  const email = emailWithSocket.get(webSocket);
  const currentCount = socketCountWithEmail.get(email);
  if (currentCount === 1) {
    try {
      const user = await getUserWithStatus(email, 'offline');
      logoutPublish(user);
      socketCountWithEmail.delete(email);
    } catch (error) {
      socketCountWithEmail.delete(email);
    }
  } else if (email) {
    socketCountWithEmail.set(email, currentCount - 1);
  }
};
