import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { UserMapper } from '../mappers/user.mapper';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/interfaces/user-repository.interface';
@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected db: Knex) {}

  public async create(user: User): Promise<void> {
    try {
      const row = (await this.db
        .table('Cliente')
        .insert({
          cpf: user.cpf,
          nome: user.nome,
          email: user.email,
          telefone: user.telefone,
          senha: user.senha,
        })
        .returning([
          'idCliente',
          'cpf',
          'nome',
          'email',
          'telefone',
          'senha',
        ])) as unknown as User[];
      const createdUser = row.length ? UserMapper.toEntity(row[0]) : null;
      if (!createdUser) {
        throw new Error('Cliente could not be created');
      }
    } catch (error: any) {
      if (error.code === 'SQLITE_CONSTRAINT') {
        throw new Error('Cliente already exists');
      }
      throw new Error('Error creating Cliente');
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
