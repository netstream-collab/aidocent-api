import { Module } from '@nestjs/common';
import { DalModule } from './dal/dal.module';
import { AidocentController } from './aidocent.controller';
import { AidocentService } from './aidocent.service';
import { UtilsModule } from '../utils/utils.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    DalModule,
    UtilsModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    AuthModule,
  ],
  controllers: [AidocentController],
  providers: [AidocentService],
})
export class AidocentModule {}
