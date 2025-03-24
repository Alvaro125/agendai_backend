import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './application/services/auth.service';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { DatabaseModule } from 'src/infra/database.module';
import { AddressRepository } from './infrastructure/repositories/address.repository';
import { BusinessRepository } from './infrastructure/repositories/business.repository';
import { JwtGuardStrategy } from 'src/infra/guards/jwt-auth.strategy';
import { JwtGuard } from 'src/infra/guards/jwt-auth.guard';
import { GoogleStrategy } from 'src/infra/guards/google-oauth.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '3d',
        },
        global: true,
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepository,
    AddressRepository,
    BusinessRepository,
    JwtGuardStrategy,
    JwtGuard,
    GoogleStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
