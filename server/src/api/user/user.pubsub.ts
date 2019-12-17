import { LOGIN_CHANNEL, LOGOUT_CHANNEL } from './channels';
import pubsub from '../../utils/pubsub'

export const loginPublish = (args) => {
  pubsub.publish(LOGIN_CHANNEL, args);
};

export const logoutPublish = (args) => {
  pubsub.publish(LOGOUT_CHANNEL, args);
};
