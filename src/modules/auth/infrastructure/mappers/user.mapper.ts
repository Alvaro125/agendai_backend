import { User } from '../../domain/entities/user.entity';

export class UserMapper {
  static toEntity(row: {
    idCliente: number;
    cpf: string;
    nome: string;
    email: string;
    telefone: string;
    senha: string;
  }): User {
    return new User(
      row.idCliente,
      row.cpf,
      row.email,
      row.nome,
      row.email,
      row.senha,
    );
  }

  static toDatabase(entity: User): any {
    return {
      cpf: entity.cpf,
      nome: entity.nome,
      email: entity.email,
      telefone: entity.telefone,
      senha: entity.senha,
    };
  }
}
