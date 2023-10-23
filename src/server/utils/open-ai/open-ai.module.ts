import { Module } from '@nestjs/common';
import { ChatGptService } from './chat-gpt.service';
import { WhisperService } from './whisper.service';

@Module({
  providers: [ChatGptService, WhisperService],
  exports: [ChatGptService, WhisperService],
})
export class OpenAiModule {}
