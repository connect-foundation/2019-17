import { RedisPubSub } from 'graphql-redis-subscriptions';
import { LOGIN_CHANNEL, LOGOUT_CHANNEL } from './channels';

export const pubsub = new RedisPubSub({
  connection: {
    host: '127.0.0.1',
    port: 6379,
    retry_strategy: options => {
      // reconnect after
      return Math.max(options.attempt * 100, 3000);
    }
  }
});

export const loginPublish = args => {
  pubsub.publish(LOGIN_CHANNEL, args);
};

export const logoutPublish = args => {
  pubsub.publish(LOGOUT_CHANNEL, args);
};
