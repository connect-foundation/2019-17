import queryResolvers from './feed.query';
import mutationResolvers from './feed.mutation';
import subscriptionResolvers from './feed.subscription';

export default {
  Query: queryResolvers,
  Mutation: mutationResolvers,
  Subscription: subscriptionResolvers
};
