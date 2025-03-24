import { Attendance } from '../entities/attendance.entity';

export interface IAttendanceRepository {
  findByIdAndEmpresa(id: number, busi: number): Promise<Attendance | null>;
  findByEmpresa(busi: number): Promise<Attendance[] | null>;
  create(att: Attendance): Promise<Attendance | null>;
  //   update(user: User): Promise<void>;
  //   delete(id: string): Promise<void>;
}
