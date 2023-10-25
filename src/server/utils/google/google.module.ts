import { Module } from '@nestjs/common';
import { CustomSearchJsonService } from './custom-search-json.service';

@Module({
  providers: [CustomSearchJsonService],
  exports: [CustomSearchJsonService],
})
export class GoogleModule {}
