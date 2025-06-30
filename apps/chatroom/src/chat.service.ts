import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

export interface Message {
  from: string;
  content: string;
}

@Injectable()
export class ChatService {
  private redis = new Redis();

  private roomKey(fanId: string, influencerId: string) {
    return `room_${fanId}_${influencerId}`;
  }

  async ensureRoom(fanId: string, influencerId: string): Promise<void> {
    const key = this.roomKey(fanId, influencerId);
    const exists = await this.redis.exists(key);
    if (!exists) {
      await this.redis.set(key, JSON.stringify([]));
    }
  }

  async getMessages(fanId: string, influencerId: string): Promise<Message[]> {
    const key = this.roomKey(fanId, influencerId);
    const data = await this.redis.get(key);
    if (data) {
      return JSON.parse(data);
    }
    return [];
  }

  async appendMessage(fanId: string, influencerId: string, message: Message): Promise<void> {
    const key = this.roomKey(fanId, influencerId);
    const messages = await this.getMessages(fanId, influencerId);
    messages.push(message);
    await this.redis.set(key, JSON.stringify(messages));
  }
}
