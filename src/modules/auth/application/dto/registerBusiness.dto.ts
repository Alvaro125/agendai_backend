/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsEmail,
  IsNotEmpty,
  IsObject,
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

export class RegisterBusinessDto {
  @ApiProperty({
    example: 'example1@buss.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Joe John Inc.',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

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
    example: '591.561.630-53',
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

  @ApiProperty({ type: AddressDto })
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
  static toDomain(dto: RegisterBusinessDto): User {
    return new User(0, dto.cnpj, dto.name, dto.email, dto.telefone, dto.senha);
  }
}
