import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { UserMapper } from '../mappers/user.mapper';
import { User } from '../../domain/entities/user.entity';
import { Business } from '../../domain/entities/business.entity';
import { BusinessMapper } from '../mappers/business.mapper';
@Injectable()
export class BusinessRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected db: Knex) {}

  public async create(busi: Business, provider: string): Promise<void> {
    try {
      console.log(busi);
      const row = (await this.db
        .table('Empresa')
        .insert({
          cnpj: busi.cnpj,
          nome: busi.nome,
          email: busi.email,
          telefone: busi.telefone,
          nome_empresa: busi.nome_empresa,
          senha: busi.senha,
          provider: provider,
          endereco: busi.endereco.idEndereco,
        })
        .returning([
          'idEmpresa',
          'cnpj',
          'nome',
          'nome_empresa',
          'email',
          'telefone',
          'senha',
          'endereco',
        ])) as unknown as any[];
      const createdBusiness = row.length
        ? BusinessMapper.toEntity(row[0])
        : null;
      if (!createdBusiness) {
        throw new Error('Business could not be created');
      }
    } catch (error: any) {
      console.error(error);
      if (error.code === 'SQLITE_CONSTRAINT') {
        throw new Error('Business already exists');
      }
      throw new Error('Error creating Business');
    }
  }
  public async findByEmail(email: string): Promise<Business | null> {
    const row = await this.db
      .table('Empresa')
      .join('Endereco', 'Empresa.endereco', '=', 'Endereco.idEndereco')
      .where('email', email)
      .first();
    return row ? BusinessMapper.toEntity(row) : null;
  }

  public async createProviderGoogle(busi: {
    name: string;
    email: string;
  }): Promise<void> {
    try {
      const row = (await this.db
        .table('Empresa')
        .insert({
          provider: 'Google',
          nome: busi.name,
          email: busi.email,
        })
        .returning([
          'idEmpresa',
          'cnpj',
          'nome',
          'email',
          'telefone',
          'senha',
          'endereco',
        ])) as unknown as any[];
      const createdBusiness = row.length
        ? BusinessMapper.toEntity(row[0])
        : null;
      if (!createdBusiness) {
        throw new Error('Business could not be created');
      }
    } catch (error: any) {
      if (error.code === 'SQLITE_CONSTRAINT') {
        throw new Error('Business already exists');
      }
      throw new Error('Error creating Business');
    }
  }
}
