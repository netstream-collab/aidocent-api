import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TB_CHAT_HIS } from './entities/TB_CHAT_HIS.entity';
import { TB_PROJ } from './entities/TB_PROJ.entity';
import ChatHisDAL from './layers/chatHis.dal';
import ProjDAL from './layers/proj.dal';

const layers = [ChatHisDAL, ProjDAL];

@Module({
  imports: [TypeOrmModule.forFeature([TB_PROJ, TB_CHAT_HIS])],
  providers: [...layers],
  exports: [...layers],
})
export class DalModule {}
