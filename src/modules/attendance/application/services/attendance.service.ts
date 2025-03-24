import { Injectable } from '@nestjs/common';
import { Attendance } from '../../domain/entities/attendance.entity';
import { AttendanceRepository } from '../../infrastructure/repositories/attendance.repository';

@Injectable()
export class AttendanceService {
  constructor(private readonly attendanceRepository: AttendanceRepository) {}
  async create(_data: Attendance): Promise<{ message: string }> {
    await this.attendanceRepository.create(_data);
    return { message: 'Attendance created' };
  }

  async listByEmpresa(busi: number): Promise<Attendance[] | null> {
    const atts = await this.attendanceRepository.findByEmpresa(busi);
    return atts;
  }

  async getByID(busi: number, id: number): Promise<Attendance | null> {
    const att = await this.attendanceRepository.findByIdAndEmpresa(id, busi);
    return att;
  }
  async deleteByID(busi: number, id: number): Promise<{ message: string }> {
    const att = await this.attendanceRepository.DeleteByIdAndEmpresa(id, busi);
    if (att) {
      return { message: `Attendance ${att} removed` };
    }
    return { message: `Attendance ${att} already removed or not registered` };
  }
}
