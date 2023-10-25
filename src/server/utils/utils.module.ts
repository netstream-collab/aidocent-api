import { Module } from '@nestjs/common';
import { ClovaModule } from './clova/clova.module';
import { OpenAiModule } from './open-ai/open-ai.module';
import { EtriModule } from './etri/etri.module';

@Module({
  imports: [OpenAiModule, ClovaModule, EtriModule],
  exports: [OpenAiModule, ClovaModule, EtriModule],
  providers: [],
})
export class UtilsModule {}
