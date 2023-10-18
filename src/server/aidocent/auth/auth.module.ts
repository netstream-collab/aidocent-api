import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DalModule } from '../dal/dal.module';

@Module({
  imports: [DalModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
