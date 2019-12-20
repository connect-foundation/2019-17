import { RedisPubSub } from 'graphql-redis-subscriptions';
import config from './config';

export default new RedisPubSub({
  connection: {
    host: config.redis.host,
    port: 6379,
    keepAlive: 10000,
    retry_strategy: options => {
      // reconnect after
      return Math.max(options.attempt * 100, 3000);
    }
  }
});
