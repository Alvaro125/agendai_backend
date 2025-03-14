import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { Attendance } from '../../domain/entities/attendance.entity';
import { ApiProperty } from '@nestjs/swagger';

export class AttendanceDto {
  @ApiProperty({
    example: 'Serviço 1',
  })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({
    example: 'Descrição do Serviço 1',
  })
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty({
    example: '30m',
  })
  @IsString()
  @IsNotEmpty()
  duracao: string;

  @ApiProperty({
    example: 'categoria',
  })
  @IsString()
  @IsNotEmpty()
  categoria: string;

  @ApiProperty({
    example: 29.99,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  preco: number;

  static toDomain({
    categoria,
    descricao,
    duracao,
    nome,
    preco,
  }: AttendanceDto): Attendance {
    return new Attendance(0, 0, preco, nome, descricao, duracao, categoria, '');
  }
}
