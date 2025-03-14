/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddressDto {
  @ApiProperty({
    example: 'BR',
  })
  @IsString()
  @IsNotEmpty()
  pais: string;

  @ApiProperty({
    example: 'Mato Grosso do Sul',
  })
  @IsString()
  @IsNotEmpty()
  estado: string;

  @ApiProperty({
    example: 'Campo Grande',
  })
  @IsString()
  @IsNotEmpty()
  cidade: string;

  @ApiProperty({
    example: 'Rua A',
  })
  @IsString()
  @IsNotEmpty()
  lougradouro: string;

  @ApiProperty({
    example: 'Centro',
  })
  @IsString()
  @IsNotEmpty()
  bairro: string;

  @ApiProperty({
    example: '123',
  })
  @IsString()
  @IsNotEmpty()
  numero: string;

  @ApiProperty({
    example: '00000-000',
  })
  @IsString()
  @IsNotEmpty()
  code: string;
}
