import { MutationResolvers, MutationCreateChatArgs } from '../../types';
import createDBError from '../../errors/createDBError';
import isAuthenticated from '../../utils/isAuthenticated';
import { publishChat } from './chat.pubsub';
import { createChat } from './common';

const Mutation: MutationResolvers = {
  createChat: async (
    _,
    { chatRoomId, content }: MutationCreateChatArgs,
    { req, pubsub }
  ): Promise<boolean> => {
    isAuthenticated(req);
    const { email } = req;
    try {
      const chat = await createChat({
        email,
        chatRoomId: Number(chatRoomId),
        content
      });
      await publishChat({ chat, chatRoomId: Number(chatRoomId), pubsub });
      return true;
    } catch (error) {
      const DBError = createDBError(error);
      throw new DBError();
    }
  }
};

export default Mutation;
