import { Address } from '../../domain/entities/address.entity';
import { Business } from '../../domain/entities/business.entity';

export class BusinessMapper {
  static toEntity(row: {
    idEmpresa: number;
    cnpj: string;
    nome: string;
    nome_empresa: string;
    email: string;
    telefone: string;
    senha: string;
    endereco: number;
    pais: string;
    estado: string;
    cidade: string;
    lougradouro: string;
    bairro: string;
    numero: string;
    code: string;
  }): Business {
    return new Business(
      row.idEmpresa,
      row.cnpj,
      row.nome,
      row.nome_empresa,
      row.email,
      row.telefone,
      new Address(
        row.endereco,
        row.pais || '',
        row.estado || '',
        row.cidade || '',
        row.lougradouro || '',
        row.bairro || '',
        row.numero || '',
        row.code || '',
      ),
      row.senha,
    );
  }

  static toDatabase(entity: Business): any {
    return {
      idEmpresa: entity.idEmpresa,
      cnpj: entity.cnpj,
      nome: entity.nome,
      nome_empresa: entity.nome_empresa,
      email: entity.email,
      telefone: entity.telefone,
      senha: entity.senha,
      endereco: entity.endereco.idEndereco,
    };
  }
}
