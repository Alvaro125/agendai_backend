/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Validate,
  ValidateNested,
} from 'class-validator';
import { User } from '../../domain/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsCnpjConstraint } from '../../domain/validators/cnpj.validate';
import { AddressDto } from './address.dto';
import { Type } from 'class-transformer';
import { Business } from '../../domain/entities/business.entity';
import { Address } from '../../domain/entities/address.entity';

export class RegisterBusinessDto {
  @ApiProperty({
    example: 'example1@buss.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Joe John',
  })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({
    example: 'Joe John Inc.',
  })
  @IsString()
  @IsNotEmpty()
  nome_empresa: string;

  @ApiProperty({
    example: 'password',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, {
    message: 'Senha is too short',
  })
  senha: string;

  @ApiProperty({
    example: '29.930.968/0001-07',
  })
  @IsString()
  @IsNotEmpty()
  @Validate(IsCnpjConstraint, {
    message: 'Title is too short or long!',
  })
  cnpj: string;

  @ApiProperty({
    example: '5511999999999',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(12, {
    message: 'Telefone is too short',
  })
  telefone: string;

  @ApiProperty({
    type: AddressDto,
    example: {
      pais: 'BR',
      estado: 'Mato Grosso do Sul',
      cidade: 'Dourados',
      lougradouro: 'Rua B',
      bairro: 'Centro',
      numero: '1233',
      code: '00000-000',
    },
  })
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
  static toDomain(dto: RegisterBusinessDto): Business {
    const address = new Address(
      0,
      dto.address.pais,
      dto.address.estado,
      dto.address.cidade,
      dto.address.lougradouro,
      dto.address.bairro,
      dto.address.numero,
      dto.address.code,
    );
    return new Business(
      0,
      dto.cnpj,
      dto.nome,
      dto.nome_empresa,
      dto.email,
      dto.telefone,
      address,
      dto.senha,
    );
  }
}
