import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ChatResolver } from './chat.resolver';
import { ChatService } from './chat.service';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
    }),
  ],
  providers: [ChatResolver, ChatService],
})
export class AppModule {}
