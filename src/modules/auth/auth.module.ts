import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './application/services/auth.service';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { DatabaseModule } from 'src/infra/database.module';
import { AddressRepository } from './infrastructure/repositories/address.repository';
import { BusinessRepository } from './infrastructure/repositories/business.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepository,
    AddressRepository,
    BusinessRepository,
  ],
  exports: [AuthService],
})
export class AuthModule {}
