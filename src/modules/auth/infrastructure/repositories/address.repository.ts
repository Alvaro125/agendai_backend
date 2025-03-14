import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { UserMapper } from '../mappers/user.mapper';
import { User } from '../../domain/entities/user.entity';
import { Address } from '../../domain/entities/address.entity';
import { AddressMapper } from '../mappers/address.mapper';
@Injectable()
export class AddressRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected db: Knex) {}

  public async create(addr: Address): Promise<Address> {
    try {
      const row = (await this.db
        .table('Endereco')
        .insert({
          pais: addr.pais,
          estado: addr.estado,
          cidade: addr.cidade,
          lougradouro: addr.lougradouro,
          bairro: addr.bairro,
          numero: addr.numero,
          code: addr.code,
        })
        .returning([
          'idEndereco',
          'pais',
          'estado',
          'cidade',
          'lougradouro',
          'bairro',
          'numero',
          'code',
        ])) as unknown as Address[];
      const createdAddr = row.length ? AddressMapper.toEntity(row[0]) : null;
      if (!createdAddr) {
        throw new Error('Address could not be created');
      }
      return createdAddr;
    } catch (error: any) {
      if (error.code === 'SQLITE_CONSTRAINT') {
        throw new Error('Address already exists');
      }
      throw new Error('Error creating Address');
    }
  }
  public async findByEmail(email: string): Promise<User | null> {
    const row = await this.db
      .table('Cliente')
      .where('email', email)
      .first<User>();
    return row ? UserMapper.toEntity(row) : null;
  }
}
