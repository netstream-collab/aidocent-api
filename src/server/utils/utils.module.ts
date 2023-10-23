import { Module } from '@nestjs/common';
import { ClovaModule } from './clova/clova.module';
import { OpenAiModule } from './open-ai/open-ai.module';

@Module({
  imports: [OpenAiModule, ClovaModule],
  exports: [OpenAiModule, ClovaModule],
  providers: [],
})
export class UtilsModule {}
