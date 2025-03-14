/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { AttendanceMapper } from '../mappers/attendance.mapper';
import { Attendance } from '../../domain/entities/attendance.entity';
import { IAttendanceRepository } from '../../domain/interfaces/attendance-repository.interface';
@Injectable()
export class AttendanceRepository implements IAttendanceRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected db: Knex) {}

  public async create(att: Attendance): Promise<Attendance | null> {
    try {
      const insert: Record<string, any> = AttendanceMapper.toDatabase(att);
      delete insert['idServico'];
      const row = (await this.db
        .table('Servico')
        .insert({ ...insert })
        .returning([
          'idServico',
          'empresa',
          'nome',
          'preco',
          'descricao',
          'duracao',
          'categoria',
          'imagem',
        ])) as unknown as Attendance;
      const createdAtt = row ? AttendanceMapper.toEntity(row) : null;
      if (!createdAtt) {
        throw new Error('Attendance could not be created');
      }
      return createdAtt;
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === 'SQLITE_CONSTRAINT') {
        throw new Error('Attendance already exists');
      }
      throw new Error('Error creating Attendance');
    }
  }

  public async findByEmpresa(busi: number): Promise<Attendance[] | null> {
    const row = await this.db
      .table('Servico')
      .join('empresa', 'Servico.empresa', '=', 'Empresa.idEmpresa')
      .where('empresa', busi)
      .first();
    return row ? BusinessMapper.toEntity(row) : null;
  }
}
