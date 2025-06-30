import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { ChatService, Message } from './chat.service';

const pubSub = new PubSub();

@Resolver()
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Mutation(() => [String])
  async joinRoom(@Args('fan_id') fanId: string, @Args('influencer_id') influencerId: string): Promise<string[]> {
    await this.chatService.ensureRoom(fanId, influencerId);
    const messages = await this.chatService.getMessages(fanId, influencerId);
    return messages.map(m => `${m.from}: ${m.content}`);
  }

  @Mutation(() => Boolean)
  async sendMessage(
    @Args('fan_id') fanId: string,
    @Args('influencer_id') influencerId: string,
    @Args('from') from: string,
    @Args('content') content: string,
  ): Promise<boolean> {
    const message: Message = { from, content };
    await this.chatService.appendMessage(fanId, influencerId, message);
    const room = `${fanId}_${influencerId}`;
    pubSub.publish(room, { messageAdded: `${from}: ${content}` });
    return true;
  }

  @Subscription(() => String)
  messageAdded(@Args('fan_id') fanId: string, @Args('influencer_id') influencerId: string) {
    const room = `${fanId}_${influencerId}`;
    return pubSub.asyncIterator(room);
  }
}
