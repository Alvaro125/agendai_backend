import { IsDate, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { Link } from '../../domain/entities/link.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class LinkDto {
  @ApiProperty({
    example: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  limite_uso: number;

  @ApiProperty({
    example: '2025-05-05T00:00:00.000Z'
  })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  data_expiracao: Date;

  static toDomain({
    data_expiracao,
    limite_uso,
  }: LinkDto): Link {
    return new Link("", 0, limite_uso, 0, new Date(), data_expiracao, true);
  }
}
