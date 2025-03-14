import { Address } from '../../domain/entities/address.entity';

export class AddressMapper {
  static toEntity(row: {
    idEndereco: number;
    pais: string;
    estado: string;
    cidade: string;
    lougradouro: string;
    bairro: string;
    numero: string;
    code: string;
  }): Address {
    return new Address(
      row.idEndereco,
      row.pais,
      row.estado,
      row.cidade,
      row.lougradouro,
      row.bairro,
      row.numero,
      row.code,
    );
  }

  static toDatabase(entity: Address): any {
    return {
      idEndereco: entity.idEndereco,
      pais: entity.pais,
      estado: entity.estado,
      cidade: entity.cidade,
      lougradouro: entity.lougradouro,
      bairro: entity.bairro,
      numero: entity.numero,
      code: entity.code,
    };
  }
}
