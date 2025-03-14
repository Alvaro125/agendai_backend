import { Injectable } from '@nestjs/common';
import { Attendance } from '../../domain/entities/attendance.entity';
import { AttendanceRepository } from '../../infrastructure/repositories/attendance.repository';

@Injectable()
export class AttendanceService {
  constructor(private readonly attendanceRepository: AttendanceRepository) {}
  async create(_data: Attendance): Promise<{ message: string }> {
    await this.attendanceRepository.create(_data);
    return { message: 'User created' };
  }

  async listAll(busi: number): Promise<> {
    const atts = await this.attendanceRepository.getByEmpresa(busi);
    return { message: 'User created' };
  }
}
