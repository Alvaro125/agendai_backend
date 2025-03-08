import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { User } from '../../domain/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsCPF } from 'class-validator-cpf';

export class RegisterDto {
  @ApiProperty({
    example: 'example1@mail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Joe John',
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
    example: '539.656.840-27',
  })
  @IsString()
  @IsNotEmpty()
  @IsCPF()
  cpf: string;

  @ApiProperty({
    example: '5511999999999',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(12, {
    message: 'Telefone is too short',
  })
  telefone: string;

  static toDomain(dto: RegisterDto): User {
    return new User(0, dto.cpf, dto.name, dto.email, dto.telefone, dto.senha);
  }
}
