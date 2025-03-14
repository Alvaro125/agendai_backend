import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Business } from '../../domain/entities/business.entity';
import { Address } from '../../domain/entities/address.entity';

export class LoginBusinessDto {
  @ApiProperty({
    example: 'example1@buss.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, {
    message: 'Password is too short',
  })
  senha: string;

  static toDomain(dto: LoginBusinessDto): Business {
    return new Business(
      0,
      '',
      '',
      dto.email,
      '',
      new Address(0, '', '', '', '', '', '', ''),
      dto.senha,
    );
  }
}
