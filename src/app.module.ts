import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from './infra/database.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { LinkModule } from './modules/links/link.module';
// import { WhatsappModule } from './modules/whatsapp/whatsapp.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    AttendanceModule,
    LinkModule,
    // WhatsappModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
