import { MutationResolvers, MutationCreateChatArgs } from '../../types';
import createDBError from '../../errors/createDBError';
import isAuthenticated from '../../utils/isAuthenticated';
import { createChatAndPublish } from './chat.pubsub';

const Mutation: MutationResolvers = {
  createChat: async (
    _,
    { chatRoomId, content }: MutationCreateChatArgs,
    { req, pubsub }
  ): Promise<boolean> => {
    isAuthenticated(req);
    const { email } = req;
    try {
      await createChatAndPublish({
        email,
        content,
        chatRoomId,
        pubsub
      });
      return true;
    } catch (error) {
      const DBError = createDBError(error);
      throw new DBError();
    }
  }
};

export default Mutation;
