import { Module } from '@nestjs/common';
import { EtriService } from './etri.service';

@Module({
  providers: [EtriService],
  exports: [EtriService],
})
export class EtriModule {}
