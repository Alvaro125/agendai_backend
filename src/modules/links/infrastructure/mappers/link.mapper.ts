import { Link } from "../../domain/entities/link.entity";

export class LinkMapper {
  static toEntity(row: {
    id: string;
    empresa: number;
    limite_uso: number;
    uso: number;
    data_criacao: Date;
    data_expiracao: Date;
    active: boolean;
  }): Link {
    return new Link(
      row.id,
      row.empresa,
      row.limite_uso,
      row.uso,
      row.data_criacao,
      row.data_expiracao,
      row.active,
    );
  }

  static toDatabase(entity: Link): LinkRow {
    return {
      id: entity.id,
      empresa: entity.empresa,
      limite_uso: entity.limite_uso,
      uso: entity.uso,
      data_criacao: entity.data_criacao,
      data_expiracao: entity.data_expiracao,
      active: entity.active,
    };
  }
}

interface LinkRow {
  id: string;
  empresa: number;
  limite_uso: number;
  uso: number;
  data_criacao: Date;
  data_expiracao: Date;
  active: boolean;
}
