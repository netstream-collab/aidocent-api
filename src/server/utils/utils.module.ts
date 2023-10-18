import { Module } from '@nestjs/common';
import { ChatGptModule } from './chat-gpt/chat-gpt.module';

@Module({
  imports: [ChatGptModule],
  exports: [ChatGptModule],
})
export class UtilsModule {}
