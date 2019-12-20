import { MutationResolvers, MutationCreateChatArgs } from '../../types';
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
    const chat = await createChat({
      email,
      chatRoomId: Number(chatRoomId),
      content
    });
    await publishChat({ chat, chatRoomId: Number(chatRoomId), pubsub });
    return true;
  }
};

export default Mutation;
