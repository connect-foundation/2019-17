import { RedisPubSub } from 'graphql-redis-subscriptions';
import { loginChannel, logoutChannel } from './channels';

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
  pubsub.publish(loginChannel, args);
};

export const logoutPublish = args => {
  pubsub.publish(logoutChannel, args);
};
