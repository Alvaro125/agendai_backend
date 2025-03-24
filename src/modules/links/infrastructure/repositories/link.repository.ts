/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { Link } from '../../domain/entities/link.entity';
import { LinkMapper } from '../mappers/link.mapper';
@Injectable()
export class LinkRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected db: Knex) {}
  public async create(link: Link): Promise<Link | null> {
    try {
      const insert: Record<string, any> = LinkMapper.toDatabase(link);
      delete insert['id'];
      delete insert['data_criacao'];
      delete insert['uso'];
      const row = (await this.db
        .table('Links')
        .insert({ ...insert })
        .returning([
          'id',
          'empresa',
          'limite_uso',
          'uso',
          'data_criacao',
          'data_expiracao',
          'active',
        ])) as unknown as Link;
      const createdLink = row ? LinkMapper.toEntity(row[0]) : null;
      if (!createdLink) {
        throw new Error('Link could not be created');
      }
      return createdLink;
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === 'SQLITE_CONSTRAINT') {
        throw new Error('Attendance already exists');
      }
      throw new Error('Error creating Attendance');
    }
  }

  public async findByEmpresa(id: number): Promise<Link[] | null> {
    try {
      const rows = await this.db
        .table('Links')
        .where({ empresa: id })
        .select('*') as unknown as Link[];
      return rows ? rows.map(row=>LinkMapper.toEntity(row)) : null;
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === 'SQLITE_CONSTRAINT') {
        throw new Error('Attendance already exists');
      }
      throw new Error('Error creating Attendance');
    }
  }
}
