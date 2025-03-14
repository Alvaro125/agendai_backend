import { Module } from '@nestjs/common';
import { AttendanceController } from './attendance.controller';
import { DatabaseModule } from 'src/infra/database.module';
import { AttendanceService } from './application/services/attendance.service';
import { AttendanceRepository } from './infrastructure/repositories/attendance.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [AttendanceController],
  providers: [AttendanceService, AttendanceRepository],
  exports: [],
})
export class AttendanceModule {}
