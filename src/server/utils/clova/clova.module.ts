import { Module } from '@nestjs/common';
import { ClovaVoiceService } from './clova-voice.service';
import { ClovaStudioService } from './clova-studio.service';
import { ClovaCSRService } from './clova-csr.service';

@Module({
  providers: [ClovaVoiceService, ClovaStudioService, ClovaCSRService],
  exports: [ClovaVoiceService, ClovaStudioService, ClovaCSRService],
})
export class ClovaModule {}
