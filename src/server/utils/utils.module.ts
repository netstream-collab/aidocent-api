import { Module } from '@nestjs/common';
import { ClovaModule } from './clova/clova.module';
import { OpenAiModule } from './open-ai/open-ai.module';
import { EtriModule } from './etri/etri.module';
import { GoogleModule } from './google/google.module';

@Module({
  imports: [OpenAiModule, ClovaModule, EtriModule, GoogleModule],
  exports: [OpenAiModule, ClovaModule, EtriModule, GoogleModule],
  providers: [],
})
export class UtilsModule {}
