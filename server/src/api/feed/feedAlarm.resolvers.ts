import queryResolvers from './feedAlarm.query';
import mutationResolvers from './feedAlarm.mutation';
import SubscriptionResolver from './feedAlarm.subscription';

export default {
  Query: queryResolvers,
  Mutation: mutationResolvers,
  Subscription: SubscriptionResolver
};
