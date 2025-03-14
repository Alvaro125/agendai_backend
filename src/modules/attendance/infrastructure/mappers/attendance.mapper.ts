import { Attendance } from '../../domain/entities/attendance.entity';

export class AttendanceMapper {
  static toEntity(row: {
    idServico: number;
    empresa: number;
    preco: number;
    nome: string;
    descricao: string;
    duracao: string;
    categoria: string;
    imagem: string;
  }): Attendance {
    return new Attendance(
      row.idServico,
      row.empresa,
      row.preco,
      row.nome,
      row.descricao,
      row.duracao,
      row.categoria,
      row.imagem,
    );
  }

  static toDatabase(entity: Attendance): AttendanceRow {
    return {
      idServico: entity.idServico,
      empresa: entity.empresa,
      preco: entity.preco,
      nome: entity.nome,
      descricao: entity.descricao,
      duracao: entity.duracao,
      categoria: entity.categoria,
      imagem: entity.imagem,
    };
  }
}

interface AttendanceRow {
  idServico: number;
  empresa: number;
  preco: number;
  nome: string;
  descricao: string;
  duracao: string;
  categoria: string;
  imagem: string;
}
